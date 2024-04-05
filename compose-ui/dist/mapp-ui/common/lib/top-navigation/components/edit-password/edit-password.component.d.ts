import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '@mapp-ui/notification-center';
import * as i0 from "@angular/core";
export declare class EditPasswordComponent implements OnInit {
    private fb;
    private http;
    private nc;
    private sanitizer;
    private cd;
    userId: string;
    updatePasswordUrl: string;
    oldPasswordRequired: boolean;
    form: UntypedFormGroup;
    errorMessage: SafeHtml | null;
    constructor(fb: UntypedFormBuilder, http: HttpClient, nc: NotificationService, sanitizer: DomSanitizer, cd: ChangeDetectorRef);
    get newPassword(): UntypedFormControl;
    get newPasswordConfirm(): UntypedFormControl;
    ngOnInit(): void;
    updatePassword(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EditPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditPasswordComponent, "mui-edit-password", never, { "userId": "userId"; "updatePasswordUrl": "updatePasswordUrl"; "oldPasswordRequired": "oldPasswordRequired"; }, {}, never, never, false, never>;
}
