import { MuiProgressBarComponent } from './mui-progress-bar.component';
import * as i0 from "@angular/core";
export declare class MuiNextStepDirective {
    private stepper;
    type: string;
    constructor(stepper: MuiProgressBarComponent);
    get isDisabled(): boolean;
    clicked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiNextStepDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiNextStepDirective, "button[muiNextStep]", never, { "type": "type"; }, {}, never, never, false, never>;
}
