import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/dialog";
export class HeadernavDialogComponent {
    constructor(data, sanitizer, http, cd) {
        this.data = data;
        this.sanitizer = sanitizer;
        this.http = http;
        this.cd = cd;
        this.useIframe = false;
    }
    ngOnInit() {
        this.contentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.href);
        if (this.data.modal.iframe) {
            this.useIframe = true;
        }
        else {
            this.http.get(this.data.href, { responseType: 'text' }).subscribe(content => {
                this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
                this.cd.detectChanges();
            });
        }
    }
}
HeadernavDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: HeadernavDialogComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1.DomSanitizer }, { token: i2.HttpClient }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
HeadernavDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: HeadernavDialogComponent, selector: "ng-component", ngImport: i0, template: "<h2 mat-dialog-title>{{ data.modal.title }}</h2>\r\n<mat-dialog-content>\r\n  <iframe *ngIf=\"useIframe\" [src]=\"contentSrc\" frameborder=\"0\" class=\"dialog-iframe\"></iframe>\r\n  <div *ngIf=\"!useIframe\">\r\n    <div [innerHTML]=\"htmlContent\"></div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button color=\"primary\" mat-dialog-close>Close</button>\r\n</mat-dialog-actions>\r\n", styles: [".modal-m{width:510px;height:590px}.modal-mdl{width:700px;height:640px}.modal-xl{width:1050px;height:680px}.dialog-iframe{width:100%}.modal-m .dialog-iframe{height:450px}.modal-mdl .dialog-iframe{height:500px}.modal-xl .dialog-iframe{height:550px}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i5.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i5.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i5.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i5.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: HeadernavDialogComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 mat-dialog-title>{{ data.modal.title }}</h2>\r\n<mat-dialog-content>\r\n  <iframe *ngIf=\"useIframe\" [src]=\"contentSrc\" frameborder=\"0\" class=\"dialog-iframe\"></iframe>\r\n  <div *ngIf=\"!useIframe\">\r\n    <div [innerHTML]=\"htmlContent\"></div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button color=\"primary\" mat-dialog-close>Close</button>\r\n</mat-dialog-actions>\r\n", styles: [".modal-m{width:510px;height:590px}.modal-mdl{width:700px;height:640px}.modal-xl{width:1050px;height:680px}.dialog-iframe{width:100%}.modal-m .dialog-iframe{height:450px}.modal-mdl .dialog-iframe{height:500px}.modal-xl .dialog-iframe{height:550px}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1.DomSanitizer }, { type: i2.HttpClient }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVybmF2LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXBwLXVpL2NvbW1vbi9zcmMvbGliL2FwcC1uYXYvaGVhZGVybmF2L2hlYWRlcm5hdi1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9jb21tb24vc3JjL2xpYi9hcHAtbmF2L2hlYWRlcm5hdi9oZWFkZXJuYXYtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFXM0QsTUFBTSxPQUFPLHdCQUF3QjtJQU1uQyxZQUNrQyxJQUFTLEVBQ2pDLFNBQXVCLEVBQ3ZCLElBQWdCLEVBQ2hCLEVBQXFCO1FBSEcsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFOL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQU9kLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMxRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O3NIQXZCVSx3QkFBd0Isa0JBT3pCLGVBQWU7MEdBUGQsd0JBQXdCLG9EQ2RyQyxxYkFVQTs0RkRJYSx3QkFBd0I7a0JBTnBDLFNBQVM7b0NBR08saUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7MEJBUzVDLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgdHlwZSB7IFNhZmVIdG1sLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVybmF2LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVybmF2LWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhZGVybmF2RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29udGVudFNyYzogU2FmZVJlc291cmNlVXJsO1xyXG4gIGh0bWxDb250ZW50OiBTYWZlSHRtbDtcclxuICB1c2VJZnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcclxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZW50U3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRoaXMuZGF0YS5ocmVmKTtcclxuICAgIGlmICh0aGlzLmRhdGEubW9kYWwuaWZyYW1lKSB7XHJcbiAgICAgIHRoaXMudXNlSWZyYW1lID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5kYXRhLmhyZWYsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkuc3Vic2NyaWJlKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgIHRoaXMuaHRtbENvbnRlbnQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChjb250ZW50KTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT57eyBkYXRhLm1vZGFsLnRpdGxlIH19PC9oMj5cclxuPG1hdC1kaWFsb2ctY29udGVudD5cclxuICA8aWZyYW1lICpuZ0lmPVwidXNlSWZyYW1lXCIgW3NyY109XCJjb250ZW50U3JjXCIgZnJhbWVib3JkZXI9XCIwXCIgY2xhc3M9XCJkaWFsb2ctaWZyYW1lXCI+PC9pZnJhbWU+XHJcbiAgPGRpdiAqbmdJZj1cIiF1c2VJZnJhbWVcIj5cclxuICAgIDxkaXYgW2lubmVySFRNTF09XCJodG1sQ29udGVudFwiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L21hdC1kaWFsb2ctY29udGVudD5cclxuPG1hdC1kaWFsb2ctYWN0aW9ucyBhbGlnbj1cImVuZFwiPlxyXG4gIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBtYXQtZGlhbG9nLWNsb3NlPkNsb3NlPC9idXR0b24+XHJcbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxyXG4iXX0=