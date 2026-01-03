import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          globals: true, // 是否启用全局变量
          name: "utils", // 测试项目名称
          include: ["packages/utils/__test__/**/*.{test,spec}.{ts,js,tsx,jsx}"],
          environment: "node" // 指定测试环境为node
        }
      },
      {
        plugins: [vue()], // 如果需要测试vue组件，需要引入vue插件
        test: {
          globals: true,
          name: "ui",
          include: ["packages/components/__test__/**/*.{test,spec}.{ts,js,tsx,jsx}"],
          browser: {
            enabled: true, // 是否启用浏览器测试
            instances: [{ browser: "chromium" }] // 指定浏览器类型
          }
        }
      }
    ]
  }
});
