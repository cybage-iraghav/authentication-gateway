import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { BackendServiceInterface } from './backend.service.interface';
import * as i0 from "@angular/core";
/**
 * Mock implementation of BackendService
 * It can be used in tests and for running local without api connection
 * This class is currently not compatible with AOT compile of cli >= 1.0 if used in DI provider assignment
 */
export declare class MockBackendService implements BackendServiceInterface {
    getSessionId(): string;
    getNotifications(): Observable<Notification[]>;
    dismissMessages(): void;
    getNewNotifications(sinceDate: string): Observable<Notification[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockBackendService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockBackendService>;
}
