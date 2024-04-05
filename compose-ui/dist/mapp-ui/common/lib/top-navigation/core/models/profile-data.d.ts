export interface LanguageData {
    id: string;
    name: string;
}
export interface LanguageList {
    enum_name: string;
    languagewithcountryseq: LanguageData[];
}
export interface TimeZoneData {
    timezone_offset: string;
    timezone_raw_offset: string;
    id: string;
    name: string;
    timezone_name: string;
    timezone: string;
}
export interface TimeZoneList {
    enum_name: string;
    timezones: TimeZoneData[];
}
