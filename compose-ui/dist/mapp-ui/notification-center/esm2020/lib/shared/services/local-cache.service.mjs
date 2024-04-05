import { Injectable } from '@angular/core';
import { LocalStorageConfig } from '../models/configurations';
import * as i0 from "@angular/core";
/**
 * Service for handling local caching of notifications, either in local storage or session storage.
 * By default, notifications will be cached in the local storage.
 */
export class LocalCacheService {
    constructor() {
        this.config = new LocalStorageConfig();
        this.webStorage = this.config.clientDataStoreType === 'session' ? sessionStorage : localStorage;
    }
    observeBackendNotifications(notifications) {
        this.observeNotifications(notifications, this.config.clientDataStoreBackend);
    }
    observeVolatileNotifications(notifications) {
        this.observeNotifications(notifications, this.config.clientDataStoreVolatile);
    }
    observeNotifications(notifications, storageKey) {
        notifications.subscribe((notificationsData) => {
            this.webStorage.setItem(storageKey, JSON.stringify(notificationsData));
        });
    }
    get backendNotifications() {
        return this.getCachedNotifications(this.config.clientDataStoreBackend);
    }
    get volatileNotifications() {
        return this.getCachedNotifications(this.config.clientDataStoreVolatile);
    }
    getCachedNotifications(storageKey) {
        const storedNotifications = this.webStorage.getItem(storageKey);
        return storedNotifications != null ? JSON.parse(storedNotifications) : [];
    }
}
LocalCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LocalCacheService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvbm90aWZpY2F0aW9uLWNlbnRlci9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9sb2NhbC1jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRzlEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxpQkFBaUI7SUFPNUI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNsRyxDQUFDO0lBRUQsMkJBQTJCLENBQUMsYUFBeUM7UUFDbkUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELDRCQUE0QixDQUFDLGFBQXlDO1FBQ3BFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxhQUF5QyxFQUFFLFVBQWtCO1FBQ3hGLGFBQWEsQ0FBQyxTQUFTLENBQ3JCLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxJQUFJLHFCQUFxQjtRQUN2QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLHNCQUFzQixDQUFDLFVBQWtCO1FBQy9DLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsT0FBTyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVFLENBQUM7OytHQXZDVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQURKLE1BQU07NEZBQ25CLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZUNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9jb25maWd1cmF0aW9ucyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmljYXRpb24nO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgZm9yIGhhbmRsaW5nIGxvY2FsIGNhY2hpbmcgb2Ygbm90aWZpY2F0aW9ucywgZWl0aGVyIGluIGxvY2FsIHN0b3JhZ2Ugb3Igc2Vzc2lvbiBzdG9yYWdlLlxyXG4gKiBCeSBkZWZhdWx0LCBub3RpZmljYXRpb25zIHdpbGwgYmUgY2FjaGVkIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxyXG4gKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIExvY2FsQ2FjaGVTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB3ZWJTdG9yYWdlOiBTdG9yYWdlO1xyXG5cclxuICAvLyBUT0RPIG1ha2UgY29uZmlnIGluamVjdGFibGUgYWdhaW5cclxuICBwcml2YXRlIGNvbmZpZzogTG9jYWxTdG9yYWdlQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY29uZmlnID0gbmV3IExvY2FsU3RvcmFnZUNvbmZpZygpO1xyXG4gICAgdGhpcy53ZWJTdG9yYWdlID0gdGhpcy5jb25maWcuY2xpZW50RGF0YVN0b3JlVHlwZSA9PT0gJ3Nlc3Npb24nID8gc2Vzc2lvblN0b3JhZ2UgOiBsb2NhbFN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICBvYnNlcnZlQmFja2VuZE5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9uczogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25bXT4pOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZU5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9ucywgdGhpcy5jb25maWcuY2xpZW50RGF0YVN0b3JlQmFja2VuZCk7XHJcbiAgfVxyXG5cclxuICBvYnNlcnZlVm9sYXRpbGVOb3RpZmljYXRpb25zKG5vdGlmaWNhdGlvbnM6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uW10+KTogdm9pZCB7XHJcbiAgICB0aGlzLm9ic2VydmVOb3RpZmljYXRpb25zKG5vdGlmaWNhdGlvbnMsIHRoaXMuY29uZmlnLmNsaWVudERhdGFTdG9yZVZvbGF0aWxlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JzZXJ2ZU5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9uczogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25bXT4sIHN0b3JhZ2VLZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zdWJzY3JpYmUoXHJcbiAgICAgIChub3RpZmljYXRpb25zRGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMud2ViU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KG5vdGlmaWNhdGlvbnNEYXRhKSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQgYmFja2VuZE5vdGlmaWNhdGlvbnMoKTogTm90aWZpY2F0aW9uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkTm90aWZpY2F0aW9ucyh0aGlzLmNvbmZpZy5jbGllbnREYXRhU3RvcmVCYWNrZW5kKTtcclxuICB9XHJcblxyXG4gIGdldCB2b2xhdGlsZU5vdGlmaWNhdGlvbnMoKTogTm90aWZpY2F0aW9uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkTm90aWZpY2F0aW9ucyh0aGlzLmNvbmZpZy5jbGllbnREYXRhU3RvcmVWb2xhdGlsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhY2hlZE5vdGlmaWNhdGlvbnMoc3RvcmFnZUtleTogc3RyaW5nKTogTm90aWZpY2F0aW9uW10ge1xyXG4gICAgY29uc3Qgc3RvcmVkTm90aWZpY2F0aW9ucyA9IHRoaXMud2ViU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xyXG4gICAgcmV0dXJuIHN0b3JlZE5vdGlmaWNhdGlvbnMgIT0gbnVsbCA/IEpTT04ucGFyc2Uoc3RvcmVkTm90aWZpY2F0aW9ucykgOiBbXTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==