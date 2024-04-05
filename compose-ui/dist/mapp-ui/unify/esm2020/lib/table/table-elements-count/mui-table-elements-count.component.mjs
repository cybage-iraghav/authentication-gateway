import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Simple component which renders the amount of elements displayed, based on given input data.
 */
export class MuiTableElementsCountComponent {
    constructor() {
        this.hostClassName = 'mui-table-elements-count';
        this.elementName = 'elements';
    }
}
MuiTableElementsCountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTableElementsCountComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiTableElementsCountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiTableElementsCountComponent, isStandalone: true, selector: "mui-table-elements-count", inputs: { totalAmount: "totalAmount", displayedAmount: "displayedAmount", elementName: "elementName" }, host: { properties: { "class": "this.hostClassName" } }, ngImport: i0, template: "<ng-container *ngIf=\"totalAmount\">\r\n  <div *ngIf=\"totalAmount === displayedAmount; else filteredRange\">\r\n    {{totalAmount}} {{elementName}} available\r\n  </div>\r\n  <ng-template #filteredRange>\r\n    <div>\r\n      {{displayedAmount}} out of {{totalAmount}} {{elementName}} shown\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTableElementsCountComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-table-elements-count', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"totalAmount\">\r\n  <div *ngIf=\"totalAmount === displayedAmount; else filteredRange\">\r\n    {{totalAmount}} {{elementName}} available\r\n  </div>\r\n  <ng-template #filteredRange>\r\n    <div>\r\n      {{displayedAmount}} out of {{totalAmount}} {{elementName}} shown\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n" }]
        }], propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], totalAmount: [{
                type: Input
            }], displayedAmount: [{
                type: Input
            }], elementName: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXRhYmxlLWVsZW1lbnRzLWNvdW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi90YWJsZS90YWJsZS1lbGVtZW50cy1jb3VudC9tdWktdGFibGUtZWxlbWVudHMtY291bnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3RhYmxlL3RhYmxlLWVsZW1lbnRzLWNvdW50L211aS10YWJsZS1lbGVtZW50cy1jb3VudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFdkY7O0dBRUc7QUFRSCxNQUFNLE9BQU8sOEJBQThCO0lBUDNDO1FBUWlDLGtCQUFhLEdBQUcsMEJBQTBCLENBQUM7UUFTMUUsZ0JBQVcsR0FBVyxVQUFVLENBQUM7S0FDbEM7OzRIQVhZLDhCQUE4QjtnSEFBOUIsOEJBQThCLHFQQ2IzQyw4VkFVQSwyQ0REWSxZQUFZOzRGQUlYLDhCQUE4QjtrQkFQMUMsU0FBUzsrQkFDRSwwQkFBMEIsY0FDeEIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUVOLHVCQUF1QixDQUFDLE1BQU07OEJBR2hCLGFBQWE7c0JBQTNDLFdBQVc7dUJBQUMsT0FBTztnQkFHcEIsV0FBVztzQkFEVixLQUFLO2dCQUlOLGVBQWU7c0JBRGQsS0FBSztnQkFJTixXQUFXO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgY29tcG9uZW50IHdoaWNoIHJlbmRlcnMgdGhlIGFtb3VudCBvZiBlbGVtZW50cyBkaXNwbGF5ZWQsIGJhc2VkIG9uIGdpdmVuIGlucHV0IGRhdGEuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS10YWJsZS1lbGVtZW50cy1jb3VudCcsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXVpLXRhYmxlLWVsZW1lbnRzLWNvdW50LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpVGFibGVFbGVtZW50c0NvdW50Q29tcG9uZW50IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcmVhZG9ubHkgaG9zdENsYXNzTmFtZSA9ICdtdWktdGFibGUtZWxlbWVudHMtY291bnQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHRvdGFsQW1vdW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZGlzcGxheWVkQW1vdW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZWxlbWVudE5hbWU6IHN0cmluZyA9ICdlbGVtZW50cyc7XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvdGFsQW1vdW50XCI+XHJcbiAgPGRpdiAqbmdJZj1cInRvdGFsQW1vdW50ID09PSBkaXNwbGF5ZWRBbW91bnQ7IGVsc2UgZmlsdGVyZWRSYW5nZVwiPlxyXG4gICAge3t0b3RhbEFtb3VudH19IHt7ZWxlbWVudE5hbWV9fSBhdmFpbGFibGVcclxuICA8L2Rpdj5cclxuICA8bmctdGVtcGxhdGUgI2ZpbHRlcmVkUmFuZ2U+XHJcbiAgICA8ZGl2PlxyXG4gICAgICB7e2Rpc3BsYXllZEFtb3VudH19IG91dCBvZiB7e3RvdGFsQW1vdW50fX0ge3tlbGVtZW50TmFtZX19IHNob3duXHJcbiAgICA8L2Rpdj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLWNvbnRhaW5lcj5cclxuIl19