import { ChangeDetectionStrategy, Component, ContentChildren, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MuiStepComponent } from './mui-step.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MuiStepperComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.numberOfSteps = 0;
        this.activeStepIndex = 0;
        this.destroyed$ = new Subject();
    }
    get stepArray() {
        return this.steps.toArray();
    }
    ngAfterContentInit() {
        // track changes in the child steps
        const stepChangesArray = this.steps.map((step) => step.stateChanges);
        const stepChanges = merge(...stepChangesArray)
            .pipe(takeUntil(this.destroyed$));
        stepChanges.subscribe(() => {
            this.cdr.markForCheck();
        });
        // get active step
        const activeSteps = this.steps.filter((step) => step.active);
        // if there is no active step, make first step active
        if (activeSteps.length === 1) {
            this.selectStep(activeSteps[0]);
        }
        else {
            this.selectStep(this.steps.first);
        }
        // get number of steps
        this.numberOfSteps = this.steps.length;
        // set all steps to clickable if stepper is of type clickable
        if (this.isClickable) {
            this.steps.forEach(step => step.clickable = true);
        }
    }
    /**
     * Select the given step and make it active
     * @param step Step to make active
     */
    selectStep(step) {
        this.steps.forEach((s, i) => {
            if (s === step) {
                this.activeStepIndex = i;
            }
            s.active = false;
        });
        // activate the step the user has clicked
        step.active = true;
    }
    /**
     * Continue to next step
     */
    nextStep() {
        if (this.activeStepIndex < this.numberOfSteps - 1) {
            const steps = this.stepArray;
            steps[this.activeStepIndex].active = false;
            this.activeStepIndex++;
            steps[this.activeStepIndex].active = true;
        }
        this.cdr.markForCheck();
    }
    /**
     * Go back to previous step
     */
    previousStep() {
        if (this.activeStepIndex !== 0) {
            const steps = this.stepArray;
            steps[this.activeStepIndex].active = false;
            this.activeStepIndex--;
            steps[this.activeStepIndex].active = true;
        }
        this.cdr.markForCheck();
    }
    /**
     * Set status for a step
     * @param status new status for the step
     * @param stepIndex index of step of which status should be updated. Defaults to current active step
     */
    setStatus(status, stepIndex) {
        if (!stepIndex) {
            stepIndex = this.activeStepIndex;
        }
        const activeStep = this.stepArray[stepIndex];
        if (activeStep) {
            activeStep.status = status;
        }
    }
    /**
     * Control clickable state of a step
     * @param clickable wether to set a step to clickable or non-clickable
     * @param stepIndex Index of the step to change. Defaults to current active step
     */
    setClickable(clickable, stepIndex) {
        if (!stepIndex) {
            stepIndex = this.activeStepIndex;
        }
        if (stepIndex < this.stepArray.length) {
            this.stepArray[stepIndex].clickable = clickable;
        }
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
MuiStepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiStepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepperComponent, selector: "mui-stepper", inputs: { isClickable: "isClickable" }, queries: [{ propertyName: "steps", predicate: MuiStepComponent }], exportAs: ["muiStepper"], ngImport: i0, template: "<ul class=\"mui-stepper\">\r\n  <li *ngFor=\"let step of steps\" (click)=\"step.clickable && selectStep(step)\" [ngClass]=\"step.stepClasses\"\r\n    [ngStyle]=\"{'width': (100 / numberOfSteps) + '%'}\">\r\n    <div class=\"mui-step-name\">{{step.name}}</div>\r\n    <div class=\"mui-step-info\">{{step.info}}</div>\r\n  </li>\r\n</ul>\r\n<ng-content></ng-content>\r\n", styles: [".mui-stepper{counter-reset:step;margin:0;overflow:hidden;padding:0}.mui-stepper li{list-style-type:none;float:left;position:relative;text-align:center;padding:24px 0}.mui-stepper li.mui-clickable{cursor:pointer}.mui-stepper li:before{counter-increment:step;content:counter(step);font-size:12px;width:24px;height:24px;line-height:24px;display:block;text-align:center;margin:0 auto 10px;border-radius:50%}.mui-stepper li.mui-state-done,.mui-stepper li.mui-state-edit,.mui-stepper li.mui-state-error{font-feature-settings:\"liga\";-webkit-font-feature-settings:\"liga\"}.mui-stepper li.mui-state-done:before{content:\"check\";font-family:Material Icons}.mui-stepper li.mui-state-edit:before{content:\"edit\";font-family:Material Icons}.mui-stepper li.mui-state-error:before{background-color:transparent;content:\"warning\";font-family:Material Icons;font-size:24px;margin-top:1px}.mui-stepper li:after{content:\"\";position:absolute;left:calc(50% + 20px);height:1px;top:36px;width:calc(100% - 40px)}.mui-stepper li:last-child:after{content:none}.mui-stepper .mui-step-name,.mui-stepper .mui-step-info{padding:0 16px}.mui-stepper .mui-step-name{margin-top:13px}.mui-stepper li.mui-state-error .mui-step-name{margin-top:12px}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-stepper', exportAs: 'muiStepper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"mui-stepper\">\r\n  <li *ngFor=\"let step of steps\" (click)=\"step.clickable && selectStep(step)\" [ngClass]=\"step.stepClasses\"\r\n    [ngStyle]=\"{'width': (100 / numberOfSteps) + '%'}\">\r\n    <div class=\"mui-step-name\">{{step.name}}</div>\r\n    <div class=\"mui-step-info\">{{step.info}}</div>\r\n  </li>\r\n</ul>\r\n<ng-content></ng-content>\r\n", styles: [".mui-stepper{counter-reset:step;margin:0;overflow:hidden;padding:0}.mui-stepper li{list-style-type:none;float:left;position:relative;text-align:center;padding:24px 0}.mui-stepper li.mui-clickable{cursor:pointer}.mui-stepper li:before{counter-increment:step;content:counter(step);font-size:12px;width:24px;height:24px;line-height:24px;display:block;text-align:center;margin:0 auto 10px;border-radius:50%}.mui-stepper li.mui-state-done,.mui-stepper li.mui-state-edit,.mui-stepper li.mui-state-error{font-feature-settings:\"liga\";-webkit-font-feature-settings:\"liga\"}.mui-stepper li.mui-state-done:before{content:\"check\";font-family:Material Icons}.mui-stepper li.mui-state-edit:before{content:\"edit\";font-family:Material Icons}.mui-stepper li.mui-state-error:before{background-color:transparent;content:\"warning\";font-family:Material Icons;font-size:24px;margin-top:1px}.mui-stepper li:after{content:\"\";position:absolute;left:calc(50% + 20px);height:1px;top:36px;width:calc(100% - 40px)}.mui-stepper li:last-child:after{content:none}.mui-stepper .mui-step-name,.mui-stepper .mui-step-info{padding:0 16px}.mui-stepper .mui-step-name{margin-top:13px}.mui-stepper li.mui-state-error .mui-step-name{margin-top:12px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { isClickable: [{
                type: Input
            }], steps: [{
                type: ContentChildren,
                args: [MuiStepComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXN0ZXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9zdGVwcGVyL211aS1zdGVwcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvc3RlcHBlci9tdWktc3RlcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsS0FBSyxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBVXBFLE1BQU0sT0FBTyxtQkFBbUI7SUFVOUIsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFMMUMsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFFWixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUd6QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsbUNBQW1DO1FBQ25DLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQzthQUMzQyxJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDM0IsQ0FBQztRQUVKLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBa0I7UUFDbEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3RCxxREFBcUQ7UUFDckQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFFRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUV2Qyw2REFBNkQ7UUFDN0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsSUFBc0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUNqRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLENBQUMsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxNQUFrQixFQUFFLFNBQWtCO1FBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUNsQztRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLFNBQWtCLEVBQUUsU0FBa0I7UUFDakQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7aUhBOUhVLG1CQUFtQjtxR0FBbkIsbUJBQW1CLGlIQUliLGdCQUFnQix1REN6Qm5DLGtYQVFBOzRGRGFhLG1CQUFtQjtrQkFSL0IsU0FBUzsrQkFDRSxhQUFhLFlBQ2IsWUFBWSxtQkFHTCx1QkFBdUIsQ0FBQyxNQUFNO3dHQUt0QyxXQUFXO3NCQUFuQixLQUFLO2dCQUU2QixLQUFLO3NCQUF2QyxlQUFlO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSB7IEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE11aVN0ZXBDb21wb25lbnQsIFN0ZXBTdGF0dXMgfSBmcm9tICcuL211aS1zdGVwLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1zdGVwcGVyJyxcclxuICBleHBvcnRBczogJ211aVN0ZXBwZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tdWktc3RlcHBlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXVpLXN0ZXBwZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE11aVN0ZXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBpc0NsaWNrYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihNdWlTdGVwQ29tcG9uZW50KSBzdGVwczogUXVlcnlMaXN0PE11aVN0ZXBDb21wb25lbnQ+O1xyXG4gIG51bWJlck9mU3RlcHMgPSAwO1xyXG4gIGFjdGl2ZVN0ZXBJbmRleCA9IDA7XHJcblxyXG4gIHByaXZhdGUgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0ZXBBcnJheSgpOiBNdWlTdGVwQ29tcG9uZW50W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RlcHMudG9BcnJheSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgLy8gdHJhY2sgY2hhbmdlcyBpbiB0aGUgY2hpbGQgc3RlcHNcclxuICAgIGNvbnN0IHN0ZXBDaGFuZ2VzQXJyYXkgPSB0aGlzLnN0ZXBzLm1hcCgoc3RlcCkgPT4gc3RlcC5zdGF0ZUNoYW5nZXMpO1xyXG4gICAgY29uc3Qgc3RlcENoYW5nZXMgPSBtZXJnZSguLi5zdGVwQ2hhbmdlc0FycmF5KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKVxyXG4gICAgICApO1xyXG5cclxuICAgIHN0ZXBDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZ2V0IGFjdGl2ZSBzdGVwXHJcbiAgICBjb25zdCBhY3RpdmVTdGVwcyA9IHRoaXMuc3RlcHMuZmlsdGVyKChzdGVwKSA9PiBzdGVwLmFjdGl2ZSk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHN0ZXAsIG1ha2UgZmlyc3Qgc3RlcCBhY3RpdmVcclxuICAgIGlmIChhY3RpdmVTdGVwcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgdGhpcy5zZWxlY3RTdGVwKGFjdGl2ZVN0ZXBzWzBdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0U3RlcCh0aGlzLnN0ZXBzLmZpcnN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgbnVtYmVyIG9mIHN0ZXBzXHJcbiAgICB0aGlzLm51bWJlck9mU3RlcHMgPSB0aGlzLnN0ZXBzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBzZXQgYWxsIHN0ZXBzIHRvIGNsaWNrYWJsZSBpZiBzdGVwcGVyIGlzIG9mIHR5cGUgY2xpY2thYmxlXHJcbiAgICBpZiAodGhpcy5pc0NsaWNrYWJsZSkge1xyXG4gICAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiBzdGVwLmNsaWNrYWJsZSA9IHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IHRoZSBnaXZlbiBzdGVwIGFuZCBtYWtlIGl0IGFjdGl2ZVxyXG4gICAqIEBwYXJhbSBzdGVwIFN0ZXAgdG8gbWFrZSBhY3RpdmVcclxuICAgKi9cclxuICBzZWxlY3RTdGVwKHN0ZXA6IE11aVN0ZXBDb21wb25lbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgocywgaSkgPT4ge1xyXG4gICAgICBpZiAocyA9PT0gc3RlcCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RlcEluZGV4ID0gaTtcclxuICAgICAgfVxyXG4gICAgICBzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWN0aXZhdGUgdGhlIHN0ZXAgdGhlIHVzZXIgaGFzIGNsaWNrZWRcclxuICAgIHN0ZXAuYWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRpbnVlIHRvIG5leHQgc3RlcFxyXG4gICAqL1xyXG4gIG5leHRTdGVwKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlU3RlcEluZGV4IDwgdGhpcy5udW1iZXJPZlN0ZXBzIC0gMSkge1xyXG4gICAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcEFycmF5O1xyXG4gICAgICBzdGVwc1t0aGlzLmFjdGl2ZVN0ZXBJbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RlcEluZGV4Kys7XHJcbiAgICAgIHN0ZXBzW3RoaXMuYWN0aXZlU3RlcEluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR28gYmFjayB0byBwcmV2aW91cyBzdGVwXHJcbiAgICovXHJcbiAgcHJldmlvdXNTdGVwKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlU3RlcEluZGV4ICE9PSAwKSB7XHJcbiAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5zdGVwQXJyYXk7XHJcbiAgICAgIHN0ZXBzW3RoaXMuYWN0aXZlU3RlcEluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hY3RpdmVTdGVwSW5kZXgtLTtcclxuICAgICAgc3RlcHNbdGhpcy5hY3RpdmVTdGVwSW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgc3RhdHVzIGZvciBhIHN0ZXBcclxuICAgKiBAcGFyYW0gc3RhdHVzIG5ldyBzdGF0dXMgZm9yIHRoZSBzdGVwXHJcbiAgICogQHBhcmFtIHN0ZXBJbmRleCBpbmRleCBvZiBzdGVwIG9mIHdoaWNoIHN0YXR1cyBzaG91bGQgYmUgdXBkYXRlZC4gRGVmYXVsdHMgdG8gY3VycmVudCBhY3RpdmUgc3RlcFxyXG4gICAqL1xyXG4gIHNldFN0YXR1cyhzdGF0dXM6IFN0ZXBTdGF0dXMsIHN0ZXBJbmRleD86IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKCFzdGVwSW5kZXgpIHtcclxuICAgICAgc3RlcEluZGV4ID0gdGhpcy5hY3RpdmVTdGVwSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlU3RlcCA9IHRoaXMuc3RlcEFycmF5W3N0ZXBJbmRleF07XHJcbiAgICBpZiAoYWN0aXZlU3RlcCkge1xyXG4gICAgICBhY3RpdmVTdGVwLnN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRyb2wgY2xpY2thYmxlIHN0YXRlIG9mIGEgc3RlcFxyXG4gICAqIEBwYXJhbSBjbGlja2FibGUgd2V0aGVyIHRvIHNldCBhIHN0ZXAgdG8gY2xpY2thYmxlIG9yIG5vbi1jbGlja2FibGVcclxuICAgKiBAcGFyYW0gc3RlcEluZGV4IEluZGV4IG9mIHRoZSBzdGVwIHRvIGNoYW5nZS4gRGVmYXVsdHMgdG8gY3VycmVudCBhY3RpdmUgc3RlcFxyXG4gICAqL1xyXG4gIHNldENsaWNrYWJsZShjbGlja2FibGU6IGJvb2xlYW4sIHN0ZXBJbmRleD86IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKCFzdGVwSW5kZXgpIHtcclxuICAgICAgc3RlcEluZGV4ID0gdGhpcy5hY3RpdmVTdGVwSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0ZXBJbmRleCA8IHRoaXMuc3RlcEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN0ZXBBcnJheVtzdGVwSW5kZXhdLmNsaWNrYWJsZSA9IGNsaWNrYWJsZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcclxuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPHVsIGNsYXNzPVwibXVpLXN0ZXBwZXJcIj5cclxuICA8bGkgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHNcIiAoY2xpY2spPVwic3RlcC5jbGlja2FibGUgJiYgc2VsZWN0U3RlcChzdGVwKVwiIFtuZ0NsYXNzXT1cInN0ZXAuc3RlcENsYXNzZXNcIlxyXG4gICAgW25nU3R5bGVdPVwieyd3aWR0aCc6ICgxMDAgLyBudW1iZXJPZlN0ZXBzKSArICclJ31cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktc3RlcC1uYW1lXCI+e3tzdGVwLm5hbWV9fTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm11aS1zdGVwLWluZm9cIj57e3N0ZXAuaW5mb319PC9kaXY+XHJcbiAgPC9saT5cclxuPC91bD5cclxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4iXX0=