import { App, Component, ComponentInternalInstance, VNode } from 'vue';
import { AlexElement } from 'alex-editor';
import { ButtonOptionsItemType, ButtonTypeType } from '../components/button/props';
import { LocaleType } from '../locale';
import { InsertImageUploadErrorType } from '../components/insertImage/props';
import { default as Button } from '../components/button/button.vue';

export type ObjectType = {
    [key: string]: any;
};
export type ButtonOptionsConfigType = {
    heading?: (string | number | ButtonOptionsItemType)[];
    indent?: (string | number | ButtonOptionsItemType)[];
    align?: (string | number | ButtonOptionsItemType)[];
    fontSize?: (string | number | ButtonOptionsItemType)[];
    fontFamily?: (string | number | ButtonOptionsItemType)[];
    lineHeight?: (string | number | ButtonOptionsItemType)[];
    foreColor?: (string | number | ButtonOptionsItemType)[];
    backColor?: (string | number | ButtonOptionsItemType)[];
};
export interface MenuButtonType {
    show?: boolean;
    leftBorder?: boolean;
    rightBorder?: boolean;
}
export interface MenuSelectButtonType extends MenuButtonType {
    options?: (string | number | ButtonOptionsItemType)[];
    width?: number | '';
    maxHeight?: number | '';
}
export interface MenuDisplayButtonType extends MenuSelectButtonType {
    defaultValue?: string | number;
}
export interface MenuImageButtonType extends MenuButtonType {
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number | null;
    minSize?: number | null;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>) | null;
    handleError?: ((error: InsertImageUploadErrorType, file: File) => void) | null;
}
export interface MenuVideoButtonType extends MenuButtonType {
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number | null;
    minSize?: number | null;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>) | null;
    handleError?: ((error: InsertImageUploadErrorType, file: File) => void) | null;
}
export interface MenuTableButtonType extends MenuButtonType {
    maxRows?: number;
    maxColumns?: number;
}
export type MenuCustomButtonType = {
    type?: ButtonTypeType;
    title?: string;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
    active?: boolean;
    width?: number;
    maxHeight?: number;
    options?: ButtonOptionsItemType[];
    value?: string | number;
    hideScroll?: boolean;
    onLayerShow?: (name: string, btnInstance: InstanceType<typeof Button>) => void;
    onLayerShown?: (name: string, btnInstance: InstanceType<typeof Button>) => void;
    onLayerHidden?: (name: string, btnInstance: InstanceType<typeof Button>) => void;
    onOperate?: (name: string, value: string | number | undefined, btnInstance: InstanceType<typeof Button>) => void;
    default?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode;
    layer?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode;
    option?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode;
};
export type CodeBlockToolbarType = {
    languages?: MenuSelectButtonType;
};
export type TextToolbarType = {
    heading?: MenuDisplayButtonType;
    align?: MenuSelectButtonType;
    orderList?: MenuButtonType;
    unorderList?: MenuButtonType;
    task?: MenuButtonType;
    bold?: MenuButtonType;
    italic?: MenuButtonType;
    strikethrough?: MenuButtonType;
    underline?: MenuButtonType;
    code?: MenuButtonType;
    super?: MenuButtonType;
    sub?: MenuButtonType;
    fontSize?: MenuDisplayButtonType;
    fontFamily?: MenuDisplayButtonType;
    lineHeight?: MenuDisplayButtonType;
    foreColor?: MenuSelectButtonType;
    backColor?: MenuSelectButtonType;
    formatClear?: MenuButtonType;
};
export type ToolbarConfigType = {
    use?: boolean;
    style?: ObjectType | null;
    tooltip?: boolean;
    codeBlock?: CodeBlockToolbarType;
    text?: TextToolbarType;
    extraDisabled?: ((name: string) => boolean) | null;
};
export type MenuSequenceType = {
    [key: string]: number | undefined;
    undo?: number;
    redo?: number;
    heading?: number;
    indent?: number;
    quote?: number;
    align?: number;
    orderList?: number;
    unorderList?: number;
    task?: number;
    bold?: number;
    underline?: number;
    italic?: number;
    strikethrough?: number;
    code?: number;
    super?: number;
    sub?: number;
    formatClear?: number;
    fontSize?: number;
    fontFamily?: number;
    lineHeight?: number;
    foreColor?: number;
    backColor?: number;
    link?: number;
    image?: number;
    video?: number;
    table?: number;
    codeBlock?: number;
    sourceView?: number;
    fullScreen?: number;
};
export type MenuModeType = 'default' | 'inner' | 'fixed';
export type MenuExtendType = {
    [name: string]: MenuCustomButtonType;
};
export type MenuConfigType = {
    use?: boolean;
    tooltip?: boolean;
    mode?: MenuModeType;
    extraDisabled?: ((name: string) => boolean) | null;
    style?: ObjectType | null;
    sequence?: MenuSequenceType;
    undo?: MenuButtonType;
    redo?: MenuButtonType;
    heading?: MenuDisplayButtonType;
    indent?: MenuSelectButtonType;
    quote?: MenuButtonType;
    separator?: MenuButtonType;
    align?: MenuSelectButtonType;
    orderList?: MenuButtonType;
    unorderList?: MenuButtonType;
    task?: MenuButtonType;
    bold?: MenuButtonType;
    underline?: MenuButtonType;
    italic?: MenuButtonType;
    strikethrough?: MenuButtonType;
    code?: MenuButtonType;
    super?: MenuButtonType;
    sub?: MenuButtonType;
    formatClear?: MenuButtonType;
    fontSize?: MenuDisplayButtonType;
    fontFamily?: MenuDisplayButtonType;
    lineHeight?: MenuDisplayButtonType;
    foreColor?: MenuSelectButtonType;
    backColor?: MenuSelectButtonType;
    link?: MenuButtonType;
    image?: MenuImageButtonType;
    video?: MenuVideoButtonType;
    table?: MenuTableButtonType;
    codeBlock?: MenuButtonType;
    sourceView?: MenuButtonType;
    fullScreen?: MenuButtonType;
    extends?: MenuExtendType;
};
export type PluginMenuConfigType = {
    extraDisabled?: ((name: string) => boolean) | null;
    sequence: number;
    extend: MenuCustomButtonType;
};
export type PluginResultType = {
    name: string;
    menu?: PluginMenuConfigType;
    updateView?: () => void;
    customParseNode?: (element: AlexElement) => AlexElement;
    extraKeepTags?: string[];
    renderRule?: (el: AlexElement) => void;
    pasteKeepMarks?: (el: AlexElement) => ObjectType;
    pasteKeepStyles?: (el: AlexElement) => ObjectType;
};
export type PluginType = (editifyInstance: ComponentInternalInstance, editTrans: (key: string) => any) => PluginResultType;
export type SFCWithInstall<T> = T & {
    install(app: App): void;
};
/**
 * 对象平替值方法
 * @param o1
 * @param o2
 * @returns
 */
export declare const mergeObject: (o1: ObjectType, o2: ObjectType) => ObjectType | null;
/**
 * 判断对象是否含有某个属性或者属性值是否一致
 * @param obj
 * @param name
 * @param value
 * @returns
 */
export declare const queryHasValue: (obj: ObjectType, name: string, value?: string | number) => boolean;
/**
 * 深拷贝函数
 * @param data
 * @returns
 */
export declare const cloneData: (data: any) => any;
/**
 * 获取菜单按钮列表数据配置
 * @param editTrans
 * @returns
 */
export declare const getButtonOptionsConfig: (editTrans: (key: string) => any) => ButtonOptionsConfigType;
/**
 * 工具条全量配置
 * @param editTrans
 * @param editLocale
 * @returns
 */
export declare const getToolbarConfig: (editTrans: (key: string) => any, editLocale: LocaleType) => ToolbarConfigType;
/**
 * 菜单栏全量配置
 * @param editTrans
 * @param editLocale
 * @returns
 */
export declare const getMenuConfig: (editTrans: (key: string) => any, editLocale: LocaleType) => MenuConfigType;
/**
 * 给组件增加install属性
 * @param component
 * @returns
 */
export declare const withInstall: <T extends Component>(component: T) => SFCWithInstall<T>;
