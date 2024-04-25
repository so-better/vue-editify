import { LocaleType } from '../locale';
import { AlexElement } from 'alex-editor';
import { PluginType, MenuConfigType, ObjectType, ToolbarConfigType } from '../core/tool';
import { ExtractPublicPropTypes, PropType } from 'vue';

export type EditifyTableColumnResizeParamsType = {
    element: AlexElement | null;
    start: number;
};
export type EditifyToolbarOptionsType = {
    show: boolean;
    node: string | null;
    type: 'text' | 'link' | 'image' | 'video' | 'table' | 'codeBlock';
};
export declare const EditifyProps: {
    locale: {
        type: PropType<LocaleType>;
        default: string;
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowCopy: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowPaste: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowCut: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowPasteHtml: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: PropType<string | null>;
        default: string;
        validator(value: any): boolean;
    };
    videoRatio: {
        type: NumberConstructor;
        default: number;
    };
    toolbar: {
        type: PropType<ToolbarConfigType>;
        default: null;
    };
    showWordLength: {
        type: BooleanConstructor;
        default: boolean;
    };
    customTextPaste: {
        type: PropType<(data: string) => void | Promise<void>>;
        default: null;
    };
    customHtmlPaste: {
        type: PropType<(elements: AlexElement[]) => void | Promise<void>>;
        default: null;
    };
    customImagePaste: {
        type: PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customVideoPaste: {
        type: PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customFilePaste: {
        type: PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    menu: {
        type: PropType<MenuConfigType>;
        default: null;
    };
    pasteKeepMarks: {
        type: PropType<ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: PropType<ObjectType>;
        default: null;
    };
    customParseNode: {
        type: PropType<(el: AlexElement) => AlexElement>;
        default: null;
    };
    renderRules: {
        type: PropType<((el: AlexElement) => void)[]>;
        default: () => never[];
    };
    autoheight: {
        type: BooleanConstructor;
        default: boolean;
    };
    tab: {
        type: BooleanConstructor;
        default: boolean;
    };
    plugins: {
        type: PropType<PluginType[]>;
        default: () => never[];
    };
};
export type EditifyPropsType = ExtractPublicPropTypes<typeof EditifyProps>;
