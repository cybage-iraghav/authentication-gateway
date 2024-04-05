import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, Component, ChangeDetectionStrategy, EventEmitter, Output, Input, LOCALE_ID, NgModule } from '@angular/core';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as i1$1 from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import * as i2$1 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i4 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateTime } from 'luxon';
import { EMPTY, BehaviorSubject, timer, combineLatest, Subject, of } from 'rxjs';
import { takeWhile, map, takeUntil, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1$3 from '@angular/platform-browser';
import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const DISPLAY_STATES$1 = {
    collapsed: 'collapsed',
    expanded: 'expanded'
};

/**
 * Expand / collapse animation in use by the notification messages
 */
const messageDisplayAnimation = trigger('messageDisplayState', [
    state(DISPLAY_STATES$1.collapsed, style({
        height: '0px',
        visibility: 'hidden'
    })),
    state(DISPLAY_STATES$1.expanded, style({
        height: '*',
        visibility: 'visible'
    })),
    transition('collapsed <=> expanded', animate('150ms cubic-bezier(0.4,0.0,0.2,1)'))
]);

class Notification {
    constructor() {
        this.isVolatile = false;
        this.seen = false;
    }
    /**
     * Create a full Notification from a VolatileNotification by generating missing properties.
     * @param vn The VolatileNotification to be converted
     * @returns full Notification object with auto-generated id and eventTime
     */
    static fromVolatile(vn) {
        const notification = new Notification();
        notification.messages = [vn.message];
        notification.type = vn.type;
        notification.id = Date.now();
        notification.eventTime = new Date().toISOString();
        notification.sticky = false;
        notification.isVolatile = true;
        return notification;
    }
    static isVolatileNotification(n) {
        const notification = n;
        return notification.id === undefined && notification.eventTime === undefined;
    }
}

var NotificationTabs;
(function (NotificationTabs) {
    NotificationTabs[NotificationTabs["None"] = -1] = "None";
    NotificationTabs[NotificationTabs["AlertsTab"] = 0] = "AlertsTab";
    NotificationTabs[NotificationTabs["NewsTab"] = 1] = "NewsTab";
})(NotificationTabs || (NotificationTabs = {}));

/**
 * Configuration for local storage
 */
class LocalStorageConfig {
    /**
     * @param clientDataStoreBackend key-name under which the notifications from backend will be stored.
     * @param clientDataStoreVolatile key-name under which the volatile notifications will be stored.
     * @param clientDataStoreType type of local storage to use. Defaults to local
     */
    constructor(clientDataStoreBackend = 'nc-notification-center-messages-backend', clientDataStoreVolatile = 'nc-notification-center-messages-volatile', clientDataStoreType = 'local') {
        this.clientDataStoreBackend = clientDataStoreBackend;
        this.clientDataStoreVolatile = clientDataStoreVolatile;
        this.clientDataStoreType = clientDataStoreType;
    }
}
/**
 * Configuration options for the notification center panel
 */
class PanelConfig {
    /**
     * @param topOffset Define offset for the notification panel from the top of the viewport.
     * Defaults to 54px (for usage with mui-app-header). When used with mui-top-navigation component, use 48px.
     */
    constructor(topOffset = '48px') {
        this.topOffset = topOffset;
    }
}
const NC_API_CONFIG = new InjectionToken('nc.apiConfig');

/**
 * Service for handling local caching of notifications, either in local storage or session storage.
 * By default, notifications will be cached in the local storage.
 */
class LocalCacheService {
    constructor() {
        this.config = new LocalStorageConfig();
        this.webStorage = this.config.clientDataStoreType === 'session' ? sessionStorage : localStorage;
    }
    observeBackendNotifications(notifications) {
        this.observeNotifications(notifications, this.config.clientDataStoreBackend);
    }
    observeVolatileNotifications(notifications) {
        this.observeNotifications(notifications, this.config.clientDataStoreVolatile);
    }
    observeNotifications(notifications, storageKey) {
        notifications.subscribe((notificationsData) => {
            this.webStorage.setItem(storageKey, JSON.stringify(notificationsData));
        });
    }
    get backendNotifications() {
        return this.getCachedNotifications(this.config.clientDataStoreBackend);
    }
    get volatileNotifications() {
        return this.getCachedNotifications(this.config.clientDataStoreVolatile);
    }
    getCachedNotifications(storageKey) {
        const storedNotifications = this.webStorage.getItem(storageKey);
        return storedNotifications != null ? JSON.parse(storedNotifications) : [];
    }
}
LocalCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/**
 * The BackendService handles http connection to the nc-service API and provides
 * wrapper functions around the individual endpoints.
 */
class BackendService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        if (this.config === null) {
            console.warn('No configuration set for NC API connection. NC will work in UI-only mode.');
        }
    }
    getNotifications() {
        if (this.config === null) {
            return EMPTY;
        }
        const url = `${this.config.baseUrl}active${this.buildUserQuery()}`;
        return this.http.get(url);
    }
    getSessionId() {
        if (this.config === null) {
            return '';
        }
        if (this.config.connectionMode === 'cep') {
            return this.config.sessionId || '';
        }
        else {
            return '';
        }
    }
    dismissMessages(nIds) {
        if (this.config !== null) {
            const dismissQuery = this.config.connectionMode === 'cep' ? this.config.sessionId || '' : '/';
            const url = `${this.config.baseUrl}dismiss${dismissQuery}`;
            let payload;
            if (this.config.userInfo) {
                payload = Object.assign({}, this.config.userInfo);
                payload.notificationIds = nIds;
            }
            else {
                payload = nIds;
            }
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(url, payload, { headers })
                .subscribe({
                error: (error) => {
                    console.error('NC: Dismiss call error', error);
                }
            });
        }
    }
    getNewNotifications(sinceDate) {
        if (this.config === null) {
            return EMPTY;
        }
        let url = `${this.config.baseUrl}active/latest${this.buildUserQuery()}`;
        url += this.config.connectionMode === 'cep' ? '?' : '&';
        url += `since=${sinceDate}`;
        return this.http.get(url);
    }
    buildUserQuery() {
        if (this.config.connectionMode === 'cep') {
            return this.config.sessionId || '';
        }
        else {
            const userInfo = this.config.userInfo;
            if (typeof userInfo === 'object') {
                let locale = 'en';
                if (typeof userInfo.locale === 'string') {
                    locale = userInfo.locale;
                }
                return `?datacenter=${userInfo.datacenter}&database=${userInfo.database}&customerId=${userInfo.customerId}`
                    + `&userId=${userInfo.userId}&locale=${locale}`;
            }
            return '';
        }
    }
}
BackendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, deps: [{ token: i1.HttpClient }, { token: NC_API_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
BackendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () {
        return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [NC_API_CONFIG]
                    }, {
                        type: Optional
                    }] }];
    } });

