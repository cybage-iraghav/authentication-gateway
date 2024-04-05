import { ChangeDetectionStrategy, Component, Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/sidenav";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
/** @deprecated */
export class MuiDrawerComponent {
    constructor(sidenav) {
        this.sidenav = sidenav;
    }
    closeSidenav() {
        if (this.sidenav) {
            this.sidenav.close();
        }
    }
}
MuiDrawerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerComponent, deps: [{ token: i1.MatSidenav, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiDrawerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerComponent, selector: "mui-drawer", exportAs: ["muiDrawer"], ngImport: i0, template: "<div class=\"mui-drawer\">\r\n  <div class=\"mui-drawer-header\">\r\n    <div class=\"mui-drawer-title\">\r\n      <ng-content select=\"[muiDrawerTitle]\"></ng-content>\r\n    </div>\r\n    <button mat-icon-button class=\"mui-drawer-close\" [disableRipple]=\"true\" (click)=\"closeSidenav()\" tabindex=\"-1\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-drawer-add-ons\">\r\n    <ng-content select=\"[muiDrawerAddons]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-drawer-body\">\r\n    <div class=\"mui-drawer-details\">\r\n      <ng-content select=\"[muiDrawerContent]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-drawer-actions\">\r\n      <ng-content select=\"[muiDrawerControls]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-drawer{background-color:#f4f4f4;overflow-x:hidden;overflow-y:auto;padding:0;width:450px;height:100%}.mui-drawer-header{min-height:50px;padding:0 0 0 20px;background-color:#30333e;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap}.mui-drawer-close{color:#fff;width:50px;height:50px}.mui-drawer-close:hover{color:#eee}.mui-drawer-title{color:#fff;line-height:50px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:13px;width:380px}.mui-drawer-body{font-size:14px;height:calc(100% - 50px);overflow:hidden;display:flex;flex-direction:column}.mui-drawer-details{overflow-y:auto;overflow-x:hidden;padding:20px;margin:0;flex:1 1 auto}.mui-drawer-actions{text-align:right;flex:0 0 auto;padding:20px;border-top:1px solid #cccccc;background-color:#eee}.mui-drawer-add-ons{background-color:#404553;border-left:1px solid #292b31;color:#fff;float:right;height:calc(100% - 50px)}:host ::ng-deep [muiDrawerAddons]{width:50px}:host ::ng-deep .mui-drawer-add-ons button{background:transparent;border:none;color:#fff;border-radius:0;height:50px;width:50px;padding:0}:host ::ng-deep .mui-drawer-add-ons i{border-bottom:solid 1px #292b31;height:50px;width:50px;cursor:pointer;line-height:50px!important;text-align:center;vertical-align:middle;font-size:18px}:host ::ng-deep .mui-drawer-add-ons i:hover,:host ::ng-deep .mui-drawer-add-ons button:hover{background-color:#30333e}\n"], dependencies: [{ kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-drawer', exportAs: 'muiDrawer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-drawer\">\r\n  <div class=\"mui-drawer-header\">\r\n    <div class=\"mui-drawer-title\">\r\n      <ng-content select=\"[muiDrawerTitle]\"></ng-content>\r\n    </div>\r\n    <button mat-icon-button class=\"mui-drawer-close\" [disableRipple]=\"true\" (click)=\"closeSidenav()\" tabindex=\"-1\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-drawer-add-ons\">\r\n    <ng-content select=\"[muiDrawerAddons]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-drawer-body\">\r\n    <div class=\"mui-drawer-details\">\r\n      <ng-content select=\"[muiDrawerContent]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-drawer-actions\">\r\n      <ng-content select=\"[muiDrawerControls]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-drawer{background-color:#f4f4f4;overflow-x:hidden;overflow-y:auto;padding:0;width:450px;height:100%}.mui-drawer-header{min-height:50px;padding:0 0 0 20px;background-color:#30333e;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap}.mui-drawer-close{color:#fff;width:50px;height:50px}.mui-drawer-close:hover{color:#eee}.mui-drawer-title{color:#fff;line-height:50px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:13px;width:380px}.mui-drawer-body{font-size:14px;height:calc(100% - 50px);overflow:hidden;display:flex;flex-direction:column}.mui-drawer-details{overflow-y:auto;overflow-x:hidden;padding:20px;margin:0;flex:1 1 auto}.mui-drawer-actions{text-align:right;flex:0 0 auto;padding:20px;border-top:1px solid #cccccc;background-color:#eee}.mui-drawer-add-ons{background-color:#404553;border-left:1px solid #292b31;color:#fff;float:right;height:calc(100% - 50px)}:host ::ng-deep [muiDrawerAddons]{width:50px}:host ::ng-deep .mui-drawer-add-ons button{background:transparent;border:none;color:#fff;border-radius:0;height:50px;width:50px;padding:0}:host ::ng-deep .mui-drawer-add-ons i{border-bottom:solid 1px #292b31;height:50px;width:50px;cursor:pointer;line-height:50px!important;text-align:center;vertical-align:middle;font-size:18px}:host ::ng-deep .mui-drawer-add-ons i:hover,:host ::ng-deep .mui-drawer-add-ons button:hover{background-color:#30333e}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSidenav, decorators: [{
                    type: Optional
                }] }]; } });
