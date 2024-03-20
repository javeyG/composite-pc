


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,vue}',
  ],
  purge: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.js",
  ], //Tailwind 可以在生产构建中对未使用的样式优化
  theme: {
    // colors: {
    //   'desc': '#161E2F',
    //   'desc-gray': '#595959',
    // }, //自定义颜色命名,使用的时候就是
    extend: {},
  }, //配置一些变量
  plugins: [],
  // prefix: 'frpc-', //设置前缀
}

