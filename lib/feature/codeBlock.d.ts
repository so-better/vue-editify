import { MenuButtonType, MenuDisplayButtonType } from '../core/tool';

/**
 * 工具栏 - 代码块操作
 */
export declare const CodeBlockToolbar: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    tooltip: boolean;
    language: MenuDisplayButtonType;
}, {}, {}, {
    color: string;
    zIndex: number;
    tooltip: boolean;
    language: MenuDisplayButtonType;
} & {}, import('vue').PublicProps>;
/**
 * 菜单栏 - 插入代码块
 */
export declare const CodeBlockMenuButton: import('vue').DefineSetupFnComponent<{
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
