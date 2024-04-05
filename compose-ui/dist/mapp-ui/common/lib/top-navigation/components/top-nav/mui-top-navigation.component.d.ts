import { ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NotificationCenterComponent } from '@mapp-ui/notification-center';
import { Observable } from 'rxjs';
import { Navigation } from '../../core/models/navigation';
import { TopNavigationService } from '../../services/top-navigation.service';
import * as i0 from "@angular/core";
/**
 * This component creates a top navigation bar with main and aux nav section.
 * Data for the navigation structure to use is loaded from the provided endpoint url.
 */
export declare class MuiTopNavigationComponent implements OnInit, OnDestroy {
    private service;
    private ruler;
    private elementRef;
    private cd;
    hostClassName: string;
    /** URL for the API endpoint where navigation data should be loaded from */
    apiUrl: string;
    /** Template reference for Notification Center component */
    notificationCenter: NotificationCenterComponent;
    /**
     * Disable pagination functionality if needed. Enabled by default.
     */
    disablePagination: false;
    /**
     * Navigation component caches its data by default for better performance.
     * The cache can be disabled by setting this property to true.
     */
    disableCache: boolean;
    navItemsContainer: ElementRef<HTMLElement>;
    navData$: Observable<Navigation>;
    /** controls visibility of the pagination controls */
    showPaginationControls: boolean;
    /** disabled state for paginator on the left side */
    disableScrollBefore: boolean;
    /** disabled state for paginator on the right side */
    disableScrollAfter: boolean;
    ghostList: number[];
    private destroyed$;
    private _scrollPosition;
    constructor(service: TopNavigationService, ruler: ViewportRuler, elementRef: ElementRef<HTMLElement>, cd: ChangeDetectorRef);
    get scrollPosition(): number;
    set scrollPosition(value: number);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** click handler for the pagination controls in the template */
    onPaginatorClicked(direction: string): void;
    private initResizeMonitor;
    /** Main update call which bundles all necessary operations regarding scrolling */
    private updatePagination;
    /** check if pagination controls should be visible */
    private checkPaginationEnabled;
    /**
     * Update scrolling position to given value. Constrained by container boundaries.
     * @param position new scrolling position to set.
     */
    private scrollTo;
    /** Scroll the menu in either left or right direction */
    private scrollMenu;
    /** Check if left or right scrolling control should be disabled based on the current scrolling position */
    private checkScrollingControls;
    /** Calculate maximum scroll distance based on container size of the nav menu items */
    private getMaxScrollDistance;
    /** Performs the actual scrolling based on currently set scroll position */
    private updateScrollPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiTopNavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiTopNavigationComponent, "mui-top-navigation", ["muiTopNavigation"], { "apiUrl": "apiUrl"; "notificationCenter": "notificationCenter"; "disablePagination": "disablePagination"; "disableCache": "disableCache"; }, {}, never, never, false, never>;
}
