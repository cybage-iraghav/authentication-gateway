export interface UserMgmtProperties {
    'systemUser.PK': string;
    'systemUser.Email': string;
    'systemUser.CustomerRole': string;
    'systemUser.TimeZone': string;
    'systemUser.Locale': string;
    'systemUser.Type': string;
    'systemUser.EmergencyCommunication': 'true' | 'false';
    'systemUser.CanEdit'?: 'true' | 'false';
    'systemUser.FirstName': string;
    'systemUser.LastName': string;
    'systemUser.CanViewMFA'?: 'true' | 'false';
    'systemUser.MFA'?: 'true' | 'false';
}