class NotificationSnackbarComponent {
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
        this.iconClass = data.appearance === 'legacy' ? 'material-icons' : 'mui-icons';
    }
    get hasAction() {
        return this.data.showButton;
    }
    action() {
        this.snackBarRef.dismissWithAction();
    }
}
NotificationSnackbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationSnackbarComponent, deps: [{ token: i1$1.MatSnackBarRef }, { token: MAT_SNACK_BAR_DATA }], target: i0.ɵɵFactoryTarget.Component });
NotificationSnackbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationSnackbarComponent, selector: "mui-notification-snackbar", ngImport: i0, template: "<div class=\"mui-snackbar-notification-container\">\r\n  <div matSnackBarLabel>\r\n    <i class=\"{{ iconClass }} mui-message-icon {{ data.notification.type | lowercase }}\"></i>\r\n    {{ data.notification.messages[0].headline }}\r\n  </div>\r\n  <div class=\"mat-simple-snackbar-action\"\r\n      *ngIf=\"hasAction\"\r\n      matSnackBarActions\r\n  >\r\n    <button mat-button\r\n        matSnackBarAction\r\n        (click)=\"action()\" i18n=\"@@nc_snackbar_details_btn\">Details</button>\r\n  </div>\r\n</div>\r\n", styles: [".mui-snackbar-notification-container{display:flex;justify-content:space-between;align-items:center;opacity:1;word-break:break-word}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1$1.MatSnackBarLabel, selector: "[matSnackBarLabel]" }, { kind: "directive", type: i1$1.MatSnackBarActions, selector: "[matSnackBarActions]" }, { kind: "directive", type: i1$1.MatSnackBarAction, selector: "[matSnackBarAction]" }, { kind: "pipe", type: i1$2.LowerCasePipe, name: "lowercase" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationSnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-snackbar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-snackbar-notification-container\">\r\n  <div matSnackBarLabel>\r\n    <i class=\"{{ iconClass }} mui-message-icon {{ data.notification.type | lowercase }}\"></i>\r\n    {{ data.notification.messages[0].headline }}\r\n  </div>\r\n  <div class=\"mat-simple-snackbar-action\"\r\n      *ngIf=\"hasAction\"\r\n      matSnackBarActions\r\n  >\r\n    <button mat-button\r\n        matSnackBarAction\r\n        (click)=\"action()\" i18n=\"@@nc_snackbar_details_btn\">Details</button>\r\n  </div>\r\n</div>\r\n", styles: [".mui-snackbar-notification-container{display:flex;justify-content:space-between;align-items:center;opacity:1;word-break:break-word}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i1$1.MatSnackBarRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_SNACK_BAR_DATA]
                    }] }];
    } });

class ToastNotificationService {
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
ToastNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, deps: [{ token: i1$1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
ToastNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastNotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.MatSnackBar }]; } });

/**
 * Main service class for data handling on notifications.
 * This service will coordinate all different data sources of the notifications: volatile, local cache, api responses
 * and provide a combined list to the view component.
 */
class NotificationService {
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
NotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, deps: [{ token: LocalCacheService }, { token: BackendService }, { token: ToastNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
NotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: LocalCacheService }, { type: BackendService }, { type: ToastNotificationService }]; } });

