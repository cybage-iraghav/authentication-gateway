import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Directive for marking a <ng-template> as content for MuiBottomBar.
 * This is needed for cases where you want to project the content from a child component to a parent.
 */
export declare class MuiBottomBarContentDirective {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiBottomBarContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiBottomBarContentDirective, "[muiBottomBarContent]", never, {}, {}, never, never, true, never>;
}
