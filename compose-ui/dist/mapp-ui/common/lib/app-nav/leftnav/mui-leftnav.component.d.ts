import { EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MuiLeftnavService } from './mui-leftnav.service';
import { LeftnavItem } from './leftnav.interfaces';
import * as i0 from "@angular/core";
/**
 * Component which handles the left-side navigation menu
 * @deprecated
 */
export declare class MuiLeftnavComponent implements OnInit {
    private leftNavService;
    private router;
    /**
     * Url of the cep API endpoint for left navigation.
     * Should be given as full absolute url including sessionId.
     */
    apiUrl: string;
    subNavSwitchDelay: number;
    /**
     * Output event which emits when the left nav panel exapnds or collapses
     */
    navExpanded: EventEmitter<boolean>;
    navItems: LeftnavItem[];
    mainNavState: 'expanded' | 'collapsed';
    subPanelOpen: boolean;
    activeMainItem: string;
    highlightedSubMenuItem: string | undefined;
    highlightedMainItem: string;
    navMouseEvents: Subject<{
        event: 'enter' | 'leave';
        item?: LeftnavItem | undefined;
    }>;
    readonly menuLabel: {
        id: string;
        name: string;
    };
    constructor(leftNavService: MuiLeftnavService, router: Router);
    ngOnInit(): void;
    toggleState(): void;
    onEnterMainItem(item: LeftnavItem): void;
    onMouseLeaveNav(): void;
    setActivePage(sectionId: string, pageId?: string, href?: string): void;
    private onNavMouseEvent;
    private loadSavedActiveNavItems;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiLeftnavComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiLeftnavComponent, "mui-leftnav", ["muiLeftnav"], { "apiUrl": "apiUrl"; "subNavSwitchDelay": "subNavSwitchDelay"; }, { "navExpanded": "navExpanded"; }, never, never, false, never>;
}
