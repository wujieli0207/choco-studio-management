import { App, Component } from "vue";
import { components, plugins } from "./components";

function useElementPlus(app: App) {
  components.forEach((component: Component) => {
    if (component.name) {
      app.component(component.name, component);
    }
    plugins.forEach((plugin) => {
      app.use(plugin);
    });
  });
}

export default function setupElementPlus(app: App<Element>) {
  app.use(useElementPlus);
}
