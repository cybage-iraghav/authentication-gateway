import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from "@angular/material/tooltip";
import { NotificationCenterAlertsComponent } from './center/notification-alerts.component';
import { NotificationCenterComponent } from './center/notification-center.component';
import { NotificationCenterNewsComponent } from './center/notification-news.component';
import { MessageComponent } from './messages/alert/message.component';
import { NotificationSnackbarComponent } from './messages/notification-snackbar/notification-snackbar.component';
import { MessageStickyComponent } from './messages/sticky/message-sticky.component';
import * as i0 from "@angular/core";
export class NotificationCenterModule {
}
NotificationCenterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NotificationCenterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, declarations: [NotificationCenterComponent,
        MessageComponent,
        MessageStickyComponent,
        NotificationCenterAlertsComponent,
        NotificationCenterNewsComponent,
        NotificationSnackbarComponent], imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule], exports: [NotificationCenterComponent] });
NotificationCenterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule],
                    exports: [NotificationCenterComponent],
                    declarations: [
                        NotificationCenterComponent,
                        MessageComponent,
                        MessageStickyComponent,
                        NotificationCenterAlertsComponent,
                        NotificationCenterNewsComponent,
                        NotificationSnackbarComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWNlbnRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9ub3RpZmljYXRpb24tY2VudGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUNqSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7QUFjcEYsTUFBTSxPQUFPLHdCQUF3Qjs7c0hBQXhCLHdCQUF3Qjt1SEFBeEIsd0JBQXdCLGlCQVJqQywyQkFBMkI7UUFDM0IsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixpQ0FBaUM7UUFDakMsK0JBQStCO1FBQy9CLDZCQUE2QixhQVJyQixZQUFZLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLGFBQ2hHLDJCQUEyQjt1SEFVMUIsd0JBQXdCLFlBWHpCLFlBQVksRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0I7NEZBVy9GLHdCQUF3QjtrQkFacEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7b0JBQzNHLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUN0QyxZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3dCQUMzQixnQkFBZ0I7d0JBQ2hCLHNCQUFzQjt3QkFDdEIsaUNBQWlDO3dCQUNqQywrQkFBK0I7d0JBQy9CLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xyXG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXBcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ2VudGVyQWxlcnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jZW50ZXIvbm90aWZpY2F0aW9uLWFsZXJ0cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25DZW50ZXJDb21wb25lbnQgfSBmcm9tICcuL2NlbnRlci9ub3RpZmljYXRpb24tY2VudGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNlbnRlck5ld3NDb21wb25lbnQgfSBmcm9tICcuL2NlbnRlci9ub3RpZmljYXRpb24tbmV3cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9hbGVydC9tZXNzYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNuYWNrYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9ub3RpZmljYXRpb24tc25hY2tiYXIvbm90aWZpY2F0aW9uLXNuYWNrYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1lc3NhZ2VTdGlja3lDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL3N0aWNreS9tZXNzYWdlLXN0aWNreS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFNuYWNrQmFyTW9kdWxlLCBNYXRUYWJzTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlXSxcclxuICBleHBvcnRzOiBbTm90aWZpY2F0aW9uQ2VudGVyQ29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5vdGlmaWNhdGlvbkNlbnRlckNvbXBvbmVudCxcclxuICAgIE1lc3NhZ2VDb21wb25lbnQsXHJcbiAgICBNZXNzYWdlU3RpY2t5Q29tcG9uZW50LFxyXG4gICAgTm90aWZpY2F0aW9uQ2VudGVyQWxlcnRzQ29tcG9uZW50LFxyXG4gICAgTm90aWZpY2F0aW9uQ2VudGVyTmV3c0NvbXBvbmVudCxcclxuICAgIE5vdGlmaWNhdGlvblNuYWNrYmFyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ2VudGVyTW9kdWxlIHtcclxufVxyXG4iXX0=