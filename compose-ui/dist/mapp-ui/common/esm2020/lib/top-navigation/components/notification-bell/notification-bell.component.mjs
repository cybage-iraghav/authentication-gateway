import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@mapp-ui/notification-center";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/badge";
import * as i4 from "@angular/common";
export class NotificationBellComponent {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.notificationCenterEnabled = false;
    }
    ngOnInit() {
        if (this.notificationService && this.notificationCenter) {
            this.notificationCount = this.notificationService.unseenCounter;
            this.notificationBadgeHidden = this.notificationCount.pipe(map(x => x === 0));
            this.notificationCenterEnabled = true;
        }
        else {
            this.notificationCount = EMPTY;
        }
    }
    toggleNotificationPanel() {
        if (this.notificationCenterEnabled) {
            this.notificationCenter.toggleState();
        }
    }
}
NotificationBellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationBellComponent, deps: [{ token: i1.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NotificationBellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationBellComponent, selector: "mui-notification-bell", inputs: { navItem: "navItem", notificationCenter: "notificationCenter" }, ngImport: i0, template: "<button (click)=\"toggleNotificationPanel()\"\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span [matBadgeHidden]=\"notificationBadgeHidden | async\"\r\n      [matBadge]=\"notificationCount | async\"\r\n      class=\"mui-icons\"\r\n      matBadgeColor=\"warn\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}\n"], dependencies: [{ kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i3.MatBadge, selector: "[matBadge]", inputs: ["matBadgeDisabled", "matBadgeColor", "matBadgeOverlap", "matBadgePosition", "matBadge", "matBadgeDescription", "matBadgeSize", "matBadgeHidden"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationBellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-bell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button (click)=\"toggleNotificationPanel()\"\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span [matBadgeHidden]=\"notificationBadgeHidden | async\"\r\n      [matBadge]=\"notificationCount | async\"\r\n      class=\"mui-icons\"\r\n      matBadgeColor=\"warn\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NotificationService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { navItem: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi90b3AtbmF2aWdhdGlvbi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1iZWxsL25vdGlmaWNhdGlvbi1iZWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvdG9wLW5hdmlnYXRpb24vY29tcG9uZW50cy9ub3RpZmljYXRpb24tYmVsbC9ub3RpZmljYXRpb24tYmVsbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUYsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVNyQyxNQUFNLE9BQU8seUJBQXlCO0lBVXBDLFlBQWdDLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRnhFLDhCQUF5QixHQUFHLEtBQUssQ0FBQztJQUdsQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN2RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztZQUNoRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO0lBRUgsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOzt1SEE1QlUseUJBQXlCOzJHQUF6Qix5QkFBeUIsdUlDYnRDLHVXQVdBOzRGREVhLHlCQUF5QjtrQkFOckMsU0FBUzsrQkFDRSx1QkFBdUIsbUJBR2hCLHVCQUF1QixDQUFDLE1BQU07OzBCQVlsQyxRQUFROzRDQVJyQixPQUFPO3NCQUROLEtBQUs7Z0JBR04sa0JBQWtCO3NCQURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHR5cGUgeyBOb3RpZmljYXRpb25DZW50ZXJDb21wb25lbnQgfSBmcm9tICdAbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BtYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXInO1xyXG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5hdkl0ZW0gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9uYXZpZ2F0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLW5vdGlmaWNhdGlvbi1iZWxsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbm90aWZpY2F0aW9uLWJlbGwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25vdGlmaWNhdGlvbi1iZWxsLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgbmF2SXRlbTogTmF2SXRlbTtcclxuICBASW5wdXQoKVxyXG4gIG5vdGlmaWNhdGlvbkNlbnRlcjogTm90aWZpY2F0aW9uQ2VudGVyQ29tcG9uZW50O1xyXG5cclxuICBub3RpZmljYXRpb25Db3VudDogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gIG5vdGlmaWNhdGlvbkJhZGdlSGlkZGVuOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIG5vdGlmaWNhdGlvbkNlbnRlckVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UgJiYgdGhpcy5ub3RpZmljYXRpb25DZW50ZXIpIHtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25Db3VudCA9IHRoaXMubm90aWZpY2F0aW9uU2VydmljZS51bnNlZW5Db3VudGVyO1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbkJhZGdlSGlkZGVuID0gdGhpcy5ub3RpZmljYXRpb25Db3VudC5waXBlKG1hcCh4ID0+IHggPT09IDApKTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25DZW50ZXJFbmFibGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uQ291bnQgPSBFTVBUWTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB0b2dnbGVOb3RpZmljYXRpb25QYW5lbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvbkNlbnRlckVuYWJsZWQpIHtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25DZW50ZXIudG9nZ2xlU3RhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsIjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZU5vdGlmaWNhdGlvblBhbmVsKClcIlxyXG4gICAgY2xhc3M9XCJtdWktYXV4bmF2LWJ1dHRvblwiXHJcbiAgICBtYXQtaWNvbi1idXR0b25cclxuICAgIFtpZF09XCJuYXZJdGVtLmlkXCJcclxuPlxyXG4gIDxzcGFuIFttYXRCYWRnZUhpZGRlbl09XCJub3RpZmljYXRpb25CYWRnZUhpZGRlbiB8IGFzeW5jXCJcclxuICAgICAgW21hdEJhZGdlXT1cIm5vdGlmaWNhdGlvbkNvdW50IHwgYXN5bmNcIlxyXG4gICAgICBjbGFzcz1cIm11aS1pY29uc1wiXHJcbiAgICAgIG1hdEJhZGdlQ29sb3I9XCJ3YXJuXCI+e3sgbmF2SXRlbS5pY29uIH19PC9zcGFuPlxyXG48L2J1dHRvbj5cclxuXHJcbiJdfQ==