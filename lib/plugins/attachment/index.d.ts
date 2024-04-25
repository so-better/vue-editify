import { InsertAttachmentUploadErrorType } from './insertAttachment/props';
import { PluginType } from '../../core/tool';

export type AttachmentOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: (files: File[]) => string[] | Promise<string[]>;
    handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void;
};
export declare const attachment: (options: AttachmentOptionsType) => PluginType;