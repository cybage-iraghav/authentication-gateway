import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/session-timer.service";
export class SessionTimerInterceptor {
    constructor(timerService) {
        this.timerService = timerService;
    }
    intercept(req, next) {
        if (this.timerService) {
            this.timerService.resetTimer();
        }
        return next.handle(req);
    }
}
SessionTimerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor, deps: [{ token: i1.SessionTimerService }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.SessionTimerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi10aW1lci1pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvY29tbW9uL3NyYy9saWIvdG9wLW5hdmlnYXRpb24vaW50ZXJjZXB0b3JzL3Nlc3Npb24tdGltZXItaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyx1QkFBdUI7SUFFbEMsWUFDWSxZQUFpQztRQUFqQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFFN0MsQ0FBQztJQUVELFNBQVMsQ0FDTCxHQUFxQixFQUNyQixJQUFpQjtRQUVuQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDOztxSEFmVSx1QkFBdUI7eUhBQXZCLHVCQUF1Qjs0RkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlc3Npb25UaW1lclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zZXNzaW9uLXRpbWVyLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvblRpbWVySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSB0aW1lclNlcnZpY2U6IFNlc3Npb25UaW1lclNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIGludGVyY2VwdChcclxuICAgICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxyXG4gICAgICBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBpZiAodGhpcy50aW1lclNlcnZpY2UpIHtcclxuICAgICAgdGhpcy50aW1lclNlcnZpY2UucmVzZXRUaW1lcigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=