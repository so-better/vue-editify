import { PluginType } from '../../core/tool';
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';

export type MathformulaOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
};
/**
 * 是否公式元素
 * @param el
 * @returns
 */
export declare const isMathformula: (el: AlexElement) => any;
export declare const isUnderMathformula: (el: AlexElement) => boolean;
export declare const getMathformulaElement: (el: AlexElement) => AlexElement | null;
/**
 * 选区是否含有公式元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasMathformulaInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 数学公式插件
 * @param options
 * @returns
 */
export declare const mathformula: (options?: MathformulaOptionsType) => PluginType;
