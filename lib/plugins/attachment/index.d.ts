import { InsertAttachmentUploadErrorType } from './insertAttachment/props';

export type AttachmentOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    accept?: 'rar' | 'zip' | 'txt' | 'image' | 'video' | 'audio' | 'html' | 'doc' | 'xml' | 'js' | 'json' | 'ppt' | 'pdf' | null;
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: (files: File[]) => string[] | Promise<string[]>;
    handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void;
};
export declare const attachment: (options?: AttachmentOptionsType) => import('../../core/tool').PluginInnerType;
