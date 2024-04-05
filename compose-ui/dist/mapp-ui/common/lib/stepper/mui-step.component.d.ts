import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import type { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export type StepStatus = '' | 'error' | 'edit' | 'done';
export declare class MuiStepComponent implements OnDestroy {
    private cdr;
    private _name;
    private _info;
    private _active;
    private _clickable;
    private _status;
    stepClasses: {};
    /**
     * Emits when internal state of step changes. Allows parent component to track and issue change detector refresh.
     */
    stateChanges: EventEmitter<void>;
    constructor(cdr: ChangeDetectorRef);
    get name(): string;
    /**
     * Main label to display for the step
     */
    set name(value: string);
    get info(): string;
    /**
     * Additional Info to display below the main label
     */
    set info(value: string);
    get active(): boolean;
    /**
     * Wether the step is currently active or not
     */
    set active(value: boolean);
    get clickable(): boolean;
    /**
     * Control if the step should be clickable
     */
    set clickable(value: boolean);
    get status(): StepStatus;
    set status(value: StepStatus);
    ngOnDestroy(): void;
    private onStateChanged;
    private setStepClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiStepComponent, "mui-step", ["muiStep"], { "name": "name"; "info": "info"; "active": "active"; "clickable": "clickable"; "status": "status"; }, { "stateChanges": "stateChanges"; }, never, ["*"], false, never>;
}
