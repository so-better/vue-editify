import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		//路径别名
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		//导入时想要省略的扩展名列表
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
	},
	build: {
		//打包后的目录名称
		outDir: 'lib',
		minify: 'terser',
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
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
	}
})
