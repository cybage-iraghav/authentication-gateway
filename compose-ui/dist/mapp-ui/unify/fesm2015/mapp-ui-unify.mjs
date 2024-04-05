import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, Optional, Self, Inject, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, HostBinding, ViewChild, ContentChild, ContentChildren, NgModule, TemplateRef, HostListener, EventEmitter, Output, Injectable, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import * as i1$1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/cdk/platform';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import * as i2 from '@angular/forms';
import { Validators, FormBuilder, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import * as i3 from '@angular/material/core';
import { mixinErrorState, mixinInitialized } from '@angular/material/core';
import { MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Subject, merge, switchMap, debounceTime, filter, map } from 'rxjs';
import * as i4 from '@angular/cdk/text-field';
import * as i3$2 from '@angular/material/select';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { startWith, takeUntil } from 'rxjs/operators';
import * as i3$1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i2$1 from '@mapp-ui/common';
import { MuiIconModule } from '@mapp-ui/common';
import * as i1$3 from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i2$2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4$1 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Interval } from 'luxon';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * This token is used to inject the object whose value should be set into `MuiInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `MuiInput` delegate the getting and setting of the
 * value to them.
 */
const MUI_INPUT_VALUE_ACCESSOR = new InjectionToken('MUI_INPUT_VALUE_ACCESSOR');

/* eslint-disable @typescript-eslint/no-explicit-any */
// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MUI_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
let nextUniqueId$1 = 0;
// Boilerplate for applying mixins to MatInput.
const _MuiInputBase = mixinErrorState(class {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /**
     * Form control bound to the component.
     * Implemented as part of `MatFormFieldControl`.
     */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
        /**
         * Emits whenever the component state changes and should cause the parent
         * form field to update. Implemented as part of `MatFormFieldControl`.
         */
        this.stateChanges = new Subject();
    }
});
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class MuiInput extends _MuiInputBase {
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get required() {
        var _a, _b, _c, _d;
        return (_d = (_a = this._required) !== null && _a !== void 0 ? _a : (_c = (_b = this.ngControl) === null || _b === void 0 ? void 0 : _b.control) === null || _c === void 0 ? void 0 : _c.hasValidator(Validators.required)) !== null && _d !== void 0 ? _d : false;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** Input type of the element. */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea && getSupportedInputTypes()
            .has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get value() {
        return this._inputValueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /** Whether the element is readonly. */
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = coerceBooleanProperty(value);
    }
    constructor(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, _autofillMonitor) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._autofillMonitor = _autofillMonitor;
        this._uid = `mui-input-${nextUniqueId$1++}`;
        /**
         * Implemented as part of MatFormFieldControl.
         */
        this.focused = false;
        /**
         * Implemented as part of MatFormFieldControl.
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of MatFormFieldControl.
         */
        this.controlType = 'mui-input';
        /**
         * Implemented as part of MatFormFieldControl.
         */
        this.autofilled = false;
        this.shouldLabelFloat = false;
        this._disabled = false;
        this._type = 'text';
        this._readonly = false;
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(t => getSupportedInputTypes()
            .has(t));
        const element = this._elementRef.nativeElement;
        const nodeName = element.nodeName.toLowerCase();
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || element;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        this._isTextarea = nodeName === 'textarea';
    }
    ngAfterViewInit() {
        if (this._platform.isBrowser) {
            this._autofillMonitor.monitor(this._elementRef.nativeElement)
                .subscribe(event => {
                this.autofilled = event.isAutofilled;
                this.stateChanges.next();
            });
        }
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        if (this._platform.isBrowser) {
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
            // Since the input isn't a `ControlValueAccessor`, we don't have a good way of knowing when
            // the disabled state has changed. We can't use the `ngControl.statusChanges`, because it
            // won't fire if the input is disabled with `emitEvents = false`, despite the input becoming
            // disabled.
            if (this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled) {
                this.disabled = this.ngControl.disabled;
                this.stateChanges.next();
            }
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
        // We need to dirty-check and set the placeholder attribute ourselves, because whether it's
        // present or not depends on a query which is prone to "changed after checked" errors.
        this._dirtyCheckPlaceholder();
    }
    /** Focuses the input. */
    focus(options) {
        this._elementRef.nativeElement.focus(options);
    }
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    _onInput() {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this._elementRef.nativeElement.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Does some manual dirty checking on the native input `placeholder` attribute. */
    _dirtyCheckPlaceholder() {
        const placeholder = this._getPlaceholder();
        if (placeholder !== this._previousPlaceholder) {
            const element = this._elementRef.nativeElement;
            this._previousPlaceholder = placeholder;
            placeholder
                ? element.setAttribute('placeholder', placeholder)
                : element.removeAttribute('placeholder');
        }
    }
    /** Gets the current placeholder of the form field. */
    _getPlaceholder() {
        return this.placeholder || null;
    }
    /** Make sure the input is a supported type. */
    _validateType() {
        if (MUI_INPUT_INVALID_TYPES.indexOf(this._type) > -1 /*&&
     (typeof ngDevMode === 'undefined' || ngDevMode)*/) {
            throw Error(`Input type "${this._type}" isn't supported by muiInput.`);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    get empty() {
        return (!this._isNeverEmpty() &&
            !this._elementRef.nativeElement.value &&
            !this._isBadInput() &&
            !this.autofilled);
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    setDescribedByIds(ids) {
        if (ids.length) {
            this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
        }
        else {
            this._elementRef.nativeElement.removeAttribute('aria-describedby');
        }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     */
    onContainerClick() {
        // Do not re-focus the input element if the element is already focused. Otherwise it can happen
        // that someone clicks on a time input and the cursor resets to the "hours" field while the
        // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
        if (!this.focused) {
            this.focus();
        }
    }
}
MuiInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiInput, deps: [{ token: i0.ElementRef }, { token: i1.Platform }, { token: i2.NgControl, optional: true, self: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }, { token: MUI_INPUT_VALUE_ACCESSOR, optional: true, self: true }, { token: i4.AutofillMonitor }], target: i0.ɵɵFactoryTarget.Directive });
MuiInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiInput, selector: "input[muiInput], textarea[muiInput], select[muiInput]", inputs: { disabled: "disabled", id: "id", placeholder: "placeholder", name: "name", required: "required", type: "type", errorStateMatcher: "errorStateMatcher", userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"], value: "value", readonly: "readonly" }, host: { listeners: { "focus": "_focusChanged(true)", "blur": "_focusChanged(false)", "input": "_onInput()" }, properties: { "id": "id", "disabled": "disabled", "required": "required", "attr.name": "name || null", "attr.readonly": "readonly || null", "attr.id": "id" }, classAttribute: "mui-input-element" }, providers: [{ provide: MatFormFieldControl, useExisting: MuiInput }], exportAs: ["muiInput"], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiInput, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[muiInput], textarea[muiInput], select[muiInput]`,
                    exportAs: 'muiInput',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        'class': 'mui-input-element',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[id]': 'id',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[attr.name]': 'name || null',
                        '[attr.readonly]': 'readonly || null',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[attr.id]': 'id',
                        '(focus)': '_focusChanged(true)',
                        '(blur)': '_focusChanged(false)',
                        '(input)': '_onInput()'
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MuiInput }]
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i2.NgControl, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: i2.NgForm, decorators: [{
                        type: Optional
                    }] }, { type: i2.FormGroupDirective, decorators: [{
                        type: Optional
                    }] }, { type: i3.ErrorStateMatcher }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }, {
                        type: Inject,
                        args: [MUI_INPUT_VALUE_ACCESSOR]
                    }] }, { type: i4.AutofillMonitor }];
    }, propDecorators: { disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], type: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], userAriaDescribedBy: [{
                type: Input,
                args: ['aria-describedby']
            }], value: [{
                type: Input
            }], readonly: [{
                type: Input
            }] } });

/** Component for showing additional contextual info like errors or warnings adjacent to a mui-form-field. */
class MuiFormFieldInfoComponent {
    constructor() {
        this.hostClassNames = ['mui-form-field-info'];
        /** Defines the type of the info element. Defaults to error. */
        this.type = 'error';
        /** Defines how the info text is displayed. Either inline, next to the icon (default) or as tooltip */
        this.display = 'inline';
        this.tooltipMessage = '';
    }
    ngOnInit() {
        var _a;
        const infoTypeClass = 'mui-state-' + this.type;
        this.hostClassNames = [
            ...this.hostClassNames,
            infoTypeClass
        ];
        this.tooltipMessage = (_a = this.textContent.nativeElement.textContent) !== null && _a !== void 0 ? _a : '';
    }
}
MuiFormFieldInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiFormFieldInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiFormFieldInfoComponent, selector: "mui-form-field-info", inputs: { type: "type", display: "display" }, host: { properties: { "class": "this.hostClassNames" } }, viewQueries: [{ propertyName: "textContent", first: true, predicate: ["content"], descendants: true, static: true }], exportAs: ["muiFormFieldInfo"], ngImport: i0, template: "<span class=\"mui-icons mui-form-field-info-{{ type }}\"\r\n    [matTooltip]=\"tooltipMessage\"\r\n    [matTooltipDisabled]=\"display === 'inline'\"\r\n    matTooltipClass=\"mui-form-field-info-tooltip\"\r\n    matTooltipHideDelay=\"3000\"\r\n>{{ type }}</span>\r\n<span #content\r\n    [hidden]=\"display === 'tooltip'\"\r\n    class=\"mui-form-field-info-message\"\r\n><ng-content></ng-content></span>\r\n\r\n", styles: [".mui-form-field-info-wrapper{display:inline-flex;position:relative;align-items:center;gap:8px}.mui-form-field-info .mui-icons{-webkit-user-select:none;user-select:none}\n"], dependencies: [{ kind: "directive", type: i1$1.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-form-field-info', exportAs: 'muiFormFieldInfo', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span class=\"mui-icons mui-form-field-info-{{ type }}\"\r\n    [matTooltip]=\"tooltipMessage\"\r\n    [matTooltipDisabled]=\"display === 'inline'\"\r\n    matTooltipClass=\"mui-form-field-info-tooltip\"\r\n    matTooltipHideDelay=\"3000\"\r\n>{{ type }}</span>\r\n<span #content\r\n    [hidden]=\"display === 'tooltip'\"\r\n    class=\"mui-form-field-info-message\"\r\n><ng-content></ng-content></span>\r\n\r\n", styles: [".mui-form-field-info-wrapper{display:inline-flex;position:relative;align-items:center;gap:8px}.mui-form-field-info .mui-icons{-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }], type: [{
                type: Input
            }], display: [{
                type: Input
            }], textContent: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });

/** Label to be displayed for the form field */
class MuiLabelDirective {
}
MuiLabelDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLabelDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiLabelDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiLabelDirective, selector: "mui-label", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLabelDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'mui-label'
                }]
        }] });

/** Prefix which can be placed in front of the form field */
class MuiPrefixDirective {
}
MuiPrefixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPrefixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPrefixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPrefixDirective, selector: "[muiPrefix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPrefixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPrefix]'
                }]
        }] });

/** Suffix which can be placed after the form field */
class MuiSuffixDirective {
}
MuiSuffixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSuffixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiSuffixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiSuffixDirective, selector: "[muiSuffix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSuffixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiSuffix]'
                }]
        }] });

