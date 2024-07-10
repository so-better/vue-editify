import { ExtractPublicPropTypes, PropType } from 'vue';

export type InsertAttachmentUploadErrorType = 'suffixError' | 'maxSizeError' | 'minSizeError';
export declare const InsertAttachmentProps: {
    color: {
        type: StringConstructor;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: null;
    };
    allowedFileType: {
        type: PropType<string[]>;
        default: null;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxSize: {
        type: NumberConstructor;
        default: null;
    };
    minSize: {
        type: NumberConstructor;
        default: null;
    };
    customUpload: {
        type: PropType<((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)>;
        default: null;
    };
    handleError: {
        type: PropType<(error: InsertAttachmentUploadErrorType, file: File) => void>;
        default: null;
    };
};
export type InsertAttachmentPropsType = ExtractPublicPropTypes<typeof InsertAttachmentProps>;
