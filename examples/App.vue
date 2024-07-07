<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<button @click="dark = !dark">{{ dark ? '浅色模式' : '深色模式' }}</button>
		<Editify :dark="dark" color="#1098f3" ref="editify" border v-model="val" :menu="menuConfig" style="height: 80%" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" :plugins="plugins" @rangeupdate="rangeUpdate" show-word-length></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, onMounted, ref, onErrorCaptured } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula, ToolbarConfigType, getMatchElementByRange, panel, elementIsMatch, infoBlock } from '../src/index'

onErrorCaptured(err => {
	console.log(err)
})

const val = ref<string>(`<h5><span>在传统HTML+JS+CSS项目中使用</span></h5><p><br></p><pre mvi-editor-element-key="8" mvi-hljs-language="" data-editify-element="10"><span class="editify-hljs-comment"><span>&lt;!-- HTML --&gt;</span></span><span>
</span><span class="editify-hljs-tag"><span>&lt;</span><span class="editify-hljs-name"><span>div</span></span><span> </span><span class="editify-hljs-attr"><span>id</span></span><span>=</span><span class="editify-hljs-string"><span>"app"</span></span><span>&gt;</span></span><span>
  </span><span class="editify-hljs-tag"><span>&lt;</span><span class="editify-hljs-name"><span>editify</span></span><span> </span><span class="editify-hljs-attr"><span>v-model</span></span><span>=</span><span class="editify-hljs-string"><span>"value"</span></span><span> </span><span class="editify-hljs-attr"><span>placeholder</span></span><span>=</span><span class="editify-hljs-string"><span>"请输入"</span></span><span>&gt;</span></span><span class="editify-hljs-tag"><span>&lt;/</span><span class="editify-hljs-name"><span>editify</span></span><span>&gt;</span></span><span>
</span><span class="editify-hljs-tag"><span>&lt;/</span><span class="editify-hljs-name"><span>div</span></span><span>&gt;</span></span></pre><pre mvi-editor-element-key="71" mvi-hljs-language="" data-editify-element="82" data-editify-hljs="html"><span class="editify-hljs-comment"><span>&lt;!-- JS --&gt;</span></span><span>
</span><span class="editify-hljs-tag"><span>&lt;</span><span class="editify-hljs-name"><span>script</span></span><span>&gt;</span></span><span class="language-javascript"><span>
  </span><span class="editify-hljs-keyword"><span>const</span></span><span> { createApp } = </span><span class="editify-hljs-title class_"><span>Vue</span></span><span>
  </span><span class="editify-hljs-keyword"><span>const</span></span><span> app = </span><span class="editify-hljs-title function_"><span>createApp</span></span><span>({
    </span><span class="editify-hljs-title function_"><span>data</span></span><span>(</span><span>){
﻿        </span><span class="editify-hljs-keyword"><span>return</span></span><span> {
﻿            </span><span class="editify-hljs-attr"><span>value</span></span><span>:</span><span class="editify-hljs-string"><span>'&lt;p&gt;&lt;br&gt;&lt;/p&gt;'</span></span><span>
﻿        }
﻿    }
  })
  </span><span class="editify-hljs-variable language_"><span>console</span></span><span>.</span><span class="editify-hljs-title function_"><span>log</span></span><span>(editify.</span><span class="editify-hljs-property"><span>version</span></span><span>) </span><span class="editify-hljs-comment"><span>//查看版本号</span></span><span>
  app.</span><span class="editify-hljs-title function_"><span>use</span></span><span>(editify)
  app.</span><span class="editify-hljs-title function_"><span>mount</span></span><span>(</span><span class="editify-hljs-string"><span>'#app'</span></span><span>)
</span></span><span class="editify-hljs-tag"><span>&lt;/</span><span class="editify-hljs-name"><span>script</span></span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>在&nbsp;Vue3&nbsp;的工程化项目中使用</span></h5><p><br></p><pre mvi-editor-element-key="153" data-editify-element="193" data-editify-hljs="javascript"><span class="editify-hljs-comment"><span>//vue-cli或者vite的main.js中</span></span><span>
</span><span class="editify-hljs-keyword"><span>import</span></span><span> { createApp } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue"</span></span><span>
</span><span class="editify-hljs-keyword"><span>import</span></span><span> </span><span class="editify-hljs-title class_"><span>App</span></span><span> </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>'./App.vue'</span></span><span>
</span><span class="editify-hljs-keyword"><span>import</span></span><span> editify,{ version } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue-editify"</span></span><span>
</span><span class="editify-hljs-variable language_"><span>console</span></span><span>.</span><span class="editify-hljs-title function_"><span>log</span></span><span>(version) </span><span class="editify-hljs-comment"><span>//查看版本号"</span></span><span>
</span><span class="editify-hljs-keyword"><span>const</span></span><span> app = </span><span class="editify-hljs-title function_"><span>createApp</span></span><span>(</span><span class="editify-hljs-title class_"><span>App</span></span><span>)
app.</span><span class="editify-hljs-title function_"><span>use</span></span><span>(editify)
app.</span><span class="editify-hljs-title function_"><span>mount</span></span><span>(</span><span class="editify-hljs-string"><span>"#app"</span></span><span>)</span></pre><pre data-editify-element="294"><span class="editify-hljs-tag"><span>&lt;</span><span class="editify-hljs-name"><span>editify</span></span><span> </span><span class="editify-hljs-attr"><span>v-model</span></span><span>=</span><span class="editify-hljs-string"><span>"value"</span></span><span> </span><span class="editify-hljs-attr"><span>placeholder</span></span><span>=</span><span class="editify-hljs-string"><span>"请输入"</span></span><span>&gt;</span></span><span class="editify-hljs-tag"><span>&lt;/</span><span class="editify-hljs-name"><span>editify</span></span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>局部注册</span></h5><p><br></p><p><span>vue-editify支持局部注册组件，你可以按照如下方式引入Editify组件再进行注册</span></p><pre data-editify-element="343"><span class="editify-hljs-keyword"><span>import</span></span><span> { </span><span class="editify-hljs-title class_"><span>Editify</span></span><span> } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue-editify"</span></span><span>
﻿</span><span class="editify-hljs-keyword"><span>export</span></span><span> </span><span class="editify-hljs-keyword"><span>default</span></span><span> {
    </span><span class="editify-hljs-attr"><span>component</span></span><span>:{
﻿        </span><span class="editify-hljs-attr"><span>editify</span></span><span>: </span><span class="editify-hljs-title class_"><span>Editify</span></span><span>
﻿    }﻿
﻿}</span></pre><p><br></p><p><br></p><h5><span>读取版本号</span></h5><p><br></p><pre data-editify-element="398" data-editify-hljs="javascript"><span class="editify-hljs-keyword"><span>import</span></span><span> { version } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue-editify"</span></span></pre><p><span>如果是浏览器直接引入js和css使用vue-editify的，则按照如下方法获取版本号</span></p><pre data-editify-element="415" data-editify-hljs="javascript"><span class="editify-hljs-keyword"><span>const</span></span><span> version = editify.</span><span class="editify-hljs-property"><span>version</span></span></pre><p><br></p><p><br></p><h5><span>获取AlexElement对象</span></h5><p><br></p><p><span>当你需要进行复杂的操作时，可能需要自行创建元素，则可以引入该对象</span></p><pre data-editify-element="436"><span class="editify-hljs-keyword"><span>import</span></span><span> { </span><span class="editify-hljs-title class_"><span>AlexElement</span></span><span> } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue-editify"</span></span></pre><p><span>如果是浏览器直接引入js和css使用vue-editify的，则按照如下方法获取AlexElement对象</span></p><pre data-editify-element="458"><span class="editify-hljs-keyword"><span>const</span></span><span> </span><span class="editify-hljs-title class_"><span>AlexElement</span></span><span> = editify.</span><span class="editify-hljs-property"><span>AlexElement</span></span></pre><p><span>关于AlexElement对象的使用请参考：</span><a href="https://www.ling0523.cn/alex-editor/document/6" data-editify-element="475"><span>《AlexElement元素》</span></a></p><p><br></p><p><br></p><h5><span>进阶使用</span></h5><p><br></p><p><span>如果你想进行更多复杂的操作，vue-editify可能无法满足，但是你可以通过操作alex-editor的相关对象来达到目的</span></p><pre data-editify-element="490"><span class="editify-hljs-comment"><span>//获取AlexElement对象，这样可以构建元素实例</span></span><span>
</span><span class="editify-hljs-keyword"><span>import</span></span><span> { </span><span class="editify-hljs-title class_"><span>AlexElement</span></span><span> } </span><span class="editify-hljs-keyword"><span>from</span></span><span> </span><span class="editify-hljs-string"><span>"vue-editify"</span></span></pre><pre data-editify-element="514"><span class="editify-hljs-comment"><span>//获取AlexEditor实例，调用底层方法</span></span><span>
﻿</span><span class="editify-hljs-keyword"><span>const</span></span><span> editor = </span><span class="editify-hljs-keyword"><span>this</span></span><span>.$refs.editify.editor</span></pre><pre data-editify-element="530" data-editify-hljs="javascript"><span class="editify-hljs-comment"><span>//通过AlexEditor实例来获取AlexRange实例</span></span><span>
﻿</span><span class="editify-hljs-keyword"><span>const</span></span><span> range = </span><span class="editify-hljs-variable language_"><span>this</span></span><span>.</span><span class="editify-hljs-property"><span>$refs</span></span><span>.</span><span class="editify-hljs-property"><span>editify</span></span><span>.</span><span class="editify-hljs-property"><span>editor</span></span><span>?.</span><span class="editify-hljs-property"><span>range</span></span></pre><p><br></p><p><span>通过操作这些底层的对象，你可以实现一些比较自由的操作，但是你可能需要先去了解alex-editor：</span><a href="https://www.ling0523.cn/alex-editor/" data-editify-element="569"><span>alex-editor开发文档</span></a></p>`)

const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'fixed',
	sourceView: {
		show: true
	},
	video: {
		multiple: true
	},
	fullScreen: {
		show: true
	}
})
const toolbarConfig = ref<ToolbarConfigType>({
	use: true
})
const plugins = ref<PluginType[]>([
	panel(),
	mathformula(),
	attachment(),
	infoBlock({
		leftBorder: true
	})
])
const dark = ref<boolean>(false)

const rangeUpdate = () => {
	const element = getMatchElementByRange(editify.value!.editor!, editify.value!.dataRangeCaches, {
		parsedom: 'div',
		marks: {
			'data-editify-task': true
		}
	})
	if (element) {
		console.log(
			elementIsMatch(element, {
				marks: {
					'data-editify-task': true
				}
			})
		)
	}
}
</script>
<style lang="less">
html,
body {
	height: 100%;
}
body {
	margin: 0;
}

#app {
	height: 100%;
	overflow: auto;
}

table {
	border: 1px solid #ccc;
	width: 100%;
	border-collapse: collapse;

	tr,
	td,
	th {
		border: 1px solid #ccc;
	}

	td {
		text-align: center;
		padding: 10px;
	}
}
</style>
