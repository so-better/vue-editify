import { ExtractPublicPropTypes } from 'vue';

export type InsertTableGridType = {
    x: number;
    y: number;
    inside: boolean;
};
export declare const InsertTableProps: {
    color: {
        type: StringConstructor;
        default: string;
    };
    maxRows: {
        type: NumberConstructor;
        default: number;
    };
    maxColumns: {
        type: NumberConstructor;
        default: number;
    };
};
export type InsertTablePropsType = ExtractPublicPropTypes<typeof InsertTableProps>;
