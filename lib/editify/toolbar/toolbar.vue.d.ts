import { ComponentPublicInstance } from 'vue';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: import('vue').PropType<"text" | "table" | "link" | "codeBlock" | "image" | "video" | "orderList" | "unorderList">;
        default: string;
        validator(value: any): boolean;
    };
    config: {
        type: import('vue').PropType<import('../..').ToolbarConfigType>;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
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
            placement: import('../../components/layer').LayerPlacementType;
            showTriangle: boolean;
            animation: import('../../components/layer').LayerAnimationType;
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
            readonly placement: import('../../components/layer').LayerPlacementType;
            readonly showTriangle: boolean;
            readonly animation: import('../../components/layer').LayerAnimationType;
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
                type: import('vue').PropType<import('../../components/layer').LayerPlacementType>;
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
                type: import('vue').PropType<import('../../components/layer').LayerAnimationType>;
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
        $root: ComponentPublicInstance | null;
        $parent: ComponentPublicInstance | null;
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
                type: import('vue').PropType<import('../../components/layer').LayerPlacementType>;
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
                type: import('vue').PropType<import('../../components/layer').LayerAnimationType>;
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
            placement: import('../../components/layer').LayerPlacementType;
            showTriangle: boolean;
            animation: import('../../components/layer').LayerAnimationType;
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
            errorCaptured?: ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void)[];
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
            type: import('vue').PropType<import('../../components/layer').LayerPlacementType>;
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
            type: import('vue').PropType<import('../../components/layer').LayerAnimationType>;
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
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    scrollNode: {
        type: import('vue').PropType<string | HTMLElement>;
        default: null;
    };
    type: {
        type: import('vue').PropType<"text" | "table" | "link" | "codeBlock" | "image" | "video" | "orderList" | "unorderList">;
        default: string;
        validator(value: any): boolean;
    };
    config: {
        type: import('vue').PropType<import('../..').ToolbarConfigType>;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: "link" | "text" | "orderList" | "unorderList" | "table" | "video" | "image" | "codeBlock";
    color: string;
    zIndex: number;
    modelValue: boolean;
    node: string | HTMLElement;
    scrollNode: string | HTMLElement;
    config: import('../..').ToolbarConfigType;
}, {}>;
export default _default;
