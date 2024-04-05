import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import * as i0 from "@angular/core";
/**
 * Service for handling local caching of notifications, either in local storage or session storage.
 * By default, notifications will be cached in the local storage.
 */
export declare class LocalCacheService {
    private webStorage;
    private config;
    constructor();
    observeBackendNotifications(notifications: Observable<Notification[]>): void;
    observeVolatileNotifications(notifications: Observable<Notification[]>): void;
    private observeNotifications;
    get backendNotifications(): Notification[];
    get volatileNotifications(): Notification[];
    private getCachedNotifications;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalCacheService>;
}
