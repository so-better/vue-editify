import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';
import { ObjectType } from './tool';

export type ElementMatchConfigType = {
    parsedom?: string;
    marks?: ObjectType;
    styles?: ObjectType;
};
/**
 * 清空单元格的内容并隐藏
 * @param editor
 * @param cell
 */
export declare const setTableCellMerged: (cell: AlexElement) => void;
/**
 * 判断被隐藏的单元格是属于跨行的单元格还是跨列的单元格，返回跨行或者跨列的单元格
 * @param editor
 * @param cell
 * @returns
 */
export declare const getCellMergeElement: (editor: AlexEditor, cell: AlexElement) => {
    crossRowElement: AlexElement | null;
    crossColumnElement: AlexElement | null;
};
/**
 * 获取某个单元格的rowspan和colspan值
 * @param cell
 * @returns
 */
export declare const getCellSpanNumber: (cell: AlexElement) => {
    rowspan: number;
    colspan: number;
};
/**
 * 获取表格规格：行数和列数
 * @param rowElements
 * @returns
 */
export declare const getTableSize: (rowElements: AlexElement[]) => {
    rowNumber: number;
    columnNumber: number;
};
/**
 * Open API：判断元素是否符合指定的条件
 * @param element
 * @param config
 * @returns
 */
export declare const elementIsMatch: (element: AlexElement, config: ElementMatchConfigType) => boolean;
/**
 * Open API：判断元素是否在符合条件的元素下，如果是返回符合条件的元素，否则返回null
 * @param element
 * @param config
 * @returns
 */
export declare const getMatchElementByElement: (element: AlexElement, config: ElementMatchConfigType) => AlexElement | null;
/**
 * Open API：判断光标范围内的元素是否在同一个符合条件的元素下，如果是返回那个符合条件的元素，否则返回null
 * @param editor
 * @param dataRangeCaches
 * @param config
 * @returns
 */
export declare const getMatchElementByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, config: ElementMatchConfigType) => AlexElement | null;
/**
 * Open API：判断元素是否有序或者无序列表
 * @param element
 * @param ordered
 * @returns
 */
export declare const isList: (element: AlexElement, ordered?: boolean | undefined) => boolean;
/**
 * Open API：判断元素是否任务列表
 * @param element
 * @returns
 */
export declare const isTask: (element: AlexElement) => boolean;
/**
 * Open API：判断元素是否在有序列表或者无序列表下
 * @param element
 * @param ordered
 * @returns
 */
export declare const elementIsInList: (element: AlexElement, ordered: boolean) => boolean;
/**
 * Open API：判断元素是否在任务列表下
 * @param element
 * @returns
 */
export declare const elementIsInTask: (element: AlexElement) => boolean;
/**
 * Open API：选区是否含有代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasPreInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasQuoteInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有有序列表或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const hasListInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/**
 * Open API：选区是否含有任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTaskInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有链接
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasLinkInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有表格
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTableInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有图片
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasImageInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有视频
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasVideoInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否全部在引用内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInQuote: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否全部在有序列表或者无序列表内
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const isRangeInList: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/**
 * Open API：选区是否全部在任务列表里
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInTask: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：查询光标所在的文本元素是否具有某个样式
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export declare const queryTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => boolean;
/**
 * Open API：查询光标所在的文本元素是否具有某个标记
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export declare const queryTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => boolean;
/**
 * Open API：获取选区内的文字内容，用于预置链接文字
 * @param dataRangeCaches
 * @returns
 */
export declare const getRangeText: (dataRangeCaches: AlexElementsRangeType) => string;
/**
 * 获取光标选取内的扁平化元素数组(可能会分割文本元素导致stack变更，同时也会更新选取元素和光标位置)
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const getFlatElementsByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => AlexElement[];
/**
 * 将某个元素转为段落标签
 * @param element
 */
export declare const elementToParagraph: (element: AlexElement) => void;
/**
 * 其他元素转为有序或者无序列表
 * @param element
 * @param ordered
 * @returns
 */
export declare const elementToList: (element: AlexElement, ordered?: boolean | undefined) => void;
/**
 * 其他元素转为任务列表
 * @param element
 * @returns
 */
export declare const elementToTask: (element: AlexElement) => void;
/**
 * 设置标题
 * @param editor
 * @param dataRangeCaches
 * @param editTrans
 * @param parsedom
 * @returns
 */
export declare const setHeading: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, editTrans: (key: string) => any, parsedom: string) => void;
/**
 * Open API：根级块元素或者内部块元素增加缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setIndentIncrease: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：根级块元素或者内部块元素减少缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setIndentDecrease: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：插入或者取消引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setQuote: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：设置对齐方式
 * @param editor
 * @param dataRangeCaches
 * @param value 取值justify/left/right/center
 * @returns
 */
export declare const setAlign: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: "justify" | "left" | "right" | "center") => void;
/**
 * Open API：插入或者取消 有序或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered 为true表示有序列表
 * @returns
 */
export declare const setList: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered: boolean) => void;
/**
 * Open API：插入或者取消任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setTask: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：设置文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styles 值为{ 'font-weight':'bold' }这类格式
 * @returns
 */
export declare const setTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styles: ObjectType) => void;
/**
 * Open API：设置文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param marks 值为{ 'class':'a' }这类格式
 * @returns
 */
export declare const setTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, marks: ObjectType) => void;
/**
 * Open API：移除文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styleNames 样式名称数组，如果不存在则移除全部样式
 * @returns
 */
export declare const removeTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styleNames?: string[]) => void;
/**
 * Open API：移除文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param markNames 标记名称数组，如果不存在则移除全部标记
 * @returns
 */
export declare const removeTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, markNames?: string[]) => void;
/**
 * Open API：设置块元素或者根级块元素的行高
 * @param editor
 * @param dataRangeCaches
 * @param value
 * @returns
 */
export declare const setLineHeight: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: string | number) => void;
/**
 * Open API：插入链接
 * @param editor
 * @param text 链接名称
 * @param url 链接地址
 * @param newOpen 是否新窗口打开
 * @returns
 */
export declare const insertLink: (editor: AlexEditor, text: string, url: string, newOpen: boolean) => void;
/**
 * Open API：插入图片
 * @param editor
 * @param value 图片地址
 * @returns
 */
export declare const insertImage: (editor: AlexEditor, value: string) => void;
/**
 * Open API：插入视频
 * @param editor
 * @param value 视频地址
 * @returns
 */
export declare const insertVideo: (editor: AlexEditor, value: string) => void;
/**
 * Open API：插入表格
 * @param editor
 * @param rowLength 表格行数
 * @param colLength 表格列数
 * @returns
 */
export declare const insertTable: (editor: AlexEditor, rowLength: number, colLength: number) => void;
/**
 * Open API：插入或者取消代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const insertCodeBlock: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：插入分隔线
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const insertSeparator: (editor: AlexEditor) => void;
