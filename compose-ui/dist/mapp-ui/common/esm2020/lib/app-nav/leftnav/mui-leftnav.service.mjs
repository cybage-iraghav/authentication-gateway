import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class MuiLeftnavService {
    constructor(http) {
        this.http = http;
        this.sessionStorageKey = 'cepLeftnavActive'; // TODO consider rename prefix
    }
    getNavigationItems(apiUrl) {
        return this.http.get(apiUrl);
    }
    loadSavedActiveNavItems() {
        if (!sessionStorage) {
            return null;
        }
        return JSON.parse(window.sessionStorage.getItem(this.sessionStorageKey) ?? 'null');
    }
    saveActiveNavItems(activeItem) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(activeItem));
        }
    }
}
MuiLeftnavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
MuiLeftnavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWxlZnRuYXYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvYXBwLW5hdi9sZWZ0bmF2L211aS1sZWZ0bmF2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTzNDLE1BQU0sT0FBTyxpQkFBaUI7SUFJNUIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUYzQixzQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLDhCQUE4QjtJQUcvRSxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBYztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBb0Q7UUFDckUsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDbkY7SUFDSCxDQUFDOzsrR0F2QlUsaUJBQWlCO21IQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTGVmdG5hdlJlc3BvbnNlIH0gZnJvbSAnLi9sZWZ0bmF2LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTXVpTGVmdG5hdlNlcnZpY2Uge1xyXG5cclxuICByZWFkb25seSBzZXNzaW9uU3RvcmFnZUtleSA9ICdjZXBMZWZ0bmF2QWN0aXZlJzsgLy8gVE9ETyBjb25zaWRlciByZW5hbWUgcHJlZml4XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gIH1cclxuXHJcbiAgZ2V0TmF2aWdhdGlvbkl0ZW1zKGFwaVVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxMZWZ0bmF2UmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExlZnRuYXZSZXNwb25zZT4oYXBpVXJsKTtcclxuICB9XHJcblxyXG4gIGxvYWRTYXZlZEFjdGl2ZU5hdkl0ZW1zKCk6IHsgc2VjdGlvbjogc3RyaW5nLCBwYWdlOiBzdHJpbmcgfSB8IG51bGwge1xyXG4gICAgaWYgKCFzZXNzaW9uU3RvcmFnZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNlc3Npb25TdG9yYWdlS2V5KSA/PyAnbnVsbCcpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUFjdGl2ZU5hdkl0ZW1zKGFjdGl2ZUl0ZW06IHsgc2VjdGlvbjogc3RyaW5nLCBwYWdlOiBzdHJpbmcgfCBudWxsIH0pOiB2b2lkIHtcclxuICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcclxuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5zZXNzaW9uU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoYWN0aXZlSXRlbSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19