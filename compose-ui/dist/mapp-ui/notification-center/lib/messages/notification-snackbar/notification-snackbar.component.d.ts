import { MatSnackBarRef } from '@angular/material/snack-bar';
import { NCAppearance } from '../../shared/models/configurations';
import { Notification } from '../../shared/models/notification';
import * as i0 from "@angular/core";
export interface NotificationSnackbarData {
    notification: Notification;
    showButton: boolean;
    appearance: NCAppearance;
}
export declare class NotificationSnackbarComponent {
    snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>;
    data: NotificationSnackbarData;
    iconClass: string;
    constructor(snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>, data: NotificationSnackbarData);
    get hasAction(): boolean;
    action(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationSnackbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationSnackbarComponent, "mui-notification-snackbar", never, {}, {}, never, never, false, never>;
}
