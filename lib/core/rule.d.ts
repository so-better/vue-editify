import { LanguagesItemType } from '../hljs';
import { AlexEditor, AlexElement } from 'alex-editor';

export declare const parseList: (editor: AlexEditor, element: AlexElement) => void;
export declare const orderdListHandle: (editor: AlexEditor, element: AlexElement) => void;
export declare const mediaHandle: (editor: AlexEditor, element: AlexElement) => void;
export declare const tableHandle: (editor: AlexEditor, element: AlexElement) => void;
export declare const preHandle: (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) => void;
export declare const specialInblockHandle: (editor: AlexEditor, element: AlexElement) => void;
