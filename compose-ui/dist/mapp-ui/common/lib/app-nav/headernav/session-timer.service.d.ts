import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '@mapp-ui/notification-center';
import * as i0 from "@angular/core";
export declare class SessionTimerService {
    private http;
    private notificationService;
    endpointUrl: string;
    constructor(http: HttpClient, notificationService: NotificationService);
    keepAlive(): Observable<any>;
    stopKeepAlive(): Observable<any>;
    ping(): Observable<any>;
    sessionTimedOut(message: string): void;
    idleModeActivated(message: string): void;
    private doRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionTimerService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionTimerService>;
}