/* eslint-disable @angular-eslint/no-host-metadata-property,@typescript-eslint/no-explicit-any */
// global counter for label ids
let nextUniqueId = 0;
class MuiFormFieldComponent {
    constructor(cd, _elementRef) {
        this.cd = cd;
        this._elementRef = _elementRef;
        /** Controls the position of the form field label. Either left (default) or on top above the form field.
         * The additional variant 'hint' keeps label inside the form field, emulating placeholder. This is usually only
         * needed for cases like the date-range picker which has 2 separate smaller fields for actual input.
         */
        this.labelPosition = 'left';
        /**
         * Set the width of the label (in left position):
         * 'flex' - flexible width based on content (default)
         * 'large' - large fixed width label for first column
         * 'small' - smaller fixed width label for second column
         */
        this.labelSize = 'flex';
        this._labelId = `mui-form-field-label-${nextUniqueId++}`;
        this.destroyed$ = new Subject();
        this._showOptionalMarker = false;
    }
    get _control() {
        return this._explicitFormFieldControl || this.formFieldControl;
    }
    set _control(value) {
        this._explicitFormFieldControl = value;
    }
    /** Show the "(optional)" label suffix */
    get showOptionalMarker() {
        return this._showOptionalMarker;
    }
    set showOptionalMarker(value) {
        this._showOptionalMarker = coerceBooleanProperty(value);
    }
    ngAfterContentInit() {
        merge(this._control.stateChanges, this._infoChildren.changes)
            .pipe(startWith(null), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.cd.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    _forwardState(prop) {
        const control = this._control ? this._control.ngControl : null;
        return control && control[prop];
    }
    _displayErrorElement() {
        return this._infoChildren && this._infoChildren.length > 0 && this._control.errorState;
    }
    _displayInfoElement() {
        return this._infoChildren && this._infoChildren.some(child => child.type !== 'error') && !this._control.errorState;
    }
    _hasLabel() {
        return !!this._labelChild;
    }
    _hasHintLabel() {
        return this._hasLabel() && this.labelPosition === 'hint';
    }
    _showHintLabel() {
        return this._control.empty;
    }
    _hasFloatingLabel() {
        return false;
    }
    _shouldLabelFloat() {
        return false;
    }
    getConnectedOverlayOrigin() {
        return this._wrapperElement;
    }
    getLabelId() {
        return this._labelId;
    }
}
MuiFormFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MuiFormFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiFormFieldComponent, selector: "mui-form-field", inputs: { labelPosition: "labelPosition", labelSize: "labelSize", fieldWidth: "fieldWidth", showOptionalMarker: "showOptionalMarker" }, host: { properties: { "class.mui-form-field-invalid": "_control.errorState", "class.mui-form-field-disabled": "_control.disabled", "class.mui-form-field-autofilled": "_control.autofilled", "class.mat-focused": "_control.focused", "class.ng-untouched": "_forwardState(\"untouched\")", "class.ng-touched": "_forwardState(\"touched\")", "class.ng-pristine": "_forwardState(\"pristine\")", "class.ng-dirty": "_forwardState(\"dirty\")", "class.ng-valid": "_forwardState(\"valid\")", "class.ng-invalid": "_forwardState(\"invalid\")", "class.ng-pending": "_forwardState(\"pending\")" }, classAttribute: "mui-form-field" }, providers: [{ provide: MAT_FORM_FIELD, useExisting: MuiFormFieldComponent }], queries: [{ propertyName: "_prefixChild", first: true, predicate: MuiPrefixDirective, descendants: true }, { propertyName: "_suffixChild", first: true, predicate: MuiSuffixDirective, descendants: true }, { propertyName: "formFieldControl", first: true, predicate: MatFormFieldControl, descendants: true }, { propertyName: "_labelChild", first: true, predicate: MuiLabelDirective, descendants: true }, { propertyName: "_matSelect", first: true, predicate: MatSelect, descendants: true }, { propertyName: "_infoChildren", predicate: MuiFormFieldInfoComponent }], viewQueries: [{ propertyName: "_wrapperElement", first: true, predicate: ["wrapper"], descendants: true, static: true }], exportAs: ["muiFormField"], ngImport: i0, template: "<div class=\"mui-form-field-container\"\r\n    [class.mui-form-field-toplabel]=\"labelPosition === 'top'\"\r\n>\r\n  <ng-template #labelContent>\r\n    <ng-content select=\"mui-label\"></ng-content>\r\n  </ng-template>\r\n\r\n  <label *ngIf=\"_hasLabel() && !_hasHintLabel()\"\r\n      [class]=\"'mui-form-field-label size-' + labelSize\"\r\n      [id]=\"_labelId\"\r\n      [attr.for]=\"_control.id\"\r\n  >\r\n    <ng-container [ngTemplateOutlet]=\"labelContent\"></ng-container>\r\n\r\n    <span *ngIf=\"!_control.required && showOptionalMarker\"\r\n        class=\"mui-form-field-required-marker\"\r\n        aria-hidden=\"true\"\r\n        i18n=\"form field optional label\"\r\n        >&#32;(optional)</span>\r\n  </label>\r\n\r\n  <div class=\"mui-form-field-wrapper\"\r\n      [style.width]=\"fieldWidth\"\r\n      #wrapper\r\n  >\r\n    <div class=\"mui-form-field-flex\">\r\n      <div *ngIf=\"_prefixChild\"\r\n          class=\"mui-form-field-prefix\"\r\n      >\r\n        <ng-content select=\"[muiPrefix]\"></ng-content>\r\n      </div>\r\n      <div class=\"mui-form-field-infix\">\r\n        <label *ngIf=\"_hasHintLabel() && _showHintLabel()\"\r\n            class=\"mui-form-field-label-hint\"\r\n            [id]=\"_labelId\"\r\n            [attr.for]=\"_control.id\"\r\n        >\r\n          <ng-container [ngTemplateOutlet]=\"labelContent\"></ng-container>\r\n        </label>\r\n        <ng-content></ng-content>\r\n      </div>\r\n      <div *ngIf=\"_suffixChild\"\r\n          class=\"mui-form-field-suffix\">\r\n        <ng-content select=\"[muiSuffix]\"></ng-content>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <ng-content *ngIf=\"_displayErrorElement()\"\r\n      select=\"mui-form-field-info[type='error']\"></ng-content>\r\n  <ng-content *ngIf=\"_displayInfoElement()\"\r\n      select=\"mui-form-field-info:not([type='error])\"></ng-content>\r\n</div>\r\n", styles: [".mui-form-field{display:inline-block;position:relative;vertical-align:middle;text-align:left}.mui-form-field+.mui-form-field .mui-form-field-label{margin-right:16px}.mui-form-field-container{display:inline-flex;align-items:center;box-sizing:border-box;width:100%}.mui-form-field-container.mui-form-field-toplabel{flex-direction:column}.mui-form-field-container.mui-form-field-toplabel .mui-form-field-label{margin-bottom:16px}.mui-form-field-label{margin-right:24px}.mui-form-field-label.size-large{width:172px;flex:0 0 auto}.mui-form-field-label-hint{position:absolute}.mui-form-field-wrapper{border-radius:2px;flex-grow:1;box-sizing:border-box}.mui-form-field-flex{position:relative;display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mui-form-field-infix{padding:9px 8px;box-sizing:border-box;flex:1;min-width:0}.mui-form-field-prefix,.mui-form-field-suffix{white-space:nowrap;flex:none;position:relative;align-self:center}.mui-form-field-prefix [muiSuffix]+[muiSuffix],.mui-form-field-suffix [muiSuffix]+[muiSuffix]{margin-left:8px}.mui-form-field-prefix .mat-mdc-icon-button,.mui-form-field-suffix .mat-mdc-icon-button{height:38px;width:38px;padding:7px}.mui-form-field-prefix .mat-mdc-icon-button .mat-mdc-button-touch-target,.mui-form-field-suffix .mat-mdc-icon-button .mat-mdc-button-touch-target{width:38px;height:38px}.mui-form-field-prefix{margin-left:8px}.mui-form-field-suffix{margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-form-field', exportAs: 'muiFormField', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'mui-form-field',
                        '[class.mui-form-field-invalid]': '_control.errorState',
                        '[class.mui-form-field-disabled]': '_control.disabled',
                        '[class.mui-form-field-autofilled]': '_control.autofilled',
                        '[class.mat-focused]': '_control.focused',
                        '[class.ng-untouched]': '_forwardState("untouched")',
                        '[class.ng-touched]': '_forwardState("touched")',
                        '[class.ng-pristine]': '_forwardState("pristine")',
                        '[class.ng-dirty]': '_forwardState("dirty")',
                        '[class.ng-valid]': '_forwardState("valid")',
                        '[class.ng-invalid]': '_forwardState("invalid")',
                        '[class.ng-pending]': '_forwardState("pending")'
                    }, providers: [{ provide: MAT_FORM_FIELD, useExisting: MuiFormFieldComponent }], template: "<div class=\"mui-form-field-container\"\r\n    [class.mui-form-field-toplabel]=\"labelPosition === 'top'\"\r\n>\r\n  <ng-template #labelContent>\r\n    <ng-content select=\"mui-label\"></ng-content>\r\n  </ng-template>\r\n\r\n  <label *ngIf=\"_hasLabel() && !_hasHintLabel()\"\r\n      [class]=\"'mui-form-field-label size-' + labelSize\"\r\n      [id]=\"_labelId\"\r\n      [attr.for]=\"_control.id\"\r\n  >\r\n    <ng-container [ngTemplateOutlet]=\"labelContent\"></ng-container>\r\n\r\n    <span *ngIf=\"!_control.required && showOptionalMarker\"\r\n        class=\"mui-form-field-required-marker\"\r\n        aria-hidden=\"true\"\r\n        i18n=\"form field optional label\"\r\n        >&#32;(optional)</span>\r\n  </label>\r\n\r\n  <div class=\"mui-form-field-wrapper\"\r\n      [style.width]=\"fieldWidth\"\r\n      #wrapper\r\n  >\r\n    <div class=\"mui-form-field-flex\">\r\n      <div *ngIf=\"_prefixChild\"\r\n          class=\"mui-form-field-prefix\"\r\n      >\r\n        <ng-content select=\"[muiPrefix]\"></ng-content>\r\n      </div>\r\n      <div class=\"mui-form-field-infix\">\r\n        <label *ngIf=\"_hasHintLabel() && _showHintLabel()\"\r\n            class=\"mui-form-field-label-hint\"\r\n            [id]=\"_labelId\"\r\n            [attr.for]=\"_control.id\"\r\n        >\r\n          <ng-container [ngTemplateOutlet]=\"labelContent\"></ng-container>\r\n        </label>\r\n        <ng-content></ng-content>\r\n      </div>\r\n      <div *ngIf=\"_suffixChild\"\r\n          class=\"mui-form-field-suffix\">\r\n        <ng-content select=\"[muiSuffix]\"></ng-content>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <ng-content *ngIf=\"_displayErrorElement()\"\r\n      select=\"mui-form-field-info[type='error']\"></ng-content>\r\n  <ng-content *ngIf=\"_displayInfoElement()\"\r\n      select=\"mui-form-field-info:not([type='error])\"></ng-content>\r\n</div>\r\n", styles: [".mui-form-field{display:inline-block;position:relative;vertical-align:middle;text-align:left}.mui-form-field+.mui-form-field .mui-form-field-label{margin-right:16px}.mui-form-field-container{display:inline-flex;align-items:center;box-sizing:border-box;width:100%}.mui-form-field-container.mui-form-field-toplabel{flex-direction:column}.mui-form-field-container.mui-form-field-toplabel .mui-form-field-label{margin-bottom:16px}.mui-form-field-label{margin-right:24px}.mui-form-field-label.size-large{width:172px;flex:0 0 auto}.mui-form-field-label-hint{position:absolute}.mui-form-field-wrapper{border-radius:2px;flex-grow:1;box-sizing:border-box}.mui-form-field-flex{position:relative;display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mui-form-field-infix{padding:9px 8px;box-sizing:border-box;flex:1;min-width:0}.mui-form-field-prefix,.mui-form-field-suffix{white-space:nowrap;flex:none;position:relative;align-self:center}.mui-form-field-prefix [muiSuffix]+[muiSuffix],.mui-form-field-suffix [muiSuffix]+[muiSuffix]{margin-left:8px}.mui-form-field-prefix .mat-mdc-icon-button,.mui-form-field-suffix .mat-mdc-icon-button{height:38px;width:38px;padding:7px}.mui-form-field-prefix .mat-mdc-icon-button .mat-mdc-button-touch-target,.mui-form-field-suffix .mat-mdc-icon-button .mat-mdc-button-touch-target{width:38px;height:38px}.mui-form-field-prefix{margin-left:8px}.mui-form-field-suffix{margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { _prefixChild: [{
                type: ContentChild,
                args: [MuiPrefixDirective]
            }], _suffixChild: [{
                type: ContentChild,
                args: [MuiSuffixDirective]
            }], formFieldControl: [{
                type: ContentChild,
                args: [MatFormFieldControl]
            }], _labelChild: [{
                type: ContentChild,
                args: [MuiLabelDirective]
            }], _infoChildren: [{
                type: ContentChildren,
                args: [MuiFormFieldInfoComponent]
            }], _matSelect: [{
                type: ContentChild,
                args: [MatSelect]
            }], _wrapperElement: [{
                type: ViewChild,
                args: ['wrapper', { static: true }]
            }], labelPosition: [{
                type: Input
            }], labelSize: [{
                type: Input
            }], fieldWidth: [{
                type: Input
            }], showOptionalMarker: [{
                type: Input
            }] } });

