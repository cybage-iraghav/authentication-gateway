import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Component for creating in-page info messages of a certain type/severity.
 */
export declare class InfoMessageComponent {
    /** Type of the message. Defines the color theme. Default: info */
    type: 'info' | 'success' | 'warning' | 'error';
    /** Output event which fires when the close button is clicked (for dismissible messages) */
    closeMessage: EventEmitter<void>;
    private _isDismissible;
    private _withIcon;
    /** If the message should be dismissible. Shows a close icon in the top right corner */
    get dismissible(): BooleanInput;
    set dismissible(value: BooleanInput);
    /** Turn the message into an Icon message, which shows an icon corresponding to the message type
     * on the left side of the content. */
    get withIcon(): BooleanInput;
    set withIcon(value: BooleanInput);
    onCloseMessage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfoMessageComponent, "mui-info-message", never, { "type": "type"; "dismissible": "dismissible"; "withIcon": "withIcon"; }, { "closeMessage": "closeMessage"; }, never, ["[muiInfoMessageTitle]", "*"], true, never>;
}
