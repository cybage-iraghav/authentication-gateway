import { ElementRef, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/** Component for showing additional contextual info like errors or warnings adjacent to a mui-form-field. */
export declare class MuiFormFieldInfoComponent implements OnInit {
    hostClassNames: string[];
    /** Defines the type of the info element. Defaults to error. */
    type: 'info' | 'warning' | 'error' | 'success';
    /** Defines how the info text is displayed. Either inline, next to the icon (default) or as tooltip */
    display: 'inline' | 'tooltip';
    textContent: ElementRef<HTMLElement>;
    tooltipMessage: string;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiFormFieldInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiFormFieldInfoComponent, "mui-form-field-info", ["muiFormFieldInfo"], { "type": "type"; "display": "display"; }, {}, never, ["*"], false, never>;
}
