<template>
	<div class="editify-table">
		<table>
			<tr v-for="row in tableGrids">
				<td :class="{ inside: column.inside }" v-for="column in row" @mouseenter="changeTableSize(column)" @click="createTable(column)">
					<span></span>
				</td>
			</tr>
		</table>
		<div class="editify-table-footer">
			<span v-if="specification">{{ specification.x }} x {{ specification.y }}</span>
			<span v-else>{{ $editTrans('insertTable') }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { InsertTableGridType, InsertTableProps } from './props'

defineOptions({
	name: 'InsertTable'
})
const props = defineProps(InsertTableProps)
const emits = defineEmits(['insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

//获取表格
const getTableGrids = () => {
	const grids: InsertTableGridType[][] = []
	for (let i = 1; i <= props.maxRows; i++) {
		let row: InsertTableGridType[] = []
		for (let j = 1; j <= props.maxColumns; j++) {
			row.push({
				x: i,
				y: j,
				inside: false //是否被选中
			})
		}
		grids.push(row)
	}
	return grids
}

const tableGrids = ref<InsertTableGridType[][]>(getTableGrids())

//表格规格
const specification = computed<InsertTableGridType>(() => {
	return tableGrids.value
		.flat()
		.filter(item => {
			return item.inside
		})
		.sort((a, b) => {
			if (a.x > b.x && a.y > b.y) {
				return -1
			}
			if (a.x > b.x) {
				return -1
			}
			if (a.y > b.y) {
				return -1
			}
			return 1
		})[0]
})
//改变表格大小
const changeTableSize = (data: InsertTableGridType) => {
	for (let i in tableGrids.value) {
		const grid = tableGrids.value[i]
		for (let j in grid) {
			if (grid[j].x <= data.x && grid[j].y <= data.y) {
				tableGrids.value[i][j].inside = true
			} else {
				tableGrids.value[i][j].inside = false
			}
		}
	}
}
//确认创立表格
const createTable = (data: InsertTableGridType) => {
	emits('insert', data.x, data.y)
}
</script>
<style scoped src="./insertTable.less"></style>
