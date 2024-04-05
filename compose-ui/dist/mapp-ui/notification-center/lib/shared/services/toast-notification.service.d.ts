import type { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from '../../messages/notification-snackbar/notification-snackbar.component';
import { NCAppearance } from '../models/configurations';
import { Notification } from '../models/notification';
import * as i0 from "@angular/core";
export declare class ToastNotificationService {
    snackBar: MatSnackBar;
    private MSG_DURATION;
    private mdSnackBarRef;
    private mdSnackBarConfig;
    constructor(snackBar: MatSnackBar);
    get snackBarRef(): MatSnackBarRef<NotificationSnackbarComponent>;
    openSnackBar(notification: Notification, showButton?: boolean, onAction?: () => void, appearance?: NCAppearance): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastNotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastNotificationService>;
}
