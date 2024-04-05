import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * Dialog component which handles the "About" dialog as well as the "Account Settings"
 */
export declare class TopNavDialogComponent implements OnInit {
    data: any;
    private sanitizer;
    private http;
    private cd;
    hostClass: string;
    htmlContent: SafeHtml;
    constructor(data: any, sanitizer: DomSanitizer, http: HttpClient, cd: ChangeDetectorRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopNavDialogComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
