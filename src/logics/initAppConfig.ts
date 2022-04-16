import { Persistent } from "/@/utils/cache/persistent";
import { ProjectConfig } from "/#/config";
import { useAppStore } from "/@/store/modules/app";
import { deepMerge } from "/@/utils";
import { PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import projectSetting from "../settings/projectSetting";

export function initAppConfigStore() {
  const appStore = useAppStore();
  let projectConfig: ProjectConfig = Persistent.getLocal(
    PROJ_CFG_KEY
  ) as ProjectConfig;
  projectConfig = deepMerge(projectSetting, projectConfig || {});

  appStore.setProjectConfig(projectConfig);
}
