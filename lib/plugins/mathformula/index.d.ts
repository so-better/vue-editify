import { PluginType } from '../../core/tool';
import { AlexElement } from 'alex-editor';

export type MathformulaOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
};
/**
 * 是否公式元素
 * @param el
 * @returns
 */
export declare const isMathformula: (el: AlexElement) => any;
export declare const isUnderMathformula: (el: AlexElement) => boolean;
/**
 * 数学公式插件
 * @param options
 * @returns
 */
export declare const mathformula: (options?: MathformulaOptionsType) => PluginType;
