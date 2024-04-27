// vite.config.ts
import { defineConfig } from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/vue-editify/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/vue-editify/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/vue-editify/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/lingkai/Desktop/\u524D\u7AEF\u5E93/vue-editify";
var vite_config_default = defineConfig({
  plugins: [vue(), dts()],
  build: {
    //打包后的目录名称
    outDir: "lib",
    minify: "terser",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "editify",
      fileName: (format) => `editify.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        },
        exports: "named"
      }
    },
    sourcemap: false
    //是否构建source map 文件
  },
  css: {
    preprocessorOptions: {
      less: {
        // 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
        javascriptEnabled: true,
        additionalData: `@import "src/css/base.less";`
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGluZ2thaS9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUU5My92dWUtZWRpdGlmeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2xpbmdrYWkvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVFOTMvdnVlLWVkaXRpZnkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2xpbmdrYWkvRGVza3RvcC8lRTUlODklOEQlRTclQUIlQUYlRTUlQkElOTMvdnVlLWVkaXRpZnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFt2dWUoKSwgZHRzKCldLFxuXHRidWlsZDoge1xuXHRcdC8vXHU2MjUzXHU1MzA1XHU1NDBFXHU3Njg0XHU3NkVFXHU1RjU1XHU1NDBEXHU3OUYwXG5cdFx0b3V0RGlyOiAnbGliJyxcblx0XHRtaW5pZnk6ICd0ZXJzZXInLFxuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcblx0XHRcdG5hbWU6ICdlZGl0aWZ5Jyxcblx0XHRcdGZpbGVOYW1lOiBmb3JtYXQgPT4gYGVkaXRpZnkuJHtmb3JtYXR9LmpzYFxuXHRcdH0sXG5cdFx0cm9sbHVwT3B0aW9uczoge1xuXHRcdFx0Ly8gXHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU1OTA0XHU3NDA2XHU5MEEzXHU0RTlCXHU0RjYwXHU0RTBEXHU2MEYzXHU2MjUzXHU1MzA1XHU4RkRCXHU1RTkzXHU3Njg0XHU0RjlEXHU4RDU2XG5cdFx0XHRleHRlcm5hbDogWyd2dWUnXSxcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHQvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuXHRcdFx0XHRnbG9iYWxzOiB7XG5cdFx0XHRcdFx0dnVlOiAnVnVlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRleHBvcnRzOiAnbmFtZWQnXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzb3VyY2VtYXA6IGZhbHNlIC8vXHU2NjJGXHU1NDI2XHU2Nzg0XHU1RUZBc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcblx0fSxcblx0Y3NzOiB7XG5cdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xuXHRcdFx0bGVzczoge1xuXHRcdFx0XHQvLyBcdTRGN0ZcdTc1MjggbGVzcyBcdTdGMTZcdTUxOTlcdTY4MzdcdTVGMEZcdTc2ODQgVUkgXHU1RTkzXHVGRjA4XHU1OTgyIGFudGRcdUZGMDlcdTY1RjZcdTVFRkFcdThCQUVcdTUyQTBcdTUxNjVcdThGRDlcdTRFMkFcdThCQkVcdTdGNkVcblx0XHRcdFx0amF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcInNyYy9jc3MvYmFzZS5sZXNzXCI7YFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0c2VydmVyOiB7XG5cdFx0aG9zdDogJzAuMC4wLjAnXG5cdH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBQ3pWLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDdEIsT0FBTztBQUFBO0FBQUEsSUFFTixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSixPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sVUFBVSxZQUFVLFdBQVcsTUFBTTtBQUFBLElBQ3RDO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUVkLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBO0FBQUEsUUFFUCxTQUFTO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDTjtBQUFBLFFBQ0EsU0FBUztBQUFBLE1BQ1Y7QUFBQSxJQUNEO0FBQUEsSUFDQSxXQUFXO0FBQUE7QUFBQSxFQUNaO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSixxQkFBcUI7QUFBQSxNQUNwQixNQUFNO0FBQUE7QUFBQSxRQUVMLG1CQUFtQjtBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLE1BQ2pCO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNQO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
