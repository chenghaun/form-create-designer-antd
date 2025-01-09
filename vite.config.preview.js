/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:23:19
 * @LastEditors: chenghuan
 * @LastEditTime: 2025-01-09 16:52:44
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          "ant-design-vue": ["ant-design-vue"],
        },
        globals: {
          vue: "Vue",
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  plugins: [vue(), vueJSX()],
});
