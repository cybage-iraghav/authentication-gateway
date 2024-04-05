import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Small service that can be used to provide the current template to be rendered by BottomBarComponent.
 */
export declare class BottomBarContentService {
    private _bottomBarTemplate;
    get bottomBarTemplate(): TemplateRef<any> | null;
    set bottomBarTemplate(template: TemplateRef<any> | null);
    static ɵfac: i0.ɵɵFactoryDeclaration<BottomBarContentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BottomBarContentService>;
}
