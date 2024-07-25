import { ButtonOptionsItemType } from './props';

declare function __VLS_template(): {
    default?(_: {}): any;
    layer?(_: {
        options: ButtonOptionsItemType[];
    }): any;
    option?(_: {
        item: ButtonOptionsItemType;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
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
        type: import('vue').PropType<import('./props').ButtonSelectConfigType>;
        default: null;
    };
    displayConfig: {
        type: import('vue').PropType<import('./props').ButtonDisplayConfigType>;
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
            color: string;
            zIndex: number;
            modelValue: boolean;
            node: string | HTMLElement | null;
            scrollNode: string | HTMLElement | null;
            border: boolean;
            borderColor: string;
            background: string;
            placement: import('../layer').LayerPlacementType;
            showTriangle: boolean;
            animation: import('../layer').LayerAnimationType;
            useRange: boolean;
            insideElements: HTMLElement[];
        }> & Omit<{
            readonly color: string;
            readonly zIndex: number;
            readonly modelValue: boolean;
            readonly node: string | HTMLElement | null;
            readonly scrollNode: string | HTMLElement | null;
            readonly border: boolean;
            readonly borderColor: string;
            readonly background: string;
            readonly placement: import('../layer').LayerPlacementType;
            readonly showTriangle: boolean;
            readonly animation: import('../layer').LayerAnimationType;
            readonly useRange: boolean;
            readonly insideElements: HTMLElement[];
            onHidden?: ((...args: any[]) => any) | undefined;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
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
                type: import('vue').PropType<import('../layer').LayerPlacementType>;
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
                type: import('vue').PropType<import('../layer').LayerAnimationType>;
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
        }, "color" | "zIndex" | "modelValue" | "node" | "scrollNode" | "border" | "borderColor" | "background" | "placement" | "showTriangle" | "animation" | "useRange" | "insideElements">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $emit: ((event: "hidden", ...args: any[]) => void) & ((event: "update:modelValue", ...args: any[]) => void) & ((event: "show", ...args: any[]) => void) & ((event: "shown", ...args: any[]) => void);
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
                type: import('vue').PropType<import('../layer').LayerPlacementType>;
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
                type: import('vue').PropType<import('../layer').LayerAnimationType>;
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
            setPosition: () => void;
            elRef: import('vue').Ref<HTMLElement | null>;
        }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            hidden: (...args: any[]) => void;
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            shown: (...args: any[]) => void;
        }, string, {
            color: string;
            zIndex: number;
            modelValue: boolean;
            node: string | HTMLElement | null;
            scrollNode: string | HTMLElement | null;
            border: boolean;
            borderColor: string;
            background: string;
            placement: import('../layer').LayerPlacementType;
            showTriangle: boolean;
            animation: import('../layer').LayerAnimationType;
            useRange: boolean;
            insideElements: HTMLElement[];
        }, {}, string, {}> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, (cleanupFn: () => void) => void]) => any : (...args: [any, any, (cleanupFn: () => void) => void]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
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
            type: import('vue').PropType<import('../layer').LayerPlacementType>;
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
            type: import('vue').PropType<import('../layer').LayerAnimationType>;
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
    }, "setPosition" | "elRef"> & import('vue').ShallowUnwrapRef<{
        setPosition: () => void;
        elRef: import('vue').Ref<HTMLElement | null>;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            default?(_: {}): any;
        };
    }) | null>;
    handleClick: () => void;
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
        type: import('vue').PropType<import('./props').ButtonSelectConfigType>;
        default: null;
    };
    displayConfig: {
        type: import('vue').PropType<import('./props').ButtonDisplayConfigType>;
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
    type: import('./props').ButtonTypeType;
    name: string;
    title: string;
    tooltip: boolean;
    rightBorder: boolean;
    leftBorder: boolean;
    color: string;
    disabled: boolean;
    active: boolean;
    selectConfig: import('./props').ButtonSelectConfigType;
    displayConfig: import('./props').ButtonDisplayConfigType;
    hideScroll: boolean;
    zIndex: number;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
