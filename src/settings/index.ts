import { getAppEnvConfig } from "/@/utils/env";
import { GlobConfig } from "/#/config";

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig();

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    apiUrl: VITE_GLOB_API_URL,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };

  return glob;
};
