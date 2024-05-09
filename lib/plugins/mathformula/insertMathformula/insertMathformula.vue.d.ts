declare const _default: import('vue').DefineComponent<{
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    defaultLaTexContent: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    insert: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: import('vue').PropType<string | null>;
        default: string;
    };
    defaultLaTexContent: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onInsert?: ((...args: any[]) => any) | undefined;
}, {
    color: string | null;
    defaultLaTexContent: string;
}, {}>;
export default _default;
