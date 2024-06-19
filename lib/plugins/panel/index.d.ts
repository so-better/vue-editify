import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';
import { PluginType } from '../../core/tool';

export type PanelOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
};
/**
 * 是否面板元素
 * @param el
 * @returns
 */
export declare const isPanel: (el: AlexElement) => any;
/**
 * 判断某个元素是否在面板元素内
 * @param el
 * @returns
 */
export declare const isUnderPanel: (el: AlexElement) => boolean;
/**
 * 根据某个元素获取所在的面板元素，如果不在面板元素内则返回null
 * @param el
 * @returns
 */
export declare const getPanelElement: (el: AlexElement) => AlexElement | null;
/**
 * 选区是否含有面板元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasPanelInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否在某个面板元素下，如果是返回该面板元素否则返回null
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const getPanelElementByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => AlexElement | null;
/**
 * 面板插件
 * @param options
 * @returns
 */
export declare const panel: (options?: PanelOptionsType) => PluginType;
