import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MuiFormFieldInfoComponent } from './form-field-info/mui-form-field-info.component';
import { MatFormFieldPartial } from './mat-form-field-partial';
import { MuiLabelDirective } from './mui-label.directive';
import { MuiPrefixDirective } from './mui-prefix.directive';
import { MuiSuffixDirective } from './mui-suffix.directive';
import * as i0 from "@angular/core";
export declare class MuiFormFieldComponent implements AfterContentInit, OnDestroy, MatFormFieldPartial {
    private cd;
    _elementRef: ElementRef<HTMLInputElement>;
    _prefixChild: MuiPrefixDirective;
    _suffixChild: MuiSuffixDirective;
    formFieldControl: MatFormFieldControl<any>;
    _labelChild: MuiLabelDirective;
    _infoChildren: QueryList<MuiFormFieldInfoComponent>;
    _matSelect: MatSelect | undefined;
    _wrapperElement: ElementRef;
    /** Controls the position of the form field label. Either left (default) or on top above the form field.
     * The additional variant 'hint' keeps label inside the form field, emulating placeholder. This is usually only
     * needed for cases like the date-range picker which has 2 separate smaller fields for actual input.
     */
    labelPosition: 'left' | 'top' | 'hint';
    /**
     * Set the width of the label (in left position):
     * 'flex' - flexible width based on content (default)
     * 'large' - large fixed width label for first column
     * 'small' - smaller fixed width label for second column
     */
    labelSize: 'flex' | 'large';
    /** CSS length to set for the form field */
    fieldWidth: string;
    color: ThemePalette;
    readonly _labelId: string;
    private _explicitFormFieldControl;
    private destroyed$;
    private _showOptionalMarker;
    constructor(cd: ChangeDetectorRef, _elementRef: ElementRef<HTMLInputElement>);
    get _control(): MatFormFieldControl<any>;
    set _control(value: MatFormFieldControl<any>);
    /** Show the "(optional)" label suffix */
    get showOptionalMarker(): BooleanInput;
    set showOptionalMarker(value: BooleanInput);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    _forwardState(prop: keyof AbstractControlDirective): boolean;
    _displayErrorElement(): boolean;
    _displayInfoElement(): boolean;
    _hasLabel(): boolean;
    _hasHintLabel(): boolean;
    _showHintLabel(): boolean;
    _hasFloatingLabel(): boolean;
    _shouldLabelFloat(): boolean;
    getConnectedOverlayOrigin(): ElementRef;
    getLabelId(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiFormFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiFormFieldComponent, "mui-form-field", ["muiFormField"], { "labelPosition": "labelPosition"; "labelSize": "labelSize"; "fieldWidth": "fieldWidth"; "showOptionalMarker": "showOptionalMarker"; }, {}, ["_prefixChild", "_suffixChild", "formFieldControl", "_labelChild", "_matSelect", "_infoChildren"], ["mui-label", "[muiPrefix]", "*", "[muiSuffix]", "mui-form-field-info[type='error']", "mui-form-field-info:not([type='error])"], false, never>;
}
