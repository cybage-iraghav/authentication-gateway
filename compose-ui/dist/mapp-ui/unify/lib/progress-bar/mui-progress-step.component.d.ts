import { BooleanInput } from '@angular/cdk/coercion';
import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/** subset of properties from AbstractControl from angular forms. Replicated here to not need import */
interface AbstractControlLike {
    dirty: boolean;
    disabled: boolean;
    enabled: boolean;
    invalid: boolean;
    pending: boolean;
    pristine: boolean;
    status: string;
    touched: boolean;
    untouched: boolean;
    valid: boolean;
    markAllAsTouched(): void;
}
export declare class MuiProgressStepComponent implements OnChanges {
    content: TemplateRef<HTMLElement>;
    actionsTemplate: TemplateRef<HTMLElement>;
    label: string;
    stepControl: AbstractControlLike | null;
    _completedOverride: boolean | null;
    interacted: boolean;
    private changed$;
    constructor();
    /** Whether step is marked as completed. When setting a value for this, it will override the default handling
     * for completed state. */
    get completed(): boolean;
    set completed(value: BooleanInput);
    /** Emits on changes in this step */
    get changes(): Observable<void>;
    ngOnChanges(changes: SimpleChanges): void;
    markAsInteracted(): void;
    private getDefaultCompleted;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiProgressStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiProgressStepComponent, "mui-progress-step", never, { "label": "label"; "stepControl": "stepControl"; "completed": "completed"; }, {}, never, ["*", "mui-step-actions, [muiStepActions]"], false, never>;
}
export {};
