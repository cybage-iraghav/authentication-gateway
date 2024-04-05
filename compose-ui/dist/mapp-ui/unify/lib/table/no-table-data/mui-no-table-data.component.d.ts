import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Small component to display illustration and message inside of overview tables when there is no data available to
 * display. Should be used inside a table row equipped with *matNoDataRow directive and cell with full colspan.
 * Specify the message to be displayed as the component body.
 * If you want to override the default illustration, place a ng-template inside the component body which contains the
 * custom illustration you want to be displayed.
 */
export declare class MuiNoTableDataComponent {
    illustrationTemplate: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiNoTableDataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiNoTableDataComponent, "mui-no-table-data", never, {}, {}, ["illustrationTemplate"], ["*"], true, never>;
}
