declare const _default: import('vue').DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    presetText: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    insert: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    presetText: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onInsert?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    presetText: string;
}, {}>;
export default _default;
