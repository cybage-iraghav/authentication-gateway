export interface LeftnavItem {
    id: string;
    name: string;
    icon?: string;
    matIcon?: string;
    href?: string;
    menu?: LeftnavItem[];
}
export interface LeftnavResponse {
    mainNav: LeftnavItem[];
}
