import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./top-navigation-cache.service";
export class TopNavigationService {
    constructor(http, cacheService) {
        this.http = http;
        this.cacheService = cacheService;
        this.helpTopicKeys$ = new BehaviorSubject('default');
        this.helpBaseUrl = '';
        this.serviceVersionInfos = [];
        this.activeMenuIdChanges$ = new BehaviorSubject('');
    }
    /** Load navigation data from provided endpoint URL */
    loadNavigationData(apiUrl, disableCache, forceReload) {
        if (!apiUrl) {
            throw new Error('No API URL defined for top navigation component.');
        }
        if (forceReload) {
            this.cacheService.invalidateCache();
        }
        let result$;
        let cached = false;
        const storedData = disableCache ? null : this.cacheService.loadStoredNavigationData();
        if (storedData) {
            cached = true;
            result$ = of(storedData);
        }
        else {
            result$ = this.http.get(apiUrl);
        }
        return result$
            .pipe(tap(navData => {
            this.initHelpLink(navData);
            this.initActiveMenuSection(navData);
            if (!cached && !disableCache) {
                this.cacheService.storeNavigationData(navData);
            }
        }));
    }
    /**
     * Provide a new topic key for context aware deep linking. It will be used the next time when help link is clicked
     * in the help menu.
     * @example
     * updateHelpLink('channels-inapp-list');
     * // resulting link: https://supportlink.mapp.com/redirect?label=Engage_channels-inapp-list&language=en
     * @param topicId the new topic id to use when help link is clicked.
     * Will be prefixed with 'Engage_' in the resulting link
     */
    updateHelpLink(topicId) {
        this.helpTopicKeys$.next(topicId);
    }
    /**
     * Retrieve an updated online help link based on the original one and the current value from the help topics stream.
     * @param helpLink URL for the original help link
     * @exception Fails with TypeError when provided string cannot be parsed as URL
     */
    getUpdatedHelpLink(helpLink) {
        const helpUrl = new URL(helpLink);
        const prefix = 'Engage_';
        if (helpUrl.searchParams.get('label') !== null) {
            let helpTopic = this.helpTopicKeys$.value;
            if (!helpTopic.startsWith(prefix)) {
                helpTopic = prefix + helpTopic;
            }
            helpUrl.searchParams.set('label', helpTopic);
            helpUrl.hash = '';
        }
        return helpUrl.toString();
    }
    /**
     * Get the current help url based on nav data base url and current state based on calls to 'updateHelpLink'.
     * Only works once nav data has been loaded, error thrown otherwise.
     */
    getCurrentHelpUrl() {
        return this.getUpdatedHelpLink(this.helpBaseUrl);
    }
    /** Send a request to backend to change the desired UI language */
    changeUILanguage(url) {
        this.cacheService.invalidateCache();
        // TODO remove once URL in endpoint has been changed to correct format
        const startPageUrl = url.replace('/automated/action.jsp', '/start.jsp');
        window.location.assign(startPageUrl);
    }
    /**
     * An Observable which emits the id of the currently active main navigation section.
     * Changes when user navigates to a new page.
     */
    get activeMenuIdChanges() {
        return this.activeMenuIdChanges$.asObservable();
    }
    /** Return the ID of the active menu section based on the current view */
    get activeNavMenuId() {
        return this.activeMenuIdChanges$.value;
    }
    /** Update the active top nav menu Id. Should be called when navigating to a new page. */
    set activeNavMenuId(menuId) {
        this.activeMenuIdChanges$.next(menuId);
    }
    /**
     * Add info about your service to the "About Engage" dialog. Entries will be added at the bottom of the dialog,
     * after the main content retrieved from aboutEcm.jsp
     * @param info new entry to be added. Needs to be a plain string.
     */
    addServiceVersionInfo(info) {
        this.serviceVersionInfos.push(info);
    }
    /**
     * Retrieve current value for service versions which have been added so far.
     */
    getServiceVersionInfos() {
        return this.serviceVersionInfos;
    }
    /**
     * Extract the help url and make it available to getCurrentHelpUrl.
     * Needed by some Engage legacy use cases.
     */
    initHelpLink(navData) {
        const helpItem = navData.auxNav.find(item => item.id === 'aux-help')
            ?.menu
            ?.find(item => item.id === 'aux-help-onlinehelp');
        this.helpBaseUrl = helpItem?.href ?? '';
    }
    /**
     * Try to find the top navigation section which is currently "active".
     * Based on matching the current window url against all navigation links retrieved from API.
     */
    initActiveMenuSection(navData) {
        const location = window.location.href;
        const findMatchingHref = (data, result) => {
            return data.some(val => {
                result.push(val.id);
                if (location === val?.href) {
                    return true;
                }
                else if (val.menu) {
                    const inner = findMatchingHref(val.menu, result);
                    result.pop();
                    return inner;
                }
                else {
                    result.pop();
                    return false;
                }
            });
        };
        const matchedNavSection = [];
        findMatchingHref(navData.mainNav.slice(1), matchedNavSection);
        if (matchedNavSection[0]) {
            this.activeNavMenuId = matchedNavSection[0];
        }
        else if (location.endsWith('start.jsp')) { // special handling for first arrival on start page after login
            this.activeNavMenuId = 'nav-dashboard';
        }
    }
}
TopNavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, deps: [{ token: i1.HttpClient }, { token: i2.TopNavigationCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
TopNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.TopNavigationCacheService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLW5hdmlnYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvdG9wLW5hdmlnYXRpb24vc2VydmljZXMvdG9wLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU9yQyxNQUFNLE9BQU8sb0JBQW9CO0lBTS9CLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBdUM7UUFEdkMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFQM0MsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQztRQUN4RCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQix3QkFBbUIsR0FBYSxFQUFFLENBQUM7UUFNekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsa0JBQWtCLENBQUMsTUFBYyxFQUFFLFlBQXFCLEVBQUUsV0FBb0I7UUFDNUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtRQUVELElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUNyQztRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFD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aUIsR0FBYSxFQUFFLENBQUM7UUFDdkMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM5RCxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSwrREFBK0Q7WUFDMUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7U0FDeEM7SUFDSCxDQUFDOztrSEF4S1Usb0JBQW9CO3NIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs0RkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvbiwgTmF2SXRlbSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL25hdmlnYXRpb24nO1xyXG5pbXBvcnQgeyBUb3BOYXZpZ2F0aW9uQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi90b3AtbmF2aWdhdGlvbi1jYWNoZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvcE5hdmlnYXRpb25TZXJ2aWNlIHtcclxuICBwcml2YXRlIGhlbHBUb3BpY0tleXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdkZWZhdWx0Jyk7XHJcbiAgcHJpdmF0ZSBoZWxwQmFzZVVybCA9ICcnO1xyXG4gIHByaXZhdGUgYWN0aXZlTWVudUlkQ2hhbmdlcyQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xyXG4gIHByaXZhdGUgc2VydmljZVZlcnNpb25JbmZvczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IFRvcE5hdmlnYXRpb25DYWNoZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYWN0aXZlTWVudUlkQ2hhbmdlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqIExvYWQgbmF2aWdhdGlvbiBkYXRhIGZyb20gcHJvdmlkZWQgZW5kcG9pbnQgVVJMICovXHJcbiAgbG9hZE5hdmlnYXRpb25EYXRhKGFwaVVybDogc3RyaW5nLCBkaXNhYmxlQ2FjaGU6IGJvb2xlYW4sIGZvcmNlUmVsb2FkOiBib29sZWFuKTogT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uPiB7XHJcbiAgICBpZiAoIWFwaVVybCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIEFQSSBVUkwgZGVmaW5lZCBmb3IgdG9wIG5hdmlnYXRpb24gY29tcG9uZW50LicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmb3JjZVJlbG9hZCkge1xyXG4gICAgICB0aGlzLmNhY2hlU2VydmljZS5pbnZhbGlkYXRlQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0JDtcclxuICAgIGxldCBjYWNoZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IHN0b3JlZERhdGEgPSBkaXNhYmxlQ2FjaGUgPyBudWxsIDogdGhpcy5jYWNoZVNlcnZpY2UubG9hZFN0b3JlZE5hdmlnYXRpb25EYXRhKCk7XHJcbiAgICBpZiAoc3RvcmVkRGF0YSkge1xyXG4gICAgICBjYWNoZWQgPSB0cnVlO1xyXG4gICAgICByZXN1bHQkID0gb2Yoc3RvcmVkRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQkID0gdGhpcy5odHRwLmdldDxOYXZpZ2F0aW9uPihhcGlVcmwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdCRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgdGFwKG5hdkRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuaW5pdEhlbHBMaW5rKG5hdkRhdGEpO1xyXG4gICAgICAgICAgICAgIHRoaXMuaW5pdEFjdGl2ZU1lbnVTZWN0aW9uKG5hdkRhdGEpO1xyXG4gICAgICAgICAgICAgIGlmICghY2FjaGVkICYmICFkaXNhYmxlQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnN0b3JlTmF2aWdhdGlvbkRhdGEobmF2RGF0YSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm92aWRlIGEgbmV3IHRvcGljIGtleSBmb3IgY29udGV4dCBhd2FyZSBkZWVwIGxpbmtpbmcuIEl0IHdpbGwgYmUgdXNlZCB0aGUgbmV4dCB0aW1lIHdoZW4gaGVscCBsaW5rIGlzIGNsaWNrZWRcclxuICAgKiBpbiB0aGUgaGVscCBtZW51LlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogdXBkYXRlSGVscExpbmsoJ2NoYW5uZWxzLWluYXBwLWxpc3QnKTtcclxuICAgKiAvLyByZXN1bHRpbmcgbGluazogaHR0cHM6Ly9zdXBwb3J0bGluay5tYXBwLmNvbS9yZWRpcmVjdD9sYWJlbD1FbmdhZ2VfY2hhbm5lbHMtaW5hcHAtbGlzdCZsYW5ndWFnZT1lblxyXG4gICAqIEBwYXJhbSB0b3BpY0lkIHRoZSBuZXcgdG9waWMgaWQgdG8gdXNlIHdoZW4gaGVscCBsaW5rIGlzIGNsaWNrZWQuXHJcbiAgICogV2lsbCBiZSBwcmVmaXhlZCB3aXRoICdFbmdhZ2VfJyBpbiB0aGUgcmVzdWx0aW5nIGxpbmtcclxuICAgKi9cclxuICB1cGRhdGVIZWxwTGluayh0b3BpY0lkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaGVscFRvcGljS2V5cyQubmV4dCh0b3BpY0lkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlIGFuIHVwZGF0ZWQgb25saW5lIGhlbHAgbGluayBiYXNlZCBvbiB0aGUgb3JpZ2luYWwgb25lIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBoZWxwIHRvcGljcyBzdHJlYW0uXHJcbiAgICogQHBhcmFtIGhlbHBMaW5rIFVSTCBmb3IgdGhlIG9yaWdpbmFsIGhlbHAgbGlua1xyXG4gICAqIEBleGNlcHRpb24gRmFpbHMgd2l0aCBUeXBlRXJyb3Igd2hlbiBwcm92aWRlZCBzdHJpbmcgY2Fubm90IGJlIHBhcnNlZCBhcyBVUkxcclxuICAgKi9cclxuICBnZXRVcGRhdGVkSGVscExpbmsoaGVscExpbms6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBoZWxwVXJsID0gbmV3IFVSTChoZWxwTGluayk7XHJcbiAgICBjb25zdCBwcmVmaXggPSAnRW5nYWdlXyc7XHJcbiAgICBpZiAoaGVscFVybC5zZWFyY2hQYXJhbXMuZ2V0KCdsYWJlbCcpICE9PSBudWxsKSB7XHJcbiAgICAgIGxldCBoZWxwVG9waWMgPSB0aGlzLmhlbHBUb3BpY0tleXMkLnZhbHVlO1xyXG4gICAgICBpZiAoIWhlbHBUb3BpYy5zdGFydHNXaXRoKHByZWZpeCkpIHtcclxuICAgICAgICBoZWxwVG9waWMgPSBwcmVmaXggKyBoZWxwVG9waWM7XHJcbiAgICAgIH1cclxuICAgICAgaGVscFVybC5zZWFyY2hQYXJhbXMuc2V0KCdsYWJlbCcsIGhlbHBUb3BpYyk7XHJcbiAgICAgIGhlbHBVcmwuaGFzaCA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhlbHBVcmwudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCBoZWxwIHVybCBiYXNlZCBvbiBuYXYgZGF0YSBiYXNlIHVybCBhbmQgY3VycmVudCBzdGF0ZSBiYXNlZCBvbiBjYWxscyB0byAndXBkYXRlSGVscExpbmsnLlxyXG4gICAqIE9ubHkgd29ya3Mgb25jZSBuYXYgZGF0YSBoYXMgYmVlbiBsb2FkZWQsIGVycm9yIHRocm93biBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudEhlbHBVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmdldFVwZGF0ZWRIZWxwTGluayh0aGlzLmhlbHBCYXNlVXJsKTtcclxuICB9XHJcblxyXG4gIC8qKiBTZW5kIGEgcmVxdWVzdCB0byBiYWNrZW5kIHRvIGNoYW5nZSB0aGUgZGVzaXJlZCBVSSBsYW5ndWFnZSAqL1xyXG4gIGNoYW5nZVVJTGFuZ3VhZ2UodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuY2FjaGVTZXJ2aWNlLmludmFsaWRhdGVDYWNoZSgpO1xyXG4gICAgLy8gVE9ETyByZW1vdmUgb25jZSBVUkwgaW4gZW5kcG9pbnQgaGFzIGJlZW4gY2hhbmdlZCB0byBjb3JyZWN0IGZvcm1hdFxyXG4gICAgY29uc3Qgc3RhcnRQYWdlVXJsID0gdXJsLnJlcGxhY2UoJy9hdXRvbWF0ZWQvYWN0aW9uLmpzcCcsICcvc3RhcnQuanNwJylcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oc3RhcnRQYWdlVXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIE9ic2VydmFibGUgd2hpY2ggZW1pdHMgdGhlIGlkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIG1haW4gbmF2aWdhdGlvbiBzZWN0aW9uLlxyXG4gICAqIENoYW5nZXMgd2hlbiB1c2VyIG5hdmlnYXRlcyB0byBhIG5ldyBwYWdlLlxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmVNZW51SWRDaGFuZ2VzKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVNZW51SWRDaGFuZ2VzJC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKiBSZXR1cm4gdGhlIElEIG9mIHRoZSBhY3RpdmUgbWVudSBzZWN0aW9uIGJhc2VkIG9uIHRoZSBjdXJyZW50IHZpZXcgKi9cclxuICBnZXQgYWN0aXZlTmF2TWVudUlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVNZW51SWRDaGFuZ2VzJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKiBVcGRhdGUgdGhlIGFjdGl2ZSB0b3AgbmF2IG1lbnUgSWQuIFNob3VsZCBiZSBjYWxsZWQgd2hlbiBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2UuICovXHJcbiAgc2V0IGFjdGl2ZU5hdk1lbnVJZChtZW51SWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5hY3RpdmVNZW51SWRDaGFuZ2VzJC5uZXh0KG1lbnVJZClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBpbmZvIGFib3V0IHlvdXIgc2VydmljZSB0byB0aGUgXCJBYm91dCBFbmdhZ2VcIiBkaWFsb2cuIEVudHJpZXMgd2lsbCBiZSBhZGRlZCBhdCB0aGUgYm90dG9tIG9mIHRoZSBkaWFsb2csXHJcbiAgICogYWZ0ZXIgdGhlIG1haW4gY29udGVudCByZXRyaWV2ZWQgZnJvbSBhYm91dEVjbS5qc3BcclxuICAgKiBAcGFyYW0gaW5mbyBuZXcgZW50cnkgdG8gYmUgYWRkZWQuIE5lZWRzIHRvIGJlIGEgcGxhaW4gc3RyaW5nLlxyXG4gICAqL1xyXG4gIGFkZFNlcnZpY2VWZXJzaW9uSW5mbyhpbmZvOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VydmljZVZlcnNpb25JbmZvcy5wdXNoKGluZm8pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmUgY3VycmVudCB2YWx1ZSBmb3Igc2VydmljZSB2ZXJzaW9ucyB3aGljaCBoYXZlIGJlZW4gYWRkZWQgc28gZmFyLlxyXG4gICAqL1xyXG4gIGdldFNlcnZpY2VWZXJzaW9uSW5mb3MoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZVZlcnNpb25JbmZvcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dHJhY3QgdGhlIGhlbHAgdXJsIGFuZCBtYWtlIGl0IGF2YWlsYWJsZSB0byBnZXRDdXJyZW50SGVscFVybC5cclxuICAgKiBOZWVkZWQgYnkgc29tZSBFbmdhZ2UgbGVnYWN5IHVzZSBjYXNlcy5cclxuICAgKi9cclxuICBwcml2YXRlIGluaXRIZWxwTGluayhuYXZEYXRhOiBOYXZpZ2F0aW9uKTogdm9pZCB7XHJcbiAgICBjb25zdCBoZWxwSXRlbSA9IG5hdkRhdGEuYXV4TmF2LmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSAnYXV4LWhlbHAnKVxyXG4gICAgICAgID8ubWVudVxyXG4gICAgICAgID8uZmluZChpdGVtID0+IGl0ZW0uaWQgPT09ICdhdXgtaGVscC1vbmxpbmVoZWxwJyk7XHJcbiAgICB0aGlzLmhlbHBCYXNlVXJsID0gaGVscEl0ZW0/LmhyZWYgPz8gJyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcnkgdG8gZmluZCB0aGUgdG9wIG5hdmlnYXRpb24gc2VjdGlvbiB3aGljaCBpcyBjdXJyZW50bHkgXCJhY3RpdmVcIi5cclxuICAgKiBCYXNlZCBvbiBtYXRjaGluZyB0aGUgY3VycmVudCB3aW5kb3cgdXJsIGFnYWluc3QgYWxsIG5hdmlnYXRpb24gbGlua3MgcmV0cmlldmVkIGZyb20gQVBJLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdEFjdGl2ZU1lbnVTZWN0aW9uKG5hdkRhdGE6IE5hdmlnYXRpb24pOiB2b2lkIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICBjb25zdCBmaW5kTWF0Y2hpbmdIcmVmID0gKFxyXG4gICAgICAgIGRhdGE6IE5hdkl0ZW1bXSxcclxuICAgICAgICByZXN1bHQ6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgIHJldHVybiBkYXRhLnNvbWUodmFsID0+IHtcclxuICAgICAgICByZXN1bHQucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gdmFsPy5ocmVmKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5tZW51KSB7XHJcbiAgICAgICAgICBjb25zdCBpbm5lciA9IGZpbmRNYXRjaGluZ0hyZWYodmFsLm1lbnUsIHJlc3VsdCk7XHJcbiAgICAgICAgICByZXN1bHQucG9wKCk7XHJcbiAgICAgICAgICByZXR1cm4gaW5uZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3VsdC5wb3AoKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hdGNoZWROYXZTZWN0aW9uOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgZmluZE1hdGNoaW5nSHJlZihuYXZEYXRhLm1haW5OYXYuc2xpY2UoMSksIG1hdGNoZWROYXZTZWN0aW9uKTtcclxuICAgIGlmIChtYXRjaGVkTmF2U2VjdGlvblswXSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZU5hdk1lbnVJZCA9IG1hdGNoZWROYXZTZWN0aW9uWzBdXHJcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLmVuZHNXaXRoKCdzdGFydC5qc3AnKSkgeyAvLyBzcGVjaWFsIGhhbmRsaW5nIGZvciBmaXJzdCBhcnJpdmFsIG9uIHN0YXJ0IHBhZ2UgYWZ0ZXIgbG9naW5cclxuICAgICAgdGhpcy5hY3RpdmVOYXZNZW51SWQgPSAnbmF2LWRhc2hib2FyZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=