declare const _default: import('vue').DefineComponent<{
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    remove: (...args: any[]) => void;
    modify: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}>> & {
    onRemove?: ((...args: any[]) => any) | undefined;
    onModify?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    presetUrl: string;
    presetNewOpen: boolean;
}, {}>;
export default _default;
