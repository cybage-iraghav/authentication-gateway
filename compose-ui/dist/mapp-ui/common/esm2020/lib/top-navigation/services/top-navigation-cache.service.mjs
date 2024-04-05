import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TopNavigationCacheService {
    constructor() {
        this.storageKeyData = 'muiTopNavData';
        this.storageKeySession = 'muiTopNavSession';
    }
    loadStoredNavigationData() {
        if (this.isCachedSessionIdValid()) {
            const storedData = sessionStorage.getItem(this.storageKeyData);
            if (storedData) {
                return JSON.parse(storedData);
            }
        }
        return null;
    }
    storeNavigationData(data) {
        sessionStorage.setItem(this.storageKeyData, JSON.stringify(data));
        const sessionId = this.getSessionIdFromRequest();
        if (sessionId) {
            sessionStorage.setItem(this.storageKeySession, sessionId);
        }
    }
    invalidateCache() {
        console.log('top navigation: clearing cache');
        sessionStorage.removeItem(this.storageKeySession);
        sessionStorage.removeItem(this.storageKeyData);
    }
    isCachedSessionIdValid() {
        const storedSessionId = sessionStorage.getItem(this.storageKeySession);
        const currentSessionId = this.getSessionIdFromRequest();
        return !!(storedSessionId && currentSessionId && storedSessionId === currentSessionId);
    }
    getSessionIdFromRequest() {
        return window.location.pathname.match(/;jsessionid=[A-F0-9]{32}(?:;[a-z0-9]+)?/)?.[0];
    }
}
TopNavigationCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TopNavigationCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLW5hdmlnYXRpb24tY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvdG9wLW5hdmlnYXRpb24vc2VydmljZXMvdG9wLW5hdmlnYXRpb24tY2FjaGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8seUJBQXlCO0lBSHRDO1FBSW1CLG1CQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFHLGtCQUFrQixDQUFDO0tBb0N6RDtJQWxDQyx3QkFBd0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtZQUNqQyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMvRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDL0I7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQWdCO1FBQ2xDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDakQsSUFBSSxTQUFTLEVBQUU7WUFDYixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDeEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksZ0JBQWdCLElBQUksZUFBZSxLQUFLLGdCQUFnQixDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7dUhBcENVLHlCQUF5QjsySEFBekIseUJBQXlCLGNBRnhCLE1BQU07NEZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL25hdmlnYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9wTmF2aWdhdGlvbkNhY2hlU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdG9yYWdlS2V5RGF0YSA9ICdtdWlUb3BOYXZEYXRhJztcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2VLZXlTZXNzaW9uID0gJ211aVRvcE5hdlNlc3Npb24nO1xyXG5cclxuICBsb2FkU3RvcmVkTmF2aWdhdGlvbkRhdGEoKTogTmF2aWdhdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuaXNDYWNoZWRTZXNzaW9uSWRWYWxpZCgpKSB7XHJcbiAgICAgIGNvbnN0IHN0b3JlZERhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUtleURhdGEpO1xyXG4gICAgICBpZiAoc3RvcmVkRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0b3JlZERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHN0b3JlTmF2aWdhdGlvbkRhdGEoZGF0YTogTmF2aWdhdGlvbik6IHZvaWQge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXlEYXRhLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLmdldFNlc3Npb25JZEZyb21SZXF1ZXN0KCk7XHJcbiAgICBpZiAoc2Vzc2lvbklkKSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5zdG9yYWdlS2V5U2Vzc2lvbiwgc2Vzc2lvbklkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludmFsaWRhdGVDYWNoZSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCd0b3AgbmF2aWdhdGlvbjogY2xlYXJpbmcgY2FjaGUnKTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5zdG9yYWdlS2V5U2Vzc2lvbik7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuc3RvcmFnZUtleURhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0NhY2hlZFNlc3Npb25JZFZhbGlkKCkge1xyXG4gICAgY29uc3Qgc3RvcmVkU2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXlTZXNzaW9uKTtcclxuICAgIGNvbnN0IGN1cnJlbnRTZXNzaW9uSWQgPSB0aGlzLmdldFNlc3Npb25JZEZyb21SZXF1ZXN0KCk7XHJcbiAgICByZXR1cm4gISEoc3RvcmVkU2Vzc2lvbklkICYmIGN1cnJlbnRTZXNzaW9uSWQgJiYgc3RvcmVkU2Vzc2lvbklkID09PSBjdXJyZW50U2Vzc2lvbklkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2Vzc2lvbklkRnJvbVJlcXVlc3QoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goLztqc2Vzc2lvbmlkPVtBLUYwLTldezMyfSg/OjtbYS16MC05XSspPy8pPy5bMF07XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=