import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NotificationService } from '@mapp-ui/notification-center';
import { Observable } from 'rxjs';
import { LanguageData, TimeZoneData } from '../../core/models/profile-data';
import { UserMgmtProperties } from '../../core/models/user-mgmt-properties';
import * as i0 from "@angular/core";
export declare class EditProfileComponent implements OnInit {
    private http;
    private fb;
    private cd;
    private nc;
    profileDataUrl: string;
    languageDataUrl: string;
    timeZoneDataUrl: string;
    profileSaveUrl: string;
    profileData: UserMgmtProperties;
    languages$: Observable<LanguageData[]>;
    timeZones$: Observable<TimeZoneData[]>;
    form: UntypedFormGroup;
    displayMfaSetting: boolean;
    constructor(http: HttpClient, fb: UntypedFormBuilder, cd: ChangeDetectorRef, nc: NotificationService);
    ngOnInit(): void;
    saveUserProfile(): void;
    private createForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<EditProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditProfileComponent, "mui-edit-profile", never, { "profileDataUrl": "profileDataUrl"; "languageDataUrl": "languageDataUrl"; "timeZoneDataUrl": "timeZoneDataUrl"; "profileSaveUrl": "profileSaveUrl"; }, {}, never, never, false, never>;
}
