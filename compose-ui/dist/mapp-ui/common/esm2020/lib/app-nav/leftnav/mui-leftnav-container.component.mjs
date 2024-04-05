import { Component, ContentChild, HostBinding, ViewEncapsulation } from '@angular/core';
import { MuiLeftnavContentComponent } from './mui-leftnav-content.component';
import { MuiLeftnavComponent } from './mui-leftnav.component';
import * as i0 from "@angular/core";
/**
 * Container component for holding left navigation and main app content
 * @deprecated
 */
export class MuiLeftnavContainerComponent {
    constructor() {
        this.containerClass = 'mui-leftnav-container';
    }
    ngAfterContentInit() {
        this.leftnav.navExpanded.subscribe(expanded => {
            this.content.isContentPushed = expanded;
        });
    }
}
MuiLeftnavContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavContainerComponent, selector: "mui-leftnav-container", host: { properties: { "class": "this.containerClass" } }, queries: [{ propertyName: "content", first: true, predicate: MuiLeftnavContentComponent, descendants: true }, { propertyName: "leftnav", first: true, predicate: MuiLeftnavComponent, descendants: true }], exportAs: ["muiLeftnavContainer"], ngImport: i0, template: "<ng-content select=\"mui-leftnav\"></ng-content>\r\n\r\n<ng-content select=\"mui-leftnav-content\"></ng-content>\r\n", styles: [".mui-leftnav-container{height:calc(100% - 54px);position:relative;box-sizing:border-box;overflow:hidden;z-index:1;display:block}.mui-leftnav-content{margin-left:60px;margin-right:0;display:block;position:relative;z-index:1;height:100%;transition:margin-left .2s;overflow:auto}.mui-leftnav-content.pushed{margin-left:280px}.nav-item.mat-mdc-button:hover .mat-button-focus-overlay{opacity:0}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-leftnav-container', exportAs: 'muiLeftnavContainer', encapsulation: ViewEncapsulation.None, template: "<ng-content select=\"mui-leftnav\"></ng-content>\r\n\r\n<ng-content select=\"mui-leftnav-content\"></ng-content>\r\n", styles: [".mui-leftnav-container{height:calc(100% - 54px);position:relative;box-sizing:border-box;overflow:hidden;z-index:1;display:block}.mui-leftnav-content{margin-left:60px;margin-right:0;display:block;position:relative;z-index:1;height:100%;transition:margin-left .2s;overflow:auto}.mui-leftnav-content.pushed{margin-left:280px}.nav-item.mat-mdc-button:hover .mat-button-focus-overlay{opacity:0}\n"] }]
        }], propDecorators: { containerClass: [{
                type: HostBinding,
                args: ['class']
            }], content: [{
                type: ContentChild,
                args: [MuiLeftnavContentComponent]
            }], leftnav: [{
                type: ContentChild,
                args: [MuiLeftnavComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWxlZnRuYXYtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvYXBwLW5hdi9sZWZ0bmF2L211aS1sZWZ0bmF2LWNvbnRhaW5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2FwcC1uYXYvbGVmdG5hdi9tdWktbGVmdG5hdi1jb250YWluZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFOUQ7OztHQUdHO0FBU0gsTUFBTSxPQUFPLDRCQUE0QjtJQVJ6QztRQVVpQyxtQkFBYyxHQUFHLHVCQUF1QixDQUFDO0tBVXpFO0lBTEMsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzswSEFYVSw0QkFBNEI7OEdBQTVCLDRCQUE0Qiw0SkFJekIsMEJBQTBCLDBFQUMxQixtQkFBbUIsbUZDckJuQyxzSEFHQTs0RkRhYSw0QkFBNEI7a0JBUnhDLFNBQVM7K0JBQ0UsdUJBQXVCLFlBQ3ZCLHFCQUFxQixpQkFHaEIsaUJBQWlCLENBQUMsSUFBSTs4QkFLTixjQUFjO3NCQUE1QyxXQUFXO3VCQUFDLE9BQU87Z0JBRXNCLE9BQU87c0JBQWhELFlBQVk7dUJBQUMsMEJBQTBCO2dCQUNMLE9BQU87c0JBQXpDLFlBQVk7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEhvc3RCaW5kaW5nLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNdWlMZWZ0bmF2Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbXVpLWxlZnRuYXYtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWlMZWZ0bmF2Q29tcG9uZW50IH0gZnJvbSAnLi9tdWktbGVmdG5hdi5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBjb21wb25lbnQgZm9yIGhvbGRpbmcgbGVmdCBuYXZpZ2F0aW9uIGFuZCBtYWluIGFwcCBjb250ZW50XHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1sZWZ0bmF2LWNvbnRhaW5lcicsXHJcbiAgZXhwb3J0QXM6ICdtdWlMZWZ0bmF2Q29udGFpbmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJ211aS1sZWZ0bmF2LWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ211aS1sZWZ0bmF2LmNzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNdWlMZWZ0bmF2Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSByZWFkb25seSBjb250YWluZXJDbGFzcyA9ICdtdWktbGVmdG5hdi1jb250YWluZXInO1xyXG5cclxuICBAQ29udGVudENoaWxkKE11aUxlZnRuYXZDb250ZW50Q29tcG9uZW50KSBjb250ZW50OiBNdWlMZWZ0bmF2Q29udGVudENvbXBvbmVudDtcclxuICBAQ29udGVudENoaWxkKE11aUxlZnRuYXZDb21wb25lbnQpIGxlZnRuYXY6IE11aUxlZnRuYXZDb21wb25lbnQ7XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubGVmdG5hdi5uYXZFeHBhbmRlZC5zdWJzY3JpYmUoZXhwYW5kZWQgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnQuaXNDb250ZW50UHVzaGVkID0gZXhwYW5kZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwibXVpLWxlZnRuYXZcIj48L25nLWNvbnRlbnQ+XHJcblxyXG48bmctY29udGVudCBzZWxlY3Q9XCJtdWktbGVmdG5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxyXG4iXX0=