import { App } from 'vue';
import { default as Editify } from './editify/editify.vue';
import { AlexElement } from 'alex-editor';

declare const version = "0.1.12";
declare const install: (app: App) => void;
declare const stdin_default: {
    install: (app: App) => void;
    version: string;
};
export * from './core/function';
export { stdin_default as default, install, version, Editify, AlexElement };
