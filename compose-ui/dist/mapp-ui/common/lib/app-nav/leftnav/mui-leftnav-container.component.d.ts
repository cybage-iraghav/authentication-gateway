import { AfterContentInit } from '@angular/core';
import { MuiLeftnavContentComponent } from './mui-leftnav-content.component';
import { MuiLeftnavComponent } from './mui-leftnav.component';
import * as i0 from "@angular/core";
/**
 * Container component for holding left navigation and main app content
 * @deprecated
 */
export declare class MuiLeftnavContainerComponent implements AfterContentInit {
    readonly containerClass = "mui-leftnav-container";
    content: MuiLeftnavContentComponent;
    leftnav: MuiLeftnavComponent;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuiLeftnavContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuiLeftnavContainerComponent, "mui-leftnav-container", ["muiLeftnavContainer"], {}, {}, ["content", "leftnav"], ["mui-leftnav", "mui-leftnav-content"], false, never>;
}
