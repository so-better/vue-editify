import { MenuTableButtonType } from '../core/tool';

/**
 * 工具栏 - 表格操作
 */
export declare const TableToolbar: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    tooltip: boolean;
}, "reset-toolbar"[], {}, {
    color: string;
    zIndex: number;
    tooltip: boolean;
} & {
    "onReset-toolbar"?: ((...args: any[]) => any) | undefined;
}, import('vue').PublicProps>;
/**
 * 菜单栏 - 插入表格
 */
export declare const TableMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuTableButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuTableButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
