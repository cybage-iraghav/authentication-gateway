import { NavItem } from '../../core/models/navigation';
import * as i0 from "@angular/core";
export declare class SearchComponent {
    navItem: NavItem;
    isSearchOpen: boolean;
    onSearchTermEntered(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchComponent, "mui-search", never, { "navItem": "navItem"; }, {}, never, never, false, never>;
}
