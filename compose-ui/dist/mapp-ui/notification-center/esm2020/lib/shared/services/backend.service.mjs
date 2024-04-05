import { Inject, Injectable, Optional } from '@angular/core';
import { EMPTY } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NC_API_CONFIG } from '../models/configurations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * The BackendService handles http connection to the nc-service API and provides
 * wrapper functions around the individual endpoints.
 */
export class BackendService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        if (this.config === null) {
            console.warn('No configuration set for NC API connection. NC will work in UI-only mode.');
        }
    }
    getNotifications() {
        if (this.config === null) {
            return EMPTY;
        }
        const url = `${this.config.baseUrl}active${this.buildUserQuery()}`;
        return this.http.get(url);
    }
    getSessionId() {
        if (this.config === null) {
            return '';
        }
        if (this.config.connectionMode === 'cep') {
            return this.config.sessionId || '';
        }
        else {
            return '';
        }
    }
    dismissMessages(nIds) {
        if (this.config !== null) {
            const dismissQuery = this.config.connectionMode === 'cep' ? this.config.sessionId || '' : '/';
            const url = `${this.config.baseUrl}dismiss${dismissQuery}`;
            let payload;
            if (this.config.userInfo) {
                payload = Object.assign({}, this.config.userInfo);
                payload.notificationIds = nIds;
            }
            else {
                payload = nIds;
            }
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(url, payload, { headers })
                .subscribe({
                error: (error) => {
                    console.error('NC: Dismiss call error', error);
                }
            });
        }
    }
    getNewNotifications(sinceDate) {
        if (this.config === null) {
            return EMPTY;
        }
        let url = `${this.config.baseUrl}active/latest${this.buildUserQuery()}`;
        url += this.config.connectionMode === 'cep' ? '?' : '&';
        url += `since=${sinceDate}`;
        return this.http.get(url);
    }
    buildUserQuery() {
        if (this.config.connectionMode === 'cep') {
            return this.config.sessionId || '';
        }
        else {
            const userInfo = this.config.userInfo;
            if (typeof userInfo === 'object') {
                let locale = 'en';
                if (typeof userInfo.locale === 'string') {
                    locale = userInfo.locale;
                }
                return `?datacenter=${userInfo.datacenter}&database=${userInfo.database}&customerId=${userInfo.customerId}`
                    + `&userId=${userInfo.userId}&locale=${locale}`;
            }
            return '';
        }
    }
}
BackendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, deps: [{ token: i1.HttpClient }, { token: NC_API_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
BackendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BackendService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NC_API_CONFIG]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyL3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL2JhY2tlbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFjLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFJekQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFFekIsWUFBb0IsSUFBZ0IsRUFDbUIsTUFBd0I7UUFEM0QsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNtQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUU3RSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkVBQTJFLENBQUMsQ0FBQztTQUMzRjtJQUNILENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFTLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixPQUFPLEVBQUUsQ0FB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QztTQUNYO0lBQ0gsQ0FBQzs7NEdBbkZVLGNBQWMsNENBR0wsYUFBYTtnSEFIdEIsY0FBYyxjQURELE1BQU07NEZBQ25CLGNBQWM7a0JBRDFCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFJbkIsTUFBTTsyQkFBQyxhQUFhOzswQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmljYXRpb24nO1xyXG5pbXBvcnQgeyBOQ19BUElfQ09ORklHIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZ3VyYXRpb25zJztcclxuaW1wb3J0IHsgQXBpQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9hcGktY29uZmlnJztcclxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2VJbnRlcmZhY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZS5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBCYWNrZW5kU2VydmljZSBoYW5kbGVzIGh0dHAgY29ubmVjdGlvbiB0byB0aGUgbmMtc2VydmljZSBBUEkgYW5kIHByb3ZpZGVzXHJcbiAqIHdyYXBwZXIgZnVuY3Rpb25zIGFyb3VuZCB0aGUgaW5kaXZpZHVhbCBlbmRwb2ludHMuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQmFja2VuZFNlcnZpY2UgaW1wbGVtZW50cyBCYWNrZW5kU2VydmljZUludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBASW5qZWN0KE5DX0FQSV9DT05GSUcpIEBPcHRpb25hbCgpIHByaXZhdGUgY29uZmlnOiBBcGlDb25maWdPcHRpb25zKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignTm8gY29uZmlndXJhdGlvbiBzZXQgZm9yIE5DIEFQSSBjb25uZWN0aW9uLiBOQyB3aWxsIHdvcmsgaW4gVUktb25seSBtb2RlLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Tm90aWZpY2F0aW9ucygpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbltdPiB7XHJcbiAgICBpZiAodGhpcy5jb25maWcgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9YWN0aXZlJHt0aGlzLmJ1aWxkVXNlclF1ZXJ5KCl9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE5vdGlmaWNhdGlvbltdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2Vzc2lvbklkKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb25maWcgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5jb25uZWN0aW9uTW9kZSA9PT0gJ2NlcCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnNlc3Npb25JZCB8fCAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc21pc3NNZXNzYWdlcyhuSWRzOiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25maWcgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgZGlzbWlzc1F1ZXJ5ID0gdGhpcy5jb25maWcuY29ubmVjdGlvbk1vZGUgPT09ICdjZXAnID8gdGhpcy5jb25maWcuc2Vzc2lvbklkIHx8ICcnIDogJy8nO1xyXG4gICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfWRpc21pc3Mke2Rpc21pc3NRdWVyeX1gO1xyXG4gICAgICBsZXQgcGF5bG9hZDogYW55O1xyXG4gICAgICBpZiAodGhpcy5jb25maWcudXNlckluZm8pIHtcclxuICAgICAgICBwYXlsb2FkID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcudXNlckluZm8pO1xyXG4gICAgICAgIHBheWxvYWQubm90aWZpY2F0aW9uSWRzID0gbklkcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXlsb2FkID0gbklkcztcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcbiAgICAgIHRoaXMuaHR0cC5wb3N0KHVybCwgcGF5bG9hZCwgeyBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTkM6IERpc21pc3MgY2FsbCBlcnJvcicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TmV3Tm90aWZpY2F0aW9ucyhzaW5jZURhdGU6IHN0cmluZyk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uW10+IHtcclxuICAgIGlmICh0aGlzLmNvbmZpZyA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVybCA9IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9YWN0aXZlL2xhdGVzdCR7dGhpcy5idWlsZFVzZXJRdWVyeSgpfWA7XHJcbiAgICB1cmwgKz0gdGhpcy5jb25maWcuY29ubmVjdGlvbk1vZGUgPT09ICdjZXAnID8gJz8nIDogJyYnO1xyXG4gICAgdXJsICs9IGBzaW5jZT0ke3NpbmNlRGF0ZX1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE5vdGlmaWNhdGlvbltdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFVzZXJRdWVyeSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmNvbm5lY3Rpb25Nb2RlID09PSAnY2VwJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuc2Vzc2lvbklkIHx8ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdXNlckluZm8gPSB0aGlzLmNvbmZpZy51c2VySW5mbztcclxuICAgICAgaWYgKHR5cGVvZiB1c2VySW5mbyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBsZXQgbG9jYWxlID0gJ2VuJztcclxuICAgICAgICBpZiAodHlwZW9mIHVzZXJJbmZvLmxvY2FsZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGxvY2FsZSA9IHVzZXJJbmZvLmxvY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGA/ZGF0YWNlbnRlcj0ke3VzZXJJbmZvLmRhdGFjZW50ZXJ9JmRhdGFiYXNlPSR7dXNlckluZm8uZGF0YWJhc2V9JmN1c3RvbWVySWQ9JHt1c2VySW5mby5jdXN0b21lcklkfWBcclxuICAgICAgICAgICsgYCZ1c2VySWQ9JHt1c2VySW5mby51c2VySWR9JmxvY2FsZT0ke2xvY2FsZX1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=