class MessageComponent {
    constructor(sanitizer, cd, ncs) {
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.ncs = ncs;
        this.notificationDismiss = new EventEmitter();
        this.messageClickOptionalAction = new EventEmitter();
        this.messageDisplay = DISPLAY_STATES$1.collapsed;
        this.appearance = 'unify';
        this.iconClass = 'material-icons';
        this.expandIcon = 'expand_more';
        this.collapseIcon = 'expand_less';
        this.destroyed$ = new Subject();
    }
    ngOnChanges() {
        this.message = this.notification.messages[0];
        if (this.message.isExpanded) {
            this.toggleMessageViewState();
        }
        if (this.message.htmlContent && this.message.body) {
            this.message.bodyHtml = this.sanitizer.bypassSecurityTrustHtml(this.message.body);
        }
        if (this.notification.eventTime) {
            const dateTime = DateTime.fromISO(this.notification.eventTime);
            this.eventTimeRelative = dateTime.toRelative({ style: 'narrow' });
            this.eventTimeFormatted = dateTime.toFormat('f');
        }
    }
    ngOnInit() {
        this.ncs.panelOpenedChanges.pipe(takeUntil(this.destroyed$), filter(v => v === true))
            .subscribe(() => {
            this.eventTimeRelative = DateTime.fromISO(this.notification.eventTime)
                .toRelative({ style: 'short' });
            this.cd.markForCheck();
        });
        this.updateAppearance();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDismiss(notification) {
        this.notificationDismiss.emit(notification);
    }
    toggleMessageViewState() {
        if (this.messageDisplay === DISPLAY_STATES$1.collapsed) {
            this.messageDisplay = DISPLAY_STATES$1.expanded;
        }
        else {
            this.messageDisplay = DISPLAY_STATES$1.collapsed;
        }
    }
    getTitle() {
        return this.message.headline;
    }
    onClickOptionalAction() {
        this.messageClickOptionalAction.emit(this.message.optionalActionLink);
    }
    updateAppearance() {
        this.appearance = this.ncs.appearance;
        if (this.appearance === 'unify') {
            this.iconClass = 'mui-icons';
            this.collapseIcon = 'chevron_down';
            this.expandIcon = 'chevron_left';
        }
        else {
            this.iconClass = 'material-icons';
            this.collapseIcon = 'expand_less';
            this.expandIcon = 'expand_more';
        }
    }
}
MessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageComponent, deps: [{ token: i1$3.DomSanitizer }, { token: i0.ChangeDetectorRef }, { token: NotificationService }], target: i0.ɵɵFactoryTarget.Component });
MessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MessageComponent, selector: "mui-notification-message", inputs: { notification: "notification" }, outputs: { notificationDismiss: "notificationDismiss", messageClickOptionalAction: "messageClickOptionalAction" }, exportAs: ["muiNotificationMessage"], usesOnChanges: true, ngImport: i0, template: "<div class=\"{{notification.type | lowercase}}\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} mui-message-icon {{ notification.type | lowercase }}\"\r\n          (click)=\"onDismiss(notification)\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\">{{eventTimeRelative}}</div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div *ngIf=\"!message.htmlContent\"\r\n            class=\"plaintext\">{{message.body}}</div>\r\n        <div *ngIf=\"message.htmlContent\"\r\n            class=\"htmlcontent\"\r\n            [innerHTML]=\"message.bodyHtml\"></div>\r\n      </div>\r\n      <div class=\"mui-message-image-container\"\r\n          *ngIf=\"message.imageUrl\">\r\n        <img class=\"mui-message-image\"\r\n            src=\"{{message.imageUrl}}\"/>\r\n      </div>\r\n      <div class=\"mui-message-actions\">\r\n        <div *ngIf=\"message.optionalActionLink\"\r\n            class=\"mui-message-actions-optional\"\r\n        >\r\n          <a *ngIf=\"message.optionalActionLink && notification.type === 'NEWS'\"\r\n              href=\"{{message.optionalActionLink}}\"\r\n              target=\"_blank\"\r\n              class=\"mui-btn-action\">{{message.optionalActionTitle}}</a>\r\n          <a *ngIf=\"message.optionalActionLink && notification.type !== 'NEWS'\"\r\n              class=\"mui-btn-action\"\r\n              [matTooltip]=\"message.optionalActionTitle ?? ''\"\r\n              matTooltipClass=\"mui-btn-action-tooltip\"\r\n              [matTooltipDisabled]=\"(message.optionalActionTitle?.length ?? 0) < 30\"\r\n              (click)=\"onClickOptionalAction()\">\r\n            <span>{{message.optionalActionTitle}}</span>\r\n          </a>\r\n        </div>\r\n        <div class=\"mui-message-actions-main\">\r\n          <span class=\"mui-timestamp\">{{ eventTimeFormatted }}</span>\r\n          <a *ngIf=\"notification.type !== 'NEWS'\"\r\n              class=\"mui-btn-dismiss\"\r\n              (click)=\"onDismiss(notification)\"\r\n              i18n=\"@@nc_dismiss_btn\">Dismiss</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "pipe", type: i1$2.LowerCasePipe, name: "lowercase" }], animations: [messageDisplayAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-message', exportAs: 'muiNotificationMessage', animations: [messageDisplayAnimation], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"{{notification.type | lowercase}}\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} mui-message-icon {{ notification.type | lowercase }}\"\r\n          (click)=\"onDismiss(notification)\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\">{{eventTimeRelative}}</div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div *ngIf=\"!message.htmlContent\"\r\n            class=\"plaintext\">{{message.body}}</div>\r\n        <div *ngIf=\"message.htmlContent\"\r\n            class=\"htmlcontent\"\r\n            [innerHTML]=\"message.bodyHtml\"></div>\r\n      </div>\r\n      <div class=\"mui-message-image-container\"\r\n          *ngIf=\"message.imageUrl\">\r\n        <img class=\"mui-message-image\"\r\n            src=\"{{message.imageUrl}}\"/>\r\n      </div>\r\n      <div class=\"mui-message-actions\">\r\n        <div *ngIf=\"message.optionalActionLink\"\r\n            class=\"mui-message-actions-optional\"\r\n        >\r\n          <a *ngIf=\"message.optionalActionLink && notification.type === 'NEWS'\"\r\n              href=\"{{message.optionalActionLink}}\"\r\n              target=\"_blank\"\r\n              class=\"mui-btn-action\">{{message.optionalActionTitle}}</a>\r\n          <a *ngIf=\"message.optionalActionLink && notification.type !== 'NEWS'\"\r\n              class=\"mui-btn-action\"\r\n              [matTooltip]=\"message.optionalActionTitle ?? ''\"\r\n              matTooltipClass=\"mui-btn-action-tooltip\"\r\n              [matTooltipDisabled]=\"(message.optionalActionTitle?.length ?? 0) < 30\"\r\n              (click)=\"onClickOptionalAction()\">\r\n            <span>{{message.optionalActionTitle}}</span>\r\n          </a>\r\n        </div>\r\n        <div class=\"mui-message-actions-main\">\r\n          <span class=\"mui-timestamp\">{{ eventTimeFormatted }}</span>\r\n          <a *ngIf=\"notification.type !== 'NEWS'\"\r\n              class=\"mui-btn-dismiss\"\r\n              (click)=\"onDismiss(notification)\"\r\n              i18n=\"@@nc_dismiss_btn\">Dismiss</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$3.DomSanitizer }, { type: i0.ChangeDetectorRef }, { type: NotificationService }]; }, propDecorators: { notificationDismiss: [{
                type: Output
            }], messageClickOptionalAction: [{
                type: Output
            }], notification: [{
                type: Input
            }] } });

