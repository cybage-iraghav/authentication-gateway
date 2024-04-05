import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This component provides a container for handling additional expandable details in a table row.
 * The component manages necessary style classes as well as providing a nice animation on expand / collapse of the row.
 */
export class MuiRowDetailsComponent {
    constructor() {
        /** Whether the content should be expanded or collapsed */
        this.isExpanded = false;
    }
}
MuiRowDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiRowDetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiRowDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiRowDetailsComponent, isStandalone: true, selector: "mui-row-details", inputs: { isExpanded: "isExpanded" }, ngImport: i0, template: "<div [@detailExpand]=\"isExpanded ? 'expanded' : 'collapsed'\"\r\n    class=\"mui-expand-details-container\">\r\n  <div class=\"mui-expand-details\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }], animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiRowDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-row-details', standalone: true, imports: [CommonModule], animations: [
                        trigger('detailExpand', [
                            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
                            state('expanded', style({ height: '*' })),
                            transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [@detailExpand]=\"isExpanded ? 'expanded' : 'collapsed'\"\r\n    class=\"mui-expand-details-container\">\r\n  <div class=\"mui-expand-details\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { isExpanded: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXJvdy1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi90YWJsZS9yb3ctZGV0YWlscy9tdWktcm93LWRldGFpbHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3RhYmxlL3Jvdy1kZXRhaWxzL211aS1yb3ctZGV0YWlscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFMUU7OztHQUdHO0FBaUJILE1BQU0sT0FBTyxzQkFBc0I7SUFoQm5DO1FBa0JFLDBEQUEwRDtRQUUxRCxlQUFVLEdBQUcsS0FBSyxDQUFDO0tBQ3BCOztvSEFMWSxzQkFBc0I7d0dBQXRCLHNCQUFzQixpSEN4Qm5DLGtOQU1BLHlEREtZLFlBQVksaUJBSVY7UUFDVixPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekMsVUFBVSxDQUFDLDBDQUEwQyxFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQ3hHLENBQUM7S0FDSDs0RkFHVSxzQkFBc0I7a0JBaEJsQyxTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxjQUlYO3dCQUNWLE9BQU8sQ0FBQyxjQUFjLEVBQUU7NEJBQ3RCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDOzRCQUNsRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDOzRCQUN6QyxVQUFVLENBQUMsMENBQTBDLEVBQUUsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7eUJBQ3hHLENBQUM7cUJBQ0gsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07OEJBTS9DLFVBQVU7c0JBRFQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IHByb3ZpZGVzIGEgY29udGFpbmVyIGZvciBoYW5kbGluZyBhZGRpdGlvbmFsIGV4cGFuZGFibGUgZGV0YWlscyBpbiBhIHRhYmxlIHJvdy5cclxuICogVGhlIGNvbXBvbmVudCBtYW5hZ2VzIG5lY2Vzc2FyeSBzdHlsZSBjbGFzc2VzIGFzIHdlbGwgYXMgcHJvdmlkaW5nIGEgbmljZSBhbmltYXRpb24gb24gZXhwYW5kIC8gY29sbGFwc2Ugb2YgdGhlIHJvdy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXJvdy1kZXRhaWxzJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tdWktcm93LWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL211aS1yb3ctZGV0YWlscy5jb21wb25lbnQuc2NzcyddLFxyXG4gIC8vIGJ1Z3MgYW5kIHdvcmthcm91bmRzIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4ODQ3IC0gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTUzODBcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdkZXRhaWxFeHBhbmQnLCBbXHJcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQsIHZvaWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnIH0pKSxcclxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQsIHZvaWQgPT4gZXhwYW5kZWQnLCBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSlcclxuICAgIF0pXHJcbiAgXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpUm93RGV0YWlsc0NvbXBvbmVudCB7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjb250ZW50IHNob3VsZCBiZSBleHBhbmRlZCBvciBjb2xsYXBzZWQgKi9cclxuICBASW5wdXQoKVxyXG4gIGlzRXhwYW5kZWQgPSBmYWxzZTtcclxufVxyXG4iLCI8ZGl2IFtAZGV0YWlsRXhwYW5kXT1cImlzRXhwYW5kZWQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIlxyXG4gICAgY2xhc3M9XCJtdWktZXhwYW5kLWRldGFpbHMtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm11aS1leHBhbmQtZGV0YWlsc1wiPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19