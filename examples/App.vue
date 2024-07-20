<template>
	<div style="height: 100%">
		<Editify :dark="dark" ref="editifyRef" border v-model="val" :menu="menuConfig" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="en_US" allow-paste-html show-word-length></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref, onErrorCaptured } from 'vue'
import { Editify } from '../src'

onErrorCaptured(err => {
	console.log(err)
})

const editifyRef = ref<InstanceType<typeof Editify> | null>(null)
const dark = ref<boolean>(false)
const menuConfig = ref({
	use: true,
	mode: 'inner',
	sequence: {
		dark: 100
	},
	sourceView: {
		show: true
	},
	fullScreen: {
		show: true
	},
	attachment: {
		show: true
	},
	mathformula: {
		show: true,
		handleError: err => {
			console.log(err)
		}
	},
	panel: {
		show: true
	},
	infoBlock: {
		show: true
	},
	extends: {
		dark: {
			title: '深色模式',
			leftBorder: true,
			active: dark.value,
			default: () => h('span', dark.value ? '深色模式' : '浅色模式'),
			onOperate: () => {
				dark.value = !dark.value
			}
		}
	}
})
const toolbarConfig = ref({
	use: true,
	text: {}
})
const val =
	ref<string>(`<p>333</p><table><tr><td>3333</td></tr></table><blockquote><span>vue-editify在光标操作的某些场景下，会在光标附近或者元素附近展示一个横向的工具条，工具条上提供了多种便捷操作</span></blockquote><p><br></p><h5><span>关于工具条</span></h5><p><br></p><div data-editify-list="ul"><span>工具条是编辑器编辑区域浮动展示的一个方便我们操作的栏目，具体分为</span><span style="font-weight: bold;">表格工具条</span><span>、</span><span style="font-weight: bold;">链接工具条</span><span>、</span><span style="font-weight: bold;">图片工具条</span><span>、</span><span style="font-weight: bold;">视频工具条</span><span>、</span><span style="font-weight: bold;">代码块工具条</span><span>和</span><span style="font-weight: bold;">文本工具条</span></div><div data-editify-list="ul"><span>工具条配置参数toolbar对象配置采用平替的方法，即只会对你配置的属性进行使用，未配置属性使用默认属性</span></div><p><br></p><p><br></p><h5><span>具体配置</span></h5><p><br></p><table data-editify-element="297523" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="13.55%"><col width="10.32%"><col width="57.74%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>use</span></td><td><span>boolean</span></td><td><span>是否使用工具条</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>style</span></td><td><span>object</span></td><td><span>工具条样式设置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>tooltip</span></td><td><span>boolean</span></td><td><span>是否使用工具提示</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>codeBlock</span></td><td><span>object</span></td><td><span>代码块工具条配置，具体见下述文档</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>text</span></td><td><span>object</span></td><td><span>文本工具条配置，具体见下述文档</span></td><td><span>-</span></td><td><span>-</span></td></tr></tbody></table><p><br></p><h5><span>codeBlock代码块工具条配置</span></h5><p><br></p><p><span>codeBlock是一个对象值，主要是针对代码块工具条的部分配置</span></p><table data-editify-element="297605" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>languages</span></td><td><span>object</span></td><td><span>语言列表按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr></tbody></table><p><br></p><p><span>languages按钮属性如下：</span></p><table data-editify-element="297639" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="10.32%"><col width="8.17%"><col width="64.3%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示语言列表按钮，如果为false则不显示此按钮并且代码块不会进行高亮处理</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>语言列表配置，数组中每个元素是一个对象，包含label和value两个属性，value表示语言的值，label是显示在列表上的名称，目前支持的语言值有：“plaintext”、“json”、“javascript”、“java”、“typescript”、“python”、“php”、“css”、“less”、“scss”、“html”、“markdown”、“objectivec”、“swift”、“dart”、“nginx”、“http”、“go”、“ruby”、“c”、“cpp”、“csharp”、“sql”、“shell”、“r”、“kotlin”、“rust”</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度，单位px</span></td><td><span>-</span></td><td><span>120</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设为空字符串，则表示不设置</span></td><td><span>-</span></td><td><span>180</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="297735" data-editify-hljs=""><span class="editify-hljs-comment">// languages options默认配置如下</span><span>
[
    {
        </span><span class="editify-hljs-attr">label</span><span>:</span><span class="editify-hljs-string">'自动识别'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>:</span><span class="editify-hljs-string">''</span><span>    
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Plain Text'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'plaintext'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'JSON'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'json'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'JavaScript'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'javascript'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Java'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'java'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'TypeScript'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'typescript'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Python'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'python'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'PHP'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'php'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'CSS'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'css'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Less'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'less'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Scss'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'scss'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'HTML'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'html'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Markdown'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'markdown'</span><span>
    },
    {
	</span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Objective-C'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'objectivec'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Swift'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'swift'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Dart'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'dart'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Nginx'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'nginx'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'HTTP'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'http'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Go'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'go'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Ruby'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'ruby'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'C'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'c'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'C++'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'cpp'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'C#'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'csharp'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'SQL'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'sql'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Shell'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'shell'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'R'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'r'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Kotlin'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'kotlin'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Rust'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'rust'</span><span>
    }
]</span></pre><blockquote><span>关于按钮的options数组，每一项都包含label、value、icon和style四个属性，但是icon和style属性并非是必要的。如果options的某一项是一个字符串或者数值，表示label和value一样，都是这个字符串或者数值，此时icon和style未设置。</span></blockquote><blockquote><span>icon属性用于定义选项左侧的图标，具体值由组件内部定义，对于拥有icon属性的选项，你可以设置icon为null来不显示图标</span></blockquote><blockquote><span>style属性用于定义该选项的样式，一般用以设置字体大小和粗细等来达到使得该选项与众不同的目的</span></blockquote><p><br></p><p><br></p><h5><span>text文本工具条配置</span></h5><p><br></p><p><span>text是一个对象值，主要是用于自定义配置文本工具条中的按钮</span></p><table data-editify-element="297978" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>heading</span></td><td><span>object</span></td><td><span>标题按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>align</span></td><td><span>object</span></td><td><span>对齐方式按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>orderList</span></td><td><span>object</span></td><td><span>有序列表按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>unorderList</span></td><td><span>object</span></td><td><span>无序列表按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>task</span></td><td><span>object</span></td><td><span>任务列表按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>bold</span></td><td><span>object</span></td><td><span>加粗按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>italic</span></td><td><span>object</span></td><td><span>斜体按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>strikethrough</span></td><td><span>object</span></td><td><span>删除线按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>underline</span></td><td><span>object</span></td><td><span>下划线按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>code</span></td><td><span>object</span></td><td><span>行内代码按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>super</span></td><td><span>object</span></td><td><span>上标按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>sub</span></td><td><span>object</span></td><td><span>下标按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>fontSize</span></td><td><span>object</span></td><td><span>字号按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>fontFamily</span></td><td><span>object</span></td><td><span>字体按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>lineHeight</span></td><td><span>object</span></td><td><span>行高按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>foreColor</span></td><td><span>object</span></td><td><span>前景色按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>backColor</span></td><td><span>object</span></td><td><span>背景色按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>formatClear</span></td><td><span>object</span></td><td><span>清除格式按钮配置</span></td><td><span>-</span></td><td><span>-</span></td></tr></tbody></table><p><br></p><p><span>heading按钮属性如下：</span></p><table data-editify-element="298199" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="11.61%"><col width="13.23%"><col width="58.49%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>标题选项列表配置，数组中每个元素是一个对象，包含label、value、style三个属性，label表示显示的名称，value表示具体的标签值，style表示选项自定义样式的对象</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>defaultValue</span></td><td><span>string&nbsp;|&nbsp;number</span></td><td><span>如果选项列表的值都不符合的情况下默认显示的值</span></td><td><span>-</span></td><td><span>"p"</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度，单位px</span></td><td><span>-</span></td><td><span>130</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设为空字符串，则表示不设置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="298306" data-editify-hljs="javascript"><span class="editify-hljs-comment">//heading options默认配置如下</span><span>
﻿[
﻿    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'正文'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'p'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'一级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h1'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'26px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>:</span><span class="editify-hljs-string">'二级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h2'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'24px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'三级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h3'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'22px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'四级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h4'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'20px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'五级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h5'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'18px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'六级标题'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'h6'</span><span>,
        </span><span class="editify-hljs-attr">style</span><span>: {
            </span><span class="editify-hljs-attr">fontSize</span><span>: </span><span class="editify-hljs-string">'16px'</span><span>,
            </span><span class="editify-hljs-attr">fontWeight</span><span>: </span><span class="editify-hljs-string">'bold'</span><span>
        }
    }
﻿]</span></pre><p><br></p><p><span>align按钮属性如下：</span></p><table data-editify-element="298429" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="10.43%"><col width="8.06%"><col width="65.16%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>对齐方式选项列表配置，数组中每个元素是一个对象，包含label、value、icon三个属性，label表示显示的名称，value表示具体的样式值，icon表示选项显示在选项中的对齐方式图标</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度，单位px</span></td><td><span>-</span></td><td><span>110</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设为空字符串，则表示不设置</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮是否显示左侧边框</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮是否显示右侧边框</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="298525"><span class="editify-hljs-comment">//align options默认配置如下</span><span>
﻿[
﻿    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'左对齐'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'left'</span><span>,
﻿        </span><span class="editify-hljs-attr">icon</span><span>: </span><span class="editify-hljs-string">'align-left'</span><span>
    },
    ﻿{
        </span><span class="editify-hljs-attr">label</span><span>:</span><span class="editify-hljs-string">'右对齐'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'right'</span><span>,
        </span><span class="editify-hljs-attr">icon</span><span>: </span><span class="editify-hljs-string">'align-right'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'居中对齐'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'center'</span><span>,
        </span><span class="editify-hljs-attr">icon</span><span>: </span><span class="editify-hljs-string">'align-center'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'两端对齐'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'justify'</span><span>,
        </span><span class="editify-hljs-attr">icon</span><span>: </span><span class="editify-hljs-string">'align-justify'</span><span>
    }
﻿]</span></pre><p><br></p><p><span>orderList、unorderList、task、super、sub、code按钮属性如下：</span></p><table data-editify-element="298580" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><p><br></p><p><span>bold、italic、underline、strikethrough按钮属性如下：</span></p><table data-editify-element="298647" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧是否显示边框</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧是否显示边框</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><p><br></p><p><span>fontSize按钮属性如下：</span></p><table data-editify-element="298714" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="13.44%"><col width="13.23%"><col width="56.45%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>按钮字号列表配置，数组中每个元素是一个对象，包含label、value两个属性，label表示显示的名称，value表示具体的字号值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>defaultValue</span></td><td><span>string&nbsp;|&nbsp;number</span></td><td><span>如果选项列表的值都不符合的情况下默认显示的值</span></td><td><span>-</span></td><td><span>''</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度，单位px</span></td><td><span>-</span></td><td><span>100</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设置为空字符串，则表示不限制最大高度</span></td><td><span>-</span></td><td><span>200</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="298821"><span class="editify-hljs-comment">//fontSize options默认配置如下</span><span>
﻿[
﻿    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'默认字号'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">''</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'12px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'12px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'14px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'14px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'16px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'16px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'18px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'18px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'20px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'20px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'24px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'24px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'28px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'28px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'32px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'32px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'36px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'36px'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'40px'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'40px'</span><span>
    }
﻿]</span></pre><p><br></p><p><span>fontFamily按钮属性如下：</span></p><table data-editify-element="298916" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="11.18%"><col width="13.55%"><col width="59.25%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>按钮字号列表配置，数组中每个元素是一个对象，包含label、value两个属性，label表示显示的名称，value表示具体的字体值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>defaultValue</span></td><td><span>string&nbsp;|&nbsp;number</span></td><td><span>如果选项列表的值都不符合的情况下默认显示的值</span></td><td><span>-</span></td><td><span>''</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度</span></td><td><span>-</span></td><td><span>100</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设置为空字符串，则表示不限制最大高度</span></td><td><span>-</span></td><td><span>200</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="299023" data-editify-hljs="javascript"><span class="editify-hljs-comment">//fontFamily options默认配置如下</span><span>
﻿[
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'默认字体'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">''</span><span>
     },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'黑体'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'黑体,黑体-简'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'华文仿宋'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'华文仿宋'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'楷体'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'楷体,楷体-简'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'华文楷体'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'华文楷体'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'宋体'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'宋体,宋体-简'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Arial'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'Arial'</span><span>
    },
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'Consolas'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">'Consolas,monospace'</span><span>
    }
]</span></pre><p><br></p><p><span>lineHeight属性如下：</span></p><table data-editify-element="299094" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="13.01%"><col width="13.12%"><col width="56.77%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>按钮列表配置，数组中每个元素是一个对象，包含label、value两个属性，label表示显示的名称，value表示具体的行高值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>defaultValue</span></td><td><span>string&nbsp;|&nbsp;number</span></td><td><span>如果选项列表的值都不符合的情况下默认显示的值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>width</span></td><td><span>number</span></td><td><span>按钮浮层宽度，单位px</span></td><td><span>-</span></td><td><span>90</span></td></tr><tr><td><span>maxHeight</span></td><td><span>number</span></td><td><span>按钮浮层最大高度，单位px，如果设置为空字符串，则表示不限制最大高度</span></td><td><span>-</span></td><td><span>''</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="299201"><span class="editify-hljs-comment">//lineHeight options默认配置如下</span><span>
﻿[
    {
        </span><span class="editify-hljs-attr">label</span><span>: </span><span class="editify-hljs-string">'默认行高'</span><span>,
        </span><span class="editify-hljs-attr">value</span><span>: </span><span class="editify-hljs-string">''</span><span>
    },
    </span><span class="editify-hljs-number">1</span><span>,
    </span><span class="editify-hljs-number">1.15</span><span>,
    </span><span class="editify-hljs-number">1.5</span><span>,
    </span><span class="editify-hljs-number">2</span><span>,
    </span><span class="editify-hljs-number">2.5</span><span>,
    </span><span class="editify-hljs-number">3</span><span>
]</span></pre><p><br></p><p><span>foreColor按钮属性如下：</span></p><table data-editify-element="299228" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="10.65%"><col width="9.78%"><col width="63.23%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>按钮列表配置，数组中每个元素是一个对象，包含label、value两个属性，label表示显示的工具提示内容，value表示具体的颜色值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="299302" data-editify-hljs="javascript"><span class="editify-hljs-comment">// foreColor options默认配置如下</span><span>
﻿[</span><span class="editify-hljs-string">'#000000'</span><span>, </span><span class="editify-hljs-string">'#505050'</span><span>, </span><span class="editify-hljs-string">'#808080'</span><span>, </span><span class="editify-hljs-string">'#BBBBBB'</span><span>, </span><span class="editify-hljs-string">'#CCCCCC'</span><span>, </span><span class="editify-hljs-string">'#EEEEEE'</span><span>, </span><span class="editify-hljs-string">'#F7F7F7'</span><span>, </span><span class="editify-hljs-string">'#FFFFFF'</span><span>, </span><span class="editify-hljs-string">'#EC1A0A'</span><span>, </span><span class="editify-hljs-string">'#FF9900'</span><span>, </span><span class="editify-hljs-string">'#FFFF00'</span><span>, </span><span class="editify-hljs-string">'#07C160'</span><span>, </span><span class="editify-hljs-string">'#00FFFF'</span><span>, </span><span class="editify-hljs-string">'#0B73DE'</span><span>, </span><span class="editify-hljs-string">'#9C00FF'</span><span>, </span><span class="editify-hljs-string">'#FF00FF'</span><span>, </span><span class="editify-hljs-string">'#F7C6CE'</span><span>, </span><span class="editify-hljs-string">'#FFE7CE'</span><span>, </span><span class="editify-hljs-string">'#FFEFC6'</span><span>, </span><span class="editify-hljs-string">'#D6EFD6'</span><span>, </span><span class="editify-hljs-string">'#CEDEE7'</span><span>, </span><span class="editify-hljs-string">'#CEE7F7'</span><span>, </span><span class="editify-hljs-string">'#D6D6E7'</span><span>, </span><span class="editify-hljs-string">'#E7D6DE'</span><span>, </span><span class="editify-hljs-string">'#E79C9C'</span><span>, </span><span class="editify-hljs-string">'#FFC69C'</span><span>, </span><span class="editify-hljs-string">'#FFE79C'</span><span>, </span><span class="editify-hljs-string">'#B5D6A5'</span><span>, </span><span class="editify-hljs-string">'#A5C6CE'</span><span>, </span><span class="editify-hljs-string">'#9CC6EF'</span><span>, </span><span class="editify-hljs-string">'#B5A5D6'</span><span>, </span><span class="editify-hljs-string">'#D6A5BD'</span><span>, </span><span class="editify-hljs-string">'#e45649'</span><span>, </span><span class="editify-hljs-string">'#F7AD6B'</span><span>, </span><span class="editify-hljs-string">'#FFD663'</span><span>, </span><span class="editify-hljs-string">'#94BD7B'</span><span>, </span><span class="editify-hljs-string">'#73A5AD'</span><span>, </span><span class="editify-hljs-string">'#6BADDE'</span><span>, </span><span class="editify-hljs-string">'#8C7BC6'</span><span>, </span><span class="editify-hljs-string">'#C67BA5'</span><span>, </span><span class="editify-hljs-string">'#CE0000'</span><span>, </span><span class="editify-hljs-string">'#E79439'</span><span>, </span><span class="editify-hljs-string">'#EFC631'</span><span>, </span><span class="editify-hljs-string">'#50a14f'</span><span>, </span><span class="editify-hljs-string">'#4A7B8C'</span><span>, </span><span class="editify-hljs-string">'#03A8F3'</span><span>, </span><span class="editify-hljs-string">'#634AA5'</span><span>, </span><span class="editify-hljs-string">'#A54A7B'</span><span>, </span><span class="editify-hljs-string">'#9C0000'</span><span>, </span><span class="editify-hljs-string">'#B56308'</span><span>, </span><span class="editify-hljs-string">'#BD9400'</span><span>, </span><span class="editify-hljs-string">'#397B21'</span><span>, </span><span class="editify-hljs-string">'#104A5A'</span><span>, </span><span class="editify-hljs-string">'#085294'</span><span>, </span><span class="editify-hljs-string">'#311873'</span><span>, </span><span class="editify-hljs-string">'#731842'</span><span>, </span><span class="editify-hljs-string">'#630000'</span><span>, </span><span class="editify-hljs-string">'#7B3900'</span><span>, </span><span class="editify-hljs-string">'#986801'</span><span>, </span><span class="editify-hljs-string">'#295218'</span><span>, </span><span class="editify-hljs-string">'#083139'</span><span>, </span><span class="editify-hljs-string">'#003163'</span><span>, </span><span class="editify-hljs-string">'#21104A'</span><span>, </span><span class="editify-hljs-string">'#4A1031'</span><span>]</span></pre><p><br></p><p><span>backColor按钮属性如下：</span></p><table data-editify-element="299437" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="10.54%"><col width="87"><col width="62.15%"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>options</span></td><td><span>array</span></td><td><span>按钮列表配置，数组中每个元素是一个对象，包含label、value两个属性，label表示显示的工具提示内容，value表示具体的颜色值</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><pre data-editify-element="299511"><span class="editify-hljs-comment">// backColor options默认配置如下</span><span>
﻿</span><span class="editify-hljs-selector-attr"><span>[</span><span class="editify-hljs-string">'#000000'</span><span>, </span><span class="editify-hljs-string">'#505050'</span><span>, </span><span class="editify-hljs-string">'#808080'</span><span>, </span><span class="editify-hljs-string">'#BBBBBB'</span><span>, </span><span class="editify-hljs-string">'#CCCCCC'</span><span>, </span><span class="editify-hljs-string">'#EEEEEE'</span><span>, </span><span class="editify-hljs-string">'#F7F7F7'</span><span>, </span><span class="editify-hljs-string">'#FFFFFF'</span><span>, </span><span class="editify-hljs-string">'#EC1A0A'</span><span>, </span><span class="editify-hljs-string">'#FF9900'</span><span>, </span><span class="editify-hljs-string">'#FFFF00'</span><span>, </span><span class="editify-hljs-string">'#07C160'</span><span>, </span><span class="editify-hljs-string">'#00FFFF'</span><span>, </span><span class="editify-hljs-string">'#0B73DE'</span><span>, </span><span class="editify-hljs-string">'#9C00FF'</span><span>, </span><span class="editify-hljs-string">'#FF00FF'</span><span>, </span><span class="editify-hljs-string">'#F7C6CE'</span><span>, </span><span class="editify-hljs-string">'#FFE7CE'</span><span>, </span><span class="editify-hljs-string">'#FFEFC6'</span><span>, </span><span class="editify-hljs-string">'#D6EFD6'</span><span>, </span><span class="editify-hljs-string">'#CEDEE7'</span><span>, </span><span class="editify-hljs-string">'#CEE7F7'</span><span>, </span><span class="editify-hljs-string">'#D6D6E7'</span><span>, </span><span class="editify-hljs-string">'#E7D6DE'</span><span>, </span><span class="editify-hljs-string">'#E79C9C'</span><span>, </span><span class="editify-hljs-string">'#FFC69C'</span><span>, </span><span class="editify-hljs-string">'#FFE79C'</span><span>, </span><span class="editify-hljs-string">'#B5D6A5'</span><span>, </span><span class="editify-hljs-string">'#A5C6CE'</span><span>, </span><span class="editify-hljs-string">'#9CC6EF'</span><span>, </span><span class="editify-hljs-string">'#B5A5D6'</span><span>, </span><span class="editify-hljs-string">'#D6A5BD'</span><span>, </span><span class="editify-hljs-string">'#e45649'</span><span>, </span><span class="editify-hljs-string">'#F7AD6B'</span><span>, </span><span class="editify-hljs-string">'#FFD663'</span><span>, </span><span class="editify-hljs-string">'#94BD7B'</span><span>, </span><span class="editify-hljs-string">'#73A5AD'</span><span>, </span><span class="editify-hljs-string">'#6BADDE'</span><span>, </span><span class="editify-hljs-string">'#8C7BC6'</span><span>, </span><span class="editify-hljs-string">'#C67BA5'</span><span>, </span><span class="editify-hljs-string">'#CE0000'</span><span>, </span><span class="editify-hljs-string">'#E79439'</span><span>, </span><span class="editify-hljs-string">'#EFC631'</span><span>, </span><span class="editify-hljs-string">'#50a14f'</span><span>, </span><span class="editify-hljs-string">'#4A7B8C'</span><span>, </span><span class="editify-hljs-string">'#03A8F3'</span><span>, </span><span class="editify-hljs-string">'#634AA5'</span><span>, </span><span class="editify-hljs-string">'#A54A7B'</span><span>, </span><span class="editify-hljs-string">'#9C0000'</span><span>, </span><span class="editify-hljs-string">'#B56308'</span><span>, </span><span class="editify-hljs-string">'#BD9400'</span><span>, </span><span class="editify-hljs-string">'#397B21'</span><span>, </span><span class="editify-hljs-string">'#104A5A'</span><span>, </span><span class="editify-hljs-string">'#085294'</span><span>, </span><span class="editify-hljs-string">'#311873'</span><span>, </span><span class="editify-hljs-string">'#731842'</span><span>, </span><span class="editify-hljs-string">'#630000'</span><span>, </span><span class="editify-hljs-string">'#7B3900'</span><span>, </span><span class="editify-hljs-string">'#986801'</span><span>, </span><span class="editify-hljs-string">'#295218'</span><span>, </span><span class="editify-hljs-string">'#083139'</span><span>, </span><span class="editify-hljs-string">'#003163'</span><span>, </span><span class="editify-hljs-string">'#21104A'</span><span>, </span><span class="editify-hljs-string">'#4A1031'</span><span>]</span></span></pre><p><br></p><p><span>formatClear按钮属性如下：</span></p><table data-editify-element="299648" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>show</span></td><td><span>boolean</span></td><td><span>是否显示按钮</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>leftBorder</span></td><td><span>boolean</span></td><td><span>按钮左侧边框是否显示</span></td><td><span>true/false</span></td><td><span>true</span></td></tr><tr><td><span>rightBorder</span></td><td><span>boolean</span></td><td><span>按钮右侧边框是否显示</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>按钮是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr></tbody></table><p><br></p><p><span>好了，这篇文章比较长，工具条的配置相对于直接的属性来说较为复杂，但是如果你能够看完的话，相信你对工具条已经可以进行操作了</span></p>`)
</script>
<style lang="less">
html,
body {
	height: 100%;
}
body {
	margin: 0;
	background-color: var(--editify-background);
}

#app {
	height: 100%;
	overflow: auto;
}
</style>
