import { ButtonDisplayConfigType, ButtonOptionsItemType, ButtonSelectConfigType } from './props';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    type: {
        type: import('vue').PropType<import('./props').ButtonTypeType>;
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
        type: StringConstructor;
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
        type: import('vue').PropType<ButtonSelectConfigType>;
        default: null;
    };
    displayConfig: {
        type: import('vue').PropType<ButtonDisplayConfigType>;
        default: null;
    };
    hideScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    show: import('vue').Ref<boolean>;
    status: import('vue').Ref<"hover" | "down" | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    operate: (...args: any[]) => void;
    layerShow: (...args: any[]) => void;
    layerShown: (...args: any[]) => void;
    layerHidden: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<import('./props').ButtonTypeType>;
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
        type: StringConstructor;
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
        type: import('vue').PropType<ButtonSelectConfigType>;
        default: null;
    };
    displayConfig: {
        type: import('vue').PropType<ButtonDisplayConfigType>;
        default: null;
    };
    hideScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onOperate?: ((...args: any[]) => any) | undefined;
    onLayerShow?: ((...args: any[]) => any) | undefined;
    onLayerShown?: ((...args: any[]) => any) | undefined;
    onLayerHidden?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    type: import('./props').ButtonTypeType;
    name: string;
    title: string;
    tooltip: boolean;
    rightBorder: boolean;
    leftBorder: boolean;
    disabled: boolean;
    active: boolean;
    selectConfig: ButtonSelectConfigType;
    displayConfig: ButtonDisplayConfigType;
    hideScroll: boolean;
}, {}>, {
    default?(_: {}): any;
    layer?(_: {
        options: ButtonOptionsItemType[];
    }): any;
    option?(_: {
        item: ButtonOptionsItemType;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
