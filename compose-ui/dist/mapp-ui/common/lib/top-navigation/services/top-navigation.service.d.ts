import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Navigation } from '../core/models/navigation';
import { TopNavigationCacheService } from './top-navigation-cache.service';
import * as i0 from "@angular/core";
export declare class TopNavigationService {
    private http;
    private cacheService;
    private helpTopicKeys$;
    private helpBaseUrl;
    private activeMenuIdChanges$;
    private serviceVersionInfos;
    constructor(http: HttpClient, cacheService: TopNavigationCacheService);
    /** Load navigation data from provided endpoint URL */
    loadNavigationData(apiUrl: string, disableCache: boolean, forceReload: boolean): Observable<Navigation>;
    /**
     * Provide a new topic key for context aware deep linking. It will be used the next time when help link is clicked
     * in the help menu.
     * @example
     * updateHelpLink('channels-inapp-list');
     * // resulting link: https://supportlink.mapp.com/redirect?label=Engage_channels-inapp-list&language=en
     * @param topicId the new topic id to use when help link is clicked.
     * Will be prefixed with 'Engage_' in the resulting link
     */
    updateHelpLink(topicId: string): void;
    /**
     * Retrieve an updated online help link based on the original one and the current value from the help topics stream.
     * @param helpLink URL for the original help link
     * @exception Fails with TypeError when provided string cannot be parsed as URL
     */
    getUpdatedHelpLink(helpLink: string): string;
    /**
     * Get the current help url based on nav data base url and current state based on calls to 'updateHelpLink'.
     * Only works once nav data has been loaded, error thrown otherwise.
     */
    getCurrentHelpUrl(): string;
    /** Send a request to backend to change the desired UI language */
    changeUILanguage(url: string): void;
    /**
     * An Observable which emits the id of the currently active main navigation section.
     * Changes when user navigates to a new page.
     */
    get activeMenuIdChanges(): Observable<string>;
    /** Return the ID of the active menu section based on the current view */
    get activeNavMenuId(): string;
    /** Update the active top nav menu Id. Should be called when navigating to a new page. */
    set activeNavMenuId(menuId: string);
    /**
     * Add info about your service to the "About Engage" dialog. Entries will be added at the bottom of the dialog,
     * after the main content retrieved from aboutEcm.jsp
     * @param info new entry to be added. Needs to be a plain string.
     */
    addServiceVersionInfo(info: string): void;
    /**
     * Retrieve current value for service versions which have been added so far.
     */
    getServiceVersionInfos(): string[];
    /**
     * Extract the help url and make it available to getCurrentHelpUrl.
     * Needed by some Engage legacy use cases.
     */
    private initHelpLink;
    /**
     * Try to find the top navigation section which is currently "active".
     * Based on matching the current window url against all navigation links retrieved from API.
     */
    private initActiveMenuSection;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TopNavigationService>;
}
