import type { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NCAppearance } from '../../shared/models/configurations';
import { Message } from '../../shared/models/message';
import { Notification } from '../../shared/models/notification';
import { NotificationService } from '../../shared/services/notification.service';
import * as i0 from "@angular/core";
export declare class MessageComponent implements OnChanges, OnInit, OnDestroy {
    private sanitizer;
    protected cd: ChangeDetectorRef;
    protected ncs: NotificationService;
    notificationDismiss: EventEmitter<Notification>;
    messageClickOptionalAction: EventEmitter<any>;
    notification: Notification;
    message: Message;
    messageDisplay: string;
    eventTimeRelative: string | null;
    eventTimeFormatted: string | null;
    appearance: NCAppearance;
    iconClass: string;
    expandIcon: string;
    collapseIcon: string;
    private destroyed$;
    constructor(sanitizer: DomSanitizer, cd: ChangeDetectorRef, ncs: NotificationService);
    ngOnChanges(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDismiss(notification: Notification): void;
    toggleMessageViewState(): void;
    getTitle(): string;
    onClickOptionalAction(): void;
    protected updateAppearance(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "mui-notification-message", ["muiNotificationMessage"], { "notification": "notification"; }, { "notificationDismiss": "notificationDismiss"; "messageClickOptionalAction": "messageClickOptionalAction"; }, never, never, false, never>;
}
