import "/@/styles/index.scss";
import { createApp } from "vue";
import App from "./App.vue";
import setupElementPlus from "/@/plugins/elementPlus";
import { setupRouter } from "/@/router";

function bootstrap() {
  const app = createApp(App);

  setupRouter(app);
  setupElementPlus(app);

  app.mount("#app");
}

bootstrap();
