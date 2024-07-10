import { MenuMathformulaButtonType } from '../core/tool';

/**
 * 数学公式额外保留的标签
 */
export declare const extraKeepTagsForMathformula: string[];
/**
 * 菜单栏 - 插入数学公式
 */
export declare const MathformulaMenuButton: import('vue').DefineSetupFnComponent<{
    color: string;
    zIndex: number;
    config: MenuMathformulaButtonType;
    tooltip: boolean;
    disabled: boolean;
}, {}, {}, {
    color: string;
    zIndex: number;
    config: MenuMathformulaButtonType;
    tooltip: boolean;
    disabled: boolean;
} & {}, import('vue').PublicProps>;
