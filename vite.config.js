import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite"; //自动导入ui库
import Components from "unplugin-vue-components/vite"; //自动注册ui库
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; //自动解析ui库
import DefineOptions from "unplugin-vue-define-options/vite"; //使用setup语法糖，用于对文件name命名
import { visualizer } from "rollup-plugin-visualizer";
import legacy from "@vitejs/plugin-legacy";

const isVisualizer = process.env.VISUALIZER === "show";
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver(), // 自动导入 Element Plus 组件
        // IconsResolver({
        //   enabledCollections: ['ep'],
        // }),// 自动注册图标组件
        IconsResolver(), // 自动注册图标组件
      ],
    }),
    AutoImport({
      imports: ["vue"], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      resolvers: [
        ElementPlusResolver(),
        IconsResolver(), // 自动导入图标组件
        // IconsResolver({
        //   prefix: 'Icon',
        // }),  // 自动导入图标组件
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    DefineOptions(),
    isVisualizer && visualizer({ gzipSize: true }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/forex/global.scss";', //全局配置之后，不必在每个vue文件中引入css了
      },
    },
  },
  server: {
    open: true,
    port: 333,
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      "/wap/api": {
        target: "https://www.n9cj.xyz",
        changeOrigin: true,
        secure: false
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@comForex": path.resolve(__dirname, "src/components/forex"),
      "@comTrade": path.resolve(__dirname, "src/components/commonTrade"),
      "@comConstract": path.resolve(__dirname, "src/components/constract"),
      "@comSpot": path.resolve(__dirname, "src/components/spot"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  build: {
    assetsDir: "static",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/name-[hash].[ext]",
      },
    },
  },
});
