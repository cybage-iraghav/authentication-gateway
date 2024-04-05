import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MuiInput } from './input/input';
import { MuiFormFieldComponent } from './mui-form-field.component';
import { MuiFormFieldInfoComponent } from './form-field-info/mui-form-field-info.component';
import { MuiPrefixDirective } from './mui-prefix.directive';
import { MuiSuffixDirective } from './mui-suffix.directive';
import { MuiLabelDirective } from './mui-label.directive';
import * as i0 from "@angular/core";
export class MuiFormFieldModule {
}
MuiFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, declarations: [MuiFormFieldComponent,
        MuiFormFieldInfoComponent,
        MuiPrefixDirective,
        MuiSuffixDirective,
        MuiLabelDirective,
        MuiInput], imports: [CommonModule,
        MatInputModule,
        MatTooltipModule], exports: [MuiFormFieldComponent,
        MuiFormFieldInfoComponent,
        MuiPrefixDirective,
        MuiSuffixDirective,
        MuiLabelDirective,
        MuiInput] });
MuiFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, imports: [CommonModule,
        MatInputModule,
        MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MuiFormFieldComponent,
                        MuiFormFieldInfoComponent,
                        MuiPrefixDirective,
                        MuiSuffixDirective,
                        MuiLabelDirective,
                        MuiInput
                    ],
                    imports: [
                        CommonModule,
                        MatInputModule,
                        MatTooltipModule
                    ],
                    exports: [
                        MuiFormFieldComponent,
                        MuiFormFieldInfoComponent,
                        MuiPrefixDirective,
                        MuiSuffixDirective,
                        MuiLabelDirective,
                        MuiInput
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWZvcm0tZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL2Zvcm0tZmllbGQvbXVpLWZvcm0tZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQTBCMUQsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtpSEFBbEIsa0JBQWtCLGlCQXJCM0IscUJBQXFCO1FBQ3JCLHlCQUF5QjtRQUN6QixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQixRQUFRLGFBR1IsWUFBWTtRQUNaLGNBQWM7UUFDZCxnQkFBZ0IsYUFHZCxxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLFFBQVE7aUhBR0Qsa0JBQWtCLFlBYjNCLFlBQVk7UUFDWixjQUFjO1FBQ2QsZ0JBQWdCOzRGQVdQLGtCQUFrQjtrQkF2QjlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6QixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3dCQUNqQixRQUFRO3FCQUNUO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wscUJBQXFCO3dCQUNyQix5QkFBeUI7d0JBQ3pCLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLFFBQVE7cUJBQ1g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xyXG5pbXBvcnQgeyBNdWlJbnB1dCB9IGZyb20gJy4vaW5wdXQvaW5wdXQnO1xyXG5pbXBvcnQgeyBNdWlGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuL211aS1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11aUZvcm1GaWVsZEluZm9Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0tZmllbGQtaW5mby9tdWktZm9ybS1maWVsZC1pbmZvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11aVByZWZpeERpcmVjdGl2ZSB9IGZyb20gJy4vbXVpLXByZWZpeC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNdWlTdWZmaXhEaXJlY3RpdmUgfSBmcm9tICcuL211aS1zdWZmaXguZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXVpTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL211aS1sYWJlbC5kaXJlY3RpdmUnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNdWlGb3JtRmllbGRDb21wb25lbnQsXHJcbiAgICBNdWlGb3JtRmllbGRJbmZvQ29tcG9uZW50LFxyXG4gICAgTXVpUHJlZml4RGlyZWN0aXZlLFxyXG4gICAgTXVpU3VmZml4RGlyZWN0aXZlLFxyXG4gICAgTXVpTGFiZWxEaXJlY3RpdmUsXHJcbiAgICBNdWlJbnB1dFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICAgIE11aUZvcm1GaWVsZENvbXBvbmVudCxcclxuICAgICAgTXVpRm9ybUZpZWxkSW5mb0NvbXBvbmVudCxcclxuICAgICAgTXVpUHJlZml4RGlyZWN0aXZlLFxyXG4gICAgICBNdWlTdWZmaXhEaXJlY3RpdmUsXHJcbiAgICAgIE11aUxhYmVsRGlyZWN0aXZlLFxyXG4gICAgICBNdWlJbnB1dFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE11aUZvcm1GaWVsZE1vZHVsZSB7XHJcbn1cclxuIl19