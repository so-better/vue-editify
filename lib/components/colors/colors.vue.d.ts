import { ButtonOptionsItemType } from '../button';

declare const _default: import('vue').DefineComponent<{
    data: {
        type: import('vue').PropType<ButtonOptionsItemType[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    data: {
        type: import('vue').PropType<ButtonOptionsItemType[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    tooltip: boolean;
    color: string | null;
    value: string;
    data: ButtonOptionsItemType[];
}, {}>;
export default _default;
