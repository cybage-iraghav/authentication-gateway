import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Companion component for the engage icon-font, inspired by mat-icon.
 * Example: `<mui-icon>profile</mui-icon>`
 */
export class MuiIconComponent {
    constructor() {
        this.role = 'img';
        this.isInline = false;
        this.defaultClassNames = ['mui-icon', 'mui-icons'];
        this.hostClassNames = [...this.defaultClassNames];
    }
    /**
     * Whether the icon should be inlined, automatically sizing the icon to match the font size of
     * the element the icon is contained in.
     */
    get inline() {
        return this.isInline;
    }
    set inline(inline) {
        this.isInline = coerceBooleanProperty(inline);
    }
    ngOnChanges(changes) {
        if (changes['color'] && this.color) {
            this.hostClassNames = [...this.defaultClassNames, 'mui-icon-' + this.color];
        }
    }
}
MuiIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiIconComponent, selector: "mui-icon", inputs: { color: "color", inline: "inline" }, host: { properties: { "attr.role": "this.role", "class": "this.hostClassNames", "class.mui-icon-inline": "this.inline" } }, exportAs: ["muiIcon"], usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mui-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mui-icon.mui-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mui-icon{display:block}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-mdc-icon-button .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-mdc-icon-button .mui-icon{margin:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-icon', exportAs: 'muiIcon', template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mui-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mui-icon.mui-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mui-icon{display:block}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-mdc-icon-button .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-mdc-icon-button .mui-icon{margin:auto}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }], color: [{
                type: Input
            }], inline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.mui-icon-inline']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9pY29uL211aS1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxFQUdMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7QUFFdkI7OztHQUdHO0FBU0gsTUFBTSxPQUFPLGdCQUFnQjtJQWMzQjtRQVowQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBUy9CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDUixzQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUc3RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFFSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUF3QjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUM1RTtJQUNILENBQUM7OzhHQXBDVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQixzUUFMakIsMkJBQTJCOzRGQUsxQixnQkFBZ0I7a0JBUjVCLFNBQVM7K0JBQ0UsVUFBVSxZQUNWLFNBQVMsWUFDVCwyQkFBMkIsaUJBRXRCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07MEVBSXJCLElBQUk7c0JBQTdCLFdBQVc7dUJBQUMsV0FBVztnQkFDRixjQUFjO3NCQUFuQyxXQUFXO3VCQUFDLE9BQU87Z0JBTVgsS0FBSztzQkFBYixLQUFLO2dCQWVGLE1BQU07c0JBRlQsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhbmlvbiBjb21wb25lbnQgZm9yIHRoZSBlbmdhZ2UgaWNvbi1mb250LCBpbnNwaXJlZCBieSBtYXQtaWNvbi5cclxuICogRXhhbXBsZTogYDxtdWktaWNvbj5wcm9maWxlPC9tdWktaWNvbj5gXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1pY29uJyxcclxuICBleHBvcnRBczogJ211aUljb24nLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXVpLWljb24uY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSByb2xlID0gJ2ltZyc7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGhvc3RDbGFzc05hbWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIGEgY29sb3IgdGhlbWUgZm9yIHRoZSBpY29uLCBiYXNlZCBvbiBVbmlmeSBjb2xvciBkZWZpbml0aW9ucy5cclxuICAgKiBWYWx1ZSAnZGVmYXVsdCcgaW5oZXJpdHMgdGhlIGNvbG9yIGZyb20gc3Vycm91bmRpbmcgZWxlbWVudHMgLyBydWxlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvcjogJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdzdWNjZXNzJyB8ICd0aXAnIHwgJ2RlZmF1bHQnO1xyXG5cclxuICBwcml2YXRlIGlzSW5saW5lID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0Q2xhc3NOYW1lcyA9IFsnbXVpLWljb24nLCAnbXVpLWljb25zJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ob3N0Q2xhc3NOYW1lcyA9IFsuLi50aGlzLmRlZmF1bHRDbGFzc05hbWVzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGljb24gc2hvdWxkIGJlIGlubGluZWQsIGF1dG9tYXRpY2FsbHkgc2l6aW5nIHRoZSBpY29uIHRvIG1hdGNoIHRoZSBmb250IHNpemUgb2ZcclxuICAgKiB0aGUgZWxlbWVudCB0aGUgaWNvbiBpcyBjb250YWluZWQgaW4uXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11aS1pY29uLWlubGluZScpXHJcbiAgZ2V0IGlubGluZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmlzSW5saW5lO1xyXG4gIH1cclxuXHJcbiAgc2V0IGlubGluZShpbmxpbmU6IHN0cmluZyB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaXNJbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaW5saW5lKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydjb2xvciddICYmIHRoaXMuY29sb3IpIHtcclxuICAgICAgdGhpcy5ob3N0Q2xhc3NOYW1lcyA9IFsuLi50aGlzLmRlZmF1bHRDbGFzc05hbWVzLCAnbXVpLWljb24tJyArIHRoaXMuY29sb3JdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19