import { Component, Input } from '@angular/core';
import { interval, timer, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SessionTimerService } from './session-timer.service';
import * as i0 from "@angular/core";
import * as i1 from "./session-timer.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/button";
export class SessionTimerComponent {
    constructor(service) {
        this.service = service;
        this.trackClicks = false;
        this.timerCountdown = interval(1000);
    }
    ngOnInit() {
        if (this.navItem) {
            this.sessionTime = new Date(this.navItem.timeout);
            this.service.endpointUrl = this.navItem.href;
            if (this.navItem.keepAlive && !this.navItem.idleMode) {
                this.startKeepAlive();
            }
            else {
                this.startTimer();
            }
            if (this.navItem.idleMode) {
                this.onIdleModeActivated();
            }
        }
        if (this.trackClicks) {
            this.startClickTracker();
        }
    }
    startTimer() {
        // TODO review if there is more elegant handling using additional rxjs operators
        this.timer = this.timerCountdown.subscribe(() => {
            const tick = this.sessionTime.getTime() - 1000;
            this.sessionTime = new Date(tick);
            if (tick === 0) {
                this.timer.unsubscribe();
                this.service.sessionTimedOut(this.navItem.expiredMsg);
                if (typeof this.navItem.expiredHref === 'string') {
                    setTimeout(() => {
                        window.location.assign(this.navItem.expiredHref);
                    }, 5000);
                }
            }
        });
        if (this.activeKeepAlive && !this.activeKeepAlive.closed) {
            this.stopKeepAlive();
        }
    }
    stopAndResetTimer() {
        this.timer.unsubscribe();
        this.resetTimer();
        this.startKeepAlive();
    }
    onIdleModeActivated() {
        // console.log('Idle mode activated...');
        this.service.idleModeActivated(this.navItem.idleModeMsg);
    }
    startClickTracker() {
        // console.log('start tracking clicks');
        const clickCheckInterval = this.navItem.timeout / 200;
        const clicks = fromEvent(document, 'click');
        this.activeClickTracker = clicks.pipe(debounceTime(clickCheckInterval)).subscribe(() => {
            this.resetTimer();
            this.service.ping().subscribe();
            // console.log('timer reset because of clicks');
        });
    }
    stopClickTracker() {
        // console.log('stop tracking clicks');
        this.activeClickTracker.unsubscribe();
    }
    resetTimer() {
        this.sessionTime = new Date(this.navItem.timeout);
    }
    startKeepAlive() {
        // console.log('starting keepalive');
        this.activeKeepAlive = timer(10, 30000).subscribe(() => {
            this.service.keepAlive().subscribe(res => {
                if (res.idleMode === true) {
                    this.onIdleModeActivated();
                    this.startTimer();
                }
            });
        });
        // stop the clicktracker while keepalive is enabled
        if (this.trackClicks && this.activeClickTracker) {
            this.stopClickTracker();
        }
    }
    stopKeepAlive() {
        // console.log('stopping keepalive!');
        this.activeKeepAlive.unsubscribe();
        this.service.stopKeepAlive().subscribe();
        // start click tracker again if needed
        if (this.trackClicks) {
            this.startClickTracker();
        }
    }
}
SessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerComponent, deps: [{ token: i1.SessionTimerService }], target: i0.ɵɵFactoryTarget.Component });
SessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SessionTimerComponent, selector: "mui-session-timer", inputs: { navItem: "navItem", trackClicks: "trackClicks" }, providers: [SessionTimerService], exportAs: ["muiSessionTimer"], ngImport: i0, template: "<button *ngIf=\"timer && !timer.closed\" mat-icon-button class=\"text-nav-button session-timer-button\"\r\n  (click)=\"stopAndResetTimer()\">\r\n  <span class=\"button-text\">{{ sessionTime | date:'mm:ss' }}</span>\r\n  <mat-icon class=\"stop-timer-icon\">timer_off</mat-icon>\r\n</button>\r\n<button *ngIf=\"!timer || timer.closed\" mat-icon-button (click)=\"startTimer()\">\r\n  <mat-icon>timer</mat-icon>\r\n</button>\r\n\r\n", styles: [".stop-timer-icon{width:16px;font-size:16px;margin-left:2px}.session-timer-button{width:85px;height:40px;font-size:14px;font-weight:300;vertical-align:middle;cursor:pointer}.button-text{position:relative;top:1px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "pipe", type: i2.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-session-timer', exportAs: 'muiSessionTimer', providers: [SessionTimerService], template: "<button *ngIf=\"timer && !timer.closed\" mat-icon-button class=\"text-nav-button session-timer-button\"\r\n  (click)=\"stopAndResetTimer()\">\r\n  <span class=\"button-text\">{{ sessionTime | date:'mm:ss' }}</span>\r\n  <mat-icon class=\"stop-timer-icon\">timer_off</mat-icon>\r\n</button>\r\n<button *ngIf=\"!timer || timer.closed\" mat-icon-button (click)=\"startTimer()\">\r\n  <mat-icon>timer</mat-icon>\r\n</button>\r\n\r\n", styles: [".stop-timer-icon{width:16px;font-size:16px;margin-left:2px}.session-timer-button{width:85px;height:40px;font-size:14px;font-weight:300;vertical-align:middle;cursor:pointer}.button-text{position:relative;top:1px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.SessionTimerService }]; }, propDecorators: { navItem: [{
                type: Input
            }], trackClicks: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi10aW1lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2FwcC1uYXYvaGVhZGVybmF2L3Nlc3Npb24tdGltZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2hlYWRlcm5hdi9zZXNzaW9uLXRpbWVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBNEIsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFTOUQsTUFBTSxPQUFPLHFCQUFxQjtJQWdCaEMsWUFBb0IsT0FBNEI7UUFBNUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFUaEQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFVbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBRTdDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENB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LEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDekIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7b0JBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpDLHNDQUFzQztRQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzttSEF6SFUscUJBQXFCO3VHQUFyQixxQkFBcUIsd0dBRnJCLENBQUMsbUJBQW1CLENBQUMseURDWmxDLDhhQVNBOzRGREthLHFCQUFxQjtrQkFQakMsU0FBUzsrQkFDRSxtQkFBbUIsWUFDbkIsaUJBQWlCLGFBR2hCLENBQUMsbUJBQW1CLENBQUM7MEdBTWhDLE9BQU87c0JBRE4sS0FBSztnQkFJTixXQUFXO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgaW50ZXJ2YWwsIHRpbWVyLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU2Vzc2lvblRpbWVyU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi10aW1lci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLXNlc3Npb24tdGltZXInLFxyXG4gIGV4cG9ydEFzOiAnbXVpU2Vzc2lvblRpbWVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2Vzc2lvbi10aW1lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2Vzc2lvbi10aW1lci5jb21wb25lbnQuY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbU2Vzc2lvblRpbWVyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlc3Npb25UaW1lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbi8vIFRPRE8gYW5pbWF0aW9ucz9cclxuXHJcbiAgQElucHV0KClcclxuICBuYXZJdGVtOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHJhY2tDbGlja3MgPSBmYWxzZTtcclxuXHJcbiAgdGltZXI6IFN1YnNjcmlwdGlvbjtcclxuICBzZXNzaW9uVGltZTogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSB0aW1lckNvdW50ZG93bjogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gIHByaXZhdGUgYWN0aXZlS2VlcEFsaXZlOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBhY3RpdmVDbGlja1RyYWNrZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBTZXNzaW9uVGltZXJTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnRpbWVyQ291bnRkb3duID0gaW50ZXJ2YWwoMTAwMCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm5hdkl0ZW0pIHtcclxuICAgICAgdGhpcy5zZXNzaW9uVGltZSA9IG5ldyBEYXRlKHRoaXMubmF2SXRlbS50aW1lb3V0KTtcclxuICAgICAgdGhpcy5zZXJ2aWNlLmVuZHBvaW50VXJsID0gdGhpcy5uYXZJdGVtLmhyZWY7XHJcblxyXG4gICAgICBpZiAodGhpcy5uYXZJdGVtLmtlZXBBbGl2ZSAmJiAhdGhpcy5uYXZJdGVtLmlkbGVNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEtlZXBBbGl2ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5uYXZJdGVtLmlkbGVNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5vbklkbGVNb2RlQWN0aXZhdGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50cmFja0NsaWNrcykge1xyXG4gICAgICB0aGlzLnN0YXJ0Q2xpY2tUcmFja2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydFRpbWVyKCk6IHZvaWQge1xyXG4gICAgLy8gVE9ETyByZXZpZXcgaWYgdGhlcmUgaXMgbW9yZSBlbGVnYW50IGhhbmRsaW5nIHVzaW5nIGFkZGl0aW9uYWwgcnhqcyBvcGVyYXRvcnNcclxuICAgIHRoaXMudGltZXIgPSB0aGlzLnRpbWVyQ291bnRkb3duLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRpY2sgPSB0aGlzLnNlc3Npb25UaW1lLmdldFRpbWUoKSAtIDEwMDA7XHJcbiAgICAgIHRoaXMuc2Vzc2lvblRpbWUgPSBuZXcgRGF0ZSh0aWNrKTtcclxuXHJcbiAgICAgIGlmICh0aWNrID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy50aW1lci51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5zZXNzaW9uVGltZWRPdXQodGhpcy5uYXZJdGVtLmV4cGlyZWRNc2cpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubmF2SXRlbS5leHBpcmVkSHJlZiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHRoaXMubmF2SXRlbS5leHBpcmVkSHJlZik7XHJcbiAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmFjdGl2ZUtlZXBBbGl2ZSAmJiAhdGhpcy5hY3RpdmVLZWVwQWxpdmUuY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuc3RvcEtlZXBBbGl2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcEFuZFJlc2V0VGltZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbWVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnJlc2V0VGltZXIoKTtcclxuICAgIHRoaXMuc3RhcnRLZWVwQWxpdmUoKTtcclxuICB9XHJcblxyXG4gIG9uSWRsZU1vZGVBY3RpdmF0ZWQoKTogdm9pZCB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnSWRsZSBtb2RlIGFjdGl2YXRlZC4uLicpO1xyXG4gICAgdGhpcy5zZXJ2aWNlLmlkbGVNb2RlQWN0aXZhdGVkKHRoaXMubmF2SXRlbS5pZGxlTW9kZU1zZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0Q2xpY2tUcmFja2VyKCk6IHZvaWQge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3N0YXJ0IHRyYWNraW5nIGNsaWNrcycpO1xyXG4gICAgY29uc3QgY2xpY2tDaGVja0ludGVydmFsID0gdGhpcy5uYXZJdGVtLnRpbWVvdXQgLyAyMDA7XHJcbiAgICBjb25zdCBjbGlja3MgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xyXG4gICAgdGhpcy5hY3RpdmVDbGlja1RyYWNrZXIgPSBjbGlja3MucGlwZShkZWJvdW5jZVRpbWUoY2xpY2tDaGVja0ludGVydmFsKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5yZXNldFRpbWVyKCk7XHJcbiAgICAgIHRoaXMuc2VydmljZS5waW5nKCkuc3Vic2NyaWJlKCk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0aW1lciByZXNldCBiZWNhdXNlIG9mIGNsaWNrcycpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BDbGlja1RyYWNrZXIoKTogdm9pZCB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnc3RvcCB0cmFja2luZyBjbGlja3MnKTtcclxuICAgIHRoaXMuYWN0aXZlQ2xpY2tUcmFja2VyLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlc3Npb25UaW1lID0gbmV3IERhdGUodGhpcy5uYXZJdGVtLnRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEtlZXBBbGl2ZSgpOiB2b2lkIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdzdGFydGluZyBrZWVwYWxpdmUnKTtcclxuICAgIHRoaXMuYWN0aXZlS2VlcEFsaXZlID0gdGltZXIoMTAsIDMwMDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNlcnZpY2Uua2VlcEFsaXZlKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5pZGxlTW9kZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5vbklkbGVNb2RlQWN0aXZhdGVkKCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc3RvcCB0aGUgY2xpY2t0cmFja2VyIHdoaWxlIGtlZXBhbGl2ZSBpcyBlbmFibGVkXHJcbiAgICBpZiAodGhpcy50cmFja0NsaWNrcyAmJiB0aGlzLmFjdGl2ZUNsaWNrVHJhY2tlcikge1xyXG4gICAgICB0aGlzLnN0b3BDbGlja1RyYWNrZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcEtlZXBBbGl2ZSgpOiB2b2lkIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdzdG9wcGluZyBrZWVwYWxpdmUhJyk7XHJcbiAgICB0aGlzLmFjdGl2ZUtlZXBBbGl2ZS51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZXJ2aWNlLnN0b3BLZWVwQWxpdmUoKS5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAvLyBzdGFydCBjbGljayB0cmFja2VyIGFnYWluIGlmIG5lZWRlZFxyXG4gICAgaWYgKHRoaXMudHJhY2tDbGlja3MpIHtcclxuICAgICAgdGhpcy5zdGFydENsaWNrVHJhY2tlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiPGJ1dHRvbiAqbmdJZj1cInRpbWVyICYmICF0aW1lci5jbG9zZWRcIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJ0ZXh0LW5hdi1idXR0b24gc2Vzc2lvbi10aW1lci1idXR0b25cIlxyXG4gIChjbGljayk9XCJzdG9wQW5kUmVzZXRUaW1lcigpXCI+XHJcbiAgPHNwYW4gY2xhc3M9XCJidXR0b24tdGV4dFwiPnt7IHNlc3Npb25UaW1lIHwgZGF0ZTonbW06c3MnIH19PC9zcGFuPlxyXG4gIDxtYXQtaWNvbiBjbGFzcz1cInN0b3AtdGltZXItaWNvblwiPnRpbWVyX29mZjwvbWF0LWljb24+XHJcbjwvYnV0dG9uPlxyXG48YnV0dG9uICpuZ0lmPVwiIXRpbWVyIHx8IHRpbWVyLmNsb3NlZFwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwic3RhcnRUaW1lcigpXCI+XHJcbiAgPG1hdC1pY29uPnRpbWVyPC9tYXQtaWNvbj5cclxuPC9idXR0b24+XHJcblxyXG4iXX0=