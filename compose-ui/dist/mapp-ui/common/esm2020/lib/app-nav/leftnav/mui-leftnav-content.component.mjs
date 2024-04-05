import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Container component for the main app content area
 * @deprecated
 */
export class MuiLeftnavContentComponent {
    constructor() {
        this.hostElementClass = 'mui-leftnav-content';
        this.isContentPushed = false;
    }
}
MuiLeftnavContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavContentComponent, selector: "mui-leftnav-content", host: { properties: { "class": "this.hostElementClass", "class.pushed": "this.isContentPushed" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mui-leftnav-content',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { hostElementClass: [{
                type: HostBinding,
                args: ['class']
            }], isContentPushed: [{
                type: HostBinding,
                args: ['class.pushed']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWxlZnRuYXYtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2FwcC1uYXYvbGVmdG5hdi9tdWktbGVmdG5hdi1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFMUU7OztHQUdHO0FBTUgsTUFBTSxPQUFPLDBCQUEwQjtJQUx2QztRQU9pQyxxQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQztRQUd4RSxvQkFBZSxHQUFHLEtBQUssQ0FBQztLQUV6Qjs7d0hBUFksMEJBQTBCOzRHQUExQiwwQkFBMEIsK0pBSDNCLDJCQUEyQjs0RkFHMUIsMEJBQTBCO2tCQUx0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs4QkFHZ0MsZ0JBQWdCO3NCQUE5QyxXQUFXO3VCQUFDLE9BQU87Z0JBR3BCLGVBQWU7c0JBRGQsV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgY29tcG9uZW50IGZvciB0aGUgbWFpbiBhcHAgY29udGVudCBhcmVhXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1sZWZ0bmF2LWNvbnRlbnQnLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpTGVmdG5hdkNvbnRlbnRDb21wb25lbnQge1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcmVhZG9ubHkgaG9zdEVsZW1lbnRDbGFzcyA9ICdtdWktbGVmdG5hdi1jb250ZW50JztcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wdXNoZWQnKVxyXG4gIGlzQ29udGVudFB1c2hlZCA9IGZhbHNlO1xyXG5cclxufVxyXG4iXX0=