import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatSort, MatSortable, SortDirection } from '@angular/material/sort';
import * as i0 from "@angular/core";
interface MatSortHeaderColumnDef {
    name: string;
}
/**
 * Component for creating a sorting header in a table column.
 * Needs to be used together with MatTable and MatSort.
 */
export declare class MuiSortHeaderComponent implements MatSortable, OnDestroy, OnInit {
    private cdr;
    private _sort;
    _columnDef: MatSortHeaderColumnDef;
    readonly hostClassName = "mui-sort-header";
    /** The direction the arrow should be facing according to the current state. */
    _arrowDirection: SortDirection;
    /**
     * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
     * the column's name.
     */
    id: string;
    /** Overrides the sort start value of the containing MatSort for this MatSortable. */
    start: SortDirection;
    /** ID for the icon to be displayed */
    _sortIcon: 'caret_up_down' | 'caret-up' | 'caret-down';
    private _disableClear;
    private _disabled;
    private _updateSubscription;
    constructor(cdr: ChangeDetectorRef, _sort: MatSort, _columnDef: MatSortHeaderColumnDef);
    /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
    get disableClear(): boolean;
    set disableClear(v: BooleanInput);
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    ngOnInit(): void;
    ngOnDestroy(): void;
    _isDisabled(): boolean;
    _handleClick(): void;
    private _updateArrowDirection;
    /** Whether this MuiSortHeader is currently sorted in either ascending or descending order. */
    private _isSorted;
    private _handleStateChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiSortHeaderComponent, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiSortHeaderComponent, "mui-sort-header", ["muiSortHeader"], { "id": "mui-sort-header"; "start": "start"; "disableClear": "disableClear"; "disabled": "disabled"; }, {}, never, ["*"], true, never>;
}
export {};
