import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavItem } from '../../core/models/navigation';
import { TopNavigationService } from '../../services/top-navigation.service';
import * as i0 from "@angular/core";
export declare class TopNavMenuComponent implements OnInit {
    private dialog;
    private service;
    private document;
    private router;
    hostClassName: string;
    navItem: NavItem;
    isHighlightedMenu: Observable<boolean>;
    isActiveMenu: boolean;
    private readonly baseHref;
    constructor(dialog: MatDialog, service: TopNavigationService, document: Document, router: Router);
    onItemClicked(menuItem: NavItem, event: MouseEvent): void;
    onMenuOpened(): void;
    onMenuClosed(): void;
    onSubMenuClosed(): void;
    ngOnInit(): void;
    /**
     * Navigate to a different view in Engage.
     * Navigation target and methodology is resolved by following logic:
     * 1. If target link has same base href as the document, strip it from the link to have path only
     * 2. If target link had no match for base href, or no router available, set location to target link
     * 3. Try to use the Angular router to navigate to the url (fragment)
     * 4. If router navigation failed, assign location
     */
    private navigateTo;
    private openDialog;
    private openHelpLink;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopNavMenuComponent, "mui-top-nav-menu", never, { "navItem": "navItem"; }, {}, never, never, false, never>;
}
