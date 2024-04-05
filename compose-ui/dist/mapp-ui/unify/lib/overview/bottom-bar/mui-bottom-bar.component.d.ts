import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Create a bar for action buttons or other content, which should be placed at the bottom of an overview page.
 * Content will be distributed across the bar according to the alignment property, either centered or spread.
 * If you want to divide between left and right side, just use two divs to separate each section.
 * Content for the component will be either the body content placed in the component, or a TemplateRef provided via
 * 'content' input binding.
 */
export declare class MuiBottomBarComponent {
    _bodyContent: TemplateRef<any>;
    private _content;
    /**
     * Control how the content is aligned within the action bar.
     * spread (default): aligns items spread equally across the bar
     * centered: uses center alignment
     */
    alignment: 'spread' | 'centered';
    get hostClassName(): "mui-page-bottom-actions-spread" | "mui-page-bottom-actions-centered";
    /**
     * Provide a TemplateRef for the content to be placed inside the component.
     * If no template is provided via this input, the body content of the component will be used.
     */
    set content(template: TemplateRef<any> | null);
    get content(): TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiBottomBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiBottomBarComponent, "mui-bottom-bar", never, { "alignment": "alignment"; "content": "content"; }, {}, never, ["*"], true, never>;
}