class MessageStickyComponent extends MessageComponent {
    constructor(notificationService, sanitizer, cd) {
        super(sanitizer, cd, notificationService);
        this.messageDisplay = DISPLAY_STATES$1.expanded;
        this.timeLeft = '';
    }
    ngOnChanges() {
        this.message = this.notification.messages[0];
        if (this.notification.type === 'COUNTDOWN') {
            const updateTimer = timer(0, 60000);
            this.timerSubscription = updateTimer.subscribe(() => this.timeLeftCalc());
        }
    }
    ngOnDestroy() {
        var _a;
        super.ngOnDestroy();
        (_a = this.timerSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    timeLeftCalc() {
        if (this.notification.expiryTime) {
            const expiry = DateTime.fromISO(this.notification.expiryTime);
            const duration = expiry.diff(DateTime.local());
            const ms = duration.milliseconds;
            if (ms < 1) {
                this.timerSubscription.unsubscribe();
                this.ncs.dismissNotification(this.notification);
            }
            else {
                this.timeLeft = expiry.toRelative({ style: 'short' });
            }
            this.cd.markForCheck();
        }
    }
}
MessageStickyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageStickyComponent, deps: [{ token: NotificationService }, { token: i1$3.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MessageStickyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MessageStickyComponent, selector: "mui-notification-message-sticky", inputs: { notification: "notification" }, exportAs: ["muiNotificationMessageSticky"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"sticky-message-container\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} sticky-message-icon warning\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\"\r\n        *ngIf=\"notification.type === 'COUNTDOWN'\">\r\n      <span class=\"sticky-countdown\">{{ timeLeft }}</span>\r\n    </div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div class=\"plaintext\">{{message.body}}</div>\r\n      </div>\r\n      <div class=\"mui-message-actions\"\r\n          *ngIf=\"message.optionalActionLink\">\r\n        <a href=\"{{message.optionalActionLink}}\"\r\n            target=\"_blank\"\r\n            class=\"mui-btn-action\"\r\n            i18n=\"@@nc_more_details\"\r\n        >More Details</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [messageDisplayAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MessageStickyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-message-sticky', exportAs: 'muiNotificationMessageSticky', animations: [messageDisplayAnimation], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"sticky-message-container\">\r\n  <div class=\"mui-message-container\">\r\n    <div class=\"mui-title-container\">\r\n      <i class=\"{{ iconClass }} sticky-message-icon warning\"></i>\r\n      <span class=\"mui-title\">{{getTitle()}}</span>\r\n      <span class=\"mui-expand\"\r\n          (click)=\"toggleMessageViewState()\">\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'collapsed'\">{{ expandIcon }}</i>\r\n      <i [class]=\"iconClass\"\r\n          *ngIf=\"messageDisplay === 'expanded'\">{{ collapseIcon }}</i>\r\n    </span>\r\n    </div>\r\n    <div class=\"mui-title-time\"\r\n        *ngIf=\"notification.type === 'COUNTDOWN'\">\r\n      <span class=\"sticky-countdown\">{{ timeLeft }}</span>\r\n    </div>\r\n    <div class=\"mui-message-body\"\r\n        [@messageDisplayState]=\"messageDisplay\">\r\n      <div class=\"mui-message\">\r\n        <div class=\"plaintext\">{{message.body}}</div>\r\n      </div>\r\n      <div class=\"mui-message-actions\"\r\n          *ngIf=\"message.optionalActionLink\">\r\n        <a href=\"{{message.optionalActionLink}}\"\r\n            target=\"_blank\"\r\n            class=\"mui-btn-action\"\r\n            i18n=\"@@nc_more_details\"\r\n        >More Details</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-message-container{margin:0;padding:16px 0 9px;overflow:hidden}.mui-title-container{display:flex;align-items:center;gap:8px;height:24px}.mui-message-actions{text-align:right;margin:8px 0 0 32px}.mui-message-actions a{cursor:pointer;display:inline-block;white-space:nowrap}.mui-message-actions .mui-btn-action{overflow:hidden;text-overflow:ellipsis;max-width:90%}.mui-message-actions-optional{margin-bottom:8px}.mui-message-actions-main{display:flex;justify-content:space-between}.mui-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}.mui-title-time{text-align:right;padding-top:4px;height:20px}.mui-message{margin:8px 0 0 32px;overflow:auto;word-wrap:break-word}.mui-message .plaintext{white-space:pre-wrap}.mui-message .htmlcontent{white-space:normal}.mui-expand{cursor:pointer;height:24px;width:24px}.mui-message-image-container{text-align:left;margin-top:16px}.mui-message-image{max-width:100%}.mui-icons.mui-message-icon.news,.material-icons.mui-message-icon.news{display:none}.news .mui-message{margin:8px 0 0;white-space:pre-wrap}.news .mui-timestamp,.news .mui-title-time{display:none}\n", ".mui-message-icon{display:inline-block;cursor:pointer;text-align:center;vertical-align:middle;flex:0}.mui-snackbar-notification-container .mui-message-icon{height:24px;width:24px;line-height:24px;cursor:default}.material-icons{vertical-align:middle;font-size:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: NotificationService }, { type: i1$3.DomSanitizer }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { notification: [{
                type: Input
            }] } });