class MuiFormFieldModule {
}
MuiFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, declarations: [MuiFormFieldComponent,
        MuiFormFieldInfoComponent,
        MuiPrefixDirective,
        MuiSuffixDirective,
        MuiLabelDirective,
        MuiInput], imports: [CommonModule,
        MatInputModule,
        MatTooltipModule], exports: [MuiFormFieldComponent,
        MuiFormFieldInfoComponent,
        MuiPrefixDirective,
        MuiSuffixDirective,
        MuiLabelDirective,
        MuiInput] });
MuiFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, imports: [CommonModule,
        MatInputModule,
        MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MuiFormFieldComponent,
                        MuiFormFieldInfoComponent,
                        MuiPrefixDirective,
                        MuiSuffixDirective,
                        MuiLabelDirective,
                        MuiInput
                    ],
                    imports: [
                        CommonModule,
                        MatInputModule,
                        MatTooltipModule
                    ],
                    exports: [
                        MuiFormFieldComponent,
                        MuiFormFieldInfoComponent,
                        MuiPrefixDirective,
                        MuiSuffixDirective,
                        MuiLabelDirective,
                        MuiInput
                    ]
                }]
        }] });

class MuiProgressStepComponent {
    constructor() {
        this._completedOverride = null;
        this.interacted = false;
        this.changed$ = new Subject();
    }
    /** Whether step is marked as completed. When setting a value for this, it will override the default handling
     * for completed state. */
    get completed() {
        return this._completedOverride == null ? this.getDefaultCompleted() : this._completedOverride;
    }
    set completed(value) {
        this._completedOverride = coerceBooleanProperty(value);
    }
    /** Emits on changes in this step */
    get changes() {
        return this.changed$.asObservable();
    }
    ngOnChanges(changes) {
        this.changed$.next();
    }
    markAsInteracted() {
        if (!this.interacted) {
            this.interacted = true;
            this.changed$.next();
        }
    }
    getDefaultCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
}
MuiProgressStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiProgressStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiProgressStepComponent, selector: "mui-progress-step", inputs: { label: "label", stepControl: "stepControl", completed: "completed" }, viewQueries: [{ propertyName: "content", first: true, predicate: TemplateRef, descendants: true, static: true }, { propertyName: "actionsTemplate", first: true, predicate: ["actions"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #actions>\r\n  <ng-content select=\"mui-step-actions, [muiStepActions]\"></ng-content>\r\n</ng-template>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-progress-step', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #actions>\r\n  <ng-content select=\"mui-step-actions, [muiStepActions]\"></ng-content>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], actionsTemplate: [{
                type: ViewChild,
                args: ['actions', { static: true }]
            }], label: [{
                type: Input
            }], stepControl: [{
                type: Input
            }], completed: [{
                type: Input
            }] } });

class MuiStepHeaderComponent {
    constructor() {
        /** Whether the given step label is active, e.g. can be clicked on to navigate to the step. */
        this.active = true;
        /** State of the step */
        this.completed = false;
        /** Whether the step is selected */
        this.selected = false;
        this._hostClass = 'mui-step-header';
    }
    get _hostClassActive() {
        return this.active;
    }
}
MuiStepHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiStepHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepHeaderComponent, selector: "mui-step-header", inputs: { label: "label", active: "active", completed: "completed", selected: "selected" }, host: { properties: { "class": "this._hostClass", "class.mui-step-header-active": "this._hostClassActive" } }, ngImport: i0, template: "<div *ngIf=\"completed\"\r\n    class=\"mui-step-icon\">\r\n  <mui-icon class=\"mui-step-icon-complete\">success_check</mui-icon>\r\n</div>\r\n<div [class.mui-step-label-active]=\"active\"\r\n    [class.mui-step-label-selected]=\"selected\"\r\n    [class.mat-body-strong]=\"selected\"\r\n    class=\"mui-step-label\"\r\n>{{ label }}</div>\r\n", styles: [":host{display:flex;align-items:center;height:48px;padding:0 24px;overflow:hidden;position:relative;cursor:default}:host(.mui-step-header-active){cursor:pointer}.mui-step-icon{margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-step-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"completed\"\r\n    class=\"mui-step-icon\">\r\n  <mui-icon class=\"mui-step-icon-complete\">success_check</mui-icon>\r\n</div>\r\n<div [class.mui-step-label-active]=\"active\"\r\n    [class.mui-step-label-selected]=\"selected\"\r\n    [class.mat-body-strong]=\"selected\"\r\n    class=\"mui-step-label\"\r\n>{{ label }}</div>\r\n", styles: [":host{display:flex;align-items:center;height:48px;padding:0 24px;overflow:hidden;position:relative;cursor:default}:host(.mui-step-header-active){cursor:pointer}.mui-step-icon{margin-right:8px}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], active: [{
                type: Input
            }], completed: [{
                type: Input
            }], selected: [{
                type: Input
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }], _hostClassActive: [{
                type: HostBinding,
                args: ['class.mui-step-header-active']
            }] } });

class MuiProgressBarComponent {
    constructor(cd) {
        this.cd = cd;
        /**
         * Whether to override the disabled state handling of the 'Next' button. By default, button is disabled as long
         * as the Control component bound to [stepControl] is invalid. By setting this input to true, the button's disabled
         * state will need to be handled manually. If no [stepControl] is assigned, button state will need to be
         * handled manually as well. */
        this.manualButtonHandling = false;
        this._selectedIndex = 0;
        this.destroyed$ = new Subject();
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(index) {
        var _a, _b;
        const newIndex = coerceNumberProperty(index);
        if (newIndex < 0 || (newIndex > ((_a = this.steps) === null || _a === void 0 ? void 0 : _a.length))) {
            throw Error('muiStepper: cannot set selected index out of bounds.');
        }
        if (this.steps) {
            (_b = this.selected) === null || _b === void 0 ? void 0 : _b.markAsInteracted();
        }
        this._selectedIndex = newIndex;
        this.stateChanged();
    }
    /** The step that is selected. */
    get selected() {
        return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
    }
    set selected(step) {
        this.selectedIndex = step && this.steps ?
            this.steps.toArray()
                .indexOf(step) :
            -1;
    }
    ngAfterContentInit() {
        // monitor changes of mui-step children
        this.steps.changes
            .pipe(takeUntil(this.destroyed$), switchMap(() => {
            const stepChanges = this.steps.map(step => step.changes);
            return merge(...stepChanges);
        }))
            .subscribe(() => {
            this.stateChanged();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    stateChanged() {
        this.cd.markForCheck();
    }
    isStepActive(index) {
        return this.selectedIndex > index;
    }
    stepClicked(index, step) {
        if (this.isStepActive(index) && index !== this.selectedIndex) {
            this.selected = step;
        }
    }
    /**
     * Moves to the next step, if there are no errors on the current step.
     * Otherwise, if the current step form is invalid, marks all fields as touched to trigger error display.
     */
    next() {
        var _a, _b, _c, _d;
        if (((_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.stepControl) === null || _b === void 0 ? void 0 : _b.invalid) || ((_d = (_c = this.selected) === null || _c === void 0 ? void 0 : _c.stepControl) === null || _d === void 0 ? void 0 : _d.pending)) {
            this.selected.stepControl.markAllAsTouched();
            this.selected.markAsInteracted();
        }
        else {
            this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
        }
    }
}
MuiProgressBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiProgressBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiProgressBarComponent, selector: "mui-progress-bar", inputs: { stepperTitle: "stepperTitle", manualButtonHandling: "manualButtonHandling", selectedIndex: "selectedIndex", selected: "selected" }, queries: [{ propertyName: "steps", predicate: MuiProgressStepComponent }], ngImport: i0, template: "<div class=\"mui-progress-bar-wrapper\">\r\n  <div class=\"mui-progress-header-container\">\r\n    <div *ngIf=\"stepperTitle\"\r\n        class=\"mui-progress-bar-title mat-h4\">{{ stepperTitle }}</div>\r\n    <div class=\"mui-progress-steps-container\">\r\n      <ng-container *ngFor=\"let step of steps; let i = index; let isLast = last\">\r\n        <mui-step-header\r\n            (click)=\"stepClicked(i, step)\"\r\n            [active]=\"isStepActive(i)\"\r\n            [completed]=\"step.completed\"\r\n            [label]=\"step.label\"\r\n            [selected]=\"selectedIndex === i\"\r\n        ></mui-step-header>\r\n        <div *ngIf=\"!isLast\"\r\n            class=\"mui-step-divider\">\r\n          <mui-icon>chevron_right</mui-icon>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-progress-bar-content-container\">\r\n    <mat-card appearance=\"outlined\">\r\n      <div *ngFor=\"let step of steps; let i = index;\"\r\n          [class.mui-progress-bar-content-hidden]=\"selectedIndex !== i\"\r\n          class=\"mui-progress-bar-content\"\r\n      >\r\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\r\n\r\n      </div>\r\n    </mat-card>\r\n  </div>\r\n  <ng-container [ngTemplateOutlet]=\"selected?.actionsTemplate ?? null\"></ng-container>\r\n</div>\r\n", styles: [".mui-progress-bar-wrapper{overflow:hidden;display:flex;flex-direction:column;height:100%}.mui-progress-header-container{background-color:#fff;height:56px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;flex:0 0 auto;z-index:2;position:relative;box-shadow:0 0 4px #ccd3df66}.mui-progress-steps-container{display:flex;align-items:center;justify-content:center}.mui-progress-bar-title{padding-left:40px}.mui-progress-bar-title.mat-h4{margin:0}.mui-progress-bar-content-container{flex:1 1 auto;padding:24px;box-sizing:border-box;position:relative;overflow:auto}.mui-progress-bar-content-container>.mat-mdc-card{padding:40px 40px 24px}.mui-progress-bar-content-hidden{visibility:hidden;overflow:hidden;height:0}\n"], dependencies: [{ kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }, { kind: "component", type: i3$1.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "component", type: MuiStepHeaderComponent, selector: "mui-step-header", inputs: ["label", "active", "completed", "selected"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-progress-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-progress-bar-wrapper\">\r\n  <div class=\"mui-progress-header-container\">\r\n    <div *ngIf=\"stepperTitle\"\r\n        class=\"mui-progress-bar-title mat-h4\">{{ stepperTitle }}</div>\r\n    <div class=\"mui-progress-steps-container\">\r\n      <ng-container *ngFor=\"let step of steps; let i = index; let isLast = last\">\r\n        <mui-step-header\r\n            (click)=\"stepClicked(i, step)\"\r\n            [active]=\"isStepActive(i)\"\r\n            [completed]=\"step.completed\"\r\n            [label]=\"step.label\"\r\n            [selected]=\"selectedIndex === i\"\r\n        ></mui-step-header>\r\n        <div *ngIf=\"!isLast\"\r\n            class=\"mui-step-divider\">\r\n          <mui-icon>chevron_right</mui-icon>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-progress-bar-content-container\">\r\n    <mat-card appearance=\"outlined\">\r\n      <div *ngFor=\"let step of steps; let i = index;\"\r\n          [class.mui-progress-bar-content-hidden]=\"selectedIndex !== i\"\r\n          class=\"mui-progress-bar-content\"\r\n      >\r\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\r\n\r\n      </div>\r\n    </mat-card>\r\n  </div>\r\n  <ng-container [ngTemplateOutlet]=\"selected?.actionsTemplate ?? null\"></ng-container>\r\n</div>\r\n", styles: [".mui-progress-bar-wrapper{overflow:hidden;display:flex;flex-direction:column;height:100%}.mui-progress-header-container{background-color:#fff;height:56px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;flex:0 0 auto;z-index:2;position:relative;box-shadow:0 0 4px #ccd3df66}.mui-progress-steps-container{display:flex;align-items:center;justify-content:center}.mui-progress-bar-title{padding-left:40px}.mui-progress-bar-title.mat-h4{margin:0}.mui-progress-bar-content-container{flex:1 1 auto;padding:24px;box-sizing:border-box;position:relative;overflow:auto}.mui-progress-bar-content-container>.mat-mdc-card{padding:40px 40px 24px}.mui-progress-bar-content-hidden{visibility:hidden;overflow:hidden;height:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { steps: [{
                type: ContentChildren,
                args: [MuiProgressStepComponent]
            }], stepperTitle: [{
                type: Input
            }], manualButtonHandling: [{
                type: Input
            }], selectedIndex: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });

class MuiNextStepDirective {
    constructor(stepper) {
        this.stepper = stepper;
        this.type = 'submit';
    }
    get isDisabled() {
        var _a;
        if (this.stepper.manualButtonHandling) {
            return false;
        }
        const stepControl = (_a = this.stepper.selected) === null || _a === void 0 ? void 0 : _a.stepControl;
        if (!stepControl) {
            return false;
        }
        return stepControl.invalid || stepControl.pending;
    }
    clicked() {
        this.stepper.next();
    }
}
MuiNextStepDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNextStepDirective, deps: [{ token: MuiProgressBarComponent }], target: i0.ɵɵFactoryTarget.Directive });
MuiNextStepDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiNextStepDirective, selector: "button[muiNextStep]", inputs: { type: "type" }, host: { listeners: { "click": "clicked()" }, properties: { "type": "this.type", "class.mat-button-disabled": "this.isDisabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNextStepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[muiNextStep]'
                }]
        }], ctorParameters: function () { return [{ type: MuiProgressBarComponent }]; }, propDecorators: { type: [{
                type: HostBinding,
                args: ['type']
            }, {
                type: Input
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.mat-button-disabled']
            }], clicked: [{
                type: HostListener,
                args: ['click']
            }] } });

