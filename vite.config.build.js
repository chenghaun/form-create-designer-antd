/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:23:19
 * @LastEditors: chenghuan
 * @LastEditTime: 2025-01-09 16:59:24
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import cssnano from "cssnano";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import visualizer from "rollup-plugin-visualizer";
const extnedsPlugins = [];

// 打包生产环境才引入的插件
// if (process.env.NODE_ENV === "production") {
//   // 打包依赖展示
//   extnedsPlugins.push(
//     visualizer({
//       open: true,
//       gzipSize: true,
//       brotliSize: true,
//     })
//   );
// }
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "FcDesigner",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "ant-design-vue": "antd",
        },
      },
      treeshake: true,
      external: [
        "vue",
        "ant-design-vue",
        "@form-create/ant-design-vue",
        "moment",
      ],
    },
    brotliSize: true,
  },
  css: {
    postcss: {
      plugins: [
        cssnano({
          preset: "advanced",
        }),
      ],
    },
  },
  plugins: [vue(), vueJSX(), cssInjectedByJsPlugin(), ...extnedsPlugins],
});
