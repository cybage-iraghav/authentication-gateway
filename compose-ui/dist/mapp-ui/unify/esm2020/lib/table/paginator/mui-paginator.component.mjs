import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { mixinInitialized } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MuiIconModule } from '@mapp-ui/common';
import { MuiFormFieldModule } from '../../form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/select";
import * as i4 from "@angular/material/core";
import * as i5 from "@mapp-ui/common";
import * as i6 from "../../form-field/mui-form-field.component";
import * as i7 from "../../form-field/mui-label.directive";
/**
 * Fill an array with a range of numbers in ascending order.
 * @param size Size of the array to be generated
 * @param startAt Offset where the numbers should start
 */
function range(size, startAt = 0) {
    return [
        ...Array(size)
            .keys()
    ].map(i => i + startAt);
}
// create base class with required "HasInitialized" handling. use prepared mixin from material
const PaginatorMixinBase = mixinInitialized(class {
});
/**
 * Paginator component to use with MatTable and MatTableDataSource.
 */
export class MuiPaginatorComponent extends PaginatorMixinBase {
    constructor(changeDetectorRef) {
        super();
        this.changeDetectorRef = changeDetectorRef;
        this.numberOfPageLinks = 5;
        this.pageRanges = [];
        this.currentPageRangeIdx = 0;
        /** Event emitted when the paginator changes the page size or page index. */
        this.page = new EventEmitter();
        this._length = 0;
        this._pageSize = 10;
        this._pageIndex = 0;
        this._disabled = false;
    }
    /** Total length of the paginated data set. Usually set by MatTableDataSource. */
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = coerceNumberProperty(value);
        this.updatePageRanges();
        this.changeDetectorRef.markForCheck();
    }
    /** Page size to use, defaults to 10 */
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = Math.max(coerceNumberProperty(value), 0);
        this.updatePageRanges();
        this.updateDisplayedPageRangeIdx();
        this.changeDetectorRef.markForCheck();
    }
    /** Current page index, zero based */
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(value) {
        this._pageIndex = Math.max(coerceNumberProperty(value), 0);
        this.updateDisplayedPageRangeIdx();
        this.changeDetectorRef.markForCheck();
    }
    /** If a MatTableDataSource is provided via this input, the paginator will register itself to the data source. */
    set tableDataSource(ds) {
        ds.paginator = this;
    }
    /** Disable all paginator controls */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnInit() {
        this._markInitialized();
    }
    /** Navigate to a specific page by index (zero based) */
    goToPage(pageIndex) {
        if (!this.disabled && pageIndex > -1 && pageIndex < this.getNumberOfPages()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = pageIndex;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the next page */
    nextPage() {
        if (this._hasNextPage()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = this.pageIndex + 1;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the previous page */
    previousPage() {
        if (this._hasPreviousPage()) {
            const previousPageIdx = this.pageIndex;
            this.pageIndex = this.pageIndex - 1;
            this.emitPageEvent(previousPageIdx);
        }
    }
    /** Navigate to the first page */
    firstPage() {
        const previousPageIdx = this.pageIndex;
        this.pageIndex = 0;
        this.emitPageEvent(previousPageIdx);
    }
    /** Navigate to the last page */
    lastPage() {
        const previousPageIdx = this.pageIndex;
        this.pageIndex = this.getNumberOfPages() - 1;
        this.emitPageEvent(previousPageIdx);
    }
    /** Calculate the number of pages */
    getNumberOfPages() {
        if (!this.pageSize) {
            return 0;
        }
        return Math.ceil(this.length / this.pageSize);
    }
    _hasNextPage() {
        const maxPageIndex = this.getNumberOfPages() - 1;
        return this.pageIndex < maxPageIndex && this.pageSize != 0;
    }
    _hasPreviousPage() {
        return this.pageIndex >= 1 && this.pageSize != 0;
    }
    /** Change page size and update current page to include previous page's first item */
    _changePageSize(pageSize) {
        const startIndex = this.pageIndex * this.pageSize;
        const previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this.emitPageEvent(previousPageIndex);
    }
    updatePageRanges() {
        const pages = this.getNumberOfPages();
        this.pageRanges = [];
        const size = Math.ceil(pages / this.numberOfPageLinks);
        const rest = pages % this.numberOfPageLinks;
        for (let i = 0; i < size; i++) {
            const currentRange = (i === size - 1 && rest > 0) ? rest : this.numberOfPageLinks;
            this.pageRanges.push(range(currentRange, i * this.numberOfPageLinks));
        }
    }
    emitPageEvent(previousPageIndex) {
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length,
            previousPageIndex
        });
    }
    updateDisplayedPageRangeIdx() {
        this.currentPageRangeIdx = Math.floor(this.pageIndex / this.numberOfPageLinks);
    }
}
MuiPaginatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPaginatorComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiPaginatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiPaginatorComponent, isStandalone: true, selector: "mui-paginator", inputs: { pageSizeOptions: "pageSizeOptions", length: "length", pageSize: "pageSize", pageIndex: "pageIndex", tableDataSource: "tableDataSource", disabled: "disabled" }, outputs: { page: "page" }, usesInheritance: true, ngImport: i0, template: "<div class=\"mui-paginator-container\">\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"firstPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>arrow-left-double</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"previousPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>chevron_left</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-page-links\"\r\n      [class.disabled]=\"disabled\">\r\n    <span *ngIf=\"currentPageRangeIdx > 0\"\r\n        class=\"mui-page-link dots\">...</span>\r\n    <span *ngFor=\"let i of pageRanges[currentPageRangeIdx]\"\r\n        class=\"mui-page-link\"\r\n        [class.current_page]=\"pageIndex === i\"\r\n        (click)=\"goToPage(i)\"\r\n    >{{ i + 1 }}</span>\r\n    <span *ngIf=\"currentPageRangeIdx < pageRanges.length - 1\"\r\n        class=\"mui-page-link dots\">...</span>\r\n  </div>\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"nextPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>chevron_right</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"lastPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>arrow-right-double</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"pageSizeOptions\"\r\n      class=\"mui-page-options\">\r\n    <mui-form-field fieldWidth=\"75px\">\r\n      <mui-label i18n=\"@@paginator_items\">Items per page</mui-label>\r\n      <mat-select [value]=\"pageSize\"\r\n          (selectionChange)=\"_changePageSize($event.value)\"\r\n          hideSingleSelectionIndicator\r\n          [disabled]=\"disabled\"\r\n      >\r\n        <mat-option *ngFor=\"let item of pageSizeOptions\"\r\n            [value]=\"item\"\r\n        >{{ item }}</mat-option>\r\n      </mat-select>\r\n    </mui-form-field>\r\n  </div>\r\n</div>\r\n", styles: [".mui-paginator-container{display:flex;align-items:center;padding:8px 24px}.mui-page-links{margin:0 20px}.mui-page-links .mui-page-link{padding-left:12px;padding-right:12px;text-decoration:underline;cursor:pointer}.mui-page-links .mui-page-link.current_page,.mui-page-links .dots{text-decoration:none;cursor:default}.mui-page-links.disabled .mui-page-link{cursor:default}.mui-paginator-button+.mui-paginator-button{margin-left:16px}.mui-page-options{margin-left:24px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i3.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i4.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i5.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }, { kind: "ngmodule", type: MuiFormFieldModule }, { kind: "component", type: i6.MuiFormFieldComponent, selector: "mui-form-field", inputs: ["labelPosition", "labelSize", "fieldWidth", "showOptionalMarker"], exportAs: ["muiFormField"] }, { kind: "directive", type: i7.MuiLabelDirective, selector: "mui-label" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-paginator', standalone: true, imports: [CommonModule, MatButtonModule, MatSelectModule, MuiIconModule, MuiFormFieldModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-paginator-container\">\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"firstPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>arrow-left-double</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"previousPage()\"\r\n        [disabled]=\"disabled || pageIndex === 0\"\r\n    >\r\n      <mui-icon>chevron_left</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-page-links\"\r\n      [class.disabled]=\"disabled\">\r\n    <span *ngIf=\"currentPageRangeIdx > 0\"\r\n        class=\"mui-page-link dots\">...</span>\r\n    <span *ngFor=\"let i of pageRanges[currentPageRangeIdx]\"\r\n        class=\"mui-page-link\"\r\n        [class.current_page]=\"pageIndex === i\"\r\n        (click)=\"goToPage(i)\"\r\n    >{{ i + 1 }}</span>\r\n    <span *ngIf=\"currentPageRangeIdx < pageRanges.length - 1\"\r\n        class=\"mui-page-link dots\">...</span>\r\n  </div>\r\n  <div>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"nextPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>chevron_right</mui-icon>\r\n    </button>\r\n    <button mat-icon-button\r\n        type=\"button\"\r\n        class=\"mui-paginator-button mui-square-icon-button\"\r\n        (click)=\"lastPage()\"\r\n        [disabled]=\"disabled || !_hasNextPage()\"\r\n    >\r\n      <mui-icon>arrow-right-double</mui-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"pageSizeOptions\"\r\n      class=\"mui-page-options\">\r\n    <mui-form-field fieldWidth=\"75px\">\r\n      <mui-label i18n=\"@@paginator_items\">Items per page</mui-label>\r\n      <mat-select [value]=\"pageSize\"\r\n          (selectionChange)=\"_changePageSize($event.value)\"\r\n          hideSingleSelectionIndicator\r\n          [disabled]=\"disabled\"\r\n      >\r\n        <mat-option *ngFor=\"let item of pageSizeOptions\"\r\n            [value]=\"item\"\r\n        >{{ item }}</mat-option>\r\n      </mat-select>\r\n    </mui-form-field>\r\n  </div>\r\n</div>\r\n", styles: [".mui-paginator-container{display:flex;align-items:center;padding:8px 24px}.mui-page-links{margin:0 20px}.mui-page-links .mui-page-link{padding-left:12px;padding-right:12px;text-decoration:underline;cursor:pointer}.mui-page-links .mui-page-link.current_page,.mui-page-links .dots{text-decoration:none;cursor:default}.mui-page-links.disabled .mui-page-link{cursor:default}.mui-paginator-button+.mui-paginator-button{margin-left:16px}.mui-page-options{margin-left:24px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { pageSizeOptions: [{
                type: Input
            }], page: [{
                type: Output
            }], length: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], tableDataSource: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVpLXBhZ2luYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL3VuaWZ5L3NyYy9saWIvdGFibGUvcGFnaW5hdG9yL211aS1wYWdpbmF0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS91bmlmeS9zcmMvbGliL3RhYmxlL3BhZ2luYXRvci9tdWktcGFnaW5hdG9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsb0JBQW9CLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7OztBQUV0RDs7OztHQUlHO0FBQ0gsU0FBUyxLQUFLLENBQ1YsSUFBWSxFQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2IsT0FBTztRQUNMLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNULElBQUksRUFBRTtLQUNaLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFF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RixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuaW1wb3J0IHsgbWl4aW5Jbml0aWFsaXplZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xyXG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xyXG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFRhYmxlRGF0YVNvdXJjZVBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcclxuaW1wb3J0IHsgTXVpSWNvbk1vZHVsZSB9IGZyb20gJ0BtYXBwLXVpL2NvbW1vbic7XHJcbmltcG9ydCB7IE11aUZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJy4uLy4uL2Zvcm0tZmllbGQnO1xyXG5cclxuLyoqXHJcbiAqIEZpbGwgYW4gYXJyYXkgd2l0aCBhIHJhbmdlIG9mIG51bWJlcnMgaW4gYXNjZW5kaW5nIG9yZGVyLlxyXG4gKiBAcGFyYW0gc2l6ZSBTaXplIG9mIHRoZSBhcnJheSB0byBiZSBnZW5lcmF0ZWRcclxuICogQHBhcmFtIHN0YXJ0QXQgT2Zmc2V0IHdoZXJlIHRoZSBudW1iZXJzIHNob3VsZCBzdGFydFxyXG4gKi9cclxuZnVuY3Rpb24gcmFuZ2UoXHJcbiAgICBzaXplOiBudW1iZXIsXHJcbiAgICBzdGFydEF0ID0gMCk6IG51bWJlcltdIHtcclxuICByZXR1cm4gW1xyXG4gICAgLi4uQXJyYXkoc2l6ZSlcclxuICAgICAgICAua2V5cygpXHJcbiAgXS5tYXAoaSA9PiBpICsgc3RhcnRBdCk7XHJcbn1cclxuXHJcbi8vIGNyZWF0ZSBiYXNlIGNsYXNzIHdpdGggcmVxdWlyZWQgXCJIYXNJbml0aWFsaXplZFwiIGhhbmRsaW5nLiB1c2UgcHJlcGFyZWQgbWl4aW4gZnJvbSBtYXRlcmlhbFxyXG5jb25zdCBQYWdpbmF0b3JNaXhpbkJhc2UgPSBtaXhpbkluaXRpYWxpemVkKGNsYXNzIHt9KTtcclxuXHJcbi8qKlxyXG4gKiBQYWdpbmF0b3IgY29tcG9uZW50IHRvIHVzZSB3aXRoIE1hdFRhYmxlIGFuZCBNYXRUYWJsZURhdGFTb3VyY2UuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ211aS1wYWdpbmF0b3InLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE11aUljb25Nb2R1bGUsIE11aUZvcm1GaWVsZE1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211aS1wYWdpbmF0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL211aS1wYWdpbmF0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVpUGFnaW5hdG9yQ29tcG9uZW50IGV4dGVuZHMgUGFnaW5hdG9yTWl4aW5CYXNlIGltcGxlbWVudHMgTWF0VGFibGVEYXRhU291cmNlUGFnaW5hdG9yLCBPbkluaXQge1xyXG5cclxuICByZWFkb25seSBudW1iZXJPZlBhZ2VMaW5rcyA9IDU7XHJcbiAgcGFnZVJhbmdlczogbnVtYmVyW11bXSA9IFtdO1xyXG4gIGN1cnJlbnRQYWdlUmFuZ2VJZHggPSAwO1xyXG5cclxuICAvKiogT3B0aW9ucyBmb3Igc2VsZWN0YWJsZSBwYWdlIHNpemVzLiBXaGVuIG5vdCBzZXQsIG5vIHNlbGVjdCBjb250cm9sIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBwYWdpbmF0b3IuICovXHJcbiAgQElucHV0KClcclxuICBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdO1xyXG5cclxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwYWdpbmF0b3IgY2hhbmdlcyB0aGUgcGFnZSBzaXplIG9yIHBhZ2UgaW5kZXguICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2U6IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XHJcblxyXG4gIHByaXZhdGUgX2xlbmd0aCA9IDA7XHJcbiAgcHJpdmF0ZSBfcGFnZVNpemUgPSAxMDtcclxuICBwcml2YXRlIF9wYWdlSW5kZXggPSAwO1xyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRvdGFsIGxlbmd0aCBvZiB0aGUgcGFnaW5hdGVkIGRhdGEgc2V0LiBVc3VhbGx5IHNldCBieSBNYXRUYWJsZURhdGFTb3VyY2UuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgc2V0IGxlbmd0aCh2YWx1ZTogTnVtYmVySW5wdXQpIHtcclxuICAgIHRoaXMuX2xlbmd0aCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcclxuICAgIHRoaXMudXBkYXRlUGFnZVJhbmdlcygpO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKiBQYWdlIHNpemUgdG8gdXNlLCBkZWZhdWx0cyB0byAxMCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XHJcbiAgfVxyXG5cclxuICBzZXQgcGFnZVNpemUodmFsdWU6IE51bWJlcklucHV0KSB7XHJcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IE1hdGgubWF4KGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKSwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2VSYW5nZXMoKTtcclxuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkUGFnZVJhbmdlSWR4KCk7XHJcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEN1cnJlbnQgcGFnZSBpbmRleCwgemVybyBiYXNlZCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZ2VJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VJbmRleDtcclxuICB9XHJcblxyXG4gIHNldCBwYWdlSW5kZXgodmFsdWU6IE51bWJlcklucHV0KSB7XHJcbiAgICB0aGlzLl9wYWdlSW5kZXggPSBNYXRoLm1heChjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSksIDApO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlUmFuZ2VJZHgoKTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKiogSWYgYSBNYXRUYWJsZURhdGFTb3VyY2UgaXMgcHJvdmlkZWQgdmlhIHRoaXMgaW5wdXQsIHRoZSBwYWdpbmF0b3Igd2lsbCByZWdpc3RlciBpdHNlbGYgdG8gdGhlIGRhdGEgc291cmNlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHRhYmxlRGF0YVNvdXJjZShkczogTWF0VGFibGVEYXRhU291cmNlPGFueT4pIHtcclxuICAgIGRzLnBhZ2luYXRvciA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKiogRGlzYWJsZSBhbGwgcGFnaW5hdG9yIGNvbnRyb2xzICovXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9tYXJrSW5pdGlhbGl6ZWQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBOYXZpZ2F0ZSB0byBhIHNwZWNpZmljIHBhZ2UgYnkgaW5kZXggKHplcm8gYmFzZWQpICovXHJcbiAgZ29Ub1BhZ2UocGFnZUluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiBwYWdlSW5kZXggPiAtMSAmJiBwYWdlSW5kZXggPCB0aGlzLmdldE51bWJlck9mUGFnZXMoKSkge1xyXG4gICAgICBjb25zdCBwcmV2aW91c1BhZ2VJZHggPSB0aGlzLnBhZ2VJbmRleDtcclxuICAgICAgdGhpcy5wYWdlSW5kZXggPSBwYWdlSW5kZXg7XHJcbiAgICAgIHRoaXMuZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJZHgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHBhZ2UgKi9cclxuICBuZXh0UGFnZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9oYXNOZXh0UGFnZSgpKSB7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzUGFnZUlkeCA9IHRoaXMucGFnZUluZGV4O1xyXG4gICAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4ICsgMTtcclxuICAgICAgdGhpcy5lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUlkeCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogTmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHBhZ2UgKi9cclxuICBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faGFzUHJldmlvdXNQYWdlKCkpIHtcclxuICAgICAgY29uc3QgcHJldmlvdXNQYWdlSWR4ID0gdGhpcy5wYWdlSW5kZXg7XHJcbiAgICAgIHRoaXMucGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXggLSAxO1xyXG4gICAgICB0aGlzLmVtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSWR4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBOYXZpZ2F0ZSB0byB0aGUgZmlyc3QgcGFnZSAqL1xyXG4gIGZpcnN0UGFnZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByZXZpb3VzUGFnZUlkeCA9IHRoaXMucGFnZUluZGV4O1xyXG4gICAgdGhpcy5wYWdlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUlkeCk7XHJcbiAgfVxyXG5cclxuICAvKiogTmF2aWdhdGUgdG8gdGhlIGxhc3QgcGFnZSAqL1xyXG4gIGxhc3RQYWdlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSWR4ID0gdGhpcy5wYWdlSW5kZXg7XHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMuZ2V0TnVtYmVyT2ZQYWdlcygpIC0gMTtcclxuICAgIHRoaXMuZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJZHgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHBhZ2VzICovXHJcbiAgZ2V0TnVtYmVyT2ZQYWdlcygpOiBudW1iZXIge1xyXG4gICAgaWYgKCF0aGlzLnBhZ2VTaXplKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5sZW5ndGggLyB0aGlzLnBhZ2VTaXplKTtcclxuICB9XHJcblxyXG4gIF9oYXNOZXh0UGFnZSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG1heFBhZ2VJbmRleCA9IHRoaXMuZ2V0TnVtYmVyT2ZQYWdlcygpIC0gMTtcclxuICAgIHJldHVybiB0aGlzLnBhZ2VJbmRleCA8IG1heFBhZ2VJbmRleCAmJiB0aGlzLnBhZ2VTaXplICE9IDA7XHJcbiAgfVxyXG5cclxuICBfaGFzUHJldmlvdXNQYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZUluZGV4ID49IDEgJiYgdGhpcy5wYWdlU2l6ZSAhPSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoYW5nZSBwYWdlIHNpemUgYW5kIHVwZGF0ZSBjdXJyZW50IHBhZ2UgdG8gaW5jbHVkZSBwcmV2aW91cyBwYWdlJ3MgZmlyc3QgaXRlbSAqL1xyXG4gIF9jaGFuZ2VQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplO1xyXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcclxuXHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IE1hdGguZmxvb3Ioc3RhcnRJbmRleCAvIHBhZ2VTaXplKSB8fCAwO1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xyXG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUGFnZVJhbmdlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhZ2VzID0gdGhpcy5nZXROdW1iZXJPZlBhZ2VzKCk7XHJcbiAgICB0aGlzLnBhZ2VSYW5nZXMgPSBbXTtcclxuICAgIGNvbnN0IHNpemUgPSBNYXRoLmNlaWwocGFnZXMgLyB0aGlzLm51bWJlck9mUGFnZUxpbmtzKTtcclxuICAgIGNvbnN0IHJlc3QgPSBwYWdlcyAlIHRoaXMubnVtYmVyT2ZQYWdlTGlua3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICBjb25zdCBjdXJyZW50UmFuZ2UgPSAoaSA9PT0gc2l6ZSAtIDEgJiYgcmVzdCA+IDApID8gcmVzdCA6IHRoaXMubnVtYmVyT2ZQYWdlTGlua3M7XHJcbiAgICAgIHRoaXMucGFnZVJhbmdlcy5wdXNoKHJhbmdlKGN1cnJlbnRSYW5nZSwgaSAqIHRoaXMubnVtYmVyT2ZQYWdlTGlua3MpKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYWdlLmVtaXQoe1xyXG4gICAgICBwYWdlSW5kZXg6IHRoaXMucGFnZUluZGV4LFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgbGVuZ3RoOiB0aGlzLmxlbmd0aCxcclxuICAgICAgcHJldmlvdXNQYWdlSW5kZXhcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZURpc3BsYXllZFBhZ2VSYW5nZUlkeCgpIHtcclxuICAgIHRoaXMuY3VycmVudFBhZ2VSYW5nZUlkeCA9IE1hdGguZmxvb3IodGhpcy5wYWdlSW5kZXggLyB0aGlzLm51bWJlck9mUGFnZUxpbmtzKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktcGFnaW5hdG9yLWNvbnRhaW5lclwiPlxyXG4gIDxkaXY+XHJcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzPVwibXVpLXBhZ2luYXRvci1idXR0b24gbXVpLXNxdWFyZS1pY29uLWJ1dHRvblwiXHJcbiAgICAgICAgKGNsaWNrKT1cImZpcnN0UGFnZSgpXCJcclxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgcGFnZUluZGV4ID09PSAwXCJcclxuICAgID5cclxuICAgICAgPG11aS1pY29uPmFycm93LWxlZnQtZG91YmxlPC9tdWktaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzcz1cIm11aS1wYWdpbmF0b3ItYnV0dG9uIG11aS1zcXVhcmUtaWNvbi1idXR0b25cIlxyXG4gICAgICAgIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IHBhZ2VJbmRleCA9PT0gMFwiXHJcbiAgICA+XHJcbiAgICAgIDxtdWktaWNvbj5jaGV2cm9uX2xlZnQ8L211aS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm11aS1wYWdlLWxpbmtzXCJcclxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICA8c3BhbiAqbmdJZj1cImN1cnJlbnRQYWdlUmFuZ2VJZHggPiAwXCJcclxuICAgICAgICBjbGFzcz1cIm11aS1wYWdlLWxpbmsgZG90c1wiPi4uLjwvc3Bhbj5cclxuICAgIDxzcGFuICpuZ0Zvcj1cImxldCBpIG9mIHBhZ2VSYW5nZXNbY3VycmVudFBhZ2VSYW5nZUlkeF1cIlxyXG4gICAgICAgIGNsYXNzPVwibXVpLXBhZ2UtbGlua1wiXHJcbiAgICAgICAgW2NsYXNzLmN1cnJlbnRfcGFnZV09XCJwYWdlSW5kZXggPT09IGlcIlxyXG4gICAgICAgIChjbGljayk9XCJnb1RvUGFnZShpKVwiXHJcbiAgICA+e3sgaSArIDEgfX08L3NwYW4+XHJcbiAgICA8c3BhbiAqbmdJZj1cImN1cnJlbnRQYWdlUmFuZ2VJZHggPCBwYWdlUmFuZ2VzLmxlbmd0aCAtIDFcIlxyXG4gICAgICAgIGNsYXNzPVwibXVpLXBhZ2UtbGluayBkb3RzXCI+Li4uPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXY+XHJcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzPVwibXVpLXBhZ2luYXRvci1idXR0b24gbXVpLXNxdWFyZS1pY29uLWJ1dHRvblwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIlxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAhX2hhc05leHRQYWdlKClcIlxyXG4gICAgPlxyXG4gICAgICA8bXVpLWljb24+Y2hldnJvbl9yaWdodDwvbXVpLWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgY2xhc3M9XCJtdWktcGFnaW5hdG9yLWJ1dHRvbiBtdWktc3F1YXJlLWljb24tYnV0dG9uXCJcclxuICAgICAgICAoY2xpY2spPVwibGFzdFBhZ2UoKVwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8ICFfaGFzTmV4dFBhZ2UoKVwiXHJcbiAgICA+XHJcbiAgICAgIDxtdWktaWNvbj5hcnJvdy1yaWdodC1kb3VibGU8L211aS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cInBhZ2VTaXplT3B0aW9uc1wiXHJcbiAgICAgIGNsYXNzPVwibXVpLXBhZ2Utb3B0aW9uc1wiPlxyXG4gICAgPG11aS1mb3JtLWZpZWxkIGZpZWxkV2lkdGg9XCI3NXB4XCI+XHJcbiAgICAgIDxtdWktbGFiZWwgaTE4bj1cIkBAcGFnaW5hdG9yX2l0ZW1zXCI+SXRlbXMgcGVyIHBhZ2U8L211aS1sYWJlbD5cclxuICAgICAgPG1hdC1zZWxlY3QgW3ZhbHVlXT1cInBhZ2VTaXplXCJcclxuICAgICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwiX2NoYW5nZVBhZ2VTaXplKCRldmVudC52YWx1ZSlcIlxyXG4gICAgICAgICAgaGlkZVNpbmdsZVNlbGVjdGlvbkluZGljYXRvclxyXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIHBhZ2VTaXplT3B0aW9uc1wiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJpdGVtXCJcclxuICAgICAgICA+e3sgaXRlbSB9fTwvbWF0LW9wdGlvbj5cclxuICAgICAgPC9tYXQtc2VsZWN0PlxyXG4gICAgPC9tdWktZm9ybS1maWVsZD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==