import { OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Companion component for the engage icon-font, inspired by mat-icon.
 * Example: `<mui-icon>profile</mui-icon>`
 */
export declare class MuiIconComponent implements OnChanges {
    role: string;
    hostClassNames: string[];
    /**
     * Define a color theme for the icon, based on Unify color definitions.
     * Value 'default' inherits the color from surrounding elements / rules.
     */
    color: 'info' | 'warning' | 'error' | 'success' | 'tip' | 'default';
    private isInline;
    private readonly defaultClassNames;
    constructor();
    /**
     * Whether the icon should be inlined, automatically sizing the icon to match the font size of
     * the element the icon is contained in.
     */
    get inline(): boolean;
    set inline(inline: string | boolean);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiIconComponent, "mui-icon", ["muiIcon"], { "color": "color"; "inline": "inline"; }, {}, never, ["*"], false, never>;
}
