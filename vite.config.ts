import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
	plugins: [vue(), dts()],
	build: {
		//打包后的目录名称
		outDir: 'lib',
		minify: 'terser',
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'editify',
			fileName: format => `editify.${format}.js`
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue'
				},
				exports: 'named'
			}
		},
		sourcemap: false //是否构建source map 文件
	},
	css: {
		preprocessorOptions: {
			less: {
				// 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
				javascriptEnabled: true,
				additionalData: `@import "src/css/base.less";`
			}
		}
	}
})
