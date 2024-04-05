import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/top-navigation.service";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/button";
import * as i5 from "../top-nav-menu/top-nav-menu.component";
import * as i6 from "../notification-bell/notification-bell.component";
import * as i7 from "../search/search.component";
import * as i8 from "../profile-menu/profile-menu.component";
/**
 * This component creates a top navigation bar with main and aux nav section.
 * Data for the navigation structure to use is loaded from the provided endpoint url.
 */
export class MuiTopNavigationComponent {
    constructor(service, ruler, elementRef, cd) {
        this.service = service;
        this.ruler = ruler;
        this.elementRef = elementRef;
        this.cd = cd;
        this.hostClassName = 'mui-top-navigation';
        /**
         * Navigation component caches its data by default for better performance.
         * The cache can be disabled by setting this property to true.
         */
        this.disableCache = false;
        /** controls visibility of the pagination controls */
        this.showPaginationControls = false;
        /** disabled state for paginator on the left side */
        this.disableScrollBefore = false;
        /** disabled state for paginator on the right side */
        this.disableScrollAfter = false;
        this.ghostList = [...Array(10).keys()];
        this.destroyed$ = new Subject();
        this._scrollPosition = 0;
    }
    get scrollPosition() {
        return this._scrollPosition;
    }
    set scrollPosition(value) {
        this.scrollTo(value);
    }
    ngOnInit() {
        // check for loginAsSystemUser action and force data reload in this case
        const queryParams = new URLSearchParams(window.location.search);
        const actionParam = queryParams.get('action');
        const forceReload = actionParam === 'loginAsSystemUser';
        this.navData$ = this.service.loadNavigationData(this.apiUrl, this.disableCache, forceReload)
            .pipe(tap({
            complete: () => {
                this.initResizeMonitor();
                // give a bit time for rendering to finish and container to be available
                setTimeout(() => this.updatePagination(), 100);
            }
        }));
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /** click handler for the pagination controls in the template */
    onPaginatorClicked(direction) {
        this.scrollMenu(direction);
        this.updatePagination();
    }
    initResizeMonitor() {
        if (this.disablePagination) {
            return;
        }
        const resize = this.ruler.change(250);
        const realign = () => {
            this.updatePagination();
        };
        resize.pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            Promise.resolve()
                .then(realign);
        });
    }
    /** Main update call which bundles all necessary operations regarding scrolling */
    updatePagination() {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateScrollPosition();
    }
    /** check if pagination controls should be visible */
    checkPaginationEnabled() {
        if (this.disablePagination) {
            this.showPaginationControls = false;
        }
        else {
            const isEnabled = this.navItemsContainer.nativeElement.scrollWidth >
                this.navItemsContainer.nativeElement.offsetWidth;
            if (!isEnabled) {
                this.scrollPosition = 0;
            }
            if (isEnabled !== this.showPaginationControls) {
                this.cd.markForCheck();
            }
            this.showPaginationControls = isEnabled;
        }
    }
    /**
     * Update scrolling position to given value. Constrained by container boundaries.
     * @param position new scrolling position to set.
     */
    scrollTo(position) {
        if (this.disablePagination) {
            return;
        }
        const maxScrollDistance = this.getMaxScrollDistance();
        this._scrollPosition = Math.max(0, Math.min(maxScrollDistance, position));
        this.checkScrollingControls();
    }
    /** Scroll the menu in either left or right direction */
    scrollMenu(direction) {
        const viewLength = this.navItemsContainer.nativeElement.offsetWidth;
        // set the scrolling amount to 1/4 of the container width
        const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 4;
        const scrollPosition = this.scrollPosition + scrollAmount;
        this.scrollTo(scrollPosition);
    }
    /** Check if left or right scrolling control should be disabled based on the current scrolling position */
    checkScrollingControls() {
        if (this.disablePagination) {
            this.disableScrollAfter = this.disableScrollBefore = true;
        }
        else {
            this.disableScrollBefore = this.scrollPosition === 0;
            const max = this.getMaxScrollDistance();
            this.disableScrollAfter = this.scrollPosition === max;
            this.cd.markForCheck();
        }
    }
    /** Calculate maximum scroll distance based on container size of the nav menu items */
    getMaxScrollDistance() {
        const navMenusWidth = this.navItemsContainer.nativeElement.scrollWidth;
        const viewWidth = this.navItemsContainer.nativeElement.offsetWidth;
        return (navMenusWidth - viewWidth) || 0;
    }
    /** Performs the actual scrolling based on currently set scroll position */
    updateScrollPosition() {
        if (this.disablePagination) {
            return;
        }
        const scrollOptions = {
            left: this.scrollPosition,
            top: 0,
            behavior: 'smooth'
        };
        this.navItemsContainer.nativeElement.scrollTo(scrollOptions);
    }
}
MuiTopNavigationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationComponent, deps: [{ token: i1.TopNavigationService }, { token: i2.ViewportRuler }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiTopNavigationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiTopNavigationComponent, selector: "mui-top-navigation", inputs: { apiUrl: "apiUrl", notificationCenter: "notificationCenter", disablePagination: "disablePagination", disableCache: "disableCache" }, host: { properties: { "class": "this.hostClassName" } }, viewQueries: [{ propertyName: "navItemsContainer", first: true, predicate: ["navItemsList"], descendants: true }], exportAs: ["muiTopNavigation"], ngImport: i0, template: "<ng-container *ngIf=\"navData$ | async as navData; else ghosts\">\r\n  <mui-top-nav-menu\r\n      [navItem]=\"navData.mainNav[0]\"></mui-top-nav-menu>\r\n\r\n  <nav class=\"mui-main-nav-container\"\r\n      @fadeInOut>\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollBefore\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollBefore\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('before')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_left</span>\r\n    </button>\r\n\r\n    <div #navItemsList\r\n        class=\"mui-main-nav-items-container\">\r\n      <ng-container *ngFor=\"let navItem of navData.mainNav; let i = index\">\r\n        <mui-top-nav-menu *ngIf=\"i > 0\"\r\n            [navItem]=\"navItem\"></mui-top-nav-menu>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollAfter\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollAfter\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('after')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_right</span>\r\n    </button>\r\n  </nav>\r\n  <nav class=\"mui-aux-nav-container\"\r\n      @fadeInOut>\r\n    <ng-container *ngFor=\"let navItem of navData.auxNav\"\r\n        [ngSwitch]=\"navItem.id\"\r\n    >\r\n      <mui-notification-bell\r\n          *ngSwitchCase=\"'aux-notification'\"\r\n          [navItem]=\"navItem\"\r\n          [notificationCenter]=\"notificationCenter\"\r\n      ></mui-notification-bell>\r\n      <mui-search *ngSwitchCase=\"'aux-search'\"\r\n          [navItem]=\"navItem\"></mui-search>\r\n      <mui-profile-menu *ngSwitchCase=\"'aux-user'\"\r\n          [navItem]=\"navItem\"></mui-profile-menu>\r\n      <mui-top-nav-menu *ngSwitchDefault\r\n          [navItem]=\"navItem\"></mui-top-nav-menu>\r\n    </ng-container>\r\n  </nav>\r\n</ng-container>\r\n<ng-template #ghosts>\r\n  <div class=\"nav-ghosts-container\"\r\n      @fadeInOut>\r\n    <div class=\"menu-icon-ghost\">\r\n      <span class=\"mui-icons\">mapp_m</span>\r\n    </div>\r\n    <div *ngFor=\"let g of ghostList\"\r\n        class=\"menu-ghost\"\r\n    ></div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:80vw}}:host{display:flex;height:48px;width:100%}.mui-main-nav-container{display:flex;height:48px;flex-grow:1;flex-shrink:1;overflow:hidden}.mui-aux-nav-container{width:250px;height:48px;display:flex;justify-content:flex-end}.mui-main-nav-pagination{height:100%;width:24px;display:none;border-radius:0;padding:12px 0}.mui-main-nav-pagination-visible{display:initial}.mui-main-nav-items-container{display:flex;overflow:hidden;flex-grow:1;flex-shrink:1}.nav-ghosts-container{display:flex;align-items:center;position:fixed;width:calc(100% - 250px)}.menu-ghost{width:8.5%;height:20px;margin:0 2px;background-image:linear-gradient(90deg,#78859d 0px,#8696b2 40px,#78859d 80px);background-size:80vw;animation:ghost-lines 1.5s infinite linear}.menu-icon-ghost{width:48px;height:48px}.menu-icon-ghost span{color:#fff;display:inline-block;position:relative;top:8px;left:12px}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i5.TopNavMenuComponent, selector: "mui-top-nav-menu", inputs: ["navItem"] }, { kind: "component", type: i6.NotificationBellComponent, selector: "mui-notification-bell", inputs: ["navItem", "notificationCenter"] }, { kind: "component", type: i7.SearchComponent, selector: "mui-search", inputs: ["navItem"] }, { kind: "component", type: i8.ProfileMenuComponent, selector: "mui-profile-menu", inputs: ["navItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('500ms', style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-top-navigation', exportAs: 'muiTopNavigation', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fadeInOut', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('500ms', style({ opacity: 1 })),
                            ]),
                            transition(':leave', [
                                animate('500ms', style({ opacity: 0 }))
                            ])
                        ])
                    ], template: "<ng-container *ngIf=\"navData$ | async as navData; else ghosts\">\r\n  <mui-top-nav-menu\r\n      [navItem]=\"navData.mainNav[0]\"></mui-top-nav-menu>\r\n\r\n  <nav class=\"mui-main-nav-container\"\r\n      @fadeInOut>\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollBefore\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollBefore\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('before')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_left</span>\r\n    </button>\r\n\r\n    <div #navItemsList\r\n        class=\"mui-main-nav-items-container\">\r\n      <ng-container *ngFor=\"let navItem of navData.mainNav; let i = index\">\r\n        <mui-top-nav-menu *ngIf=\"i > 0\"\r\n            [navItem]=\"navItem\"></mui-top-nav-menu>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollAfter\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollAfter\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('after')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_right</span>\r\n    </button>\r\n  </nav>\r\n  <nav class=\"mui-aux-nav-container\"\r\n      @fadeInOut>\r\n    <ng-container *ngFor=\"let navItem of navData.auxNav\"\r\n        [ngSwitch]=\"navItem.id\"\r\n    >\r\n      <mui-notification-bell\r\n          *ngSwitchCase=\"'aux-notification'\"\r\n          [navItem]=\"navItem\"\r\n          [notificationCenter]=\"notificationCenter\"\r\n      ></mui-notification-bell>\r\n      <mui-search *ngSwitchCase=\"'aux-search'\"\r\n          [navItem]=\"navItem\"></mui-search>\r\n      <mui-profile-menu *ngSwitchCase=\"'aux-user'\"\r\n          [navItem]=\"navItem\"></mui-profile-menu>\r\n      <mui-top-nav-menu *ngSwitchDefault\r\n          [navItem]=\"navItem\"></mui-top-nav-menu>\r\n    </ng-container>\r\n  </nav>\r\n</ng-container>\r\n<ng-template #ghosts>\r\n  <div class=\"nav-ghosts-container\"\r\n      @fadeInOut>\r\n    <div class=\"menu-icon-ghost\">\r\n      <span class=\"mui-icons\">mapp_m</span>\r\n    </div>\r\n    <div *ngFor=\"let g of ghostList\"\r\n        class=\"menu-ghost\"\r\n    ></div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:80vw}}:host{display:flex;height:48px;width:100%}.mui-main-nav-container{display:flex;height:48px;flex-grow:1;flex-shrink:1;overflow:hidden}.mui-aux-nav-container{width:250px;height:48px;display:flex;justify-content:flex-end}.mui-main-nav-pagination{height:100%;width:24px;display:none;border-radius:0;padding:12px 0}.mui-main-nav-pagination-visible{display:initial}.mui-main-nav-items-container{display:flex;overflow:hidden;flex-grow:1;flex-shrink:1}.nav-ghosts-container{display:flex;align-items:center;position:fixed;width:calc(100% - 250px)}.menu-ghost{width:8.5%;height:20px;margin:0 2px;background-image:linear-gradient(90deg,#78859d 0px,#8696b2 40px,#78859d 80px);background-size:80vw;animation:ghost-lines 1.5s infinite linear}.menu-icon-ghost{width:48px;height:48px}.menu-icon-ghost span{color:#fff;display:inline-block;position:relative;top:8px;left:12px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TopNavigationService }, { type: i2.ViewportRuler }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], apiUrl: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }], disablePagination: [{
                type: Input
            }], disableCache: [{
                type: Input
            }], navItemsContainer: [{
                type: ViewChild,
                args: ['navItemsList', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXRvcC1uYXZpZ2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvdG9wLW5hdmlnYXRpb24vY29tcG9uZW50cy90b3AtbmF2L211aS10b3AtbmF2aWdhdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL3RvcC1uYXZpZ2F0aW9uL2NvbXBvbmVudHMvdG9wLW5hdi9tdWktdG9wLW5hdmlnYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTFFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBR0wsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7OztBQUloRDs7O0dBR0c7QUFtQkgsTUFBTSxPQUFPLHlCQUF5QjtJQTJDcEMsWUFDWSxPQUE2QixFQUM3QixLQUFvQixFQUNwQixVQUFtQyxFQUNuQyxFQUFxQjtRQUhyQixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUM3QixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBNUNqQyxrQkFBYSxHQUFHLG9CQUFvQixDQUFDO1FBZ0JyQzs7O1dBR0c7UUFFSCxpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQU9wQixxREFBcUQ7UUFDckQs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QUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEMsQ0FBQztZQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNILENBQUM7S0FDSDs0RkFFVSx5QkFBeUI7a0JBbEJyQyxTQUFTOytCQUNFLG9CQUFvQixZQUNwQixrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTSxjQUNuQzt3QkFDVixPQUFPLENBQUMsV0FBVyxFQUFFOzRCQUNuQixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ3hDLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDeEMsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2dNQUtELGFBQWE7c0JBRFosV0FBVzt1QkFBQyxPQUFPO2dCQUtwQixNQUFNO3NCQURMLEtBQUs7Z0JBS04sa0JBQWtCO3NCQURqQixLQUFLO2dCQU9OLGlCQUFpQjtzQkFEaEIsS0FBSztnQkFRTixZQUFZO3NCQURYLEtBQUs7Z0JBSU4saUJBQWlCO3NCQURoQixTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNlbnRlckNvbXBvbmVudCB9IGZyb20gJ0BtYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7IFRvcE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdG9wLW5hdmlnYXRpb24uc2VydmljZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgY3JlYXRlcyBhIHRvcCBuYXZpZ2F0aW9uIGJhciB3aXRoIG1haW4gYW5kIGF1eCBuYXYgc2VjdGlvbi5cclxuICogRGF0YSBmb3IgdGhlIG5hdmlnYXRpb24gc3RydWN0dXJlIHRvIHVzZSBpcyBsb2FkZWQgZnJvbSB0aGUgcHJvdmlkZWQgZW5kcG9pbnQgdXJsLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdWktdG9wLW5hdmlnYXRpb24nLFxyXG4gIGV4cG9ydEFzOiAnbXVpVG9wTmF2aWdhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS10b3AtbmF2aWdhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXVpLXRvcC1uYXZpZ2F0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignZmFkZUluT3V0JywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzUwMG1zJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpVG9wTmF2aWdhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgaG9zdENsYXNzTmFtZSA9ICdtdWktdG9wLW5hdmlnYXRpb24nO1xyXG5cclxuICAvKiogVVJMIGZvciB0aGUgQVBJIGVuZHBvaW50IHdoZXJlIG5hdmlnYXRpb24gZGF0YSBzaG91bGQgYmUgbG9hZGVkIGZyb20gKi9cclxuICBASW5wdXQoKVxyXG4gIGFwaVVybDogc3RyaW5nO1xyXG5cclxuICAvKiogVGVtcGxhdGUgcmVmZXJlbmNlIGZvciBOb3RpZmljYXRpb24gQ2VudGVyIGNvbXBvbmVudCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgbm90aWZpY2F0aW9uQ2VudGVyOiBOb3RpZmljYXRpb25DZW50ZXJDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgcGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5IGlmIG5lZWRlZC4gRW5hYmxlZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZVBhZ2luYXRpb246IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIGNvbXBvbmVudCBjYWNoZXMgaXRzIGRhdGEgYnkgZGVmYXVsdCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxyXG4gICAqIFRoZSBjYWNoZSBjYW4gYmUgZGlzYWJsZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5IHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlQ2FjaGUgPSBmYWxzZVxyXG5cclxuICBAVmlld0NoaWxkKCduYXZJdGVtc0xpc3QnLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBuYXZJdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcblxyXG4gIG5hdkRhdGEkOiBPYnNlcnZhYmxlPE5hdmlnYXRpb24+O1xyXG5cclxuICAvKiogY29udHJvbHMgdmlzaWJpbGl0eSBvZiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyAqL1xyXG4gIHNob3dQYWdpbmF0aW9uQ29udHJvbHMgPSBmYWxzZTtcclxuICAvKiogZGlzYWJsZWQgc3RhdGUgZm9yIHBhZ2luYXRvciBvbiB0aGUgbGVmdCBzaWRlICovXHJcbiAgZGlzYWJsZVNjcm9sbEJlZm9yZSA9IGZhbHNlO1xyXG4gIC8qKiBkaXNhYmxlZCBzdGF0ZSBmb3IgcGFnaW5hdG9yIG9uIHRoZSByaWdodCBzaWRlICovXHJcbiAgZGlzYWJsZVNjcm9sbEFmdGVyID0gZmFsc2U7XHJcblxyXG4gIGdob3N0TGlzdCA9IFsuLi5BcnJheSgxMCkua2V5cygpXTtcclxuXHJcbiAgcHJpdmF0ZSBkZXN0cm95ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF9zY3JvbGxQb3NpdGlvbiA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHNlcnZpY2U6IFRvcE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgICBwcml2YXRlIHJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxyXG4gICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNjcm9sbFBvc2l0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsUG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBzZXQgc2Nyb2xsUG9zaXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5zY3JvbGxUbyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIGNoZWNrIGZvciBsb2dpbkFzU3lzdGVtVXNlciBhY3Rpb24gYW5kIGZvcmNlIGRhdGEgcmVsb2FkIGluIHRoaXMgY2FzZVxyXG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgY29uc3QgYWN0aW9uUGFyYW0gPSBxdWVyeVBhcmFtcy5nZXQoJ2FjdGlvbicpO1xyXG4gICAgY29uc3QgZm9yY2VSZWxvYWQgPSBhY3Rpb25QYXJhbSA9PT0gJ2xvZ2luQXNTeXN0ZW1Vc2VyJztcclxuXHJcbiAgICB0aGlzLm5hdkRhdGEkID0gdGhpcy5zZXJ2aWNlLmxvYWROYXZpZ2F0aW9uRGF0YSh0aGlzLmFwaVVybCwgdGhpcy5kaXNhYmxlQ2FjaGUsIGZvcmNlUmVsb2FkKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICB0YXAoe1xyXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSZXNpemVNb25pdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnaXZlIGEgYml0IHRpbWUgZm9yIHJlbmRlcmluZyB0byBmaW5pc2ggYW5kIGNvbnRhaW5lciB0byBiZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVQYWdpbmF0aW9uKCksIDEwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogY2xpY2sgaGFuZGxlciBmb3IgdGhlIHBhZ2luYXRpb24gY29udHJvbHMgaW4gdGhlIHRlbXBsYXRlICovXHJcbiAgb25QYWdpbmF0b3JDbGlja2VkKGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnNjcm9sbE1lbnUoZGlyZWN0aW9uKTtcclxuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVzaXplTW9uaXRvcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNpemUgPSB0aGlzLnJ1bGVyLmNoYW5nZSgyNTApO1xyXG4gICAgY29uc3QgcmVhbGlnbiA9ICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlc2l6ZS5waXBlKFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpXHJcbiAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgICAgICAgIC50aGVuKHJlYWxpZ24pO1xyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIE1haW4gdXBkYXRlIGNhbGwgd2hpY2ggYnVuZGxlcyBhbGwgbmVjZXNzYXJ5IG9wZXJhdGlvbnMgcmVnYXJkaW5nIHNjcm9sbGluZyAqL1xyXG4gIHByaXZhdGUgdXBkYXRlUGFnaW5hdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hlY2tQYWdpbmF0aW9uRW5hYmxlZCgpO1xyXG4gICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKiogY2hlY2sgaWYgcGFnaW5hdGlvbiBjb250cm9scyBzaG91bGQgYmUgdmlzaWJsZSAqL1xyXG4gIHByaXZhdGUgY2hlY2tQYWdpbmF0aW9uRW5hYmxlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XHJcbiAgICAgIHRoaXMuc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5uYXZJdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID5cclxuICAgICAgICAgIHRoaXMubmF2SXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgIGlmICghaXNFbmFibGVkKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzRW5hYmxlZCAhPT0gdGhpcy5zaG93UGFnaW5hdGlvbkNvbnRyb2xzKSB7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zaG93UGFnaW5hdGlvbkNvbnRyb2xzID0gaXNFbmFibGVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNjcm9sbGluZyBwb3NpdGlvbiB0byBnaXZlbiB2YWx1ZS4gQ29uc3RyYWluZWQgYnkgY29udGFpbmVyIGJvdW5kYXJpZXMuXHJcbiAgICogQHBhcmFtIHBvc2l0aW9uIG5ldyBzY3JvbGxpbmcgcG9zaXRpb24gdG8gc2V0LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Nyb2xsVG8ocG9zaXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZVBhZ2luYXRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1heFNjcm9sbERpc3RhbmNlID0gdGhpcy5nZXRNYXhTY3JvbGxEaXN0YW5jZSgpO1xyXG4gICAgdGhpcy5fc2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTY3JvbGxEaXN0YW5jZSwgcG9zaXRpb24pKTtcclxuICAgIHRoaXMuY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNjcm9sbCB0aGUgbWVudSBpbiBlaXRoZXIgbGVmdCBvciByaWdodCBkaXJlY3Rpb24gKi9cclxuICBwcml2YXRlIHNjcm9sbE1lbnUoZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHZpZXdMZW5ndGggPSB0aGlzLm5hdkl0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAvLyBzZXQgdGhlIHNjcm9sbGluZyBhbW91bnQgdG8gMS80IG9mIHRoZSBjb250YWluZXIgd2lkdGhcclxuICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IChkaXJlY3Rpb24gPT09ICdiZWZvcmUnID8gLTEgOiAxKSAqIHZpZXdMZW5ndGggLyA0O1xyXG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uICsgc2Nyb2xsQW1vdW50O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsVG8oc2Nyb2xsUG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoZWNrIGlmIGxlZnQgb3IgcmlnaHQgc2Nyb2xsaW5nIGNvbnRyb2wgc2hvdWxkIGJlIGRpc2FibGVkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHNjcm9sbGluZyBwb3NpdGlvbiAqL1xyXG4gIHByaXZhdGUgY2hlY2tTY3JvbGxpbmdDb250cm9scygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZVNjcm9sbEFmdGVyID0gdGhpcy5kaXNhYmxlU2Nyb2xsQmVmb3JlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZVNjcm9sbEJlZm9yZSA9IHRoaXMuc2Nyb2xsUG9zaXRpb24gPT09IDA7XHJcbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTtcclxuICAgICAgdGhpcy5kaXNhYmxlU2Nyb2xsQWZ0ZXIgPSB0aGlzLnNjcm9sbFBvc2l0aW9uID09PSBtYXg7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ2FsY3VsYXRlIG1heGltdW0gc2Nyb2xsIGRpc3RhbmNlIGJhc2VkIG9uIGNvbnRhaW5lciBzaXplIG9mIHRoZSBuYXYgbWVudSBpdGVtcyAqL1xyXG4gIHByaXZhdGUgZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG5hdk1lbnVzV2lkdGggPSB0aGlzLm5hdkl0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XHJcbiAgICBjb25zdCB2aWV3V2lkdGggPSB0aGlzLm5hdkl0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICByZXR1cm4gKG5hdk1lbnVzV2lkdGggLSB2aWV3V2lkdGgpIHx8IDA7XHJcbiAgfVxyXG5cclxuICAvKiogUGVyZm9ybXMgdGhlIGFjdHVhbCBzY3JvbGxpbmcgYmFzZWQgb24gY3VycmVudGx5IHNldCBzY3JvbGwgcG9zaXRpb24gKi9cclxuICBwcml2YXRlIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZVBhZ2luYXRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNjcm9sbE9wdGlvbnM6IFNjcm9sbFRvT3B0aW9ucyA9IHtcclxuICAgICAgbGVmdDogdGhpcy5zY3JvbGxQb3NpdGlvbixcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgIH07XHJcbiAgICB0aGlzLm5hdkl0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8oc2Nyb2xsT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwibmF2RGF0YSQgfCBhc3luYyBhcyBuYXZEYXRhOyBlbHNlIGdob3N0c1wiPlxyXG4gIDxtdWktdG9wLW5hdi1tZW51XHJcbiAgICAgIFtuYXZJdGVtXT1cIm5hdkRhdGEubWFpbk5hdlswXVwiPjwvbXVpLXRvcC1uYXYtbWVudT5cclxuXHJcbiAgPG5hdiBjbGFzcz1cIm11aS1tYWluLW5hdi1jb250YWluZXJcIlxyXG4gICAgICBAZmFkZUluT3V0PlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICAgIGNsYXNzPVwibXVpLW1haW4tbmF2LXBhZ2luYXRpb25cIlxyXG4gICAgICAgIFtjbGFzcy5tdWktbWFpbi1uYXYtcGFnaW5hdGlvbi1kaXNhYmxlZF09XCJkaXNhYmxlU2Nyb2xsQmVmb3JlXCJcclxuICAgICAgICBbY2xhc3MubXVpLW1haW4tbmF2LXBhZ2luYXRpb24tdmlzaWJsZV09XCJzaG93UGFnaW5hdGlvbkNvbnRyb2xzXCJcclxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZVNjcm9sbEJlZm9yZVwiXHJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAoY2xpY2spPVwib25QYWdpbmF0b3JDbGlja2VkKCdiZWZvcmUnKVwiXHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibXVpLWljb25zXCI+Y2hldnJvbl9sZWZ0PC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcblxyXG4gICAgPGRpdiAjbmF2SXRlbXNMaXN0XHJcbiAgICAgICAgY2xhc3M9XCJtdWktbWFpbi1uYXYtaXRlbXMtY29udGFpbmVyXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG5hdkl0ZW0gb2YgbmF2RGF0YS5tYWluTmF2OyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPG11aS10b3AtbmF2LW1lbnUgKm5nSWY9XCJpID4gMFwiXHJcbiAgICAgICAgICAgIFtuYXZJdGVtXT1cIm5hdkl0ZW1cIj48L211aS10b3AtbmF2LW1lbnU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGJ1dHRvblxyXG4gICAgICAgIGNsYXNzPVwibXVpLW1haW4tbmF2LXBhZ2luYXRpb25cIlxyXG4gICAgICAgIFtjbGFzcy5tdWktbWFpbi1uYXYtcGFnaW5hdGlvbi1kaXNhYmxlZF09XCJkaXNhYmxlU2Nyb2xsQWZ0ZXJcIlxyXG4gICAgICAgIFtjbGFzcy5tdWktbWFpbi1uYXYtcGFnaW5hdGlvbi12aXNpYmxlXT1cInNob3dQYWdpbmF0aW9uQ29udHJvbHNcIlxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlU2Nyb2xsQWZ0ZXJcIlxyXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uUGFnaW5hdG9yQ2xpY2tlZCgnYWZ0ZXInKVwiXHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibXVpLWljb25zXCI+Y2hldnJvbl9yaWdodDwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvbmF2PlxyXG4gIDxuYXYgY2xhc3M9XCJtdWktYXV4LW5hdi1jb250YWluZXJcIlxyXG4gICAgICBAZmFkZUluT3V0PlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbmF2SXRlbSBvZiBuYXZEYXRhLmF1eE5hdlwiXHJcbiAgICAgICAgW25nU3dpdGNoXT1cIm5hdkl0ZW0uaWRcIlxyXG4gICAgPlxyXG4gICAgICA8bXVpLW5vdGlmaWNhdGlvbi1iZWxsXHJcbiAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2F1eC1ub3RpZmljYXRpb24nXCJcclxuICAgICAgICAgIFtuYXZJdGVtXT1cIm5hdkl0ZW1cIlxyXG4gICAgICAgICAgW25vdGlmaWNhdGlvbkNlbnRlcl09XCJub3RpZmljYXRpb25DZW50ZXJcIlxyXG4gICAgICA+PC9tdWktbm90aWZpY2F0aW9uLWJlbGw+XHJcbiAgICAgIDxtdWktc2VhcmNoICpuZ1N3aXRjaENhc2U9XCInYXV4LXNlYXJjaCdcIlxyXG4gICAgICAgICAgW25hdkl0ZW1dPVwibmF2SXRlbVwiPjwvbXVpLXNlYXJjaD5cclxuICAgICAgPG11aS1wcm9maWxlLW1lbnUgKm5nU3dpdGNoQ2FzZT1cIidhdXgtdXNlcidcIlxyXG4gICAgICAgICAgW25hdkl0ZW1dPVwibmF2SXRlbVwiPjwvbXVpLXByb2ZpbGUtbWVudT5cclxuICAgICAgPG11aS10b3AtbmF2LW1lbnUgKm5nU3dpdGNoRGVmYXVsdFxyXG4gICAgICAgICAgW25hdkl0ZW1dPVwibmF2SXRlbVwiPjwvbXVpLXRvcC1uYXYtbWVudT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmF2PlxyXG48L25nLWNvbnRhaW5lcj5cclxuPG5nLXRlbXBsYXRlICNnaG9zdHM+XHJcbiAgPGRpdiBjbGFzcz1cIm5hdi1naG9zdHMtY29udGFpbmVyXCJcclxuICAgICAgQGZhZGVJbk91dD5cclxuICAgIDxkaXYgY2xhc3M9XCJtZW51LWljb24tZ2hvc3RcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtdWktaWNvbnNcIj5tYXBwX208L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGcgb2YgZ2hvc3RMaXN0XCJcclxuICAgICAgICBjbGFzcz1cIm1lbnUtZ2hvc3RcIlxyXG4gICAgPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=