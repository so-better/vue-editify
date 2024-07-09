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
    color: string | null;
    zIndex: number;
    tooltip: boolean;
}, "reset-toolbar"[], {}, {
    color: string | null;
    zIndex: number;
    tooltip: boolean;
} & {
    "onReset-toolbar"?: ((...args: any[]) => any) | undefined;
}, import('vue').PublicProps>;
