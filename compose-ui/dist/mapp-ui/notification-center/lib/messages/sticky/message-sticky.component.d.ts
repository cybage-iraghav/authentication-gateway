import { ChangeDetectorRef, OnChanges, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../../shared/models/message';
import { Notification } from '../../shared/models/notification';
import { NotificationService } from '../../shared/services/notification.service';
import { MessageComponent } from '../alert/message.component';
import * as i0 from "@angular/core";
export declare class MessageStickyComponent extends MessageComponent implements OnChanges, OnDestroy {
    notification: Notification;
    message: Message;
    messageDisplay: string;
    timeLeft: string | null;
    private timerSubscription;
    constructor(notificationService: NotificationService, sanitizer: DomSanitizer, cd: ChangeDetectorRef);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    timeLeftCalc(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageStickyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageStickyComponent, "mui-notification-message-sticky", ["muiNotificationMessageSticky"], { "notification": "notification"; }, {}, never, never, false, never>;
}
