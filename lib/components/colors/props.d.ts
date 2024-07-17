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
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
};
export type ColorsPropsType = ExtractPublicPropTypes<typeof ColorsProps>;
