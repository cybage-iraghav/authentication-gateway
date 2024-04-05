import { OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
/**
 * This component provides a form field with a date range picker.
 * Primary use for the component is in the table filter bar. The label for the form field is taken from the
 * body content of the component.
 * Data input / output is handled in ISO8601 compliant date interval string. The component integrates with the
 * Angular forms modules, so can be regularly used with the formControl / formControlName directives.
 */
export declare class MuiDateRangePickerComponent implements ControlValueAccessor, OnDestroy {
    /** Specify the field width. Default and minimum is 240px */
    fieldWidth: string;
    /** Set the minimum date selectable in the date picker */
    minDate: DateTime | null;
    /** Set the maximum date selectable in the date picker */
    maxDate: DateTime | null;
    isPickerDisabled: boolean;
    private destroy$;
    private fb;
    datePickerForm: import("@angular/forms").FormGroup<{
        start: FormControl<DateTime | null>;
        end: FormControl<DateTime | null>;
    }>;
    private ngControl;
    constructor();
    onTouched: () => void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: any): void;
    pickerClosed(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiDateRangePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiDateRangePickerComponent, "mui-date-range-picker", never, { "fieldWidth": "fieldWidth"; "minDate": "minDate"; "maxDate": "maxDate"; }, {}, never, ["*"], true, never>;
}
