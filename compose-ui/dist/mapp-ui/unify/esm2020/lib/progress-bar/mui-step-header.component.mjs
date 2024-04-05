import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@mapp-ui/common";
export class MuiStepHeaderComponent {
    constructor() {
        /** Whether the given step label is active, e.g. can be clicked on to navigate to the step. */
        this.active = true;
        /** State of the step */
        this.completed = false;
        /** Whether the step is selected */
        this.selected = false;
        this._hostClass = 'mui-step-header';
    }
    get _hostClassActive() {
        return this.active;
    }
}
MuiStepHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiStepHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepHeaderComponent, selector: "mui-step-header", inputs: { label: "label", active: "active", completed: "completed", selected: "selected" }, host: { properties: { "class": "this._hostClass", "class.mui-step-header-active": "this._hostClassActive" } }, ngImport: i0, template: "<div *ngIf=\"completed\"\r\n    class=\"mui-step-icon\">\r\n  <mui-icon class=\"mui-step-icon-complete\">success_check</mui-icon>\r\n</div>\r\n<div [class.mui-step-label-active]=\"active\"\r\n    [class.mui-step-label-selected]=\"selected\"\r\n    [class.mat-body-strong]=\"selected\"\r\n    class=\"mui-step-label\"\r\n>{{ label }}</div>\r\n", styles: [":host{display:flex;align-items:center;height:48px;padding:0 24px;overflow:hidden;position:relative;cursor:default}:host(.mui-step-header-active){cursor:pointer}.mui-step-icon{margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-step-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"completed\"\r\n    class=\"mui-step-icon\">\r\n  <mui-icon class=\"mui-step-icon-complete\">success_check</mui-icon>\r\n</div>\r\n<div [class.mui-step-label-active]=\"active\"\r\n    [class.mui-step-label-selected]=\"selected\"\r\n    [class.mat-body-strong]=\"selected\"\r\n    class=\"mui-step-label\"\r\n>{{ label }}</div>\r\n", styles: [":host{display:flex;align-items:center;height:48px;padding:0 24px;overflow:hidden;position:relative;cursor:default}:host(.mui-step-header-active){cursor:pointer}.mui-step-icon{margin-right:8px}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], active: [{
                type: Input
            }], completed: [{
                type: Input
            }], selected: [{
                type: Input
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }], _hostClassActive: [{
                type: HostBinding,
                args: ['class.mui-step-header-active']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXN0ZXAtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9wcm9ncmVzcy1iYXIvbXVpLXN0ZXAtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9wcm9ncmVzcy1iYXIvbXVpLXN0ZXAtaGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVF2RixNQUFNLE9BQU8sc0JBQXNCO0lBTm5DO1FBV0UsOEZBQThGO1FBQ3JGLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFdkIsd0JBQXdCO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUzQixtQ0FBbUM7UUFDMUIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVLLGVBQVUsR0FBRyxpQkFBaUIsQ0FBQztLQU8vRDtJQUxDLElBQWlELGdCQUFnQjtRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7b0hBbEJVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLGtRQ1JuQyx3VkFTQTs0RkREYSxzQkFBc0I7a0JBTmxDLFNBQVM7K0JBQ0UsaUJBQWlCLG1CQUdWLHVCQUF1QixDQUFDLE1BQU07OEJBS3RDLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUV5QixVQUFVO3NCQUF4QyxXQUFXO3VCQUFDLE9BQU87Z0JBRTZCLGdCQUFnQjtzQkFBaEUsV0FBVzt1QkFBQyw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXN0ZXAtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXVpLXN0ZXAtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWktc3RlcC1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpU3RlcEhlYWRlckNvbXBvbmVudCB7XHJcblxyXG4gIC8qKiBMYWJlbCBmb3IgdGhlIHN0ZXAgKi9cclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBsYWJlbCBpcyBhY3RpdmUsIGUuZy4gY2FuIGJlIGNsaWNrZWQgb24gdG8gbmF2aWdhdGUgdG8gdGhlIHN0ZXAuICovXHJcbiAgQElucHV0KCkgYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgLyoqIFN0YXRlIG9mIHRoZSBzdGVwICovXHJcbiAgQElucHV0KCkgY29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBzdGVwIGlzIHNlbGVjdGVkICovXHJcbiAgQElucHV0KCkgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHJlYWRvbmx5IF9ob3N0Q2xhc3MgPSAnbXVpLXN0ZXAtaGVhZGVyJztcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWktc3RlcC1oZWFkZXItYWN0aXZlJykgZ2V0IF9ob3N0Q2xhc3NBY3RpdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmU7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIiwiPGRpdiAqbmdJZj1cImNvbXBsZXRlZFwiXHJcbiAgICBjbGFzcz1cIm11aS1zdGVwLWljb25cIj5cclxuICA8bXVpLWljb24gY2xhc3M9XCJtdWktc3RlcC1pY29uLWNvbXBsZXRlXCI+c3VjY2Vzc19jaGVjazwvbXVpLWljb24+XHJcbjwvZGl2PlxyXG48ZGl2IFtjbGFzcy5tdWktc3RlcC1sYWJlbC1hY3RpdmVdPVwiYWN0aXZlXCJcclxuICAgIFtjbGFzcy5tdWktc3RlcC1sYWJlbC1zZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICBbY2xhc3MubWF0LWJvZHktc3Ryb25nXT1cInNlbGVjdGVkXCJcclxuICAgIGNsYXNzPVwibXVpLXN0ZXAtbGFiZWxcIlxyXG4+e3sgbGFiZWwgfX08L2Rpdj5cclxuIl19