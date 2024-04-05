/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MuiIconModule } from '@mapp-ui/common';
import { Interval } from 'luxon';
import { debounceTime, filter, map, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MuiFormFieldModule } from '../form-field';
import * as i0 from "@angular/core";
import * as i1 from "../form-field/mui-form-field.component";
import * as i2 from "../form-field/mui-suffix.directive";
import * as i3 from "../form-field/mui-label.directive";
import * as i4 from "@angular/material/datepicker";
import * as i5 from "@angular/forms";
import * as i6 from "@mapp-ui/common";
/**
 * This component provides a form field with a date range picker.
 * Primary use for the component is in the table filter bar. The label for the form field is taken from the
 * body content of the component.
 * Data input / output is handled in ISO8601 compliant date interval string. The component integrates with the
 * Angular forms modules, so can be regularly used with the formControl / formControlName directives.
 */
export class MuiDateRangePickerComponent {
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
MuiDateRangePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiDateRangePickerComponent, isStandalone: true, selector: "mui-date-range-picker", inputs: { fieldWidth: "fieldWidth", minDate: "minDate", maxDate: "maxDate" }, ngImport: i0, template: "<mui-form-field [fieldWidth]=\"fieldWidth\"\r\n    labelPosition=\"hint\">\r\n  <mui-label>\r\n    <ng-content></ng-content>\r\n  </mui-label>\r\n  <mat-date-range-input [rangePicker]=\"picker\"\r\n      [formGroup]=\"datePickerForm\"\r\n      [min]=\"minDate\"\r\n      [max]=\"maxDate\">\r\n    <input matStartDate\r\n        formControlName=\"start\">\r\n    <input matEndDate\r\n        formControlName=\"end\">\r\n  </mat-date-range-input>\r\n  <mat-date-range-picker #picker\r\n      (closed)=\"pickerClosed()\"\r\n      [disabled]=\"isPickerDisabled\"></mat-date-range-picker>\r\n  <mat-datepicker-toggle [for]=\"picker\"\r\n      muiSuffix>\r\n    <mui-icon matDatepickerToggleIcon>calendar</mui-icon>\r\n  </mat-datepicker-toggle>\r\n</mui-form-field>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MuiFormFieldModule }, { kind: "component", type: i1.MuiFormFieldComponent, selector: "mui-form-field", inputs: ["labelPosition", "labelSize", "fieldWidth", "showOptionalMarker"], exportAs: ["muiFormField"] }, { kind: "directive", type: i2.MuiSuffixDirective, selector: "[muiSuffix]" }, { kind: "directive", type: i3.MuiLabelDirective, selector: "mui-label" }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i4.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i4.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "component", type: i4.MatDateRangeInput, selector: "mat-date-range-input", inputs: ["rangePicker", "required", "dateFilter", "min", "max", "disabled", "separator", "comparisonStart", "comparisonEnd"], exportAs: ["matDateRangeInput"] }, { kind: "directive", type: i4.MatStartDate, selector: "input[matStartDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { kind: "directive", type: i4.MatEndDate, selector: "input[matEndDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { kind: "component", type: i4.MatDateRangePicker, selector: "mat-date-range-picker", exportAs: ["matDateRangePicker"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i6.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWRhdGUtcmFuZ2UtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9kYXRlLXJhbmdlLXBpY2tlci9tdWktZGF0ZS1yYW5nZS1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL2RhdGUtcmFuZ2UtcGlja2VyL211aS1kYXRlLXJhbmdlLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQXdCLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBWSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQUVuRDs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sMkJBQTJCO0lBc0J0QztRQXBCQSw0REFBNEQ7UUFFNUQsZUFBVSxHQUFHLE9BQU8sQ0FBQztRQVFyQixxQkFBZ0Is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S0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDVixFQUFFO2dCQUNELFNBQVMsRUFBRSxLQUFLO2dCQUNoQixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBRWpELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7eUhBN0ZVLDJCQUEyQjs2R0FBM0IsMkJBQTJCLCtKQ3pCeEMsOHZCQXNCQSx5REREWSxZQUFZLDhCQUFFLGtCQUFrQixnWEFBRSxtQkFBbUIsazlCQUFFLG1CQUFtQixtMkJBQUUsYUFBYTs0RkFJeEYsMkJBQTJCO2tCQVB2QyxTQUFTOytCQUNFLHVCQUF1QixjQUNyQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxDQUFDOzBFQVFwRyxVQUFVO3NCQURULEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XHJcbmltcG9ydCB7IE11aUljb25Nb2R1bGUgfSBmcm9tICdAbWFwcC11aS9jb21tb24nO1xyXG5pbXBvcnQgeyBEYXRlVGltZSwgSW50ZXJ2YWwgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNdWlGb3JtRmllbGRNb2R1bGUgfSBmcm9tICcuLi9mb3JtLWZpZWxkJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBwcm92aWRlcyBhIGZvcm0gZmllbGQgd2l0aCBhIGRhdGUgcmFuZ2UgcGlja2VyLlxyXG4gKiBQcmltYXJ5IHVzZSBmb3IgdGhlIGNvbXBvbmVudCBpcyBpbiB0aGUgdGFibGUgZmlsdGVyIGJhci4gVGhlIGxhYmVsIGZvciB0aGUgZm9ybSBmaWVsZCBpcyB0YWtlbiBmcm9tIHRoZVxyXG4gKiBib2R5IGNvbnRlbnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICogRGF0YSBpbnB1dCAvIG91dHB1dCBpcyBoYW5kbGVkIGluIElTTzg2MDEgY29tcGxpYW50IGRhdGUgaW50ZXJ2YWwgc3RyaW5nLiBUaGUgY29tcG9uZW50IGludGVncmF0ZXMgd2l0aCB0aGVcclxuICogQW5ndWxhciBmb3JtcyBtb2R1bGVzLCBzbyBjYW4gYmUgcmVndWxhcmx5IHVzZWQgd2l0aCB0aGUgZm9ybUNvbnRyb2wgLyBmb3JtQ29udHJvbE5hbWUgZGlyZWN0aXZlcy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLWRhdGUtcmFuZ2UtcGlja2VyJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE11aUZvcm1GaWVsZE1vZHVsZSwgTWF0RGF0ZXBpY2tlck1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgTXVpSWNvbk1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1kYXRlLXJhbmdlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXVpLWRhdGUtcmFuZ2UtcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE11aURhdGVSYW5nZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogU3BlY2lmeSB0aGUgZmllbGQgd2lkdGguIERlZmF1bHQgYW5kIG1pbmltdW0gaXMgMjQwcHggKi9cclxuICBASW5wdXQoKVxyXG4gIGZpZWxkV2lkdGggPSAnMjQwcHgnO1xyXG4gIC8qKiBTZXQgdGhlIG1pbmltdW0gZGF0ZSBzZWxlY3RhYmxlIGluIHRoZSBkYXRlIHBpY2tlciAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgbWluRGF0ZTogRGF0ZVRpbWUgfCBudWxsO1xyXG4gIC8qKiBTZXQgdGhlIG1heGltdW0gZGF0ZSBzZWxlY3RhYmxlIGluIHRoZSBkYXRlIHBpY2tlciAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgbWF4RGF0ZTogRGF0ZVRpbWUgfCBudWxsO1xyXG5cclxuICBpc1BpY2tlckRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHByaXZhdGUgZmIgPSBpbmplY3QoRm9ybUJ1aWxkZXIpO1xyXG4gIGRhdGVQaWNrZXJGb3JtID0gdGhpcy5mYi5ncm91cCh7XHJcbiAgICBzdGFydDogbmV3IEZvcm1Db250cm9sPERhdGVUaW1lIHwgbnVsbD4obnVsbCksXHJcbiAgICBlbmQ6IG5ldyBGb3JtQ29udHJvbDxEYXRlVGltZSB8IG51bGw+KG51bGwpXHJcbiAgfSk7XHJcbiAgcHJpdmF0ZSBuZ0NvbnRyb2wgPSBpbmplY3QoTmdDb250cm9sLCB7IG9wdGlvbmFsOiB0cnVlLCBzZWxmOiB0cnVlIH0pXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgaWYgKHRoaXMubmdDb250cm9sKSB7XHJcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG4gIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHtcclxuICB9O1xyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGVQaWNrZXJGb3JtLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gKHZhbC5zdGFydCAhPT0gbnVsbCAmJiB2YWwuZW5kICE9PSBudWxsKSB8fCAodmFsLnN0YXJ0ID09PSBudWxsICYmIHZhbC5lbmQgPT09IG51bGwpXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBtYXAodmFsID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmFsLnN0YXJ0ICYmIHZhbC5lbmQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVSYW5nZSA9IEludGVydmFsLmZyb21EYXRlVGltZXModmFsLnN0YXJ0LCB2YWwuZW5kKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlUmFuZ2UudG9JU08oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoZm4pXHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpc0Rpc2FibGVkID8gdGhpcy5kYXRlUGlja2VyRm9ybS5kaXNhYmxlKCkgOiB0aGlzLmRhdGVQaWNrZXJGb3JtLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5pc1BpY2tlckRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCByYW5nZSA9IEludGVydmFsLmZyb21JU08ob2JqKTtcclxuICAgICAgdGhpcy5kYXRlUGlja2VyRm9ybS5zZXRWYWx1ZSh7XHJcbiAgICAgICAgc3RhcnQ6IHJhbmdlLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogcmFuZ2UuZW5kXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgIG9ubHlTZWxmOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRhdGVQaWNrZXJGb3JtLnJlc2V0KHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBlbmQ6IG51bGxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGVtaXRFdmVudDogZmFsc2UsXHJcbiAgICAgICAgb25seVNlbGY6IHRydWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBpY2tlckNsb3NlZCgpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZGF0ZVBpY2tlckZvcm0uY29udHJvbHMuc3RhcnQ7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5kYXRlUGlja2VyRm9ybS5jb250cm9scy5lbmQ7XHJcblxyXG4gICAgaWYgKCFlbmREYXRlLnZhbHVlKSB7XHJcbiAgICAgIGVuZERhdGUuc2V0VmFsdWUoc3RhcnREYXRlLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsIjxtdWktZm9ybS1maWVsZCBbZmllbGRXaWR0aF09XCJmaWVsZFdpZHRoXCJcclxuICAgIGxhYmVsUG9zaXRpb249XCJoaW50XCI+XHJcbiAgPG11aS1sYWJlbD5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L211aS1sYWJlbD5cclxuICA8bWF0LWRhdGUtcmFuZ2UtaW5wdXQgW3JhbmdlUGlja2VyXT1cInBpY2tlclwiXHJcbiAgICAgIFtmb3JtR3JvdXBdPVwiZGF0ZVBpY2tlckZvcm1cIlxyXG4gICAgICBbbWluXT1cIm1pbkRhdGVcIlxyXG4gICAgICBbbWF4XT1cIm1heERhdGVcIj5cclxuICAgIDxpbnB1dCBtYXRTdGFydERhdGVcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJzdGFydFwiPlxyXG4gICAgPGlucHV0IG1hdEVuZERhdGVcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJlbmRcIj5cclxuICA8L21hdC1kYXRlLXJhbmdlLWlucHV0PlxyXG4gIDxtYXQtZGF0ZS1yYW5nZS1waWNrZXIgI3BpY2tlclxyXG4gICAgICAoY2xvc2VkKT1cInBpY2tlckNsb3NlZCgpXCJcclxuICAgICAgW2Rpc2FibGVkXT1cImlzUGlja2VyRGlzYWJsZWRcIj48L21hdC1kYXRlLXJhbmdlLXBpY2tlcj5cclxuICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIFtmb3JdPVwicGlja2VyXCJcclxuICAgICAgbXVpU3VmZml4PlxyXG4gICAgPG11aS1pY29uIG1hdERhdGVwaWNrZXJUb2dnbGVJY29uPmNhbGVuZGFyPC9tdWktaWNvbj5cclxuICA8L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cclxuPC9tdWktZm9ybS1maWVsZD5cclxuIl19