import { App } from 'vue';
import { AlexElement } from 'alex-editor';

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
        type: import('vue').PropType<(elements: AlexElement[]) => void | Promise<void>>;
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
        type: import('vue').PropType<(el: AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import('vue').PropType<(el: AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import('vue').PropType<(el: AlexElement) => AlexElement>;
        default: null;
    };
    extraKeepTags: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    renderRules: {
        type: import('vue').PropType<((el: AlexElement) => void)[]>;
        default: () => never[];
    };
    autoheight: {
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
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
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
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
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
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
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
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
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
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
                    };
                } | null;
            }[];
            redoRecords: {
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
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
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
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
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
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
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
                            getUneditableElement: () => AlexElement | null;
                            isEqual: (element: AlexElement) => boolean;
                            isContains: (element: AlexElement) => boolean;
                            isOnlyHasBreak: () => boolean | 0;
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
                        isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                        moveToEnd: (element: AlexElement) => void;
                        moveToStart: (element: AlexElement) => void;
                    };
                } | null;
            }[];
            cloneRange: (newStack: AlexElement[], range: import('alex-editor').AlexRange | null) => import('alex-editor').AlexRange | null;
            setState: (stack: AlexElement[], range: import('alex-editor').AlexRange | null) => void;
            undo: () => import('alex-editor').AlexHistoryRecordType | null;
            redo: () => import('alex-editor').AlexHistoryRecordType | null;
            updateRange: (range: import('alex-editor').AlexRange) => void;
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
            getUneditableElement: () => AlexElement | null;
            isEqual: (element: AlexElement) => boolean;
            isContains: (element: AlexElement) => boolean;
            isOnlyHasBreak: () => boolean | 0;
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
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
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
                isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                moveToEnd: (element: AlexElement) => void;
                moveToStart: (element: AlexElement) => void;
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
                    getUneditableElement: () => AlexElement | null;
                    isEqual: (element: AlexElement) => boolean;
                    isContains: (element: AlexElement) => boolean;
                    isOnlyHasBreak: () => boolean | 0;
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
                isEqual: (point: import('alex-editor').AlexPoint) => boolean;
                moveToEnd: (element: AlexElement) => void;
                moveToStart: (element: AlexElement) => void;
            };
        } | null;
        __guid: number;
        __events: {
            [key: string]: ((...args: any) => void)[];
        };
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
            getUneditableElement: () => AlexElement | null;
            isEqual: (element: AlexElement) => boolean;
            isContains: (element: AlexElement) => boolean;
            isOnlyHasBreak: () => boolean | 0;
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
        __isInputChinese: boolean;
        __innerSelectionChange: boolean;
        __chineseInputTimer: any;
        __domObserver: {
            disconnect: () => void;
            observe: (target: Node, options?: MutationObserverInit) => void;
            takeRecords: () => MutationRecord[];
        } | null;
        __illegalDoms: Node[];
        initRange: () => void;
        delete: () => void;
        insertText: (data: string) => void;
        insertParagraph: () => void;
        insertElement: (ele: AlexElement, cover?: boolean | undefined) => void;
        domRender: (unPushHistory?: boolean | undefined) => void;
        rangeRender: () => Promise<void>;
        parseHtml: (html: string) => AlexElement[];
        parseNode: (node: HTMLElement) => AlexElement;
        merge: (ele: AlexElement, previousEle: AlexElement) => void;
        getElementByKey: (key: number) => AlexElement | null;
        getPreviousElement: (ele: AlexElement) => AlexElement | null;
        getNextElement: (ele: AlexElement) => AlexElement | null;
        getPreviousElementOfPoint: (point: import('alex-editor').AlexPoint) => AlexElement | null;
        getNextElementOfPoint: (point: import('alex-editor').AlexPoint) => AlexElement | null;
        getElementsByRange: () => import('alex-editor').AlexElementsRangeType;
        addElementTo: (childEle: AlexElement, parentEle: AlexElement, index?: number | undefined) => void;
        addElementBefore: (newEle: AlexElement, targetEle: AlexElement) => void;
        addElementAfter: (newEle: AlexElement, targetEle: AlexElement) => void;
        collapseToStart: (element?: AlexElement) => void;
        collapseToEnd: (element?: AlexElement) => void;
        setDisabled: () => void;
        setEnabled: () => void;
        undo: () => void;
        redo: () => void;
        emit: (eventName: string, ...value: any) => boolean;
        on: (eventName: string, eventHandle: (...args: any) => void) => void;
        off: (eventName: string, eventHandle?: (...args: any) => void) => void;
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
                getUneditableElement: () => AlexElement | null;
                isEqual: (element: AlexElement) => boolean;
                isContains: (element: AlexElement) => boolean;
                isOnlyHasBreak: () => boolean | 0;
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
                getUneditableElement: () => AlexElement | null;
                isEqual: (element: AlexElement) => boolean;
                isContains: (element: AlexElement) => boolean;
                isOnlyHasBreak: () => boolean | 0;
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
        type: import('vue').PropType<(elements: AlexElement[]) => void | Promise<void>>;
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
        type: import('vue').PropType<(el: AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    pasteKeepStyles: {
        type: import('vue').PropType<(el: AlexElement) => import('./core/tool').ObjectType>;
        default: null;
    };
    customParseNode: {
        type: import('vue').PropType<(el: AlexElement) => AlexElement>;
        default: null;
    };
    extraKeepTags: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    renderRules: {
        type: import('vue').PropType<((el: AlexElement) => void)[]>;
        default: () => never[];
    };
    autoheight: {
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
    customHtmlPaste: (elements: AlexElement[]) => void | Promise<void>;
    customImagePaste: (file: File) => void | Promise<void>;
    customVideoPaste: (file: File) => void | Promise<void>;
    customFilePaste: (file: File) => void | Promise<void>;
    pasteKeepMarks: (el: AlexElement) => import('./core/tool').ObjectType;
    pasteKeepStyles: (el: AlexElement) => import('./core/tool').ObjectType;
    customParseNode: (el: AlexElement) => AlexElement;
    extraKeepTags: string[];
    renderRules: ((el: AlexElement) => void)[];
    autoheight: boolean;
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
export { elementIsMatch, getMatchElementByElement, getMatchElementByRange, elementIsList, getListByElement, hasListInRange, rangeIsInList, elementIsTask, getTaskByElement, hasTaskInRange, rangeIsInTask, elementIsAttachment, hasAttachmentInRange, elementIsMathformula, getMathformulaByElement, hasMathformulaInRange, elementIsInfoBlock, getInfoBlockByElement, hasInfoBlockInRange, rangeIsInInfoBlock, hasPreInRange, hasTableInRange, hasQuoteInRange, rangeIsInQuote, hasLinkInRange, hasImageInRange, hasVideoInRange, queryTextStyle, setTextStyle, removeTextStyle, queryTextMark, setTextMark, removeTextMark, getRangeText, addSpaceTextToBothSides, setHeading, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, insertSeparator, insertAttachment, insertMathformula, insertInfoBlock } from './core/function';
declare const install: (app: App) => void;
declare const version = "0.2.19";
export { Editify as default, Editify, install, AlexElement, version };
