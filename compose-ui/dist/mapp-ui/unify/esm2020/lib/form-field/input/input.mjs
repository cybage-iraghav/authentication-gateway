/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Largely based on MatInput from Angular Material. Using matInput within mui-form-field is no longer easily
 * possible since v15, as Material team moved to the mdc based components. Some implementation aspects rely heavily
 * on structure and classes used by mat-form-field and matInput, which make it incompatible with mui-form-field.
 * This custom implementation brings similar behaviour as using matInput, but tailored to the Unify input components.
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { Directive, Inject, Input, Optional, Self } from '@angular/core';
import { Validators } from '@angular/forms';
import { mixinErrorState } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { MUI_INPUT_VALUE_ACCESSOR } from './input-value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/core";
import * as i4 from "@angular/cdk/text-field";
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
let nextUniqueId = 0;
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
export class MuiInput extends _MuiInputBase {
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
        return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
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
        this._uid = `mui-input-${nextUniqueId++}`;
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i2.NgControl, decorators: [{
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
                }] }, { type: i4.AutofillMonitor }]; }, propDecorators: { disabled: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvZm9ybS1maWVsZC9pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQ7Ozs7O0dBS0c7QUFDSCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFZLE1BQU0sdUJBQXVCLENBQUM7QUFFekUsT0FBTyxFQUVMLFNBQVMsRUFHVCxNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixJQUFJLEVBQ0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF5QyxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRixPQUFPLEVBQTBDLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQUVsRSxxRkFBcUY7QUFDckYsTUFBTSx1QkFBdUIsR0FBRztJQUM5QixRQUFRO0lBQ1IsVUFBVTtJQUNWLE1BQU07SUFDTixRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7Q0FDVCxDQUFDO0FBRUYsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLCtDQUErQztBQUMvQyxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQ2pDO0lBT0UsWUFDVyx5QkFBNEMsRUFDNUMsV0FBbUIsRUFDbkIsZ0JBQW9DO0lBQzNDOzs7T0FHRztJQUNJLFNBQW9CO1FBUHBCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBbUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQUtwQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBZC9COzs7V0FHRztRQUNNLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQVk1QyxDQUFDO0NBQ0YsQ0FDSixDQUFDO0FBd0JGLGtFQUFrRTtBQUNsRSxNQUFNLE9BQU8sUUFDVCxTQUFRLGFBQWE7SUFxQ3ZCOztPQUVHO0lBQ0gsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFtQjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLDZFQUE2RTtRQUM3RSxtRUFBbUU7UUFDbkUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBSUQ7O09BRUc7SUFDSCxJQUNJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksRUFBRSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBY0Q7O09BRUc7SUFDSCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUM7SUFDL0YsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQW1CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUlELGlDQUFpQztJQUNqQyxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQiwrRkFBK0Y7UUFDL0YscUZBQXFGO1FBQ3JGLDRGQUE0RjtRQUM1RixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxzQkFBc0IsRUFBRTthQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBa0MsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN4RTtJQUNILENBQUM7SUFhRDs7T0FFRztJQUNILElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNsQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBY0QsWUFDYyxXQUFtRixFQUNuRixTQUFtQixFQUNULFNBQW9CLEVBQzVCLFdBQW1CLEVBQ25CLGdCQUFvQyxFQUNoRCx5QkFBNEMsRUFDVSxrQkFBdUIsRUFDckUsZ0JBQWlDO1FBRTNDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFUL0QsZ0JBQVcsR0FBWCxXQUFXLENBQXdFO1FBQ25GLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFNckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQXBLbkMsU0FBSSxHQUFHLGFBQWEsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQVEvQzs7V0FFRztRQUNILFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEI7O1dBRUc7UUFDZSxpQkFBWSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRXBFOztXQUVHO1FBQ0gsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFMUI7O1dBRUc7UUFDSCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5CLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQXFCZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBMkRsQixVQUFLLEdBQUcsTUFBTSxDQUFDO1FBb0NqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWhCLDBCQUFxQixHQUFHO1lBQ2hDLE1BQU07WUFDTixVQUFVO1lBQ1YsZ0JBQWdCO1lBQ2hCLE9BQU87WUFDUCxNQUFNO1lBQ04sTUFBTTtTQUNQLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUU7YUFDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFjWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWhELDBGQUEwRjtRQUMxRixZQUFZO1FBQ1osSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixJQUFJLE9BQU8sQ0FBQztRQUV6RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV2QywwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxLQUFLLFVBQVUsQ0FBQztJQUU3QyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztpQkFDeEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDUjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixzRkFBc0Y7WUFDdEYsdUZBQXVGO1lBQ3ZGLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QiwyRkFBMkY7WUFDM0YseUZBQXlGO1lBQ3pGLDRGQUE0RjtZQUM1RixZQUFZO1lBQ1osSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtTQUNGO1FBRUQsd0ZBQXdGO1FBQ3hGLHVGQUF1RjtRQUN2RixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsMkZBQTJGO1FBQzNGLHNGQUFzRjtRQUN0RixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLEtBQUssQ0FBQyxPQUFzQjtRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDJFQUEyRTtJQUMzRSxhQUFhLENBQUMsU0FBa0I7UUFDOUIsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixzRkFBc0Y7UUFDdEYsMkZBQTJGO1FBQzNGLHNGQUFzRjtRQUN0RixxRkFBcUY7UUFDckYsd0NBQXdDO1FBQ3hDLGlGQUFpRjtRQUNqRiwwRkFBMEY7SUFDNUYsQ0FBQztJQUVELDRFQUE0RTtJQUNsRSxzQkFBc0I7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLG9CQUFvQixLQUFLLFFBQVEsRUFBRTtZQUMxQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsbUZBQW1GO0lBQzNFLHNCQUFzQjtRQUM1QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUM7WUFDeEMsV0FBVztnQkFDUCxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCxzREFBc0Q7SUFDNUMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQ0FBK0M7SUFDckMsYUFBYTtRQUNyQixJQUNJLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7c0RBQ0gsRUFDaEQ7WUFDQSxNQUFNLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLGdDQUFnQyxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQsOEVBQThFO0lBQ3BFLGFBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMEVBQTBFO0lBQ2hFLFdBQVc7UUFDbkIsK0RBQStEO1FBQy9ELE1BQU0sUUFBUSxHQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBa0MsQ0FBQyxRQUFRLENBQUM7UUFDL0UsT0FBTyxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUs7UUFDUCxPQUFPLENBQ0gsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSztZQUNyQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUNuQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsR0FBYTtRQUM3QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNkLCtGQUErRjtRQUMvRiwyRkFBMkY7UUFDM0YsZ0dBQWdHO1FBQ2hHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7c0dBMVZVLFFBQVEsa1BBMkthLHdCQUF3QjswRkEzSzdDLFFBQVEsOG9CQUhSLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDOzRGQUd6RCxRQUFRO2tCQXZCcEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdURBQXVEO29CQUNqRSxRQUFRLEVBQUUsVUFBVTtvQkFDcEIscUVBQXFFO29CQUNyRSxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG1CQUFtQjt3QkFDNUIsd0ZBQXdGO3dCQUN4Riw4RUFBOEU7d0JBQzlFLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFlBQVksRUFBRSxVQUFVO3dCQUN4QixZQUFZLEVBQUUsVUFBVTt3QkFDeEIsYUFBYSxFQUFFLGNBQWM7d0JBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsd0ZBQXdGO3dCQUN4Riw4RUFBOEU7d0JBQzlFLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixTQUFTLEVBQUUscUJBQXFCO3dCQUNoQyxRQUFRLEVBQUUsc0JBQXNCO3dCQUNoQyxTQUFTLEVBQUUsWUFBWTtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxVQUFVLEVBQUUsQ0FBQztpQkFDckU7OzBCQXlLTSxRQUFROzswQkFBSSxJQUFJOzswQkFDaEIsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBRVIsUUFBUTs7MEJBQUksSUFBSTs7MEJBQUksTUFBTTsyQkFBQyx3QkFBd0I7MEVBaklwRCxRQUFRO3NCQURYLEtBQUs7Z0JBc0JGLEVBQUU7c0JBREwsS0FBSztnQkFjRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFNRixRQUFRO3NCQURYLEtBQUs7Z0JBYUYsSUFBSTtzQkFEUCxLQUFLO2dCQXFCWSxpQkFBaUI7c0JBQWxDLEtBQUs7Z0JBTXFCLG1CQUFtQjtzQkFBN0MsS0FBSzt1QkFBQyxrQkFBa0I7Z0JBTXJCLEtBQUs7c0JBRFIsS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXHJcbi8qKlxyXG4gKiBMYXJnZWx5IGJhc2VkIG9uIE1hdElucHV0IGZyb20gQW5ndWxhciBNYXRlcmlhbC4gVXNpbmcgbWF0SW5wdXQgd2l0aGluIG11aS1mb3JtLWZpZWxkIGlzIG5vIGxvbmdlciBlYXNpbHlcclxuICogcG9zc2libGUgc2luY2UgdjE1LCBhcyBNYXRlcmlhbCB0ZWFtIG1vdmVkIHRvIHRoZSBtZGMgYmFzZWQgY29tcG9uZW50cy4gU29tZSBpbXBsZW1lbnRhdGlvbiBhc3BlY3RzIHJlbHkgaGVhdmlseVxyXG4gKiBvbiBzdHJ1Y3R1cmUgYW5kIGNsYXNzZXMgdXNlZCBieSBtYXQtZm9ybS1maWVsZCBhbmQgbWF0SW5wdXQsIHdoaWNoIG1ha2UgaXQgaW5jb21wYXRpYmxlIHdpdGggbXVpLWZvcm0tZmllbGQuXHJcbiAqIFRoaXMgY3VzdG9tIGltcGxlbWVudGF0aW9uIGJyaW5ncyBzaW1pbGFyIGJlaGF2aW91ciBhcyB1c2luZyBtYXRJbnB1dCwgYnV0IHRhaWxvcmVkIHRvIHRoZSBVbmlmeSBpbnB1dCBjb21wb25lbnRzLlxyXG4gKi9cclxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBnZXRTdXBwb3J0ZWRJbnB1dFR5cGVzLCBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7IEF1dG9maWxsTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXh0LWZpZWxkJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgU2VsZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDYW5VcGRhdGVFcnJvclN0YXRlLCBFcnJvclN0YXRlTWF0Y2hlciwgbWl4aW5FcnJvclN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IE1hdEZvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNVUlfSU5QVVRfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICcuL2lucHV0LXZhbHVlLWFjY2Vzc29yJztcclxuXHJcbi8vIEludmFsaWQgaW5wdXQgdHlwZS4gVXNpbmcgb25lIG9mIHRoZXNlIHdpbGwgdGhyb3cgYW4gTWF0SW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvci5cclxuY29uc3QgTVVJX0lOUFVUX0lOVkFMSURfVFlQRVMgPSBbXHJcbiAgJ2J1dHRvbicsXHJcbiAgJ2NoZWNrYm94JyxcclxuICAnZmlsZScsXHJcbiAgJ2hpZGRlbicsXHJcbiAgJ2ltYWdlJyxcclxuICAncmFkaW8nLFxyXG4gICdyYW5nZScsXHJcbiAgJ3Jlc2V0JyxcclxuICAnc3VibWl0J1xyXG5dO1xyXG5cclxubGV0IG5leHRVbmlxdWVJZCA9IDA7XHJcblxyXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdElucHV0LlxyXG5jb25zdCBfTXVpSW5wdXRCYXNlID0gbWl4aW5FcnJvclN0YXRlKFxyXG4gICAgY2xhc3Mge1xyXG4gICAgICAvKipcclxuICAgICAgICogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBzdGF0ZSBjaGFuZ2VzIGFuZCBzaG91bGQgY2F1c2UgdGhlIHBhcmVudFxyXG4gICAgICAgKiBmb3JtIGZpZWxkIHRvIHVwZGF0ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgTWF0Rm9ybUZpZWxkQ29udHJvbGAuXHJcbiAgICAgICAqL1xyXG4gICAgICByZWFkb25seSBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXHJcbiAgICAgICAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcclxuICAgICAgICAgIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEZvcm0gY29udHJvbCBib3VuZCB0byB0aGUgY29tcG9uZW50LlxyXG4gICAgICAgICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgTWF0Rm9ybUZpZWxkQ29udHJvbGAuXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxyXG4gICAgICApIHtcclxuICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IGBpbnB1dFttdWlJbnB1dF0sIHRleHRhcmVhW211aUlucHV0XSwgc2VsZWN0W211aUlucHV0XWAsXHJcbiAgZXhwb3J0QXM6ICdtdWlJbnB1dCcsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ211aS1pbnB1dC1lbGVtZW50JyxcclxuICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcclxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxyXG4gICAgJ1tpZF0nOiAnaWQnLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxyXG4gICAgJ1thdHRyLm5hbWVdJzogJ25hbWUgfHwgbnVsbCcsXHJcbiAgICAnW2F0dHIucmVhZG9ubHldJzogJ3JlYWRvbmx5IHx8IG51bGwnLFxyXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxyXG4gICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXHJcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcclxuICAgICcoZm9jdXMpJzogJ19mb2N1c0NoYW5nZWQodHJ1ZSknLFxyXG4gICAgJyhibHVyKSc6ICdfZm9jdXNDaGFuZ2VkKGZhbHNlKScsXHJcbiAgICAnKGlucHV0KSc6ICdfb25JbnB1dCgpJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTXVpSW5wdXQgfV1cclxufSlcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XHJcbmV4cG9ydCBjbGFzcyBNdWlJbnB1dFxyXG4gICAgZXh0ZW5kcyBfTXVpSW5wdXRCYXNlXHJcbiAgICBpbXBsZW1lbnRzIE1hdEZvcm1GaWVsZENvbnRyb2w8YW55PixcclxuICAgICAgICBPbkNoYW5nZXMsXHJcbiAgICAgICAgT25EZXN0cm95LFxyXG4gICAgICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICAgICAgRG9DaGVjayxcclxuICAgICAgICBDYW5VcGRhdGVFcnJvclN0YXRlIHtcclxuICBwcm90ZWN0ZWQgX3VpZCA9IGBtdWktaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xyXG4gIHByb3RlY3RlZCBfcHJldmlvdXNOYXRpdmVWYWx1ZTogYW55O1xyXG4gIHByaXZhdGUgX2lucHV0VmFsdWVBY2Nlc3NvcjogeyB2YWx1ZTogYW55IH07XHJcbiAgcHJpdmF0ZSBfcHJldmlvdXNQbGFjZWhvbGRlcjogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBhIHRleHRhcmVhLiAqL1xyXG4gIHJlYWRvbmx5IF9pc1RleHRhcmVhOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXHJcbiAgICovXHJcbiAgZm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXHJcbiAgICovXHJcbiAgb3ZlcnJpZGUgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxyXG4gICAqL1xyXG4gIGNvbnRyb2xUeXBlID0gJ211aS1pbnB1dCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cclxuICAgKi9cclxuICBhdXRvZmlsbGVkID0gZmFsc2U7XHJcblxyXG4gIHNob3VsZExhYmVsRmxvYXQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuXHJcbiAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxyXG4gICAgLy8gUmVzZXQgZnJvbSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGRvZXNuJ3QgYmVjb21lIHN0dWNrLlxyXG4gICAgaWYgKHRoaXMuZm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9pZDtcclxuICB9XHJcblxyXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMuX3VpZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hbWUgb2YgdGhlIGlucHV0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkID8/IHRoaXMubmdDb250cm9sPy5jb250cm9sPy5oYXNWYWxpZGF0b3IoVmFsaWRhdG9ycy5yZXF1aXJlZCkgPz8gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXQgcmVxdWlyZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xyXG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9yZXF1aXJlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqIElucHV0IHR5cGUgb2YgdGhlIGVsZW1lbnQuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgfVxyXG5cclxuICBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl90eXBlID0gdmFsdWUgfHwgJ3RleHQnO1xyXG4gICAgdGhpcy5fdmFsaWRhdGVUeXBlKCk7XHJcblxyXG4gICAgLy8gV2hlbiB1c2luZyBBbmd1bGFyIGlucHV0cywgZGV2ZWxvcGVycyBhcmUgbm8gbG9uZ2VyIGFibGUgdG8gc2V0IHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSBuYXRpdmVcclxuICAgIC8vIGlucHV0IGVsZW1lbnQuIFRvIGVuc3VyZSB0aGF0IGJpbmRpbmdzIGZvciBgdHlwZWAgd29yaywgd2UgbmVlZCB0byBzeW5jIHRoZSBzZXR0ZXJcclxuICAgIC8vIHdpdGggdGhlIG5hdGl2ZSBwcm9wZXJ0eS4gVGV4dGFyZWEgZWxlbWVudHMgZG9uJ3Qgc3VwcG9ydCB0aGUgdHlwZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUuXHJcbiAgICBpZiAoIXRoaXMuX2lzVGV4dGFyZWEgJiYgZ2V0U3VwcG9ydGVkSW5wdXRUeXBlcygpXHJcbiAgICAgICAgLmhhcyh0aGlzLl90eXBlKSkge1xyXG4gICAgICAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGUgPSB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF90eXBlID0gJ3RleHQnO1xyXG5cclxuICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cclxuICBASW5wdXQoKSBvdmVycmlkZSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cclxuICAgKi9cclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSB1c2VyQXJpYURlc2NyaWJlZEJ5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VmFsdWVBY2Nlc3Nvci52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZUFjY2Vzc29yLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHJlYWRvbmx5LiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xyXG4gIH1cclxuXHJcbiAgc2V0IHJlYWRvbmx5KHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcclxuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XHJcblxyXG4gIHByb3RlY3RlZCBfbmV2ZXJFbXB0eUlucHV0VHlwZXMgPSBbXHJcbiAgICAnZGF0ZScsXHJcbiAgICAnZGF0ZXRpbWUnLFxyXG4gICAgJ2RhdGV0aW1lLWxvY2FsJyxcclxuICAgICdtb250aCcsXHJcbiAgICAndGltZScsXHJcbiAgICAnd2VlaydcclxuICBdLmZpbHRlcih0ID0+IGdldFN1cHBvcnRlZElucHV0VHlwZXMoKVxyXG4gICAgICAuaGFzKHQpKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByb3RlY3RlZCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50PixcclxuICAgICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXHJcbiAgICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXHJcbiAgICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICAgICAgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXHJcbiAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChNVUlfSU5QVVRfVkFMVUVfQUNDRVNTT1IpIGlucHV0VmFsdWVBY2Nlc3NvcjogYW55LFxyXG4gICAgICBwcml2YXRlIF9hdXRvZmlsbE1vbml0b3I6IEF1dG9maWxsTW9uaXRvclxyXG4gICkge1xyXG4gICAgc3VwZXIoX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgX3BhcmVudEZvcm0sIF9wYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8vIElmIG5vIGlucHV0IHZhbHVlIGFjY2Vzc29yIHdhcyBleHBsaWNpdGx5IHNwZWNpZmllZCwgdXNlIHRoZSBlbGVtZW50IGFzIHRoZSBpbnB1dCB2YWx1ZVxyXG4gICAgLy8gYWNjZXNzb3IuXHJcbiAgICB0aGlzLl9pbnB1dFZhbHVlQWNjZXNzb3IgPSBpbnB1dFZhbHVlQWNjZXNzb3IgfHwgZWxlbWVudDtcclxuXHJcbiAgICB0aGlzLl9wcmV2aW91c05hdGl2ZVZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICAvLyBGb3JjZSBzZXR0ZXIgdG8gYmUgY2FsbGVkIGluIGNhc2UgaWQgd2FzIG5vdCBzcGVjaWZpZWQuXHJcbiAgICB0aGlzLmlkID0gdGhpcy5pZDtcclxuXHJcbiAgICB0aGlzLl9pc1RleHRhcmVhID0gbm9kZU5hbWUgPT09ICd0ZXh0YXJlYSc7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLl9hdXRvZmlsbE1vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvZmlsbGVkID0gZXZlbnQuaXNBdXRvZmlsbGVkO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcclxuICAgICAgdGhpcy5fYXV0b2ZpbGxNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcclxuICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcclxuICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXHJcbiAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxyXG4gICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcclxuXHJcbiAgICAgIC8vIFNpbmNlIHRoZSBpbnB1dCBpc24ndCBhIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAsIHdlIGRvbid0IGhhdmUgYSBnb29kIHdheSBvZiBrbm93aW5nIHdoZW5cclxuICAgICAgLy8gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkLiBXZSBjYW4ndCB1c2UgdGhlIGBuZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlc2AsIGJlY2F1c2UgaXRcclxuICAgICAgLy8gd29uJ3QgZmlyZSBpZiB0aGUgaW5wdXQgaXMgZGlzYWJsZWQgd2l0aCBgZW1pdEV2ZW50cyA9IGZhbHNlYCwgZGVzcGl0ZSB0aGUgaW5wdXQgYmVjb21pbmdcclxuICAgICAgLy8gZGlzYWJsZWQuXHJcbiAgICAgIGlmICh0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gbnVsbCAmJiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZDtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSBuZWVkIHRvIGRpcnR5LWNoZWNrIHRoZSBuYXRpdmUgZWxlbWVudCdzIHZhbHVlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lIGNhc2VzIHdoZXJlXHJcbiAgICAvLyB3ZSB3b24ndCBiZSBub3RpZmllZCB3aGVuIGl0IGNoYW5nZXMgKGUuZy4gdGhlIGNvbnN1bWVyIGlzbid0IHVzaW5nIGZvcm1zIG9yIHRoZXkncmVcclxuICAgIC8vIHVwZGF0aW5nIHRoZSB2YWx1ZSB1c2luZyBgZW1pdEV2ZW50OiBmYWxzZWApLlxyXG4gICAgdGhpcy5fZGlydHlDaGVja05hdGl2ZVZhbHVlKCk7XHJcblxyXG4gICAgLy8gV2UgbmVlZCB0byBkaXJ0eS1jaGVjayBhbmQgc2V0IHRoZSBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgb3Vyc2VsdmVzLCBiZWNhdXNlIHdoZXRoZXIgaXQnc1xyXG4gICAgLy8gcHJlc2VudCBvciBub3QgZGVwZW5kcyBvbiBhIHF1ZXJ5IHdoaWNoIGlzIHByb25lIHRvIFwiY2hhbmdlZCBhZnRlciBjaGVja2VkXCIgZXJyb3JzLlxyXG4gICAgdGhpcy5fZGlydHlDaGVja1BsYWNlaG9sZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXHJcbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENhbGxiYWNrIGZvciB0aGUgY2FzZXMgd2hlcmUgdGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIGlucHV0IGNoYW5nZXMuICovXHJcbiAgX2ZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XHJcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9vbklucHV0KCkge1xyXG4gICAgLy8gVGhpcyBpcyBhIG5vb3AgZnVuY3Rpb24gYW5kIGlzIHVzZWQgdG8gbGV0IEFuZ3VsYXIga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cclxuICAgIC8vIEFuZ3VsYXIgd2lsbCBydW4gYSBuZXcgY2hhbmdlIGRldGVjdGlvbiBlYWNoIHRpbWUgdGhlIGBpbnB1dGAgZXZlbnQgaGFzIGJlZW4gZGlzcGF0Y2hlZC5cclxuICAgIC8vIEl0J3MgbmVjZXNzYXJ5IHRoYXQgQW5ndWxhciByZWNvZ25pemVzIHRoZSB2YWx1ZSBjaGFuZ2UsIGJlY2F1c2Ugd2hlbiBmbG9hdGluZ0xhYmVsXHJcbiAgICAvLyBpcyBzZXQgdG8gZmFsc2UgYW5kIEFuZ3VsYXIgZm9ybXMgYXJlbid0IHVzZWQsIHRoZSBwbGFjZWhvbGRlciB3b24ndCByZWNvZ25pemUgdGhlXHJcbiAgICAvLyB2YWx1ZSBjaGFuZ2VzIGFuZCB3aWxsIG5vdCBkaXNhcHBlYXIuXHJcbiAgICAvLyBMaXN0ZW5pbmcgdG8gdGhlIGlucHV0IGV2ZW50IHdvdWxkbid0IGJlIG5lY2Vzc2FyeSB3aGVuIHRoZSBpbnB1dCBpcyB1c2luZyB0aGVcclxuICAgIC8vIEZvcm1zTW9kdWxlIG9yIFJlYWN0aXZlRm9ybXNNb2R1bGUsIGJlY2F1c2UgQW5ndWxhciBmb3JtcyBhbHNvIGxpc3RlbnMgdG8gaW5wdXQgZXZlbnRzLlxyXG4gIH1cclxuXHJcbiAgLyoqIERvZXMgc29tZSBtYW51YWwgZGlydHkgY2hlY2tpbmcgb24gdGhlIG5hdGl2ZSBpbnB1dCBgdmFsdWVgIHByb3BlcnR5LiAqL1xyXG4gIHByb3RlY3RlZCBfZGlydHlDaGVja05hdGl2ZVZhbHVlKCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzTmF0aXZlVmFsdWUgIT09IG5ld1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3ByZXZpb3VzTmF0aXZlVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIERvZXMgc29tZSBtYW51YWwgZGlydHkgY2hlY2tpbmcgb24gdGhlIG5hdGl2ZSBpbnB1dCBgcGxhY2Vob2xkZXJgIGF0dHJpYnV0ZS4gKi9cclxuICBwcml2YXRlIF9kaXJ0eUNoZWNrUGxhY2Vob2xkZXIoKSB7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuX2dldFBsYWNlaG9sZGVyKCk7XHJcbiAgICBpZiAocGxhY2Vob2xkZXIgIT09IHRoaXMuX3ByZXZpb3VzUGxhY2Vob2xkZXIpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgdGhpcy5fcHJldmlvdXNQbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG4gICAgICBwbGFjZWhvbGRlclxyXG4gICAgICAgICAgPyBlbGVtZW50LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcilcclxuICAgICAgICAgIDogZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgY3VycmVudCBwbGFjZWhvbGRlciBvZiB0aGUgZm9ybSBmaWVsZC4gKi9cclxuICBwcm90ZWN0ZWQgX2dldFBsYWNlaG9sZGVyKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBNYWtlIHN1cmUgdGhlIGlucHV0IGlzIGEgc3VwcG9ydGVkIHR5cGUuICovXHJcbiAgcHJvdGVjdGVkIF92YWxpZGF0ZVR5cGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICAgTVVJX0lOUFVUX0lOVkFMSURfVFlQRVMuaW5kZXhPZih0aGlzLl90eXBlKSA+IC0xIC8qJiZcclxuICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSovXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYElucHV0IHR5cGUgXCIke3RoaXMuX3R5cGV9XCIgaXNuJ3Qgc3VwcG9ydGVkIGJ5IG11aUlucHV0LmApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCB0eXBlIGlzIG9uZSBvZiB0aGUgdHlwZXMgdGhhdCBhcmUgbmV2ZXIgZW1wdHkuICovXHJcbiAgcHJvdGVjdGVkIF9pc05ldmVyRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbmV2ZXJFbXB0eUlucHV0VHlwZXMuaW5kZXhPZih0aGlzLl90eXBlKSA+IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cclxuICBwcm90ZWN0ZWQgX2lzQmFkSW5wdXQoKSB7XHJcbiAgICAvLyBUaGUgYHZhbGlkaXR5YCBwcm9wZXJ0eSB3b24ndCBiZSBwcmVzZW50IG9uIHBsYXRmb3JtLXNlcnZlci5cclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eTtcclxuICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cclxuICAgKi9cclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICF0aGlzLl9pc05ldmVyRW1wdHkoKSAmJlxyXG4gICAgICAgICF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiZcclxuICAgICAgICAhdGhpcy5faXNCYWRJbnB1dCgpICYmXHJcbiAgICAgICAgIXRoaXMuYXV0b2ZpbGxlZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cclxuICAgKi9cclxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAoaWRzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgaWRzLmpvaW4oJyAnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXHJcbiAgICovXHJcbiAgb25Db250YWluZXJDbGljaygpIHtcclxuICAgIC8vIERvIG5vdCByZS1mb2N1cyB0aGUgaW5wdXQgZWxlbWVudCBpZiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IGZvY3VzZWQuIE90aGVyd2lzZSBpdCBjYW4gaGFwcGVuXHJcbiAgICAvLyB0aGF0IHNvbWVvbmUgY2xpY2tzIG9uIGEgdGltZSBpbnB1dCBhbmQgdGhlIGN1cnNvciByZXNldHMgdG8gdGhlIFwiaG91cnNcIiBmaWVsZCB3aGlsZSB0aGVcclxuICAgIC8vIFwibWludXRlc1wiIGZpZWxkIHdhcyBhY3R1YWxseSBjbGlja2VkLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzEyODQ5XHJcbiAgICBpZiAoIXRoaXMuZm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=