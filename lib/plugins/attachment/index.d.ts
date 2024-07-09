import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';
import { PluginType } from '../../core/tool';
import { InsertAttachmentUploadErrorType } from './insertAttachment';

export type AttachmentOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
    accept?: string;
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>);
    handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void;
};
/**
 * 元素是否附件
 * @param element
 * @returns
 */
export declare const isAttachment: (element: AlexElement) => any;
/**
 * 选区是否含有附件
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasAttachmentInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => any;
/**
 * 附件插件
 * @param options
 * @returns
 */
export declare const attachment: (options?: AttachmentOptionsType) => PluginType;
