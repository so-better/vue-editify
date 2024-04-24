import { default as Button } from '../components/button/button.vue';
import { VNode } from 'vue';
import { InsertImageUploadErrorType } from '../components/insertImage/props';
import { LocaleType } from '../locale';
import { ButtonOptionsItemType, ButtonTypeType } from '../components/button/props';
import { AlexElement } from 'alex-editor';

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
    accept?: string[];
    multiple?: boolean;
    maxSize?: number | null;
    minSize?: number | null;
    customUpload?: (((files: File[]) => string[]) | Promise<string[]>) | null;
    handleError?: ((error: InsertImageUploadErrorType, file: File) => void) | null;
}
export interface MenuVideoButtonType extends MenuButtonType {
    accept?: string[];
    multiple?: boolean;
    maxSize?: number | null;
    minSize?: number | null;
    customUpload?: (((files: File[]) => string[]) | Promise<string[]>) | null;
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
    default?: () => VNode;
    layer?: () => VNode;
    option?: () => VNode;
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
    extends?: {
        [name: string]: MenuCustomButtonType;
    };
};
export declare const pasteKeepData: ObjectType;
export declare const mergeObject: (o1: ObjectType, o2: ObjectType) => ObjectType | null;
export declare const queryHasValue: (obj: ObjectType, name: string, value?: string | number) => boolean;
export declare const cloneData: (data: any) => any;
export declare const getColNumbers: (row: AlexElement) => number;
export declare const getButtonOptionsConfig: (editTrans: (key: string) => any) => ButtonOptionsConfigType;
export declare const getToolbarConfig: (editTrans: (key: string) => any, editLocale: LocaleType) => ToolbarConfigType;
export declare const getMenuConfig: (editTrans: (key: string) => any, editLocale: LocaleType) => MenuConfigType;
