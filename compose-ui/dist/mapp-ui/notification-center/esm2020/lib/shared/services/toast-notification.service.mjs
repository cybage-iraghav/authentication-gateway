import { Injectable } from '@angular/core';
import { NotificationSnackbarComponent } from '../../messages/notification-snackbar/notification-snackbar.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class ToastNotificationService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.MSG_DURATION = 5000;
        this.mdSnackBarConfig = {};
        this.mdSnackBarConfig.duration = this.MSG_DURATION;
        this.mdSnackBarConfig.panelClass = ['nc-snackbar-container'];
    }
    get snackBarRef() {
        return this.mdSnackBarRef;
    }
    openSnackBar(notification, showButton = false, onAction, appearance = 'unify') {
        this.mdSnackBarConfig.data = {
            notification,
            showButton,
            appearance
        };
        this.mdSnackBarRef = this.snackBar.openFromComponent(NotificationSnackbarComponent, this.mdSnackBarConfig);
        this.mdSnackBarRef.onAction()
            .subscribe(() => {
            if (onAction) {
                onAction();
            }
        });
    }
}
ToastNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, deps: [{ token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
ToastNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsNkJBQTZCLEVBRTlCLE1BQU0sc0VBQXNFLENBQUM7OztBQUs5RSxNQUFNLE9BQU8sd0JBQXdCO0lBTW5DLFlBQW1CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFKaEMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIscUJBQWdCLEdBQWdELEVBQUUsQ0FBQztRQUd6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWSxDQUNSLFlBQTBCLEVBQzFCLFVBQVUsR0FBRyxLQUFLLEVBQ2xCLFFBQXFCLEVBQ3JCLGFBQTJCLE9BQU87UUFFcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRztZQUMzQixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7U0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO2FBQ3hCLFNBQVMsQ0FDTixHQUFHLEVBQUU7WUFDSCxJQUFJLFFBQVEsRUFBRTtnQkFDWixRQUFRLEVBQUUsQ0FBQzthQUNaO1FBQ0gsQ0FBQyxDQUNKLENBQUM7SUFDUixDQUFDOztzSEFuQ1Usd0JBQXdCOzBIQUF4Qix3QkFBd0IsY0FEWCxNQUFNOzRGQUNuQix3QkFBd0I7a0JBRHBDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSB7IE1hdFNuYWNrQmFyQ29uZmlnLCBNYXRTbmFja0JhclJlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XHJcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcclxuaW1wb3J0IHtcclxuICBOb3RpZmljYXRpb25TbmFja2JhckNvbXBvbmVudCxcclxuICBOb3RpZmljYXRpb25TbmFja2JhckRhdGFcclxufSBmcm9tICcuLi8uLi9tZXNzYWdlcy9ub3RpZmljYXRpb24tc25hY2tiYXIvbm90aWZpY2F0aW9uLXNuYWNrYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5DQXBwZWFyYW5jZSB9IGZyb20gJy4uL21vZGVscy9jb25maWd1cmF0aW9ucyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmljYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgTVNHX0RVUkFUSU9OID0gNTAwMDtcclxuICBwcml2YXRlIG1kU25hY2tCYXJSZWY6IE1hdFNuYWNrQmFyUmVmPE5vdGlmaWNhdGlvblNuYWNrYmFyQ29tcG9uZW50PjtcclxuICBwcml2YXRlIG1kU25hY2tCYXJDb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnPE5vdGlmaWNhdGlvblNuYWNrYmFyRGF0YT4gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHNuYWNrQmFyOiBNYXRTbmFja0Jhcikge1xyXG4gICAgdGhpcy5tZFNuYWNrQmFyQ29uZmlnLmR1cmF0aW9uID0gdGhpcy5NU0dfRFVSQVRJT047XHJcbiAgICB0aGlzLm1kU25hY2tCYXJDb25maWcucGFuZWxDbGFzcyA9IFsnbmMtc25hY2tiYXItY29udGFpbmVyJ107XHJcbiAgfVxyXG5cclxuICBnZXQgc25hY2tCYXJSZWYoKTogTWF0U25hY2tCYXJSZWY8Tm90aWZpY2F0aW9uU25hY2tiYXJDb21wb25lbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLm1kU25hY2tCYXJSZWY7XHJcbiAgfVxyXG5cclxuICBvcGVuU25hY2tCYXIoXHJcbiAgICAgIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLFxyXG4gICAgICBzaG93QnV0dG9uID0gZmFsc2UsXHJcbiAgICAgIG9uQWN0aW9uPzogKCkgPT4gdm9pZCxcclxuICAgICAgYXBwZWFyYW5jZTogTkNBcHBlYXJhbmNlID0gJ3VuaWZ5Jyk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMubWRTbmFja0JhckNvbmZpZy5kYXRhID0ge1xyXG4gICAgICBub3RpZmljYXRpb24sXHJcbiAgICAgIHNob3dCdXR0b24sXHJcbiAgICAgIGFwcGVhcmFuY2VcclxuICAgIH07XHJcbiAgICB0aGlzLm1kU25hY2tCYXJSZWYgPSB0aGlzLnNuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KE5vdGlmaWNhdGlvblNuYWNrYmFyQ29tcG9uZW50LCB0aGlzLm1kU25hY2tCYXJDb25maWcpO1xyXG4gICAgdGhpcy5tZFNuYWNrQmFyUmVmLm9uQWN0aW9uKClcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKG9uQWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBvbkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=