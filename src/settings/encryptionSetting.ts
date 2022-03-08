import { isDevMode } from "/@/utils/env";

// 默认缓存时间（单位：秒），默认为7天
export const DEFAULT_CACHE_TIME = 7 * 24 * 60 * 60;

// AES 加密密钥
export const cacheCipher = {
  key: "_11111000001111@",
  iv: "@11111000001111_",
};

export const enableStorageEncryption = !isDevMode();
