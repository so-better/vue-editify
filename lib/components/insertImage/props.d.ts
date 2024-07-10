import { ExtractPublicPropTypes, PropType } from 'vue';

export type InsertImageUploadErrorType = 'suffixError' | 'maxSizeError' | 'minSizeError';
export declare const InsertImageProps: {
    color: {
        type: StringConstructor;
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
        type: PropType<((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)>;
        default: null;
    };
    handleError: {
        type: PropType<(error: InsertImageUploadErrorType, file: File) => void>;
        default: null;
    };
};
export type InsertImagePropsType = ExtractPublicPropTypes<typeof InsertImageProps>;
