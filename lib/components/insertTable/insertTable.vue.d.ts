declare const _default: import('vue').DefineComponent<{
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    insert: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & {
    onInsert?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    maxRows: number;
    maxColumns: number;
}, {}>;
export default _default;
