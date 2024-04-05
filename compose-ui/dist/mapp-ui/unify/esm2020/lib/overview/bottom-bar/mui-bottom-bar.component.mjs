import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Create a bar for action buttons or other content, which should be placed at the bottom of an overview page.
 * Content will be distributed across the bar according to the alignment property, either centered or spread.
 * If you want to divide between left and right side, just use two divs to separate each section.
 * Content for the component will be either the body content placed in the component, or a TemplateRef provided via
 * 'content' input binding.
 */
export class MuiBottomBarComponent {
    constructor() {
        this._content = null;
        /**
         * Control how the content is aligned within the action bar.
         * spread (default): aligns items spread equally across the bar
         * centered: uses center alignment
         */
        this.alignment = 'spread';
    }
    get hostClassName() {
        return this.alignment === 'spread' ? 'mui-page-bottom-actions-spread' : 'mui-page-bottom-actions-centered';
    }
    /**
     * Provide a TemplateRef for the content to be placed inside the component.
     * If no template is provided via this input, the body content of the component will be used.
     */
    set content(template) {
        this._content = template;
    }
    get content() {
        return this._content ?? this._bodyContent;
    }
}
MuiBottomBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiBottomBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiBottomBarComponent, isStandalone: true, selector: "mui-bottom-bar", inputs: { alignment: "alignment", content: "content" }, host: { properties: { "class": "this.hostClassName" } }, viewQueries: [{ propertyName: "_bodyContent", first: true, predicate: ["bodyContent"], descendants: true, static: true }], ngImport: i0, template: "<ng-container *ngTemplateOutlet=\"content\"></ng-container>\r\n<ng-template #bodyContent>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n", styles: ["mui-bottom-bar{display:flex;align-items:center;width:100%;padding:12px 48px;column-gap:24px;box-sizing:border-box;z-index:2;min-height:64px;background-color:#fff;box-shadow:0 0 4px #ccd3df66}mui-bottom-bar.mui-page-bottom-actions-spread{justify-content:space-between}mui-bottom-bar.mui-page-bottom-actions-centered{justify-content:center}mui-bottom-bar .mat-mdc-button-base+.mat-mdc-button-base{margin-left:24px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-bottom-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngTemplateOutlet=\"content\"></ng-container>\r\n<ng-template #bodyContent>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n", styles: ["mui-bottom-bar{display:flex;align-items:center;width:100%;padding:12px 48px;column-gap:24px;box-sizing:border-box;z-index:2;min-height:64px;background-color:#fff;box-shadow:0 0 4px #ccd3df66}mui-bottom-bar.mui-page-bottom-actions-spread{justify-content:space-between}mui-bottom-bar.mui-page-bottom-actions-centered{justify-content:center}mui-bottom-bar .mat-mdc-button-base+.mat-mdc-button-base{margin-left:24px}\n"] }]
        }], propDecorators: { _bodyContent: [{
                type: ViewChild,
                args: ['bodyContent', { static: true }]
            }], alignment: [{
                type: Input
            }], hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWJvdHRvbS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL292ZXJ2aWV3L2JvdHRvbS1iYXIvbXVpLWJvdHRvbS1iYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL292ZXJ2aWV3L2JvdHRvbS1iYXIvbXVpLWJvdHRvbS1iYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7O0FBRXZCOzs7Ozs7R0FNRztBQVVILE1BQU0sT0FBTyxxQkFBcUI7SUFUbEM7UUFZVSxhQUFRLEdBQTRCLElBQUksQ0FBQztRQUVqRDs7OztXQUlHO1FBQ00sY0FBUyxHQUEwQixRQUFRLENBQUM7S0FtQnREO0lBakJDLElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQTtJQUM1RyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFDSSxPQUFPLENBQUMsUUFBaUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7O21IQTVCVSxxQkFBcUI7dUdBQXJCLHFCQUFxQixzVEMzQmxDLGdKQUlBLHVkRGlCWSxZQUFZOzRGQU1YLHFCQUFxQjtrQkFUakMsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBR04sdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs4QkFHTyxZQUFZO3NCQUF2RCxTQUFTO3VCQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBU2pDLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0YsYUFBYTtzQkFEaEIsV0FBVzt1QkFBQyxPQUFPO2dCQVVoQixPQUFPO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBJbnB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBiYXIgZm9yIGFjdGlvbiBidXR0b25zIG9yIG90aGVyIGNvbnRlbnQsIHdoaWNoIHNob3VsZCBiZSBwbGFjZWQgYXQgdGhlIGJvdHRvbSBvZiBhbiBvdmVydmlldyBwYWdlLlxyXG4gKiBDb250ZW50IHdpbGwgYmUgZGlzdHJpYnV0ZWQgYWNyb3NzIHRoZSBiYXIgYWNjb3JkaW5nIHRvIHRoZSBhbGlnbm1lbnQgcHJvcGVydHksIGVpdGhlciBjZW50ZXJlZCBvciBzcHJlYWQuXHJcbiAqIElmIHlvdSB3YW50IHRvIGRpdmlkZSBiZXR3ZWVuIGxlZnQgYW5kIHJpZ2h0IHNpZGUsIGp1c3QgdXNlIHR3byBkaXZzIHRvIHNlcGFyYXRlIGVhY2ggc2VjdGlvbi5cclxuICogQ29udGVudCBmb3IgdGhlIGNvbXBvbmVudCB3aWxsIGJlIGVpdGhlciB0aGUgYm9keSBjb250ZW50IHBsYWNlZCBpbiB0aGUgY29tcG9uZW50LCBvciBhIFRlbXBsYXRlUmVmIHByb3ZpZGVkIHZpYVxyXG4gKiAnY29udGVudCcgaW5wdXQgYmluZGluZy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLWJvdHRvbS1iYXInLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1ib3R0b20tYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWktYm90dG9tLWJhci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aUJvdHRvbUJhckNvbXBvbmVudCB7XHJcbiAgQFZpZXdDaGlsZCgnYm9keUNvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBfYm9keUNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHByaXZhdGUgX2NvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udHJvbCBob3cgdGhlIGNvbnRlbnQgaXMgYWxpZ25lZCB3aXRoaW4gdGhlIGFjdGlvbiBiYXIuXHJcbiAgICogc3ByZWFkIChkZWZhdWx0KTogYWxpZ25zIGl0ZW1zIHNwcmVhZCBlcXVhbGx5IGFjcm9zcyB0aGUgYmFyXHJcbiAgICogY2VudGVyZWQ6IHVzZXMgY2VudGVyIGFsaWdubWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFsaWdubWVudDogJ3NwcmVhZCcgfCAnY2VudGVyZWQnID0gJ3NwcmVhZCc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBob3N0Q2xhc3NOYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxpZ25tZW50ID09PSAnc3ByZWFkJyA/ICdtdWktcGFnZS1ib3R0b20tYWN0aW9ucy1zcHJlYWQnIDogJ211aS1wYWdlLWJvdHRvbS1hY3Rpb25zLWNlbnRlcmVkJ1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvdmlkZSBhIFRlbXBsYXRlUmVmIGZvciB0aGUgY29udGVudCB0byBiZSBwbGFjZWQgaW5zaWRlIHRoZSBjb21wb25lbnQuXHJcbiAgICogSWYgbm8gdGVtcGxhdGUgaXMgcHJvdmlkZWQgdmlhIHRoaXMgaW5wdXQsIHRoZSBib2R5IGNvbnRlbnQgb2YgdGhlIGNvbXBvbmVudCB3aWxsIGJlIHVzZWQuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgY29udGVudCh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwpIHtcclxuICAgICAgdGhpcy5fY29udGVudCA9IHRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbnRlbnQoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGVudCA/PyB0aGlzLl9ib2R5Q29udGVudDtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cclxuPG5nLXRlbXBsYXRlICNib2R5Q29udGVudD5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==