class NotificationCenterAlertsComponent {
    constructor() {
        this.closePanel = new EventEmitter();
        this.dismissAlert = new EventEmitter();
        this.dismissAlertsAll = new EventEmitter();
        this.clickMessageOptionalAction = new EventEmitter();
    }
    onNotificationAlertDismiss(notification) {
        this.dismissAlert.emit(notification);
    }
    onNotificationAlertDismissAll() {
        this.dismissAlertsAll.emit();
    }
    onClosePanel() {
        this.closePanel.emit();
    }
    onMessageClickOptionalAction(event) {
        this.clickMessageOptionalAction.emit(event);
    }
}
NotificationCenterAlertsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterAlertsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NotificationCenterAlertsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationCenterAlertsComponent, selector: "mui-notification-alerts", inputs: { notifications: "notifications" }, outputs: { closePanel: "closePanel", dismissAlert: "dismissAlert", dismissAlertsAll: "dismissAlertsAll", clickMessageOptionalAction: "clickMessageOptionalAction" }, exportAs: ["muiNotificationAlerts"], ngImport: i0, template: "<div class=\"mui-nc-panel-body\">\r\n  <div class=\"mui-nc-panel-details\">\r\n    <ng-template ngFor let-item [ngForOf]=\"notifications | async\">\r\n      <mui-notification-message-sticky *ngIf=\"item.sticky && item.type !== 'NEWS'\"\r\n          [notification]=\"item\"></mui-notification-message-sticky>\r\n      <mui-notification-message *ngIf=\"!item.sticky && item.type !== 'NEWS'\" [notification]=\"item\"\r\n          (notificationDismiss)=\"onNotificationAlertDismiss($event)\" (messageClickOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-message>\r\n    </ng-template>\r\n  </div>\r\n  <div class=\"mui-nc-panel-actions\">\r\n    <button mat-stroked-button\r\n        color=\"primary\"\r\n        type=\"button\"\r\n        class=\"mui-btn-close\"\r\n        (click)=\"onClosePanel()\"\r\n        i18n=\"@@nc_closebtn\">\r\n      Close\r\n    </button>\r\n    <button mat-flat-button\r\n        type=\"button\"\r\n        color=\"primary\"\r\n        class=\"mui-btn-dismiss-all\"\r\n        (click)=\"onNotificationAlertDismissAll()\"\r\n        i18n=\"@@nc_dismiss_all\">Dismiss All\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;height:100%}.mui-nc-panel-body{height:100%;display:flex;flex-direction:column;justify-content:space-between}.mui-nc-panel-details{overflow-y:auto;overflow-x:hidden;padding:0 8px;margin:0}.mui-nc-panel-actions{text-align:center;padding:24px 0;flex:0 0 auto}.mui-btn-dismiss-all{margin-left:24px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: MessageComponent, selector: "mui-notification-message", inputs: ["notification"], outputs: ["notificationDismiss", "messageClickOptionalAction"], exportAs: ["muiNotificationMessage"] }, { kind: "component", type: MessageStickyComponent, selector: "mui-notification-message-sticky", inputs: ["notification"], exportAs: ["muiNotificationMessageSticky"] }, { kind: "pipe", type: i1$2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterAlertsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-alerts', exportAs: 'muiNotificationAlerts', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-nc-panel-body\">\r\n  <div class=\"mui-nc-panel-details\">\r\n    <ng-template ngFor let-item [ngForOf]=\"notifications | async\">\r\n      <mui-notification-message-sticky *ngIf=\"item.sticky && item.type !== 'NEWS'\"\r\n          [notification]=\"item\"></mui-notification-message-sticky>\r\n      <mui-notification-message *ngIf=\"!item.sticky && item.type !== 'NEWS'\" [notification]=\"item\"\r\n          (notificationDismiss)=\"onNotificationAlertDismiss($event)\" (messageClickOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-message>\r\n    </ng-template>\r\n  </div>\r\n  <div class=\"mui-nc-panel-actions\">\r\n    <button mat-stroked-button\r\n        color=\"primary\"\r\n        type=\"button\"\r\n        class=\"mui-btn-close\"\r\n        (click)=\"onClosePanel()\"\r\n        i18n=\"@@nc_closebtn\">\r\n      Close\r\n    </button>\r\n    <button mat-flat-button\r\n        type=\"button\"\r\n        color=\"primary\"\r\n        class=\"mui-btn-dismiss-all\"\r\n        (click)=\"onNotificationAlertDismissAll()\"\r\n        i18n=\"@@nc_dismiss_all\">Dismiss All\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;height:100%}.mui-nc-panel-body{height:100%;display:flex;flex-direction:column;justify-content:space-between}.mui-nc-panel-details{overflow-y:auto;overflow-x:hidden;padding:0 8px;margin:0}.mui-nc-panel-actions{text-align:center;padding:24px 0;flex:0 0 auto}.mui-btn-dismiss-all{margin-left:24px}\n"] }]
        }], propDecorators: { closePanel: [{
                type: Output
            }], dismissAlert: [{
                type: Output
            }], dismissAlertsAll: [{
                type: Output
            }], clickMessageOptionalAction: [{
                type: Output
            }], notifications: [{
                type: Input
            }] } });

