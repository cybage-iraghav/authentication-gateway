import { HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, concat, EMPTY, Subject, timer } from 'rxjs';
import { debounceTime, mapTo } from 'rxjs/operators';
import { TimeoutDialogComponent } from '../components/timeout-dialog/timeout-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/material/dialog";
import * as i3 from "./top-navigation-cache.service";
import * as i4 from "@mapp-ui/notification-center";
export class SessionTimerService {
    constructor(http, dialog, cacheService, notificationService) {
        this.http = http;
        this.dialog = dialog;
        this.cacheService = cacheService;
        this.notificationService = notificationService;
        this.isTimeoutActive$ = new BehaviorSubject(true);
        this.isInitialized = false;
        this.timerReset$ = new Subject();
    }
    get isTimeoutActive() {
        return this.isTimeoutActive$.asObservable();
    }
    /**
     * Initialize the service based on the provided configuration
     * @param navItem navigation item for the timer, holding the configuration data
     */
    init(navItem) {
        this.config = navItem.properties;
        this.endpointUrl = navItem.href ?? '';
        if (this.config.keepAlive && !this.config.idleMode) {
            this.startKeepAlive();
        }
        else {
            this.startTimer();
        }
        if (this.config.idleMode) {
            this.onIdleModeActivated();
        }
        this.timerResetListener();
        this.isInitialized = true;
    }
    /**
     * Start the "keep alive" mode.
     * Backend will be pinged periodically (30 seconds) to keep the session alive.
     */
    startKeepAlive(clearCache = false) {
        this.stopTimer();
        this.activeKeepAlive = timer(10, 30000)
            .subscribe(() => {
            this.startKeepAliveReq()
                .subscribe(res => {
                if (res.idleMode) {
                    this.onIdleModeActivated();
                    this.startTimer();
                }
            });
        });
        this.isTimeoutActive$.next(false);
        if (clearCache) {
            this.cacheService.invalidateCache();
        }
    }
    /**
     * Stop the "keep alive" mode and restart the regular timeout monitor.
     */
    stopKeepAlive() {
        this.activeKeepAlive.unsubscribe();
        this.stopKeepAliveReq()
            .subscribe();
        this.startTimer();
        this.isTimeoutActive$.next(true);
        this.cacheService.invalidateCache();
    }
    /**
     * Reset the current timer and start a new countdown.
     * Used by SessionInterceptor
     */
    resetTimer() {
        if (!this.activeKeepAlive || this.activeKeepAlive.closed) {
            this.timerReset$.next();
        }
    }
    timerResetListener() {
        this.timerReset$
            .pipe(debounceTime(10000))
            .subscribe(() => {
            if (this.isInitialized) {
                console.log('session timer reset.');
                this.stopTimer();
                this.startTimer();
            }
        });
    }
    onSessionTimedOut() {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: $localize `:@@topnav_session_expired:Your session expired. You will be redirected to the login page.`
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    onIdleModeActivated() {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: $localize `:@@topnav_system_restart:Your Engage system will restart shortly due to a server reboot. Please save your work and log out. You can log back in immediately.`
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    startKeepAliveReq() {
        return this.doRequest(new HttpParams().set('keepAlive', 'true'));
    }
    stopKeepAliveReq() {
        return this.doRequest(new HttpParams().set('keepAlive', 'false'));
    }
    doRequest(params) {
        const isValid = this.endpointUrl.length > 0;
        if (!isValid) {
            console.warn('Endpoint url for session timer is empty. Please check configuration');
            return EMPTY;
        }
        if (params) {
            return this.http.get(this.endpointUrl, { params });
        }
        return this.http.get(this.endpointUrl);
    }
    startTimer() {
        const warningTime = this.config.timeout * (5 / 6); // 25 minutes for 30 min session
        const timeoutTime = this.config.timeout / 6; // 5 minutes for 30 min session
        const warningTimer = timer(warningTime)
            .pipe(mapTo('warning'));
        const expiryTimer = timer(timeoutTime)
            .pipe(mapTo('expired'));
        this.timerSubscription = concat(warningTimer, expiryTimer)
            .subscribe(v => {
            if (v === 'warning') {
                this.showTimeoutWarningDialog();
            }
            if (v === 'expired') {
                this.timerSubscription.unsubscribe();
                this.onSessionTimedOut();
                if (this.config.expiredHref.length > 0) {
                    setTimeout(() => {
                        window.location.assign(this.config.expiredHref);
                    }, 5000);
                }
            }
        });
        if (this.activeKeepAlive && !this.activeKeepAlive.closed) {
            this.stopKeepAliveReq();
        }
    }
    stopTimer() {
        this.timerSubscription?.unsubscribe();
    }
    showTimeoutWarningDialog() {
        const dialogConfig = {
            width: '500px',
            hasBackdrop: true,
            disableClose: true,
            autoFocus: false,
            panelClass: 'mui-timeout-dialog'
        };
        const dialogRef = this.dialog.open(TimeoutDialogComponent, dialogConfig);
        dialogRef.afterClosed()
            .subscribe(res => {
            if (res === 'Stop') {
                this.startKeepAlive(true);
            }
        });
    }
}
SessionTimerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, deps: [{ token: i1.HttpClient }, { token: i2.MatDialog }, { token: i3.TopNavigationCacheService }, { token: i4.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.MatDialog }, { type: i3.TopNavigationCacheService }, { type: i4.NotificationService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi90b3AtbmF2aWdhdGlvbi9zZXJ2aWNlcy9zZXNzaW9uLXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOzs7Ozs7QUFNL0YsTUFBTSxPQUFPLG1CQUFtQjtJQVU5QixZQUNZLElBQWdCLEVBQ2hCLE1BQWlCLEVBQ2pCLFlBQXVDLEVBQzNCLG1CQUF3QztRQUhwRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQTJCO1FBQzNCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFSeEQscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDdEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBUTFDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksQ0FBQyxPQUFnQjtR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QUFFLENBQUM7SUFDeEMsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixNQUFNLFlBQVksR0FBb0I7WUFDcEMsS0FBSyxFQUFFLE9BQU87WUFDZCxXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsSUFBSTtZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsb0JBQW9CO1NBQ2pDLENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6RSxTQUFTLENBQUMsV0FBVyxFQUFFO2FBQ2xCLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQzs7aUhBeE1VLG1CQUFtQjtxSEFBbkIsbUJBQW1CLGNBRE4sTUFBTTs0RkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBZTNCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZS9pbml0JztcclxuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgdHlwZSB7IFZvbGF0aWxlTm90aWZpY2F0aW9uIH0gZnJvbSAnQG1hcHAtdWkvbm90aWZpY2F0aW9uLWNlbnRlcic7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb25jYXQsIEVNUFRZLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRpbWVvdXREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3RpbWVvdXQtZGlhbG9nL3RpbWVvdXQtZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5hdkl0ZW0gfSBmcm9tICcuLi9jb3JlL21vZGVscy9uYXZpZ2F0aW9uJztcclxuaW1wb3J0IHsgS2VlcEFsaXZlUmVzcG9uc2UsIFNlc3Npb25UaW1lckNvbmZpZyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3Nlc3Npb24tdGltZXInO1xyXG5pbXBvcnQgeyBUb3BOYXZpZ2F0aW9uQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi90b3AtbmF2aWdhdGlvbi1jYWNoZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBTZXNzaW9uVGltZXJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IFNlc3Npb25UaW1lckNvbmZpZztcclxuICBwcml2YXRlIGVuZHBvaW50VXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB0aW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgYWN0aXZlS2VlcEFsaXZlOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBpc1RpbWVvdXRBY3RpdmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcclxuICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIHRpbWVyUmVzZXQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IFRvcE5hdmlnYXRpb25DYWNoZVNlcnZpY2UsXHJcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzVGltZW91dEFjdGl2ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLmlzVGltZW91dEFjdGl2ZSQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBzZXJ2aWNlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBjb25maWd1cmF0aW9uXHJcbiAgICogQHBhcmFtIG5hdkl0ZW0gbmF2aWdhdGlvbiBpdGVtIGZvciB0aGUgdGltZXIsIGhvbGRpbmcgdGhlIGNvbmZpZ3VyYXRpb24gZGF0YVxyXG4gICAqL1xyXG4gIGluaXQobmF2SXRlbTogTmF2SXRlbSk6IHZvaWQge1xyXG4gICAgdGhpcy5jb25maWcgPSBuYXZJdGVtLnByb3BlcnRpZXMgYXMgdW5rbm93biBhcyBTZXNzaW9uVGltZXJDb25maWc7XHJcbiAgICB0aGlzLmVuZHBvaW50VXJsID0gbmF2SXRlbS5ocmVmID8/ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5rZWVwQWxpdmUgJiYgIXRoaXMuY29uZmlnLmlkbGVNb2RlKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRLZWVwQWxpdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5pZGxlTW9kZSkge1xyXG4gICAgICB0aGlzLm9uSWRsZU1vZGVBY3RpdmF0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRpbWVyUmVzZXRMaXN0ZW5lcigpO1xyXG4gICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHRoZSBcImtlZXAgYWxpdmVcIiBtb2RlLlxyXG4gICAqIEJhY2tlbmQgd2lsbCBiZSBwaW5nZWQgcGVyaW9kaWNhbGx5ICgzMCBzZWNvbmRzKSB0byBrZWVwIHRoZSBzZXNzaW9uIGFsaXZlLlxyXG4gICAqL1xyXG4gIHN0YXJ0S2VlcEFsaXZlKGNsZWFyQ2FjaGUgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlS2VlcEFsaXZlID0gdGltZXIoMTAsIDMwMDAwKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdGFydEtlZXBBbGl2ZVJlcSgpXHJcbiAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5pZGxlTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLm9uSWRsZU1vZGVBY3RpdmF0ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5pc1RpbWVvdXRBY3RpdmUkLm5leHQoZmFsc2UpO1xyXG4gICAgaWYgKGNsZWFyQ2FjaGUpIHtcclxuICAgICAgdGhpcy5jYWNoZVNlcnZpY2UuaW52YWxpZGF0ZUNhY2hlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHRoZSBcImtlZXAgYWxpdmVcIiBtb2RlIGFuZCByZXN0YXJ0IHRoZSByZWd1bGFyIHRpbWVvdXQgbW9uaXRvci5cclxuICAgKi9cclxuICBzdG9wS2VlcEFsaXZlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmVLZWVwQWxpdmUudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3RvcEtlZXBBbGl2ZVJlcSgpXHJcbiAgICAgICAgLnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgdGhpcy5pc1RpbWVvdXRBY3RpdmUkLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLmNhY2hlU2VydmljZS5pbnZhbGlkYXRlQ2FjaGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRoZSBjdXJyZW50IHRpbWVyIGFuZCBzdGFydCBhIG5ldyBjb3VudGRvd24uXHJcbiAgICogVXNlZCBieSBTZXNzaW9uSW50ZXJjZXB0b3JcclxuICAgKi9cclxuICByZXNldFRpbWVyKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZUtlZXBBbGl2ZSB8fCB0aGlzLmFjdGl2ZUtlZXBBbGl2ZS5jbG9zZWQpIHtcclxuICAgICAgdGhpcy50aW1lclJlc2V0JC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRpbWVyUmVzZXRMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgIHRoaXMudGltZXJSZXNldCRcclxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMTAwMDApKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2Vzc2lvbiB0aW1lciByZXNldC4nKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2Vzc2lvblRpbWVkT3V0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgICBjb25zdCBub3RpZmljYXRpb246IFZvbGF0aWxlTm90aWZpY2F0aW9uID0ge1xyXG4gICAgICAgIHR5cGU6ICdXQVJOSU5HJyxcclxuICAgICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgICBoZWFkbGluZTogJGxvY2FsaXplYDpAQHRvcG5hdl9zZXNzaW9uX2V4cGlyZWQ6WW91ciBzZXNzaW9uIGV4cGlyZWQuIFlvdSB3aWxsIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGxvZ2luIHBhZ2UuYFxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbklkbGVNb2RlQWN0aXZhdGVkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgICBjb25zdCBub3RpZmljYXRpb246IFZvbGF0aWxlTm90aWZpY2F0aW9uID0ge1xyXG4gICAgICAgIHR5cGU6ICdXQVJOSU5HJyxcclxuICAgICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgICBoZWFkbGluZTogJGxvY2FsaXplYDpAQHRvcG5hdl9zeXN0ZW1fcmVzdGFydDpZb3VyIEVuZ2FnZSBzeXN0ZW0gd2lsbCByZXN0YXJ0IHNob3J0bHkgZHVlIHRvIGEgc2VydmVyIHJlYm9vdC4gUGxlYXNlIHNhdmUgeW91ciB3b3JrIGFuZCBsb2cgb3V0LiBZb3UgY2FuIGxvZyBiYWNrIGluIGltbWVkaWF0ZWx5LmBcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0S2VlcEFsaXZlUmVxKCk6IE9ic2VydmFibGU8S2VlcEFsaXZlUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdChuZXcgSHR0cFBhcmFtcygpLnNldCgna2VlcEFsaXZlJywgJ3RydWUnKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BLZWVwQWxpdmVSZXEoKTogT2JzZXJ2YWJsZTxLZWVwQWxpdmVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0KG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdrZWVwQWxpdmUnLCAnZmFsc2UnKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvUmVxdWVzdChwYXJhbXM/OiBIdHRwUGFyYW1zKTogT2JzZXJ2YWJsZTxLZWVwQWxpdmVSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuZW5kcG9pbnRVcmwubGVuZ3RoID4gMDtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ0VuZHBvaW50IHVybCBmb3Igc2Vzc2lvbiB0aW1lciBpcyBlbXB0eS4gUGxlYXNlIGNoZWNrIGNvbmZpZ3VyYXRpb24nKTtcclxuICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8S2VlcEFsaXZlUmVzcG9uc2U+KHRoaXMuZW5kcG9pbnRVcmwsIHsgcGFyYW1zIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEtlZXBBbGl2ZVJlc3BvbnNlPih0aGlzLmVuZHBvaW50VXJsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRUaW1lcigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdhcm5pbmdUaW1lID0gdGhpcy5jb25maWcudGltZW91dCAqICg1IC8gNik7IC8vIDI1IG1pbnV0ZXMgZm9yIDMwIG1pbiBzZXNzaW9uXHJcbiAgICBjb25zdCB0aW1lb3V0VGltZSA9IHRoaXMuY29uZmlnLnRpbWVvdXQgLyA2OyAvLyA1IG1pbnV0ZXMgZm9yIDMwIG1pbiBzZXNzaW9uXHJcbiAgICBjb25zdCB3YXJuaW5nVGltZXIgPSB0aW1lcih3YXJuaW5nVGltZSlcclxuICAgICAgICAucGlwZShtYXBUbygnd2FybmluZycpKTtcclxuICAgIGNvbnN0IGV4cGlyeVRpbWVyID0gdGltZXIodGltZW91dFRpbWUpXHJcbiAgICAgICAgLnBpcGUobWFwVG8oJ2V4cGlyZWQnKSk7XHJcblxyXG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbiA9IGNvbmNhdCh3YXJuaW5nVGltZXIsIGV4cGlyeVRpbWVyKVxyXG4gICAgICAgIC5zdWJzY3JpYmUodiA9PiB7XHJcbiAgICAgICAgICBpZiAodiA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVvdXRXYXJuaW5nRGlhbG9nKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodiA9PT0gJ2V4cGlyZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5vblNlc3Npb25UaW1lZE91dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmV4cGlyZWRIcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24odGhpcy5jb25maWcuZXhwaXJlZEhyZWYpO1xyXG4gICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmFjdGl2ZUtlZXBBbGl2ZSAmJiAhdGhpcy5hY3RpdmVLZWVwQWxpdmUuY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuc3RvcEtlZXBBbGl2ZVJlcSgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcFRpbWVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd1RpbWVvdXRXYXJuaW5nRGlhbG9nKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlhbG9nQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSB7XHJcbiAgICAgIHdpZHRoOiAnNTAwcHgnLFxyXG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcclxuICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlLFxyXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICBwYW5lbENsYXNzOiAnbXVpLXRpbWVvdXQtZGlhbG9nJ1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVGltZW91dERpYWxvZ0NvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcclxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcyA9PT0gJ1N0b3AnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRLZWVwQWxpdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=