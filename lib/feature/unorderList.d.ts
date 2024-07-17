import { MenuButtonType } from '../core/tool';

/**
 * 工具栏 - 无序列表
 */
export declare const UnorderListToolbar: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    tooltip: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    tooltip: boolean;
} & {}, import('vue').PublicProps>;
/**
 * 菜单栏 - 无序列表
 */
export declare const UnorderListMenuButton: import('vue').DefineSetupFnComponent<{
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
