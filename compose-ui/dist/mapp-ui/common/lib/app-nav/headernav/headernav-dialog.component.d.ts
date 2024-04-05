import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import type { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class HeadernavDialogComponent implements OnInit {
    data: any;
    private sanitizer;
    private http;
    private cd;
    contentSrc: SafeResourceUrl;
    htmlContent: SafeHtml;
    useIframe: boolean;
    constructor(data: any, sanitizer: DomSanitizer, http: HttpClient, cd: ChangeDetectorRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeadernavDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeadernavDialogComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
