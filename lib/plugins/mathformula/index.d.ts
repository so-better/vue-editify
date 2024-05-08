import { PluginType } from '../../core/tool';

export type MathformulaOptionsType = {
    sequence?: number;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
};
/**
 * 数学公式插件
 * @param options
 * @returns
 */
export declare const mathformula: (options?: MathformulaOptionsType) => PluginType;
