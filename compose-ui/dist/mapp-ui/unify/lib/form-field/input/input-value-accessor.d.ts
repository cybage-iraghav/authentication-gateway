import { InjectionToken } from '@angular/core';
/**
 * This token is used to inject the object whose value should be set into `MuiInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `MuiInput` delegate the getting and setting of the
 * value to them.
 */
export declare const MUI_INPUT_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;