class MuiStepActionsDirective {
    constructor() {
        this.hostClass = 'mui-step-actions';
    }
}
MuiStepActionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepActionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiStepActionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepActionsDirective, selector: "[muiStepActions], mui-step-actions", host: { properties: { "class": "this.hostClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiStepActions], mui-step-actions'
                }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class MuiProgressBarModule {
}
MuiProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, declarations: [MuiProgressBarComponent,
        MuiProgressStepComponent,
        MuiStepHeaderComponent,
        MuiNextStepDirective,
        MuiStepActionsDirective], imports: [CommonModule,
        MuiIconModule,
        MatCardModule], exports: [MuiProgressBarComponent,
        MuiProgressStepComponent,
        MuiNextStepDirective,
        MuiStepActionsDirective] });
MuiProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, imports: [CommonModule,
        MuiIconModule,
        MatCardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MuiProgressBarComponent,
                        MuiProgressStepComponent,
                        MuiStepHeaderComponent,
                        MuiNextStepDirective,
                        MuiStepActionsDirective
                    ],
                    imports: [
                        CommonModule,
                        MuiIconModule,
                        MatCardModule
                    ],
                    exports: [
                        MuiProgressBarComponent,
                        MuiProgressStepComponent,
                        MuiNextStepDirective,
                        MuiStepActionsDirective
                    ]
                }]
        }] });

/**
 * Component for creating a sorting header in a table column.
 * Needs to be used together with MatTable and MatSort.
 */
class MuiSortHeaderComponent {
    constructor(cdr, _sort, _columnDef) {
        this.cdr = cdr;
        this._sort = _sort;
        this._columnDef = _columnDef;
        this.hostClassName = 'mui-sort-header';
        /** The direction the arrow should be facing according to the current state. */
        this._arrowDirection = '';
        /** ID for the icon to be displayed */
        this._sortIcon = 'caret_up_down';
        this._disabled = false;
    }
    /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
    get disableClear() {
        return this._disableClear;
    }
    set disableClear(v) {
        this._disableClear = coerceBooleanProperty(v);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnInit() {
        if (!this.id && this._columnDef) {
            this.id = this._columnDef.name;
        }
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this._sort.register(this);
        this._handleStateChanges();
    }
    ngOnDestroy() {
        this._sort.deregister(this);
        this._updateSubscription.unsubscribe();
    }
    _isDisabled() {
        return this._sort.disabled || this.disabled;
    }
    _handleClick() {
        if (!this._isDisabled()) {
            this._sort.sort(this);
        }
    }
    _updateArrowDirection() {
        if (this._isSorted()) {
            this._arrowDirection = this._sort.direction;
            this._sortIcon = this._sort.direction === 'asc' ? 'caret-up' : 'caret-down';
        }
        else {
            this._arrowDirection = this.start || this._sort.start;
            this._sortIcon = 'caret_up_down';
        }
    }
    /** Whether this MuiSortHeader is currently sorted in either ascending or descending order. */
    _isSorted() {
        return (this._sort.active == this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc'));
    }
    _handleStateChanges() {
        this._updateSubscription = merge(this._sort.sortChange, this._sort._stateChanges)
            .subscribe(() => {
            this._updateArrowDirection();
            this.cdr.markForCheck();
        });
    }
}
MuiSortHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSortHeaderComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$3.MatSort, optional: true }, { token: 'MAT_SORT_HEADER_COLUMN_DEF', optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiSortHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiSortHeaderComponent, isStandalone: true, selector: "mui-sort-header", inputs: { id: ["mui-sort-header", "id"], start: "start", disableClear: "disableClear", disabled: "disabled" }, host: { listeners: { "click": "_handleClick()" }, properties: { "class": "this.hostClassName" } }, exportAs: ["muiSortHeader"], ngImport: i0, template: "<div class=\"mui-sort-header-container\"\r\n    [class.disabled]=\"_isDisabled()\"\r\n    [attr.tabindex]=\"_isDisabled() ? null : 0\"\r\n    [attr.role]=\"_isDisabled() ? null : 'button'\">\r\n\r\n  <div class=\"mui-sort-header-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <mui-icon *ngIf=\"!_isDisabled()\">{{ _sortIcon }}</mui-icon>\r\n</div>\r\n", styles: [".mui-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}.mui-sort-header-container.disabled{cursor:default}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSortHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-sort-header', exportAs: 'muiSortHeader', standalone: true, imports: [CommonModule, MuiIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-sort-header-container\"\r\n    [class.disabled]=\"_isDisabled()\"\r\n    [attr.tabindex]=\"_isDisabled() ? null : 0\"\r\n    [attr.role]=\"_isDisabled() ? null : 'button'\">\r\n\r\n  <div class=\"mui-sort-header-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <mui-icon *ngIf=\"!_isDisabled()\">{{ _sortIcon }}</mui-icon>\r\n</div>\r\n", styles: [".mui-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}.mui-sort-header-container.disabled{cursor:default}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1$3.MatSort, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: ['MAT_SORT_HEADER_COLUMN_DEF']
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], id: [{
                type: Input,
                args: ['mui-sort-header']
            }], start: [{
                type: Input
            }], disableClear: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });

/**
 * This component provides a container for handling additional expandable details in a table row.
 * The component manages necessary style classes as well as providing a nice animation on expand / collapse of the row.
 */
class MuiRowDetailsComponent {
    constructor() {
        /** Whether the content should be expanded or collapsed */
        this.isExpanded = false;
    }
}
MuiRowDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiRowDetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiRowDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiRowDetailsComponent, isStandalone: true, selector: "mui-row-details", inputs: { isExpanded: "isExpanded" }, ngImport: i0, template: "<div [@detailExpand]=\"isExpanded ? 'expanded' : 'collapsed'\"\r\n    class=\"mui-expand-details-container\">\r\n  <div class=\"mui-expand-details\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }], animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiRowDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-row-details', standalone: true, imports: [CommonModule], animations: [
                        trigger('detailExpand', [
                            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
                            state('expanded', style({ height: '*' })),
                            transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [@detailExpand]=\"isExpanded ? 'expanded' : 'collapsed'\"\r\n    class=\"mui-expand-details-container\">\r\n  <div class=\"mui-expand-details\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { isExpanded: [{
                type: Input
            }] } });

/**
 * This directive can be placed on a table row which should be expandable to reveal additional details.
 * It handles necessary class assignments as well as adding a click handler on the row which will notify
 * by output event when the row is expanded or collapsed.
 */
