import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification';
import { ApiConfigOptions } from '../models/api-config';
import { BackendServiceInterface } from './backend.service.interface';
import * as i0 from "@angular/core";
/**
 * The BackendService handles http connection to the nc-service API and provides
 * wrapper functions around the individual endpoints.
 */
export declare class BackendService implements BackendServiceInterface {
    private http;
    private config;
    constructor(http: HttpClient, config: ApiConfigOptions);
    getNotifications(): Observable<Notification[]>;
    getSessionId(): string;
    dismissMessages(nIds: Array<number>): void;
    getNewNotifications(sinceDate: string): Observable<Notification[]>;
    private buildUserQuery;
    static ɵfac: i0.ɵɵFactoryDeclaration<BackendService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BackendService>;
}
