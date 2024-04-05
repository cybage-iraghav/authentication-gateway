import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { getInitialNotifications, getNewNotifications } from './mock-messages';
import * as i0 from "@angular/core";
/**
 * Mock implementation of BackendService
 * It can be used in tests and for running local without api connection
 * This class is currently not compatible with AOT compile of cli >= 1.0 if used in DI provider assignment
 */
export class MockBackendService {
    getSessionId() {
        return '';
    }
    getNotifications() {
        return of(getInitialNotifications());
    }
    dismissMessages() {
        // do nothing here
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNewNotifications(sinceDate) {
        return of(getNewNotifications());
    }
}
MockBackendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MockBackendService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MockBackendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MockBackendService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MockBackendService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC1tb2NrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvYmFja2VuZC1tb2NrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUcvRTs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQUU3QixZQUFZO1FBQ1YsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxlQUFlO1FBQ2Isa0JBQWtCO0lBQ3BCLENBQUM7SUFHRCw2REFBNkQ7SUFDN0QsbUJBQW1CLENBQUMsU0FBaUI7UUFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7O2dIQWxCVSxrQkFBa0I7b0hBQWxCLGtCQUFrQjs0RkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWNhdGlvbic7XHJcbmltcG9ydCB7IGdldEluaXRpYWxOb3RpZmljYXRpb25zLCBnZXROZXdOb3RpZmljYXRpb25zIH0gZnJvbSAnLi9tb2NrLW1lc3NhZ2VzJztcclxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2VJbnRlcmZhY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZS5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIE1vY2sgaW1wbGVtZW50YXRpb24gb2YgQmFja2VuZFNlcnZpY2VcclxuICogSXQgY2FuIGJlIHVzZWQgaW4gdGVzdHMgYW5kIGZvciBydW5uaW5nIGxvY2FsIHdpdGhvdXQgYXBpIGNvbm5lY3Rpb25cclxuICogVGhpcyBjbGFzcyBpcyBjdXJyZW50bHkgbm90IGNvbXBhdGlibGUgd2l0aCBBT1QgY29tcGlsZSBvZiBjbGkgPj0gMS4wIGlmIHVzZWQgaW4gREkgcHJvdmlkZXIgYXNzaWdubWVudFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTW9ja0JhY2tlbmRTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cclxuICBnZXRTZXNzaW9uSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGdldE5vdGlmaWNhdGlvbnMoKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIG9mKGdldEluaXRpYWxOb3RpZmljYXRpb25zKCkpO1xyXG4gIH1cclxuXHJcbiAgZGlzbWlzc01lc3NhZ2VzKCk6IHZvaWQge1xyXG4gICAgLy8gZG8gbm90aGluZyBoZXJlXHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gIGdldE5ld05vdGlmaWNhdGlvbnMoc2luY2VEYXRlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbltdPiB7XHJcbiAgICByZXR1cm4gb2YoZ2V0TmV3Tm90aWZpY2F0aW9ucygpKTtcclxuICB9XHJcbn1cclxuIl19