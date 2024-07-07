declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: import('vue').PropType<"link" | "text" | "image" | "video" | "table" | "codeBlock">;
        default: string;
        validator(value: any): boolean;
    };
    config: {
        type: import('vue').PropType<import('../../core/tool').ToolbarConfigType>;
        default: null;
    };
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: import('vue').PropType<"link" | "text" | "image" | "video" | "table" | "codeBlock">;
        default: string;
        validator(value: any): boolean;
    };
    config: {
        type: import('vue').PropType<import('../../core/tool').ToolbarConfigType>;
        default: null;
    };
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    color: string | null;
    type: "link" | "text" | "image" | "video" | "table" | "codeBlock";
    zIndex: number;
    modelValue: boolean;
    node: string | HTMLElement;
    scrollNode: string | HTMLElement;
    config: import('../../core/tool').ToolbarConfigType;
}, {}>;
export default _default;
