import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor';
import { ObjectType } from './tool';

export type ElementMatchConfigType = {
    parsedom?: string;
    marks?: ObjectType;
    styles?: ObjectType;
};
/** --------------------------------代码块操作相关函数------------------------------------------------------------------------ */
/**
 * 更新代码块内的光标位置
 * @param editor
 * @param element
 * @param originalTextElements
 * @param newElements
 * @returns
 */
export declare const updateRangeInPre: (editor: AlexEditor, element: AlexElement, originalTextElements: AlexElement[], newElements: AlexElement[]) => void;
/** --------------------------------表格操作相关函数------------------------------------------------------------------------ */
/**
 * 自动隐藏被合并的单元格
 * @param editor
 * @param rowElements
 */
export declare const autoHideMergedTableCells: (editor: AlexEditor, rowElements: AlexElement[]) => void;
/**
 * 自动补全表格行和列
 * @param editor
 * @param rowElements
 * @param rowNumber
 * @param columnNumber
 */
export declare const autocompleteTableCells: (editor: AlexEditor, rowElements: AlexElement[], rowNumber: number, columnNumber: number) => void;
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
/** --------------------------------通用的元素判断函数------------------------------------------------------------------------ */
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
/** --------------------------------列表判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否有序或者无序列表，不做空元素判断
 * @param element
 * @param ordered
 * @returns
 */
export declare const elementIsList: (element: AlexElement, ordered?: boolean | undefined) => boolean;
/**
 * Open API：判断元素是否在有序列表或者无序列表下，是的话返回有序列表或者无序列表元素，否则返回null
 * @param element
 * @param ordered
 * @returns
 */
export declare const getListByElement: (element: AlexElement, ordered: boolean) => AlexElement | null;
/**
 * Open API：选区是否含有有序列表或者无序列表，不一定是同一个有序列表或者序列表，只要含有有序列表或者序列表即返回true
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const hasListInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/**
 * Open API：选区是否全部在有序列表或者无序列表内，不一定是同一个有序列表或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export declare const rangeIsInList: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered?: boolean | undefined) => boolean;
/** --------------------------------任务列表判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否任务列表，不做空元素判断
 * @param element
 * @returns
 */
export declare const elementIsTask: (element: AlexElement) => boolean;
/**
 * Open API：判断元素是否在任务列表下，是的话返回任务列表元素，否则返回null
 * @param element
 * @returns
 */
export declare const getTaskByElement: (element: AlexElement) => AlexElement | null;
/**
 * Open API：选区是否含有任务列表，不一定是同一个任务列表，只要含有任务列表即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTaskInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否全部在任务列表里，不一定是同一个任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const rangeIsInTask: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------附件判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否附件，不做空元素判断
 * @param element
 * @returns
 */
export declare const elementIsAttachment: (element: AlexElement) => boolean;
/**
 * Open API：选区是否含有附件，不一定是同一个附件，只要含有附件即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasAttachmentInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------数学公式判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否数学公式，不做空元素判断
 * @param element
 * @returns
 */
export declare const elementIsMathformula: (element: AlexElement) => boolean;
/**
 * Open API：判断元素是否在数学公式下，是的话返回数学公式元素，否则返回null
 * @param element
 * @returns
 */
export declare const getMathformulaByElement: (element: AlexElement) => AlexElement | null;
/**
 * Open API：选区是否含有数学公式，不一定是同一个数学公式，只要含有数学公式即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasMathformulaInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------面板判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否面板，不做空元素判断
 * @param el
 * @returns
 */
export declare const elementIsPanel: (element: AlexElement) => boolean;
/**
 * Open API：判断元素是否在面板内，是的话返回面板元素，否则返回null
 * @param el
 * @returns
 */
export declare const getPanelByElement: (element: AlexElement) => AlexElement | null;
/**
 * Open API：选区是否含有面板，不一定是同一个面板，只要含有面板即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasPanelInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------信息块判断函数------------------------------------------------------------------------ */
/**
 * Open API：判断元素是否信息块，不做空元素判断
 * @param el
 * @returns
 */
