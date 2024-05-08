declare const _default: import('vue').DefineComponent<{
    placement: {
        type: import('vue').PropType<import('./props').TrianglePlacementType>;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    placement: {
        type: import('vue').PropType<import('./props').TrianglePlacementType>;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
}>>, {
    placement: import('./props').TrianglePlacementType;
    color: string;
    background: string;
}, {}>;
export default _default;
