import { InsertAttachmentUploadErrorType } from './insertAttachment/props';
import { PluginType } from '../../core/tool';

export type AttachmentOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    accept?: string;
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: (files: File[]) => string[] | Promise<string[]>;
    handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void;
};
/**
 * 附件插件
 * @param options
 * @returns
 */
export declare const attachment: (options?: AttachmentOptionsType) => PluginType;
