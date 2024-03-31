import { LayerPlacementType } from './props';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import("vue").PropType<string | HTMLElement | null>;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: import("vue").PropType<LayerPlacementType>;
        default: string;
        validator(value: any): boolean;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import("vue").PropType<import("./props").LayerAnimationType>;
        default: null;
        validator(value: any): boolean;
    };
    useRange: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    setPosition: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    show: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import("vue").PropType<string | HTMLElement | null>;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: import("vue").PropType<LayerPlacementType>;
        default: string;
        validator(value: any): boolean;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import("vue").PropType<import("./props").LayerAnimationType>;
        default: null;
        validator(value: any): boolean;
    };
    useRange: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onShow?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onShown?: ((...args: any[]) => any) | undefined;
    onHidden?: ((...args: any[]) => any) | undefined;
}, {
    placement: LayerPlacementType;
    color: string;
    background: string;
    modelValue: boolean;
    node: string | HTMLElement | null;
    border: boolean;
    borderColor: string;
    showTriangle: boolean;
    zIndex: number;
    animation: import("./props").LayerAnimationType;
    useRange: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
