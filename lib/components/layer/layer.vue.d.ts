import { LayerPlacementType } from './props';

declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement | null>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement | null>;
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
        type: import('vue').PropType<LayerPlacementType>;
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
        type: import('vue').PropType<import('./props').LayerAnimationType>;
        default: null;
        validator(value: any): boolean;
    };
    useRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    insideElements: {
        type: import('vue').PropType<HTMLElement[]>;
        default: () => never[];
    };
}, {
    setPosition: () => void;
    elRef: import('vue').Ref<HTMLElement | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    hidden: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    shown: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement | null>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement | null>;
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
        type: import('vue').PropType<LayerPlacementType>;
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
        type: import('vue').PropType<import('./props').LayerAnimationType>;
        default: null;
        validator(value: any): boolean;
    };
    useRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    insideElements: {
        type: import('vue').PropType<HTMLElement[]>;
        default: () => never[];
    };
}>> & {
    onHidden?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    onShown?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    zIndex: number;
    modelValue: boolean;
    node: string | HTMLElement | null;
    scrollNode: string | HTMLElement | null;
    border: boolean;
    borderColor: string;
    background: string;
    placement: LayerPlacementType;
    showTriangle: boolean;
    animation: import('./props').LayerAnimationType;
    useRange: boolean;
    insideElements: HTMLElement[];
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
