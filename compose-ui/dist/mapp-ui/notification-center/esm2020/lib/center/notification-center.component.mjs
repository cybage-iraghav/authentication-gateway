import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PanelConfig } from '../shared/models/configurations';
import { NotificationTabs } from '../shared/models/notification-tabs';
import * as i0 from "@angular/core";
import * as i1 from "../shared/services/notification.service";
import * as i2 from "@angular/material/tabs";
import * as i3 from "./notification-alerts.component";
import * as i4 from "./notification-news.component";
const DISPLAY_STATES = {
    hidden: 'hidden',
    visible: 'visible',
};
export class NotificationCenterComponent {
    constructor(notificationService, locale, cd) {
        this.notificationService = notificationService;
        this.cd = cd;
        /** define appearance, either legacy theme or unify, mainly affects the icons */
        this.appearance = 'unify';
        this.selectedTab = NotificationTabs.AlertsTab;
        this.panelDisplay = DISPLAY_STATES.hidden;
        this.iconClass = 'material-icons';
        this.destroyed$ = new Subject();
        this.config = new PanelConfig();
    }
    ngOnInit() {
        this.notificationService.init();
        this.notifications = this.notificationService.notifications;
        this.notificationService.appearance = this.appearance;
        if (this.appearance === 'unify') {
            this.iconClass = 'mui-icons';
        }
        this.notificationService.panelOpenedChanges
            .pipe(takeUntil(this.destroyed$), filter((ev) => ev === true))
            .subscribe(() => this.openPanel());
    }
    ngOnDestroy() {
        this.notificationService.stopRefresh();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    addNotification(notification) {
        this.notificationService.addNotification(notification);
    }
    dismissNotification(notification) {
        this.notificationService.dismissNotification(notification);
    }
    dismissAll() {
        this.notificationService.dismissAllAlerts();
        this.toggleState();
    }
    toggleState() {
        if (this.panelDisplay === DISPLAY_STATES.visible) {
            this.panelDisplay = DISPLAY_STATES.hidden;
            this.notificationService.activeTab = NotificationTabs.None;
            this.notificationService.updatePanelState(false);
        }
        else {
            this.panelDisplay = DISPLAY_STATES.visible;
            this.notificationService.setNotificationsSeen(this.selectedTab);
            this.notificationService.updatePanelState(true);
        }
        this.cd.markForCheck();
    }
    changeTab($event) {
        this.notificationService.setNotificationsSeen($event.index);
    }
    openPanel() {
        if (this.panelDisplay === DISPLAY_STATES.hidden) {
            this.panelDisplay = DISPLAY_STATES.visible;
            this.notificationService.setNotificationsSeen(this.selectedTab);
            this.notificationService.updatePanelState(true);
            this.cd.markForCheck();
        }
    }
    clickMessageOptionalAction(url) {
        let newUrl = url;
        const patt = new RegExp('\{jsessionid\}');
        if (patt.test(url)) {
            newUrl = url.replace(patt, this.notificationService.sessionId);
            // console.log('jsessionid was replaced in url [' + url + '] to', newUrl);
        }
        window.open(newUrl, '_blank');
    }
    onNotificationDismiss(notification) {
        this.dismissNotification(notification);
    }
    onMessageClickOptionalAction(link) {
        this.clickMessageOptionalAction(link);
    }
}
NotificationCenterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, deps: [{ token: i1.NotificationService }, { token: LOCALE_ID }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NotificationCenterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationCenterComponent, selector: "mui-notification-center", inputs: { config: "config", appearance: "appearance" }, exportAs: ["muiNotificationCenter"], ngImport: i0, template: "<div [@panelDisplayState]=\"panelDisplay\"\r\n    class=\"mui-notification-center mui-nc-panel\"\r\n    [style.top]=\"config.topOffset\"\r\n    id=\"mui-notification-center\">\r\n  <header class=\"mui-nc-panel-header\">\r\n    <h5 class=\"mui-nc-panel-title\" i18n=\"@@nc_notification_center\">Notification Center</h5>\r\n    <span class=\"{{ iconClass }} mui-nc-panel-close\"\r\n        (click)=\"toggleState()\">close</span>\r\n  </header>\r\n  <div class=\"mui-notification-tabs\">\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTab\"\r\n        (selectedTabChange)=\"changeTab($event)\"\r\n        [disablePagination]=\"true\">\r\n      <mat-tab label=\"Alerts\" i18n-label=\"@@nc_alerts\">\r\n        <mui-notification-alerts [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"\r\n            (dismissAlert)=\"onNotificationDismiss($event)\"\r\n            (dismissAlertsAll)=\"dismissAll()\"\r\n            (clickMessageOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-alerts>\r\n      </mat-tab>\r\n      <mat-tab label=\"News & Updates\" i18n-label=\"@@nc_news\">\r\n        <mui-notification-news [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"></mui-notification-news>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [".mui-nc-panel{background-color:#fff;bottom:0;overflow-x:hidden;overflow-y:auto;padding:0;position:fixed;right:0;top:0;width:400px;box-shadow:-2px 0 17px #00000046;z-index:500}.mui-nc-panel-header{height:40px;padding:0 16px;position:relative;display:flex;align-items:center;justify-content:space-between}.mui-nc-panel-close{color:#fff;cursor:pointer;width:16px;height:16px;line-height:16px;font-size:16px;-webkit-user-select:none;user-select:none}.mui-nc-panel-title{margin:0;overflow:hidden;text-overflow:ellipsis}.mui-notification-tabs{height:calc(100% - 40px)}.mui-notification-tabs .mat-mdc-tab-group{height:100%}\n"], dependencies: [{ kind: "component", type: i2.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i2.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "component", type: i3.NotificationCenterAlertsComponent, selector: "mui-notification-alerts", inputs: ["notifications"], outputs: ["closePanel", "dismissAlert", "dismissAlertsAll", "clickMessageOptionalAction"], exportAs: ["muiNotificationAlerts"] }, { kind: "component", type: i4.NotificationCenterNewsComponent, selector: "mui-notification-news", inputs: ["notifications"], outputs: ["closePanel"], exportAs: ["muiNotificationNews"] }], animations: [
        trigger('panelDisplayState', [
            state(DISPLAY_STATES.hidden, style({
                right: '-430px',
                width: 0
            })),
            state(DISPLAY_STATES.visible, style({
            // we only use what is defined in css class
            })),
            transition('visible => hidden', 
            // only animate 'right' property
            animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: '-430px' }))),
            transition('hidden => visible', [
                style({
                    width: '*' // reset width before animation starts
                }),
                animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-center', exportAs: 'muiNotificationCenter', animations: [
                        trigger('panelDisplayState', [
                            state(DISPLAY_STATES.hidden, style({
                                right: '-430px',
                                width: 0
                            })),
                            state(DISPLAY_STATES.visible, style({
                            // we only use what is defined in css class
                            })),
                            transition('visible => hidden', 
                            // only animate 'right' property
                            animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: '-430px' }))),
                            transition('hidden => visible', [
                                style({
                                    width: '*' // reset width before animation starts
                                }),
                                animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: 0 }))
                            ])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [@panelDisplayState]=\"panelDisplay\"\r\n    class=\"mui-notification-center mui-nc-panel\"\r\n    [style.top]=\"config.topOffset\"\r\n    id=\"mui-notification-center\">\r\n  <header class=\"mui-nc-panel-header\">\r\n    <h5 class=\"mui-nc-panel-title\" i18n=\"@@nc_notification_center\">Notification Center</h5>\r\n    <span class=\"{{ iconClass }} mui-nc-panel-close\"\r\n        (click)=\"toggleState()\">close</span>\r\n  </header>\r\n  <div class=\"mui-notification-tabs\">\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTab\"\r\n        (selectedTabChange)=\"changeTab($event)\"\r\n        [disablePagination]=\"true\">\r\n      <mat-tab label=\"Alerts\" i18n-label=\"@@nc_alerts\">\r\n        <mui-notification-alerts [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"\r\n            (dismissAlert)=\"onNotificationDismiss($event)\"\r\n            (dismissAlertsAll)=\"dismissAll()\"\r\n            (clickMessageOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-alerts>\r\n      </mat-tab>\r\n      <mat-tab label=\"News & Updates\" i18n-label=\"@@nc_news\">\r\n        <mui-notification-news [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"></mui-notification-news>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [".mui-nc-panel{background-color:#fff;bottom:0;overflow-x:hidden;overflow-y:auto;padding:0;position:fixed;right:0;top:0;width:400px;box-shadow:-2px 0 17px #00000046;z-index:500}.mui-nc-panel-header{height:40px;padding:0 16px;position:relative;display:flex;align-items:center;justify-content:space-between}.mui-nc-panel-close{color:#fff;cursor:pointer;width:16px;height:16px;line-height:16px;font-size:16px;-webkit-user-select:none;user-select:none}.mui-nc-panel-title{margin:0;overflow:hidden;text-overflow:ellipsis}.mui-notification-tabs{height:calc(100% - 40px)}.mui-notification-tabs .mat-mdc-tab-group{height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NotificationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { config: [{
                type: Input
            }], appearance: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWNlbnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9jZW50ZXIvbm90aWZpY2F0aW9uLWNlbnRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9jZW50ZXIvbm90aWZpY2F0aW9uLWNlbnRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpGLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhILE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFHdEUsTUFBTSxjQUFjLEdBQUc7SUFDckIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQztBQW1DRixNQUFNLE9BQU8sMkJBQTJCO0lBZXRDLFlBQ1ksbUJBQXdDLEVBQzdCLE1BQWMsRUFDekIsRUFBcUI7UUFGckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUV4QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWRqQyxnRkFBZ0Y7UUFDdkUsZUFBVSxHQUFpQixP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TTtzQkFBZCxLQUFLO2dCQUdHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHR5cGUgeyBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFRhYkNoYW5nZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5DQXBwZWFyYW5jZSwgUGFuZWxDb25maWcgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2NvbmZpZ3VyYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvbm90aWZpY2F0aW9uJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uVGFicyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvbm90aWZpY2F0aW9uLXRhYnMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERJU1BMQVlfU1RBVEVTID0ge1xyXG4gIGhpZGRlbjogJ2hpZGRlbicsXHJcbiAgdmlzaWJsZTogJ3Zpc2libGUnLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdWktbm90aWZpY2F0aW9uLWNlbnRlcicsXHJcbiAgZXhwb3J0QXM6ICdtdWlOb3RpZmljYXRpb25DZW50ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RpZmljYXRpb24tY2VudGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ub3RpZmljYXRpb24tY2VudGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcigncGFuZWxEaXNwbGF5U3RhdGUnLCBbXHJcbiAgICAgIHN0YXRlKERJU1BMQVlfU1RBVEVTLmhpZGRlbiwgc3R5bGUoe1xyXG4gICAgICAgIHJpZ2h0OiAnLTQzMHB4JyxcclxuICAgICAgICB3aWR0aDogMFxyXG4gICAgICB9KSksXHJcblxyXG4gICAgICBzdGF0ZShESVNQTEFZX1NUQVRFUy52aXNpYmxlLCBzdHlsZSh7XHJcbiAgICAgICAgLy8gd2Ugb25seSB1c2Ugd2hhdCBpcyBkZWZpbmVkIGluIGNzcyBjbGFzc1xyXG4gICAgICB9KSksXHJcblxyXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsXHJcbiAgICAgICAgLy8gb25seSBhbmltYXRlICdyaWdodCcgcHJvcGVydHlcclxuICAgICAgICBhbmltYXRlKCcwLjRzIGN1YmljLWJlemllcigwLjA3NSwgMC44MiwgMC4xNjUsIDEpJywgc3R5bGUoe3JpZ2h0OiAnLTQzMHB4J30pKVxyXG4gICAgICApLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBbXHJcbiAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiAnKicgLy8gcmVzZXQgd2lkdGggYmVmb3JlIGFuaW1hdGlvbiBzdGFydHNcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMC40cyBjdWJpYy1iZXppZXIoMC4wNzUsIDAuODIsIDAuMTY1LCAxKScsIHN0eWxlKHtyaWdodDogMH0pKVxyXG4gICAgICAgIF1cclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ2VudGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBjb25maWc6IFBhbmVsQ29uZmlnO1xyXG5cclxuICAvKiogZGVmaW5lIGFwcGVhcmFuY2UsIGVpdGhlciBsZWdhY3kgdGhlbWUgb3IgdW5pZnksIG1haW5seSBhZmZlY3RzIHRoZSBpY29ucyAqL1xyXG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IE5DQXBwZWFyYW5jZSA9ICd1bmlmeSc7XHJcblxyXG4gIHNlbGVjdGVkVGFiID0gTm90aWZpY2F0aW9uVGFicy5BbGVydHNUYWI7XHJcblxyXG4gIHBhbmVsRGlzcGxheTogc3RyaW5nID0gRElTUExBWV9TVEFURVMuaGlkZGVuO1xyXG4gIG5vdGlmaWNhdGlvbnM6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uW10+O1xyXG4gIGljb25DbGFzcyA9ICdtYXRlcmlhbC1pY29ucyc7XHJcblxyXG4gIHByaXZhdGUgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcclxuICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMuY29uZmlnID0gbmV3IFBhbmVsQ29uZmlnKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5pbml0KCk7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uubm90aWZpY2F0aW9ucztcclxuICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5hcHBlYXJhbmNlID0gdGhpcy5hcHBlYXJhbmNlO1xyXG4gICAgaWYgKHRoaXMuYXBwZWFyYW5jZSA9PT0gJ3VuaWZ5Jykge1xyXG4gICAgICB0aGlzLmljb25DbGFzcyA9ICdtdWktaWNvbnMnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5wYW5lbE9wZW5lZENoYW5nZXNcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCksXHJcbiAgICAgICAgICAgIGZpbHRlcigoZXYpID0+IGV2ID09PSB0cnVlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub3BlblBhbmVsKCkpXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdG9wUmVmcmVzaCgpO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcclxuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbik7XHJcbiAgfVxyXG5cclxuICBkaXNtaXNzTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZGlzbWlzc05vdGlmaWNhdGlvbihub3RpZmljYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZGlzbWlzc0FsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5kaXNtaXNzQWxsQWxlcnRzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTdGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhbmVsRGlzcGxheSA9PT0gRElTUExBWV9TVEFURVMudmlzaWJsZSkge1xyXG4gICAgICB0aGlzLnBhbmVsRGlzcGxheSA9IERJU1BMQVlfU1RBVEVTLmhpZGRlbjtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmFjdGl2ZVRhYiA9IE5vdGlmaWNhdGlvblRhYnMuTm9uZTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnVwZGF0ZVBhbmVsU3RhdGUoZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbERpc3BsYXkgPSBESVNQTEFZX1NUQVRFUy52aXNpYmxlO1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2V0Tm90aWZpY2F0aW9uc1NlZW4odGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS51cGRhdGVQYW5lbFN0YXRlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRhYigkZXZlbnQ6IE1hdFRhYkNoYW5nZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2V0Tm90aWZpY2F0aW9uc1NlZW4oJGV2ZW50LmluZGV4KTtcclxuICB9XHJcblxyXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhbmVsRGlzcGxheSA9PT0gRElTUExBWV9TVEFURVMuaGlkZGVuKSB7XHJcbiAgICAgIHRoaXMucGFuZWxEaXNwbGF5ID0gRElTUExBWV9TVEFURVMudmlzaWJsZTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNldE5vdGlmaWNhdGlvbnNTZWVuKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UudXBkYXRlUGFuZWxTdGF0ZSh0cnVlKTtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrTWVzc2FnZU9wdGlvbmFsQWN0aW9uKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgbmV3VXJsID0gdXJsO1xyXG4gICAgY29uc3QgcGF0dCA9IG5ldyBSZWdFeHAoJ1xce2pzZXNzaW9uaWRcXH0nKTtcclxuICAgIGlmIChwYXR0LnRlc3QodXJsKSkge1xyXG4gICAgICBuZXdVcmwgPSB1cmwucmVwbGFjZShwYXR0LCB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2Vzc2lvbklkICk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdqc2Vzc2lvbmlkIHdhcyByZXBsYWNlZCBpbiB1cmwgWycgKyB1cmwgKyAnXSB0bycsIG5ld1VybCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cub3BlbihuZXdVcmwsICdfYmxhbmsnKTtcclxuICB9XHJcblxyXG4gIG9uTm90aWZpY2F0aW9uRGlzbWlzcyhub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNtaXNzTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbik7XHJcbiAgfVxyXG5cclxuICBvbk1lc3NhZ2VDbGlja09wdGlvbmFsQWN0aW9uKGxpbms6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGlja01lc3NhZ2VPcHRpb25hbEFjdGlvbihsaW5rKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgW0BwYW5lbERpc3BsYXlTdGF0ZV09XCJwYW5lbERpc3BsYXlcIlxyXG4gICAgY2xhc3M9XCJtdWktbm90aWZpY2F0aW9uLWNlbnRlciBtdWktbmMtcGFuZWxcIlxyXG4gICAgW3N0eWxlLnRvcF09XCJjb25maWcudG9wT2Zmc2V0XCJcclxuICAgIGlkPVwibXVpLW5vdGlmaWNhdGlvbi1jZW50ZXJcIj5cclxuICA8aGVhZGVyIGNsYXNzPVwibXVpLW5jLXBhbmVsLWhlYWRlclwiPlxyXG4gICAgPGg1IGNsYXNzPVwibXVpLW5jLXBhbmVsLXRpdGxlXCIgaTE4bj1cIkBAbmNfbm90aWZpY2F0aW9uX2NlbnRlclwiPk5vdGlmaWNhdGlvbiBDZW50ZXI8L2g1PlxyXG4gICAgPHNwYW4gY2xhc3M9XCJ7eyBpY29uQ2xhc3MgfX0gbXVpLW5jLXBhbmVsLWNsb3NlXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlU3RhdGUoKVwiPmNsb3NlPC9zcGFuPlxyXG4gIDwvaGVhZGVyPlxyXG4gIDxkaXYgY2xhc3M9XCJtdWktbm90aWZpY2F0aW9uLXRhYnNcIj5cclxuICAgIDxtYXQtdGFiLWdyb3VwIFsoc2VsZWN0ZWRJbmRleCldPVwic2VsZWN0ZWRUYWJcIlxyXG4gICAgICAgIChzZWxlY3RlZFRhYkNoYW5nZSk9XCJjaGFuZ2VUYWIoJGV2ZW50KVwiXHJcbiAgICAgICAgW2Rpc2FibGVQYWdpbmF0aW9uXT1cInRydWVcIj5cclxuICAgICAgPG1hdC10YWIgbGFiZWw9XCJBbGVydHNcIiBpMThuLWxhYmVsPVwiQEBuY19hbGVydHNcIj5cclxuICAgICAgICA8bXVpLW5vdGlmaWNhdGlvbi1hbGVydHMgW25vdGlmaWNhdGlvbnNdPVwibm90aWZpY2F0aW9uc1wiXHJcbiAgICAgICAgICAgIChjbG9zZVBhbmVsKT1cInRvZ2dsZVN0YXRlKClcIlxyXG4gICAgICAgICAgICAoZGlzbWlzc0FsZXJ0KT1cIm9uTm90aWZpY2F0aW9uRGlzbWlzcygkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGRpc21pc3NBbGVydHNBbGwpPVwiZGlzbWlzc0FsbCgpXCJcclxuICAgICAgICAgICAgKGNsaWNrTWVzc2FnZU9wdGlvbmFsQWN0aW9uKT1cIm9uTWVzc2FnZUNsaWNrT3B0aW9uYWxBY3Rpb24oJGV2ZW50KVwiPjwvbXVpLW5vdGlmaWNhdGlvbi1hbGVydHM+XHJcbiAgICAgIDwvbWF0LXRhYj5cclxuICAgICAgPG1hdC10YWIgbGFiZWw9XCJOZXdzICYgVXBkYXRlc1wiIGkxOG4tbGFiZWw9XCJAQG5jX25ld3NcIj5cclxuICAgICAgICA8bXVpLW5vdGlmaWNhdGlvbi1uZXdzIFtub3RpZmljYXRpb25zXT1cIm5vdGlmaWNhdGlvbnNcIlxyXG4gICAgICAgICAgICAoY2xvc2VQYW5lbCk9XCJ0b2dnbGVTdGF0ZSgpXCI+PC9tdWktbm90aWZpY2F0aW9uLW5ld3M+XHJcbiAgICAgIDwvbWF0LXRhYj5cclxuICAgIDwvbWF0LXRhYi1ncm91cD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==