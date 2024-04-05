import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MuiHeadernavService {
    private http;
    constructor(http: HttpClient);
    getNavigationItems(apiUrl: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiHeadernavService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MuiHeadernavService>;
}
