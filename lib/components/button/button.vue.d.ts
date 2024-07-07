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
        type: import('vue').PropType<string | null>;
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
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
    show: import('vue').Ref<boolean>;
    status: import('vue').Ref<"hover" | "down" | null>;
    layerRef: import('vue').Ref<({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            placement: import('../layer/props').LayerPlacementType;
            color: string;
            background: string;
            zIndex: number;
            modelValue: boolean;
            node: string | HTMLElement | null;
            scrollNode: string | HTMLElement | null;
            border: boolean;
            borderColor: string;
            showTriangle: boolean;
            animation: import('../layer/props').LayerAnimationType;
            useRange: boolean;
        }> & Omit<{
            readonly placement: import('../layer/props').LayerPlacementType;
            readonly color: string;
            readonly background: string;
            readonly zIndex: number;
            readonly modelValue: boolean;
            readonly node: string | HTMLElement | null;
            readonly scrollNode: string | HTMLElement | null;
            readonly border: boolean;
            readonly borderColor: string;
            readonly showTriangle: boolean;
            readonly animation: import('../layer/props').LayerAnimationType;
            readonly useRange: boolean;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
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
                type: import('vue').PropType<import('../layer/props').LayerPlacementType>;
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
                type: import('vue').PropType<import('../layer/props').LayerAnimationType>;
                default: null;
                validator(value: any): boolean;
            };
            useRange: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, "placement" | "color" | "background" | "zIndex" | "modelValue" | "node" | "scrollNode" | "border" | "borderColor" | "showTriangle" | "animation" | "useRange">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "update:modelValue", ...args: any[]) => void) & ((event: "show", ...args: any[]) => void) & ((event: "shown", ...args: any[]) => void) & ((event: "hidden", ...args: any[]) => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
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
                type: import('vue').PropType<import('../layer/props').LayerPlacementType>;
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
                type: import('vue').PropType<import('../layer/props').LayerAnimationType>;
                default: null;
                validator(value: any): boolean;
            };
            useRange: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            setPosition: () => void;
        }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
        }, string, {
            placement: import('../layer/props').LayerPlacementType;
            color: string;
            background: string;
            zIndex: number;
            modelValue: boolean;
            node: string | HTMLElement | null;
            scrollNode: string | HTMLElement | null;
            border: boolean;
            borderColor: string;
            showTriangle: boolean;
            animation: import('../layer/props').LayerAnimationType;
            useRange: boolean;
        }, {}, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R, args_2: (cleanupFn: () => void) => void) => any : (args_0: any, args_1: any, args_2: (cleanupFn: () => void) => void) => any, options?: import('vue').WatchOptions<boolean> | undefined): import('vue').WatchStopHandle;
    } & Omit<Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<import('../layer/props').LayerPlacementType>;
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
            type: import('vue').PropType<import('../layer/props').LayerAnimationType>;
            default: null;
            validator(value: any): boolean;
        };
        useRange: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, "setPosition"> & import('vue').ShallowUnwrapRef<{
        setPosition: () => void;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            default?(_: {}): any;
        };
    }) | null>;
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
        type: import('vue').PropType<string | null>;
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
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onOperate?: ((...args: any[]) => any) | undefined;
    onLayerShow?: ((...args: any[]) => any) | undefined;
    onLayerShown?: ((...args: any[]) => any) | undefined;
    onLayerHidden?: ((...args: any[]) => any) | undefined;
}, {
    color: string | null;
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
    zIndex: number;
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
