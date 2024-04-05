import { Navigation } from '../core/models/navigation';
import * as i0 from "@angular/core";
export declare class TopNavigationCacheService {
    private readonly storageKeyData;
    private readonly storageKeySession;
    loadStoredNavigationData(): Navigation | null;
    storeNavigationData(data: Navigation): void;
    invalidateCache(): void;
    private isCachedSessionIdValid;
    private getSessionIdFromRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavigationCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TopNavigationCacheService>;
}
