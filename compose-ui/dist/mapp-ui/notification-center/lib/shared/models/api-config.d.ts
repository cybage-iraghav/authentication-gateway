/**
 * Define connection config options to access the backend API.
 * Depending on connectionMode this will go directly, using UserInfo parameters
 * or through CEP, using sessionId
 */
export interface ApiConfigOptions {
    connectionMode: 'direct' | 'cep';
    baseUrl: string;
    sessionId?: string;
    userInfo?: {
        userId: number;
        customerId: number;
        datacenter: string;
        database: string;
        locale?: string;
    };
}
