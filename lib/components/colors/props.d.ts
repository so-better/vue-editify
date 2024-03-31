import { ButtonOptionsItemType } from '../button/props';
import { ExtractPublicPropTypes, PropType } from 'vue';

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
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ColorsPropsType = ExtractPublicPropTypes<typeof ColorsProps>;
