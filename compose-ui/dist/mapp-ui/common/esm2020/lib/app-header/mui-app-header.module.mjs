import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuiAppHeaderActionsDirective, MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective } from './mui-app-header.component';
import * as i0 from "@angular/core";
export class MuiAppHeaderModule {
}
MuiAppHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiAppHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, declarations: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective], imports: [CommonModule], exports: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective] });
MuiAppHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective],
                    exports: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWFwcC1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtaGVhZGVyL211aS1hcHAtaGVhZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsMEJBQTBCLEVBQzNCLE1BQU0sNEJBQTRCLENBQUM7O0FBU3BDLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFIZCxxQkFBcUIsRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSw0QkFBNEIsYUFGdkgsWUFBWSxhQUdKLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixFQUFFLDRCQUE0QjtpSEFFekcsa0JBQWtCLFlBTDNCLFlBQVk7NEZBS0gsa0JBQWtCO2tCQVA5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixFQUFFLDRCQUE0QixDQUFDO29CQUMxSCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSw0QkFBNEIsQ0FBQztpQkFDdEgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIE11aUFwcEhlYWRlckFjdGlvbnNEaXJlY3RpdmUsXHJcbiAgTXVpQXBwSGVhZGVyQ29tcG9uZW50LFxyXG4gIE11aUFwcEhlYWRlck1lbnVEaXJlY3RpdmUsXHJcbiAgTXVpQXBwSGVhZGVyVGl0bGVEaXJlY3RpdmVcclxufSBmcm9tICcuL211aS1hcHAtaGVhZGVyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTXVpQXBwSGVhZGVyQ29tcG9uZW50LCBNdWlBcHBIZWFkZXJNZW51RGlyZWN0aXZlLCBNdWlBcHBIZWFkZXJUaXRsZURpcmVjdGl2ZSwgTXVpQXBwSGVhZGVyQWN0aW9uc0RpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW011aUFwcEhlYWRlckNvbXBvbmVudCwgTXVpQXBwSGVhZGVyTWVudURpcmVjdGl2ZSwgTXVpQXBwSGVhZGVyVGl0bGVEaXJlY3RpdmUsIE11aUFwcEhlYWRlckFjdGlvbnNEaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlBcHBIZWFkZXJNb2R1bGUgeyB9XHJcbiJdfQ==