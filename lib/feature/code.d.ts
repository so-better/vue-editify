import { MenuButtonType } from '../core/tool';

/**
 * 工具栏 - 行内代码
 */
export declare const CodeToolbarButton: import('vue').DefineSetupFnComponent<{
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
 * 菜单栏 - 行内代码
 */
export declare const CodeMenuButton: import('vue').DefineSetupFnComponent<{
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
