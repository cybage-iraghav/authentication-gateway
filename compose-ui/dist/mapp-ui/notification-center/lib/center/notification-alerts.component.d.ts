import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../shared/models/notification';
import * as i0 from "@angular/core";
export declare class NotificationCenterAlertsComponent {
    closePanel: EventEmitter<any>;
    dismissAlert: EventEmitter<Notification>;
    dismissAlertsAll: EventEmitter<any>;
    clickMessageOptionalAction: EventEmitter<any>;
    notifications: Observable<Notification[]>;
    onNotificationAlertDismiss(notification: Notification): void;
    onNotificationAlertDismissAll(): void;
    onClosePanel(): void;
    onMessageClickOptionalAction(event: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationCenterAlertsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationCenterAlertsComponent, "mui-notification-alerts", ["muiNotificationAlerts"], { "notifications": "notifications"; }, { "closePanel": "closePanel"; "dismissAlert": "dismissAlert"; "dismissAlertsAll": "dismissAlertsAll"; "clickMessageOptionalAction": "clickMessageOptionalAction"; }, never, never, false, never>;
}
