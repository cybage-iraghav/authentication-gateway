import { NgModule } from '@angular/core';
import { MuiOverviewPageHeaderComponent } from './overview-page-header/mui-overview-page-header.component';
import { MuiBottomBarContentDirective } from './bottom-bar/mui-bottom-bar-content.directive';
import { MuiBottomBarComponent } from './bottom-bar/mui-bottom-bar.component';
import * as i0 from "@angular/core";
/**
 * Convenience module, containing all standalone components from the overview page package.
 */
export class MuiOverviewPageModule {
}
MuiOverviewPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiOverviewPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, imports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent,
        MuiBottomBarContentDirective], exports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent,
        MuiBottomBarContentDirective] });
MuiOverviewPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, imports: [MuiOverviewPageHeaderComponent,
        MuiBottomBarComponent] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiOverviewPageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        MuiOverviewPageHeaderComponent,
                        MuiBottomBarComponent,
                        MuiBottomBarContentDirective
                    ],
                    exports: [
                        MuiOverviewPageHeaderComponent,
                        MuiBottomBarComponent,
                        MuiBottomBarContentDirective
                    ]
                }]
        }] });
/** All components belonging to the overview package. Can alternatively be used instead of the module. */
export const MUI_OVERVIEW_COMPONENTS = [
    MuiOverviewPageHeaderComponent,
    MuiBottomBarComponent,
    MuiBottomBarContentDirective
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLW92ZXJ2aWV3LXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL292ZXJ2aWV3L211aS1vdmVydmlldy1wYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzNHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUc5RTs7R0FFRztBQWFILE1BQU0sT0FBTyxxQkFBcUI7O21IQUFyQixxQkFBcUI7b0hBQXJCLHFCQUFxQixZQVY5Qiw4QkFBOEI7UUFDOUIscUJBQXFCO1FBQ3JCLDRCQUE0QixhQUc1Qiw4QkFBOEI7UUFDOUIscUJBQXFCO1FBQ3JCLDRCQUE0QjtvSEFHbkIscUJBQXFCLFlBVjlCLDhCQUE4QjtRQUM5QixxQkFBcUI7NEZBU1oscUJBQXFCO2tCQVpqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCw4QkFBOEI7d0JBQzlCLHFCQUFxQjt3QkFDckIsNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsOEJBQThCO3dCQUM5QixxQkFBcUI7d0JBQ3JCLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0FBSUQseUdBQXlHO0FBQ3pHLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHO0lBQ3JDLDhCQUE4QjtJQUM5QixxQkFBcUI7SUFDckIsNEJBQTRCO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNdWlPdmVydmlld1BhZ2VIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL292ZXJ2aWV3LXBhZ2UtaGVhZGVyL211aS1vdmVydmlldy1wYWdlLWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWlCb3R0b21CYXJDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9ib3R0b20tYmFyL211aS1ib3R0b20tYmFyLWNvbnRlbnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXVpQm90dG9tQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9ib3R0b20tYmFyL211aS1ib3R0b20tYmFyLmNvbXBvbmVudCc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlbmllbmNlIG1vZHVsZSwgY29udGFpbmluZyBhbGwgc3RhbmRhbG9uZSBjb21wb25lbnRzIGZyb20gdGhlIG92ZXJ2aWV3IHBhZ2UgcGFja2FnZS5cclxuICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTXVpT3ZlcnZpZXdQYWdlSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgTXVpQm90dG9tQmFyQ29tcG9uZW50LFxyXG4gICAgTXVpQm90dG9tQmFyQ29udGVudERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTXVpT3ZlcnZpZXdQYWdlSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgTXVpQm90dG9tQmFyQ29tcG9uZW50LFxyXG4gICAgTXVpQm90dG9tQmFyQ29udGVudERpcmVjdGl2ZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE11aU92ZXJ2aWV3UGFnZU1vZHVsZSB7XHJcbn1cclxuXHJcbi8qKiBBbGwgY29tcG9uZW50cyBiZWxvbmdpbmcgdG8gdGhlIG92ZXJ2aWV3IHBhY2thZ2UuIENhbiBhbHRlcm5hdGl2ZWx5IGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgbW9kdWxlLiAqL1xyXG5leHBvcnQgY29uc3QgTVVJX09WRVJWSUVXX0NPTVBPTkVOVFMgPSBbXHJcbiAgTXVpT3ZlcnZpZXdQYWdlSGVhZGVyQ29tcG9uZW50LFxyXG4gIE11aUJvdHRvbUJhckNvbXBvbmVudCxcclxuICBNdWlCb3R0b21CYXJDb250ZW50RGlyZWN0aXZlXHJcbl0gYXMgY29uc3Q7XHJcbiJdfQ==