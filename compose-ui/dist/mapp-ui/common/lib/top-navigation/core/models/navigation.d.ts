/**
 * Data structure for individual navigation items.
 */
export interface NavItem {
    /**
     * ID of the item. Also used as translation key where applicable.
     */
    id: string;
    /**
     * Name of the item. Will be displayed in the menu. Will be replaced by translation where needed.
     */
    name?: string;
    /**
     * Optional icon. Will either be displayed in front of the name, or if no name is defined create an icon-only element.
     */
    icon?: string;
    /**
     * Link to be opened when the item is clicked.
     */
    href?: string;
    /**
     * Define a sub-menu for the current item. Can be used instead of href.
     */
    menu?: NavItem[];
    /**
     * Arbitrary properties for the current item. Should be used to control additional behavior and use cases
     * specific for the current element type.
     */
    properties?: {
        [key: string]: string | number | boolean;
    };
}
/**
 * Data structure for the whole top navigation, divided in sections brand (logo), mainNav (main menu) and
 * auxNav (right side menu)
 */
export interface Navigation {
    /**
     * Properties for the main navigation section.
     */
    mainNav: NavItem[];
    /**
     * Properties for the auxiliary navigation section on the right side.
     */
    auxNav: NavItem[];
}
