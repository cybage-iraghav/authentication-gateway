import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionTimerService } from '../services/session-timer.service';
import * as i0 from "@angular/core";
export declare class SessionTimerInterceptor implements HttpInterceptor {
    private timerService;
    constructor(timerService: SessionTimerService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionTimerInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionTimerInterceptor>;
}