class NotificationCenterNewsComponent {
    constructor() {
        this.closePanel = new EventEmitter();
    }
    onClosePanel() {
        this.closePanel.emit();
    }
}
NotificationCenterNewsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterNewsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NotificationCenterNewsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationCenterNewsComponent, selector: "mui-notification-news", inputs: { notifications: "notifications" }, outputs: { closePanel: "closePanel" }, exportAs: ["muiNotificationNews"], ngImport: i0, template: "<div class=\"mui-nc-panel-body\">\r\n  <div class=\"mui-nc-panel-details\">\r\n    <ng-template ngFor let-item [ngForOf]=\"notifications | async\">\r\n      <mui-notification-message *ngIf=\"item.type === 'NEWS'\" [notification]=\"item\"></mui-notification-message>\r\n    </ng-template>\r\n  </div>\r\n  <div class=\"mui-nc-panel-actions\">\r\n    <button mat-stroked-button type=\"button\" class=\"mui-btn-close\" (click)=\"onClosePanel()\" i18n=\"@@nc_closebtn\">\r\n      Close\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;height:100%}.mui-nc-panel-body{height:100%;display:flex;flex-direction:column;justify-content:space-between}.mui-nc-panel-details{overflow-y:auto;overflow-x:hidden;padding:0 8px;margin:0}.mui-nc-panel-actions{text-align:center;padding:24px 0;flex:0 0 auto}.mui-btn-dismiss-all{margin-left:24px}\n"], dependencies: [{ kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: MessageComponent, selector: "mui-notification-message", inputs: ["notification"], outputs: ["notificationDismiss", "messageClickOptionalAction"], exportAs: ["muiNotificationMessage"] }, { kind: "pipe", type: i1$2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterNewsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-news', exportAs: 'muiNotificationNews', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-nc-panel-body\">\r\n  <div class=\"mui-nc-panel-details\">\r\n    <ng-template ngFor let-item [ngForOf]=\"notifications | async\">\r\n      <mui-notification-message *ngIf=\"item.type === 'NEWS'\" [notification]=\"item\"></mui-notification-message>\r\n    </ng-template>\r\n  </div>\r\n  <div class=\"mui-nc-panel-actions\">\r\n    <button mat-stroked-button type=\"button\" class=\"mui-btn-close\" (click)=\"onClosePanel()\" i18n=\"@@nc_closebtn\">\r\n      Close\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;height:100%}.mui-nc-panel-body{height:100%;display:flex;flex-direction:column;justify-content:space-between}.mui-nc-panel-details{overflow-y:auto;overflow-x:hidden;padding:0 8px;margin:0}.mui-nc-panel-actions{text-align:center;padding:24px 0;flex:0 0 auto}.mui-btn-dismiss-all{margin-left:24px}\n"] }]
        }], propDecorators: { notifications: [{
                type: Input
            }], closePanel: [{
                type: Output
            }] } });

