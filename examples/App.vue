<template>
	<div style="height: 100%">
		<Editify :dark="dark" ref="editifyRef" border v-model="val" :menu="menuConfig" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html show-word-length></Editify>
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
	use: true
})
const val = ref<string>(
	`<div data-editify-info="true" style="background-color: rgba(3, 168, 243, 0.15); color: rgb(3, 168, 243);"><span>调用domRender方法会先对编辑器内的元素进行格式化处理，然后会更新编辑器dom内容，渲染到视图上</span></div><p><br></p><p><br></p><h5><span>如何规范化校验（格式化）？</span></h5><p><br></p><h5><span>null</span></h5><div data-editify-list="ul"><span>stack数组元素只能是block元素，同时block元素只会出现在根部，如果某个元素的子元素是block元素，那么该block元素会被转为inline元素或者inblock元素（对于被转为inblock的block元素，其行为值behavior为"block"）</span></div><div data-editify-list="ul"><span>inblock与其他元素不能同时存在于子元素数组中，如果某个元素的子元素数组中含有inblock元素，那么其他子元素也必然是inblock元素，否则该inblock元素会被转为inline元素</span></div><div data-editify-list="ul"><span>inblock元素的父元素必然是block元素或者inblock元素</span></div><div data-editify-list="ul"><span>换行符清除规则：换行符与其他元素不能同时存在，并且如果某个元素下存在多个换行符则会被清除为一个换行符</span></div><div data-editify-list="ul"><span>兄弟元素合并策略：相邻的两个文本元素的styles和marks相同则会被合并；相邻的两个行内元素的parsedom、styles和marks相同则会被合并（如果两个元素中有元素的locked属性为true则无法进行合并）</span></div><div data-editify-list="ul"><span>父子元素合并策略：父元素的子元素只有一个，并且该子元素是文本元素，父元素是parsedom==AlexElement.TEXT_NODE的行内元素，则子元素会父元素进行合并；父元素的子元素只有一个，inline元素、inblock元素如果与父元素的parsedom一致，marks和styles也一致，那么会与父元素合并（如果两个元素中有元素的locked属性为true则无法进行合并）</span></div><div data-editify-list="ul"><span>多个连续空白文本字符合并策略：文本元素内的空白文本值如果存在多个连续的情况下，会被合并成一个空白文本值</span></div><div data-editify-list="ul"><span>元素进行规范化处理时，会从stack依次进行遍历处理，当遍历子元素时，也是从第一个子元素开始依次遍历</span></div><p><br></p><blockquote><span>以上是编辑器内部的默认规范化处理规则，当然，编辑器对外提供了让我们自定义额外规则的能力，它便是AlexEditor的属性renderRules</span></blockquote><p><br></p><p><br></p><h5><span>使用renderRules自定义额外的规范化校验规则</span></h5><p><br></p><p><span>renderRules是一个数组，数组中可以定义多个函数，每个函数都会在调用formatElementStack方法时进行调用</span></p><pre data-editify-element="42" data-editify-hljs="javascript"><span class="editify-hljs-comment">//例如将&lt;b&gt;标签转为&lt;span&gt;标签</span><span>
﻿</span><span class="editify-hljs-keyword">const</span><span> parseCode = </span><span class="editify-hljs-keyword">function</span><span>(</span><span class="editify-hljs-params">element</span><span>){
    </span><span class="editify-hljs-keyword">if</span><span> (element.</span><span class="editify-hljs-property">parsedom</span><span> == </span><span class="editify-hljs-string">'b'</span><span>) {
        element.</span><span class="editify-hljs-property">parsedom</span><span> = </span><span class="editify-hljs-string">'span'</span><span>
﻿        element.</span><span class="editify-hljs-property">styles</span><span> = {
﻿             </span><span class="editify-hljs-string">'font-weight'</span><span>:</span><span class="editify-hljs-string">'bold'</span><span>
﻿        }
    }﻿
﻿}</span></pre>`
)
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
