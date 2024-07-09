import { ExtractPublicPropTypes, PropType } from 'vue';
import { ButtonOptionsItemType } from '../button';

export declare const ColorsProps: {
    data: {
        type: PropType<ButtonOptionsItemType[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: PropType<string | null>;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ColorsPropsType = ExtractPublicPropTypes<typeof ColorsProps>;