/**
 * Supporting directives for content projection
 */
export class MuiDrawerTitleDirective {
}
MuiDrawerTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerTitleDirective, selector: "[muiDrawerTitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerTitle]'
                }]
        }] });
export class MuiDrawerContentDirective {
}
MuiDrawerContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerContentDirective, selector: "[muiDrawerContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerContent]'
                }]
        }] });
export class MuiDrawerAddonsDirective {
}
MuiDrawerAddonsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerAddonsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerAddonsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerAddonsDirective, selector: "[muiDrawerAddons]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerAddonsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerAddons]'
                }]
        }] });
export class MuiDrawerControlsDirective {
}
MuiDrawerControlsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerControlsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerControlsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerControlsDirective, selector: "[muiDrawerControls]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerControlsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerControls]'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWRyYXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2RyYXdlci9tdWktZHJhd2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvZHJhd2VyL211aS1kcmF3ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUd4RixrQkFBa0I7QUFRbEIsTUFBTSxPQUFPLGtCQUFrQjtJQUU3QixZQUFnQyxPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQ25ELENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOztnSEFUVSxrQkFBa0I7b0dBQWxCLGtCQUFrQiwyRUNYL0IsNHhCQXFCQTs0RkRWYSxrQkFBa0I7a0JBUDlCLFNBQVM7K0JBQ0UsWUFBWSxZQUNaLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs7MEJBSWxDLFFBQVE7O0FBWXZCOztHQUVHO0FBS0gsTUFBTSxPQUFPLHVCQUF1Qjs7cUhBQXZCLHVCQUF1Qjt5R0FBdkIsdUJBQXVCOzRGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7O0FBTUQsTUFBTSxPQUFPLHlCQUF5Qjs7dUhBQXpCLHlCQUF5QjsyR0FBekIseUJBQXlCOzRGQUF6Qix5QkFBeUI7a0JBSHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7O0FBTUQsTUFBTSxPQUFPLHdCQUF3Qjs7c0hBQXhCLHdCQUF3QjswR0FBeEIsd0JBQXdCOzRGQUF4Qix3QkFBd0I7a0JBSHBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7O0FBTUQsTUFBTSxPQUFPLDBCQUEwQjs7d0hBQTFCLDBCQUEwQjs0R0FBMUIsMEJBQTBCOzRGQUExQiwwQkFBMEI7a0JBSHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1kcmF3ZXInLFxyXG4gIGV4cG9ydEFzOiAnbXVpRHJhd2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXVpLWRyYXdlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ211aS1kcmF3ZXIuY29tcG9uZW50LmNzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlEcmF3ZXJDb21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIHNpZGVuYXY6IE1hdFNpZGVuYXYpIHtcclxuICB9XHJcblxyXG4gIGNsb3NlU2lkZW5hdigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNpZGVuYXYpIHtcclxuICAgICAgdGhpcy5zaWRlbmF2LmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdXBwb3J0aW5nIGRpcmVjdGl2ZXMgZm9yIGNvbnRlbnQgcHJvamVjdGlvblxyXG4gKi9cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aURyYXdlclRpdGxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aURyYXdlclRpdGxlRGlyZWN0aXZlIHt9XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttdWlEcmF3ZXJDb250ZW50XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aURyYXdlckNvbnRlbnREaXJlY3RpdmUge31cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aURyYXdlckFkZG9uc10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlEcmF3ZXJBZGRvbnNEaXJlY3RpdmUge31cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW211aURyYXdlckNvbnRyb2xzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aURyYXdlckNvbnRyb2xzRGlyZWN0aXZlIHt9XHJcblxyXG4iLCI8ZGl2IGNsYXNzPVwibXVpLWRyYXdlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJtdWktZHJhd2VyLWhlYWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm11aS1kcmF3ZXItdGl0bGVcIj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW211aURyYXdlclRpdGxlXVwiPjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtdWktZHJhd2VyLWNsb3NlXCIgW2Rpc2FibGVSaXBwbGVdPVwidHJ1ZVwiIChjbGljayk9XCJjbG9zZVNpZGVuYXYoKVwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtdWktZHJhd2VyLWFkZC1vbnNcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttdWlEcmF3ZXJBZGRvbnNdXCI+PC9uZy1jb250ZW50PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtdWktZHJhd2VyLWJvZHlcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktZHJhd2VyLWRldGFpbHNcIj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW211aURyYXdlckNvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibXVpLWRyYXdlci1hY3Rpb25zXCI+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttdWlEcmF3ZXJDb250cm9sc11cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==