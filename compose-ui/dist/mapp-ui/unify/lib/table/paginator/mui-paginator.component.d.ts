import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import * as i0 from "@angular/core";
declare const PaginatorMixinBase: (new (...args: any[]) => import("@angular/material/core").HasInitialized) & {
    new (): {};
};
/**
 * Paginator component to use with MatTable and MatTableDataSource.
 */
export declare class MuiPaginatorComponent extends PaginatorMixinBase implements MatTableDataSourcePaginator, OnInit {
    private changeDetectorRef;
    readonly numberOfPageLinks = 5;
    pageRanges: number[][];
    currentPageRangeIdx: number;
    /** Options for selectable page sizes. When not set, no select control will be displayed in the paginator. */
    pageSizeOptions: number[];
    /** Event emitted when the paginator changes the page size or page index. */
    readonly page: EventEmitter<PageEvent>;
    private _length;
    private _pageSize;
    private _pageIndex;
    private _disabled;
    constructor(changeDetectorRef: ChangeDetectorRef);
    /** Total length of the paginated data set. Usually set by MatTableDataSource. */
    get length(): number;
    set length(value: NumberInput);
    /** Page size to use, defaults to 10 */
    get pageSize(): number;
    set pageSize(value: NumberInput);
    /** Current page index, zero based */
    get pageIndex(): number;
    set pageIndex(value: NumberInput);
    /** If a MatTableDataSource is provided via this input, the paginator will register itself to the data source. */
    set tableDataSource(ds: MatTableDataSource<any>);
    /** Disable all paginator controls */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    ngOnInit(): void;
    /** Navigate to a specific page by index (zero based) */
    goToPage(pageIndex: number): void;
    /** Navigate to the next page */
    nextPage(): void;
    /** Navigate to the previous page */
    previousPage(): void;
    /** Navigate to the first page */
    firstPage(): void;
    /** Navigate to the last page */
    lastPage(): void;
    /** Calculate the number of pages */
    getNumberOfPages(): number;
    _hasNextPage(): boolean;
    _hasPreviousPage(): boolean;
    /** Change page size and update current page to include previous page's first item */
    _changePageSize(pageSize: number): void;
    private updatePageRanges;
    private emitPageEvent;
    private updateDisplayedPageRangeIdx;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiPaginatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiPaginatorComponent, "mui-paginator", never, { "pageSizeOptions": "pageSizeOptions"; "length": "length"; "pageSize": "pageSize"; "pageIndex": "pageIndex"; "tableDataSource": "tableDataSource"; "disabled": "disabled"; }, { "page": "page"; }, never, never, true, never>;
}
export {};
