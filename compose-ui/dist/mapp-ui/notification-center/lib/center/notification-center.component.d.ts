import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { NCAppearance, PanelConfig } from '../shared/models/configurations';
import { Notification } from '../shared/models/notification';
import { NotificationTabs } from '../shared/models/notification-tabs';
import { NotificationService } from '../shared/services/notification.service';
import * as i0 from "@angular/core";
export declare class NotificationCenterComponent implements OnInit, OnDestroy {
    private notificationService;
    private cd;
    config: PanelConfig;
    /** define appearance, either legacy theme or unify, mainly affects the icons */
    appearance: NCAppearance;
    selectedTab: NotificationTabs;
    panelDisplay: string;
    notifications: Observable<Notification[]>;
    iconClass: string;
    private destroyed$;
    constructor(notificationService: NotificationService, locale: string, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    addNotification(notification: Notification): void;
    dismissNotification(notification: Notification): void;
    dismissAll(): void;
    toggleState(): void;
    changeTab($event: MatTabChangeEvent): void;
    openPanel(): void;
    clickMessageOptionalAction(url: string): void;
    onNotificationDismiss(notification: Notification): void;
    onMessageClickOptionalAction(link: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationCenterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationCenterComponent, "mui-notification-center", ["muiNotificationCenter"], { "config": "config"; "appearance": "appearance"; }, {}, never, never, false, never>;
}
