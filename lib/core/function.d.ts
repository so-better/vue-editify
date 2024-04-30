import { ObjectType } from './tool';
import { AlexElement, AlexElementsRangeType, AlexEditor } from 'alex-editor';

/**
 * 判断元素是否在某个标签下，如果是返回该标签对应的元素，否则返回null
 * @param element
 * @param parsedom
 * @returns
 */
export declare const getParsedomElementByElement: (element: AlexElement, parsedom: string) => AlexElement | null;
/**
 * 获取光标是否在指定标签下，如果是返回该标签对应的元素，否则返回null
 * @param editor
 * @param dataRangeCaches
 * @param parsedom
 * @returns
 */
export declare const getCurrentParsedomElement: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, parsedom: string) => AlexElement | null;
/**
 * 判断元素是否在有序列表或者无序列表下
 * @param element
 * @param ordered
 * @returns
 */
export declare const elementIsInList: (element: AlexElement, ordered: boolean) => boolean;
/**
 * 判断元素是否在任务列表下
 * @param element
 * @returns
 */
export declare const elementIsInTask: (element: AlexElement) => boolean;
/**
 * 判断元素是否有序或者无序列表
 * @param element
 * @param ordered
 * @returns
 */
export declare const isList: (element: AlexElement, ordered?: boolean | undefined) => boolean;
/**
 * 判断元素是否任务列表
 * @param element
 * @returns
 */
export declare const isTask: (element: AlexElement) => boolean;
/**
 * 选区是否含有代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasPreInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否全部在代码块内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInPre: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasQuoteInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否全部在引用内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInQuote: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有有序列表或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const hasListInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/**
 * 选区是否全部在有序列表或者无序列表内
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const isRangeInList: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/**
 * 选区是否含有任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTaskInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否全部在任务列表里
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const isRangeInTask: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有链接
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasLinkInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有表格
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTableInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有图片
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasImageInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 选区是否含有视频
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasVideoInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * 查询光标所在的文本元素是否具有某个样式
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export declare const queryTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => boolean;
/**
 * 查询光标所在的文本元素是否具有某个标记
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export declare const queryTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => boolean;
/**
 * 获取选区内的文字内容，用于预置链接文字
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
 * 根级块元素或者内部块元素增加缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setIndentIncrease: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * 根级块元素或者内部块元素减少缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setIndentDecrease: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * 插入或者取消引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setQuote: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * 设置对齐方式，参数取值justify/left/right/center
 * @param editor
 * @param dataRangeCaches
 * @param value
 * @returns
 */
export declare const setAlign: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: string) => void;
/**
 * 插入或者取消 有序或者无序列表 ordered为true表示有序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const setList: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered: boolean) => void;
/**
 * 插入或者取消任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const setTask: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * 设置文本元素的样式，styles为{ 'font-weight':'bold' }这类格式
 * @param editor
 * @param dataRangeCaches
 * @param styles
 * @returns
 */
export declare const setTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styles: ObjectType) => void;
/**
 * 设置文本元素的标记，marks为{ 'class':'a' }这类格式
 * @param editor
 * @param dataRangeCaches
 * @param marks
 * @returns
 */
export declare const setTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, marks: ObjectType) => void;
/**
 * 移除文本元素的样式，styleNames是样式名称数组，如果不存在则移除全部样式
 * @param editor
 * @param dataRangeCaches
 * @param styleNames
 * @returns
 */
export declare const removeTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styleNames?: string[]) => void;
/**
 * 移除文本元素的标记，markNames是标记名称数组，如果不存在则移除全部标记
 * @param editor
 * @param dataRangeCaches
 * @param markNames
 * @returns
 */
export declare const removeTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, markNames?: string[]) => void;
/**
 * 设置块元素或者根级块元素的行高
 * @param editor
 * @param dataRangeCaches
 * @param value
 * @returns
 */
export declare const setLineHeight: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: string | number) => void;
/**
 * 插入链接
 * @param editor
 * @param text
 * @param url
 * @param newOpen
 * @returns
 */
export declare const insertLink: (editor: AlexEditor, text: string, url: string, newOpen: boolean) => void;
/**
 * 插入图片
 * @param editor
 * @param value
 * @returns
 */
export declare const insertImage: (editor: AlexEditor, value: string) => void;
/**
 * 插入视频
 * @param editor
 * @param value
 * @returns
 */
export declare const insertVideo: (editor: AlexEditor, value: string) => void;
/**
 * 插入表格
 * @param editor
 * @param rowLength
 * @param colLength
 * @returns
 */
export declare const insertTable: (editor: AlexEditor, rowLength: number, colLength: number) => void;
/**
 * 插入或者取消代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const insertCodeBlock: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * 插入分隔线
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const insertSeparator: (editor: AlexEditor) => void;
