import { InjectionToken } from '@angular/core';
import { ApiConfigOptions } from './api-config';
/**
 * Configuration for local storage
 */
export declare class LocalStorageConfig {
    clientDataStoreBackend: string;
    clientDataStoreVolatile: string;
    clientDataStoreType: LocalDatastoreType;
    /**
     * @param clientDataStoreBackend key-name under which the notifications from backend will be stored.
     * @param clientDataStoreVolatile key-name under which the volatile notifications will be stored.
     * @param clientDataStoreType type of local storage to use. Defaults to local
     */
    constructor(clientDataStoreBackend?: string, clientDataStoreVolatile?: string, clientDataStoreType?: LocalDatastoreType);
}
/**
 * Type of local data storage. Either session or local
 */
export type LocalDatastoreType = 'session' | 'local';
/**
 * Configuration options for the notification center panel
 */
export declare class PanelConfig {
    topOffset: string;
    /**
     * @param topOffset Define offset for the notification panel from the top of the viewport.
     * Defaults to 54px (for usage with mui-app-header). When used with mui-top-navigation component, use 48px.
     */
    constructor(topOffset?: string);
}
export declare const NC_API_CONFIG: InjectionToken<ApiConfigOptions>;
export type NCAppearance = 'legacy' | 'unify';
