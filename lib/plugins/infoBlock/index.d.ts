import { PluginType } from '../../core/tool';
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';

export type InfoBlockOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
};
/**
 * 是否信息元素
 * @param el
 * @returns
 */
export declare const isInfoBlock: (el: AlexElement) => any;
/**
 * 判断某个元素是否在信息元素内
 * @param el
 * @returns
 */
export declare const isUnderInfoBlock: (el: AlexElement) => boolean;
/**
 * 根据某个元素获取所在的信息元素，如果不在信息元素内则返回null
 * @param el
 * @returns
 */
export declare const getInfoBlockElement: (el: AlexElement) => AlexElement | null;
/**
 * 选区是否含有信息元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasInfoBlockInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否都在信息块内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInInfoBlock: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否在某个信息元素下，如果是返回该信息元素否则返回null
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const getInfoBlockElementByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => AlexElement | null;
/**
 * 信息插件
 * @param options
 * @returns
 */
export declare const infoBlock: (options?: InfoBlockOptionsType) => PluginType;
