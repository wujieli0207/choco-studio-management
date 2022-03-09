import "/@/styles/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import setupAntdVue from "./plugins/antdVue";
import { setupRouter } from "/@/router";
import { setupStore } from "/@/store";

function bootstrap() {
  const app = createApp(App);

  setupRouter(app);
  setupStore(app);

  setupAntdVue(app);

  app.mount("#app");
}

bootstrap();
