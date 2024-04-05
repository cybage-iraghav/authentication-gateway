import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Component for header section above an overview table. Supports injecting content for the following 4 sections
 * defined by attribute selectors:
 * * [pageHeaderTitle]: the main title
 * * [pageHeaderSubtitle]: subtitle text - should usually not be longer than 2 lines
 * * [pageHeaderActions]: Main action button(s) which are displayed on the right side
 * * [pageHeaderActionsInfo]: Additional info below the action buttons
 */
export class MuiOverviewPageHeaderComponent {
}
MuiOverviewPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiOverviewPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiOverviewPageHeaderComponent, isStandalone: true, selector: "mui-overview-page-header", ngImport: i0, template: "<div class=\"mui-opage-header-col1\">\r\n  <h2 class=\"mat-h2 mui-opage-title\">\r\n    <ng-content select=\"span[pageHeaderTitle]\"></ng-content>\r\n    <ng-content select=\"mui-icon\"></ng-content>\r\n  </h2>\r\n  <div class=\"mui-opage-subtitle\">\r\n    <ng-content select=\"span[pageHeaderSubtitle]\"></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"mui-opage-header-col2\">\r\n  <div class=\"mui-opage-actions\">\r\n    <ng-content select=\"div[pageHeaderActions]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-opage-actions-info\">\r\n    <ng-content select=\"span[pageHeaderActionsInfo]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:flex;padding-bottom:24px;justify-content:space-between;align-items:flex-start;column-gap:24px}.mui-opage-header-col1{max-width:760px}.mui-opage-header-col2{text-align:right}.mui-opage-title{margin:0 0 8px;height:27px;color:#364e7b;display:flex;align-items:center;column-gap:24px}.mui-opage-subtitle,.mui-opage-actions-info{color:#273b66}.mui-opage-actions{margin-top:35px}.mui-opage-actions-info{margin-top:8px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-overview-page-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-opage-header-col1\">\r\n  <h2 class=\"mat-h2 mui-opage-title\">\r\n    <ng-content select=\"span[pageHeaderTitle]\"></ng-content>\r\n    <ng-content select=\"mui-icon\"></ng-content>\r\n  </h2>\r\n  <div class=\"mui-opage-subtitle\">\r\n    <ng-content select=\"span[pageHeaderSubtitle]\"></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"mui-opage-header-col2\">\r\n  <div class=\"mui-opage-actions\">\r\n    <ng-content select=\"div[pageHeaderActions]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-opage-actions-info\">\r\n    <ng-content select=\"span[pageHeaderActionsInfo]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:flex;padding-bottom:24px;justify-content:space-between;align-items:flex-start;column-gap:24px}.mui-opage-header-col1{max-width:760px}.mui-opage-header-col2{text-align:right}.mui-opage-title{margin:0 0 8px;height:27px;color:#364e7b;display:flex;align-items:center;column-gap:24px}.mui-opage-subtitle,.mui-opage-actions-info{color:#273b66}.mui-opage-actions{margin-top:35px}.mui-opage-actions-info{margin-top:8px}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLW92ZXJ2aWV3LXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9vdmVydmlldy9vdmVydmlldy1wYWdlLWhlYWRlci9tdWktb3ZlcnZpZXctcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL292ZXJ2aWV3L292ZXJ2aWV3LXBhZ2UtaGVhZGVyL211aS1vdmVydmlldy1wYWdlLWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFbkU7Ozs7Ozs7R0FPRztBQVNILE1BQU0sT0FBTyw4QkFBOEI7OzRIQUE5Qiw4QkFBOEI7Z0hBQTlCLDhCQUE4QixvRkNuQjNDLG9vQkFpQkEsb2VESFksWUFBWTs0RkFLWCw4QkFBOEI7a0JBUjFDLFNBQVM7K0JBQ0UsMEJBQTBCLGNBQ3hCLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCBmb3IgaGVhZGVyIHNlY3Rpb24gYWJvdmUgYW4gb3ZlcnZpZXcgdGFibGUuIFN1cHBvcnRzIGluamVjdGluZyBjb250ZW50IGZvciB0aGUgZm9sbG93aW5nIDQgc2VjdGlvbnNcclxuICogZGVmaW5lZCBieSBhdHRyaWJ1dGUgc2VsZWN0b3JzOlxyXG4gKiAqIFtwYWdlSGVhZGVyVGl0bGVdOiB0aGUgbWFpbiB0aXRsZVxyXG4gKiAqIFtwYWdlSGVhZGVyU3VidGl0bGVdOiBzdWJ0aXRsZSB0ZXh0IC0gc2hvdWxkIHVzdWFsbHkgbm90IGJlIGxvbmdlciB0aGFuIDIgbGluZXNcclxuICogKiBbcGFnZUhlYWRlckFjdGlvbnNdOiBNYWluIGFjdGlvbiBidXR0b24ocykgd2hpY2ggYXJlIGRpc3BsYXllZCBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gKiAqIFtwYWdlSGVhZGVyQWN0aW9uc0luZm9dOiBBZGRpdGlvbmFsIGluZm8gYmVsb3cgdGhlIGFjdGlvbiBidXR0b25zXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1vdmVydmlldy1wYWdlLWhlYWRlcicsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXVpLW92ZXJ2aWV3LXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWktb3ZlcnZpZXctcGFnZS1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpT3ZlcnZpZXdQYWdlSGVhZGVyQ29tcG9uZW50IHt9XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktb3BhZ2UtaGVhZGVyLWNvbDFcIj5cclxuICA8aDIgY2xhc3M9XCJtYXQtaDIgbXVpLW9wYWdlLXRpdGxlXCI+XHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJzcGFuW3BhZ2VIZWFkZXJUaXRsZV1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtdWktaWNvblwiPjwvbmctY29udGVudD5cclxuICA8L2gyPlxyXG4gIDxkaXYgY2xhc3M9XCJtdWktb3BhZ2Utc3VidGl0bGVcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInNwYW5bcGFnZUhlYWRlclN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJtdWktb3BhZ2UtaGVhZGVyLWNvbDJcIj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLW9wYWdlLWFjdGlvbnNcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRpdltwYWdlSGVhZGVyQWN0aW9uc11cIj48L25nLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm11aS1vcGFnZS1hY3Rpb25zLWluZm9cIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInNwYW5bcGFnZUhlYWRlckFjdGlvbnNJbmZvXVwiPjwvbmctY29udGVudD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==