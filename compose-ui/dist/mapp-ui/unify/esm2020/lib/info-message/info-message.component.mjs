import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MuiIconModule } from '@mapp-ui/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@mapp-ui/common";
/**
 * Component for creating in-page info messages of a certain type/severity.
 */
export class InfoMessageComponent {
    constructor() {
        /** Type of the message. Defines the color theme. Default: info */
        this.type = 'info';
        /** Output event which fires when the close button is clicked (for dismissible messages) */
        this.closeMessage = new EventEmitter();
        this._isDismissible = false;
        this._withIcon = false;
    }
    /** If the message should be dismissible. Shows a close icon in the top right corner */
    get dismissible() {
        return this._isDismissible;
    }
    set dismissible(value) {
        this._isDismissible = coerceBooleanProperty(value);
    }
    /** Turn the message into an Icon message, which shows an icon corresponding to the message type
     * on the left side of the content. */
    get withIcon() {
        return this._withIcon;
    }
    set withIcon(value) {
        this._withIcon = coerceBooleanProperty(value);
    }
    onCloseMessage() {
        this.closeMessage.emit();
    }
}
InfoMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InfoMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InfoMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: InfoMessageComponent, isStandalone: true, selector: "mui-info-message", inputs: { type: "type", dismissible: "dismissible", withIcon: "withIcon" }, outputs: { closeMessage: "closeMessage" }, host: { properties: { "attr.type": "this.type" } }, ngImport: i0, template: "<div class=\"mui-info-message-container\">\r\n  <div *ngIf=\"withIcon\"\r\n      class=\"mui-info-message-icon\">\r\n    <mui-icon [color]=\"type\">info</mui-icon>\r\n  </div>\r\n  <div class=\"mui-info-message-content\">\r\n    <div class=\"mui-info-message-header\">\r\n      <h3 class=\"mat-subtitle-1 mui-info-message-title\"><ng-content select=\"[muiInfoMessageTitle]\"></ng-content></h3>\r\n      <mui-icon\r\n          *ngIf=\"dismissible\"\r\n          class=\"mui-dismiss-message-btn\"\r\n          (click)=\"onCloseMessage()\">\r\n        close\r\n      </mui-icon>\r\n    </div>\r\n\r\n    <div class=\"mui-info-message-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;padding:24px;max-width:800px;position:relative}.mui-info-message-container{display:flex}.mui-info-message-content{flex-grow:1}.mui-info-message-icon{width:40px;height:40px;margin-right:16px;border-radius:50%;padding:8px;box-sizing:border-box}.mui-info-message-header{display:flex;align-items:center;margin-bottom:8px}.mui-info-message-title{margin:0}.mui-dismiss-message-btn{margin-left:auto;flex-grow:0;cursor:pointer;-webkit-user-select:none;user-select:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "ngmodule", type: MuiIconModule }, { kind: "component", type: i2.MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InfoMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-info-message', standalone: true, imports: [CommonModule, MatButtonModule, MatDialogModule, MuiIconModule], template: "<div class=\"mui-info-message-container\">\r\n  <div *ngIf=\"withIcon\"\r\n      class=\"mui-info-message-icon\">\r\n    <mui-icon [color]=\"type\">info</mui-icon>\r\n  </div>\r\n  <div class=\"mui-info-message-content\">\r\n    <div class=\"mui-info-message-header\">\r\n      <h3 class=\"mat-subtitle-1 mui-info-message-title\"><ng-content select=\"[muiInfoMessageTitle]\"></ng-content></h3>\r\n      <mui-icon\r\n          *ngIf=\"dismissible\"\r\n          class=\"mui-dismiss-message-btn\"\r\n          (click)=\"onCloseMessage()\">\r\n        close\r\n      </mui-icon>\r\n    </div>\r\n\r\n    <div class=\"mui-info-message-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;padding:24px;max-width:800px;position:relative}.mui-info-message-container{display:flex}.mui-info-message-content{flex-grow:1}.mui-info-message-icon{width:40px;height:40px;margin-right:16px;border-radius:50%;padding:8px;box-sizing:border-box}.mui-info-message-header{display:flex;align-items:center;margin-bottom:8px}.mui-info-message-title{margin:0}.mui-dismiss-message-btn{margin-left:auto;flex-grow:0;cursor:pointer;-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { type: [{
                type: HostBinding,
                args: ['attr.type']
            }, {
                type: Input
            }], closeMessage: [{
                type: Output
            }], dismissible: [{
                type: Input
            }], withIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9pbmZvLW1lc3NhZ2UvaW5mby1tZXNzYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvdW5pZnkvc3JjL2xpYi9pbmZvLW1lc3NhZ2UvaW5mby1tZXNzYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFaEQ7O0dBRUc7QUFRSCxNQUFNLE9BQU8sb0JBQW9CO0lBUGpDO1FBU0Usa0VBQWtFO1FBRXpELFNBQUksR0FBNkMsTUFBTSxDQUFDO1FBRWpFLDJGQUEyRjtRQUNqRixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztLQTBCM0I7SUF4QkMsdUZBQXVGO0lBQ3ZGLElBQ0ksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBbUI7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7MENBQ3NDO0lBQ3RDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7a0hBbkNVLG9CQUFvQjtzR0FBcEIsb0JBQW9CLHVQQ2pCakMsMnNCQXFCQSw0aEJEUlksWUFBWSxrSUFBRSxlQUFlLDhCQUFFLGVBQWUsOEJBQUUsYUFBYTs0RkFJNUQsb0JBQW9CO2tCQVBoQyxTQUFTOytCQUNFLGtCQUFrQixjQUNoQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUM7OEJBUS9ELElBQUk7c0JBRFosV0FBVzt1QkFBQyxXQUFXOztzQkFDdkIsS0FBSztnQkFHSSxZQUFZO3NCQUFyQixNQUFNO2dCQU9ILFdBQVc7c0JBRGQsS0FBSztnQkFZRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBNdWlJY29uTW9kdWxlIH0gZnJvbSAnQG1hcHAtdWkvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgZm9yIGNyZWF0aW5nIGluLXBhZ2UgaW5mbyBtZXNzYWdlcyBvZiBhIGNlcnRhaW4gdHlwZS9zZXZlcml0eS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXVpLWluZm8tbWVzc2FnZScsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSwgTXVpSWNvbk1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2luZm8tbWVzc2FnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaW5mby1tZXNzYWdlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEluZm9NZXNzYWdlQ29tcG9uZW50IHtcclxuXHJcbiAgLyoqIFR5cGUgb2YgdGhlIG1lc3NhZ2UuIERlZmluZXMgdGhlIGNvbG9yIHRoZW1lLiBEZWZhdWx0OiBpbmZvICovXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnR5cGUnKVxyXG4gIEBJbnB1dCgpIHR5cGU6ICdpbmZvJyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgPSAnaW5mbyc7XHJcblxyXG4gIC8qKiBPdXRwdXQgZXZlbnQgd2hpY2ggZmlyZXMgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQgKGZvciBkaXNtaXNzaWJsZSBtZXNzYWdlcykgKi9cclxuICBAT3V0cHV0KCkgY2xvc2VNZXNzYWdlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBwcml2YXRlIF9pc0Rpc21pc3NpYmxlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfd2l0aEljb24gPSBmYWxzZTtcclxuXHJcbiAgLyoqIElmIHRoZSBtZXNzYWdlIHNob3VsZCBiZSBkaXNtaXNzaWJsZS4gU2hvd3MgYSBjbG9zZSBpY29uIGluIHRoZSB0b3AgcmlnaHQgY29ybmVyICovXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzbWlzc2libGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNEaXNtaXNzaWJsZTtcclxuICB9XHJcblxyXG4gIHNldCBkaXNtaXNzaWJsZSh2YWx1ZTogQm9vbGVhbklucHV0KSB7XHJcbiAgICB0aGlzLl9pc0Rpc21pc3NpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKiBUdXJuIHRoZSBtZXNzYWdlIGludG8gYW4gSWNvbiBtZXNzYWdlLCB3aGljaCBzaG93cyBhbiBpY29uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG1lc3NhZ2UgdHlwZVxyXG4gICAqIG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIGNvbnRlbnQuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgd2l0aEljb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fd2l0aEljb247XHJcbiAgfVxyXG5cclxuICBzZXQgd2l0aEljb24odmFsdWU6IEJvb2xlYW5JbnB1dCkge1xyXG4gICAgdGhpcy5fd2l0aEljb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25DbG9zZU1lc3NhZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsb3NlTWVzc2FnZS5lbWl0KCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtdWktaW5mby1tZXNzYWdlLWNvbnRhaW5lclwiPlxyXG4gIDxkaXYgKm5nSWY9XCJ3aXRoSWNvblwiXHJcbiAgICAgIGNsYXNzPVwibXVpLWluZm8tbWVzc2FnZS1pY29uXCI+XHJcbiAgICA8bXVpLWljb24gW2NvbG9yXT1cInR5cGVcIj5pbmZvPC9tdWktaWNvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibXVpLWluZm8tbWVzc2FnZS1jb250ZW50XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibXVpLWluZm8tbWVzc2FnZS1oZWFkZXJcIj5cclxuICAgICAgPGgzIGNsYXNzPVwibWF0LXN1YnRpdGxlLTEgbXVpLWluZm8tbWVzc2FnZS10aXRsZVwiPjxuZy1jb250ZW50IHNlbGVjdD1cIlttdWlJbmZvTWVzc2FnZVRpdGxlXVwiPjwvbmctY29udGVudD48L2gzPlxyXG4gICAgICA8bXVpLWljb25cclxuICAgICAgICAgICpuZ0lmPVwiZGlzbWlzc2libGVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJtdWktZGlzbWlzcy1tZXNzYWdlLWJ0blwiXHJcbiAgICAgICAgICAoY2xpY2spPVwib25DbG9zZU1lc3NhZ2UoKVwiPlxyXG4gICAgICAgIGNsb3NlXHJcbiAgICAgIDwvbXVpLWljb24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibXVpLWluZm8tbWVzc2FnZS1ib2R5XCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19