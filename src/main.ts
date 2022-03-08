import "/@/styles/index.scss";
import { createApp } from "vue";
import App from "./App.vue";
import setupAntdVue from "./plugins/antdVue";
import { setupRouter } from "/@/router";

function bootstrap() {
  const app = createApp(App);

  setupRouter(app);
  setupAntdVue(app);

  app.mount("#app");
}

bootstrap();
