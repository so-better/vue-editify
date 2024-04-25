import { ExtractPublicPropTypes, PropType } from 'vue';

export type InsertTableGridType = {
    x: number;
    y: number;
    inside: boolean;
};
export declare const InsertTableProps: {
    color: {
        type: PropType<string | null>;
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
