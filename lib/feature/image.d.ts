import { MenuImageButtonType } from '../core/tool';

/**
 * 工具栏 - 图片操作
 */
export declare const ImageToolbar: import('vue').DefineSetupFnComponent<{
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
 * 菜单栏 - 插入图片
 */
export declare const ImageMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuImageButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuImageButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
