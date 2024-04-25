import { ToolbarConfigType } from '../../core/tool';
import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const ToolbarProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: PropType<"link" | "text" | "image" | "video" | "table" | "codeBlock">;
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
};
export type ToolbarPropsType = ExtractPublicPropTypes<typeof ToolbarProps>;
