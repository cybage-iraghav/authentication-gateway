import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class MuiPageHeaderComponent {
}
MuiPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderComponent, selector: "mui-page-header", exportAs: ["muiPageHeader"], ngImport: i0, template: "<div class=\"mui-page-header\">\r\n  <div class=\"mui-page-header-content\">\r\n    <div class=\"mui-page-header-title\">\r\n      <ng-content select=\"[muiPageHeaderTitle]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-page-header-subtitle\">\r\n      <ng-content select=\"[muiPageHeaderSubtitle]\"></ng-content>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-page-header-actions\">\r\n    <ng-content select=\"[muiPageHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-page-header{box-shadow:0 0 4px #ccd3df66;min-height:64px;padding:0 12px;position:relative;display:flex;flex-direction:row;box-sizing:border-box}.mui-page-header-content{width:100%;padding-right:24px;min-width:150px;align-self:flex-start}.mui-page-header-title{height:57px;line-height:66px}:host ::ng-deep .mui-page-header-title [muiPageHeaderTitle],:host ::ng-deep .mui-page-header-subtitle [muiPageHeaderSubtitle]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mui-page-header-actions{height:64px;line-height:64px;white-space:nowrap;align-self:flex-end}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button{width:24px;height:24px;line-height:24px;padding:2px}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-mdc-button-touch-target{display:none}:host ::ng-deep .mui-page-header-subtitle .mat-icon,:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-icon{font-size:20px;width:20px;height:20px;line-height:20px;vertical-align:text-bottom}:host ::ng-deep .mui-page-header-subtitle .tdw{font-size:18px;line-height:20px;margin-right:3px;vertical-align:text-bottom}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-page-header', exportAs: 'muiPageHeader', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-page-header\">\r\n  <div class=\"mui-page-header-content\">\r\n    <div class=\"mui-page-header-title\">\r\n      <ng-content select=\"[muiPageHeaderTitle]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-page-header-subtitle\">\r\n      <ng-content select=\"[muiPageHeaderSubtitle]\"></ng-content>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-page-header-actions\">\r\n    <ng-content select=\"[muiPageHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-page-header{box-shadow:0 0 4px #ccd3df66;min-height:64px;padding:0 12px;position:relative;display:flex;flex-direction:row;box-sizing:border-box}.mui-page-header-content{width:100%;padding-right:24px;min-width:150px;align-self:flex-start}.mui-page-header-title{height:57px;line-height:66px}:host ::ng-deep .mui-page-header-title [muiPageHeaderTitle],:host ::ng-deep .mui-page-header-subtitle [muiPageHeaderSubtitle]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mui-page-header-actions{height:64px;line-height:64px;white-space:nowrap;align-self:flex-end}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button{width:24px;height:24px;line-height:24px;padding:2px}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-mdc-button-touch-target{display:none}:host ::ng-deep .mui-page-header-subtitle .mat-icon,:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-icon{font-size:20px;width:20px;height:20px;line-height:20px;vertical-align:text-bottom}:host ::ng-deep .mui-page-header-subtitle .tdw{font-size:18px;line-height:20px;margin-right:3px;vertical-align:text-bottom}\n"] }]
        }] });
/* directives used for page header */
/**
 * Directive for page header title
 */
export class MuiPageHeaderTitleDirective {
}
MuiPageHeaderTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderTitleDirective, selector: "[muiPageHeaderTitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderTitle]'
                }]
        }] });
/**
 * Directive for page header subtitle, placed below title
 */
export class MuiPageHeaderSubtitleDirective {
}
MuiPageHeaderSubtitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderSubtitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderSubtitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderSubtitleDirective, selector: "[muiPageHeaderSubtitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderSubtitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderSubtitle]'
                }]
        }] });
/**
 * Directive for page header actions, placed on the right side
 */
export class MuiPageHeaderActionsDirective {
}
MuiPageHeaderActionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderActionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderActionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderActionsDirective, selector: "[muiPageHeaderActions]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderActions]'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvcGFnZS1oZWFkZXIvbXVpLXBhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvcGFnZS1oZWFkZXIvbXVpLXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVM5RSxNQUFNLE9BQU8sc0JBQXNCOztvSEFBdEIsc0JBQXNCO3dHQUF0QixzQkFBc0Isb0ZDVG5DLHNlQWFBOzRGREphLHNCQUFzQjtrQkFQbEMsU0FBUzsrQkFDRSxpQkFBaUIsWUFDakIsZUFBZSxtQkFHUix1QkFBdUIsQ0FBQyxNQUFNOztBQU1qRCxxQ0FBcUM7QUFFckM7O0dBRUc7QUFJSCxNQUFNLE9BQU8sMkJBQTJCOzt5SEFBM0IsMkJBQTJCOzZHQUEzQiwyQkFBMkI7NEZBQTNCLDJCQUEyQjtrQkFIdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7QUFHRDs7R0FFRztBQUlILE1BQU0sT0FBTyw4QkFBOEI7OzRIQUE5Qiw4QkFBOEI7Z0hBQTlCLDhCQUE4Qjs0RkFBOUIsOEJBQThCO2tCQUgxQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDOztBQUlEOztHQUVHO0FBSUgsTUFBTSxPQUFPLDZCQUE2Qjs7MkhBQTdCLDZCQUE2QjsrR0FBN0IsNkJBQTZCOzRGQUE3Qiw2QkFBNkI7a0JBSHpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXBhZ2UtaGVhZGVyJyxcclxuICBleHBvcnRBczogJ211aVBhZ2VIZWFkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnbXVpLXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnbXVpLXBhZ2UtaGVhZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aVBhZ2VIZWFkZXJDb21wb25lbnQge1xyXG5cclxufVxyXG5cclxuLyogZGlyZWN0aXZlcyB1c2VkIGZvciBwYWdlIGhlYWRlciAqL1xyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSBmb3IgcGFnZSBoZWFkZXIgdGl0bGVcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aVBhZ2VIZWFkZXJUaXRsZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlQYWdlSGVhZGVyVGl0bGVEaXJlY3RpdmUge31cclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgZm9yIHBhZ2UgaGVhZGVyIHN1YnRpdGxlLCBwbGFjZWQgYmVsb3cgdGl0bGVcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aVBhZ2VIZWFkZXJTdWJ0aXRsZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlQYWdlSGVhZGVyU3VidGl0bGVEaXJlY3RpdmUge1xyXG59XHJcblxyXG4vKipcclxuICogRGlyZWN0aXZlIGZvciBwYWdlIGhlYWRlciBhY3Rpb25zLCBwbGFjZWQgb24gdGhlIHJpZ2h0IHNpZGVcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aVBhZ2VIZWFkZXJBY3Rpb25zXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aVBhZ2VIZWFkZXJBY3Rpb25zRGlyZWN0aXZlIHt9XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktcGFnZS1oZWFkZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLXBhZ2UtaGVhZGVyLWNvbnRlbnRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktcGFnZS1oZWFkZXItdGl0bGVcIj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW211aVBhZ2VIZWFkZXJUaXRsZV1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktcGFnZS1oZWFkZXItc3VidGl0bGVcIj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW211aVBhZ2VIZWFkZXJTdWJ0aXRsZV1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLXBhZ2UtaGVhZGVyLWFjdGlvbnNcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttdWlQYWdlSGVhZGVyQWN0aW9uc11cIj48L25nLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=