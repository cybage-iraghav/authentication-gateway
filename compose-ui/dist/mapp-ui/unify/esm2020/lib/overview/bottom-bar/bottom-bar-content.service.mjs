import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Small service that can be used to provide the current template to be rendered by BottomBarComponent.
 */
export class BottomBarContentService {
    constructor() {
        this._bottomBarTemplate = null;
    }
    get bottomBarTemplate() {
        return this._bottomBarTemplate;
    }
    set bottomBarTemplate(template) {
        this._bottomBarTemplate = template;
    }
}
BottomBarContentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BottomBarContentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BottomBarContentService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWJhci1jb250ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvb3ZlcnZpZXcvYm90dG9tLWJhci9ib3R0b20tYmFyLWNvbnRlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUV4RDs7R0FFRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFEcEM7UUFFVSx1QkFBa0IsR0FBNEIsSUFBSSxDQUFDO0tBVTVEO0lBUkMsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksaUJBQWlCLENBQUMsUUFBaUM7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztJQUNyQyxDQUFDOztxSEFUVSx1QkFBdUI7eUhBQXZCLHVCQUF1Qjs0RkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBTbWFsbCBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgY3VycmVudCB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBieSBCb3R0b21CYXJDb21wb25lbnQuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCb3R0b21CYXJDb250ZW50U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfYm90dG9tQmFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgZ2V0IGJvdHRvbUJhclRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9ib3R0b21CYXJUZW1wbGF0ZTtcclxuICB9XHJcblxyXG4gIHNldCBib3R0b21CYXJUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwpIHtcclxuICAgIHRoaXMuX2JvdHRvbUJhclRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=