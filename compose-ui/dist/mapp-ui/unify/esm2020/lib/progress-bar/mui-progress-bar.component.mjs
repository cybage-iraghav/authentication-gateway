import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChildren, Input } from '@angular/core';
import { merge, Subject, switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MuiProgressStepComponent } from './mui-progress-step.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@mapp-ui/common";
import * as i3 from "@angular/material/card";
import * as i4 from "./mui-step-header.component";
export class MuiProgressBarComponent {
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
        const newIndex = coerceNumberProperty(index);
        if (newIndex < 0 || (newIndex > this.steps?.length)) {
            throw Error('muiStepper: cannot set selected index out of bounds.');
        }
        if (this.steps) {
            this.selected?.markAsInteracted();
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
        if (this.selected?.stepControl?.invalid || this.selected?.stepControl?.pending) {
            this.selected.stepControl.markAllAsTouched();
            this.selected.markAsInteracted();
        }
        else {
            this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
        }
    }
}
MuiProgressBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiProgressBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiProgressBarComponent, selector: "mui-progress-bar", inputs: { stepperTitle: "stepperTitle", manualButtonHandling: "manualButtonHandling", selectedIndex: "selectedIndex", selected: "selected" }, queries: [{ propertyName: "steps", predicate: MuiProgressStepComponent }], ngImport: i0, template: "<div class=\"mui-progress-bar-wrapper\">\r\n  <div class=\"mui-progress-header-container\">\r\n    <div *ngIf=\"stepperTitle\"\r\n        class=\"mui-progress-bar-title mat-h4\">{{ stepperTitle }}</div>\r\n    <div class=\"mui-progress-steps-container\">\r\n      <ng-container *ngFor=\"let step of steps; let i = index; let isLast = last\">\r\n        <mui-step-header\r\n            (click)=\"stepClicked(i, step)\"\r\n            [active]=\"isStepActive(i)\"\r\n            [completed]=\"step.completed\"\r\n            [label]=\"step.label\"\r\n            [selected]=\"selectedIndex === i\"\r\n        ></mui-step-header>\r\n        <div *ngIf=\"!isLast\"\r\n            class=\"mui-step-divider\">\r\n          <mui-icon>chevron_right</mui-icon>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-progress-bar-content-container\">\r\n    <mat-card appearance=\"outlined\">\r\n      <div *ngFor=\"let step of steps; let i = index;\"\r\n          [class.mui-progress-bar-content-hidden]=\"selectedIndex !== i\"\r\n          class=\"mui-progress-bar-content\"\r\n      >\r\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\r\n\r\n      </div>\r\n    </mat-card>\r\n  </div>\r\n  <ng-container [ngTemplateOutlet]=\"selected?.actionsTemplate ?? null\"></ng-container>\r\n</div>\r\n", styles: [".mui-progress-bar-wrapper{overflow:hidden;display:flex;flex-direction:column;height:100%}.mui-progress-header-container{background-color:#fff;height:56px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;flex:0 0 auto;z-index:2;position:relative;box-shadow:0 0 4px #ccd3df66}.mui-progress-steps-container{display:flex;align-items:center;justify-content:center}.mui-progress-bar-title{padding-left:40px}.mui-progress-bar-title.mat-h4{margin:0}.mui-progress-bar-content-container{flex:1 1 auto;padding:24px;box-sizing:border-box;position:relative;overflow:auto}.mui-progress-bar-content-container>.mat-mdc-card{padding:40px 40px 24px}.mui-progress-bar-content-hidden{visibility:hidden;overflow:hidden;height:0}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }, { kind: "component", type: i3.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "component", type: i4.MuiStepHeaderComponent, selector: "mui-step-header", inputs: ["label", "active", "completed", "selected"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXByb2dyZXNzLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvcHJvZ3Jlc3MtYmFyL211aS1wcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3Byb2dyZXNzLWJhci9tdWktcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixLQUFLLEVBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7O0FBU3pFLE1BQU0sT0FBTyx1QkFBdUI7SUFpQmxDLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBVnpDOzs7O3VDQUkrQjtRQUN0Qix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFFOUIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFHekMsQ0FBQztJQUVELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxhQUFhLENBQUMsS0FBa0I7UUFDbEMsTUFBTSxRQUFRLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0MsSUFBSSxRQUFRLEdB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QjtrQkFObkMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTTt3R0FJSixLQUFLO3NCQUEvQyxlQUFlO3VCQUFDLHdCQUF3QjtnQkFHaEMsWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBU0YsYUFBYTtzQkFEaEIsS0FBSztnQkFxQkYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIFF1ZXJ5TGlzdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTXVpUHJvZ3Jlc3NTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9tdWktcHJvZ3Jlc3Mtc3RlcC5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXByb2dyZXNzLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1wcm9ncmVzcy1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL211aS1wcm9ncmVzcy1iYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpUHJvZ3Jlc3NCYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE11aVByb2dyZXNzU3RlcENvbXBvbmVudCkgc3RlcHM6IFF1ZXJ5TGlzdDxNdWlQcm9ncmVzc1N0ZXBDb21wb25lbnQ+O1xyXG5cclxuICAvKiogU2V0IGEgdGl0bGUgZm9yIHRoZSBzdGVwcGVyLiBEaXNwbGF5ZWQgb24gdGhlIGxlZnQgc2lkZSBvZiB0aGUgc3RlcHBlciBoZWFkZXIgKi9cclxuICBASW5wdXQoKSBzdGVwcGVyVGl0bGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBvdmVycmlkZSB0aGUgZGlzYWJsZWQgc3RhdGUgaGFuZGxpbmcgb2YgdGhlICdOZXh0JyBidXR0b24uIEJ5IGRlZmF1bHQsIGJ1dHRvbiBpcyBkaXNhYmxlZCBhcyBsb25nXHJcbiAgICogYXMgdGhlIENvbnRyb2wgY29tcG9uZW50IGJvdW5kIHRvIFtzdGVwQ29udHJvbF0gaXMgaW52YWxpZC4gQnkgc2V0dGluZyB0aGlzIGlucHV0IHRvIHRydWUsIHRoZSBidXR0b24ncyBkaXNhYmxlZFxyXG4gICAqIHN0YXRlIHdpbGwgbmVlZCB0byBiZSBoYW5kbGVkIG1hbnVhbGx5LiBJZiBubyBbc3RlcENvbnRyb2xdIGlzIGFzc2lnbmVkLCBidXR0b24gc3RhdGUgd2lsbCBuZWVkIHRvIGJlXHJcbiAgICogaGFuZGxlZCBtYW51YWxseSBhcyB3ZWxsLiAqL1xyXG4gIEBJbnB1dCgpIG1hbnVhbEJ1dHRvbkhhbmRsaW5nID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXggPSAwO1xyXG4gIHByaXZhdGUgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcclxuICB9XHJcblxyXG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4OiBOdW1iZXJJbnB1dCkge1xyXG4gICAgY29uc3QgbmV3SW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShpbmRleCk7XHJcblxyXG4gICAgaWYgKG5ld0luZGV4IDwgMCB8fCAobmV3SW5kZXggPiB0aGlzLnN0ZXBzPy5sZW5ndGgpKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdtdWlTdGVwcGVyOiBjYW5ub3Qgc2V0IHNlbGVjdGVkIGluZGV4IG91dCBvZiBib3VuZHMuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RlcHMpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZD8ubWFya0FzSW50ZXJhY3RlZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IG5ld0luZGV4O1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc3RlcCB0aGF0IGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IE11aVByb2dyZXNzU3RlcENvbXBvbmVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGVwcyA/IHRoaXMuc3RlcHMudG9BcnJheSgpW3RoaXMuc2VsZWN0ZWRJbmRleF0gOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgc2VsZWN0ZWQoc3RlcDogTXVpUHJvZ3Jlc3NTdGVwQ29tcG9uZW50IHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzdGVwICYmIHRoaXMuc3RlcHMgP1xyXG4gICAgICAgIHRoaXMuc3RlcHMudG9BcnJheSgpXHJcbiAgICAgICAgICAgIC5pbmRleE9mKHN0ZXApIDpcclxuICAgICAgICAtMTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vIG1vbml0b3IgY2hhbmdlcyBvZiBtdWktc3RlcCBjaGlsZHJlblxyXG4gICAgdGhpcy5zdGVwcy5jaGFuZ2VzXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN0ZXBDaGFuZ2VzID0gdGhpcy5zdGVwcy5tYXAoc3RlcCA9PiBzdGVwLmNoYW5nZXMpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBtZXJnZSguLi5zdGVwQ2hhbmdlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHN0YXRlQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKClcclxuICB9XHJcblxyXG4gIGlzU3RlcEFjdGl2ZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBzdGVwQ2xpY2tlZChcclxuICAgICAgaW5kZXg6IG51bWJlcixcclxuICAgICAgc3RlcDogTXVpUHJvZ3Jlc3NTdGVwQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc1N0ZXBBY3RpdmUoaW5kZXgpICYmIGluZGV4ICE9PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHN0ZXA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgc3RlcCwgaWYgdGhlcmUgYXJlIG5vIGVycm9ycyBvbiB0aGUgY3VycmVudCBzdGVwLlxyXG4gICAqIE90aGVyd2lzZSwgaWYgdGhlIGN1cnJlbnQgc3RlcCBmb3JtIGlzIGludmFsaWQsIG1hcmtzIGFsbCBmaWVsZHMgYXMgdG91Y2hlZCB0byB0cmlnZ2VyIGVycm9yIGRpc3BsYXkuXHJcbiAgICovXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkPy5zdGVwQ29udHJvbD8uaW52YWxpZCB8fCB0aGlzLnNlbGVjdGVkPy5zdGVwQ29udHJvbD8ucGVuZGluZykge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkLnN0ZXBDb250cm9sLm1hcmtBbGxBc1RvdWNoZWQoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZC5tYXJrQXNJbnRlcmFjdGVkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1pbih0aGlzLl9zZWxlY3RlZEluZGV4ICsgMSwgdGhpcy5zdGVwcy5sZW5ndGggLSAxKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktcHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLXByb2dyZXNzLWhlYWRlci1jb250YWluZXJcIj5cclxuICAgIDxkaXYgKm5nSWY9XCJzdGVwcGVyVGl0bGVcIlxyXG4gICAgICAgIGNsYXNzPVwibXVpLXByb2dyZXNzLWJhci10aXRsZSBtYXQtaDRcIj57eyBzdGVwcGVyVGl0bGUgfX08L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWktcHJvZ3Jlc3Mtc3RlcHMtY29udGFpbmVyXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpID0gaW5kZXg7IGxldCBpc0xhc3QgPSBsYXN0XCI+XHJcbiAgICAgICAgPG11aS1zdGVwLWhlYWRlclxyXG4gICAgICAgICAgICAoY2xpY2spPVwic3RlcENsaWNrZWQoaSwgc3RlcClcIlxyXG4gICAgICAgICAgICBbYWN0aXZlXT1cImlzU3RlcEFjdGl2ZShpKVwiXHJcbiAgICAgICAgICAgIFtjb21wbGV0ZWRdPVwic3RlcC5jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICBbbGFiZWxdPVwic3RlcC5sYWJlbFwiXHJcbiAgICAgICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCJcclxuICAgICAgICA+PC9tdWktc3RlcC1oZWFkZXI+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIiFpc0xhc3RcIlxyXG4gICAgICAgICAgICBjbGFzcz1cIm11aS1zdGVwLWRpdmlkZXJcIj5cclxuICAgICAgICAgIDxtdWktaWNvbj5jaGV2cm9uX3JpZ2h0PC9tdWktaWNvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLXByb2dyZXNzLWJhci1jb250ZW50LWNvbnRhaW5lclwiPlxyXG4gICAgPG1hdC1jYXJkIGFwcGVhcmFuY2U9XCJvdXRsaW5lZFwiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzdGVwIG9mIHN0ZXBzOyBsZXQgaSA9IGluZGV4O1wiXHJcbiAgICAgICAgICBbY2xhc3MubXVpLXByb2dyZXNzLWJhci1jb250ZW50LWhpZGRlbl09XCJzZWxlY3RlZEluZGV4ICE9PSBpXCJcclxuICAgICAgICAgIGNsYXNzPVwibXVpLXByb2dyZXNzLWJhci1jb250ZW50XCJcclxuICAgICAgPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RlcC5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbWF0LWNhcmQ+XHJcbiAgPC9kaXY+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWxlY3RlZD8uYWN0aW9uc1RlbXBsYXRlID8/IG51bGxcIj48L25nLWNvbnRhaW5lcj5cclxuPC9kaXY+XHJcbiJdfQ==