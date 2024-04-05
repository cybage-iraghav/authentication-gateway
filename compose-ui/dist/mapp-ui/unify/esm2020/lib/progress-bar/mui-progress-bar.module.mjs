import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MuiIconModule } from '@mapp-ui/common';
import { MuiNextStepDirective } from './mui-next-step.directive';
import { MuiProgressBarComponent } from './mui-progress-bar.component';
import { MuiProgressStepComponent } from './mui-progress-step.component';
import { MuiStepActionsDirective } from './mui-step-actions.directive';
import { MuiStepHeaderComponent } from './mui-step-header.component';
import * as i0 from "@angular/core";
export class MuiProgressBarModule {
}
MuiProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, declarations: [MuiProgressBarComponent,
        MuiProgressStepComponent,
        MuiStepHeaderComponent,
        MuiNextStepDirective,
        MuiStepActionsDirective], imports: [CommonModule,
        MuiIconModule,
        MatCardModule], exports: [MuiProgressBarComponent,
        MuiProgressStepComponent,
        MuiNextStepDirective,
        MuiStepActionsDirective] });
MuiProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, imports: [CommonModule,
        MuiIconModule,
        MatCardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MuiProgressBarComponent,
                        MuiProgressStepComponent,
                        MuiStepHeaderComponent,
                        MuiNextStepDirective,
                        MuiStepActionsDirective
                    ],
                    imports: [
                        CommonModule,
                        MuiIconModule,
                        MatCardModule
                    ],
                    exports: [
                        MuiProgressBarComponent,
                        MuiProgressStepComponent,
                        MuiNextStepDirective,
                        MuiStepActionsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXByb2dyZXNzLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvcHJvZ3Jlc3MtYmFyL211aS1wcm9ncmVzcy1iYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBdUJyRSxNQUFNLE9BQU8sb0JBQW9COztrSEFBcEIsb0JBQW9CO21IQUFwQixvQkFBb0IsaUJBbEI3Qix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsdUJBQXVCLGFBR3ZCLFlBQVk7UUFDWixhQUFhO1FBQ2IsYUFBYSxhQUdiLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHVCQUF1QjttSEFHZCxvQkFBb0IsWUFYN0IsWUFBWTtRQUNaLGFBQWE7UUFDYixhQUFhOzRGQVNKLG9CQUFvQjtrQkFwQmhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QixzQkFBc0I7d0JBQ3RCLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLHVCQUF1QjtxQkFDeEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XHJcbmltcG9ydCB7IE11aUljb25Nb2R1bGUgfSBmcm9tICdAbWFwcC11aS9jb21tb24nO1xyXG5pbXBvcnQgeyBNdWlOZXh0U3RlcERpcmVjdGl2ZSB9IGZyb20gJy4vbXVpLW5leHQtc3RlcC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNdWlQcm9ncmVzc0JhckNvbXBvbmVudCB9IGZyb20gJy4vbXVpLXByb2dyZXNzLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWlQcm9ncmVzc1N0ZXBDb21wb25lbnQgfSBmcm9tICcuL211aS1wcm9ncmVzcy1zdGVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11aVN0ZXBBY3Rpb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9tdWktc3RlcC1hY3Rpb25zLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE11aVN0ZXBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL211aS1zdGVwLWhlYWRlci5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNdWlQcm9ncmVzc0JhckNvbXBvbmVudCxcclxuICAgIE11aVByb2dyZXNzU3RlcENvbXBvbmVudCxcclxuICAgIE11aVN0ZXBIZWFkZXJDb21wb25lbnQsXHJcbiAgICBNdWlOZXh0U3RlcERpcmVjdGl2ZSxcclxuICAgIE11aVN0ZXBBY3Rpb25zRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNdWlJY29uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTXVpUHJvZ3Jlc3NCYXJDb21wb25lbnQsXHJcbiAgICBNdWlQcm9ncmVzc1N0ZXBDb21wb25lbnQsXHJcbiAgICBNdWlOZXh0U3RlcERpcmVjdGl2ZSxcclxuICAgIE11aVN0ZXBBY3Rpb25zRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpUHJvZ3Jlc3NCYXJNb2R1bGUge1xyXG59XHJcbiJdfQ==