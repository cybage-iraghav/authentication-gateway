import { Injectable, Optional } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@mapp-ui/notification-center";
export class SessionTimerService {
    constructor(http, notificationService) {
        this.http = http;
        this.notificationService = notificationService;
    }
    keepAlive() {
        return this.doRequest(new HttpParams().set('keepAlive', 'true'));
    }
    stopKeepAlive() {
        return this.doRequest(new HttpParams().set('keepAlive', 'false'));
    }
    ping() {
        return this.doRequest();
    }
    sessionTimedOut(message) {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: message
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    idleModeActivated(message) {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: message
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    doRequest(params) {
        const isValid = this.endpointUrl !== undefined && this.endpointUrl.length > 0;
        if (!isValid) {
            console.warn('Endpoint url for session timer is empty. Please check configuration');
            return EMPTY;
        }
        if (params) {
            return this.http.get(this.endpointUrl, { params });
        }
        return this.http.get(this.endpointUrl);
    }
}
SessionTimerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, deps: [{ token: i1.HttpClient }, { token: i2.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.NotificationService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2hlYWRlcm5hdi9zZXNzaW9uLXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFLekMsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUNVLElBQWdCLEVBQ0osbUJBQXdDO1FBRHBELFNBQUksR0FBSixJQUFJLENBQVk7UUFDSix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBRTlELENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlO1FBQzdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLE1BQU0sWUFBWSxHQUF5QjtnQkFDekMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFO29CQUNQLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGLENBQUM7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQWU7UUFDL0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsTUFBTSxZQUFZLEdBQXlCO2dCQUN6QyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUU7b0JBQ1AsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFFSCxDQUFDO0lBRU8sU0FBUyxDQUFDLE1BQW1CO1FBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDOztpSEEzRFUsbUJBQW1CO3FIQUFuQixtQkFBbUI7NEZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVTs7MEJBT04sUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyJztcclxuaW1wb3J0IHR5cGUgeyBWb2xhdGlsZU5vdGlmaWNhdGlvbiB9IGZyb20gJ0BtYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvblRpbWVyU2VydmljZSB7XHJcblxyXG4gIGVuZHBvaW50VXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBrZWVwQWxpdmUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdChuZXcgSHR0cFBhcmFtcygpLnNldCgna2VlcEFsaXZlJywgJ3RydWUnKSk7XHJcbiAgfVxyXG5cclxuICBzdG9wS2VlcEFsaXZlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QobmV3IEh0dHBQYXJhbXMoKS5zZXQoJ2tlZXBBbGl2ZScsICdmYWxzZScpKTtcclxuICB9XHJcblxyXG4gIHBpbmcoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdCgpO1xyXG4gIH1cclxuXHJcbiAgc2Vzc2lvblRpbWVkT3V0KG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgICBjb25zdCBub3RpZmljYXRpb246IFZvbGF0aWxlTm90aWZpY2F0aW9uID0ge1xyXG4gICAgICAgIHR5cGU6ICdXQVJOSU5HJyxcclxuICAgICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgICBoZWFkbGluZTogbWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWRsZU1vZGVBY3RpdmF0ZWQobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbjogVm9sYXRpbGVOb3RpZmljYXRpb24gPSB7XHJcbiAgICAgICAgdHlwZTogJ1dBUk5JTkcnLFxyXG4gICAgICAgIG1lc3NhZ2U6IHtcclxuICAgICAgICAgIGhlYWRsaW5lOiBtZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkb1JlcXVlc3QocGFyYW1zPzogSHR0cFBhcmFtcyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5lbmRwb2ludFVybCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuZW5kcG9pbnRVcmwubGVuZ3RoID4gMDtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ0VuZHBvaW50IHVybCBmb3Igc2Vzc2lvbiB0aW1lciBpcyBlbXB0eS4gUGxlYXNlIGNoZWNrIGNvbmZpZ3VyYXRpb24nKTtcclxuICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5lbmRwb2ludFVybCwgeyBwYXJhbXMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5lbmRwb2ludFVybCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==