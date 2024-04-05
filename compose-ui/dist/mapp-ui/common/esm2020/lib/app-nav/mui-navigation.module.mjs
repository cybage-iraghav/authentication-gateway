import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MuiHeadernavComponent } from './headernav/mui-headernav.component';
import { HeadernavDialogComponent } from './headernav/headernav-dialog.component';
import { SessionTimerComponent } from './headernav/session-timer.component';
import { MuiLeftnavContainerComponent } from './leftnav/mui-leftnav-container.component';
import { MuiLeftnavContentComponent } from './leftnav/mui-leftnav-content.component';
import { MuiLeftnavComponent } from './leftnav/mui-leftnav.component';
import * as i0 from "@angular/core";
export class MuiNavigationModule {
}
MuiNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, declarations: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent,
        MuiHeadernavComponent, HeadernavDialogComponent, SessionTimerComponent], imports: [CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatBadgeModule], exports: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent, MuiHeadernavComponent] });
MuiNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, imports: [CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatBadgeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatInputModule,
                        MatDialogModule,
                        MatBadgeModule
                    ],
                    exports: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent, MuiHeadernavComponent],
                    declarations: [
                        MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent,
                        MuiHeadernavComponent, HeadernavDialogComponent, SessionTimerComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLW5hdmlnYXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L211aS1uYXZpZ2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFtQnRFLE1BQU0sT0FBTyxtQkFBbUI7O2lIQUFuQixtQkFBbUI7a0hBQW5CLG1CQUFtQixpQkFKNUIsbUJBQW1CLEVBQUUsNEJBQTRCLEVBQUUsMEJBQTBCO1FBQzdFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixhQVp0RSxZQUFZO1FBQ1osYUFBYTtRQUNiLGVBQWU7UUFDZixhQUFhO1FBQ2IsY0FBYztRQUNkLGVBQWU7UUFDZixjQUFjLGFBR04sbUJBQW1CLEVBQUUsNEJBQTRCLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCO2tIQU1uRyxtQkFBbUIsWUFmNUIsWUFBWTtRQUNaLGFBQWE7UUFDYixlQUFlO1FBQ2YsYUFBYTtRQUNiLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYzs0RkFTTCxtQkFBbUI7a0JBakIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixjQUFjO3FCQUVmO29CQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLDRCQUE0QixFQUFFLDBCQUEwQixFQUFFLHFCQUFxQixDQUFDO29CQUMvRyxZQUFZLEVBQUU7d0JBQ1osbUJBQW1CLEVBQUUsNEJBQTRCLEVBQUUsMEJBQTBCO3dCQUM3RSxxQkFBcUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUI7cUJBQ3ZFO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0QmFkZ2VNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9iYWRnZSc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XHJcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcclxuXHJcbmltcG9ydCB7IE11aUhlYWRlcm5hdkNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVybmF2L211aS1oZWFkZXJuYXYuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGVhZGVybmF2RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXJuYXYvaGVhZGVybmF2LWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZXNzaW9uVGltZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlcm5hdi9zZXNzaW9uLXRpbWVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11aUxlZnRuYXZDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2xlZnRuYXYvbXVpLWxlZnRuYXYtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11aUxlZnRuYXZDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9sZWZ0bmF2L211aS1sZWZ0bmF2LWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVpTGVmdG5hdkNvbXBvbmVudCB9IGZyb20gJy4vbGVmdG5hdi9tdWktbGVmdG5hdi5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0QmFkZ2VNb2R1bGVcclxuXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTXVpTGVmdG5hdkNvbXBvbmVudCwgTXVpTGVmdG5hdkNvbnRhaW5lckNvbXBvbmVudCwgTXVpTGVmdG5hdkNvbnRlbnRDb21wb25lbnQsIE11aUhlYWRlcm5hdkNvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNdWlMZWZ0bmF2Q29tcG9uZW50LCBNdWlMZWZ0bmF2Q29udGFpbmVyQ29tcG9uZW50LCBNdWlMZWZ0bmF2Q29udGVudENvbXBvbmVudCxcclxuICAgIE11aUhlYWRlcm5hdkNvbXBvbmVudCwgSGVhZGVybmF2RGlhbG9nQ29tcG9uZW50LCBTZXNzaW9uVGltZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWlOYXZpZ2F0aW9uTW9kdWxlIHtcclxufVxyXG4iXX0=