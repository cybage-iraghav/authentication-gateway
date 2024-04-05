import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { animate, trigger, state, style, transition } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MuiLeftnavService } from './mui-leftnav.service';
import * as i0 from "@angular/core";
import * as i1 from "./mui-leftnav.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/button";
/**
 * Component which handles the left-side navigation menu
 * @deprecated
 */
export class MuiLeftnavComponent {
    constructor(leftNavService, router) {
        this.leftNavService = leftNavService;
        this.router = router;
        this.subNavSwitchDelay = 500;
        /**
         * Output event which emits when the left nav panel exapnds or collapses
         */
        this.navExpanded = new EventEmitter();
        this.mainNavState = 'collapsed';
        this.subPanelOpen = false;
        // the currently active main item (hover state)
        this.activeMainItem = '';
        this.highlightedMainItem = '';
        this.navMouseEvents = new Subject();
        this.menuLabel = {
            id: 'mm-menu',
            name: 'Menu'
        };
    }
    ngOnInit() {
        if (this.apiUrl) {
            this.leftNavService.getNavigationItems(this.apiUrl).subscribe(data => {
                this.navItems = data.mainNav;
                this.loadSavedActiveNavItems();
            });
        }
        else {
            console.warn('MuiLeftnavConponent: No value set for [apiUrl]. No nav items will be generated.');
        }
        this.navMouseEvents.pipe(debounceTime(this.subNavSwitchDelay)).subscribe(e => this.onNavMouseEvent(e));
    }
    toggleState() {
        this.mainNavState = this.mainNavState === 'collapsed' ? 'expanded' : 'collapsed';
        this.navExpanded.emit(this.mainNavState === 'expanded');
    }
    onEnterMainItem(item) {
        this.navMouseEvents.next({ event: 'enter', item });
    }
    onMouseLeaveNav() {
        this.navMouseEvents.next({ event: 'leave' });
    }
    setActivePage(sectionId, pageId, href) {
        const activePage = {
            section: sectionId,
            page: pageId ? pageId : null
        };
        this.leftNavService.saveActiveNavItems(activePage);
        if (href) {
            // try to handle relative links using the router
            // use location assignment for absolute urls or when no router is available
            if (href.match(/https?:\/\//) || !this.router) {
                window.location.assign(href);
            }
            else {
                this.router.navigate([href]);
                this.highlightedMainItem = sectionId;
                this.highlightedSubMenuItem = pageId;
            }
        }
    }
    onNavMouseEvent(e) {
        if (e.event === 'enter' && e.item) {
            this.activeMainItem = e.item.id;
            this.subPanelOpen = typeof e.item.menu === 'object';
        }
        else {
            this.subPanelOpen = false;
            this.activeMainItem = '';
        }
    }
    loadSavedActiveNavItems() {
        const cepNavActive = this.leftNavService.loadSavedActiveNavItems();
        // look for saved entries from sesstion storage
        if (cepNavActive !== null) {
            const activeSection = this.navItems.find(item => item.id === cepNavActive.section);
            if (activeSection) {
                this.highlightedMainItem = activeSection.id;
                if (activeSection.menu) {
                    const activePage = activeSection.menu.find(item => item.id === cepNavActive.page);
                    if (activePage) {
                        this.highlightedSubMenuItem = activePage.id;
                    }
                }
            }
        }
        // if the router is configured, additionally match against the current url and find corresponding items to highlight
        // this will give correct highlight in case of manual entered urls or bookmarks
        if (this.router) {
            this.navItems.find(item => {
                if (item.href === this.router.url) {
                    this.highlightedMainItem = item.id;
                    this.highlightedSubMenuItem = undefined;
                    return true;
                }
                else if (item.menu) {
                    const subItem = item.menu.find(subitem => subitem.href === this.router.url);
                    if (subItem) {
                        this.highlightedSubMenuItem = subItem.id;
                        this.highlightedMainItem = item.id;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
        }
    }
}
MuiLeftnavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavComponent, deps: [{ token: i1.MuiLeftnavService }, { token: i2.Router, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavComponent, selector: "mui-leftnav", inputs: { apiUrl: "apiUrl", subNavSwitchDelay: "subNavSwitchDelay" }, outputs: { navExpanded: "navExpanded" }, providers: [MuiLeftnavService], exportAs: ["muiLeftnav"], ngImport: i0, template: "<nav class=\"leftnav-container\" (mouseleave)=\"onMouseLeaveNav()\">\r\n  <ul class=\"leftnav-main\" [@mainNavState]=\"mainNavState\">\r\n    <li>\r\n      <button mat-button class=\"nav-item main\" (click)=\"toggleState()\">\r\n        <mat-icon class=\"nav-item-icon\">menu</mat-icon>\r\n        &nbsp;\r\n      </button>\r\n    </li>\r\n    <!-- main menu --->\r\n    <li *ngFor=\"let item of navItems\" (mouseenter)=\"onEnterMainItem(item)\">\r\n      <button mat-button class=\"nav-item main\" [class.active]=\"item.id === activeMainItem\"\r\n        [class.highlight]=\"item.id === highlightedMainItem\"\r\n        (click)=\"setActivePage(item.id, undefined, item.href)\">\r\n        <mat-icon class=\"nav-item-icon\">{{ item.matIcon }}</mat-icon>\r\n        {{ item.name }}\r\n        <mat-icon class=\"nav-item-submenu-indicator\" *ngIf=\"item.menu\">chevron_right</mat-icon>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n  <!-- 2nd level menu -->\r\n  <ul class=\"leftnav-sub\" [class.open]=\"subPanelOpen\">\r\n    <li *ngFor=\"let item of navItems\">\r\n      <ul *ngIf=\"item.menu\" class=\"submenu\" [class.active]=\"activeMainItem === item.id\">\r\n        <li class=\"subnav-header\"><h5>{{ item.name }}</h5></li>\r\n        <li *ngFor=\"let subitem of item.menu\">\r\n          <button mat-button class=\"nav-item sub\" [class.highlight]=\"subitem.id === highlightedSubMenuItem\"\r\n            (click)=\"setActivePage(item.id, subitem.id, subitem.href)\">{{ subitem.name }}\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n", styles: ["ul{list-style-type:none;margin:0;padding:0}.leftnav-main{box-shadow:2px 0 2px #0000003d;box-sizing:border-box;overflow:hidden;position:absolute;top:0;bottom:0;height:100%;z-index:2}.leftnav-sub{width:0;box-shadow:2px 0 2px #0000003d;position:absolute;top:0;bottom:0;left:60px;transition:width .3s;overflow-y:auto;overflow-x:hidden;z-index:2}.leftnav-sub.open{width:220px;border-left:1px solid #292b31;transition:width .7s}.nav-item{width:100%;position:relative;text-transform:none;line-height:50px;height:50px;color:#fff;text-align:left;font-size:13px;font-weight:400;letter-spacing:.1em;border-bottom:1px solid #292B31;border-radius:0}.nav-item.main{padding:0 54px 0 60px}.nav-item.sub{padding:0 10px;overflow:hidden;text-overflow:ellipsis}.nav-item.sub.highlight{box-shadow:none}.nav-item-icon{position:absolute;left:17px;line-height:50px;height:50px;font-size:18px}.nav-item-submenu-indicator{position:absolute;right:17px;line-height:50px;height:50px;font-size:18px}.subnav-header{color:#fff;height:70px;padding:25px 0 0 10px;overflow:hidden;white-space:nowrap;border-bottom:1px solid #292b31;box-sizing:border-box}.subnav-header h5{font-weight:300;font-size:13px;letter-spacing:.05em;margin:10px 0;text-transform:uppercase;text-overflow:ellipsis}.submenu{display:none}.submenu.active{display:block}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], animations: [
        trigger('mainNavState', [
            state('collapsed', style({
                width: '60px'
            })),
            state('expanded', style({
                width: '280px'
            })),
            transition('collapsed <=> expanded', animate(200))
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-leftnav', exportAs: 'muiLeftnav', providers: [MuiLeftnavService], animations: [
                        trigger('mainNavState', [
                            state('collapsed', style({
                                width: '60px'
                            })),
                            state('expanded', style({
                                width: '280px'
                            })),
                            transition('collapsed <=> expanded', animate(200))
                        ])
                    ], template: "<nav class=\"leftnav-container\" (mouseleave)=\"onMouseLeaveNav()\">\r\n  <ul class=\"leftnav-main\" [@mainNavState]=\"mainNavState\">\r\n    <li>\r\n      <button mat-button class=\"nav-item main\" (click)=\"toggleState()\">\r\n        <mat-icon class=\"nav-item-icon\">menu</mat-icon>\r\n        &nbsp;\r\n      </button>\r\n    </li>\r\n    <!-- main menu --->\r\n    <li *ngFor=\"let item of navItems\" (mouseenter)=\"onEnterMainItem(item)\">\r\n      <button mat-button class=\"nav-item main\" [class.active]=\"item.id === activeMainItem\"\r\n        [class.highlight]=\"item.id === highlightedMainItem\"\r\n        (click)=\"setActivePage(item.id, undefined, item.href)\">\r\n        <mat-icon class=\"nav-item-icon\">{{ item.matIcon }}</mat-icon>\r\n        {{ item.name }}\r\n        <mat-icon class=\"nav-item-submenu-indicator\" *ngIf=\"item.menu\">chevron_right</mat-icon>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n  <!-- 2nd level menu -->\r\n  <ul class=\"leftnav-sub\" [class.open]=\"subPanelOpen\">\r\n    <li *ngFor=\"let item of navItems\">\r\n      <ul *ngIf=\"item.menu\" class=\"submenu\" [class.active]=\"activeMainItem === item.id\">\r\n        <li class=\"subnav-header\"><h5>{{ item.name }}</h5></li>\r\n        <li *ngFor=\"let subitem of item.menu\">\r\n          <button mat-button class=\"nav-item sub\" [class.highlight]=\"subitem.id === highlightedSubMenuItem\"\r\n            (click)=\"setActivePage(item.id, subitem.id, subitem.href)\">{{ subitem.name }}\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n", styles: ["ul{list-style-type:none;margin:0;padding:0}.leftnav-main{box-shadow:2px 0 2px #0000003d;box-sizing:border-box;overflow:hidden;position:absolute;top:0;bottom:0;height:100%;z-index:2}.leftnav-sub{width:0;box-shadow:2px 0 2px #0000003d;position:absolute;top:0;bottom:0;left:60px;transition:width .3s;overflow-y:auto;overflow-x:hidden;z-index:2}.leftnav-sub.open{width:220px;border-left:1px solid #292b31;transition:width .7s}.nav-item{width:100%;position:relative;text-transform:none;line-height:50px;height:50px;color:#fff;text-align:left;font-size:13px;font-weight:400;letter-spacing:.1em;border-bottom:1px solid #292B31;border-radius:0}.nav-item.main{padding:0 54px 0 60px}.nav-item.sub{padding:0 10px;overflow:hidden;text-overflow:ellipsis}.nav-item.sub.highlight{box-shadow:none}.nav-item-icon{position:absolute;left:17px;line-height:50px;height:50px;font-size:18px}.nav-item-submenu-indicator{position:absolute;right:17px;line-height:50px;height:50px;font-size:18px}.subnav-header{color:#fff;height:70px;padding:25px 0 0 10px;overflow:hidden;white-space:nowrap;border-bottom:1px solid #292b31;box-sizing:border-box}.subnav-header h5{font-weight:300;font-size:13px;letter-spacing:.05em;margin:10px 0;text-transform:uppercase;text-overflow:ellipsis}.submenu{display:none}.submenu.active{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MuiLeftnavService }, { type: i2.Router, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { apiUrl: [{
                type: Input
            }], subNavSwitchDelay: [{
                type: Input
            }], navExpanded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLWxlZnRuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2xlZnRuYXYvbXVpLWxlZnRuYXYuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2xlZnRuYXYvbXVpLWxlZnRuYXYuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztBQUcxRDs7O0dBR0c7QUFtQkgsTUFBTSxPQUFPLG1CQUFtQjtJQStCOUIsWUFBb0IsY0FBaUMsRUFBc0IsTUFBYztRQUFyRSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFBc0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXhCaEYsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1FBRWpDOztXQUVHO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBR3BELGlCQUFZLEdBQTZCLFdBQVcsQ0FBQztRQUNyRCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQiwrQ0FBK0M7UUFDL0MsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFJcEIsd0JBQW1CLEdBQUcs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Tzs2QkFDZixDQUFDLENBQUM7NEJBQ0gsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDbkQsQ0FBQztxQkFDSDs7MEJBaUN1RCxRQUFROzRDQXpCdkQsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFLSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPcHRpb25hbCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE11aUxlZnRuYXZTZXJ2aWNlIH0gZnJvbSAnLi9tdWktbGVmdG5hdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGVmdG5hdkl0ZW0gfSBmcm9tICcuL2xlZnRuYXYuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHdoaWNoIGhhbmRsZXMgdGhlIGxlZnQtc2lkZSBuYXZpZ2F0aW9uIG1lbnVcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLWxlZnRuYXYnLFxyXG4gIGV4cG9ydEFzOiAnbXVpTGVmdG5hdicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1sZWZ0bmF2LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWktbGVmdG5hdi5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW011aUxlZnRuYXZTZXJ2aWNlXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdtYWluTmF2U3RhdGUnLCBbXHJcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7XHJcbiAgICAgICAgd2lkdGg6ICc2MHB4J1xyXG4gICAgICB9KSksXHJcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHtcclxuICAgICAgICB3aWR0aDogJzI4MHB4J1xyXG4gICAgICB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2NvbGxhcHNlZCA8PT4gZXhwYW5kZWQnLCBhbmltYXRlKDIwMCkpXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE11aUxlZnRuYXZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBVcmwgb2YgdGhlIGNlcCBBUEkgZW5kcG9pbnQgZm9yIGxlZnQgbmF2aWdhdGlvbi5cclxuICAgKiBTaG91bGQgYmUgZ2l2ZW4gYXMgZnVsbCBhYnNvbHV0ZSB1cmwgaW5jbHVkaW5nIHNlc3Npb25JZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBhcGlVcmw6IHN0cmluZztcclxuICBASW5wdXQoKSBzdWJOYXZTd2l0Y2hEZWxheSA9IDUwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogT3V0cHV0IGV2ZW50IHdoaWNoIGVtaXRzIHdoZW4gdGhlIGxlZnQgbmF2IHBhbmVsIGV4YXBuZHMgb3IgY29sbGFwc2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG5hdkV4cGFuZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBuYXZJdGVtczogTGVmdG5hdkl0ZW1bXTtcclxuICBtYWluTmF2U3RhdGU6ICdleHBhbmRlZCcgfCAnY29sbGFwc2VkJyA9ICdjb2xsYXBzZWQnO1xyXG4gIHN1YlBhbmVsT3BlbiA9IGZhbHNlO1xyXG5cclxuICAvLyB0aGUgY3VycmVudGx5IGFjdGl2ZSBtYWluIGl0ZW0gKGhvdmVyIHN0YXRlKVxyXG4gIGFjdGl2ZU1haW5JdGVtID0gJyc7XHJcblxyXG4gIC8vIHRoZSBjdXJyZW50bHkgaGlnaGxpZ2h0ZWQgaXRlbXMgKGJhc2VkIG9uIGN1cnJlbnQgdmlldyAvIHBhZ2UpXHJcbiAgaGlnaGxpZ2h0ZWRTdWJNZW51SXRlbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gIGhpZ2hsaWdodGVkTWFpbkl0ZW0gPSAnJztcclxuXHJcbiAgbmF2TW91c2VFdmVudHMgPSBuZXcgU3ViamVjdDx7IGV2ZW50OiAnZW50ZXInIHwgJ2xlYXZlJywgaXRlbT86IExlZnRuYXZJdGVtIH0+KCk7XHJcbiAgcmVhZG9ubHkgbWVudUxhYmVsID0ge1xyXG4gICAgaWQ6ICdtbS1tZW51JyxcclxuICAgIG5hbWU6ICdNZW51J1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGVmdE5hdlNlcnZpY2U6IE11aUxlZnRuYXZTZXJ2aWNlLCBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFwaVVybCkge1xyXG4gICAgICB0aGlzLmxlZnROYXZTZXJ2aWNlLmdldE5hdmlnYXRpb25JdGVtcyh0aGlzLmFwaVVybCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMubmF2SXRlbXMgPSBkYXRhLm1haW5OYXY7XHJcbiAgICAgICAgdGhpcy5sb2FkU2F2ZWRBY3RpdmVOYXZJdGVtcygpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignTXVpTGVmdG5hdkNvbnBvbmVudDogTm8gdmFsdWUgc2V0IGZvciBbYXBpVXJsXS4gTm8gbmF2IGl0ZW1zIHdpbGwgYmUgZ2VuZXJhdGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubmF2TW91c2VFdmVudHMucGlwZShkZWJvdW5jZVRpbWUodGhpcy5zdWJOYXZTd2l0Y2hEZWxheSkpLnN1YnNjcmliZShlID0+IHRoaXMub25OYXZNb3VzZUV2ZW50KGUpKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVN0YXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYWluTmF2U3RhdGUgPSB0aGlzLm1haW5OYXZTdGF0ZSA9PT0gJ2NvbGxhcHNlZCcgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCc7XHJcbiAgICB0aGlzLm5hdkV4cGFuZGVkLmVtaXQodGhpcy5tYWluTmF2U3RhdGUgPT09ICdleHBhbmRlZCcpO1xyXG4gIH1cclxuXHJcbiAgb25FbnRlck1haW5JdGVtKGl0ZW06IExlZnRuYXZJdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLm5hdk1vdXNlRXZlbnRzLm5leHQoeyBldmVudDogJ2VudGVyJywgaXRlbSB9KTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VMZWF2ZU5hdigpOiB2b2lkIHtcclxuICAgIHRoaXMubmF2TW91c2VFdmVudHMubmV4dCh7ZXZlbnQ6ICdsZWF2ZSd9KTtcclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZVBhZ2Uoc2VjdGlvbklkOiBzdHJpbmcsIHBhZ2VJZD86IHN0cmluZywgaHJlZj86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgYWN0aXZlUGFnZSA9IHtcclxuICAgICAgc2VjdGlvbjogc2VjdGlvbklkLFxyXG4gICAgICBwYWdlOiBwYWdlSWQgPyBwYWdlSWQgOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGVmdE5hdlNlcnZpY2Uuc2F2ZUFjdGl2ZU5hdkl0ZW1zKGFjdGl2ZVBhZ2UpO1xyXG5cclxuICAgIGlmIChocmVmKSB7XHJcbiAgICAgIC8vIHRyeSB0byBoYW5kbGUgcmVsYXRpdmUgbGlua3MgdXNpbmcgdGhlIHJvdXRlclxyXG4gICAgICAvLyB1c2UgbG9jYXRpb24gYXNzaWdubWVudCBmb3IgYWJzb2x1dGUgdXJscyBvciB3aGVuIG5vIHJvdXRlciBpcyBhdmFpbGFibGVcclxuICAgICAgaWYgKGhyZWYubWF0Y2goL2h0dHBzPzpcXC9cXC8vKSB8fCAhdGhpcy5yb3V0ZXIpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKGhyZWYpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtocmVmXSk7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZE1haW5JdGVtID0gc2VjdGlvbklkO1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRTdWJNZW51SXRlbSA9IHBhZ2VJZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgb25OYXZNb3VzZUV2ZW50KGU6IHsgZXZlbnQ6ICdlbnRlcicgfCAnbGVhdmUnLCBpdGVtPzogTGVmdG5hdkl0ZW0gfSk6IHZvaWQge1xyXG4gICAgaWYgKGUuZXZlbnQgPT09ICdlbnRlcicgJiYgZS5pdGVtKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlTWFpbkl0ZW0gPSBlLml0ZW0uaWQ7XHJcbiAgICAgIHRoaXMuc3ViUGFuZWxPcGVuID0gdHlwZW9mIGUuaXRlbS5tZW51ID09PSAnb2JqZWN0JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3ViUGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWN0aXZlTWFpbkl0ZW0gPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFNhdmVkQWN0aXZlTmF2SXRlbXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjZXBOYXZBY3RpdmUgPSB0aGlzLmxlZnROYXZTZXJ2aWNlLmxvYWRTYXZlZEFjdGl2ZU5hdkl0ZW1zKCk7XHJcblxyXG4gICAgLy8gbG9vayBmb3Igc2F2ZWQgZW50cmllcyBmcm9tIHNlc3N0aW9uIHN0b3JhZ2VcclxuICAgIGlmIChjZXBOYXZBY3RpdmUgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IHRoaXMubmF2SXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGNlcE5hdkFjdGl2ZS5zZWN0aW9uKTtcclxuICAgICAgaWYgKGFjdGl2ZVNlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkTWFpbkl0ZW0gPSBhY3RpdmVTZWN0aW9uLmlkO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlU2VjdGlvbi5tZW51KSB7XHJcbiAgICAgICAgICBjb25zdCBhY3RpdmVQYWdlID0gYWN0aXZlU2VjdGlvbi5tZW51LmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBjZXBOYXZBY3RpdmUucGFnZSk7XHJcbiAgICAgICAgICBpZiAoYWN0aXZlUGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkU3ViTWVudUl0ZW0gPSBhY3RpdmVQYWdlLmlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGUgcm91dGVyIGlzIGNvbmZpZ3VyZWQsIGFkZGl0aW9uYWxseSBtYXRjaCBhZ2FpbnN0IHRoZSBjdXJyZW50IHVybCBhbmQgZmluZCBjb3JyZXNwb25kaW5nIGl0ZW1zIHRvIGhpZ2hsaWdodFxyXG4gICAgLy8gdGhpcyB3aWxsIGdpdmUgY29ycmVjdCBoaWdobGlnaHQgaW4gY2FzZSBvZiBtYW51YWwgZW50ZXJlZCB1cmxzIG9yIGJvb2ttYXJrc1xyXG4gICAgaWYgKHRoaXMucm91dGVyKSB7XHJcbiAgICAgIHRoaXMubmF2SXRlbXMuZmluZChpdGVtID0+IHtcclxuICAgICAgICBpZiAoaXRlbS5ocmVmID09PSB0aGlzLnJvdXRlci51cmwpIHtcclxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYWluSXRlbSA9IGl0ZW0uaWQ7XHJcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkU3ViTWVudUl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubWVudSkge1xyXG4gICAgICAgICAgY29uc3Qgc3ViSXRlbSA9IGl0ZW0ubWVudS5maW5kKHN1Yml0ZW0gPT4gc3ViaXRlbS5ocmVmID09PSB0aGlzLnJvdXRlci51cmwpO1xyXG4gICAgICAgICAgaWYgKHN1Ykl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZFN1Yk1lbnVJdGVtID0gc3ViSXRlbS5pZDtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZE1haW5JdGVtID0gaXRlbS5pZDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbn1cclxuIiwiPG5hdiBjbGFzcz1cImxlZnRuYXYtY29udGFpbmVyXCIgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlTmF2KClcIj5cclxuICA8dWwgY2xhc3M9XCJsZWZ0bmF2LW1haW5cIiBbQG1haW5OYXZTdGF0ZV09XCJtYWluTmF2U3RhdGVcIj5cclxuICAgIDxsaT5cclxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwibmF2LWl0ZW0gbWFpblwiIChjbGljayk9XCJ0b2dnbGVTdGF0ZSgpXCI+XHJcbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibmF2LWl0ZW0taWNvblwiPm1lbnU8L21hdC1pY29uPlxyXG4gICAgICAgICZuYnNwO1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcbiAgICA8IS0tIG1haW4gbWVudSAtLS0+XHJcbiAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbmF2SXRlbXNcIiAobW91c2VlbnRlcik9XCJvbkVudGVyTWFpbkl0ZW0oaXRlbSlcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwibmF2LWl0ZW0gbWFpblwiIFtjbGFzcy5hY3RpdmVdPVwiaXRlbS5pZCA9PT0gYWN0aXZlTWFpbkl0ZW1cIlxyXG4gICAgICAgIFtjbGFzcy5oaWdobGlnaHRdPVwiaXRlbS5pZCA9PT0gaGlnaGxpZ2h0ZWRNYWluSXRlbVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInNldEFjdGl2ZVBhZ2UoaXRlbS5pZCwgdW5kZWZpbmVkLCBpdGVtLmhyZWYpXCI+XHJcbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibmF2LWl0ZW0taWNvblwiPnt7IGl0ZW0ubWF0SWNvbiB9fTwvbWF0LWljb24+XHJcbiAgICAgICAge3sgaXRlbS5uYW1lIH19XHJcbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibmF2LWl0ZW0tc3VibWVudS1pbmRpY2F0b3JcIiAqbmdJZj1cIml0ZW0ubWVudVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcbiAgPC91bD5cclxuICA8IS0tIDJuZCBsZXZlbCBtZW51IC0tPlxyXG4gIDx1bCBjbGFzcz1cImxlZnRuYXYtc3ViXCIgW2NsYXNzLm9wZW5dPVwic3ViUGFuZWxPcGVuXCI+XHJcbiAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbmF2SXRlbXNcIj5cclxuICAgICAgPHVsICpuZ0lmPVwiaXRlbS5tZW51XCIgY2xhc3M9XCJzdWJtZW51XCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVNYWluSXRlbSA9PT0gaXRlbS5pZFwiPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInN1Ym5hdi1oZWFkZXJcIj48aDU+e3sgaXRlbS5uYW1lIH19PC9oNT48L2xpPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgc3ViaXRlbSBvZiBpdGVtLm1lbnVcIj5cclxuICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjbGFzcz1cIm5hdi1pdGVtIHN1YlwiIFtjbGFzcy5oaWdobGlnaHRdPVwic3ViaXRlbS5pZCA9PT0gaGlnaGxpZ2h0ZWRTdWJNZW51SXRlbVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRBY3RpdmVQYWdlKGl0ZW0uaWQsIHN1Yml0ZW0uaWQsIHN1Yml0ZW0uaHJlZilcIj57eyBzdWJpdGVtLm5hbWUgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2xpPlxyXG4gIDwvdWw+XHJcbjwvbmF2PlxyXG4iXX0=