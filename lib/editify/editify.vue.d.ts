import { MenuConfigType, ObjectType, ToolbarConfigType } from '../core/tool';
import { AlexElement, AlexElementsRangeType } from 'alex-editor';

declare const _default: import('vue').DefineComponent<{
    locale: {
        type: import("vue").PropType<import("../locale").LocaleType>;
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
        type: import("vue").PropType<string | null>;
        default: string;
        validator(value: any): boolean;
    };
    videoRatio: {
        type: NumberConstructor;
        default: number;
    };
    toolbar: {
        type: import("vue").PropType<ToolbarConfigType>;
        default: null;
    };
    showWordLength: {
        type: BooleanConstructor;
        default: boolean;
    };
    customTextPaste: {
        type: import("vue").PropType<(data: string) => void | Promise<void>>;
        default: null;
    };
    customHtmlPaste: {
        type: import("vue").PropType<(elements: AlexElement[]) => void | Promise<void>>;
        default: null;
    };
    customImagePaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customVideoPaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customFilePaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    menu: {
        type: import("vue").PropType<MenuConfigType>;
        default: null;
    };
    pasteKeepMarks: {
        type: import("vue").PropType<ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import("vue").PropType<ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import("vue").PropType<(el: AlexElement) => AlexElement>;
        default: null;
    };
    renderRules: {
        type: import("vue").PropType<((el: AlexElement) => void)[]>;
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
        type: import("vue").PropType<import("../core/tool").PluginType[]>;
        default: () => never[];
    };
}, {
    editor: import("vue").Ref<{
        $el: HTMLElement;
        disabled: boolean;
        value: string;
        renderRules: ((element: AlexElement) => void)[];
        allowCopy: boolean;
        allowPaste: boolean;
        allowCut: boolean;
        allowPasteHtml: boolean;
        customTextPaste: ((text: string) => void | Promise<void>) | null;
        customHtmlPaste: ((AlexElements: AlexElement[], html: string) => void | Promise<void>) | null;
        customImagePaste: ((file: File) => void | Promise<void>) | null;
        customVideoPaste: ((file: File) => void | Promise<void>) | null;
        customFilePaste: ((file: File) => void | Promise<void>) | null;
        customMerge: ((mergeElement: AlexElement, targetElement: AlexElement) => void | Promise<void>) | null;
        customParseNode: ((el: AlexElement) => AlexElement) | null;
        useClipboard: boolean;
        history: {
            records: {
                stack: {
                    key: number;
                    type: import("alex-editor").AlexElementType;
                    parsedom: string | null;
                    marks: import("alex-editor/lib/core/tool").ObjectType | null;
                    styles: import("alex-editor/lib/core/tool").ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior?: "default" | "block" | undefined;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => AlexElement;
                    getInblock: () => AlexElement | null;
                    getInline: () => AlexElement | null;
                    isEqualStyles: (element: AlexElement) => boolean;
                    isEqualMarks: (element: AlexElement) => boolean;
                    isFirst: (element: AlexElement) => boolean;
                    isLast: (element: AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => AlexElement;
                }[];
                range: {
                    anchor: {
                        element: {
                            key: number;
                            type: import("alex-editor").AlexElementType;
                            parsedom: string | null;
                            marks: import("alex-editor/lib/core/tool").ObjectType | null;
                            styles: import("alex-editor/lib/core/tool").ObjectType | null;
                            textContent: string | null;
                            children: any[] | null;
                            parent: any | null;
                            behavior?: "default" | "block" | undefined;
                            elm: HTMLElement | null;
                            isBlock: () => boolean;
                            isInblock: () => boolean;
                            isInline: () => boolean;
                            isClosed: () => boolean;
                            isText: () => boolean;
                            isBreak: () => boolean;
                            isEmpty: () => boolean;
                            isSpaceText: () => boolean;
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean;
                            isPreStyle: () => boolean;
                            hasMarks: () => boolean;
                            hasStyles: () => boolean;
                            hasChildren: () => boolean;
                            hasContains: (element: AlexElement) => boolean;
                            clone: (deep?: boolean | undefined) => AlexElement;
                            convertToBlock: () => void;
                            toEmpty: () => void;
                            getBlock: () => AlexElement;
                            getInblock: () => AlexElement | null;
                            getInline: () => AlexElement | null;
                            isEqualStyles: (element: AlexElement) => boolean;
                            isEqualMarks: (element: AlexElement) => boolean;
                            isFirst: (element: AlexElement) => boolean;
                            isLast: (element: AlexElement) => boolean;
                            __render: () => void;
                            __fullClone: () => AlexElement;
                        };
                        offset: number;
                        isEqual: (point: import("alex-editor").AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
                    };
                    focus: {
                        element: {
                            key: number;
                            type: import("alex-editor").AlexElementType;
                            parsedom: string | null;
                            marks: import("alex-editor/lib/core/tool").ObjectType | null;
                            styles: import("alex-editor/lib/core/tool").ObjectType | null;
                            textContent: string | null;
                            children: any[] | null;
                            parent: any | null;
                            behavior?: "default" | "block" | undefined;
                            elm: HTMLElement | null;
                            isBlock: () => boolean;
                            isInblock: () => boolean;
                            isInline: () => boolean;
                            isClosed: () => boolean;
                            isText: () => boolean;
                            isBreak: () => boolean;
                            isEmpty: () => boolean;
                            isSpaceText: () => boolean;
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean;
                            isPreStyle: () => boolean;
                            hasMarks: () => boolean;
                            hasStyles: () => boolean;
                            hasChildren: () => boolean;
                            hasContains: (element: AlexElement) => boolean;
                            clone: (deep?: boolean | undefined) => AlexElement;
                            convertToBlock: () => void;
                            toEmpty: () => void;
                            getBlock: () => AlexElement;
                            getInblock: () => AlexElement | null;
                            getInline: () => AlexElement | null;
                            isEqualStyles: (element: AlexElement) => boolean;
                            isEqualMarks: (element: AlexElement) => boolean;
                            isFirst: (element: AlexElement) => boolean;
                            isLast: (element: AlexElement) => boolean;
                            __render: () => void;
                            __fullClone: () => AlexElement;
                        };
                        offset: number;
                        isEqual: (point: import("alex-editor").AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
                    };
                } | null;
            }[];
            current: number;
            push: (stack: AlexElement[], range?: import("alex-editor").AlexRange | null | undefined) => void;
            get: (type: 1 | -1) => import("alex-editor").AlexHistoryResultType | null;
            updateCurrentRange: (range: import("alex-editor").AlexRange) => void;
            __cloneRange: (newStack: AlexElement[], range?: import("alex-editor").AlexRange | null | undefined) => import("alex-editor").AlexRange | null;
        };
        stack: {
            key: number;
            type: import("alex-editor").AlexElementType;
            parsedom: string | null;
            marks: import("alex-editor/lib/core/tool").ObjectType | null;
            styles: import("alex-editor/lib/core/tool").ObjectType | null;
            textContent: string | null;
            children: any[] | null;
            parent: any | null;
            behavior?: "default" | "block" | undefined;
            elm: HTMLElement | null;
            isBlock: () => boolean;
            isInblock: () => boolean;
            isInline: () => boolean;
            isClosed: () => boolean;
            isText: () => boolean;
            isBreak: () => boolean;
            isEmpty: () => boolean;
            isSpaceText: () => boolean;
            getUneditableElement: () => AlexElement | null;
            isEqual: (element: AlexElement) => boolean;
            isContains: (element: AlexElement) => boolean;
            isOnlyHasBreak: () => boolean;
            isPreStyle: () => boolean;
            hasMarks: () => boolean;
            hasStyles: () => boolean;
            hasChildren: () => boolean;
            hasContains: (element: AlexElement) => boolean;
            clone: (deep?: boolean | undefined) => AlexElement;
            convertToBlock: () => void;
            toEmpty: () => void;
            getBlock: () => AlexElement;
            getInblock: () => AlexElement | null;
            getInline: () => AlexElement | null;
            isEqualStyles: (element: AlexElement) => boolean;
            isEqualMarks: (element: AlexElement) => boolean;
            isFirst: (element: AlexElement) => boolean;
            isLast: (element: AlexElement) => boolean;
            __render: () => void;
            __fullClone: () => AlexElement;
        }[];
        range: {
            anchor: {
                element: {
                    key: number;
                    type: import("alex-editor").AlexElementType;
                    parsedom: string | null;
                    marks: import("alex-editor/lib/core/tool").ObjectType | null;
                    styles: import("alex-editor/lib/core/tool").ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior?: "default" | "block" | undefined;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => AlexElement;
                    getInblock: () => AlexElement | null;
                    getInline: () => AlexElement | null;
                    isEqualStyles: (element: AlexElement) => boolean;
                    isEqualMarks: (element: AlexElement) => boolean;
                    isFirst: (element: AlexElement) => boolean;
                    isLast: (element: AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => AlexElement;
                };
                offset: number;
                isEqual: (point: import("alex-editor").AlexPoint) => boolean;
                moveToEnd: (element: AlexElement) => void;
                moveToStart: (element: AlexElement) => void;
            };
            focus: {
                element: {
                    key: number;
                    type: import("alex-editor").AlexElementType;
                    parsedom: string | null;
                    marks: import("alex-editor/lib/core/tool").ObjectType | null;
                    styles: import("alex-editor/lib/core/tool").ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior?: "default" | "block" | undefined;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => AlexElement;
                    getInblock: () => AlexElement | null;
                    getInline: () => AlexElement | null;
                    isEqualStyles: (element: AlexElement) => boolean;
                    isEqualMarks: (element: AlexElement) => boolean;
                    isFirst: (element: AlexElement) => boolean;
                    isLast: (element: AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => AlexElement;
                };
                offset: number;
                isEqual: (point: import("alex-editor").AlexPoint) => boolean;
                moveToEnd: (element: AlexElement) => void;
                moveToStart: (element: AlexElement) => void;
            };
        } | null;
        __guid: number;
        __events: import("alex-editor/lib/core/tool").ObjectType;
        __firstRender: boolean;
        __isInputChinese: boolean;
        __innerSelectionChange: boolean;
        __chineseInputTimer: any;
        initRange: () => void;
        copy: (isCut?: boolean | undefined) => Promise<{
            text: string;
            html: string;
        } | undefined>;
        cut: () => Promise<{
            text: string;
            html: string;
        } | undefined>;
        delete: () => void;
        insertText: (data: string) => void;
        insertParagraph: () => void;
        insertElement: (ele: AlexElement, cover?: boolean | undefined) => void;
        formatElementStack: () => void;
        domRender: (unPushHistory?: boolean | undefined) => void;
        rangeRender: () => void;
        parseHtml: (html: string) => AlexElement[];
        parseNode: (node: HTMLElement) => AlexElement;
        merge: (ele: AlexElement, previousEle: AlexElement) => void;
        getElementByKey: (key: number) => AlexElement | null;
        getPreviousElement: (ele: AlexElement) => AlexElement | null;
        getNextElement: (ele: AlexElement) => AlexElement | null;
        getPreviousElementOfPoint: (point: import("alex-editor").AlexPoint) => AlexElement | null;
        getNextElementOfPoint: (point: import("alex-editor").AlexPoint) => AlexElement | null;
        getElementsByRange: () => AlexElementsRangeType;
        addElementTo: (childEle: AlexElement, parentEle: AlexElement, index?: number | undefined) => void;
        addElementBefore: (newEle: AlexElement, targetEle: AlexElement) => void;
        addElementAfter: (newEle: AlexElement, targetEle: AlexElement) => void;
        collapseToStart: (element?: AlexElement | undefined) => void;
        collapseToEnd: (element?: AlexElement | undefined) => void;
        setDisabled: () => void;
        setEnabled: () => void;
        emit: (eventName: string, ...value: any) => boolean;
        on: (eventName: string, eventHandle: (...args: any) => void) => void;
        destroy: () => void;
    } | null>;
    isSourceView: import("vue").Ref<boolean>;
    isFullScreen: import("vue").Ref<boolean>;
    canUseMenu: import("vue").Ref<boolean>;
    dataRangeCaches: import("vue").Ref<{
        list: {
            element: {
                key: number;
                type: import("alex-editor").AlexElementType;
                parsedom: string | null;
                marks: import("alex-editor/lib/core/tool").ObjectType | null;
                styles: import("alex-editor/lib/core/tool").ObjectType | null;
                textContent: string | null;
                children: any[] | null;
                parent: any | null;
                behavior?: "default" | "block" | undefined;
                elm: HTMLElement | null;
                isBlock: () => boolean;
                isInblock: () => boolean;
                isInline: () => boolean;
                isClosed: () => boolean;
                isText: () => boolean;
                isBreak: () => boolean;
                isEmpty: () => boolean;
                isSpaceText: () => boolean;
                getUneditableElement: () => AlexElement | null;
                isEqual: (element: AlexElement) => boolean;
                isContains: (element: AlexElement) => boolean;
                isOnlyHasBreak: () => boolean;
                isPreStyle: () => boolean;
                hasMarks: () => boolean;
                hasStyles: () => boolean;
                hasChildren: () => boolean;
                hasContains: (element: AlexElement) => boolean;
                clone: (deep?: boolean | undefined) => AlexElement;
                convertToBlock: () => void;
                toEmpty: () => void;
                getBlock: () => AlexElement;
                getInblock: () => AlexElement | null;
                getInline: () => AlexElement | null;
                isEqualStyles: (element: AlexElement) => boolean;
                isEqualMarks: (element: AlexElement) => boolean;
                isFirst: (element: AlexElement) => boolean;
                isLast: (element: AlexElement) => boolean;
                __render: () => void;
                __fullClone: () => AlexElement;
            };
            offset: false | number[];
        }[];
        flatList: {
            element: {
                key: number;
                type: import("alex-editor").AlexElementType;
                parsedom: string | null;
                marks: import("alex-editor/lib/core/tool").ObjectType | null;
                styles: import("alex-editor/lib/core/tool").ObjectType | null;
                textContent: string | null;
                children: any[] | null;
                parent: any | null;
                behavior?: "default" | "block" | undefined;
                elm: HTMLElement | null;
                isBlock: () => boolean;
                isInblock: () => boolean;
                isInline: () => boolean;
                isClosed: () => boolean;
                isText: () => boolean;
                isBreak: () => boolean;
                isEmpty: () => boolean;
                isSpaceText: () => boolean;
                getUneditableElement: () => AlexElement | null;
                isEqual: (element: AlexElement) => boolean;
                isContains: (element: AlexElement) => boolean;
                isOnlyHasBreak: () => boolean;
                isPreStyle: () => boolean;
                hasMarks: () => boolean;
                hasStyles: () => boolean;
                hasChildren: () => boolean;
                hasContains: (element: AlexElement) => boolean;
                clone: (deep?: boolean | undefined) => AlexElement;
                convertToBlock: () => void;
                toEmpty: () => void;
                getBlock: () => AlexElement;
                getInblock: () => AlexElement | null;
                getInline: () => AlexElement | null;
                isEqualStyles: (element: AlexElement) => boolean;
                isEqualMarks: (element: AlexElement) => boolean;
                isFirst: (element: AlexElement) => boolean;
                isLast: (element: AlexElement) => boolean;
                __render: () => void;
                __fullClone: () => AlexElement;
            };
            offset: false | number[];
        }[];
    }>;
    textValue: import("vue").ComputedRef<string>;
    collapseToEnd: () => void;
    collapseToStart: () => void;
    undo: () => void;
    redo: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    focus: (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    insertparagraph: (...args: any[]) => void;
    rangeupdate: (...args: any[]) => void;
    updateview: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    locale: {
        type: import("vue").PropType<import("../locale").LocaleType>;
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
        type: import("vue").PropType<string | null>;
        default: string;
        validator(value: any): boolean;
    };
    videoRatio: {
        type: NumberConstructor;
        default: number;
    };
    toolbar: {
        type: import("vue").PropType<ToolbarConfigType>;
        default: null;
    };
    showWordLength: {
        type: BooleanConstructor;
        default: boolean;
    };
    customTextPaste: {
        type: import("vue").PropType<(data: string) => void | Promise<void>>;
        default: null;
    };
    customHtmlPaste: {
        type: import("vue").PropType<(elements: AlexElement[]) => void | Promise<void>>;
        default: null;
    };
    customImagePaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customVideoPaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customFilePaste: {
        type: import("vue").PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    menu: {
        type: import("vue").PropType<MenuConfigType>;
        default: null;
    };
    pasteKeepMarks: {
        type: import("vue").PropType<ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import("vue").PropType<ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import("vue").PropType<(el: AlexElement) => AlexElement>;
        default: null;
    };
    renderRules: {
        type: import("vue").PropType<((el: AlexElement) => void)[]>;
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
        type: import("vue").PropType<import("../core/tool").PluginType[]>;
        default: () => never[];
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInsertparagraph?: ((...args: any[]) => any) | undefined;
    onRangeupdate?: ((...args: any[]) => any) | undefined;
    onUpdateview?: ((...args: any[]) => any) | undefined;
}, {
    color: string | null;
    disabled: boolean;
    menu: MenuConfigType;
    modelValue: string;
    border: boolean;
    placeholder: string;
    autoheight: boolean;
    toolbar: ToolbarConfigType;
    locale: import("../locale").LocaleType;
    autofocus: boolean;
    allowCopy: boolean;
    allowPaste: boolean;
    allowCut: boolean;
    allowPasteHtml: boolean;
    videoRatio: number;
    showWordLength: boolean;
    customTextPaste: (data: string) => void | Promise<void>;
    customHtmlPaste: (elements: AlexElement[]) => void | Promise<void>;
    customImagePaste: (file: File) => void | Promise<void>;
    customVideoPaste: (file: File) => void | Promise<void>;
    customFilePaste: (file: File) => void | Promise<void>;
    pasteKeepMarks: ObjectType;
    pasteKeepStyles: ObjectType;
    customParseNode: (el: AlexElement) => AlexElement;
    renderRules: ((el: AlexElement) => void)[];
    tab: boolean;
    plugins: import("../core/tool").PluginType[];
}, {}>;
export default _default;
