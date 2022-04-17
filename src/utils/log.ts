import { getAppEnvConfig } from "./env";

const { VITE_GLOB_APP_TITLE: porjectName } = getAppEnvConfig();

export function warn(message: string) {
  console.warn(`[${porjectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${porjectName} error]:${message}`);
}
