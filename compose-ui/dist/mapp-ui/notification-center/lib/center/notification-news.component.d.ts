import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../shared/models/notification';
import * as i0 from "@angular/core";
export declare class NotificationCenterNewsComponent {
    notifications: Observable<Notification[]>;
    closePanel: EventEmitter<any>;
    onClosePanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationCenterNewsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationCenterNewsComponent, "mui-notification-news", ["muiNotificationNews"], { "notifications": "notifications"; }, { "closePanel": "closePanel"; }, never, never, false, never>;
}
