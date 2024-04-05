import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
/**
 * Interface declaration for the BackendService
 */
export interface BackendServiceInterface {
    /**
     * Get all currently active notifications for the user
     */
    getNotifications(): Observable<Notification[]>;
    /**
     * Dismiss given notifications
     * @param nIds List of notification ids
     */
    dismissMessages(nIds: Array<number>): void;
    /**
     * Get the CEP sessionId from configuration
     * @returns The sessionId if configured or an empty string
     */
    getSessionId(): string;
    /**
     * Fetch only new notifications which were created since the last time the API was polled.
     * @param sinceDate ISO-8601 date string for the newest notification currently in list
     */
    getNewNotifications(sinceDate: string): Observable<Notification[]>;
}