class MuiExpandableRowDirective {
    constructor() {
        this.hostClassName = 'mui-expandable-row';
        /** Control if the row is currently in expanded (true) or collapsed state (false). */
        this.muiExpandableRow = false;
        /**
         * Emits the new target state when the expandable row is clicked.
         * true => row is expanded
         * false => row is collapsed
         */
        this.expandableRowToggled = new EventEmitter();
    }
    get isExpanded() {
        return this.muiExpandableRow;
    }
    onRowClicked(event) {
        // only emit event when a non-interactive part of the row was clicked.
        if (!event.target.className.includes('mat-mdc-button-touch-target')) {
            this.expandableRowToggled.emit(!this.muiExpandableRow);
        }
    }
}
MuiExpandableRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiExpandableRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiExpandableRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiExpandableRowDirective, isStandalone: true, selector: "tr[muiExpandableRow]", inputs: { muiExpandableRow: "muiExpandableRow" }, outputs: { expandableRowToggled: "expandableRowToggled" }, host: { listeners: { "click": "onRowClicked($event)" }, properties: { "class": "this.hostClassName", "class.expanded": "this.isExpanded" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiExpandableRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'tr[muiExpandableRow]',
                    standalone: true
                }]
        }], propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], muiExpandableRow: [{
                type: Input
            }], expandableRowToggled: [{
                type: Output
            }], isExpanded: [{
                type: HostBinding,
                args: ['class.expanded']
            }], onRowClicked: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * Small component to display illustration and message inside of overview tables when there is no data available to
 * display. Should be used inside a table row equipped with *matNoDataRow directive and cell with full colspan.
 * Specify the message to be displayed as the component body.
 * If you want to override the default illustration, place a ng-template inside the component body which contains the
 * custom illustration you want to be displayed.
 */
class MuiNoTableDataComponent {
}
MuiNoTableDataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNoTableDataComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiNoTableDataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiNoTableDataComponent, isStandalone: true, selector: "mui-no-table-data", queries: [{ propertyName: "illustrationTemplate", first: true, predicate: TemplateRef, static: true }], ngImport: i0, template: "<div class=\"icon-container\">\r\n  <ng-container *ngTemplateOutlet=\"illustrationTemplate ?? defaultIllustration\"></ng-container>\r\n</div>\r\n<div class=\"message\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<ng-template #defaultIllustration>\r\n  <svg xmlns=\"http://www.w3.org/2000/svg\"\r\n      width=\"66.725\"\r\n      height=\"49.382\"\r\n      viewBox=\"0 0 66.725 49.382\">\r\n    <g id=\"illustration-global\"\r\n        transform=\"translate(0.5 0.5)\">\r\n      <path id=\"Path_237\"\r\n          data-name=\"Path 237\"\r\n          d=\"M49.394,69.434a20.245,20.245,0,0,1-6.351,1.03A19.827,19.827,0,1,1,62.811,49.193\"\r\n          transform=\"translate(-13.957 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_238\"\r\n          data-name=\"Path 238\"\r\n          d=\"M64.412,113.357h.045v-.03C64.442,113.338,64.427,113.348,64.412,113.357Z\"\r\n          transform=\"translate(-35.371 -69.556)\"\r\n          fill=\"#4788c7\"\r\n          opacity=\"0.3\"/>\r\n      <path id=\"Path_239\"\r\n          data-name=\"Path 239\"\r\n          d=\"M64.457,30.841v-.03h-.045Z\"\r\n          transform=\"translate(-35.371 -26.662)\"\r\n          fill=\"#4788c7\"\r\n          opacity=\"0.3\"/>\r\n      <path id=\"Path_240\"\r\n          data-name=\"Path 240\"\r\n          d=\"M31.815,50.639a23.1,23.1,0,0,1,11.18-19.825,19.825,19.825,0,0,0,0,39.651A23.1,23.1,0,0,1,31.815,50.639Z\"\r\n          transform=\"translate(-13.957 -26.664)\"\r\n          fill=\"#dff0fe\"/>\r\n      <path id=\"Path_241\"\r\n          data-name=\"Path 241\"\r\n          d=\"M52.3,70.465a23.168,23.168,0,0,1,0-39.654Z\"\r\n          transform=\"translate(-23.265 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_242\"\r\n          data-name=\"Path 242\"\r\n          d=\"M75.552,48.271a23.365,23.365,0,0,0-11.143-17.46V70.465a22.7,22.7,0,0,0,4.313-3.289\"\r\n          transform=\"translate(-35.37 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_243\"\r\n          data-name=\"Path 243\"\r\n          d=\"M63.153,113.391\"\r\n          transform=\"translate(-34.717 -69.588)\"\r\n          fill=\"none\"\r\n          stroke=\"#f0f\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_244\"\r\n          data-name=\"Path 244\"\r\n          d=\"M63.153,30.811\"\r\n          transform=\"translate(-34.717 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_245\"\r\n          data-name=\"Path 245\"\r\n          d=\"M63.332,43.694C61.823,46.448,55.941,48.5,48.914,48.5c-7,0-12.873-2.041-14.4-4.783\"\r\n          transform=\"translate(-19.827 -33.359)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_246\"\r\n          data-name=\"Path 246\"\r\n          d=\"M34.795,95.835c1.719-2.627,7.455-4.557,14.267-4.557q.977,0,1.923.052\"\r\n          transform=\"translate(-19.976 -58.094)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_186\"\r\n          data-name=\"Line 186\"\r\n          x1=\"26.062\"\r\n          y1=\"0.006\"\r\n          transform=\"translate(9.267 24.158)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_247\"\r\n          data-name=\"Path 247\"\r\n          d=\"M102.877,92.628a1.921,1.921,0,0,1-2.633.57L90.091,86.66a.258.258,0,0,1-.038-.029A12.22,12.22,0,1,1,92.1,83.421a.469.469,0,0,1,.06.035l10.147,6.534A1.912,1.912,0,0,1,102.877,92.628Z\"\r\n          transform=\"translate(-37.583 -45.119)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <circle id=\"Ellipse_44\"\r\n          data-name=\"Ellipse 44\"\r\n          cx=\"9.361\"\r\n          cy=\"9.361\"\r\n          r=\"9.361\"\r\n          transform=\"translate(32.179 26.252) rotate(-12.222)\"\r\n          fill=\"#dff0fe\"/>\r\n      <circle id=\"Ellipse_45\"\r\n          data-name=\"Ellipse 45\"\r\n          cx=\"9.361\"\r\n          cy=\"9.361\"\r\n          r=\"9.361\"\r\n          transform=\"translate(32.179 26.252) rotate(-12.222)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_187\"\r\n          data-name=\"Line 187\"\r\n          y2=\"5.285\"\r\n          transform=\"translate(2.642 32.7)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_188\"\r\n          data-name=\"Line 188\"\r\n          x1=\"5.285\"\r\n          transform=\"translate(0 35.343)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_189\"\r\n          data-name=\"Line 189\"\r\n          y2=\"3.164\"\r\n          transform=\"translate(13.261 43.859)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_190\"\r\n          data-name=\"Line 190\"\r\n          x1=\"3.164\"\r\n          transform=\"translate(11.679 45.441)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <g id=\"Group_106\"\r\n          data-name=\"Group 106\"\r\n          transform=\"translate(6.766)\">\r\n        <line id=\"Line_191\"\r\n            data-name=\"Line 191\"\r\n            y2=\"5.285\"\r\n            transform=\"translate(2.642)\"\r\n            fill=\"none\"\r\n            stroke=\"#4788c7\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"1\"/>\r\n        <line id=\"Line_192\"\r\n            data-name=\"Line 192\"\r\n            x1=\"5.285\"\r\n            transform=\"translate(0 2.642)\"\r\n            fill=\"none\"\r\n            stroke=\"#4788c7\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"1\"/>\r\n      </g>\r\n    </g>\r\n  </svg>\r\n</ng-template>\r\n", styles: [":host{width:100%;height:350px;display:flex;flex-direction:column;justify-content:center;align-items:center}.icon-container{min-width:64px;min-height:64px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNoTableDataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-no-table-data', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"icon-container\">\r\n  <ng-container *ngTemplateOutlet=\"illustrationTemplate ?? defaultIllustration\"></ng-container>\r\n</div>\r\n<div class=\"message\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<ng-template #defaultIllustration>\r\n  <svg xmlns=\"http://www.w3.org/2000/svg\"\r\n      width=\"66.725\"\r\n      height=\"49.382\"\r\n      viewBox=\"0 0 66.725 49.382\">\r\n    <g id=\"illustration-global\"\r\n        transform=\"translate(0.5 0.5)\">\r\n      <path id=\"Path_237\"\r\n          data-name=\"Path 237\"\r\n          d=\"M49.394,69.434a20.245,20.245,0,0,1-6.351,1.03A19.827,19.827,0,1,1,62.811,49.193\"\r\n          transform=\"translate(-13.957 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_238\"\r\n          data-name=\"Path 238\"\r\n          d=\"M64.412,113.357h.045v-.03C64.442,113.338,64.427,113.348,64.412,113.357Z\"\r\n          transform=\"translate(-35.371 -69.556)\"\r\n          fill=\"#4788c7\"\r\n          opacity=\"0.3\"/>\r\n      <path id=\"Path_239\"\r\n          data-name=\"Path 239\"\r\n          d=\"M64.457,30.841v-.03h-.045Z\"\r\n          transform=\"translate(-35.371 -26.662)\"\r\n          fill=\"#4788c7\"\r\n          opacity=\"0.3\"/>\r\n      <path id=\"Path_240\"\r\n          data-name=\"Path 240\"\r\n          d=\"M31.815,50.639a23.1,23.1,0,0,1,11.18-19.825,19.825,19.825,0,0,0,0,39.651A23.1,23.1,0,0,1,31.815,50.639Z\"\r\n          transform=\"translate(-13.957 -26.664)\"\r\n          fill=\"#dff0fe\"/>\r\n      <path id=\"Path_241\"\r\n          data-name=\"Path 241\"\r\n          d=\"M52.3,70.465a23.168,23.168,0,0,1,0-39.654Z\"\r\n          transform=\"translate(-23.265 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_242\"\r\n          data-name=\"Path 242\"\r\n          d=\"M75.552,48.271a23.365,23.365,0,0,0-11.143-17.46V70.465a22.7,22.7,0,0,0,4.313-3.289\"\r\n          transform=\"translate(-35.37 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_243\"\r\n          data-name=\"Path 243\"\r\n          d=\"M63.153,113.391\"\r\n          transform=\"translate(-34.717 -69.588)\"\r\n          fill=\"none\"\r\n          stroke=\"#f0f\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_244\"\r\n          data-name=\"Path 244\"\r\n          d=\"M63.153,30.811\"\r\n          transform=\"translate(-34.717 -26.662)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_245\"\r\n          data-name=\"Path 245\"\r\n          d=\"M63.332,43.694C61.823,46.448,55.941,48.5,48.914,48.5c-7,0-12.873-2.041-14.4-4.783\"\r\n          transform=\"translate(-19.827 -33.359)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_246\"\r\n          data-name=\"Path 246\"\r\n          d=\"M34.795,95.835c1.719-2.627,7.455-4.557,14.267-4.557q.977,0,1.923.052\"\r\n          transform=\"translate(-19.976 -58.094)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_186\"\r\n          data-name=\"Line 186\"\r\n          x1=\"26.062\"\r\n          y1=\"0.006\"\r\n          transform=\"translate(9.267 24.158)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <path id=\"Path_247\"\r\n          data-name=\"Path 247\"\r\n          d=\"M102.877,92.628a1.921,1.921,0,0,1-2.633.57L90.091,86.66a.258.258,0,0,1-.038-.029A12.22,12.22,0,1,1,92.1,83.421a.469.469,0,0,1,.06.035l10.147,6.534A1.912,1.912,0,0,1,102.877,92.628Z\"\r\n          transform=\"translate(-37.583 -45.119)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <circle id=\"Ellipse_44\"\r\n          data-name=\"Ellipse 44\"\r\n          cx=\"9.361\"\r\n          cy=\"9.361\"\r\n          r=\"9.361\"\r\n          transform=\"translate(32.179 26.252) rotate(-12.222)\"\r\n          fill=\"#dff0fe\"/>\r\n      <circle id=\"Ellipse_45\"\r\n          data-name=\"Ellipse 45\"\r\n          cx=\"9.361\"\r\n          cy=\"9.361\"\r\n          r=\"9.361\"\r\n          transform=\"translate(32.179 26.252) rotate(-12.222)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_187\"\r\n          data-name=\"Line 187\"\r\n          y2=\"5.285\"\r\n          transform=\"translate(2.642 32.7)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_188\"\r\n          data-name=\"Line 188\"\r\n          x1=\"5.285\"\r\n          transform=\"translate(0 35.343)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_189\"\r\n          data-name=\"Line 189\"\r\n          y2=\"3.164\"\r\n          transform=\"translate(13.261 43.859)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <line id=\"Line_190\"\r\n          data-name=\"Line 190\"\r\n          x1=\"3.164\"\r\n          transform=\"translate(11.679 45.441)\"\r\n          fill=\"none\"\r\n          stroke=\"#4788c7\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n          stroke-width=\"1\"/>\r\n      <g id=\"Group_106\"\r\n          data-name=\"Group 106\"\r\n          transform=\"translate(6.766)\">\r\n        <line id=\"Line_191\"\r\n            data-name=\"Line 191\"\r\n            y2=\"5.285\"\r\n            transform=\"translate(2.642)\"\r\n            fill=\"none\"\r\n            stroke=\"#4788c7\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"1\"/>\r\n        <line id=\"Line_192\"\r\n            data-name=\"Line 192\"\r\n            x1=\"5.285\"\r\n            transform=\"translate(0 2.642)\"\r\n            fill=\"none\"\r\n            stroke=\"#4788c7\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"1\"/>\r\n      </g>\r\n    </g>\r\n  </svg>\r\n</ng-template>\r\n", styles: [":host{width:100%;height:350px;display:flex;flex-direction:column;justify-content:center;align-items:center}.icon-container{min-width:64px;min-height:64px}\n"] }]
        }], propDecorators: { illustrationTemplate: [{
                type: ContentChild,
                args: [TemplateRef, { static: true, descendants: false }]
            }] } });

