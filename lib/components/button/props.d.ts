import { ExtractPublicPropTypes, PropType } from 'vue';
import { ObjectType } from '../../core/tool';

export type ButtonTypeType = 'default' | 'select' | 'display';
export type ButtonOptionsItemType = {
    label?: string | number;
    value?: string | number;
    icon?: string;
    style?: ObjectType;
};
export type ButtonSelectConfigType = {
    options?: (ButtonOptionsItemType | number | string)[];
    width?: number | '';
    maxHeight?: number | '';
};
export type ButtonDisplayConfigType = {
    options?: (ButtonOptionsItemType | number | string)[];
    width?: number | '';
    maxHeight?: number | '';
    value?: string | number;
};
export declare const ButtonProps: {
    type: {
        type: PropType<ButtonTypeType>;
        default: string;
        validator(value: any): boolean;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    rightBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: PropType<string | null>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectConfig: {
        type: PropType<ButtonSelectConfigType>;
        default: null;
    };
    displayConfig: {
        type: PropType<ButtonDisplayConfigType>;
        default: null;
    };
    hideScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ButtonPropsType = ExtractPublicPropTypes<typeof ButtonProps>;
