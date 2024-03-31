import { ExtractPublicPropTypes } from 'vue';

export declare const InsertLinkProps: {
    color: {
        type: StringConstructor;
        default: string;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
};
export type InsertLinkPropsType = ExtractPublicPropTypes<typeof InsertLinkProps>;
