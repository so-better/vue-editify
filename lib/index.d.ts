import { FunctionPlugin } from 'vue';
import { default as Editify } from './editify/editify.vue';

export type { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType } from './components/button/props';
export type { InsertImageUploadErrorType } from './components/insertImage/props';
export type { InsertVideoUploadErrorType } from './components/insertVideo/props';
export type { MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuExtendType, MenuConfigType, PluginType, PluginResultType } from './core/tool';
export { getParsedomElementByElement, getCurrentParsedomElement, elementIsInList, elementIsInTask, isList, isTask, hasPreInRange, isRangeInPre, hasQuoteInRange, isRangeInQuote, hasListInRange, isRangeInList, hasTaskInRange, isRangeInTask, hasLinkInRange, hasTableInRange, hasImageInRange, hasVideoInRange, queryTextStyle, queryTextMark, getRangeText, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock } from './core/function';
declare const install: FunctionPlugin;
declare const version = "0.1.40";
export { AlexElement } from 'alex-editor';
export type { AttachmentOptionsType } from './plugins/attachment';
export type { InsertAttachmentUploadErrorType } from './plugins/attachment/insertAttachment/props';
export { attachment, isAttachment, hasAttachmentInRange } from './plugins/attachment';
export type { MathformulaOptionsType } from './plugins/mathformula';
export { mathformula, isMathformula, isUnderMathformula, getMathformulaElement } from './plugins/mathformula';
export { install as default, install, Editify, version };
