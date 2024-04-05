import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@mapp-ui/notification-center';
import { Observable } from 'rxjs';
import { NavItem } from '../core/models/navigation';
import { TopNavigationCacheService } from './top-navigation-cache.service';
import * as i0 from "@angular/core";
export declare class SessionTimerService {
    private http;
    private dialog;
    private cacheService;
    private notificationService;
    private config;
    private endpointUrl;
    private timerSubscription;
    private activeKeepAlive;
    private isTimeoutActive$;
    private isInitialized;
    private timerReset$;
    constructor(http: HttpClient, dialog: MatDialog, cacheService: TopNavigationCacheService, notificationService: NotificationService);
    get isTimeoutActive(): Observable<boolean>;
    /**
     * Initialize the service based on the provided configuration
     * @param navItem navigation item for the timer, holding the configuration data
     */
    init(navItem: NavItem): void;
    /**
     * Start the "keep alive" mode.
     * Backend will be pinged periodically (30 seconds) to keep the session alive.
     */
    startKeepAlive(clearCache?: boolean): void;
    /**
     * Stop the "keep alive" mode and restart the regular timeout monitor.
     */
    stopKeepAlive(): void;
    /**
     * Reset the current timer and start a new countdown.
     * Used by SessionInterceptor
     */
    resetTimer(): void;
    private timerResetListener;
    private onSessionTimedOut;
    private onIdleModeActivated;
    private startKeepAliveReq;
    private stopKeepAliveReq;
    private doRequest;
    private startTimer;
    private stopTimer;
    private showTimeoutWarningDialog;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionTimerService, [null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionTimerService>;
}