/**
 * Fill an array with a range of numbers in ascending order.
 * @param size Size of the array to be generated
 * @param startAt Offset where the numbers should start
 */
function range(size, startAt = 0) {
    return [
        ...Array(size)
            .keys()
    ].map(i => i + startAt);
}
// create base class with required "HasInitialized" handling. use prepared mixin from material
const PaginatorMixinBase = mixinInitialized(class {
});
/**
 * Paginator component to use with MatTable and MatTableDataSource.
 */
class MuiPaginatorComponent extends PaginatorMixinBase {
    constructor(changeDetectorRef) {
        super();
        this.changeDetectorRef = changeDetectorRef;
        this.numberOfPageLinks = 5;
        this.pageRanges = [];
        this.currentPageRangeIdx = 0;
        /** Event emitted when the paginator changes the page size or page index. */
        this.page = new EventEmitter();
        this._length = 0;
        this._pageSize = 10;
        this._pageIndex = 0;
        this._disabled = false;
    }
    /** Total length of the paginated data set. Usually set by MatTableDataSource. */
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = coerceNumberProperty(value);
        this.updatePageRanges();
        this.changeDetectorRef.markForCheck();
    }
    /** Page size to use, defaults to 10 */
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = Math.max(coerceNumberProperty(value), 0);
        this.updatePageRanges();
        this.updateDisplayedPageRangeIdx();
        this.changeDetectorRef.markForCheck();
    }
    /** Current page index, zero based */
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(value) {
        this._pageIndex = Math.max(coerceNumberProperty(value), 0);
        this.updateDisplayedPageRangeIdx();
        this.changeDetectorRef.markForCheck();
    }
    /** If a MatTableDataSource is provided via this input, the paginator will register itself to the data source. */
    set tableDataSource(ds) {
        ds.paginator = this;
    }
    /** Disable all paginator controls */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnInit() {
        this._markInitialized();
    }
    /** Navigate to a specific page by index (zero based) */
    goToPage(pageIndex) {
        if (!this.disabled && pageIndex > -1 && pageIndex < this.getNumberOfPages()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = pageIndex;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the next page */
    nextPage() {
        if (this._hasNextPage()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = this.pageIndex + 1;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the previous page */
    previousPage() {
        if (this._hasPreviousPage()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = this.pageIndex - 1;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the first page */
    firstPage() {
        const previousPageIdx = this.pageIndex;
        this.pageIndex = 0;
        this.emitPageEvent(previousPageIdx);
    }
    /** Navigate to the last page */
    lastPage() {
        const previousPageIdx = this.pageIndex;
        this.pageIndex = this.getNumberOfPages() - 1;
        this.emitPageEvent(previousPageIdx);
    }
    /** Calculate the number of pages */
    getNumberOfPages() {
        if (!this.pageSize) {
            return 0;
        }
        return Math.ceil(this.length / this.pageSize);
    }
    _hasNextPage() {
        const maxPageIndex = this.getNumberOfPages() - 1;
        return this.pageIndex < maxPageIndex && this.pageSize != 0;
    }
    _hasPreviousPage() {
        return this.pageIndex >= 1 && this.pageSize != 0;
    }
    /** Change page size and update current page to include previous page's first item */
    _changePageSize(pageSize) {
        const startIndex = this.pageIndex * this.pageSize;
        const previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this.emitPageEvent(previousPageIndex);
    }
    updatePageRanges() {
        const pages = this.getNumberOfPages();
        this.pageRanges = [];
        const size = Math.ceil(pages / this.numberOfPageLinks);
        const rest = pages % this.numberOfPageLinks;
        for (let i = 0; i < size; i++) {
            const currentRange = (i === size - 1 && rest > 0) ? rest : this.numberOfPageLinks;
            this.pageRanges.push(range(currentRange, i * this.numberOfPageLinks));
        }
    }
    emitPageEvent(previousPageIndex) {
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length,
            previousPageIndex
        });
    }
    updateDisplayedPageRangeIdx() {
        this.currentPageRangeIdx = Math.floor(this.pageIndex / this.numberOfPageLinks);
    }
}
MuiPaginatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPaginatorComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiPaginatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiPaginatorComponent, isStandalone: true, selector: "mui-paginator", inputs: { pageSizeOptions: "pageSizeOptions", length: "length", pageSize: "pageSize", pageIndex: "pageIndex", tableDataSource: "tableDataSource", disabled: "disabled" }, outputs: { page: "page" }, usesInheritance: true, ngImport: i0, template: "<div class=\"mui-paginator-container\">\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"firstPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>arrow-left-double</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"previousPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>chevron_left</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-page-links\"\r\n      [class.disabled]=\"disabled\">\r\n    <span *ngIf=\"currentPageRangeIdx > 0\"\r\n        class=\"mui-page-link dots\">...</span>\r\n    <span *ngFor=\"let i of pageRanges[currentPageRangeIdx]\"\r\n        class=\"mui-page-link\"\r\n        [class.current_page]=\"pageIndex === i\"\r\n        (click)=\"goToPage(i)\"\r\n    >{{ i + 1 }}</span>\r\n    <span *ngIf=\"currentPageRangeIdx < pageRanges.length - 1\"\r\n        class=\"mui-page-link dots\">...</span>\r\n  </div>\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"nextPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>chevron_right</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"lastPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>arrow-right-double</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"pageSizeOptions\"\r\n      class=\"mui-page-options\">\r\n    <mui-form-field fieldWidth=\"75px\">\r\n      <mui-label i18n=\"@@paginator_items\">Items per page</mui-label>\r\n      <mat-select [value]=\"pageSize\"\r\n          (selectionChange)=\"_changePageSize($event.value)\"\r\n          hideSingleSelectionIndicator\r\n          [disabled]=\"disabled\"\r\n      >\r\n        <mat-option *ngFor=\"let item of pageSizeOptions\"\r\n            [value]=\"item\"\r\n        >{{ item }}</mat-option>\r\n      </mat-select>\r\n    </mui-form-field>\r\n  </div>\r\n</div>\r\n", styles: [".mui-paginator-container{display:flex;align-items:center;padding:8px 24px}.mui-page-links{margin:0 20px}.mui-page-links .mui-page-link{padding-left:12px;padding-right:12px;text-decoration:underline;cursor:pointer}.mui-page-links .mui-page-link.current_page,.mui-page-links .dots{text-decoration:none;cursor:default}.mui-page-links.disabled .mui-page-link{cursor:default}.mui-paginator-button+.mui-paginator-button{margin-left:16px}.mui-page-options{margin-left:24px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i3$2.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i3.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }, { kind: "ngmodule", type: MuiFormFieldModule }, { kind: "component", type: MuiFormFieldComponent, selector: "mui-form-field", inputs: ["labelPosition", "labelSize", "fieldWidth", "showOptionalMarker"], exportAs: ["muiFormField"] }, { kind: "directive", type: MuiLabelDirective, selector: "mui-label" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-paginator', standalone: true, imports: [CommonModule, MatButtonModule, MatSelectModule, MuiIconModule, MuiFormFieldModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-paginator-container\">\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"firstPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>arrow-left-double</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"previousPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>chevron_left</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-page-links\"\r\n      [class.disabled]=\"disabled\">\r\n    <span *ngIf=\"currentPageRangeIdx > 0\"\r\n        class=\"mui-page-link dots\">...</span>\r\n    <span *ngFor=\"let i of pageRanges[currentPageRangeIdx]\"\r\n        class=\"mui-page-link\"\r\n        [class.current_page]=\"pageIndex === i\"\r\n        (click)=\"goToPage(i)\"\r\n    >{{ i + 1 }}</span>\r\n    <span *ngIf=\"currentPageRangeIdx < pageRanges.length - 1\"\r\n        class=\"mui-page-link dots\">...</span>\r\n  </div>\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"nextPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>chevron_right</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"lastPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>arrow-right-double</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"pageSizeOptions\"\r\n      class=\"mui-page-options\">\r\n    <mui-form-field fieldWidth=\"75px\">\r\n      <mui-label i18n=\"@@paginator_items\">Items per page</mui-label>\r\n      <mat-select [value]=\"pageSize\"\r\n          (selectionChange)=\"_changePageSize($event.value)\"\r\n          hideSingleSelectionIndicator\r\n          [disabled]=\"disabled\"\r\n      >\r\n        <mat-option *ngFor=\"let item of pageSizeOptions\"\r\n            [value]=\"item\"\r\n        >{{ item }}</mat-option>\r\n      </mat-select>\r\n    </mui-form-field>\r\n  </div>\r\n</div>\r\n", styles: [".mui-paginator-container{display:flex;align-items:center;padding:8px 24px}.mui-page-links{margin:0 20px}.mui-page-links .mui-page-link{padding-left:12px;padding-right:12px;text-decoration:underline;cursor:pointer}.mui-page-links .mui-page-link.current_page,.mui-page-links .dots{text-decoration:none;cursor:default}.mui-page-links.disabled .mui-page-link{cursor:default}.mui-paginator-button+.mui-paginator-button{margin-left:16px}.mui-page-options{margin-left:24px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { pageSizeOptions: [{
                type: Input
            }], page: [{
                type: Output
            }], length: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], tableDataSource: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/**
 * Loading indicator / ghost component. Displays a "ghost-bar" with animated gradient background.
 * Takes full width of the surrounding container.
 */
class MuiGhostBarComponent {
}
MuiGhostBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiGhostBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiGhostBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiGhostBarComponent, isStandalone: true, selector: "mui-ghost-bar", ngImport: i0, template: "<div class=\"mui-ghost-bar\"></div>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:-200%}}.mui-ghost-bar{width:100%;height:24px;background-image:linear-gradient(94deg,#ccd3df,#8696b2 50%,#ccd3df 100%);background-size:200%;animation:ghost-lines 1.5s infinite linear}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiGhostBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-ghost-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-ghost-bar\"></div>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:-200%}}.mui-ghost-bar{width:100%;height:24px;background-image:linear-gradient(94deg,#ccd3df,#8696b2 50%,#ccd3df 100%);background-size:200%;animation:ghost-lines 1.5s infinite linear}\n"] }]
        }] });

