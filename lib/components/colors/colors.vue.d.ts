import { ButtonOptionsItemType } from '../button/props';

declare const _default: import('vue').DefineComponent<{
    data: {
        type: import("vue").PropType<ButtonOptionsItemType[]>;
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: import("vue").PropType<ButtonOptionsItemType[]>;
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
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    tooltip: boolean;
    value: string;
    data: ButtonOptionsItemType[];
}, {}>;
export default _default;
