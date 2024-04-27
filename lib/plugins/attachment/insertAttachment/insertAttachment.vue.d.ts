declare const _default: import('vue').DefineComponent<{
    color: {
        type: import("vue").PropType<string | null>;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: null;
    };
    allowedFileType: {
        type: import("vue").PropType<string[]>;
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
        type: import("vue").PropType<(files: File[]) => string[] | Promise<string[]>>;
        default: null;
    };
    handleError: {
        type: import("vue").PropType<(error: import("./props").InsertAttachmentUploadErrorType, file: File) => void>;
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    insert: (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: import("vue").PropType<string | null>;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: null;
    };
    allowedFileType: {
        type: import("vue").PropType<string[]>;
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
        type: import("vue").PropType<(files: File[]) => string[] | Promise<string[]>>;
        default: null;
    };
    handleError: {
        type: import("vue").PropType<(error: import("./props").InsertAttachmentUploadErrorType, file: File) => void>;
        default: null;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onInsert?: ((...args: any[]) => any) | undefined;
}, {
    color: string | null;
    allowedFileType: string[];
    multiple: boolean;
    maxSize: number;
    minSize: number;
    customUpload: (files: File[]) => string[] | Promise<string[]>;
    handleError: (error: import("./props").InsertAttachmentUploadErrorType, file: File) => void;
    accept: string;
}, {}>;
export default _default;
