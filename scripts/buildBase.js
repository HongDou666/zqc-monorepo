// Node.js 内置模块，用于处理文件路径
import path from "node:path";
// Node.js 内置模块，用于处理文件 URL
import URL from "node:url";
// Node.js 文件系统模块
import fs from "node:fs";
// Rollup 插件：用于解析 node_modules 中的依赖
import { nodeResolve } from "@rollup/plugin-node-resolve";
// Rollup 插件：用于支持 CommonJS 模块
import commonjs from "@rollup/plugin-commonjs";
// Rollup 插件：用于 TypeScript 支持
import typescript from "rollup-plugin-typescript2";
// Vite 插件：用于处理 Vue 单文件组件
import vue from "@vitejs/plugin-vue";
// Rollup 插件：用于处理 PostCSS
import postcss from "rollup-plugin-postcss";

// 获取当前文件的绝对路径和所在目录
const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 需要构建的 package 列表
const packages = ["utils", "components"];

/**
 * 获取所有 package 的根目录绝对路径
 */
function getPackageRoots() {
  return packages.map(pkg => path.resolve(__dirname, "../packages", pkg));
}

/**
 * 读取指定 package 的 package.json 内容并解析为对象
 * @param {string} root package 根目录
 * @returns {Promise<Object>} package.json 对象
 */
async function packageJson(root) {
  const jsonPath = path.resolve(root, "package.json");
  const content = await fs.promises.readFile(jsonPath, "utf-8");
  return JSON.parse(content);
}

/**
 * 生成指定 package 的 Rollup 构建配置
 * @param {string} root package 根目录
 * @returns {Promise<Object>} Rollup 配置对象
 */
async function getRollupConfig(root) {
  // 读取 package.json
  const config = await packageJson(root);
  // tsconfig 路径
  const tsconfig = path.resolve(root, "tsconfig.json");
  // 从 buildOptions 读取 name 和 formats
  const { name, formats } = config.buildOptions || {};
  // 输出目录
  const dist = path.resolve(root, "./dist");
  // 入口文件
  const entry = path.resolve(root, "./src/index.ts");
  // Rollup 配置
  const rollupOptions = {
    input: entry, // 构建入口
    sourcemap: true, // 生成 sourcemap
    external: ["vue", "ant-design-vue", "@ant-design/icons-vue", "dayjs"], // 外部依赖 排除打包
    plugins: [
      nodeResolve(), // 解析 node_modules
      commonjs(), // 支持 CommonJS
      typescript({
        tsconfig,
        compilerOptions: {
          outDir: dist // 输出目录
        }
      }),
      vue({
        template: {
          compilerOptions: {
            // 自定义 AST 转换，移除 data-testid 属性
            nodeTransforms: [
              node => {
                if (node.type === 1 /* NodeTypes.ELEMENT */) {
                  // 过滤掉所有 data-testid 属性
                  node.props = node.props.filter(prop => {
                    if (prop.type === 6 /* NodeTypes.ATTRIBUTE */) {
                      return prop.name !== "data-testid";
                    }
                    return true;
                  });
                }
              }
            ]
          }
        }
      }),
      postcss() // 处理 CSS
    ],
    dir: dist // 输出目录
  };
  // 构建输出格式配置
  const output = [];
  for (const format of formats) {
    const outputItem = {
      format, // 构建格式（如 esm、cjs、iife）
      file: path.resolve(dist, `index.${format}.js`), // 输出文件名
      sourcemap: true,
      globals: {
        vue: "Vue", // 全局变量映射
        "ant-design-vue": "antd", // 全局变量映射
        "@ant-design/icons-vue": "iconsVue", // 全局变量映射
        dayjs: "dayjs" // 全局变量映射
      }
    };
    if (format === "iife") {
      outputItem.name = name; // iife 格式需要 name
    }
    output.push(outputItem);
  }
  rollupOptions.output = output;
  // 监听选项
  rollupOptions.watch = {
    include: path.resolve(root, "src/**"), // 监听 src 目录
    exclude: path.resolve(root, "node_modules/**"), // 排除 node_modules
    clearScreen: false // 不清屏
  };
  return rollupOptions;
}

/**
 * 获取所有 package 的 Rollup 构建配置集合
 * @returns {Promise<Object>} { packageName: rollupConfig }
 */
export async function getRollupConfigs() {
  const roots = getPackageRoots();
  // 并发获取每个 package 的配置
  const configs = await Promise.all(roots.map(getRollupConfig));
  const result = {};
  for (let i = 0; i < packages.length; i++) {
    result[packages[i]] = configs[i];
  }
  return result;
}

/**
 * 清空指定 package 的 dist 目录
 * @param {string} name package 名称
 */
export function clearDist(name) {
  const dist = path.resolve(__dirname, "../packages", name, "dist");
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
}
