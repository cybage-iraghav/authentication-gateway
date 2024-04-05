import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This directive can be placed on a table row which should be expandable to reveal additional details.
 * It handles necessary class assignments as well as adding a click handler on the row which will notify
 * by output event when the row is expanded or collapsed.
 */
export class MuiExpandableRowDirective {
    constructor() {
        this.hostClassName = 'mui-expandable-row';
        /** Control if the row is currently in expanded (true) or collapsed state (false). */
        this.muiExpandableRow = false;
        /**
         * Emits the new target state when the expandable row is clicked.
         * true => row is expanded
         * false => row is collapsed
         */
        this.expandableRowToggled = new EventEmitter();
    }
    get isExpanded() {
        return this.muiExpandableRow;
    }
    onRowClicked(event) {
        // only emit event when a non-interactive part of the row was clicked.
        if (!event.target.className.includes('mat-mdc-button-touch-target')) {
            this.expandableRowToggled.emit(!this.muiExpandableRow);
        }
    }
}
MuiExpandableRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiExpandableRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiExpandableRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiExpandableRowDirective, isStandalone: true, selector: "tr[muiExpandableRow]", inputs: { muiExpandableRow: "muiExpandableRow" }, outputs: { expandableRowToggled: "expandableRowToggled" }, host: { listeners: { "click": "onRowClicked($event)" }, properties: { "class": "this.hostClassName", "class.expanded": "this.isExpanded" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiExpandableRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'tr[muiExpandableRow]',
                    standalone: true
                }]
        }], propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], muiExpandableRow: [{
                type: Input
            }], expandableRowToggled: [{
                type: Output
            }], isExpanded: [{
                type: HostBinding,
                args: ['class.expanded']
            }], onRowClicked: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWV4cGFuZGFibGUtcm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi90YWJsZS9leHBhbmQtcm93L211aS1leHBhbmRhYmxlLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRzs7OztHQUlHO0FBS0gsTUFBTSxPQUFPLHlCQUF5QjtJQUp0QztRQU9XLGtCQUFhLEdBQUcsb0JBQW9CLENBQUM7UUFFOUMscUZBQXFGO1FBRXJGLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6Qjs7OztXQUlHO1FBRUgseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztLQWVwRDtJQWJDLElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFHRCxZQUFZLENBQUMsS0FBaUI7UUFDNUIsc0VBQXNFO1FBQ3RFLElBQUksQ0FBRSxLQUFLLENBQUMsTUFBc0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLEVBQUU7WUFDcEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7dUhBNUJVLHlCQUF5QjsyR0FBekIseUJBQXlCOzRGQUF6Qix5QkFBeUI7a0JBSnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzhCQUlVLGFBQWE7c0JBRHJCLFdBQVc7dUJBQUMsT0FBTztnQkFLcEIsZ0JBQWdCO3NCQURmLEtBQUs7Z0JBU04sb0JBQW9CO3NCQURuQixNQUFNO2dCQUlILFVBQVU7c0JBRGIsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBTTdCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIGNhbiBiZSBwbGFjZWQgb24gYSB0YWJsZSByb3cgd2hpY2ggc2hvdWxkIGJlIGV4cGFuZGFibGUgdG8gcmV2ZWFsIGFkZGl0aW9uYWwgZGV0YWlscy5cclxuICogSXQgaGFuZGxlcyBuZWNlc3NhcnkgY2xhc3MgYXNzaWdubWVudHMgYXMgd2VsbCBhcyBhZGRpbmcgYSBjbGljayBoYW5kbGVyIG9uIHRoZSByb3cgd2hpY2ggd2lsbCBub3RpZnlcclxuICogYnkgb3V0cHV0IGV2ZW50IHdoZW4gdGhlIHJvdyBpcyBleHBhbmRlZCBvciBjb2xsYXBzZWQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ3RyW211aUV4cGFuZGFibGVSb3ddJyxcclxuICBzdGFuZGFsb25lOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlFeHBhbmRhYmxlUm93RGlyZWN0aXZlIHtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgcmVhZG9ubHkgaG9zdENsYXNzTmFtZSA9ICdtdWktZXhwYW5kYWJsZS1yb3cnO1xyXG5cclxuICAvKiogQ29udHJvbCBpZiB0aGUgcm93IGlzIGN1cnJlbnRseSBpbiBleHBhbmRlZCAodHJ1ZSkgb3IgY29sbGFwc2VkIHN0YXRlIChmYWxzZSkuICovXHJcbiAgQElucHV0KClcclxuICBtdWlFeHBhbmRhYmxlUm93ID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHRoZSBuZXcgdGFyZ2V0IHN0YXRlIHdoZW4gdGhlIGV4cGFuZGFibGUgcm93IGlzIGNsaWNrZWQuXHJcbiAgICogdHJ1ZSA9PiByb3cgaXMgZXhwYW5kZWRcclxuICAgKiBmYWxzZSA9PiByb3cgaXMgY29sbGFwc2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXhwYW5kYWJsZVJvd1RvZ2dsZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZXhwYW5kZWQnKVxyXG4gIGdldCBpc0V4cGFuZGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubXVpRXhwYW5kYWJsZVJvdztcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBvblJvd0NsaWNrZWQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIC8vIG9ubHkgZW1pdCBldmVudCB3aGVuIGEgbm9uLWludGVyYWN0aXZlIHBhcnQgb2YgdGhlIHJvdyB3YXMgY2xpY2tlZC5cclxuICAgIGlmICghKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NOYW1lLmluY2x1ZGVzKCdtYXQtbWRjLWJ1dHRvbi10b3VjaC10YXJnZXQnKSkge1xyXG4gICAgICB0aGlzLmV4cGFuZGFibGVSb3dUb2dnbGVkLmVtaXQoIXRoaXMubXVpRXhwYW5kYWJsZVJvdyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=