const DISPLAY_STATES = {
    hidden: 'hidden',
    visible: 'visible',
};
class NotificationCenterComponent {
    constructor(notificationService, locale, cd) {
        this.notificationService = notificationService;
        this.cd = cd;
        /** define appearance, either legacy theme or unify, mainly affects the icons */
        this.appearance = 'unify';
        this.selectedTab = NotificationTabs.AlertsTab;
        this.panelDisplay = DISPLAY_STATES.hidden;
        this.iconClass = 'material-icons';
        this.destroyed$ = new Subject();
        this.config = new PanelConfig();
    }
    ngOnInit() {
        this.notificationService.init();
        this.notifications = this.notificationService.notifications;
        this.notificationService.appearance = this.appearance;
        if (this.appearance === 'unify') {
            this.iconClass = 'mui-icons';
        }
        this.notificationService.panelOpenedChanges
            .pipe(takeUntil(this.destroyed$), filter((ev) => ev === true))
            .subscribe(() => this.openPanel());
    }
    ngOnDestroy() {
        this.notificationService.stopRefresh();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    addNotification(notification) {
        this.notificationService.addNotification(notification);
    }
    dismissNotification(notification) {
        this.notificationService.dismissNotification(notification);
    }
    dismissAll() {
        this.notificationService.dismissAllAlerts();
        this.toggleState();
    }
    toggleState() {
        if (this.panelDisplay === DISPLAY_STATES.visible) {
            this.panelDisplay = DISPLAY_STATES.hidden;
            this.notificationService.activeTab = NotificationTabs.None;
            this.notificationService.updatePanelState(false);
        }
        else {
            this.panelDisplay = DISPLAY_STATES.visible;
            this.notificationService.setNotificationsSeen(this.selectedTab);
            this.notificationService.updatePanelState(true);
        }
        this.cd.markForCheck();
    }
    changeTab($event) {
        this.notificationService.setNotificationsSeen($event.index);
    }
    openPanel() {
        if (this.panelDisplay === DISPLAY_STATES.hidden) {
            this.panelDisplay = DISPLAY_STATES.visible;
            this.notificationService.setNotificationsSeen(this.selectedTab);
            this.notificationService.updatePanelState(true);
            this.cd.markForCheck();
        }
    }
    clickMessageOptionalAction(url) {
        let newUrl = url;
        const patt = new RegExp('\{jsessionid\}');
        if (patt.test(url)) {
            newUrl = url.replace(patt, this.notificationService.sessionId);
            // console.log('jsessionid was replaced in url [' + url + '] to', newUrl);
        }
        window.open(newUrl, '_blank');
    }
    onNotificationDismiss(notification) {
        this.dismissNotification(notification);
    }
    onMessageClickOptionalAction(link) {
        this.clickMessageOptionalAction(link);
    }
}
NotificationCenterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, deps: [{ token: NotificationService }, { token: LOCALE_ID }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NotificationCenterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationCenterComponent, selector: "mui-notification-center", inputs: { config: "config", appearance: "appearance" }, exportAs: ["muiNotificationCenter"], ngImport: i0, template: "<div [@panelDisplayState]=\"panelDisplay\"\r\n    class=\"mui-notification-center mui-nc-panel\"\r\n    [style.top]=\"config.topOffset\"\r\n    id=\"mui-notification-center\">\r\n  <header class=\"mui-nc-panel-header\">\r\n    <h5 class=\"mui-nc-panel-title\" i18n=\"@@nc_notification_center\">Notification Center</h5>\r\n    <span class=\"{{ iconClass }} mui-nc-panel-close\"\r\n        (click)=\"toggleState()\">close</span>\r\n  </header>\r\n  <div class=\"mui-notification-tabs\">\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTab\"\r\n        (selectedTabChange)=\"changeTab($event)\"\r\n        [disablePagination]=\"true\">\r\n      <mat-tab label=\"Alerts\" i18n-label=\"@@nc_alerts\">\r\n        <mui-notification-alerts [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"\r\n            (dismissAlert)=\"onNotificationDismiss($event)\"\r\n            (dismissAlertsAll)=\"dismissAll()\"\r\n            (clickMessageOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-alerts>\r\n      </mat-tab>\r\n      <mat-tab label=\"News & Updates\" i18n-label=\"@@nc_news\">\r\n        <mui-notification-news [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"></mui-notification-news>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [".mui-nc-panel{background-color:#fff;bottom:0;overflow-x:hidden;overflow-y:auto;padding:0;position:fixed;right:0;top:0;width:400px;box-shadow:-2px 0 17px #00000046;z-index:500}.mui-nc-panel-header{height:40px;padding:0 16px;position:relative;display:flex;align-items:center;justify-content:space-between}.mui-nc-panel-close{color:#fff;cursor:pointer;width:16px;height:16px;line-height:16px;font-size:16px;-webkit-user-select:none;user-select:none}.mui-nc-panel-title{margin:0;overflow:hidden;text-overflow:ellipsis}.mui-notification-tabs{height:calc(100% - 40px)}.mui-notification-tabs .mat-mdc-tab-group{height:100%}\n"], dependencies: [{ kind: "component", type: i2$1.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i2$1.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "component", type: NotificationCenterAlertsComponent, selector: "mui-notification-alerts", inputs: ["notifications"], outputs: ["closePanel", "dismissAlert", "dismissAlertsAll", "clickMessageOptionalAction"], exportAs: ["muiNotificationAlerts"] }, { kind: "component", type: NotificationCenterNewsComponent, selector: "mui-notification-news", inputs: ["notifications"], outputs: ["closePanel"], exportAs: ["muiNotificationNews"] }], animations: [
        trigger('panelDisplayState', [
            state(DISPLAY_STATES.hidden, style({
                right: '-430px',
                width: 0
            })),
            state(DISPLAY_STATES.visible, style({
            // we only use what is defined in css class
            })),
            transition('visible => hidden', 
            // only animate 'right' property
            animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: '-430px' }))),
            transition('hidden => visible', [
                style({
                    width: '*' // reset width before animation starts
                }),
                animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-center', exportAs: 'muiNotificationCenter', animations: [
                        trigger('panelDisplayState', [
                            state(DISPLAY_STATES.hidden, style({
                                right: '-430px',
                                width: 0
                            })),
                            state(DISPLAY_STATES.visible, style({
                            // we only use what is defined in css class
                            })),
                            transition('visible => hidden', 
                            // only animate 'right' property
                            animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: '-430px' }))),
                            transition('hidden => visible', [
                                style({
                                    width: '*' // reset width before animation starts
                                }),
                                animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)', style({ right: 0 }))
                            ])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [@panelDisplayState]=\"panelDisplay\"\r\n    class=\"mui-notification-center mui-nc-panel\"\r\n    [style.top]=\"config.topOffset\"\r\n    id=\"mui-notification-center\">\r\n  <header class=\"mui-nc-panel-header\">\r\n    <h5 class=\"mui-nc-panel-title\" i18n=\"@@nc_notification_center\">Notification Center</h5>\r\n    <span class=\"{{ iconClass }} mui-nc-panel-close\"\r\n        (click)=\"toggleState()\">close</span>\r\n  </header>\r\n  <div class=\"mui-notification-tabs\">\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTab\"\r\n        (selectedTabChange)=\"changeTab($event)\"\r\n        [disablePagination]=\"true\">\r\n      <mat-tab label=\"Alerts\" i18n-label=\"@@nc_alerts\">\r\n        <mui-notification-alerts [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"\r\n            (dismissAlert)=\"onNotificationDismiss($event)\"\r\n            (dismissAlertsAll)=\"dismissAll()\"\r\n            (clickMessageOptionalAction)=\"onMessageClickOptionalAction($event)\"></mui-notification-alerts>\r\n      </mat-tab>\r\n      <mat-tab label=\"News & Updates\" i18n-label=\"@@nc_news\">\r\n        <mui-notification-news [notifications]=\"notifications\"\r\n            (closePanel)=\"toggleState()\"></mui-notification-news>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [".mui-nc-panel{background-color:#fff;bottom:0;overflow-x:hidden;overflow-y:auto;padding:0;position:fixed;right:0;top:0;width:400px;box-shadow:-2px 0 17px #00000046;z-index:500}.mui-nc-panel-header{height:40px;padding:0 16px;position:relative;display:flex;align-items:center;justify-content:space-between}.mui-nc-panel-close{color:#fff;cursor:pointer;width:16px;height:16px;line-height:16px;font-size:16px;-webkit-user-select:none;user-select:none}.mui-nc-panel-title{margin:0;overflow:hidden;text-overflow:ellipsis}.mui-notification-tabs{height:calc(100% - 40px)}.mui-notification-tabs .mat-mdc-tab-group{height:100%}\n"] }]
        }], ctorParameters: function () {
        return [{ type: NotificationService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }, { type: i0.ChangeDetectorRef }];
    }, propDecorators: { config: [{
                type: Input
            }], appearance: [{
                type: Input
            }] } });

class NotificationCenterModule {
}
NotificationCenterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NotificationCenterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, declarations: [NotificationCenterComponent,
        MessageComponent,
        MessageStickyComponent,
        NotificationCenterAlertsComponent,
        NotificationCenterNewsComponent,
        NotificationSnackbarComponent], imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule], exports: [NotificationCenterComponent] });
NotificationCenterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatIconModule, MatTooltipModule],
                    exports: [NotificationCenterComponent],
                    declarations: [
                        NotificationCenterComponent,
                        MessageComponent,
                        MessageStickyComponent,
                        NotificationCenterAlertsComponent,
                        NotificationCenterNewsComponent,
                        NotificationSnackbarComponent
                    ]
                }]
        }] });

