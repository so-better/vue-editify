import { ExtractPublicPropTypes } from 'vue';

export declare const TooltipProps: {
    content: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type TooltipPropsType = ExtractPublicPropTypes<typeof TooltipProps>;
