import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, Input, Optional } from '@angular/core';
import { MuiIconModule } from '@mapp-ui/common';
import { merge } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/sort";
import * as i2 from "@angular/common";
import * as i3 from "@mapp-ui/common";
/**
 * Component for creating a sorting header in a table column.
 * Needs to be used together with MatTable and MatSort.
 */
export class MuiSortHeaderComponent {
    constructor(cdr, _sort, _columnDef) {
        this.cdr = cdr;
        this._sort = _sort;
        this._columnDef = _columnDef;
        this.hostClassName = 'mui-sort-header';
        /** The direction the arrow should be facing according to the current state. */
        this._arrowDirection = '';
        /** ID for the icon to be displayed */
        this._sortIcon = 'caret_up_down';
        this._disabled = false;
    }
    /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
    get disableClear() {
        return this._disableClear;
    }
    set disableClear(v) {
        this._disableClear = coerceBooleanProperty(v);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnInit() {
        if (!this.id && this._columnDef) {
            this.id = this._columnDef.name;
        }
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this._sort.register(this);
        this._handleStateChanges();
    }
    ngOnDestroy() {
        this._sort.deregister(this);
        this._updateSubscription.unsubscribe();
    }
    _isDisabled() {
        return this._sort.disabled || this.disabled;
    }
    _handleClick() {
        if (!this._isDisabled()) {
            this._sort.sort(this);
        }
    }
    _updateArrowDirection() {
        if (this._isSorted()) {
            this._arrowDirection = this._sort.direction;
            this._sortIcon = this._sort.direction === 'asc' ? 'caret-up' : 'caret-down';
        }
        else {
            this._arrowDirection = this.start || this._sort.start;
            this._sortIcon = 'caret_up_down';
        }
    }
    /** Whether this MuiSortHeader is currently sorted in either ascending or descending order. */
    _isSorted() {
        return (this._sort.active == this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc'));
    }
    _handleStateChanges() {
        this._updateSubscription = merge(this._sort.sortChange, this._sort._stateChanges)
            .subscribe(() => {
            this._updateArrowDirection();
            this.cdr.markForCheck();
        });
    }
}
MuiSortHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSortHeaderComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.MatSort, optional: true }, { token: 'MAT_SORT_HEADER_COLUMN_DEF', optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiSortHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiSortHeaderComponent, isStandalone: true, selector: "mui-sort-header", inputs: { id: ["mui-sort-header", "id"], start: "start", disableClear: "disableClear", disabled: "disabled" }, host: { listeners: { "click": "_handleClick()" }, properties: { "class": "this.hostClassName" } }, exportAs: ["muiSortHeader"], ngImport: i0, template: "<div class=\"mui-sort-header-container\"\r\n    [class.disabled]=\"_isDisabled()\"\r\n    [attr.tabindex]=\"_isDisabled() ? null : 0\"\r\n    [attr.role]=\"_isDisabled() ? null : 'button'\">\r\n\r\n  <div class=\"mui-sort-header-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <mui-icon *ngIf=\"!_isDisabled()\">{{ _sortIcon }}</mui-icon>\r\n</div>\r\n", styles: [".mui-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}.mui-sort-header-container.disabled{cursor:default}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i3.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiSortHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-sort-header', exportAs: 'muiSortHeader', standalone: true, imports: [CommonModule, MuiIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-sort-header-container\"\r\n    [class.disabled]=\"_isDisabled()\"\r\n    [attr.tabindex]=\"_isDisabled() ? null : 0\"\r\n    [attr.role]=\"_isDisabled() ? null : 'button'\">\r\n\r\n  <div class=\"mui-sort-header-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <mui-icon *ngIf=\"!_isDisabled()\">{{ _sortIcon }}</mui-icon>\r\n</div>\r\n", styles: [".mui-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}.mui-sort-header-container.disabled{cursor:default}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.MatSort, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['MAT_SORT_HEADER_COLUMN_DEF']
                }, {
                    type: Optional
                }] }]; }, propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], id: [{
                type: Input,
                args: ['mui-sort-header']
            }], start: [{
                type: Input
            }], disableClear: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXNvcnQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi90YWJsZS9zb3J0LWhlYWRlci9tdWktc29ydC1oZWFkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3RhYmxlL3NvcnQtaGVhZGVyL211aS1zb3J0LWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7OztBQU0zQzs7O0dBR0c7QUFVSCxNQUFNLE9BQU8sc0JBQXNCO0lBc0JqQyxZQUNZLEdBQXNCLEVBQ1YsS0FBYyxFQUN1QixVQUFrQztRQUZuRixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDdUIsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7UUF4QmhFLGtCQUFhLEdBQUcsaUJBQWlCLENBQUM7UUFFakUsK0VBQStFO1FBQy9FLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztRQVdwQyxzQ0FBc0M7UUFDdEMsY0FBUyxHQUFnRCxlQUFlLENBQUM7UUFHakUsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVExQixDQUFDO0lBRUQsd0ZBQXdG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QUNQLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxtQkFHckIsdUJBQXVCLENBQUMsTUFBTTs7MEJBMEIxQyxRQUFROzswQkFDUixNQUFNOzJCQUFDLDRCQUE0Qjs7MEJBQUcsUUFBUTs0Q0F4QnBCLGFBQWE7c0JBQTNDLFdBQVc7dUJBQUMsT0FBTztnQkFTTSxFQUFFO3NCQUEzQixLQUFLO3VCQUFDLGlCQUFpQjtnQkFHZixLQUFLO3NCQUFiLEtBQUs7Z0JBa0JGLFlBQVk7c0JBRGYsS0FBSztnQkFVRixRQUFRO3NCQURYLEtBQUs7Z0JBOEJOLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U29ydCwgTWF0U29ydGFibGUsIFNvcnREaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcclxuaW1wb3J0IHsgTXVpSWNvbk1vZHVsZSB9IGZyb20gJ0BtYXBwLXVpL2NvbW1vbic7XHJcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmludGVyZmFjZSBNYXRTb3J0SGVhZGVyQ29sdW1uRGVmIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgZm9yIGNyZWF0aW5nIGEgc29ydGluZyBoZWFkZXIgaW4gYSB0YWJsZSBjb2x1bW4uXHJcbiAqIE5lZWRzIHRvIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBNYXRUYWJsZSBhbmQgTWF0U29ydC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXNvcnQtaGVhZGVyJyxcclxuICBleHBvcnRBczogJ211aVNvcnRIZWFkZXInLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTXVpSWNvbk1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1zb3J0LWhlYWRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXVpLXNvcnQtaGVhZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE11aVNvcnRIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBNYXRTb3J0YWJsZSwgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSByZWFkb25seSBob3N0Q2xhc3NOYW1lID0gJ211aS1zb3J0LWhlYWRlcic7XHJcblxyXG4gIC8qKiBUaGUgZGlyZWN0aW9uIHRoZSBhcnJvdyBzaG91bGQgYmUgZmFjaW5nIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBzdGF0ZS4gKi9cclxuICBfYXJyb3dEaXJlY3Rpb246IFNvcnREaXJlY3Rpb24gPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSUQgb2YgdGhpcyBzb3J0IGhlYWRlci4gSWYgdXNlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYSBDZGtDb2x1bW5EZWYsIHRoaXMgd2lsbCBkZWZhdWx0IHRvXHJcbiAgICogdGhlIGNvbHVtbidzIG5hbWUuXHJcbiAgICovXHJcbiAgQElucHV0KCdtdWktc29ydC1oZWFkZXInKSBpZDogc3RyaW5nO1xyXG5cclxuICAvKiogT3ZlcnJpZGVzIHRoZSBzb3J0IHN0YXJ0IHZhbHVlIG9mIHRoZSBjb250YWluaW5nIE1hdFNvcnQgZm9yIHRoaXMgTWF0U29ydGFibGUuICovXHJcbiAgQElucHV0KCkgc3RhcnQ6IFNvcnREaXJlY3Rpb247XHJcblxyXG4gIC8qKiBJRCBmb3IgdGhlIGljb24gdG8gYmUgZGlzcGxheWVkICovXHJcbiAgX3NvcnRJY29uOiAnY2FyZXRfdXBfZG93bicgfCAnY2FyZXQtdXAnIHwgJ2NhcmV0LWRvd24nID0gJ2NhcmV0X3VwX2Rvd24nO1xyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlQ2xlYXI6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIF91cGRhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfc29ydDogTWF0U29ydCxcclxuICAgICAgQEluamVjdCgnTUFUX1NPUlRfSEVBREVSX0NPTFVNTl9ERUYnKSBAT3B0aW9uYWwoKSBwdWJsaWMgX2NvbHVtbkRlZjogTWF0U29ydEhlYWRlckNvbHVtbkRlZlxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgLyoqIE92ZXJyaWRlcyB0aGUgZGlzYWJsZSBjbGVhciB2YWx1ZSBvZiB0aGUgY29udGFpbmluZyBNYXRTb3J0IGZvciB0aGlzIE1hdFNvcnRhYmxlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVDbGVhcigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlQ2xlYXI7XHJcbiAgfVxyXG5cclxuICBzZXQgZGlzYWJsZUNsZWFyKHY6IEJvb2xlYW5JbnB1dCkge1xyXG4gICAgdGhpcy5fZGlzYWJsZUNsZWFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaWQgJiYgdGhpcy5fY29sdW1uRGVmKSB7XHJcbiAgICAgIHRoaXMuaWQgPSB0aGlzLl9jb2x1bW5EZWYubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGFycm93IGFuZCBzZXQgdGhlIHZpZXcgc3RhdGUgdG8gYmUgaW1tZWRpYXRlbHkgdGhhdCBzdGF0ZS5cclxuICAgIHRoaXMuX3VwZGF0ZUFycm93RGlyZWN0aW9uKCk7XHJcbiAgICB0aGlzLl9zb3J0LnJlZ2lzdGVyKHRoaXMpO1xyXG4gICAgdGhpcy5faGFuZGxlU3RhdGVDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NvcnQuZGVyZWdpc3Rlcih0aGlzKTtcclxuICAgIHRoaXMuX3VwZGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgX2lzRGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydC5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIF9oYW5kbGVDbGljaygpIHtcclxuICAgIGlmICghdGhpcy5faXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgIHRoaXMuX3NvcnQuc29ydCh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZUFycm93RGlyZWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzU29ydGVkKCkpIHtcclxuICAgICAgdGhpcy5fYXJyb3dEaXJlY3Rpb24gPSB0aGlzLl9zb3J0LmRpcmVjdGlvbjtcclxuICAgICAgdGhpcy5fc29ydEljb24gPSB0aGlzLl9zb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYycgPyAnY2FyZXQtdXAnIDogJ2NhcmV0LWRvd24nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYXJyb3dEaXJlY3Rpb24gPSB0aGlzLnN0YXJ0IHx8IHRoaXMuX3NvcnQuc3RhcnQ7XHJcbiAgICAgIHRoaXMuX3NvcnRJY29uID0gJ2NhcmV0X3VwX2Rvd24nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhpcyBNdWlTb3J0SGVhZGVyIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gZWl0aGVyIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAqL1xyXG4gIHByaXZhdGUgX2lzU29ydGVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICB0aGlzLl9zb3J0LmFjdGl2ZSA9PSB0aGlzLmlkICYmXHJcbiAgICAgICAgKHRoaXMuX3NvcnQuZGlyZWN0aW9uID09PSAnYXNjJyB8fCB0aGlzLl9zb3J0LmRpcmVjdGlvbiA9PT0gJ2Rlc2MnKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZVN0YXRlQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuX3VwZGF0ZVN1YnNjcmlwdGlvbiA9IG1lcmdlKFxyXG4gICAgICAgIHRoaXMuX3NvcnQuc29ydENoYW5nZSxcclxuICAgICAgICB0aGlzLl9zb3J0Ll9zdGF0ZUNoYW5nZXNcclxuICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3VwZGF0ZUFycm93RGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktc29ydC1oZWFkZXItY29udGFpbmVyXCJcclxuICAgIFtjbGFzcy5kaXNhYmxlZF09XCJfaXNEaXNhYmxlZCgpXCJcclxuICAgIFthdHRyLnRhYmluZGV4XT1cIl9pc0Rpc2FibGVkKCkgPyBudWxsIDogMFwiXHJcbiAgICBbYXR0ci5yb2xlXT1cIl9pc0Rpc2FibGVkKCkgPyBudWxsIDogJ2J1dHRvbidcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cIm11aS1zb3J0LWhlYWRlci1jb250ZW50XCI+XHJcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxtdWktaWNvbiAqbmdJZj1cIiFfaXNEaXNhYmxlZCgpXCI+e3sgX3NvcnRJY29uIH19PC9tdWktaWNvbj5cclxuPC9kaXY+XHJcbiJdfQ==