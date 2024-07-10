import { ExtractPublicPropTypes } from 'vue';

export declare const UpdateLinkProps: {
    color: {
        type: StringConstructor;
        default: string;
    };
    presetUrl: {
        type: StringConstructor;
        default: string;
    };
    presetNewOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type UpdateLinkPropsType = ExtractPublicPropTypes<typeof UpdateLinkProps>;
