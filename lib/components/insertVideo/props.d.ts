import { ExtractPublicPropTypes, PropType } from 'vue';

export type InsertVideoUploadErrorType = 'suffixError' | 'maxSizeError' | 'minSizeError';
export declare const InsertVideoProps: {
    color: {
        type: PropType<string | null>;
        default: string;
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
        type: PropType<(files: File[]) => string[] | Promise<string[]>>;
        default: null;
    };
    handleError: {
        type: PropType<(error: InsertVideoUploadErrorType, file: File) => void>;
        default: null;
    };
};
export type InsertVideoPropsType = ExtractPublicPropTypes<typeof InsertVideoProps>;
