<template>
	<div class="editify-table">
		<table>
			<tr v-for="row in tableGrids">
				<td :class="{ inside: column.inside }" v-for="column in row" @mouseenter="changeTableSize(column)" @click="createTable(column)">
					<span></span>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
export default {
	name: 'InsertTable',
	emits: ['insert'],
	props: {
		//主题色
		color: {
			type: String,
			default: ''
		},
		//最大行数
		maxRows: {
			type: Number,
			default: 10
		},
		//最大列数
		maxColumns: {
			type: Number,
			default: 10
		}
	},
	data() {
		return {
			tableGrids: this.getTableGrids()
		}
	},
	methods: {
		//确认创立表格
		createTable(data) {
			this.$emit('insert', data.x, data.y)
		},
		//改变表格大小
		changeTableSize(data) {
			for (let i in this.tableGrids) {
				const grid = this.tableGrids[i]
				for (let j in grid) {
					if (grid[j].x <= data.x && grid[j].y <= data.y) {
						this.tableGrids[i][j].inside = true
					} else {
						this.tableGrids[i][j].inside = false
					}
				}
			}
		},
		//获取表格
		getTableGrids() {
			const grids = []
			for (let i = 1; i <= this.maxRows; i++) {
				let row = []
				for (let j = 1; j <= this.maxColumns; j++) {
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
	}
}
</script>
<style lang="less" scoped>
.editify-table {
	display: block;
	position: relative;
	padding: 10px;

	table {
		border: 1px solid @border-color;
		margin: 0;
		padding: 0;
		border-collapse: collapse;

		tr {
			margin: 0;
			padding: 0;

			td {
				margin: 0;
				padding: 0;
				border: 1px solid @border-color;

				span {
					display: block;
					width: 15px;
					height: 15px;
				}

				&:hover {
					cursor: pointer;
				}

				&.inside {
					background-color: @background-darker;
				}
			}
		}
	}
}
</style>
