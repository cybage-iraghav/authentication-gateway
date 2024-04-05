import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MuiProgressStepComponent {
    constructor() {
        this._completedOverride = null;
        this.interacted = false;
        this.changed$ = new Subject();
    }
    /** Whether step is marked as completed. When setting a value for this, it will override the default handling
     * for completed state. */
    get completed() {
        return this._completedOverride == null ? this.getDefaultCompleted() : this._completedOverride;
    }
    set completed(value) {
        this._completedOverride = coerceBooleanProperty(value);
    }
    /** Emits on changes in this step */
    get changes() {
        return this.changed$.asObservable();
    }
    ngOnChanges(changes) {
        this.changed$.next();
    }
    markAsInteracted() {
        if (!this.interacted) {
            this.interacted = true;
            this.changed$.next();
        }
    }
    getDefaultCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
}
MuiProgressStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiProgressStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiProgressStepComponent, selector: "mui-progress-step", inputs: { label: "label", stepControl: "stepControl", completed: "completed" }, viewQueries: [{ propertyName: "content", first: true, predicate: TemplateRef, descendants: true, static: true }, { propertyName: "actionsTemplate", first: true, predicate: ["actions"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #actions>\r\n  <ng-content select=\"mui-step-actions, [muiStepActions]\"></ng-content>\r\n</ng-template>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-progress-step', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #actions>\r\n  <ng-content select=\"mui-step-actions, [muiStepActions]\"></ng-content>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], actionsTemplate: [{
                type: ViewChild,
                args: ['actions', { static: true }]
            }], label: [{
                type: Input
            }], stepControl: [{
                type: Input
            }], completed: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXByb2dyZXNzLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3Byb2dyZXNzLWJhci9tdWktcHJvZ3Jlc3Mtc3RlcC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvcHJvZ3Jlc3MtYmFyL211aS1wcm9ncmVzcy1zdGVwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQXVCM0MsTUFBTSxPQUFPLHdCQUF3QjtJQWNuQztRQU5BLHVCQUFrQixHQUFtQixJQUFJLENBQUM7UUFFMUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVYLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBR3ZDLENBQUM7SUFFRDs4QkFDMEI7SUFDMUIsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hHLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFtQjtRQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEYsQ0FBQzs7c0hBOUNVLHdCQUF3QjswR0FBeEIsd0JBQXdCLGtMQUV4QixXQUFXLDhMQ25DeEIsNkxBTUE7NEZEMkJhLHdCQUF3QjtrQkFMcEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBRVosdUJBQXVCLENBQUMsTUFBTTswRUFJTCxPQUFPO3NCQUFoRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ0EsZUFBZTtzQkFBdEQsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUU3QixLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFjRixTQUFTO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogc3Vic2V0IG9mIHByb3BlcnRpZXMgZnJvbSBBYnN0cmFjdENvbnRyb2wgZnJvbSBhbmd1bGFyIGZvcm1zLiBSZXBsaWNhdGVkIGhlcmUgdG8gbm90IG5lZWQgaW1wb3J0ICovXHJcbmludGVyZmFjZSBBYnN0cmFjdENvbnRyb2xMaWtlIHtcclxuICBkaXJ0eTogYm9vbGVhbjtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBlbmFibGVkOiBib29sZWFuO1xyXG4gIGludmFsaWQ6IGJvb2xlYW47XHJcbiAgcGVuZGluZzogYm9vbGVhbjtcclxuICBwcmlzdGluZTogYm9vbGVhbjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICB0b3VjaGVkOiBib29sZWFuO1xyXG4gIHVudG91Y2hlZDogYm9vbGVhbjtcclxuICB2YWxpZDogYm9vbGVhbjtcclxuXHJcbiAgbWFya0FsbEFzVG91Y2hlZCgpOiB2b2lkO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1wcm9ncmVzcy1zdGVwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXVpLXByb2dyZXNzLXN0ZXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlQcm9ncmVzc1N0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50OiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XHJcbiAgQFZpZXdDaGlsZCgnYWN0aW9ucycsIHsgc3RhdGljOiB0cnVlIH0pIGFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHN0ZXBDb250cm9sOiBBYnN0cmFjdENvbnRyb2xMaWtlIHwgbnVsbDtcclxuXHJcbiAgX2NvbXBsZXRlZE92ZXJyaWRlOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGludGVyYWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgc3RlcCBpcyBtYXJrZWQgYXMgY29tcGxldGVkLiBXaGVuIHNldHRpbmcgYSB2YWx1ZSBmb3IgdGhpcywgaXQgd2lsbCBvdmVycmlkZSB0aGUgZGVmYXVsdCBoYW5kbGluZ1xyXG4gICAqIGZvciBjb21wbGV0ZWQgc3RhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgY29tcGxldGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlZE92ZXJyaWRlID09IG51bGwgPyB0aGlzLmdldERlZmF1bHRDb21wbGV0ZWQoKSA6IHRoaXMuX2NvbXBsZXRlZE92ZXJyaWRlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbXBsZXRlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XHJcbiAgICB0aGlzLl9jb21wbGV0ZWRPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdHMgb24gY2hhbmdlcyBpbiB0aGlzIHN0ZXAgKi9cclxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmNoYW5nZWQkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy5jaGFuZ2VkJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBtYXJrQXNJbnRlcmFjdGVkKCkge1xyXG4gICAgaWYgKCF0aGlzLmludGVyYWN0ZWQpIHtcclxuICAgICAgdGhpcy5pbnRlcmFjdGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VkJC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERlZmF1bHRDb21wbGV0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGVwQ29udHJvbCA/IHRoaXMuc3RlcENvbnRyb2wudmFsaWQgJiYgdGhpcy5pbnRlcmFjdGVkIDogdGhpcy5pbnRlcmFjdGVkO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPG5nLXRlbXBsYXRlPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNhY3Rpb25zPlxyXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIm11aS1zdGVwLWFjdGlvbnMsIFttdWlTdGVwQWN0aW9uc11cIj48L25nLWNvbnRlbnQ+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==