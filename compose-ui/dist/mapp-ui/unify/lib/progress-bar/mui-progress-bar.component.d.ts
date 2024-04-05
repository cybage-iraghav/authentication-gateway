import { NumberInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, OnDestroy, QueryList } from '@angular/core';
import { MuiProgressStepComponent } from './mui-progress-step.component';
import * as i0 from "@angular/core";
export declare class MuiProgressBarComponent implements AfterContentInit, OnDestroy {
    private cd;
    steps: QueryList<MuiProgressStepComponent>;
    /** Set a title for the stepper. Displayed on the left side of the stepper header */
    stepperTitle: string;
    /**
     * Whether to override the disabled state handling of the 'Next' button. By default, button is disabled as long
     * as the Control component bound to [stepControl] is invalid. By setting this input to true, the button's disabled
     * state will need to be handled manually. If no [stepControl] is assigned, button state will need to be
     * handled manually as well. */
    manualButtonHandling: boolean;
    private _selectedIndex;
    private destroyed$;
    constructor(cd: ChangeDetectorRef);
    get selectedIndex(): number;
    set selectedIndex(index: NumberInput);
    /** The step that is selected. */
    get selected(): MuiProgressStepComponent | undefined;
    set selected(step: MuiProgressStepComponent | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    stateChanged(): void;
    isStepActive(index: number): boolean;
    stepClicked(index: number, step: MuiProgressStepComponent): void;
    /**
     * Moves to the next step, if there are no errors on the current step.
     * Otherwise, if the current step form is invalid, marks all fields as touched to trigger error display.
     */
    next(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiProgressBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiProgressBarComponent, "mui-progress-bar", never, { "stepperTitle": "stepperTitle"; "manualButtonHandling": "manualButtonHandling"; "selectedIndex": "selectedIndex"; "selected": "selected"; }, {}, ["steps"], never, false, never>;
}
