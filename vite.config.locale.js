/*
 * @Author: chenghuan
 * @Date: 2025-01-03 14:23:19
 * @LastEditors: chenghuan
 * @LastEditTime: 2025-01-09 17:03:10
 * @Description:
 * @contact_information: 945918116@qq.com
 */
import { defineConfig } from "vite";

function toCase(str) {
  return str.replace(/(-[a-z])/g, function (v) {
    return v.replace("-", "").toLocaleUpperCase();
  });
}

function upper(str) {
  return str.replace(str[0], str[0].toLocaleUpperCase());
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const name = env.mode || "en";
  return {
    build: {
      outDir: "locale",
      lib: {
        entry: `src/locale/${name}.js`,
        name: "FcDesigner" + upper(toCase(name)),
        fileName: (format) => {
          if (format === "umd") {
            return `${name}.js`;
          } else {
            return `${name}.${format}.js`;
          }
        },
      },
      emptyOutDir: false,
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
  };
});
