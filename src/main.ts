import "/@/styles/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { initAppConfigStore } from "./logics/initAppConfig";

function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  setupStore(app);

  // 初始化项目配置
  initAppConfigStore();

  app.mount("#app");
}

bootstrap();
