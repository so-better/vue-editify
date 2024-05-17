<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<table>
			<tbody>
				<tr>
					<td colspan="4"><br /></td>
					<td rowspan="2"><br /></td>
				</tr>
				<tr>
					<td><br /></td>
					<td><br /></td>
					<td><br /></td>
					<td rowspan="3"><br /></td>
				</tr>
				<tr>
					<td colspan="3"><br /></td>

					<td rowspan="2"><br /></td>
				</tr>
				<tr>
					<td><br /></td>
					<td><br /></td>
					<td><br /></td>
				</tr>
				<tr>
					<td><br /></td>
					<td><br /></td>
					<td colspan="2"><br /></td>
					<td><br /></td>
				</tr>
				<tr>
					<td><br /></td>
					<td><br /></td>
					<td colspan="3"><br /></td>
				</tr>
			</tbody>
		</table>
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html :plugins="plugins" @rangeupdate="rangeupdate"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula, ToolbarConfigType, getMatchElementsByRange } from '../src/index'
const val = ref<string>('<table><tbody><tr><td colspan="4"><br></td><td rowspan="2"><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td rowspan="3"><br></td></tr><tr><td colspan="3"><br></td><td rowspan="2"><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td colspan="2"><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td colspan="3"><br></td></tr></tbody></table>')

const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'inner',
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
	attachment({
		leftBorder: true
	}),
	mathformula()
])

const rangeupdate = () => {
	const elements = getMatchElementsByRange(editify.value!.editor!, editify.value!.dataRangeCaches, {
		styles: {
			'font-weight': 'bold'
		}
	})
	console.log(elements)
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
