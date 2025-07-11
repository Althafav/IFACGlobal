
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.0.0'
 * Timestamp: Tue Jul 01 2025 23:25:28 GMT+0400 (Gulf Standard Time)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Partnerpage extends ContentItem {
    public bannerheading!: Elements.RichTextElement;
    public bannerdescription!: Elements.RichTextElement;
    public supportingpartneritems!: Elements.LinkedItemsElement<ContentItem>;
    public mediapartneritems!: Elements.LinkedItemsElement<ContentItem>;
}
