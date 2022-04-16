import { defineStore } from "pinia";
import { ProjectConfig, MenuSetting } from "/#/config";
import { PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";

interface AppStore {
  projectConfig: Nullable<ProjectConfig>;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): AppStore => ({
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      console.log("this.getProjectConfig: ", this.getProjectConfig);
      return this.getProjectConfig.menuSetting;
    },
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
  },
});
