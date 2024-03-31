import { ExtractPublicPropTypes, PropType } from 'vue';

export type TrianglePlacementType = 'top' | 'left' | 'right' | 'bottom';
export declare const TriangleProps: {
    placement: {
        type: PropType<TrianglePlacementType>;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
};
export type TrianglePropsType = ExtractPublicPropTypes<typeof TriangleProps>;
