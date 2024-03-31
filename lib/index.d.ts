import { ObjectType } from './core/tool';
import { App } from 'vue';
import { default as Editify } from './editify/editify.vue';
import { AlexElement } from 'alex-editor';

declare const version = "0.1.10";
declare const install: (app: App, props?: ObjectType) => void;
declare const stdin_default: {
    install: (app: App, props?: ObjectType) => void;
    version: string;
};
export { stdin_default as default, install, version, Editify, AlexElement };
