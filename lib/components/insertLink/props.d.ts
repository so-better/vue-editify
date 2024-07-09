import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const InsertLinkProps: {
    color: {
        type: PropType<string | null>;
        default: string;
    };
    presetText: {
        type: StringConstructor;
        default: string;
    };
};
export type InsertLinkPropsType = ExtractPublicPropTypes<typeof InsertLinkProps>;
