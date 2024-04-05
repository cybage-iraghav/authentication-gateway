import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Directive for marking a <ng-template> as content for MuiBottomBar.
 * This is needed for cases where you want to project the content from a child component to a parent.
 */
export class MuiBottomBarContentDirective {
    constructor(template) {
        this.template = template;
    }
}
MuiBottomBarContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MuiBottomBarContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiBottomBarContentDirective, isStandalone: true, selector: "[muiBottomBarContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiBottomBarContent]',
                    standalone: true
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWJvdHRvbS1iYXItY29udGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvb3ZlcnZpZXcvYm90dG9tLWJhci9tdWktYm90dG9tLWJhci1jb250ZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUV2RDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sNEJBQTRCO0lBRXZDLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUksQ0FBQzs7MEhBRnZDLDRCQUE0Qjs4R0FBNUIsNEJBQTRCOzRGQUE1Qiw0QkFBNEI7a0JBSnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSBmb3IgbWFya2luZyBhIDxuZy10ZW1wbGF0ZT4gYXMgY29udGVudCBmb3IgTXVpQm90dG9tQmFyLlxyXG4gKiBUaGlzIGlzIG5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgeW91IHdhbnQgdG8gcHJvamVjdCB0aGUgY29udGVudCBmcm9tIGEgY2hpbGQgY29tcG9uZW50IHRvIGEgcGFyZW50LlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXVpQm90dG9tQmFyQ29udGVudF0nLFxyXG4gIHN0YW5kYWxvbmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aUJvdHRvbUJhckNvbnRlbnREaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxyXG5cclxufVxyXG4iXX0=