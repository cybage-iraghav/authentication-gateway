import { MatSidenav } from '@angular/material/sidenav';
import * as i0 from "@angular/core";
/** @deprecated */
export declare class MuiDrawerComponent {
    private sidenav;
    constructor(sidenav: MatSidenav);
    closeSidenav(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDrawerComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiDrawerComponent, "mui-drawer", ["muiDrawer"], {}, {}, never, ["[muiDrawerTitle]", "[muiDrawerAddons]", "[muiDrawerContent]", "[muiDrawerControls]"], false, never>;
}
/**
 * Supporting directives for content projection
 */
export declare class MuiDrawerTitleDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDrawerTitleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiDrawerTitleDirective, "[muiDrawerTitle]", never, {}, {}, never, never, false, never>;
}
export declare class MuiDrawerContentDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDrawerContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiDrawerContentDirective, "[muiDrawerContent]", never, {}, {}, never, never, false, never>;
}
export declare class MuiDrawerAddonsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDrawerAddonsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiDrawerAddonsDirective, "[muiDrawerAddons]", never, {}, {}, never, never, false, never>;
}
export declare class MuiDrawerControlsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDrawerControlsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiDrawerControlsDirective, "[muiDrawerControls]", never, {}, {}, never, never, false, never>;
}
