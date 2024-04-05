import * as i0 from "@angular/core";
/**
 * Component for header section above an overview table. Supports injecting content for the following 4 sections
 * defined by attribute selectors:
 * * [pageHeaderTitle]: the main title
 * * [pageHeaderSubtitle]: subtitle text - should usually not be longer than 2 lines
 * * [pageHeaderActions]: Main action button(s) which are displayed on the right side
 * * [pageHeaderActionsInfo]: Additional info below the action buttons
 */
export declare class MuiOverviewPageHeaderComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiOverviewPageHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiOverviewPageHeaderComponent, "mui-overview-page-header", never, {}, {}, never, ["span[pageHeaderTitle]", "mui-icon", "span[pageHeaderSubtitle]", "div[pageHeaderActions]", "span[pageHeaderActionsInfo]"], true, never>;
}
