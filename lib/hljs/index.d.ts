
/**
 * 语言选项类型
 */
export type LanguagesItemType = {
    label?: string;
    value?: string;
};
/**
 * 可选择语言列表
 */
export declare const languages: LanguagesItemType[];
/**
 * 获取经过hljs处理的html元素
 * @param code
 * @param language
 * @returns
 */
export declare const getHljsHtml: (code: string, language: string) => string;
