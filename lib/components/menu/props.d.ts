import { ExtractPublicPropTypes, PropType } from 'vue';
import { MenuConfigType } from '../../core/tool';

export declare const MenuProps: {
    config: {
        type: PropType<MenuConfigType>;
        default: null;
    };
    color: {
        type: PropType<string | null>;
        default: string;
    };
};
export type MenuPropsType = ExtractPublicPropTypes<typeof MenuProps>;
