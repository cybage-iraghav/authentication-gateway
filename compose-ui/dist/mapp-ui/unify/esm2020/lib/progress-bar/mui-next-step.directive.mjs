import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./mui-progress-bar.component";
export class MuiNextStepDirective {
    constructor(stepper) {
        this.stepper = stepper;
        this.type = 'submit';
    }
    get isDisabled() {
        if (this.stepper.manualButtonHandling) {
            return false;
        }
        const stepControl = this.stepper.selected?.stepControl;
        if (!stepControl) {
            return false;
        }
        return stepControl.invalid || stepControl.pending;
    }
    clicked() {
        this.stepper.next();
    }
}
MuiNextStepDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNextStepDirective, deps: [{ token: i1.MuiProgressBarComponent }], target: i0.ɵɵFactoryTarget.Directive });
MuiNextStepDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiNextStepDirective, selector: "button[muiNextStep]", inputs: { type: "type" }, host: { listeners: { "click": "clicked()" }, properties: { "type": "this.type", "class.mat-button-disabled": "this.isDisabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNextStepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[muiNextStep]'
                }]
        }], ctorParameters: function () { return [{ type: i1.MuiProgressBarComponent }]; }, propDecorators: { type: [{
                type: HostBinding,
                args: ['type']
            }, {
                type: Input
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.mat-button-disabled']
            }], clicked: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLW5leHQtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvcHJvZ3Jlc3MtYmFyL211aS1uZXh0LXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU01RSxNQUFNLE9BQU8sb0JBQW9CO0lBTS9CLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBRnBELFNBQUksR0FBRyxRQUFRLENBQUM7SUFHaEIsQ0FBQztJQUVELElBQ0ksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sV0FBVyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQ3BELENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDOztrSEF4QlUsb0JBQW9CO3NHQUFwQixvQkFBb0I7NEZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzs4R0FLQyxJQUFJO3NCQUZILFdBQVc7dUJBQUMsTUFBTTs7c0JBQ2xCLEtBQUs7Z0JBT0YsVUFBVTtzQkFEYixXQUFXO3VCQUFDLDJCQUEyQjtnQkFheEMsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE11aVByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9tdWktcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2J1dHRvblttdWlOZXh0U3RlcF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlOZXh0U3RlcERpcmVjdGl2ZSB7XHJcblxyXG4gIEBIb3N0QmluZGluZygndHlwZScpXHJcbiAgQElucHV0KClcclxuICB0eXBlID0gJ3N1Ym1pdCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcHBlcjogTXVpUHJvZ3Jlc3NCYXJDb21wb25lbnQpIHtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWF0LWJ1dHRvbi1kaXNhYmxlZCcpXHJcbiAgZ2V0IGlzRGlzYWJsZWQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGVwcGVyLm1hbnVhbEJ1dHRvbkhhbmRsaW5nKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0ZXBDb250cm9sID0gdGhpcy5zdGVwcGVyLnNlbGVjdGVkPy5zdGVwQ29udHJvbDtcclxuICAgIGlmICghc3RlcENvbnRyb2wpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ZXBDb250cm9sLmludmFsaWQgfHwgc3RlcENvbnRyb2wucGVuZGluZztcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBjbGlja2VkKCkge1xyXG4gICAgdGhpcy5zdGVwcGVyLm5leHQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==