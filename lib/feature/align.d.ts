import { MenuSelectButtonType } from '../core/tool';

/**
 * 工具栏 - 对齐方式
 */
export declare const AlignToolbarButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuSelectButtonType;
    tooltip: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuSelectButtonType;
    tooltip: boolean;
} & {}, import('vue').PublicProps>;
/**
 * 菜单栏 - 对齐方式
 */
export declare const AlignMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuSelectButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuSelectButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
