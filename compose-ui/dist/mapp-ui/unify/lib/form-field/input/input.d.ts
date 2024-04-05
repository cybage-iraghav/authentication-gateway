/**
 * Largely based on MatInput from Angular Material. Using matInput within mui-form-field is no longer easily
 * possible since v15, as Material team moved to the mdc based components. Some implementation aspects rely heavily
 * on structure and classes used by mat-form-field and matInput, which make it incompatible with mui-form-field.
 * This custom implementation brings similar behaviour as using matInput, but tailored to the Unify input components.
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { AfterViewInit, DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
declare const _MuiInputBase: import("@angular/material/core")._Constructor<CanUpdateErrorState> & import("@angular/material/core")._AbstractConstructor<CanUpdateErrorState> & {
    new (_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl): {
        /**
         * Emits whenever the component state changes and should cause the parent
         * form field to update. Implemented as part of `MatFormFieldControl`.
         */
        readonly stateChanges: Subject<void>;
        _defaultErrorStateMatcher: ErrorStateMatcher;
        _parentForm: NgForm;
        _parentFormGroup: FormGroupDirective;
        /**
         * Form control bound to the component.
         * Implemented as part of `MatFormFieldControl`.
         */
        ngControl: NgControl;
    };
};
export declare class MuiInput extends _MuiInputBase implements MatFormFieldControl<any>, OnChanges, OnDestroy, AfterViewInit, DoCheck, CanUpdateErrorState {
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    protected _platform: Platform;
    private _autofillMonitor;
    protected _uid: string;
    protected _previousNativeValue: any;
    private _inputValueAccessor;
    private _previousPlaceholder;
    /** Whether the component is a textarea. */
    readonly _isTextarea: boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    focused: boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    controlType: string;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    autofilled: boolean;
    shouldLabelFloat: boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    protected _disabled: boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get id(): string;
    set id(value: string);
    protected _id: string;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    placeholder: string;
    /**
     * Name of the input.
     */
    name: string;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get required(): boolean;
    set required(value: BooleanInput);
    protected _required: boolean | undefined;
    /** Input type of the element. */
    get type(): string;
    set type(value: string);
    protected _type: string;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    userAriaDescribedBy: string;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get value(): string;
    set value(value: any);
    /** Whether the element is readonly. */
    get readonly(): boolean;
    set readonly(value: BooleanInput);
    private _readonly;
    protected _neverEmptyInputTypes: string[];
    constructor(_elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, _platform: Platform, ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, _autofillMonitor: AutofillMonitor);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused: boolean): void;
    _onInput(): void;
    /** Does some manual dirty checking on the native input `value` property. */
    protected _dirtyCheckNativeValue(): void;
    /** Does some manual dirty checking on the native input `placeholder` attribute. */
    private _dirtyCheckPlaceholder;
    /** Gets the current placeholder of the form field. */
    protected _getPlaceholder(): string | null;
    /** Make sure the input is a supported type. */
    protected _validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected _isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected _isBadInput(): boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get empty(): boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    setDescribedByIds(ids: string[]): void;
    /**
     * Implemented as part of MatFormFieldControl.
     */
    onContainerClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiInput, [null, null, { optional: true; self: true; }, { optional: true; }, { optional: true; }, null, { optional: true; self: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiInput, "input[muiInput], textarea[muiInput], select[muiInput]", ["muiInput"], { "disabled": "disabled"; "id": "id"; "placeholder": "placeholder"; "name": "name"; "required": "required"; "type": "type"; "errorStateMatcher": "errorStateMatcher"; "userAriaDescribedBy": "aria-describedby"; "value": "value"; "readonly": "readonly"; }, {}, never, never, false, never>;
}
export {};
