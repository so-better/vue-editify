import { InsertVideoUploadErrorType } from './components/insertVideo/props';
import { InsertImageUploadErrorType } from './components/insertImage/props';
import { MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuConfigType } from './core/tool';
import { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType } from './components/button/props';
import { App } from 'vue';
import { default as Editify } from './editify/editify.vue';
import { AlexElement } from 'alex-editor';

declare const version = "0.1.14";
declare const install: (app: App) => void;
declare const stdin_default: {
    install: (app: App) => void;
    version: string;
};
export * from './core/function';
export type { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType, MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuConfigType, InsertImageUploadErrorType, InsertVideoUploadErrorType };
export { stdin_default as default, install, version, Editify, AlexElement };
