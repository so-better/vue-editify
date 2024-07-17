import { AlexEditor, AlexElement } from 'alex-editor';
import { LanguagesItemType } from '../hljs';

/**
 * 有序列表和无序列表的格式化处理
 * @param editor
 * @param element
 */
export declare const listHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 图片格式化处理
 * @param editor
 * @param element
 */
export declare const imageHandle: (_editor: AlexEditor, element: AlexElement) => void;
/**
 * 视频格式化处理
 * @param editor
 * @param element
 */
export declare const videoHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 分隔线格式化处理
 * @param editor
 * @param element
 */
export declare const separatorHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 链接格式化处理
 * @param editor
 * @param element
 */
export declare const linkHandle: (_editor: AlexEditor, element: AlexElement) => void;
/**
 * 行内代码格式化处理
 * @param _editor
 * @param element
 */
export declare const codeHandle: (_editor: AlexEditor, element: AlexElement) => void;
/**
 * 表格格式化处理
 * @param editor
 * @param element
 */
export declare const tableHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 代码块格式化处理
 * @param editor
 * @param element
 * @param highlight
 * @param languages
 */
export declare const preHandle: (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) => void;
/**
 * 附件格式化处理
 * @param editor
 * @param element
 * @param $editTrans
 */
export declare const attachmentHandle: (editor: AlexEditor, element: AlexElement, $editTrans: (key: string) => any) => void;
/**
 * 数学公式格式化处理
 * @param editor
 * @param element
 */
export declare const mathformulaHandle: (editor: AlexEditor, element: AlexElement) => void;
/**
 * 信息块格式化处理
 * @param editor
 * @param element
 * @param color
 */
export declare const infoBlockHandle: (_editor: AlexEditor, element: AlexElement, color: string) => void;
/**
 * 一些特殊的内部块元素，转为根级块元素
 * @param editor
 * @param element
 */
export declare const specialInblockHandle: (editor: AlexEditor, element: AlexElement) => void;
