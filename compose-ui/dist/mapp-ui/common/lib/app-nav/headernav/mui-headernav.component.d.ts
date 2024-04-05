import { EventEmitter, SimpleChanges } from '@angular/core';
import type { OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from '@mapp-ui/notification-center';
import type { NotificationCenterComponent } from '@mapp-ui/notification-center';
import { MuiHeadernavService } from './mui-headernav.service';
import * as i0 from "@angular/core";
/**
 * Component which handles the navigation in the app header
 * @deprecated
 */
export declare class MuiHeadernavComponent implements OnInit, OnChanges {
    private headernavService;
    private dialog;
    private notificationService;
    /**
     * Url of the cep API endpoint for header navigation.
     * Should be given as full absolute url including sessionId.
     */
    apiUrl: string;
    /**
     * Flag to control the behavior when one of the items in the language menu is clicked.
     * If false (default), the language link will be executed, redirecting to CEP start page and activating new language.
     * If true, the language link will not be followed. Instead output event languageChanged will be fired.
     * see languageChanged
     */
    handleLanguageChange: boolean;
    /**
     * Provide reference to the NotificationCenterComponent, by template variable.
     * This is required in order to have integration with Notification Center working.
     */
    notificationCenter: NotificationCenterComponent;
    /**
     * Control flag for the session timer.
     * If false (default), timer will only be refreshed when component initializes (i.e. page reload)
     * If true, user clicks will be monitored and used to reset the timer at certain intervals.
     */
    trackClicks: boolean;
    /**
     * Specify topic key for context aware help. This will be appended to the help link offered in the help (?) menu.
     */
    helpTopicId: string;
    /**
     * Output event which emits when a new language has been selected in the language picker menu and
     * handleLanguageChange is enabled.
     * Emits the locale string as payload.
     * see handleLanguageChange
     */
    languageChanged: EventEmitter<string>;
    navItems: any[];
    searchFieldHidden: boolean;
    notificationCount: Observable<number>;
    notificationBadgeHidden: Observable<boolean>;
    notificationCenterEnabled: boolean;
    private helpLinkChanges;
    private initialized$;
    constructor(headernavService: MuiHeadernavService, dialog: MatDialog, notificationService: NotificationService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    menuItemClicked($event: Event, item: any): void;
    toggleNotificationPanel(): void;
    onSearchTermEntered(searchTerm: string, searchUrl: string): void;
    /**
     * Updates the help link to point to a new help topic
     * @param helpKey The new help key to assign to the link
     */
    updateHelpLink(helpKey: string): void;
    private onHelpLinkChanges;
    private createModal;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiHeadernavComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiHeadernavComponent, "mui-headernav", ["muiHeaderNav"], { "apiUrl": "apiUrl"; "handleLanguageChange": "handleLanguageChange"; "notificationCenter": "notificationCenter"; "trackClicks": "trackClicks"; "helpTopicId": "helpTopicId"; }, { "languageChanged": "languageChanged"; }, never, never, false, never>;
}
