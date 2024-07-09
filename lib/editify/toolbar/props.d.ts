import { ExtractPublicPropTypes, PropType } from 'vue';
import { ToolbarConfigType } from '../../core/tool';

export declare const ToolbarProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: PropType<string | HTMLElement>;
        default: null;
    };
    scrollNode: {
        type: PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: PropType<"text" | "table" | "link" | "codeBlock" | "image" | "video">;
        default: string;
        validator(value: any): boolean;
    };
    config: {
        type: PropType<ToolbarConfigType>;
        default: null;
    };
    color: {
        type: PropType<string | null>;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
};
export type ToolbarPropsType = ExtractPublicPropTypes<typeof ToolbarProps>;
