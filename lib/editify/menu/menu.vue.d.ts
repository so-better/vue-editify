import { Ref, ComponentPublicInstance } from 'vue';
import { Button } from '../../components/button';

type MenuItemComponentPublicInstance = ComponentPublicInstance & {
    btnRef: InstanceType<typeof Button>;
};
declare const _default: import('vue').DefineComponent<{
    config: {
        type: import('vue').PropType<import('../../core/tool').MenuConfigType>;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
    height: Ref<number>;
    menuItemRefs: Ref<{
        [name: string]: MenuItemComponentPublicInstance;
    }>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    config: {
        type: import('vue').PropType<import('../../core/tool').MenuConfigType>;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    color: string;
    zIndex: number;
    config: import('../../core/tool').MenuConfigType;
}, {}>;
export default _default;
