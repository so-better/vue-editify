import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const UpdateLinkProps: {
    color: {
        type: PropType<string | null>;
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
