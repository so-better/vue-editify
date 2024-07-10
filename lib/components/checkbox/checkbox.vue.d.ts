import { ObjectType } from '../../core/tool';

declare const _default: import('vue').DefineComponent<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: import('vue').PropType<boolean | any[]>;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: import('vue').PropType<ObjectType | number | string | any[]>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import('vue').PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: import('vue').PropType<boolean | any[]>;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: import('vue').PropType<ObjectType | number | string | any[]>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import('vue').PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    disabled: boolean;
    value: string | number | any[] | ObjectType;
    label: string;
    modelValue: boolean | any[];
    placement: "left" | "right";
    round: boolean;
}, {}>;
export default _default;
