
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.0.0'
 * Timestamp: Tue Jul 01 2025 23:25:28 GMT+0400 (Gulf Standard Time)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Partneritem extends ContentItem {
    public name!: Elements.TextElement;
    public content!: Elements.RichTextElement;
    public image!: Elements.AssetsElement;
    public link!: Elements.TextElement;
    public type!: Elements.MultipleChoiceElement;
    public metadataPagetitle!: Elements.TextElement;
    public metadataMetatitle!: Elements.TextElement;
    public metadataMetadescription!: Elements.TextElement;
    public metadataKeywords!: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'metadata__pagetitle') {
                    return 'metadataPagetitle';
                }
                if (elementName === 'metadata__metatitle') {
                    return 'metadataMetatitle';
                }
                if (elementName === 'metadata__metadescription') {
                    return 'metadataMetadescription';
                }
                if (elementName === 'metadata__keywords') {
                    return 'metadataKeywords';
                }
                return elementName;
            })
        });
    }
}
