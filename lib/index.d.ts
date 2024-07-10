import { App } from 'vue';

declare const Editify: import('./core/tool').SFCWithInstall<import('vue').DefineComponent<{
    locale: {
        type: import('vue').PropType<import('./locale').LocaleType>;
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
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    videoRatio: {
        type: NumberConstructor;
        default: number;
    };
    toolbar: {
        type: import('vue').PropType<import('./core/tool').ToolbarConfigType>;
        default: null;
    };
    showWordLength: {
        type: BooleanConstructor;
        default: boolean;
    };
    customTextPaste: {
        type: import('vue').PropType<(data: string) => void | Promise<void>>;
        default: null;
    };
    customHtmlPaste: {
        type: import('vue').PropType<(elements: import('alex-editor').AlexElement[]) => void | Promise<void>>;
        default: null;
    };
    customImagePaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customVideoPaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customFilePaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    menu: {
        type: import('vue').PropType<import('./core/tool').MenuConfigType>;
        default: null;
    };
    pasteKeepMarks: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('alex-editor').AlexElement>;
        default: null;
    };
    extraKeepTags: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    renderRules: {
        type: import('vue').PropType<((el: import('alex-editor').AlexElement) => void)[]>;
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
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
}, {
    editor: import('vue').Ref<{
        $el: HTMLElement;
        disabled: boolean;
        value: string;
        renderRules: ((element: import('alex-editor').AlexElement) => void)[];
        allowCopy: boolean;
        allowPaste: boolean;
        allowCut: boolean;
        allowPasteHtml: boolean;
        customTextPaste: ((text: string) => void | Promise<void>) | null;
        customHtmlPaste: ((AlexElements: import('alex-editor').AlexElement[], html: string) => void | Promise<void>) | null;
        customImagePaste: ((file: File) => void | Promise<void>) | null;
        customVideoPaste: ((file: File) => void | Promise<void>) | null;
        customFilePaste: ((file: File) => void | Promise<void>) | null;
        customMerge: ((mergeElement: import('alex-editor').AlexElement, targetElement: import('alex-editor').AlexElement) => void | Promise<void>) | null;
        customParseNode: ((el: import('alex-editor').AlexElement) => import('alex-editor').AlexElement) | null;
        extraKeepTags: string[];
        history: {
            records: {
                stack: {
                    key: number;
                    type: import('alex-editor').AlexElementType;
                    parsedom: string | null;
                    marks: import('alex-editor').ObjectType | null;
                    styles: import('alex-editor').ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior: "default" | "block";
                    namespace: string | null;
                    locked: boolean;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => import('alex-editor').AlexElement | null;
                    isEqual: (element: import('alex-editor').AlexElement) => boolean;
                    isContains: (element: import('alex-editor').AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: import('alex-editor').AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => import('alex-editor').AlexElement;
                    getInblock: () => import('alex-editor').AlexElement | null;
                    getInline: () => import('alex-editor').AlexElement | null;
                    isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                    isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                    isFirst: (element: import('alex-editor').AlexElement) => boolean;
                    isLast: (element: import('alex-editor').AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => import('alex-editor').AlexElement;
                }[];
                range: {
                    anchor: {
                        element: {
                            key: number;
                            type: import('alex-editor').AlexElementType;
                            parsedom: string | null;
                            marks: import('alex-editor').ObjectType | null;
                            styles: import('alex-editor').ObjectType | null;
                            textContent: string | null;
                            children: any[] | null;
                            parent: any | null;
                            behavior: "default" | "block";
                            namespace: string | null;
                            locked: boolean;
                            elm: HTMLElement | null;
                            isBlock: () => boolean;
                            isInblock: () => boolean;
                            isInline: () => boolean;
                            isClosed: () => boolean;
                            isText: () => boolean;
                            isBreak: () => boolean;
                            isEmpty: () => boolean;
                            isSpaceText: () => boolean;
                            getUneditableElement: () => import('alex-editor').AlexElement | null;
                            isEqual: (element: import('alex-editor').AlexElement) => boolean;
                            isContains: (element: import('alex-editor').AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
                            isPreStyle: () => boolean;
                            hasMarks: () => boolean;
                            hasStyles: () => boolean;
                            hasChildren: () => boolean;
                            hasContains: (element: import('alex-editor').AlexElement) => boolean;
                            clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                            convertToBlock: () => void;
                            toEmpty: () => void;
                            getBlock: () => import('alex-editor').AlexElement;
                            getInblock: () => import('alex-editor').AlexElement | null;
                            getInline: () => import('alex-editor').AlexElement | null;
                            isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                            isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                            isFirst: (element: import('alex-editor').AlexElement) => boolean;
                            isLast: (element: import('alex-editor').AlexElement) => boolean;
                            __render: () => void;
                            __fullClone: () => import('alex-editor').AlexElement;
                        };
                        offset: number;
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: import('alex-editor').AlexElement) => void;
                        moveToStart: (element: import('alex-editor').AlexElement) => void;
                    };
                    focus: {
                        element: {
                            key: number;
                            type: import('alex-editor').AlexElementType;
                            parsedom: string | null;
                            marks: import('alex-editor').ObjectType | null;
                            styles: import('alex-editor').ObjectType | null;
                            textContent: string | null;
                            children: any[] | null;
                            parent: any | null;
                            behavior: "default" | "block";
                            namespace: string | null;
                            locked: boolean;
                            elm: HTMLElement | null;
                            isBlock: () => boolean;
                            isInblock: () => boolean;
                            isInline: () => boolean;
                            isClosed: () => boolean;
                            isText: () => boolean;
                            isBreak: () => boolean;
                            isEmpty: () => boolean;
                            isSpaceText: () => boolean;
                            getUneditableElement: () => import('alex-editor').AlexElement | null;
                            isEqual: (element: import('alex-editor').AlexElement) => boolean;
                            isContains: (element: import('alex-editor').AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
                            isPreStyle: () => boolean;
                            hasMarks: () => boolean;
                            hasStyles: () => boolean;
                            hasChildren: () => boolean;
                            hasContains: (element: import('alex-editor').AlexElement) => boolean;
                            clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                            convertToBlock: () => void;
                            toEmpty: () => void;
                            getBlock: () => import('alex-editor').AlexElement;
                            getInblock: () => import('alex-editor').AlexElement | null;
                            getInline: () => import('alex-editor').AlexElement | null;
                            isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                            isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                            isFirst: (element: import('alex-editor').AlexElement) => boolean;
                            isLast: (element: import('alex-editor').AlexElement) => boolean;
                            __render: () => void;
                            __fullClone: () => import('alex-editor').AlexElement;
                        };
                        offset: number;
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: import('alex-editor').AlexElement) => void;
                        moveToStart: (element: import('alex-editor').AlexElement) => void;
                    };
                } | null;
            }[];
            current: number;
            push: (stack: import('alex-editor').AlexElement[], range?: import('alex-editor').AlexRange | null) => void;
            get: (type: -1 | 1) => import('alex-editor').AlexHistoryResultType | null;
            updateCurrentRange: (range: import('alex-editor').AlexRange) => void;
            __cloneRange: (newStack: import('alex-editor').AlexElement[], range?: import('alex-editor').AlexRange | null) => import('alex-editor').AlexRange | null;
        };
        stack: {
            key: number;
            type: import('alex-editor').AlexElementType;
            parsedom: string | null;
            marks: import('alex-editor').ObjectType | null;
            styles: import('alex-editor').ObjectType | null;
            textContent: string | null;
            children: any[] | null;
            parent: any | null;
            behavior: "default" | "block";
            namespace: string | null;
            locked: boolean;
            elm: HTMLElement | null;
            isBlock: () => boolean;
            isInblock: () => boolean;
            isInline: () => boolean;
            isClosed: () => boolean;
            isText: () => boolean;
            isBreak: () => boolean;
            isEmpty: () => boolean;
            isSpaceText: () => boolean;
            getUneditableElement: () => import('alex-editor').AlexElement | null;
            isEqual: (element: import('alex-editor').AlexElement) => boolean;
            isContains: (element: import('alex-editor').AlexElement) => boolean;
            isOnlyHasBreak: () => boolean | 0;
            isPreStyle: () => boolean;
            hasMarks: () => boolean;
            hasStyles: () => boolean;
            hasChildren: () => boolean;
            hasContains: (element: import('alex-editor').AlexElement) => boolean;
            clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
            convertToBlock: () => void;
            toEmpty: () => void;
            getBlock: () => import('alex-editor').AlexElement;
            getInblock: () => import('alex-editor').AlexElement | null;
            getInline: () => import('alex-editor').AlexElement | null;
            isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
            isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
            isFirst: (element: import('alex-editor').AlexElement) => boolean;
            isLast: (element: import('alex-editor').AlexElement) => boolean;
            __render: () => void;
            __fullClone: () => import('alex-editor').AlexElement;
        }[];
        range: {
            anchor: {
                element: {
                    key: number;
                    type: import('alex-editor').AlexElementType;
                    parsedom: string | null;
                    marks: import('alex-editor').ObjectType | null;
                    styles: import('alex-editor').ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior: "default" | "block";
                    namespace: string | null;
                    locked: boolean;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => import('alex-editor').AlexElement | null;
                    isEqual: (element: import('alex-editor').AlexElement) => boolean;
                    isContains: (element: import('alex-editor').AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: import('alex-editor').AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => import('alex-editor').AlexElement;
                    getInblock: () => import('alex-editor').AlexElement | null;
                    getInline: () => import('alex-editor').AlexElement | null;
                    isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                    isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                    isFirst: (element: import('alex-editor').AlexElement) => boolean;
                    isLast: (element: import('alex-editor').AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => import('alex-editor').AlexElement;
                };
                offset: number;
                isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                moveToEnd: (element: import('alex-editor').AlexElement) => void;
                moveToStart: (element: import('alex-editor').AlexElement) => void;
            };
            focus: {
                element: {
                    key: number;
                    type: import('alex-editor').AlexElementType;
                    parsedom: string | null;
                    marks: import('alex-editor').ObjectType | null;
                    styles: import('alex-editor').ObjectType | null;
                    textContent: string | null;
                    children: any[] | null;
                    parent: any | null;
                    behavior: "default" | "block";
                    namespace: string | null;
                    locked: boolean;
                    elm: HTMLElement | null;
                    isBlock: () => boolean;
                    isInblock: () => boolean;
                    isInline: () => boolean;
                    isClosed: () => boolean;
                    isText: () => boolean;
                    isBreak: () => boolean;
                    isEmpty: () => boolean;
                    isSpaceText: () => boolean;
                    getUneditableElement: () => import('alex-editor').AlexElement | null;
                    isEqual: (element: import('alex-editor').AlexElement) => boolean;
                    isContains: (element: import('alex-editor').AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
                    isPreStyle: () => boolean;
                    hasMarks: () => boolean;
                    hasStyles: () => boolean;
                    hasChildren: () => boolean;
                    hasContains: (element: import('alex-editor').AlexElement) => boolean;
                    clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                    convertToBlock: () => void;
                    toEmpty: () => void;
                    getBlock: () => import('alex-editor').AlexElement;
                    getInblock: () => import('alex-editor').AlexElement | null;
                    getInline: () => import('alex-editor').AlexElement | null;
                    isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                    isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                    isFirst: (element: import('alex-editor').AlexElement) => boolean;
                    isLast: (element: import('alex-editor').AlexElement) => boolean;
                    __render: () => void;
                    __fullClone: () => import('alex-editor').AlexElement;
                };
                offset: number;
                isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                moveToEnd: (element: import('alex-editor').AlexElement) => void;
                moveToStart: (element: import('alex-editor').AlexElement) => void;
            };
        } | null;
        __guid: number;
        __events: import('alex-editor').ObjectType;
        __oldStack: {
            key: number;
            type: import('alex-editor').AlexElementType;
            parsedom: string | null;
            marks: import('alex-editor').ObjectType | null;
            styles: import('alex-editor').ObjectType | null;
            textContent: string | null;
            children: any[] | null;
            parent: any | null;
            behavior: "default" | "block";
            namespace: string | null;
            locked: boolean;
            elm: HTMLElement | null;
            isBlock: () => boolean;
            isInblock: () => boolean;
            isInline: () => boolean;
            isClosed: () => boolean;
            isText: () => boolean;
            isBreak: () => boolean;
            isEmpty: () => boolean;
            isSpaceText: () => boolean;
            getUneditableElement: () => import('alex-editor').AlexElement | null;
            isEqual: (element: import('alex-editor').AlexElement) => boolean;
            isContains: (element: import('alex-editor').AlexElement) => boolean;
            isOnlyHasBreak: () => boolean | 0;
            isPreStyle: () => boolean;
            hasMarks: () => boolean;
            hasStyles: () => boolean;
            hasChildren: () => boolean;
            hasContains: (element: import('alex-editor').AlexElement) => boolean;
            clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
            convertToBlock: () => void;
            toEmpty: () => void;
            getBlock: () => import('alex-editor').AlexElement;
            getInblock: () => import('alex-editor').AlexElement | null;
            getInline: () => import('alex-editor').AlexElement | null;
            isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
            isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
            isFirst: (element: import('alex-editor').AlexElement) => boolean;
            isLast: (element: import('alex-editor').AlexElement) => boolean;
            __render: () => void;
            __fullClone: () => import('alex-editor').AlexElement;
        }[];
        __isInputChinese: boolean;
        __innerSelectionChange: boolean;
        __chineseInputTimer: any;
        initRange: () => void;
        delete: () => void;
        insertText: (data: string) => void;
        insertParagraph: () => void;
        insertElement: (ele: import('alex-editor').AlexElement, cover?: boolean | undefined) => void;
        formatElementStack: () => void;
        domRender: (unPushHistory?: boolean | undefined) => void;
        rangeRender: () => Promise<void>;
        parseHtml: (html: string) => import('alex-editor').AlexElement[];
        parseNode: (node: HTMLElement) => import('alex-editor').AlexElement;
        merge: (ele: import('alex-editor').AlexElement, previousEle: import('alex-editor').AlexElement) => void;
        getElementByKey: (key: number) => import('alex-editor').AlexElement | null;
        getPreviousElement: (ele: import('alex-editor').AlexElement) => import('alex-editor').AlexElement | null;
        getNextElement: (ele: import('alex-editor').AlexElement) => import('alex-editor').AlexElement | null;
        getPreviousElementOfPoint: (point: import('alex-editor').AlexPoint) => import('alex-editor').AlexElement | null;
        getNextElementOfPoint: (point: import('alex-editor').AlexPoint) => import('alex-editor').AlexElement | null;
        getElementsByRange: () => import('alex-editor').AlexElementsRangeType;
        addElementTo: (childEle: import('alex-editor').AlexElement, parentEle: import('alex-editor').AlexElement, index?: number | undefined) => void;
        addElementBefore: (newEle: import('alex-editor').AlexElement, targetEle: import('alex-editor').AlexElement) => void;
        addElementAfter: (newEle: import('alex-editor').AlexElement, targetEle: import('alex-editor').AlexElement) => void;
        collapseToStart: (element?: import('alex-editor').AlexElement) => void;
        collapseToEnd: (element?: import('alex-editor').AlexElement) => void;
        setDisabled: () => void;
        setEnabled: () => void;
        emit: (eventName: string, ...value: any) => boolean;
        on: (eventName: string, eventHandle: (...args: any) => void) => void;
        destroy: () => void;
    } | null>;
    isSourceView: import('vue').Ref<boolean>;
    isFullScreen: import('vue').Ref<boolean>;
    rangeKey: import('vue').Ref<number | null>;
    dataRangeCaches: import('vue').Ref<{
        list: {
            element: {
                key: number;
                type: import('alex-editor').AlexElementType;
                parsedom: string | null;
                marks: import('alex-editor').ObjectType | null;
                styles: import('alex-editor').ObjectType | null;
                textContent: string | null;
                children: any[] | null;
                parent: any | null;
                behavior: "default" | "block";
                namespace: string | null;
                locked: boolean;
                elm: HTMLElement | null;
                isBlock: () => boolean;
                isInblock: () => boolean;
                isInline: () => boolean;
                isClosed: () => boolean;
                isText: () => boolean;
                isBreak: () => boolean;
                isEmpty: () => boolean;
                isSpaceText: () => boolean;
                getUneditableElement: () => import('alex-editor').AlexElement | null;
                isEqual: (element: import('alex-editor').AlexElement) => boolean;
                isContains: (element: import('alex-editor').AlexElement) => boolean;
                isOnlyHasBreak: () => boolean | 0;
                isPreStyle: () => boolean;
                hasMarks: () => boolean;
                hasStyles: () => boolean;
                hasChildren: () => boolean;
                hasContains: (element: import('alex-editor').AlexElement) => boolean;
                clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                convertToBlock: () => void;
                toEmpty: () => void;
                getBlock: () => import('alex-editor').AlexElement;
                getInblock: () => import('alex-editor').AlexElement | null;
                getInline: () => import('alex-editor').AlexElement | null;
                isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                isFirst: (element: import('alex-editor').AlexElement) => boolean;
                isLast: (element: import('alex-editor').AlexElement) => boolean;
                __render: () => void;
                __fullClone: () => import('alex-editor').AlexElement;
            };
            offset: number[] | false;
        }[];
        flatList: {
            element: {
                key: number;
                type: import('alex-editor').AlexElementType;
                parsedom: string | null;
                marks: import('alex-editor').ObjectType | null;
                styles: import('alex-editor').ObjectType | null;
                textContent: string | null;
                children: any[] | null;
                parent: any | null;
                behavior: "default" | "block";
                namespace: string | null;
                locked: boolean;
                elm: HTMLElement | null;
                isBlock: () => boolean;
                isInblock: () => boolean;
                isInline: () => boolean;
                isClosed: () => boolean;
                isText: () => boolean;
                isBreak: () => boolean;
                isEmpty: () => boolean;
                isSpaceText: () => boolean;
                getUneditableElement: () => import('alex-editor').AlexElement | null;
                isEqual: (element: import('alex-editor').AlexElement) => boolean;
                isContains: (element: import('alex-editor').AlexElement) => boolean;
                isOnlyHasBreak: () => boolean | 0;
                isPreStyle: () => boolean;
                hasMarks: () => boolean;
                hasStyles: () => boolean;
                hasChildren: () => boolean;
                hasContains: (element: import('alex-editor').AlexElement) => boolean;
                clone: (deep?: boolean | undefined) => import('alex-editor').AlexElement;
                convertToBlock: () => void;
                toEmpty: () => void;
                getBlock: () => import('alex-editor').AlexElement;
                getInblock: () => import('alex-editor').AlexElement | null;
                getInline: () => import('alex-editor').AlexElement | null;
                isEqualStyles: (element: import('alex-editor').AlexElement) => boolean;
                isEqualMarks: (element: import('alex-editor').AlexElement) => boolean;
                isFirst: (element: import('alex-editor').AlexElement) => boolean;
                isLast: (element: import('alex-editor').AlexElement) => boolean;
                __render: () => void;
                __fullClone: () => import('alex-editor').AlexElement;
            };
            offset: number[] | false;
        }[];
    }>;
    textValue: import('vue').ComputedRef<string>;
    menuHeight: import('vue').ComputedRef<number | null>;
    collapseToEnd: () => void;
    collapseToStart: () => void;
    undo: () => void;
    redo: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    focus: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
    insertparagraph: (...args: any[]) => void;
    rangeupdate: (...args: any[]) => void;
    updateview: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    locale: {
        type: import('vue').PropType<import('./locale').LocaleType>;
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
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    videoRatio: {
        type: NumberConstructor;
        default: number;
    };
    toolbar: {
        type: import('vue').PropType<import('./core/tool').ToolbarConfigType>;
        default: null;
    };
    showWordLength: {
        type: BooleanConstructor;
        default: boolean;
    };
    customTextPaste: {
        type: import('vue').PropType<(data: string) => void | Promise<void>>;
        default: null;
    };
    customHtmlPaste: {
        type: import('vue').PropType<(elements: import('alex-editor').AlexElement[]) => void | Promise<void>>;
        default: null;
    };
    customImagePaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customVideoPaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    customFilePaste: {
        type: import('vue').PropType<(file: File) => void | Promise<void>>;
        default: null;
    };
    menu: {
        type: import('vue').PropType<import('./core/tool').MenuConfigType>;
        default: null;
    };
    pasteKeepMarks: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import('vue').PropType<(el: import('alex-editor').AlexElement) => import('alex-editor').AlexElement>;
        default: null;
    };
    extraKeepTags: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    renderRules: {
        type: import('vue').PropType<((el: import('alex-editor').AlexElement) => void)[]>;
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
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInsertparagraph?: ((...args: any[]) => any) | undefined;
    onRangeupdate?: ((...args: any[]) => any) | undefined;
    onUpdateview?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    disabled: boolean;
    zIndex: number;
    menu: import('./core/tool').MenuConfigType;
    placeholder: string;
    modelValue: string;
    border: boolean;
    toolbar: import('./core/tool').ToolbarConfigType;
    locale: import('./locale').LocaleType;
    autofocus: boolean;
    allowCopy: boolean;
    allowPaste: boolean;
    allowCut: boolean;
    allowPasteHtml: boolean;
    videoRatio: number;
    showWordLength: boolean;
    customTextPaste: (data: string) => void | Promise<void>;
    customHtmlPaste: (elements: import('alex-editor').AlexElement[]) => void | Promise<void>;
    customImagePaste: (file: File) => void | Promise<void>;
    customVideoPaste: (file: File) => void | Promise<void>;
    customFilePaste: (file: File) => void | Promise<void>;
    pasteKeepMarks: (el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType;
    pasteKeepStyles: (el: import('alex-editor').AlexElement) => import('./core/tool').ObjectType;
    customParseNode: (el: import('alex-editor').AlexElement) => import('alex-editor').AlexElement;
    extraKeepTags: string[];
    renderRules: ((el: import('alex-editor').AlexElement) => void)[];
    autoheight: boolean;
    tab: boolean;
    dark: boolean;
    offset: number;
}, {}>>;
export type * from './components/button';
export type * from './components/checkbox';
export type * from './components/colors';
export type * from './components/icon';
export type * from './components/insertImage';
export type * from './components/insertLink';
export type * from './components/insertTable';
export type * from './components/insertVideo';
export type * from './components/layer';
export type * from './components/tooltip';
export type * from './components/triangle';
export type * from './components/updateLink';
export type * from './core/tool';
export type * from './core/function';
export type * from './editify/menu';
export type * from './editify/toolbar';
export { elementIsMatch, getMatchElementByElement, getMatchElementByRange, elementIsList, getListByElement, hasListInRange, rangeIsInList, elementIsTask, getTaskByElement, hasTaskInRange, rangeIsInTask, elementIsAttachment, hasAttachmentInRange, elementIsMathformula, getMathformulaByElement, hasMathformulaInRange, elementIsPanel, getPanelByElement, hasPanelInRange, elementIsInfoBlock, getInfoBlockByElement, hasInfoBlockInRange, rangeIsInInfoBlock, hasPreInRange, hasQuoteInRange, hasLinkInRange, hasTableInRange, hasImageInRange, hasVideoInRange, rangeIsInQuote, queryTextStyle, queryTextMark, getRangeText, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, insertSeparator } from './core/function';
declare const install: (app: App) => void;
declare const version = "0.2.15";
export { AlexElement } from 'alex-editor';
export { Editify as default, Editify, install, version };
