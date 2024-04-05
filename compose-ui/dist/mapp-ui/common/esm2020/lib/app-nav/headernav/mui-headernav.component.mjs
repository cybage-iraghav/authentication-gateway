import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { MuiHeadernavService } from './mui-headernav.service';
import { HeadernavDialogComponent } from './headernav-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "./mui-headernav.service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@mapp-ui/notification-center";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/menu";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/form-field";
import * as i10 from "@angular/material/badge";
import * as i11 from "./session-timer.component";
/**
 * Component which handles the navigation in the app header
 * @deprecated
 */
export class MuiHeadernavComponent {
    constructor(headernavService, dialog, notificationService) {
        this.headernavService = headernavService;
        this.dialog = dialog;
        this.notificationService = notificationService;
        /**
         * Flag to control the behavior when one of the items in the language menu is clicked.
         * If false (default), the language link will be executed, redirecting to CEP start page and activating new language.
         * If true, the language link will not be followed. Instead output event languageChanged will be fired.
         * see languageChanged
         */
        this.handleLanguageChange = false;
        /**
         * Control flag for the session timer.
         * If false (default), timer will only be refreshed when component initializes (i.e. page reload)
         * If true, user clicks will be monitored and used to reset the timer at certain intervals.
         */
        this.trackClicks = false; // for session timer
        /**
         * Output event which emits when a new language has been selected in the language picker menu and
         * handleLanguageChange is enabled.
         * Emits the locale string as payload.
         * see handleLanguageChange
         */
        this.languageChanged = new EventEmitter();
        this.searchFieldHidden = true;
        this.notificationCenterEnabled = false;
        this.helpLinkChanges = new Subject();
        this.initialized$ = new Subject();
    }
    ngOnChanges(changes) {
        if (changes['helpTopicId'] && changes['helpTopicId'].currentValue) {
            this.updateHelpLink(changes['helpTopicId'].currentValue);
        }
    }
    ngOnInit() {
        if (this.apiUrl) {
            this.headernavService
                .getNavigationItems(this.apiUrl)
                .subscribe(data => {
                this.navItems = data.topNav;
                this.initialized$.complete();
            });
            this.onHelpLinkChanges();
        }
        else {
            console.warn('MuiHeadernavConponent: No value set for [apiUrl]. No topnav items will be generated.');
        }
        if (this.notificationService && this.notificationCenter) {
            this.notificationCount = this.notificationService.unseenCounter;
            this.notificationBadgeHidden = this.notificationService.unseenCounter.pipe(map(x => x === 0));
            this.notificationCenterEnabled = true;
        }
        else {
            this.notificationCount = EMPTY;
        }
    }
    menuItemClicked($event, item) {
        if (item.blank) {
            $event.preventDefault();
            window.open(item.href);
        }
        else if (this.handleLanguageChange && typeof item.locale === 'string') {
            $event.preventDefault();
            this.languageChanged.emit(item.locale);
        }
        else if (typeof item.modal === 'object') {
            $event.preventDefault();
            this.createModal(item);
        }
    }
    toggleNotificationPanel() {
        if (this.notificationCenterEnabled) {
            this.notificationCenter.toggleState();
        }
    }
    onSearchTermEntered(searchTerm, searchUrl) {
        const searchQuery = searchUrl + encodeURIComponent(searchTerm);
        window.location.assign(searchQuery);
    }
    /**
     * Updates the help link to point to a new help topic
     * @param helpKey The new help key to assign to the link
     */
    updateHelpLink(helpKey) {
        this.helpLinkChanges.next(helpKey);
    }
    onHelpLinkChanges() {
        this.helpLinkChanges.pipe(debounce(() => this.initialized$))
            .subscribe(helpKey => {
            const helpSection = this.navItems.find((value) => value.type === 'help');
            if (helpSection) {
                const helpLinkItem = helpSection.menu.find((value) => value.id === 'tn-help-onlinehelp');
                if (helpLinkItem) {
                    try {
                        const helpUrl = new URL(helpLinkItem.href);
                        if (helpUrl.searchParams.get('label') !== null) {
                            helpUrl.searchParams.set('label', `Engage_${helpKey}`);
                            helpUrl.hash = '';
                        }
                        else {
                            // TODO old help link, remove after migration done
                            helpUrl.hash = helpKey;
                        }
                        helpLinkItem.href = helpUrl.toString();
                    }
                    catch (e) {
                        console.error('failed parsing help url', e);
                    }
                }
            }
        });
    }
    createModal(item) {
        this.dialog.open(HeadernavDialogComponent, {
            data: item,
            panelClass: item.modal.class
        });
    }
}
MuiHeadernavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavComponent, deps: [{ token: i1.MuiHeadernavService }, { token: i2.MatDialog }, { token: i3.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiHeadernavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiHeadernavComponent, selector: "mui-headernav", inputs: { apiUrl: "apiUrl", handleLanguageChange: "handleLanguageChange", notificationCenter: "notificationCenter", trackClicks: "trackClicks", helpTopicId: "helpTopicId" }, outputs: { languageChanged: "languageChanged" }, providers: [MuiHeadernavService], exportAs: ["muiHeaderNav"], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngFor=\"let item of navItems\">\r\n\r\n  <ng-container [ngSwitch]=\"item['type']\">\r\n    <div class=\"search-container\" *ngSwitchCase=\"'search'\">\r\n      <div class=\"search-controls\" [class.hidden]=\"searchFieldHidden\">\r\n      <button mat-icon-button (click)=\"searchFieldHidden = !searchFieldHidden\">\r\n        <mat-icon>search</mat-icon>\r\n      </button>\r\n      <mat-form-field class=\"search-field\">\r\n        <input type=\"text\" matInput #search (keyup.enter)=\"onSearchTermEntered(search.value, item.href)\"/>\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"search.value = ''\">\r\n          <mat-icon class=\"search-clear-icon\">close</mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-container *ngSwitchCase=\"'notification'\">\r\n      <button mat-icon-button *ngIf=\"notificationCenterEnabled\" (click)=\"toggleNotificationPanel()\">\r\n        <mat-icon class=\"nc-notification-icon\" [matBadge]=\"notificationCount | async\"\r\n          [matBadgeHidden]=\"notificationBadgeHidden | async\" matBadgeColor=\"warn\">notifications</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'help'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"helpMenu\">\r\n        <mat-icon>help</mat-icon>\r\n      </button>\r\n      <mat-menu #helpMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'appSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"appsMenu\">\r\n        <mat-icon>apps</mat-icon>\r\n      </button>\r\n      <mat-menu #appsMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'langSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"langMenu\" class=\"text-nav-button\">\r\n        <span class=\"button-text\">{{ item.name }}</span>\r\n      </button>\r\n      <mat-menu #langMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <mui-session-timer *ngSwitchCase=\"'sessionTimer'\" [navItem]=\"item\" [trackClicks]=\"trackClicks\">\r\n    </mui-session-timer>\r\n\r\n    <ng-container *ngSwitchCase=\"'user'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\">\r\n        <mat-icon>person</mat-icon>\r\n      </button>\r\n      <mat-menu #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n  </ng-container>\r\n</ng-container>\r\n", styles: [".search-field{background-color:#fff;color:#000000de;padding:0 5px;height:52px;width:200px}.search-clear-icon{color:#000000de;line-height:inherit!important}.text-nav-button{font-size:16px;font-weight:400;vertical-align:middle;cursor:pointer}.search-container{position:relative;display:inline-block;overflow:hidden;vertical-align:middle}.search-controls{position:relative;display:inline-block;right:0;transition:.4s ease}.search-controls.hidden{right:-210px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i7.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "component", type: i7.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i7.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i9.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i9.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i10.MatBadge, selector: "[matBadge]", inputs: ["matBadgeDisabled", "matBadgeColor", "matBadgeOverlap", "matBadgePosition", "matBadge", "matBadgeDescription", "matBadgeSize", "matBadgeHidden"] }, { kind: "component", type: i11.SessionTimerComponent, selector: "mui-session-timer", inputs: ["navItem", "trackClicks"], exportAs: ["muiSessionTimer"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-headernav', exportAs: 'muiHeaderNav', providers: [MuiHeadernavService], template: "<ng-container *ngFor=\"let item of navItems\">\r\n\r\n  <ng-container [ngSwitch]=\"item['type']\">\r\n    <div class=\"search-container\" *ngSwitchCase=\"'search'\">\r\n      <div class=\"search-controls\" [class.hidden]=\"searchFieldHidden\">\r\n      <button mat-icon-button (click)=\"searchFieldHidden = !searchFieldHidden\">\r\n        <mat-icon>search</mat-icon>\r\n      </button>\r\n      <mat-form-field class=\"search-field\">\r\n        <input type=\"text\" matInput #search (keyup.enter)=\"onSearchTermEntered(search.value, item.href)\"/>\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"search.value = ''\">\r\n          <mat-icon class=\"search-clear-icon\">close</mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-container *ngSwitchCase=\"'notification'\">\r\n      <button mat-icon-button *ngIf=\"notificationCenterEnabled\" (click)=\"toggleNotificationPanel()\">\r\n        <mat-icon class=\"nc-notification-icon\" [matBadge]=\"notificationCount | async\"\r\n          [matBadgeHidden]=\"notificationBadgeHidden | async\" matBadgeColor=\"warn\">notifications</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'help'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"helpMenu\">\r\n        <mat-icon>help</mat-icon>\r\n      </button>\r\n      <mat-menu #helpMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'appSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"appsMenu\">\r\n        <mat-icon>apps</mat-icon>\r\n      </button>\r\n      <mat-menu #appsMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'langSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"langMenu\" class=\"text-nav-button\">\r\n        <span class=\"button-text\">{{ item.name }}</span>\r\n      </button>\r\n      <mat-menu #langMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <mui-session-timer *ngSwitchCase=\"'sessionTimer'\" [navItem]=\"item\" [trackClicks]=\"trackClicks\">\r\n    </mui-session-timer>\r\n\r\n    <ng-container *ngSwitchCase=\"'user'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\">\r\n        <mat-icon>person</mat-icon>\r\n      </button>\r\n      <mat-menu #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n  </ng-container>\r\n</ng-container>\r\n", styles: [".search-field{background-color:#fff;color:#000000de;padding:0 5px;height:52px;width:200px}.search-clear-icon{color:#000000de;line-height:inherit!important}.text-nav-button{font-size:16px;font-weight:400;vertical-align:middle;cursor:pointer}.search-container{position:relative;display:inline-block;overflow:hidden;vertical-align:middle}.search-controls{position:relative;display:inline-block;right:0;transition:.4s ease}.search-controls.hidden{right:-210px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MuiHeadernavService }, { type: i2.MatDialog }, { type: i3.NotificationService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { apiUrl: [{
                type: Input
            }], handleLanguageChange: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }], trackClicks: [{
                type: Input
            }], helpTopicId: [{
                type: Input
            }], languageChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWhlYWRlcm5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2FwcC1uYXYvaGVhZGVybmF2L211aS1oZWFkZXJuYXYuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2hlYWRlcm5hdi9tdWktaGVhZGVybmF2LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdoRyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBRXhFOzs7R0FHRztBQVFILE1BQU0sT0FBTyxxQkFBcUI7SUF5RGhDLFlBQW9CLGdCQUFxQyxFQUNyQyxNQUFpQixFQUNMLG1CQUF3QztRQUZwRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBQ3JDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDTCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBbER4RTs7Ozs7V0FLRztRQUVILHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQVM3Qjs7OztXQUlHO1FBRUgsZ0JBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxvQkFBb0I7UUFRekM7Ozs7O1dBS0c7UUFFSCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENB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SUFFTCxDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDekMsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7O21IQS9KVSxxQkFBcUI7dUdBQXJCLHFCQUFxQix1UUFGckIsQ0FBQyxtQkFBbUIsQ0FBQywyRUNwQmxDLHN2R0FxRUE7NEZEL0NhLHFCQUFxQjtrQkFQakMsU0FBUzsrQkFDRSxlQUFlLFlBQ2YsY0FBYyxhQUdiLENBQUMsbUJBQW1CLENBQUM7OzBCQTZEbkIsUUFBUTs0Q0FwRHJCLE1BQU07c0JBREwsS0FBSztnQkFVTixvQkFBb0I7c0JBRG5CLEtBQUs7Z0JBUU4sa0JBQWtCO3NCQURqQixLQUFLO2dCQVNOLFdBQVc7c0JBRFYsS0FBSztnQkFPTixXQUFXO3NCQURWLEtBQUs7Z0JBVU4sZUFBZTtzQkFEZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BtYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXInO1xyXG5pbXBvcnQgdHlwZSB7IE5vdGlmaWNhdGlvbkNlbnRlckNvbXBvbmVudCB9IGZyb20gJ0BtYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXInO1xyXG5cclxuaW1wb3J0IHsgTXVpSGVhZGVybmF2U2VydmljZSB9IGZyb20gJy4vbXVpLWhlYWRlcm5hdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGVhZGVybmF2RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXJuYXYtZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHdoaWNoIGhhbmRsZXMgdGhlIG5hdmlnYXRpb24gaW4gdGhlIGFwcCBoZWFkZXJcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLWhlYWRlcm5hdicsXHJcbiAgZXhwb3J0QXM6ICdtdWlIZWFkZXJOYXYnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tdWktaGVhZGVybmF2LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWktaGVhZGVybmF2LmNvbXBvbmVudC5jc3MnXSxcclxuICBwcm92aWRlcnM6IFtNdWlIZWFkZXJuYXZTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpSGVhZGVybmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICAvKipcclxuICAgKiBVcmwgb2YgdGhlIGNlcCBBUEkgZW5kcG9pbnQgZm9yIGhlYWRlciBuYXZpZ2F0aW9uLlxyXG4gICAqIFNob3VsZCBiZSBnaXZlbiBhcyBmdWxsIGFic29sdXRlIHVybCBpbmNsdWRpbmcgc2Vzc2lvbklkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZsYWcgdG8gY29udHJvbCB0aGUgYmVoYXZpb3Igd2hlbiBvbmUgb2YgdGhlIGl0ZW1zIGluIHRoZSBsYW5ndWFnZSBtZW51IGlzIGNsaWNrZWQuXHJcbiAgICogSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgbGFuZ3VhZ2UgbGluayB3aWxsIGJlIGV4ZWN1dGVkLCByZWRpcmVjdGluZyB0byBDRVAgc3RhcnQgcGFnZSBhbmQgYWN0aXZhdGluZyBuZXcgbGFuZ3VhZ2UuXHJcbiAgICogSWYgdHJ1ZSwgdGhlIGxhbmd1YWdlIGxpbmsgd2lsbCBub3QgYmUgZm9sbG93ZWQuIEluc3RlYWQgb3V0cHV0IGV2ZW50IGxhbmd1YWdlQ2hhbmdlZCB3aWxsIGJlIGZpcmVkLlxyXG4gICAqIHNlZSBsYW5ndWFnZUNoYW5nZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGhhbmRsZUxhbmd1YWdlQ2hhbmdlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3ZpZGUgcmVmZXJlbmNlIHRvIHRoZSBOb3RpZmljYXRpb25DZW50ZXJDb21wb25lbnQsIGJ5IHRlbXBsYXRlIHZhcmlhYmxlLlxyXG4gICAqIFRoaXMgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gaGF2ZSBpbnRlZ3JhdGlvbiB3aXRoIE5vdGlmaWNhdGlvbiBDZW50ZXIgd29ya2luZy5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIG5vdGlmaWNhdGlvbkNlbnRlcjogTm90aWZpY2F0aW9uQ2VudGVyQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBDb250cm9sIGZsYWcgZm9yIHRoZSBzZXNzaW9uIHRpbWVyLlxyXG4gICAqIElmIGZhbHNlIChkZWZhdWx0KSwgdGltZXIgd2lsbCBvbmx5IGJlIHJlZnJlc2hlZCB3aGVuIGNvbXBvbmVudCBpbml0aWFsaXplcyAoaS5lLiBwYWdlIHJlbG9hZClcclxuICAgKiBJZiB0cnVlLCB1c2VyIGNsaWNrcyB3aWxsIGJlIG1vbml0b3JlZCBhbmQgdXNlZCB0byByZXNldCB0aGUgdGltZXIgYXQgY2VydGFpbiBpbnRlcnZhbHMuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICB0cmFja0NsaWNrcyA9IGZhbHNlOyAvLyBmb3Igc2Vzc2lvbiB0aW1lclxyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRvcGljIGtleSBmb3IgY29udGV4dCBhd2FyZSBoZWxwLiBUaGlzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGhlbHAgbGluayBvZmZlcmVkIGluIHRoZSBoZWxwICg/KSBtZW51LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgaGVscFRvcGljSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogT3V0cHV0IGV2ZW50IHdoaWNoIGVtaXRzIHdoZW4gYSBuZXcgbGFuZ3VhZ2UgaGFzIGJlZW4gc2VsZWN0ZWQgaW4gdGhlIGxhbmd1YWdlIHBpY2tlciBtZW51IGFuZFxyXG4gICAqIGhhbmRsZUxhbmd1YWdlQ2hhbmdlIGlzIGVuYWJsZWQuXHJcbiAgICogRW1pdHMgdGhlIGxvY2FsZSBzdHJpbmcgYXMgcGF5bG9hZC5cclxuICAgKiBzZWUgaGFuZGxlTGFuZ3VhZ2VDaGFuZ2VcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBsYW5ndWFnZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgbmF2SXRlbXM6IGFueVtdO1xyXG4gIHNlYXJjaEZpZWxkSGlkZGVuID0gdHJ1ZTtcclxuICBub3RpZmljYXRpb25Db3VudDogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gIG5vdGlmaWNhdGlvbkJhZGdlSGlkZGVuOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIG5vdGlmaWNhdGlvbkNlbnRlckVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBoZWxwTGlua0NoYW5nZXM6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIGluaXRpYWxpemVkJDogU3ViamVjdDx2b2lkPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWFkZXJuYXZTZXJ2aWNlOiBNdWlIZWFkZXJuYXZTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmhlbHBMaW5rQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQkID0gbmV3IFN1YmplY3QoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydoZWxwVG9waWNJZCddICYmIGNoYW5nZXNbJ2hlbHBUb3BpY0lkJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlSGVscExpbmsoY2hhbmdlc1snaGVscFRvcGljSWQnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hcGlVcmwpIHtcclxuICAgICAgdGhpcy5oZWFkZXJuYXZTZXJ2aWNlXHJcbiAgICAgICAgLmdldE5hdmlnYXRpb25JdGVtcyh0aGlzLmFwaVVybClcclxuICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uYXZJdGVtcyA9IGRhdGEudG9wTmF2O1xyXG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplZCQuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMub25IZWxwTGlua0NoYW5nZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignTXVpSGVhZGVybmF2Q29ucG9uZW50OiBObyB2YWx1ZSBzZXQgZm9yIFthcGlVcmxdLiBObyB0b3BuYXYgaXRlbXMgd2lsbCBiZSBnZW5lcmF0ZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uU2VydmljZSAmJiB0aGlzLm5vdGlmaWNhdGlvbkNlbnRlcikge1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbkNvdW50ID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnVuc2VlbkNvdW50ZXI7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uQmFkZ2VIaWRkZW4gPSB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UudW5zZWVuQ291bnRlci5waXBlKG1hcCh4ID0+IHggPT09IDApKTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25DZW50ZXJFbmFibGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uQ291bnQgPSBFTVBUWTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1lbnVJdGVtQ2xpY2tlZCgkZXZlbnQ6IEV2ZW50LCBpdGVtOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoaXRlbS5ibGFuaykge1xyXG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93Lm9wZW4oaXRlbS5ocmVmKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5oYW5kbGVMYW5ndWFnZUNoYW5nZSAmJiB0eXBlb2YgaXRlbS5sb2NhbGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmxhbmd1YWdlQ2hhbmdlZC5lbWl0KGl0ZW0ubG9jYWxlKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0ubW9kYWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmNyZWF0ZU1vZGFsKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTm90aWZpY2F0aW9uUGFuZWwoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5ub3RpZmljYXRpb25DZW50ZXJFbmFibGVkKSB7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uQ2VudGVyLnRvZ2dsZVN0YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNlYXJjaFRlcm1FbnRlcmVkKHNlYXJjaFRlcm06IHN0cmluZywgc2VhcmNoVXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gc2VhcmNoVXJsICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbihzZWFyY2hRdWVyeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBoZWxwIGxpbmsgdG8gcG9pbnQgdG8gYSBuZXcgaGVscCB0b3BpY1xyXG4gICAqIEBwYXJhbSBoZWxwS2V5IFRoZSBuZXcgaGVscCBrZXkgdG8gYXNzaWduIHRvIHRoZSBsaW5rXHJcbiAgICovXHJcbiAgdXBkYXRlSGVscExpbmsoaGVscEtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmhlbHBMaW5rQ2hhbmdlcy5uZXh0KGhlbHBLZXkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkhlbHBMaW5rQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuaGVscExpbmtDaGFuZ2VzLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlKCgpID0+IHRoaXMuaW5pdGlhbGl6ZWQkKVxyXG4gICAgKVxyXG4gICAgLnN1YnNjcmliZShoZWxwS2V5ID0+IHtcclxuICAgICAgY29uc3QgaGVscFNlY3Rpb24gPSB0aGlzLm5hdkl0ZW1zLmZpbmQoKHZhbHVlOiBhbnkpID0+IHZhbHVlLnR5cGUgPT09ICdoZWxwJyk7XHJcbiAgICAgIGlmIChoZWxwU2VjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGhlbHBMaW5rSXRlbSA9IGhlbHBTZWN0aW9uLm1lbnUuZmluZCgodmFsdWU6IGFueSkgPT4gdmFsdWUuaWQgPT09ICd0bi1oZWxwLW9ubGluZWhlbHAnKTtcclxuICAgICAgICBpZiAoaGVscExpbmtJdGVtKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWxwVXJsID0gbmV3IFVSTChoZWxwTGlua0l0ZW0uaHJlZik7XHJcbiAgICAgICAgICAgIGlmIChoZWxwVXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2xhYmVsJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBoZWxwVXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2xhYmVsJywgYEVuZ2FnZV8ke2hlbHBLZXl9YCk7XHJcbiAgICAgICAgICAgICAgaGVscFVybC5oYXNoID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gVE9ETyBvbGQgaGVscCBsaW5rLCByZW1vdmUgYWZ0ZXIgbWlncmF0aW9uIGRvbmVcclxuICAgICAgICAgICAgICBoZWxwVXJsLmhhc2ggPSBoZWxwS2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlbHBMaW5rSXRlbS5ocmVmID0gaGVscFVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgcGFyc2luZyBoZWxwIHVybCcsIGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RhbChpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuZGlhbG9nLm9wZW4oSGVhZGVybmF2RGlhbG9nQ29tcG9uZW50LCB7XHJcbiAgICAgIGRhdGE6IGl0ZW0sXHJcbiAgICAgIHBhbmVsQ2xhc3M6IGl0ZW0ubW9kYWwuY2xhc3NcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIG5hdkl0ZW1zXCI+XHJcblxyXG4gIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIml0ZW1bJ3R5cGUnXVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIiAqbmdTd2l0Y2hDYXNlPVwiJ3NlYXJjaCdcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250cm9sc1wiIFtjbGFzcy5oaWRkZW5dPVwic2VhcmNoRmllbGRIaWRkZW5cIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInNlYXJjaEZpZWxkSGlkZGVuID0gIXNlYXJjaEZpZWxkSGlkZGVuXCI+XHJcbiAgICAgICAgPG1hdC1pY29uPnNlYXJjaDwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJzZWFyY2gtZmllbGRcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXRJbnB1dCAjc2VhcmNoIChrZXl1cC5lbnRlcik9XCJvblNlYXJjaFRlcm1FbnRlcmVkKHNlYXJjaC52YWx1ZSwgaXRlbS5ocmVmKVwiLz5cclxuICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiAoY2xpY2spPVwic2VhcmNoLnZhbHVlID0gJydcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNlYXJjaC1jbGVhci1pY29uXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidub3RpZmljYXRpb24nXCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uICpuZ0lmPVwibm90aWZpY2F0aW9uQ2VudGVyRW5hYmxlZFwiIChjbGljayk9XCJ0b2dnbGVOb3RpZmljYXRpb25QYW5lbCgpXCI+XHJcbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibmMtbm90aWZpY2F0aW9uLWljb25cIiBbbWF0QmFkZ2VdPVwibm90aWZpY2F0aW9uQ291bnQgfCBhc3luY1wiXHJcbiAgICAgICAgICBbbWF0QmFkZ2VIaWRkZW5dPVwibm90aWZpY2F0aW9uQmFkZ2VIaWRkZW4gfCBhc3luY1wiIG1hdEJhZGdlQ29sb3I9XCJ3YXJuXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2hlbHAnXCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJoZWxwTWVudVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5oZWxwPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxtYXQtbWVudSAjaGVscE1lbnU9XCJtYXRNZW51XCIgW292ZXJsYXBUcmlnZ2VyXT1cImZhbHNlXCI+XHJcbiAgICAgICAgPGEgKm5nRm9yPVwibGV0IG1lbnVJdGVtIG9mIGl0ZW0ubWVudVwiIG1hdC1tZW51LWl0ZW0gW2hyZWZdPVwibWVudUl0ZW0uaHJlZlwiXHJcbiAgICAgICAgICAoY2xpY2spPVwibWVudUl0ZW1DbGlja2VkKCRldmVudCwgbWVudUl0ZW0pXCI+e3sgbWVudUl0ZW0ubmFtZSB9fTwvYT5cclxuICAgICAgPC9tYXQtbWVudT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidhcHBTd2l0Y2hlcidcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFwcHNNZW51XCI+XHJcbiAgICAgICAgPG1hdC1pY29uPmFwcHM8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPG1hdC1tZW51ICNhcHBzTWVudT1cIm1hdE1lbnVcIiBbb3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIj5cclxuICAgICAgICA8YSAqbmdGb3I9XCJsZXQgbWVudUl0ZW0gb2YgaXRlbS5tZW51XCIgbWF0LW1lbnUtaXRlbSBbaHJlZl09XCJtZW51SXRlbS5ocmVmXCJcclxuICAgICAgICAgIChjbGljayk9XCJtZW51SXRlbUNsaWNrZWQoJGV2ZW50LCBtZW51SXRlbSlcIj57eyBtZW51SXRlbS5uYW1lIH19PC9hPlxyXG4gICAgICA8L21hdC1tZW51PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2xhbmdTd2l0Y2hlcidcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImxhbmdNZW51XCIgY2xhc3M9XCJ0ZXh0LW5hdi1idXR0b25cIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbi10ZXh0XCI+e3sgaXRlbS5uYW1lIH19PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPG1hdC1tZW51ICNsYW5nTWVudT1cIm1hdE1lbnVcIiBbb3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIj5cclxuICAgICAgICA8YSAqbmdGb3I9XCJsZXQgbWVudUl0ZW0gb2YgaXRlbS5tZW51XCIgbWF0LW1lbnUtaXRlbSBbaHJlZl09XCJtZW51SXRlbS5ocmVmXCJcclxuICAgICAgICAgIChjbGljayk9XCJtZW51SXRlbUNsaWNrZWQoJGV2ZW50LCBtZW51SXRlbSlcIj57eyBtZW51SXRlbS5uYW1lIH19PC9hPlxyXG4gICAgICA8L21hdC1tZW51PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPG11aS1zZXNzaW9uLXRpbWVyICpuZ1N3aXRjaENhc2U9XCInc2Vzc2lvblRpbWVyJ1wiIFtuYXZJdGVtXT1cIml0ZW1cIiBbdHJhY2tDbGlja3NdPVwidHJhY2tDbGlja3NcIj5cclxuICAgIDwvbXVpLXNlc3Npb24tdGltZXI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ3VzZXInXCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJ1c2VyTWVudVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5wZXJzb248L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPG1hdC1tZW51ICN1c2VyTWVudT1cIm1hdE1lbnVcIiBbb3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIj5cclxuICAgICAgICA8YSAqbmdGb3I9XCJsZXQgbWVudUl0ZW0gb2YgaXRlbS5tZW51XCIgbWF0LW1lbnUtaXRlbSBbaHJlZl09XCJtZW51SXRlbS5ocmVmXCJcclxuICAgICAgICAgIChjbGljayk9XCJtZW51SXRlbUNsaWNrZWQoJGV2ZW50LCBtZW51SXRlbSlcIj57eyBtZW51SXRlbS5uYW1lIH19PC9hPlxyXG4gICAgICA8L21hdC1tZW51PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuIl19