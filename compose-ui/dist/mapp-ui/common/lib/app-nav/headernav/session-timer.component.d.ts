import type { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionTimerService } from './session-timer.service';
import * as i0 from "@angular/core";
export declare class SessionTimerComponent implements OnInit {
    private service;
    navItem: any;
    trackClicks: boolean;
    timer: Subscription;
    sessionTime: Date;
    private timerCountdown;
    private activeKeepAlive;
    private activeClickTracker;
    constructor(service: SessionTimerService);
    ngOnInit(): void;
    startTimer(): void;
    stopAndResetTimer(): void;
    onIdleModeActivated(): void;
    private startClickTracker;
    private stopClickTracker;
    private resetTimer;
    private startKeepAlive;
    private stopKeepAlive;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionTimerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SessionTimerComponent, "mui-session-timer", ["muiSessionTimer"], { "navItem": "navItem"; "trackClicks": "trackClicks"; }, {}, never, never, false, never>;
}
