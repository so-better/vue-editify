import { App, Component, Ref, VNode } from 'vue';
import { AlexEditor, AlexElementsRangeType } from 'alex-editor';
import { LocaleType } from '../locale';
import { Button, ButtonOptionsItemType, ButtonTypeType } from '../components/button';
import { InsertImageUploadErrorType } from '../components/insertImage';
import { InsertAttachmentUploadErrorType } from '../components/insertAttachment';

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
export type ShortcutType = {
    title: string;
    define: ((event: KeyboardEvent) => boolean | {
        [code: string]: boolean;
    }) | null;
    useDefault?: boolean;
    operation?: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, isSourceView: Ref<boolean>, isFullScreen: Ref<boolean>, code?: string) => void;
};
export interface MenuButtonType {
    show?: boolean;
    leftBorder?: boolean;
    rightBorder?: boolean;
    disabled?: boolean;
    shortcut?: ShortcutType;
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
    maxSize?: number;
    minSize?: number;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>);
    handleError?: (error: InsertImageUploadErrorType, file: File) => void;
}
export interface MenuVideoButtonType extends MenuButtonType {
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>);
    handleError?: (error: InsertImageUploadErrorType, file: File) => void;
}
export interface MenuTableButtonType extends MenuButtonType {
    maxRows?: number;
    maxColumns?: number;
}
export interface MenuAttachmentButtonType extends MenuButtonType {
    accept?: string;
    allowedFileType?: string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>);
    handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void;
}
export interface MenuMathformulaButtonType extends MenuButtonType {
    handleError?: (error: Error) => void;
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
    shortcut?: ShortcutType;
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
    bold?: MenuButtonType;
    italic?: MenuButtonType;
    strikethrough?: MenuButtonType;
    underline?: MenuButtonType;
    code?: MenuButtonType;
    super?: MenuButtonType;
    sub?: MenuButtonType;
    fontSize?: MenuDisplayButtonType;
    fontFamily?: MenuDisplayButtonType;
    foreColor?: MenuSelectButtonType;
    backColor?: MenuSelectButtonType;
    formatClear?: MenuButtonType;
};
export type ToolbarConfigType = {
    use?: boolean;
    style?: ObjectType;
    tooltip?: boolean;
    codeBlock?: CodeBlockToolbarType;
    text?: TextToolbarType;
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
    attachment?: number;
    mathformula?: number;
    infoBlock?: number;
};
export type MenuModeType = 'default' | 'inner' | 'fixed';
export type MenuExtendType = {
    [name: string]: MenuCustomButtonType;
};
export type MenuConfigType = {
    use?: boolean;
    tooltip?: boolean;
    mode?: MenuModeType;
    style?: ObjectType;
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
    attachment?: MenuAttachmentButtonType;
    mathformula?: MenuMathformulaButtonType;
    infoBlock?: MenuButtonType;
    extends?: MenuExtendType;
};
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
export declare const getToolbarConfig: (editTrans: (key: string) => any) => ToolbarConfigType;
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
export declare const withInstall: <T extends Component>(component: T) => SFCWithInstall<typeof component>;
/**
 * 是否点击了编辑器以外的元素
 * @param editor
 * @param el
 * @returns
 */
export declare const clickIsOut: (editor: HTMLElement, el: HTMLElement) => boolean;
