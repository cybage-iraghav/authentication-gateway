import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { NavItem } from '../../core/models/navigation';
import { SessionTimerService } from '../../services/session-timer.service';
import { TopNavigationService } from '../../services/top-navigation.service';
import * as i0 from "@angular/core";
export declare class ProfileMenuComponent implements OnInit {
    private dialog;
    private timerService;
    private topNavService;
    navItem: NavItem;
    isActiveMenu: boolean;
    userInitials: string;
    isTimeoutActive$: Observable<boolean>;
    constructor(dialog: MatDialog, timerService: SessionTimerService, topNavService: TopNavigationService);
    ngOnInit(): void;
    onMenuOpened(): void;
    onMenuClosed(): void;
    onItemClicked(menuItem: NavItem): void;
    onLangMenuClicked(menuItem: NavItem): void;
    onSubMenuClosed(): void;
    toggleSessionTimer($event: MatSlideToggleChange): void;
    private openAccountDialog;
    private handleGenericClick;
    private setUserInitials;
    private initSessionTimer;
    private prepareLanguageMenu;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProfileMenuComponent, "mui-profile-menu", never, { "navItem": "navItem"; }, {}, never, never, false, never>;
}
