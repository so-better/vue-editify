import { MenuButtonType } from '../core/tool';

/**
 * 工具栏 - 下标
 */
export declare const SubToolbarButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuButtonType;
    tooltip: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuButtonType;
    tooltip: boolean;
} & {}, import('vue').PublicProps>;
/**
 * 菜单栏 - 下标
 */
export declare const SubMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
