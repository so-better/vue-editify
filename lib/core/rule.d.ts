import { LanguagesItemType } from '../hljs';
import { AlexEditor, AlexElement } from 'alex-editor';

/**
 * 元素格式化时转换ol和li标签
 * @param editor
 * @param element
 */
export declare const parseList: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理有序列表的序号值
 * @param editor
 * @param element
 */
export declare const orderdListHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理常规元素（图片、视频、分隔线、行内代码）
 * @param editor
 * @param element
 */
export declare const commonElementHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理表格
 * @param editor
 * @param element
 */
export declare const tableHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 元素格式化时处理pre，将pre的内容根据语言进行样式处理
 * @param editor
 * @param element
 * @param highlight
 * @param languages
 */
export declare const preHandle: (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) => void;
/**
 * 元素格式化时处理一些特殊的内部块元素，转为根级块元素
 * @param editor
 * @param element
 */
export declare const specialInblockHandle: (editor: AlexEditor, element: AlexElement) => void;
