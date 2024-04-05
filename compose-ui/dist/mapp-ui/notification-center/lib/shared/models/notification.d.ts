import { Message } from './message';
import { VolatileNotification } from './volatile-notification';
export type NotificationType = 'ERROR' | 'WARNING' | 'SUCCESS' | 'COUNTDOWN' | 'INFO' | 'NEWS';
export interface NotificationAudience {
    id: number;
    customerId: string;
    userId: string;
    datacenter: string;
    database: string;
}
export declare class Notification {
    id: number;
    type: NotificationType;
    eventTime: string;
    updateTime?: string;
    expiryTime?: string;
    source?: string;
    sticky: boolean;
    messages: Message[];
    audiences?: NotificationAudience[];
    errorDetails?: unknown;
    isVolatile?: boolean | undefined;
    seen?: boolean | undefined;
    /**
     * Create a full Notification from a VolatileNotification by generating missing properties.
     * @param vn The VolatileNotification to be converted
     * @returns full Notification object with auto-generated id and eventTime
     */
    static fromVolatile(vn: VolatileNotification): Notification;
    static isVolatileNotification(n: Notification | VolatileNotification): n is VolatileNotification;
}
