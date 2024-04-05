/**
 * The message holds the actual content for a notification to be displayed on screen.
 * The presence of the body property controls how the notification is displayed:
 * headline only: Snackbar only
 * headline + body: Snackbar + notification message
 * Further details {@link https://wiki.mapp.tools/x/urH6B|here}
 */
import { SafeHtml } from '@angular/platform-browser';
export interface Message {
    id?: number;
    locale?: string;
    headline: string;
    body?: string;
    optionalActionTitle?: string;
    optionalActionLink?: string;
    imageUrl?: string;
    isExpanded?: boolean;
    bodyHtml?: SafeHtml;
    htmlContent?: boolean;
}
export declare const DISPLAY_STATES: {
    collapsed: string;
    expanded: string;
};
