import { App } from "vue";
import * as antdIcons from "@ant-design/icons-vue";

export default function setupAntdVueIcon(app: App<Element>) {
  // 注册组件
  Object.keys(antdIcons).forEach((key) => {
    app.component(key, antdIcons[key as keyof typeof antdIcons]);
  });
}
