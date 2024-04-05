import { OnInit } from '@angular/core';
import type { NotificationCenterComponent } from '@mapp-ui/notification-center';
import { NotificationService } from '@mapp-ui/notification-center';
import { Observable } from 'rxjs';
import { NavItem } from '../../core/models/navigation';
import * as i0 from "@angular/core";
export declare class NotificationBellComponent implements OnInit {
    private notificationService;
    navItem: NavItem;
    notificationCenter: NotificationCenterComponent;
    notificationCount: Observable<number>;
    notificationBadgeHidden: Observable<boolean>;
    notificationCenterEnabled: boolean;
    constructor(notificationService: NotificationService);
    ngOnInit(): void;
    toggleNotificationPanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationBellComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationBellComponent, "mui-notification-bell", never, { "navItem": "navItem"; "notificationCenter": "notificationCenter"; }, {}, never, never, false, never>;
}