/**
 * Helper function to generate a "Ghost data set" containing empty objects of the given type, which can be used
 * to display the ghost-bar component rows while the real table data is loading.
 * @param length Number of elements to create. Defaults to 10.
 */
function createGhostDataSet(length = 10) {
    return [...Array(length)].map(() => {
        return {};
    });
}

/**
 * Simple component which renders the amount of elements displayed, based on given input data.
 */
class MuiTableElementsCountComponent {
    constructor() {
        this.hostClassName = 'mui-table-elements-count';
        this.elementName = 'elements';
    }
}
MuiTableElementsCountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTableElementsCountComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiTableElementsCountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiTableElementsCountComponent, isStandalone: true, selector: "mui-table-elements-count", inputs: { totalAmount: "totalAmount", displayedAmount: "displayedAmount", elementName: "elementName" }, host: { properties: { "class": "this.hostClassName" } }, ngImport: i0, template: "<ng-container *ngIf=\"totalAmount\">\r\n  <div *ngIf=\"totalAmount === displayedAmount; else filteredRange\">\r\n    {{totalAmount}} {{elementName}} available\r\n  </div>\r\n  <ng-template #filteredRange>\r\n    <div>\r\n      {{displayedAmount}} out of {{totalAmount}} {{elementName}} shown\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTableElementsCountComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-table-elements-count', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"totalAmount\">\r\n  <div *ngIf=\"totalAmount === displayedAmount; else filteredRange\">\r\n    {{totalAmount}} {{elementName}} available\r\n  </div>\r\n  <ng-template #filteredRange>\r\n    <div>\r\n      {{displayedAmount}} out of {{totalAmount}} {{elementName}} shown\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n" }]
        }], propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], totalAmount: [{
                type: Input
            }], displayedAmount: [{
                type: Input
            }], elementName: [{
                type: Input
            }] } });

/**
 * Convenience module, containing all standalone components from the overview table package.
 */
class MuiOverviewTableModule {
}
MuiOverviewTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiOverviewTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewTableModule, imports: [MuiSortHeaderComponent,
        MuiRowDetailsComponent,
        MuiExpandableRowDirective,
        MuiNoTableDataComponent,
        MuiPaginatorComponent,
        MuiGhostBarComponent,
        MuiTableElementsCountComponent], exports: [MuiSortHeaderComponent,
        MuiRowDetailsComponent,
        MuiExpandableRowDirective,
        MuiNoTableDataComponent,
        MuiPaginatorComponent,
        MuiGhostBarComponent,
        MuiTableElementsCountComponent] });
MuiOverviewTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewTableModule, imports: [MuiSortHeaderComponent,
        MuiRowDetailsComponent,
        MuiNoTableDataComponent,
        MuiPaginatorComponent,
        MuiGhostBarComponent,
        MuiTableElementsCountComponent] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        MuiSortHeaderComponent,
                        MuiRowDetailsComponent,
                        MuiExpandableRowDirective,
                        MuiNoTableDataComponent,
                        MuiPaginatorComponent,
                        MuiGhostBarComponent,
                        MuiTableElementsCountComponent
                    ],
                    exports: [
                        MuiSortHeaderComponent,
                        MuiRowDetailsComponent,
                        MuiExpandableRowDirective,
                        MuiNoTableDataComponent,
                        MuiPaginatorComponent,
                        MuiGhostBarComponent,
                        MuiTableElementsCountComponent
                    ]
                }]
        }] });
/** All components belonging to the overview table package. Can alternatively be used instead of the module. */
const MUI_TABLE_COMPONENTS = [
    MuiSortHeaderComponent,
    MuiRowDetailsComponent,
    MuiExpandableRowDirective,
    MuiNoTableDataComponent,
    MuiPaginatorComponent,
    MuiGhostBarComponent,
    MuiTableElementsCountComponent
];

/**
 * Component for header section above an overview table. Supports injecting content for the following 4 sections
 * defined by attribute selectors:
 * * [pageHeaderTitle]: the main title
 * * [pageHeaderSubtitle]: subtitle text - should usually not be longer than 2 lines
 * * [pageHeaderActions]: Main action button(s) which are displayed on the right side
 * * [pageHeaderActionsInfo]: Additional info below the action buttons
 */
class MuiOverviewPageHeaderComponent {
}
MuiOverviewPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiOverviewPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiOverviewPageHeaderComponent, isStandalone: true, selector: "mui-overview-page-header", ngImport: i0, template: "<div class=\"mui-opage-header-col1\">\r\n  <h2 class=\"mat-h2 mui-opage-title\">\r\n    <ng-content select=\"span[pageHeaderTitle]\"></ng-content>\r\n    <ng-content select=\"mui-icon\"></ng-content>\r\n  </h2>\r\n  <div class=\"mui-opage-subtitle\">\r\n    <ng-content select=\"span[pageHeaderSubtitle]\"></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"mui-opage-header-col2\">\r\n  <div class=\"mui-opage-actions\">\r\n    <ng-content select=\"div[pageHeaderActions]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-opage-actions-info\">\r\n    <ng-content select=\"span[pageHeaderActionsInfo]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:flex;padding-bottom:24px;justify-content:space-between;align-items:flex-start;column-gap:24px}.mui-opage-header-col1{max-width:760px}.mui-opage-header-col2{text-align:right}.mui-opage-title{margin:0 0 8px;height:27px;color:#364e7b;display:flex;align-items:center;column-gap:24px}.mui-opage-subtitle,.mui-opage-actions-info{color:#273b66}.mui-opage-actions{margin-top:35px}.mui-opage-actions-info{margin-top:8px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-overview-page-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-opage-header-col1\">\r\n  <h2 class=\"mat-h2 mui-opage-title\">\r\n    <ng-content select=\"span[pageHeaderTitle]\"></ng-content>\r\n    <ng-content select=\"mui-icon\"></ng-content>\r\n  </h2>\r\n  <div class=\"mui-opage-subtitle\">\r\n    <ng-content select=\"span[pageHeaderSubtitle]\"></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"mui-opage-header-col2\">\r\n  <div class=\"mui-opage-actions\">\r\n    <ng-content select=\"div[pageHeaderActions]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-opage-actions-info\">\r\n    <ng-content select=\"span[pageHeaderActionsInfo]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:flex;padding-bottom:24px;justify-content:space-between;align-items:flex-start;column-gap:24px}.mui-opage-header-col1{max-width:760px}.mui-opage-header-col2{text-align:right}.mui-opage-title{margin:0 0 8px;height:27px;color:#364e7b;display:flex;align-items:center;column-gap:24px}.mui-opage-subtitle,.mui-opage-actions-info{color:#273b66}.mui-opage-actions{margin-top:35px}.mui-opage-actions-info{margin-top:8px}\n"] }]
        }] });

/**
 * Create a bar for action buttons or other content, which should be placed at the bottom of an overview page.
 * Content will be distributed across the bar according to the alignment property, either centered or spread.
 * If you want to divide between left and right side, just use two divs to separate each section.
 * Content for the component will be either the body content placed in the component, or a TemplateRef provided via
 * 'content' input binding.
 */
class MuiBottomBarComponent {
    constructor() {
        this._content = null;
        /**
         * Control how the content is aligned within the action bar.
         * spread (default): aligns items spread equally across the bar
         * centered: uses center alignment
         */
        this.alignment = 'spread';
    }
    get hostClassName() {
        return this.alignment === 'spread' ? 'mui-page-bottom-actions-spread' : 'mui-page-bottom-actions-centered';
    }
    /**
     * Provide a TemplateRef for the content to be placed inside the component.
     * If no template is provided via this input, the body content of the component will be used.
     */
    set content(template) {
        this._content = template;
    }
    get content() {
        var _a;
        return (_a = this._content) !== null && _a !== void 0 ? _a : this._bodyContent;
    }
}
MuiBottomBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiBottomBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiBottomBarComponent, isStandalone: true, selector: "mui-bottom-bar", inputs: { alignment: "alignment", content: "content" }, host: { properties: { "class": "this.hostClassName" } }, viewQueries: [{ propertyName: "_bodyContent", first: true, predicate: ["bodyContent"], descendants: true, static: true }], ngImport: i0, template: "<ng-container *ngTemplateOutlet=\"content\"></ng-container>\r\n<ng-template #bodyContent>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n", styles: ["mui-bottom-bar{display:flex;align-items:center;width:100%;padding:12px 48px;column-gap:24px;box-sizing:border-box;z-index:2;min-height:64px;background-color:#fff;box-shadow:0 0 4px #ccd3df66}mui-bottom-bar.mui-page-bottom-actions-spread{justify-content:space-between}mui-bottom-bar.mui-page-bottom-actions-centered{justify-content:center}mui-bottom-bar .mat-mdc-button-base+.mat-mdc-button-base{margin-left:24px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-bottom-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngTemplateOutlet=\"content\"></ng-container>\r\n<ng-template #bodyContent>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n", styles: ["mui-bottom-bar{display:flex;align-items:center;width:100%;padding:12px 48px;column-gap:24px;box-sizing:border-box;z-index:2;min-height:64px;background-color:#fff;box-shadow:0 0 4px #ccd3df66}mui-bottom-bar.mui-page-bottom-actions-spread{justify-content:space-between}mui-bottom-bar.mui-page-bottom-actions-centered{justify-content:center}mui-bottom-bar .mat-mdc-button-base+.mat-mdc-button-base{margin-left:24px}\n"] }]
        }], propDecorators: { _bodyContent: [{
                type: ViewChild,
                args: ['bodyContent', { static: true }]
            }], alignment: [{
                type: Input
            }], hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], content: [{
                type: Input
            }] } });

/**
 * Directive for marking a <ng-template> as content for MuiBottomBar.
 * This is needed for cases where you want to project the content from a child component to a parent.
 */
class MuiBottomBarContentDirective {
    constructor(template) {
        this.template = template;
    }
}
MuiBottomBarContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MuiBottomBarContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiBottomBarContentDirective, isStandalone: true, selector: "[muiBottomBarContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiBottomBarContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiBottomBarContent]',
                    standalone: true
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

/**
 * Small service that can be used to provide the current template to be rendered by BottomBarComponent.
 */
class BottomBarContentService {
    constructor() {
        this._bottomBarTemplate = null;
    }
    get bottomBarTemplate() {
        return this._bottomBarTemplate;
    }
    set bottomBarTemplate(template) {
        this._bottomBarTemplate = template;
    }
}
BottomBarContentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BottomBarContentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService, decorators: [{
            type: Injectable
        }] });

/**
 * Convenience module, containing all standalone components from the overview page package.
 */
class MuiOverviewPageModule {
}
MuiOverviewPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiOverviewPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, imports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent,
        MuiBottomBarContentDirective], exports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent,
        MuiBottomBarContentDirective] });
MuiOverviewPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, imports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        MuiOverviewPageHeaderComponent,
                        MuiBottomBarComponent,
                        MuiBottomBarContentDirective
                    ],
                    exports: [
                        MuiOverviewPageHeaderComponent,
                        MuiBottomBarComponent,
                        MuiBottomBarContentDirective
                    ]
                }]
        }] });
/** All components belonging to the overview package. Can alternatively be used instead of the module. */
const MUI_OVERVIEW_COMPONENTS = [
    MuiOverviewPageHeaderComponent,
    MuiBottomBarComponent,
    MuiBottomBarContentDirective
];

const FADEIN_TRIGGER = trigger('fadein', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1200ms ease-in', style({ opacity: 1 }))
    ])
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This component provides a form field with a date range picker.
 * Primary use for the component is in the table filter bar. The label for the form field is taken from the
 * body content of the component.
 * Data input / output is handled in ISO8601 compliant date interval string. The component integrates with the
 * Angular forms modules, so can be regularly used with the formControl / formControlName directives.
 */
class MuiDateRangePickerComponent {
    constructor() {
        /** Specify the field width. Default and minimum is 240px */
        this.fieldWidth = '240px';
        this.isPickerDisabled = false;
        this.destroy$ = new Subject();
        this.fb = inject(FormBuilder);
        this.datePickerForm = this.fb.group({
            start: new FormControl(null),
            end: new FormControl(null)
        });
        this.ngControl = inject(NgControl, { optional: true, self: true });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onTouched = () => {
        };
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    registerOnChange(fn) {
        this.datePickerForm.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(500), filter(val => {
            return (val.start !== null && val.end !== null) || (val.start === null && val.end === null);
        }), map(val => {
            if (val.start && val.end) {
                const dateRange = Interval.fromDateTimes(val.start, val.end);
                return dateRange.toISO();
            }
            return null;
        }))
            .subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.datePickerForm.disable() : this.datePickerForm.enable();
        this.isPickerDisabled = isDisabled;
    }
    writeValue(obj) {
        if (typeof obj === 'string' && obj.length > 0) {
            const range = Interval.fromISO(obj);
            this.datePickerForm.setValue({
                start: range.start,
                end: range.end
            }, {
                emitEvent: false,
                onlySelf: true
            });
        }
        else {
            this.datePickerForm.reset({
                start: null,
                end: null
            }, {
                emitEvent: false,
                onlySelf: true
            });
        }
    }
    pickerClosed() {
        const startDate = this.datePickerForm.controls.start;
        const endDate = this.datePickerForm.controls.end;
        if (!endDate.value) {
            endDate.setValue(startDate.value);
        }
    }
}
MuiDateRangePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDateRangePickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiDateRangePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiDateRangePickerComponent, isStandalone: true, selector: "mui-date-range-picker", inputs: { fieldWidth: "fieldWidth", minDate: "minDate", maxDate: "maxDate" }, ngImport: i0, template: "<mui-form-field [fieldWidth]=\"fieldWidth\"\r\n    labelPosition=\"hint\">\r\n  <mui-label>\r\n    <ng-content></ng-content>\r\n  </mui-label>\r\n  <mat-date-range-input [rangePicker]=\"picker\"\r\n      [formGroup]=\"datePickerForm\"\r\n      [min]=\"minDate\"\r\n      [max]=\"maxDate\">\r\n    <input matStartDate\r\n        formControlName=\"start\">\r\n    <input matEndDate\r\n        formControlName=\"end\">\r\n  </mat-date-range-input>\r\n  <mat-date-range-picker #picker\r\n      (closed)=\"pickerClosed()\"\r\n      [disabled]=\"isPickerDisabled\"></mat-date-range-picker>\r\n  <mat-datepicker-toggle [for]=\"picker\"\r\n      muiSuffix>\r\n    <mui-icon matDatepickerToggleIcon>calendar</mui-icon>\r\n  </mat-datepicker-toggle>\r\n</mui-form-field>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MuiFormFieldModule }, { kind: "component", type: MuiFormFieldComponent, selector: "mui-form-field", inputs: ["labelPosition", "labelSize", "fieldWidth", "showOptionalMarker"], exportAs: ["muiFormField"] }, { kind: "directive", type: MuiSuffixDirective, selector: "[muiSuffix]" }, { kind: "directive", type: MuiLabelDirective, selector: "mui-label" }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i4$1.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i4$1.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "component", type: i4$1.MatDateRangeInput, selector: "mat-date-range-input", inputs: ["rangePicker", "required", "dateFilter", "min", "max", "disabled", "separator", "comparisonStart", "comparisonEnd"], exportAs: ["matDateRangeInput"] }, { kind: "directive", type: i4$1.MatStartDate, selector: "input[matStartDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { kind: "directive", type: i4$1.MatEndDate, selector: "input[matEndDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { kind: "component", type: i4$1.MatDateRangePicker, selector: "mat-date-range-picker", exportAs: ["matDateRangePicker"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDateRangePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-date-range-picker', standalone: true, imports: [CommonModule, MuiFormFieldModule, MatDatepickerModule, ReactiveFormsModule, MuiIconModule], template: "<mui-form-field [fieldWidth]=\"fieldWidth\"\r\n    labelPosition=\"hint\">\r\n  <mui-label>\r\n    <ng-content></ng-content>\r\n  </mui-label>\r\n  <mat-date-range-input [rangePicker]=\"picker\"\r\n      [formGroup]=\"datePickerForm\"\r\n      [min]=\"minDate\"\r\n      [max]=\"maxDate\">\r\n    <input matStartDate\r\n        formControlName=\"start\">\r\n    <input matEndDate\r\n        formControlName=\"end\">\r\n  </mat-date-range-input>\r\n  <mat-date-range-picker #picker\r\n      (closed)=\"pickerClosed()\"\r\n      [disabled]=\"isPickerDisabled\"></mat-date-range-picker>\r\n  <mat-datepicker-toggle [for]=\"picker\"\r\n      muiSuffix>\r\n    <mui-icon matDatepickerToggleIcon>calendar</mui-icon>\r\n  </mat-datepicker-toggle>\r\n</mui-form-field>\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { fieldWidth: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }] } });

/**
 * Component for creating in-page info messages of a certain type/severity.
 */
class InfoMessageComponent {
    constructor() {
        /** Type of the message. Defines the color theme. Default: info */
        this.type = 'info';
        /** Output event which fires when the close button is clicked (for dismissible messages) */
        this.closeMessage = new EventEmitter();
        this._isDismissible = false;
        this._withIcon = false;
    }
    /** If the message should be dismissible. Shows a close icon in the top right corner */
    get dismissible() {
        return this._isDismissible;
    }
    set dismissible(value) {
        this._isDismissible = coerceBooleanProperty(value);
    }
    /** Turn the message into an Icon message, which shows an icon corresponding to the message type
     * on the left side of the content. */
    get withIcon() {
        return this._withIcon;
    }
    set withIcon(value) {
        this._withIcon = coerceBooleanProperty(value);
    }
    onCloseMessage() {
        this.closeMessage.emit();
    }
}
InfoMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InfoMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InfoMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: InfoMessageComponent, isStandalone: true, selector: "mui-info-message", inputs: { type: "type", dismissible: "dismissible", withIcon: "withIcon" }, outputs: { closeMessage: "closeMessage" }, host: { properties: { "attr.type": "this.type" } }, ngImport: i0, template: "<div class=\"mui-info-message-container\">\r\n  <div *ngIf=\"withIcon\"\r\n      class=\"mui-info-message-icon\">\r\n    <mui-icon [color]=\"type\">info</mui-icon>\r\n  </div>\r\n  <div class=\"mui-info-message-content\">\r\n    <div class=\"mui-info-message-header\">\r\n      <h3 class=\"mat-subtitle-1 mui-info-message-title\"><ng-content select=\"[muiInfoMessageTitle]\"></ng-content></h3>\r\n      <mui-icon\r\n          *ngIf=\"dismissible\"\r\n          class=\"mui-dismiss-message-btn\"\r\n          (click)=\"onCloseMessage()\">\r\n        close\r\n      </mui-icon>\r\n    </div>\r\n\r\n    <div class=\"mui-info-message-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;padding:24px;max-width:800px;position:relative}.mui-info-message-container{display:flex}.mui-info-message-content{flex-grow:1}.mui-info-message-icon{width:40px;height:40px;margin-right:16px;border-radius:50%;padding:8px;box-sizing:border-box}.mui-info-message-header{display:flex;align-items:center;margin-bottom:8px}.mui-info-message-title{margin:0}.mui-dismiss-message-btn{margin-left:auto;flex-grow:0;cursor:pointer;-webkit-user-select:none;user-select:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i2$1.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InfoMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-info-message', standalone: true, imports: [CommonModule, MatButtonModule, MatDialogModule, MuiIconModule], template: "<div class=\"mui-info-message-container\">\r\n  <div *ngIf=\"withIcon\"\r\n      class=\"mui-info-message-icon\">\r\n    <mui-icon [color]=\"type\">info</mui-icon>\r\n  </div>\r\n  <div class=\"mui-info-message-content\">\r\n    <div class=\"mui-info-message-header\">\r\n      <h3 class=\"mat-subtitle-1 mui-info-message-title\"><ng-content select=\"[muiInfoMessageTitle]\"></ng-content></h3>\r\n      <mui-icon\r\n          *ngIf=\"dismissible\"\r\n          class=\"mui-dismiss-message-btn\"\r\n          (click)=\"onCloseMessage()\">\r\n        close\r\n      </mui-icon>\r\n    </div>\r\n\r\n    <div class=\"mui-info-message-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;padding:24px;max-width:800px;position:relative}.mui-info-message-container{display:flex}.mui-info-message-content{flex-grow:1}.mui-info-message-icon{width:40px;height:40px;margin-right:16px;border-radius:50%;padding:8px;box-sizing:border-box}.mui-info-message-header{display:flex;align-items:center;margin-bottom:8px}.mui-info-message-title{margin:0}.mui-dismiss-message-btn{margin-left:auto;flex-grow:0;cursor:pointer;-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { type: [{
                type: HostBinding,
                args: ['attr.type']
            }, {
                type: Input
            }], closeMessage: [{
                type: Output
            }], dismissible: [{
                type: Input
            }], withIcon: [{
                type: Input
            }] } });

/*
 * Public API Surface of unify
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BottomBarContentService, FADEIN_TRIGGER, InfoMessageComponent, MUI_OVERVIEW_COMPONENTS, MUI_TABLE_COMPONENTS, MuiBottomBarComponent, MuiBottomBarContentDirective, MuiDateRangePickerComponent, MuiExpandableRowDirective, MuiFormFieldComponent, MuiFormFieldInfoComponent, MuiFormFieldModule, MuiGhostBarComponent, MuiInput, MuiLabelDirective, MuiNextStepDirective, MuiNoTableDataComponent, MuiOverviewPageHeaderComponent, MuiOverviewPageModule, MuiOverviewTableModule, MuiPaginatorComponent, MuiPrefixDirective, MuiProgressBarComponent, MuiProgressBarModule, MuiProgressStepComponent, MuiRowDetailsComponent, MuiSortHeaderComponent, MuiStepActionsDirective, MuiSuffixDirective, MuiTableElementsCountComponent, createGhostDataSet };
//# sourceMappingURL=mapp-ui-unify.mjs.map