export declare const elementIsInfoBlock: (element: AlexElement) => boolean;
/**
 * Open API：判断元素是否在信息块内，是的话返回信息块元素，否则返回null
 * @param el
 * @returns
 */
export declare const getInfoBlockByElement: (element: AlexElement) => AlexElement | null;
/**
 * Open API：选区是否含有信息块，不一定是同一个信息块，只要含有信息块即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasInfoBlockInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否全部在信息块里，不一定是同一个信息块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const rangeIsInInfoBlock: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------代码块判断函数------------------------------------------------------------------------ */
/**
 * Open API：选区是否含有代码块，不一定是同一个代码块，只要含有代码块即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasPreInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------表格判断函数------------------------------------------------------------------------ */
/**
 * Open API：选区是否含有表格，不一定是同一个表格，只要含有表格即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasTableInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------引用判断函数------------------------------------------------------------------------ */
/**
 * Open API：选区是否含有引用，不一定是同一个引用，只要含有引用即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasQuoteInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否全部在引用内，不一定是同一个引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const rangeIsInQuote: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------链接判断函数------------------------------------------------------------------------ */
/**
 * Open API：选区是否含有链接，不一定是同一个链接，只要含有链接即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasLinkInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------图片视频判断函数------------------------------------------------------------------------ */
/**
 * Open API：选区是否含有图片，不一定是同一个图片，只要含有图片即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasImageInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/**
 * Open API：选区是否含有视频，不一定是同一个视频，只要含有视频即返回true
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const hasVideoInRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => boolean;
/** --------------------------------文本元素标记和样式相关函数------------------------------------------------------------------------ */
/**
 * 获取光标选取内的扁平化元素数组(可能会分割文本元素导致stack变更，同时也会更新选取元素和光标位置)
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export declare const getFlatElementsByRange: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => AlexElement[];
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
 * Open API：设置文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styles 值为{ 'font-weight':'bold' }这类格式
 * @returns
 */
export declare const setTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styles: ObjectType) => void;
/**
 * Open API：移除文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styleNames 样式名称数组，如果不存在则移除全部样式
 * @returns
 */
export declare const removeTextStyle: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styleNames?: string[]) => void;
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
 * Open API：设置文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param marks 值为{ 'class':'a' }这类格式
 * @returns
 */
export declare const setTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, marks: ObjectType) => void;
/**
 * Open API：移除文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param markNames 标记名称数组，如果不存在则移除全部标记
 * @returns
 */
export declare const removeTextMark: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, markNames?: string[]) => void;
/** --------------------------------选区文字内容提取函数------------------------------------------------------------------------ */
/**
 * Open API：获取选区内的文字内容
 * @param dataRangeCaches
 * @returns
 */
export declare const getRangeText: (dataRangeCaches: AlexElementsRangeType) => string;
/** --------------------------------元素转换函数------------------------------------------------------------------------ */
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
/** --------------------------------菜单功能函数------------------------------------------------------------------------ */
/**
 * OpenAPI：设置标题，支持h1-h6和p
 * @param editor
 * @param dataRangeCaches
 * @param editTrans
 * @param parsedom
 * @returns
 */
export declare const setHeading: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, parsedom: string) => void;
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
 * Open API：设置内部块元素或者根级块元素的行高
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
/**
 * Open API：插入附件
 * @param editor
 * @param url 附件地址
 * @param name 附件名称
 */
export declare const insertAttachment: (editor: AlexEditor, url: string, name: string) => void;
/**
 * Open API：插入数学公式
 * @param editor
 * @param dataRangeCaches
 * @param mathContent 数学公式字符串
 * @param errorCallback 错误处理
 */
export declare const insertMathformula: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, mathContent: string, errorCallback?: (err: Error) => void) => void;
/**
 * Open API：插入信息块
 * @param editor
 * @param dataRangeCaches
 */
export declare const insertInfoBlock: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => void;
/**
 * Open API：插入面板
 * @param editor
 * @param panelTitle 面板标题
 * @param panelContent 面板内容
 */
export declare const insertPanel: (editor: AlexEditor, panelTitle: string, panelContent: string) => void;
