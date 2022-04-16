import { SessionTimeoutProcessingEnum } from "../enums/appEnum";
import { ProjectConfig } from "/#/config";
import { CacheTypeEnum } from "/@/enums/cacheEnum";

// ! 注意改变配置时要清空浏览器缓存
const projectSetting: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  useErrorHandle: false,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.PROUTE_JUMP,
};

export default projectSetting;
