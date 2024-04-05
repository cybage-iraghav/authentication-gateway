import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MuiStepComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this._active = false;
        this._clickable = false;
        this._status = '';
        this.stepClasses = {};
        /**
         * Emits when internal state of step changes. Allows parent component to track and issue change detector refresh.
         */
        this.stateChanges = new EventEmitter();
    }
    get name() {
        return this._name;
    }
    /**
     * Main label to display for the step
     */
    set name(value) {
        this._name = value;
        this.onStateChanged();
    }
    get info() {
        return this._info;
    }
    /**
     * Additional Info to display below the main label
     */
    set info(value) {
        this._info = value;
        this.onStateChanged();
    }
    get active() {
        return this._active;
    }
    /**
     * Wether the step is currently active or not
     */
    set active(value) {
        this._active = value;
        this.onStateChanged();
    }
    get clickable() {
        return this._clickable;
    }
    /**
     * Control if the step should be clickable
     */
    set clickable(value) {
        this._clickable = value;
        this.onStateChanged();
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
        this.onStateChanged();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    onStateChanged() {
        this.setStepClasses();
        this.cdr.markForCheck();
        this.stateChanges.emit();
    }
    setStepClasses() {
        this.stepClasses = {
            'mui-state-active': this._active,
            'mui-clickable': this._clickable,
            'mui-state-error': this._status === 'error',
            'mui-state-edit': this._status === 'edit',
            'mui-state-done': this._status === 'done'
        };
    }
}
MuiStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepComponent, selector: "mui-step", inputs: { name: "name", info: "info", active: "active", clickable: "clickable", status: "status" }, outputs: { stateChanges: "stateChanges" }, exportAs: ["muiStep"], ngImport: i0, template: `
    <div *ngIf="active" class="mui-step-content">
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [".mui-step-content{padding:24px 0;width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-step', exportAs: 'muiStep', template: `
    <div *ngIf="active" class="mui-step-content">
      <ng-content></ng-content>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mui-step-content{padding:24px 0;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { stateChanges: [{
                type: Output
            }], name: [{
                type: Input
            }], info: [{
                type: Input
            }], active: [{
                type: Input
            }], clickable: [{
                type: Input
            }], status: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9zdGVwcGVyL211aS1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBc0JuSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZ0IzQixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVpsQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsWUFBTyxHQUFnQixFQUFFLENBQUM7UUFFbEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakI7O1dBRUc7UUFDTyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFJbEQsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQ0ksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUNJLE1BQU0sQ0FBQyxLQUFpQjtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNoQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDaEMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPO1lBQzNDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTTtZQUN6QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU07U0FDMUMsQ0FBQztJQUNKLENBQUM7OzhHQW5HVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQixzTkFQakI7Ozs7R0FJVDs0RkFHVSxnQkFBZ0I7a0JBaEI1QixTQUFTOytCQUNFLFVBQVUsWUFDVixTQUFTLFlBT1Q7Ozs7R0FJVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTTt3R0FlckMsWUFBWTtzQkFBckIsTUFBTTtnQkFjSCxJQUFJO3NCQURQLEtBQUs7Z0JBY0YsSUFBSTtzQkFEUCxLQUFLO2dCQWNGLE1BQU07c0JBRFQsS0FBSztnQkFjRixTQUFTO3NCQURaLEtBQUs7Z0JBV0YsTUFBTTtzQkFEVCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSB7IE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFN0ZXBTdGF0dXMgPSAnJyB8ICdlcnJvcicgfCAnZWRpdCcgfCAnZG9uZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1zdGVwJyxcclxuICBleHBvcnRBczogJ211aVN0ZXAnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5tdWktc3RlcC1jb250ZW50IHtcclxuICAgICAgcGFkZGluZzogMjRweCAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cImFjdGl2ZVwiIGNsYXNzPVwibXVpLXN0ZXAtY29udGVudFwiPlxyXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBpZC1ibGFja2xpc3QsIGlkLW1hdGNoICovXHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2luZm86IHN0cmluZztcclxuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcclxuICBwcml2YXRlIF9jbGlja2FibGUgPSBmYWxzZTtcclxuICBwcml2YXRlIF9zdGF0dXM6IFN0ZXBTdGF0dXMgID0gJyc7XHJcblxyXG4gIHN0ZXBDbGFzc2VzID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHdoZW4gaW50ZXJuYWwgc3RhdGUgb2Ygc3RlcCBjaGFuZ2VzLiBBbGxvd3MgcGFyZW50IGNvbXBvbmVudCB0byB0cmFjayBhbmQgaXNzdWUgY2hhbmdlIGRldGVjdG9yIHJlZnJlc2guXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFpbiBsYWJlbCB0byBkaXNwbGF5IGZvciB0aGUgc3RlcFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGluZm8oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmZvO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkaXRpb25hbCBJbmZvIHRvIGRpc3BsYXkgYmVsb3cgdGhlIG1haW4gbGFiZWxcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBpbmZvKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2luZm8gPSB2YWx1ZTtcclxuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2V0aGVyIHRoZSBzdGVwIGlzIGN1cnJlbnRseSBhY3RpdmUgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcclxuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGdldCBjbGlja2FibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xpY2thYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udHJvbCBpZiB0aGUgc3RlcCBzaG91bGQgYmUgY2xpY2thYmxlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgY2xpY2thYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9jbGlja2FibGUgPSB2YWx1ZTtcclxuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGdldCBzdGF0dXMoKTogU3RlcFN0YXR1cyB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc3RhdHVzKHZhbHVlOiBTdGVwU3RhdHVzKSB7XHJcbiAgICB0aGlzLl9zdGF0dXMgPSB2YWx1ZTtcclxuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TdGF0ZUNoYW5nZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldFN0ZXBDbGFzc2VzKCk7XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U3RlcENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0ZXBDbGFzc2VzID0ge1xyXG4gICAgICAnbXVpLXN0YXRlLWFjdGl2ZSc6IHRoaXMuX2FjdGl2ZSxcclxuICAgICAgJ211aS1jbGlja2FibGUnOiB0aGlzLl9jbGlja2FibGUsXHJcbiAgICAgICdtdWktc3RhdGUtZXJyb3InOiB0aGlzLl9zdGF0dXMgPT09ICdlcnJvcicsXHJcbiAgICAgICdtdWktc3RhdGUtZWRpdCc6IHRoaXMuX3N0YXR1cyA9PT0gJ2VkaXQnLFxyXG4gICAgICAnbXVpLXN0YXRlLWRvbmUnOiB0aGlzLl9zdGF0dXMgPT09ICdkb25lJ1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19