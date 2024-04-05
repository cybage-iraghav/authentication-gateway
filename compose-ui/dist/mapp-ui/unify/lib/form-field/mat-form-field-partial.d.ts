import { ElementRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
export interface MatFormFieldPartial {
    getConnectedOverlayOrigin(): ElementRef;
    getLabelId(): string | null;
    color: ThemePalette;
    _elementRef: ElementRef;
    _shouldLabelFloat(): boolean;
    _hasFloatingLabel(): boolean;
    _labelId: string;
}
