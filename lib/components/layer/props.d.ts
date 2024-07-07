import { ExtractPublicPropTypes, PropType } from 'vue';

export type LayerPlacementType = 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export type LayerAnimationType = 'translate' | 'fade' | null;
export declare const LayerProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    node: {
        type: PropType<string | HTMLElement | null>;
        default: null;
    };
    scrollNode: {
        type: PropType<string | HTMLElement | null>;
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
        type: PropType<LayerPlacementType>;
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
        type: PropType<LayerAnimationType>;
        default: null;
        validator(value: any): boolean;
    };
    useRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    insideElements: {
        type: PropType<HTMLElement[]>;
        default: () => never[];
    };
};
export type LayerPropsType = ExtractPublicPropTypes<typeof LayerProps>;
