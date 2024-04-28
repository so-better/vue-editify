export type LocaleType = 'zh_CN' | 'en_US';
/**
 * 翻译方法
 * @param locale
 * @returns
 */
export declare const trans: (locale: LocaleType) => (key: string) => any;
