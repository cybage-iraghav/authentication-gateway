import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { DISPLAY_STATES } from '../../shared/models/message';
import { MessageComponent } from '../alert/message.component';
import { messageDisplayAnimation } from '../animations';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/notification.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
export class MessageStickyComponent extends MessageComponent {
    constructor(notificationService, sanitizer, cd) {
        super(sanitizer, cd, notificationService);
        this.messageDisplay = DISPLAY_STATES.expanded;
        this.timeLeft = '';
    }
    ngOnChanges() {
        this.message = this.notification.messages[0];
        if (this.notification.type === 'COUNTDOWN') {
            const updateTimer = timer(0, 60000);
            this.timerSubscription = updateTimer.subscribe(() => this.timeLeftCalc());
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.timerSubscription?.unsubscribe();
    }
    timeLeftCalc() {
        if (this.notification.expiryTime) {
            const expiry = DateTime.fromISO(this.notification.expiryTime);
            const duration = expiry.diff(DateTime.local());
            const ms = duration.milliseconds;
            if (ms < 1) {
                this.timerSubscription.unsubscribe();
                this.ncs.dismissNotification(this.notification);
            }
            else {
                this.timeLeft = expiry.toRelative({ style: 'short' });
            }
            this.cd.markForCheck();
        }
    }
}
MessageStickyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageStickyComponent, deps: [{ token: i1.NotificationService }, { token: i2.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MessageStickyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MessageStickyComponent, selector: "mui-notification-message-sticky", inputs: { notification: "notification" }, exportAs: ["muiNotificationMessageSticky"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"sticky-message-container\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} sticky-message-icon warning\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\"\r\n        *ngIf=\"notification.type === 'COUNTDOWN'\">\r\n      <span class=\"sticky-countdown\">{{ timeLeft }}</span>\r\n    </div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div class=\"plaintext\">{{message.body}}</div>\r\n      </div>\r\n      <div class=\"mui-message-actions\"\r\n          *ngIf=\"message.optionalActionLink\">\r\n        <a href=\"{{message.optionalActionLink}}\"\r\n            target=\"_blank\"\r\n            class=\"mui-btn-action\"\r\n            i18n=\"@@nc_more_details\"\r\n        >More Details</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [messageDisplayAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageStickyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-message-sticky', exportAs: 'muiNotificationMessageSticky', animations: [messageDisplayAnimation], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"sticky-message-container\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} sticky-message-icon warning\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\"\r\n        *ngIf=\"notification.type === 'COUNTDOWN'\">\r\n      <span class=\"sticky-countdown\">{{ timeLeft }}</span>\r\n    </div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div class=\"plaintext\">{{message.body}}</div>\r\n      </div>\r\n      <div class=\"mui-message-actions\"\r\n          *ngIf=\"message.optionalActionLink\">\r\n        <a href=\"{{message.optionalActionLink}}\"\r\n            target=\"_blank\"\r\n            class=\"mui-btn-action\"\r\n            i18n=\"@@nc_more_details\"\r\n        >More Details</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NotificationService }, { type: i2.DomSanitizer }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { notification: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1zdGlja3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyL3NyYy9saWIvbWVzc2FnZXMvc3RpY2t5L21lc3NhZ2Utc3RpY2t5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvbm90aWZpY2F0aW9uLWNlbnRlci9zcmMvbGliL21lc3NhZ2VzL3N0aWNreS9tZXNzYWdlLXN0aWNreS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxLQUFLLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDakMsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBVyxNQUFNLDZCQUE2QixDQUFDO0FBSXRFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFVeEQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGdCQUFnQjtJQVUxRCxZQUNJLG1CQUF3QyxFQUN4QyxTQUF1QixFQUN2QixFQUFxQjtRQUN2QixLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBVG5DLG1CQUFjLEdBQVcsY0FBYyxDQUFDLFFBQVEsQ0FBQztRQUMxRCxhQUFRLEdBQWtCLEVBQUUsQ0FBQztJQVM3QixDQUFDO0lBRVEsV0FBVztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzFDLE1BQU0sV0FBVyxHQUF1QixLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzNFO0lBQ0gsQ0FBQztJQUVRLFdBQVc7UUFDbEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDL0MsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUNqQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOztvSEEzQ1Usc0JBQXNCO3dHQUF0QixzQkFBc0IseU1DbkJuQyxveUNBaUNBLDgvQ0RqQmMsQ0FBQyx1QkFBdUIsQ0FBQzs0RkFHMUIsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLGlDQUFpQyxZQUNqQyw4QkFBOEIsY0FHNUIsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTtxS0FJN0IsWUFBWTtzQkFBN0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERJU1BMQVlfU1RBVEVTLCBNZXNzYWdlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9tZXNzYWdlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24nO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuLi9hbGVydC9tZXNzYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IG1lc3NhZ2VEaXNwbGF5QW5pbWF0aW9uIH0gZnJvbSAnLi4vYW5pbWF0aW9ucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1ub3RpZmljYXRpb24tbWVzc2FnZS1zdGlja3knLFxyXG4gIGV4cG9ydEFzOiAnbXVpTm90aWZpY2F0aW9uTWVzc2FnZVN0aWNreScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2Utc3RpY2t5LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi4vYWxlcnQvbWVzc2FnZS5jb21wb25lbnQuc2NzcycsICcuLi9pY29ucy5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbbWVzc2FnZURpc3BsYXlBbmltYXRpb25dLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU3RpY2t5Q29tcG9uZW50IGV4dGVuZHMgTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgb3ZlcnJpZGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb247XHJcblxyXG4gIG92ZXJyaWRlIG1lc3NhZ2U6IE1lc3NhZ2U7IC8vIHNob3J0Y3V0IHRvIGZpcnN0IG1lc3NhZ2VcclxuICBvdmVycmlkZSBtZXNzYWdlRGlzcGxheTogc3RyaW5nID0gRElTUExBWV9TVEFURVMuZXhwYW5kZWQ7XHJcbiAgdGltZUxlZnQ6IHN0cmluZyB8IG51bGwgPSAnJztcclxuXHJcbiAgcHJpdmF0ZSB0aW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICAgIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgc3VwZXIoc2FuaXRpemVyLCBjZCwgbm90aWZpY2F0aW9uU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMubm90aWZpY2F0aW9uLm1lc3NhZ2VzWzBdO1xyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uLnR5cGUgPT09ICdDT1VOVERPV04nKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZVRpbWVyOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aW1lcigwLCA2MDAwMCk7XHJcbiAgICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24gPSB1cGRhdGVUaW1lci5zdWJzY3JpYmUoKCkgPT4gdGhpcy50aW1lTGVmdENhbGMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgdGltZUxlZnRDYWxjKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uLmV4cGlyeVRpbWUpIHtcclxuICAgICAgY29uc3QgZXhwaXJ5ID0gRGF0ZVRpbWUuZnJvbUlTTyh0aGlzLm5vdGlmaWNhdGlvbi5leHBpcnlUaW1lKTtcclxuICAgICAgY29uc3QgZHVyYXRpb24gPSBleHBpcnkuZGlmZihEYXRlVGltZS5sb2NhbCgpKTtcclxuICAgICAgY29uc3QgbXMgPSBkdXJhdGlvbi5taWxsaXNlY29uZHM7XHJcbiAgICAgIGlmIChtcyA8IDEpIHtcclxuICAgICAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5uY3MuZGlzbWlzc05vdGlmaWNhdGlvbih0aGlzLm5vdGlmaWNhdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50aW1lTGVmdCA9IGV4cGlyeS50b1JlbGF0aXZlKHsgc3R5bGU6ICdzaG9ydCcgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJzdGlja3ktbWVzc2FnZS1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLW1lc3NhZ2UtY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibXVpLXRpdGxlLWNvbnRhaW5lclwiPlxyXG4gICAgICA8aSBjbGFzcz1cInt7IGljb25DbGFzcyB9fSBzdGlja3ktbWVzc2FnZS1pY29uIHdhcm5pbmdcIj48L2k+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibXVpLXRpdGxlXCI+e3tnZXRUaXRsZSgpfX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibXVpLWV4cGFuZFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTWVzc2FnZVZpZXdTdGF0ZSgpXCI+XHJcbiAgICAgIDxpIFtjbGFzc109XCJpY29uQ2xhc3NcIlxyXG4gICAgICAgICAgKm5nSWY9XCJtZXNzYWdlRGlzcGxheSA9PT0gJ2NvbGxhcHNlZCdcIj57eyBleHBhbmRJY29uIH19PC9pPlxyXG4gICAgICA8aSBbY2xhc3NdPVwiaWNvbkNsYXNzXCJcclxuICAgICAgICAgICpuZ0lmPVwibWVzc2FnZURpc3BsYXkgPT09ICdleHBhbmRlZCdcIj57eyBjb2xsYXBzZUljb24gfX08L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktdGl0bGUtdGltZVwiXHJcbiAgICAgICAgKm5nSWY9XCJub3RpZmljYXRpb24udHlwZSA9PT0gJ0NPVU5URE9XTidcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzdGlja3ktY291bnRkb3duXCI+e3sgdGltZUxlZnQgfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktbWVzc2FnZS1ib2R5XCJcclxuICAgICAgICBbQG1lc3NhZ2VEaXNwbGF5U3RhdGVdPVwibWVzc2FnZURpc3BsYXlcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm11aS1tZXNzYWdlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBsYWludGV4dFwiPnt7bWVzc2FnZS5ib2R5fX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtdWktbWVzc2FnZS1hY3Rpb25zXCJcclxuICAgICAgICAgICpuZ0lmPVwibWVzc2FnZS5vcHRpb25hbEFjdGlvbkxpbmtcIj5cclxuICAgICAgICA8YSBocmVmPVwie3ttZXNzYWdlLm9wdGlvbmFsQWN0aW9uTGlua319XCJcclxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJtdWktYnRuLWFjdGlvblwiXHJcbiAgICAgICAgICAgIGkxOG49XCJAQG5jX21vcmVfZGV0YWlsc1wiXHJcbiAgICAgICAgPk1vcmUgRGV0YWlsczwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==