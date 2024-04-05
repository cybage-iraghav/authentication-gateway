import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeftnavResponse } from './leftnav.interfaces';
import * as i0 from "@angular/core";
export declare class MuiLeftnavService {
    private http;
    readonly sessionStorageKey = "cepLeftnavActive";
    constructor(http: HttpClient);
    getNavigationItems(apiUrl: string): Observable<LeftnavResponse>;
    loadSavedActiveNavItems(): {
        section: string;
        page: string;
    } | null;
    saveActiveNavItems(activeItem: {
        section: string;
        page: string | null;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiLeftnavService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MuiLeftnavService>;
}
