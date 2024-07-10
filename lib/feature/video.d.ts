import { MenuVideoButtonType } from '../core/tool';

export type VideoConfigType = {
    controls: boolean;
    loop: boolean;
    autoplay: boolean;
    muted: boolean;
};
/**
 * 工具栏 - 视频操作
 */
export declare const VideoToolbar: import('vue').DefineSetupFnComponent<{
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
 * 菜单栏 - 插入视频
 */
export declare const VideoMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuVideoButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuVideoButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
