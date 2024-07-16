import { AlexEditor, AlexElement } from 'alex-editor';
import { LanguagesItemType } from '../hljs';

/**
 * 元素格式化时转换ol和li标签
 * @param editor
 * @param element
 */
export declare const listHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理常规元素（图片、视频、分隔线、行内代码）
 * @param editor
 * @param element
 */
export declare const commonElementHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理表格：th转为td
 * @param editor
 * @param element
 */
export declare const tableThTdHandle: (_editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理表格：格式化表格
 * @param editor
 * @param element
 */
export declare const tableFormatHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理表格：处理光标在表格隐藏单元格内的情况
 * @param editor
 * @param element
 */
export declare const tableRangeMergedHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理pre，将pre的内容根据语言进行样式处理
 * @param editor
 * @param element
 * @param highlight
 * @param languages
 */
export declare const preHandle: (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) => void;
/**
 * 元素格式化时处理附件元素
 * @param editor
 * @param element
 * @param $editTrans
 */
export declare const attachmentHandle: (editor: AlexEditor, element: AlexElement, $editTrans: (key: string) => any) => void;
/**
 * 元素格式化时处理数学公式元素
 * @param editor
 * @param element
 */
export declare const mathformulaHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理信息块元素
 * @param editor
 * @param element
 * @param color
 */
export declare const infoBlockHandle: (_editor: AlexEditor, element: AlexElement, color: string) => void;
/**
 * 元素格式化时处理一些特殊的内部块元素，转为根级块元素
 * @param editor
 * @param element
 */
export declare const specialInblockHandle: (editor: AlexEditor, element: AlexElement) => void;
