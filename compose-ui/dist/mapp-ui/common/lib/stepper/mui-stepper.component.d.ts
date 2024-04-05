import { ChangeDetectorRef } from '@angular/core';
import type { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { MuiStepComponent, StepStatus } from './mui-step.component';
import * as i0 from "@angular/core";
export declare class MuiStepperComponent implements AfterContentInit, OnDestroy {
    private cdr;
    isClickable: boolean;
    steps: QueryList<MuiStepComponent>;
    numberOfSteps: number;
    activeStepIndex: number;
    private destroyed$;
    constructor(cdr: ChangeDetectorRef);
    get stepArray(): MuiStepComponent[];
    ngAfterContentInit(): void;
    /**
     * Select the given step and make it active
     * @param step Step to make active
     */
    selectStep(step: MuiStepComponent): void;
    /**
     * Continue to next step
     */
    nextStep(): void;
    /**
     * Go back to previous step
     */
    previousStep(): void;
    /**
     * Set status for a step
     * @param status new status for the step
     * @param stepIndex index of step of which status should be updated. Defaults to current active step
     */
    setStatus(status: StepStatus, stepIndex?: number): void;
    /**
     * Control clickable state of a step
     * @param clickable wether to set a step to clickable or non-clickable
     * @param stepIndex Index of the step to change. Defaults to current active step
     */
    setClickable(clickable: boolean, stepIndex?: number): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiStepperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiStepperComponent, "mui-stepper", ["muiStepper"], { "isClickable": "isClickable"; }, {}, ["steps"], ["*"], false, never>;
}
