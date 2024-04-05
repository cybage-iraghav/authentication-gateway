import { Observable } from 'rxjs';
import { NCAppearance } from '../models/configurations';
import { BackendService } from './backend.service';
import { LocalCacheService } from './local-cache.service';
import { Notification } from '../models/notification';
import { ToastNotificationService } from './toast-notification.service';
import { VolatileNotification } from '../models/volatile-notification';
import { NotificationTabs } from '../models/notification-tabs';
import * as i0 from "@angular/core";
/**
 * Main service class for data handling on notifications.
 * This service will coordinate all different data sources of the notifications: volatile, local cache, api responses
 * and provide a combined list to the view component.
 */
export declare class NotificationService {
    private localCacheService;
    private backendService;
    private toastNotificationService;
    private readonly backendStream;
    private readonly volatileStream;
    private readonly combined;
    private unseenCount;
    private readonly pollIntervalDuration;
    private lastFetchTime;
    private isActive;
    private panelOpened;
    activeTab: NotificationTabs;
    /** support legacy and unify theme appearance */
    appearance: NCAppearance;
    /**
     * Sort notifications by eventTime in descending order
     */
    static sort(notifications: Notification[]): void;
    /**
     * Mark the notification as seen if it is displayed in the currently open tab
     */
    static markSeenIfNeeded(notification: Notification, activeTab: NotificationTabs): void;
    constructor(localCacheService: LocalCacheService, backendService: BackendService, toastNotificationService: ToastNotificationService);
    /**
     * Initialize service operation.
     * - Load data from browser storage
     * - Call API for initial list of notifications
     * - init unseen counter
     * - schedule period update of notifications from API
     *
     * This should be called by main nc component once it is ready.
     */
    init(): void;
    /**
     * Stop the periodic calls for getting new notifications.
     * This is used when nc component is destroyed.
     */
    stopRefresh(): void;
    get notifications(): Observable<Notification[]>;
    get unseenCounter(): Observable<number>;
    get sessionId(): string;
    /**
     * Get all relevant notifications from backend for first init
     */
    private loadInitialBackendNotifications;
    /**
     * Check which notifications are already marked as seen in the local storage data and apply to
     * incoming notifications from API. Also mark notifications as seen which are in the current visible tab
     */
    private mergeBackendSeenState;
    /**
     * For subsequent repeated polling. Fetch new notifications only since last poll time.
     */
    private fetchLatestNotifications;
    /**
     * Push a new volatile notification. Depending on the message content a Snackbar message or Snackbar + Notification
     * will be generated.
     * message has headline only: Snackbar
     * message has headline and body: Snackbar + Notification
     * @param notification the new notification to push
     */
    addNotification(notification: Notification | VolatileNotification): void;
    /**
     * Dismiss a specific notification
     * @param notification the notification to be dismissed
     */
    dismissNotification(notification: Notification): void;
    /**
     * Dismiss all normal notifications displayed in the Alerts tab. News and sticky notifications will remain.
     */
    dismissAllAlerts(): void;
    /**
     * Set all notifications displayed in a certain tab as seen.
     * Called by notification panel when activating one of the tabs.
     */
    setNotificationsSeen(tab: NotificationTabs): void;
    /**
     * Calculate the number of unseen notifications for each emission on the combined notifications observable.
     * Emit new value on unseenCount observable if the counter value changes
     */
    private generateUnseenCount;
    /**
     * Observable which reports changes of the panel state when it is opened or closed
     */
    get panelOpenedChanges(): Observable<boolean>;
    /**
     * Report update of the notification panel state
     * @param opened Whether the panel was opened or closed
     */
    updatePanelState(opened: boolean): void;
    /**
     * Open the notification center panel
     */
    openPanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationService>;
}