function getEventTime(offset) {
    var _a;
    return (_a = DateTime.local().minus({ minutes: offset }).toISO()) !== null && _a !== void 0 ? _a : '';
}
function getId() {
    return Date.now();
}
function getInitialNotifications() {
    var _a, _b;
    return [
        {
            id: 1,
            type: 'COUNTDOWN',
            eventTime: getEventTime(5),
            expiryTime: (_a = DateTime.local().plus({ hours: 4 }).toISO()) !== null && _a !== void 0 ? _a : '',
            sticky: true,
            messages: [
                {
                    id: 1,
                    headline: 'Scheduled maintenance',
                    body: 'System will be down for maintenance. Please plan your work accordingly.',
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 11,
            type: 'WARNING',
            eventTime: getEventTime(30),
            expiryTime: (_b = DateTime.local().plus({ days: 5 }).toISO()) !== null && _b !== void 0 ? _b : '',
            sticky: true,
            messages: [
                {
                    id: 11,
                    headline: 'Slow Imports',
                    body: 'Import speeds in Engage are currently slow. Teams are working on it.',
                    // optionalActionTitle: 'Details',
                    // optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 2,
            eventTime: getEventTime(4),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Import Job failed',
                    body: '<p><em>The import job with Id 123 failed.<br>The uploaded file was not encoded correctly.<br><br>There has been' +
                        ' an error while connecting to the external resource.            Status code:1234</em></p>',
                    htmlContent: true
                }
            ]
        },
        {
            id: 3,
            eventTime: getEventTime(2),
            type: 'WARNING',
            sticky: false,
            messages: [
                {
                    id: 3,
                    headline: 'This is a warning message',
                    body: 'Please be aware that strange things might happen if you do not read this warning!'
                }
            ]
        },
        {
            id: 4,
            type: 'INFO',
            eventTime: getEventTime(10),
            sticky: false,
            messages: [
                {
                    id: 4,
                    headline: 'Release Information',
                    body: 'Your CEP system has been updated to version 6.90.1940.\nEnjoy all the great new features and bugs!',
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 5,
            type: 'NEWS',
            eventTime: getEventTime(10),
            sticky: false,
            messages: [
                {
                    id: 5,
                    headline: 'NOW AVAILABLE: Q2 2017 Quarterly Release Recording',
                    body: `We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release Training
          (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        },
        {
            id: 6,
            type: 'NEWS',
            eventTime: getEventTime(12),
            sticky: false,
            messages: [
                {
                    id: 6,
                    headline: 'NOW AVAILABLE: Q1 2017 Quarterly Release Recording',
                    body: `We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release Training
          (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        },
        {
            id: 7,
            eventTime: getEventTime(14),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 7,
                    headline: 'Your new password does not pass the following...',
                    htmlContent: true,
                    body: `<div data-notification-options="{&quot;stripHtml&quot;:false}">
                  <p><em>Your new password does not pass the following security rules:</em></p>
                  <p><em>- Minimum length is 8 characters<br>
                  - Contain at least one upper case letter<br>
                  - Contain at least one number<br>
                  - Contain at least one symbol<br>
                  </em></p>
                </div>`
                }
            ]
        },
        {
            "id": 8,
            "type": "INFO",
            "eventTime": getEventTime(20),
            "source": "ImportMembersJob",
            "messages": [
                {
                    "id": 8,
                    "headline": "Import Report - test_ueep562_050722",
                    "body": "Hello ,\n\n\nyour import had the following results:\n\nNewsletter:            test_ueep562_050722 (test_ueep562_050722@docker01.dmclab.muc.domeus.com)\non:                    05.07.2022 09:25\nduration:              3 seconds\n\nSynchronisation mode:  Add-Update\nwith qualifiers: [Keep Unsubscriptions, Overwrite only Attributes from File]\n\nNew recipients were:   added without message\n\nImport file name:      testLab55_testAndroidUsers050722.csv\nImport file type:      csv\n\nResult overview:\n\nFatal Errors:          -\nProcessed:             2 recipients (AUTO_300129_9868394A9B225B258532FDA3B3FF60FC16ECFE5AD174223B361BF8E5314F9781 (100%))\n\n0 recipients added\n2 recipients updated/replaced\n0 recipients removed\n0 errors\n\n\n\n\n\n\nBest regards, \n\nYour team@docker01.dmclab.muc.domeus.com",
                    "locale": "en",
                    "optionalActionTitle": "Download report",
                    "optionalActionLink": "http://10.128.251.55/home/login.jsp?redirectURL=user/importReport.jsp&repid=382"
                }
            ],
            "audiences": [
                {
                    "id": 1,
                    "datacenter": "NC",
                    "database": "localdb",
                    "customerId": "55",
                    "userId": "1"
                }
            ],
            "sticky": false
        }
    ];
}
function getNewNotifications() {
    return [
        {
            id: getId(),
            eventTime: getEventTime(0),
            type: 'SUCCESS',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Attribute creation successful',
                    body: 'The attribute MyCoolAttribute of type String was created successfully.'
                }
            ]
        },
        {
            id: getId(),
            eventTime: getEventTime(1),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Import Job failed',
                    body: 'The import job with Id 567 failed.\nThe uploaded file was not encoded correctly.\n\nThere has been' +
                        ' an error while connecting to the external resource.            Status code:400'
                }
            ]
        },
        {
            id: 9,
            type: 'NEWS',
            eventTime: getEventTime(0),
            sticky: false,
            messages: [
                {
                    id: 9,
                    headline: 'Updated: NOW AVAILABLE: Q1 2017 Quarterly Release Recording',
                    body: `Updated: We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release
           Training (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        }
    ];
}

/**
 * Mock implementation of BackendService
 * It can be used in tests and for running local without api connection
 * This class is currently not compatible with AOT compile of cli >= 1.0 if used in DI provider assignment
 */
class MockBackendService {
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

/**
 * Simple base representation of a Notification for easy creation of volatile notifications.
 */
class VolatileNotification {
}

/*
 * Public API Surface of ui-notification-center-ng
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BackendService, DISPLAY_STATES$1 as DISPLAY_STATES, LocalStorageConfig, MockBackendService, NC_API_CONFIG, Notification, NotificationCenterComponent, NotificationCenterModule, NotificationService, PanelConfig, VolatileNotification };
//# sourceMappingURL=mapp-ui-notification-center.mjs.map
