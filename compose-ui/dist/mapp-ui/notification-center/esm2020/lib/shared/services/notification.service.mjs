import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Notification } from '../models/notification';
import { NotificationTabs } from '../models/notification-tabs';
import * as i0 from "@angular/core";
import * as i1 from "./local-cache.service";
import * as i2 from "./backend.service";
import * as i3 from "./toast-notification.service";
/**
 * Main service class for data handling on notifications.
 * This service will coordinate all different data sources of the notifications: volatile, local cache, api responses
 * and provide a combined list to the view component.
 */
export class NotificationService {
    /**
     * Sort notifications by eventTime in descending order
     */
    static sort(notifications) {
        notifications.sort((a, b) => {
            if (a.sticky === b.sticky) {
                const timeA = DateTime.fromISO(a.eventTime).valueOf();
                const timeB = DateTime.fromISO(b.eventTime).valueOf();
                return timeB - timeA;
            }
            else {
                return a.sticky ? -1 : 1;
            }
        });
    }
    /**
     * Mark the notification as seen if it is displayed in the currently open tab
     */
    static markSeenIfNeeded(notification, activeTab) {
        if (activeTab === NotificationTabs.NewsTab && notification.type === 'NEWS' ||
            activeTab === NotificationTabs.AlertsTab && notification.type !== 'NEWS') {
            notification.seen = true;
        }
    }
    constructor(localCacheService, backendService, toastNotificationService) {
        this.localCacheService = localCacheService;
        this.backendService = backendService;
        this.toastNotificationService = toastNotificationService;
        this.pollIntervalDuration = 30000;
        this.isActive = false;
        this.activeTab = NotificationTabs.None;
        /** support legacy and unify theme appearance */
        this.appearance = 'unify';
        this.backendStream = new BehaviorSubject([]);
        this.volatileStream = new BehaviorSubject([]);
        this.combined = new BehaviorSubject([]);
        this.unseenCount = new BehaviorSubject(0);
        this.panelOpened = new BehaviorSubject(false);
    }
    /**
     * Initialize service operation.
     * - Load data from browser storage
     * - Call API for initial list of notifications
     * - init unseen counter
     * - schedule period update of notifications from API
     *
     * This should be called by main nc component once it is ready.
     */
    init() {
        this.loadInitialBackendNotifications();
        timer(this.pollIntervalDuration, this.pollIntervalDuration).pipe(takeWhile(() => this.isActive))
            .subscribe(() => (this.fetchLatestNotifications()));
        this.volatileStream.next(this.localCacheService.volatileNotifications);
        combineLatest([this.backendStream, this.volatileStream])
            .pipe(map(([bs, vs]) => {
            const all = bs.concat(vs);
            NotificationService.sort(all);
            return all;
        }))
            .subscribe(this.combined);
        this.generateUnseenCount();
        this.localCacheService.observeVolatileNotifications(this.volatileStream.asObservable());
        this.isActive = true;
    }
    /**
     * Stop the periodic calls for getting new notifications.
     * This is used when nc component is destroyed.
     */
    stopRefresh() {
        this.isActive = false;
    }
    get notifications() {
        return this.combined.asObservable();
    }
    get unseenCounter() {
        return this.unseenCount.asObservable();
    }
    get sessionId() {
        return this.backendService.getSessionId();
    }
    /**
     * Get all relevant notifications from backend for first init
     */
    loadInitialBackendNotifications() {
        const getLastUpdateTime = (notifications) => {
            if (notifications.length === 0) {
                return new Date().toISOString();
            }
            const first = notifications[0];
            return first.updateTime ? first.updateTime : first.eventTime;
        };
        this.backendService.getNotifications().subscribe(val => {
            this.mergeBackendSeenState(val);
            this.backendStream.next(val);
            this.localCacheService.observeBackendNotifications(this.backendStream.asObservable());
            this.lastFetchTime = getLastUpdateTime(val);
            // console.log('initial load of notifications', val);
        }, error => {
            // api call error case: fall back to stored notifications
            const storedNotifications = this.localCacheService.backendNotifications;
            this.backendStream.next(storedNotifications);
            this.lastFetchTime = getLastUpdateTime(storedNotifications);
            console.warn('Error retrieving notifications, using local storage data instead', error);
        });
    }
    /**
     * Check which notifications are already marked as seen in the local storage data and apply to
     * incoming notifications from API. Also mark notifications as seen which are in the current visible tab
     */
    mergeBackendSeenState(notifications) {
        const storedNotifications = this.localCacheService.backendNotifications;
        notifications.forEach(n => {
            const found = storedNotifications.find(s => ((s.id === n.id) && s.seen));
            if (found) {
                n.seen = true;
                // console.log('Already seen', n.id);
            }
            else {
                NotificationService.markSeenIfNeeded(n, this.activeTab);
            }
        });
    }
    /**
     * For subsequent repeated polling. Fetch new notifications only since last poll time.
     */
    fetchLatestNotifications() {
        const notifications = this.backendStream.getValue();
        this.backendService.getNewNotifications(this.lastFetchTime).subscribe(val => {
            if (val.length > 0) {
                val.forEach(n => {
                    // first remove existing notifications which were updated
                    const index = notifications.findIndex(oldn => oldn.id === n.id);
                    if (index > -1) {
                        notifications.splice(index, 1);
                    }
                    // mark notifications as seen already, based on open tab
                    NotificationService.markSeenIfNeeded(n, this.activeTab);
                });
                // add new notifications to the beginning of existing, as they are supposed to be newer
                const merged = val.concat(notifications);
                this.backendStream.next(merged);
                this.lastFetchTime = new Date().toISOString();
            }
            // console.log('New incoming notifications from backend', val);
        });
    }
    /**
     * Push a new volatile notification. Depending on the message content a Snackbar message or Snackbar + Notification
     * will be generated.
     * message has headline only: Snackbar
     * message has headline and body: Snackbar + Notification
     * @param notification the new notification to push
     */
    addNotification(notification) {
        if (!this.isActive) {
            throw new Error('NotificationService has not been initialized yet or is not in active mode. Please make' +
                ' sure to have the notification center component placed in your app.');
        }
        if (Notification.isVolatileNotification(notification)) {
            notification = Notification.fromVolatile(notification);
        }
        else {
            notification.isVolatile = true;
        }
        if (notification.messages[0].body === undefined || notification.messages[0].body === '') {
            this.toastNotificationService.openSnackBar(notification, false, undefined, this.appearance);
        }
        else {
            this.toastNotificationService.openSnackBar(notification, true, this.openPanel.bind(this), this.appearance);
            notification.messages[0].isExpanded = true;
            NotificationService.markSeenIfNeeded(notification, this.activeTab);
            const notifications = this.volatileStream.getValue();
            notifications.push(notification);
            this.volatileStream.next(notifications);
        }
        // console.log('new notification was added:', notification);
    }
    /**
     * Dismiss a specific notification
     * @param notification the notification to be dismissed
     */
    dismissNotification(notification) {
        const removeAndUpdate = (stream) => {
            const notifications = stream.getValue();
            const index = notifications.findIndex(el => el.id === notification.id);
            if (index > -1) {
                notifications.splice(index, 1);
                stream.next(notifications);
            }
        };
        if (notification.isVolatile) {
            removeAndUpdate(this.volatileStream);
        }
        else {
            this.backendService.dismissMessages([notification.id]);
            removeAndUpdate(this.backendStream);
        }
    }
    /**
     * Dismiss all normal notifications displayed in the Alerts tab. News and sticky notifications will remain.
     */
    dismissAllAlerts() {
        // clear out everything but news and sticky's from backend stream
        const notifications = this.backendStream.getValue();
        const filtered = [];
        const dismissedIds = [];
        notifications.forEach((n) => {
            if (n.type !== 'NEWS' && !n.sticky) {
                dismissedIds.push(n.id);
            }
            else if (n.type === 'NEWS' || n.sticky) {
                filtered.push(n);
            }
        });
        if (dismissedIds.length > 0) {
            this.backendService.dismissMessages(dismissedIds);
        }
        // console.log('dismissing non-sticky alerts, remaining are:', filtered);
        this.backendStream.next(filtered);
        // volatile stream can be emptied
        this.volatileStream.next([]);
    }
    /**
     * Set all notifications displayed in a certain tab as seen.
     * Called by notification panel when activating one of the tabs.
     */
    setNotificationsSeen(tab) {
        this.activeTab = tab;
        const setSeen = (stream) => {
            const notifications = stream.getValue();
            notifications.forEach(n => NotificationService.markSeenIfNeeded(n, tab));
            stream.next(notifications);
        };
        setSeen(this.backendStream);
        setSeen(this.volatileStream);
    }
    /**
     * Calculate the number of unseen notifications for each emission on the combined notifications observable.
     * Emit new value on unseenCount observable if the counter value changes
     */
    generateUnseenCount() {
        this.combined.subscribe(notifications => {
            const calcUnseen = (acc, n) => !n.seen ? ++acc : acc;
            const count = notifications.reduce(calcUnseen, 0);
            const oldCount = this.unseenCount.getValue();
            if (count !== oldCount) {
                this.unseenCount.next(count);
            }
        });
    }
    /**
     * Observable which reports changes of the panel state when it is opened or closed
     */
    get panelOpenedChanges() {
        return this.panelOpened.asObservable();
    }
    /**
     * Report update of the notification panel state
     * @param opened Whether the panel was opened or closed
     */
    updatePanelState(opened) {
        this.panelOpened.next(opened);
    }
    /**
     * Open the notification center panel
     */
    openPanel() {
        this.updatePanelState(true);
    }
}
NotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, deps: [{ token: i1.LocalCacheService }, { token: i2.BackendService }, { token: i3.ToastNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
NotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LocalCacheService }, { type: i2.BackendService }, { type: i3.ToastNotificationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL25vdGlmaWNhdGlvbi1jZW50ZXIvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQWMsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7QUFFL0Q7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUE2QjtRQUN2QyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN6QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3RELE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUEwQixFQUFFLFNBQTJCO1FBQzdFLElBQUksU0FBUyxLQUFLLGdCQUFnQixDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDeEUsU0FBUyxLQUFLLGdCQUFnQixDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUMxRSxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxZQUFvQixpQkFBb0MsRUFBVSxjQUE4QixFQUM1RSx3QkFBa0Q7UUFEbEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM1RSw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBckNyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFFdEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUd6QixjQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRWxDLGdEQUFnRDtRQUNoRCxlQUFVLEdBQWlCLE9BQU8sQ0FBQztRQThCakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9GLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV2RSxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyRCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSywrQkFBK0I7UUFDckMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLGFBQTZCLEVBQUUsRUFBRTtZQUMxRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDakM7WUFDRCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQy9ELENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQzlDLEdBQUcsQ0FBQyxFQUFFO1lBQ0osSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU1QyxxREFBcUQ7UUFDdkQsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFO1lBQ04seURBQXlEO1lBQ3pELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDO1lBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRTVELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0VBQWtFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0sscUJBQXFCLENBQUMsYUFBNkI7UUFDekQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUM7UUFDeEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixNQUFNLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFekUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2QscUNBQXFDO2FBQ3RDO2lCQUFNO2dCQUNMLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLHdCQUF3QjtRQUM5QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FDbkUsR0FBRyxDQUFDLEVBQUU7WUFDSixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUVsQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNkLHlEQUF5RDtvQkFDekQsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDZCxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDaEM7b0JBQ0Qsd0RBQXdEO29CQUN4RCxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsQ0FBQztnQkFFSCx1RkFBdUY7Z0JBQ3ZGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDL0M7WUFDRCwrREFBK0Q7UUFDakUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZUFBZSxDQUFDLFlBQWlEO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGO2dCQUN0RyxxRUFBcUUsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxZQUFZLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckQsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3ZGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdGO2FBQU07WUFDTCxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUMzQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRW5FLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckQsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN6QztRQUNELDREQUE0RDtJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsbUJBQW1CLENBQUMsWUFBMEI7UUFDNUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUF1QyxFQUFFLEVBQUU7WUFDbEUsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDZCxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQztRQUVGLElBQUksWUFBWSxDQUFDLFVBQVUsRUFBRTtZQUMzQixlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDZCxpRUFBaUU7UUFDakUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztRQUVsQyxhQUFhLENBQUMsT0FBTyxDQUNuQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ0osSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtRQUVELHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsQyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLEdBQXFCO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXJCLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBdUMsRUFBRSxFQUFFO1lBQzFELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNLLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUV0QyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVcsRUFBRSxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRSxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdDLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0JBQWdCLENBQUMsTUFBZTtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2lIQWxVVSxtQkFBbUI7cUhBQW5CLG1CQUFtQixjQUROLE1BQU07NEZBQ25CLG1CQUFtQjtrQkFEL0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgdGFrZVdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOQ0FwcGVhcmFuY2UgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlndXJhdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZSc7XHJcbmltcG9ydCB7IExvY2FsQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1jYWNoZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWNhdGlvbic7XHJcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWb2xhdGlsZU5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy92b2xhdGlsZS1ub3RpZmljYXRpb24nO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25UYWJzIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWNhdGlvbi10YWJzJztcclxuXHJcbi8qKlxyXG4gKiBNYWluIHNlcnZpY2UgY2xhc3MgZm9yIGRhdGEgaGFuZGxpbmcgb24gbm90aWZpY2F0aW9ucy5cclxuICogVGhpcyBzZXJ2aWNlIHdpbGwgY29vcmRpbmF0ZSBhbGwgZGlmZmVyZW50IGRhdGEgc291cmNlcyBvZiB0aGUgbm90aWZpY2F0aW9uczogdm9sYXRpbGUsIGxvY2FsIGNhY2hlLCBhcGkgcmVzcG9uc2VzXHJcbiAqIGFuZCBwcm92aWRlIGEgY29tYmluZWQgbGlzdCB0byB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgYmFja2VuZFN0cmVhbTogQmVoYXZpb3JTdWJqZWN0PE5vdGlmaWNhdGlvbltdPjsgLy8gbWVzc2FnZXMgZnJvbSBiYWNrZW5kIGFwaVxyXG4gIHByaXZhdGUgcmVhZG9ubHkgdm9sYXRpbGVTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25bXT47IC8vIHZvbGF0aWxlIG1lc3NhZ2VzXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjb21iaW5lZDogQmVoYXZpb3JTdWJqZWN0PE5vdGlmaWNhdGlvbltdPjsgLy8gYm90aCBjb21iaW5lZFxyXG4gIHByaXZhdGUgdW5zZWVuQ291bnQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9sbEludGVydmFsRHVyYXRpb24gPSAzMDAwMDtcclxuICBwcml2YXRlIGxhc3RGZXRjaFRpbWU6IHN0cmluZztcclxuICBwcml2YXRlIGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBwYW5lbE9wZW5lZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xyXG5cclxuICBhY3RpdmVUYWIgPSBOb3RpZmljYXRpb25UYWJzLk5vbmU7XHJcblxyXG4gIC8qKiBzdXBwb3J0IGxlZ2FjeSBhbmQgdW5pZnkgdGhlbWUgYXBwZWFyYW5jZSAqL1xyXG4gIGFwcGVhcmFuY2U6IE5DQXBwZWFyYW5jZSA9ICd1bmlmeSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgbm90aWZpY2F0aW9ucyBieSBldmVudFRpbWUgaW4gZGVzY2VuZGluZyBvcmRlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBzb3J0KG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdKTogdm9pZCB7XHJcbiAgICBub3RpZmljYXRpb25zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICBpZiAoYS5zdGlja3kgPT09IGIuc3RpY2t5KSB7XHJcbiAgICAgICAgICBjb25zdCB0aW1lQSA9IERhdGVUaW1lLmZyb21JU08oYS5ldmVudFRpbWUpLnZhbHVlT2YoKTtcclxuICAgICAgICAgIGNvbnN0IHRpbWVCID0gRGF0ZVRpbWUuZnJvbUlTTyhiLmV2ZW50VGltZSkudmFsdWVPZigpO1xyXG4gICAgICAgICAgcmV0dXJuIHRpbWVCIC0gdGltZUE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBhLnN0aWNreSA/IC0xIDogMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYXJrIHRoZSBub3RpZmljYXRpb24gYXMgc2VlbiBpZiBpdCBpcyBkaXNwbGF5ZWQgaW4gdGhlIGN1cnJlbnRseSBvcGVuIHRhYlxyXG4gICAqL1xyXG4gIHN0YXRpYyBtYXJrU2VlbklmTmVlZGVkKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLCBhY3RpdmVUYWI6IE5vdGlmaWNhdGlvblRhYnMpOiB2b2lkIHtcclxuICAgIGlmIChhY3RpdmVUYWIgPT09IE5vdGlmaWNhdGlvblRhYnMuTmV3c1RhYiAmJiBub3RpZmljYXRpb24udHlwZSA9PT0gJ05FV1MnIHx8XHJcbiAgICAgIGFjdGl2ZVRhYiA9PT0gTm90aWZpY2F0aW9uVGFicy5BbGVydHNUYWIgJiYgbm90aWZpY2F0aW9uLnR5cGUgIT09ICdORVdTJykge1xyXG4gICAgICBub3RpZmljYXRpb24uc2VlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2FsQ2FjaGVTZXJ2aWNlOiBMb2NhbENhY2hlU2VydmljZSwgcHJpdmF0ZSBiYWNrZW5kU2VydmljZTogQmFja2VuZFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0b2FzdE5vdGlmaWNhdGlvblNlcnZpY2U6IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgdGhpcy5iYWNrZW5kU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25bXT4oW10pO1xyXG4gICAgdGhpcy52b2xhdGlsZVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tm90aWZpY2F0aW9uW10+KFtdKTtcclxuICAgIHRoaXMuY29tYmluZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5vdGlmaWNhdGlvbltdPihbXSk7XHJcbiAgICB0aGlzLnVuc2VlbkNvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuICAgIHRoaXMucGFuZWxPcGVuZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgc2VydmljZSBvcGVyYXRpb24uXHJcbiAgICogLSBMb2FkIGRhdGEgZnJvbSBicm93c2VyIHN0b3JhZ2VcclxuICAgKiAtIENhbGwgQVBJIGZvciBpbml0aWFsIGxpc3Qgb2Ygbm90aWZpY2F0aW9uc1xyXG4gICAqIC0gaW5pdCB1bnNlZW4gY291bnRlclxyXG4gICAqIC0gc2NoZWR1bGUgcGVyaW9kIHVwZGF0ZSBvZiBub3RpZmljYXRpb25zIGZyb20gQVBJXHJcbiAgICpcclxuICAgKiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgYnkgbWFpbiBuYyBjb21wb25lbnQgb25jZSBpdCBpcyByZWFkeS5cclxuICAgKi9cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkSW5pdGlhbEJhY2tlbmROb3RpZmljYXRpb25zKCk7XHJcbiAgICB0aW1lcih0aGlzLnBvbGxJbnRlcnZhbER1cmF0aW9uLCB0aGlzLnBvbGxJbnRlcnZhbER1cmF0aW9uKS5waXBlKHRha2VXaGlsZSgoKSA9PiB0aGlzLmlzQWN0aXZlKSlcclxuICAgIC5zdWJzY3JpYmUoKCkgPT4gKHRoaXMuZmV0Y2hMYXRlc3ROb3RpZmljYXRpb25zKCkpKTtcclxuXHJcbiAgICB0aGlzLnZvbGF0aWxlU3RyZWFtLm5leHQodGhpcy5sb2NhbENhY2hlU2VydmljZS52b2xhdGlsZU5vdGlmaWNhdGlvbnMpO1xyXG5cclxuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMuYmFja2VuZFN0cmVhbSwgdGhpcy52b2xhdGlsZVN0cmVhbV0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoW2JzLCB2c10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFsbCA9IGJzLmNvbmNhdCh2cyk7XHJcbiAgICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnNvcnQoYWxsKTtcclxuICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuY29tYmluZWQpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVVbnNlZW5Db3VudCgpO1xyXG5cclxuICAgIHRoaXMubG9jYWxDYWNoZVNlcnZpY2Uub2JzZXJ2ZVZvbGF0aWxlTm90aWZpY2F0aW9ucyh0aGlzLnZvbGF0aWxlU3RyZWFtLmFzT2JzZXJ2YWJsZSgpKTtcclxuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB0aGUgcGVyaW9kaWMgY2FsbHMgZm9yIGdldHRpbmcgbmV3IG5vdGlmaWNhdGlvbnMuXHJcbiAgICogVGhpcyBpcyB1c2VkIHdoZW4gbmMgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cclxuICAgKi9cclxuICBzdG9wUmVmcmVzaCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBub3RpZmljYXRpb25zKCk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uW10+IHtcclxuICAgIHJldHVybiB0aGlzLmNvbWJpbmVkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVuc2VlbkNvdW50ZXIoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAgIHJldHVybiB0aGlzLnVuc2VlbkNvdW50LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlc3Npb25JZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZFNlcnZpY2UuZ2V0U2Vzc2lvbklkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHJlbGV2YW50IG5vdGlmaWNhdGlvbnMgZnJvbSBiYWNrZW5kIGZvciBmaXJzdCBpbml0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsb2FkSW5pdGlhbEJhY2tlbmROb3RpZmljYXRpb25zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZ2V0TGFzdFVwZGF0ZVRpbWUgPSAobm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW10pID0+IHtcclxuICAgICAgaWYgKG5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmaXJzdCA9IG5vdGlmaWNhdGlvbnNbMF07XHJcbiAgICAgIHJldHVybiBmaXJzdC51cGRhdGVUaW1lID8gZmlyc3QudXBkYXRlVGltZSA6IGZpcnN0LmV2ZW50VGltZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5iYWNrZW5kU2VydmljZS5nZXROb3RpZmljYXRpb25zKCkuc3Vic2NyaWJlKFxyXG4gICAgICB2YWwgPT4ge1xyXG4gICAgICAgIHRoaXMubWVyZ2VCYWNrZW5kU2VlblN0YXRlKHZhbCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZW5kU3RyZWFtLm5leHQodmFsKTtcclxuICAgICAgICB0aGlzLmxvY2FsQ2FjaGVTZXJ2aWNlLm9ic2VydmVCYWNrZW5kTm90aWZpY2F0aW9ucyh0aGlzLmJhY2tlbmRTdHJlYW0uYXNPYnNlcnZhYmxlKCkpO1xyXG4gICAgICAgIHRoaXMubGFzdEZldGNoVGltZSA9IGdldExhc3RVcGRhdGVUaW1lKHZhbCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbml0aWFsIGxvYWQgb2Ygbm90aWZpY2F0aW9ucycsIHZhbCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAvLyBhcGkgY2FsbCBlcnJvciBjYXNlOiBmYWxsIGJhY2sgdG8gc3RvcmVkIG5vdGlmaWNhdGlvbnNcclxuICAgICAgICBjb25zdCBzdG9yZWROb3RpZmljYXRpb25zID0gdGhpcy5sb2NhbENhY2hlU2VydmljZS5iYWNrZW5kTm90aWZpY2F0aW9ucztcclxuICAgICAgICB0aGlzLmJhY2tlbmRTdHJlYW0ubmV4dChzdG9yZWROb3RpZmljYXRpb25zKTtcclxuICAgICAgICB0aGlzLmxhc3RGZXRjaFRpbWUgPSBnZXRMYXN0VXBkYXRlVGltZShzdG9yZWROb3RpZmljYXRpb25zKTtcclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciByZXRyaWV2aW5nIG5vdGlmaWNhdGlvbnMsIHVzaW5nIGxvY2FsIHN0b3JhZ2UgZGF0YSBpbnN0ZWFkJywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgd2hpY2ggbm90aWZpY2F0aW9ucyBhcmUgYWxyZWFkeSBtYXJrZWQgYXMgc2VlbiBpbiB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhIGFuZCBhcHBseSB0b1xyXG4gICAqIGluY29taW5nIG5vdGlmaWNhdGlvbnMgZnJvbSBBUEkuIEFsc28gbWFyayBub3RpZmljYXRpb25zIGFzIHNlZW4gd2hpY2ggYXJlIGluIHRoZSBjdXJyZW50IHZpc2libGUgdGFiXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtZXJnZUJhY2tlbmRTZWVuU3RhdGUobm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW10pOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b3JlZE5vdGlmaWNhdGlvbnMgPSB0aGlzLmxvY2FsQ2FjaGVTZXJ2aWNlLmJhY2tlbmROb3RpZmljYXRpb25zO1xyXG4gICAgbm90aWZpY2F0aW9ucy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IHN0b3JlZE5vdGlmaWNhdGlvbnMuZmluZChzID0+ICgocy5pZCA9PT0gbi5pZCkgJiYgcy5zZWVuKSk7XHJcblxyXG4gICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICBuLnNlZW4gPSB0cnVlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBbHJlYWR5IHNlZW4nLCBuLmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLm1hcmtTZWVuSWZOZWVkZWQobiwgdGhpcy5hY3RpdmVUYWIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBzdWJzZXF1ZW50IHJlcGVhdGVkIHBvbGxpbmcuIEZldGNoIG5ldyBub3RpZmljYXRpb25zIG9ubHkgc2luY2UgbGFzdCBwb2xsIHRpbWUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmZXRjaExhdGVzdE5vdGlmaWNhdGlvbnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25zID0gdGhpcy5iYWNrZW5kU3RyZWFtLmdldFZhbHVlKCk7XHJcblxyXG4gICAgdGhpcy5iYWNrZW5kU2VydmljZS5nZXROZXdOb3RpZmljYXRpb25zKHRoaXMubGFzdEZldGNoVGltZSkuc3Vic2NyaWJlKFxyXG4gICAgICB2YWwgPT4ge1xyXG4gICAgICAgIGlmICh2YWwubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgIHZhbC5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICAvLyBmaXJzdCByZW1vdmUgZXhpc3Rpbmcgbm90aWZpY2F0aW9ucyB3aGljaCB3ZXJlIHVwZGF0ZWRcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBub3RpZmljYXRpb25zLmZpbmRJbmRleChvbGRuID0+IG9sZG4uaWQgPT09IG4uaWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtYXJrIG5vdGlmaWNhdGlvbnMgYXMgc2VlbiBhbHJlYWR5LCBiYXNlZCBvbiBvcGVuIHRhYlxyXG4gICAgICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLm1hcmtTZWVuSWZOZWVkZWQobiwgdGhpcy5hY3RpdmVUYWIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gYWRkIG5ldyBub3RpZmljYXRpb25zIHRvIHRoZSBiZWdpbm5pbmcgb2YgZXhpc3RpbmcsIGFzIHRoZXkgYXJlIHN1cHBvc2VkIHRvIGJlIG5ld2VyXHJcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB2YWwuY29uY2F0KG5vdGlmaWNhdGlvbnMpO1xyXG5cclxuICAgICAgICAgIHRoaXMuYmFja2VuZFN0cmVhbS5uZXh0KG1lcmdlZCk7XHJcbiAgICAgICAgICB0aGlzLmxhc3RGZXRjaFRpbWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdOZXcgaW5jb21pbmcgbm90aWZpY2F0aW9ucyBmcm9tIGJhY2tlbmQnLCB2YWwpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHVzaCBhIG5ldyB2b2xhdGlsZSBub3RpZmljYXRpb24uIERlcGVuZGluZyBvbiB0aGUgbWVzc2FnZSBjb250ZW50IGEgU25hY2tiYXIgbWVzc2FnZSBvciBTbmFja2JhciArIE5vdGlmaWNhdGlvblxyXG4gICAqIHdpbGwgYmUgZ2VuZXJhdGVkLlxyXG4gICAqIG1lc3NhZ2UgaGFzIGhlYWRsaW5lIG9ubHk6IFNuYWNrYmFyXHJcbiAgICogbWVzc2FnZSBoYXMgaGVhZGxpbmUgYW5kIGJvZHk6IFNuYWNrYmFyICsgTm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbiB0aGUgbmV3IG5vdGlmaWNhdGlvbiB0byBwdXNoXHJcbiAgICovXHJcbiAgYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uIHwgVm9sYXRpbGVOb3RpZmljYXRpb24pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdGlmaWNhdGlvblNlcnZpY2UgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldCBvciBpcyBub3QgaW4gYWN0aXZlIG1vZGUuIFBsZWFzZSBtYWtlJyArXHJcbiAgICAgICAgJyBzdXJlIHRvIGhhdmUgdGhlIG5vdGlmaWNhdGlvbiBjZW50ZXIgY29tcG9uZW50IHBsYWNlZCBpbiB5b3VyIGFwcC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTm90aWZpY2F0aW9uLmlzVm9sYXRpbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKSkge1xyXG4gICAgICBub3RpZmljYXRpb24gPSBOb3RpZmljYXRpb24uZnJvbVZvbGF0aWxlKG5vdGlmaWNhdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBub3RpZmljYXRpb24uaXNWb2xhdGlsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5tZXNzYWdlc1swXS5ib2R5ID09PSB1bmRlZmluZWQgfHwgbm90aWZpY2F0aW9uLm1lc3NhZ2VzWzBdLmJvZHkgPT09ICcnKSB7XHJcbiAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLm9wZW5TbmFja0Jhcihub3RpZmljYXRpb24sIGZhbHNlLCB1bmRlZmluZWQsIHRoaXMuYXBwZWFyYW5jZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uU2VydmljZS5vcGVuU25hY2tCYXIobm90aWZpY2F0aW9uLCB0cnVlLCB0aGlzLm9wZW5QYW5lbC5iaW5kKHRoaXMpLCB0aGlzLmFwcGVhcmFuY2UpO1xyXG4gICAgICBub3RpZmljYXRpb24ubWVzc2FnZXNbMF0uaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIE5vdGlmaWNhdGlvblNlcnZpY2UubWFya1NlZW5JZk5lZWRlZChub3RpZmljYXRpb24sIHRoaXMuYWN0aXZlVGFiKTtcclxuXHJcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB0aGlzLnZvbGF0aWxlU3RyZWFtLmdldFZhbHVlKCk7XHJcbiAgICAgIG5vdGlmaWNhdGlvbnMucHVzaChub3RpZmljYXRpb24pO1xyXG5cclxuICAgICAgdGhpcy52b2xhdGlsZVN0cmVhbS5uZXh0KG5vdGlmaWNhdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coJ25ldyBub3RpZmljYXRpb24gd2FzIGFkZGVkOicsIG5vdGlmaWNhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNtaXNzIGEgc3BlY2lmaWMgbm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbiB0aGUgbm90aWZpY2F0aW9uIHRvIGJlIGRpc21pc3NlZFxyXG4gICAqL1xyXG4gIGRpc21pc3NOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlbW92ZUFuZFVwZGF0ZSA9IChzdHJlYW06IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25bXT4pID0+IHtcclxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9ucyA9IHN0cmVhbS5nZXRWYWx1ZSgpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IG5vdGlmaWNhdGlvbnMuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBub3RpZmljYXRpb24uaWQpO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIG5vdGlmaWNhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBzdHJlYW0ubmV4dChub3RpZmljYXRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAobm90aWZpY2F0aW9uLmlzVm9sYXRpbGUpIHtcclxuICAgICAgcmVtb3ZlQW5kVXBkYXRlKHRoaXMudm9sYXRpbGVTdHJlYW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5iYWNrZW5kU2VydmljZS5kaXNtaXNzTWVzc2FnZXMoW25vdGlmaWNhdGlvbi5pZF0pO1xyXG4gICAgICByZW1vdmVBbmRVcGRhdGUodGhpcy5iYWNrZW5kU3RyZWFtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc21pc3MgYWxsIG5vcm1hbCBub3RpZmljYXRpb25zIGRpc3BsYXllZCBpbiB0aGUgQWxlcnRzIHRhYi4gTmV3cyBhbmQgc3RpY2t5IG5vdGlmaWNhdGlvbnMgd2lsbCByZW1haW4uXHJcbiAgICovXHJcbiAgZGlzbWlzc0FsbEFsZXJ0cygpOiB2b2lkIHtcclxuICAgIC8vIGNsZWFyIG91dCBldmVyeXRoaW5nIGJ1dCBuZXdzIGFuZCBzdGlja3kncyBmcm9tIGJhY2tlbmQgc3RyZWFtXHJcbiAgICBjb25zdCBub3RpZmljYXRpb25zID0gdGhpcy5iYWNrZW5kU3RyZWFtLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJlZDogTm90aWZpY2F0aW9uW10gPSBbXTtcclxuICAgIGNvbnN0IGRpc21pc3NlZElkczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBub3RpZmljYXRpb25zLmZvckVhY2goXHJcbiAgICAgIChuKSA9PiB7XHJcbiAgICAgICAgaWYgKG4udHlwZSAhPT0gJ05FV1MnICYmICFuLnN0aWNreSkge1xyXG4gICAgICAgICAgZGlzbWlzc2VkSWRzLnB1c2gobi5pZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChuLnR5cGUgPT09ICdORVdTJyB8fCBuLnN0aWNreSkge1xyXG4gICAgICAgICAgZmlsdGVyZWQucHVzaChuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBpZiAoZGlzbWlzc2VkSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5iYWNrZW5kU2VydmljZS5kaXNtaXNzTWVzc2FnZXMoZGlzbWlzc2VkSWRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnZGlzbWlzc2luZyBub24tc3RpY2t5IGFsZXJ0cywgcmVtYWluaW5nIGFyZTonLCBmaWx0ZXJlZCk7XHJcbiAgICB0aGlzLmJhY2tlbmRTdHJlYW0ubmV4dChmaWx0ZXJlZCk7XHJcblxyXG4gICAgLy8gdm9sYXRpbGUgc3RyZWFtIGNhbiBiZSBlbXB0aWVkXHJcbiAgICB0aGlzLnZvbGF0aWxlU3RyZWFtLm5leHQoW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGFsbCBub3RpZmljYXRpb25zIGRpc3BsYXllZCBpbiBhIGNlcnRhaW4gdGFiIGFzIHNlZW4uXHJcbiAgICogQ2FsbGVkIGJ5IG5vdGlmaWNhdGlvbiBwYW5lbCB3aGVuIGFjdGl2YXRpbmcgb25lIG9mIHRoZSB0YWJzLlxyXG4gICAqL1xyXG4gIHNldE5vdGlmaWNhdGlvbnNTZWVuKHRhYjogTm90aWZpY2F0aW9uVGFicyk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XHJcblxyXG4gICAgY29uc3Qgc2V0U2VlbiA9IChzdHJlYW06IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25bXT4pID0+IHtcclxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9ucyA9IHN0cmVhbS5nZXRWYWx1ZSgpO1xyXG4gICAgICBub3RpZmljYXRpb25zLmZvckVhY2gobiA9PiBOb3RpZmljYXRpb25TZXJ2aWNlLm1hcmtTZWVuSWZOZWVkZWQobiwgdGFiKSk7XHJcbiAgICAgIHN0cmVhbS5uZXh0KG5vdGlmaWNhdGlvbnMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZXRTZWVuKHRoaXMuYmFja2VuZFN0cmVhbSk7XHJcbiAgICBzZXRTZWVuKHRoaXMudm9sYXRpbGVTdHJlYW0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBudW1iZXIgb2YgdW5zZWVuIG5vdGlmaWNhdGlvbnMgZm9yIGVhY2ggZW1pc3Npb24gb24gdGhlIGNvbWJpbmVkIG5vdGlmaWNhdGlvbnMgb2JzZXJ2YWJsZS5cclxuICAgKiBFbWl0IG5ldyB2YWx1ZSBvbiB1bnNlZW5Db3VudCBvYnNlcnZhYmxlIGlmIHRoZSBjb3VudGVyIHZhbHVlIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIGdlbmVyYXRlVW5zZWVuQ291bnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbWJpbmVkLnN1YnNjcmliZShub3RpZmljYXRpb25zID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGNhbGNVbnNlZW4gPSAoYWNjOiBudW1iZXIsIG46IE5vdGlmaWNhdGlvbikgPT4gIW4uc2VlbiA/ICsrYWNjIDogYWNjO1xyXG4gICAgICBjb25zdCBjb3VudCA9IG5vdGlmaWNhdGlvbnMucmVkdWNlKGNhbGNVbnNlZW4sIDApO1xyXG4gICAgICBjb25zdCBvbGRDb3VudCA9IHRoaXMudW5zZWVuQ291bnQuZ2V0VmFsdWUoKTtcclxuICAgICAgaWYgKGNvdW50ICE9PSBvbGRDb3VudCkge1xyXG4gICAgICAgIHRoaXMudW5zZWVuQ291bnQubmV4dChjb3VudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSB3aGljaCByZXBvcnRzIGNoYW5nZXMgb2YgdGhlIHBhbmVsIHN0YXRlIHdoZW4gaXQgaXMgb3BlbmVkIG9yIGNsb3NlZFxyXG4gICAqL1xyXG4gIGdldCBwYW5lbE9wZW5lZENoYW5nZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbE9wZW5lZC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcG9ydCB1cGRhdGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBwYW5lbCBzdGF0ZVxyXG4gICAqIEBwYXJhbSBvcGVuZWQgV2hldGhlciB0aGUgcGFuZWwgd2FzIG9wZW5lZCBvciBjbG9zZWRcclxuICAgKi9cclxuICB1cGRhdGVQYW5lbFN0YXRlKG9wZW5lZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5wYW5lbE9wZW5lZC5uZXh0KG9wZW5lZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVuIHRoZSBub3RpZmljYXRpb24gY2VudGVyIHBhbmVsXHJcbiAgICovXHJcbiAgb3BlblBhbmVsKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVQYW5lbFN0YXRlKHRydWUpO1xyXG4gIH1cclxufVxyXG4iXX0=