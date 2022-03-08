import { ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import";
import PurgeIcons from "vite-plugin-purge-icons";
import { viteMockServe } from "vite-plugin-mock";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "/#": pathResolve("types"),
};

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
      }),
      PurgeIcons(),
      viteMockServe({
        mockPath: "mock", // mock 文件目录，默认为根目录的 mock 目录
        localEnabled: command === "serve",
      }),
    ],
    // 别名设置
    resolve: {
      alias,
    },
    // 服务设置
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 4000,
      open: true, // 自动打开浏览器
      // cors: true, // 允许跨域
      strictPort: true, // 端口被占用直接退出
      // 接口代理
      proxy: {
        "/api": {
          target: "http://localhost:9080/",
          changeOrigin: true, // 允许跨域
          ws: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, "");
          }, // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
};
