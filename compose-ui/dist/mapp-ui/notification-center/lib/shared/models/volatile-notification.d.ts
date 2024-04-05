import { Message } from './message';
import { NotificationType } from './notification';
/**
 * Simple base representation of a Notification for easy creation of volatile notifications.
 */
export declare class VolatileNotification {
    /**
     * Type of the notification
     */
    type: NotificationType;
    /**
     * Message to be used for the notification
     */
    message: Message;
}
