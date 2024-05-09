import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const InsertMathformulaProps: {
    color: {
        type: PropType<string | null>;
        default: string;
    };
    defaultLaTexContent: {
        type: StringConstructor;
        default: string;
    };
};
export type InsertMathformulaPropsType = ExtractPublicPropTypes<typeof InsertMathformulaProps>;
