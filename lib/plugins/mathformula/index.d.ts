import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';
import { PluginType } from '../../core/tool';

export type MathformulaOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
    handleError?: (error: Error) => void;
};
/**
 * 是否公式元素
 * @param el
 * @returns
 */
export declare const isMathformula: (el: AlexElement) => any;
/**
 * 判断某个元素是否在公式元素内
 * @param el
 * @returns
 */
export declare const isUnderMathformula: (el: AlexElement) => boolean;
/**
 * 根据某个元素获取所在的公式元素，如果不在公式元素内则返回null
 * @param el
 * @returns
 */
export declare const getMathformulaElement: (el: AlexElement) => AlexElement | null;
/**
 * 选区是否含有公式元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasMathformulaInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否在某个公式元素下，如果是返回该公式元素否则返回null
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const getMathformulaElementByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => AlexElement | null;
/**
 * 数学公式插件
 * @param options
 * @returns
 */
export declare const mathformula: (options?: MathformulaOptionsType) => PluginType;
