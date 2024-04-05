import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This directive can be placed on a table row which should be expandable to reveal additional details.
 * It handles necessary class assignments as well as adding a click handler on the row which will notify
 * by output event when the row is expanded or collapsed.
 */
export declare class MuiExpandableRowDirective {
    readonly hostClassName = "mui-expandable-row";
    /** Control if the row is currently in expanded (true) or collapsed state (false). */
    muiExpandableRow: boolean;
    /**
     * Emits the new target state when the expandable row is clicked.
     * true => row is expanded
     * false => row is collapsed
     */
    expandableRowToggled: EventEmitter<boolean>;
    get isExpanded(): boolean;
    onRowClicked(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiExpandableRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MuiExpandableRowDirective, "tr[muiExpandableRow]", never, { "muiExpandableRow": "muiExpandableRow"; }, { "expandableRowToggled": "expandableRowToggled"; }, never, never, true, never>;
}
