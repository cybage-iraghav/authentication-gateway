export interface SessionTimerConfig {
    timeout: number;
    keepAlive: boolean;
    idleMode: boolean;
    expiredHref: string;
    idleModeMsg: string;
    expiredMsg: string;
}
export interface KeepAliveResponse {
    keepAlive: boolean;
    idleMode: boolean;
}
