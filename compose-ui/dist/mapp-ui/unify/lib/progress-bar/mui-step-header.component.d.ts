import * as i0 from "@angular/core";
export declare class MuiStepHeaderComponent {
    /** Label for the step */
    label: string;
    /** Whether the given step label is active, e.g. can be clicked on to navigate to the step. */
    active: boolean;
    /** State of the step */
    completed: boolean;
    /** Whether the step is selected */
    selected: boolean;
    readonly _hostClass = "mui-step-header";
    get _hostClassActive(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiStepHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiStepHeaderComponent, "mui-step-header", never, { "label": "label"; "active": "active"; "completed": "completed"; "selected": "selected"; }, {}, never, never, false, never>;
}
