import { isNullOrUnDef } from "/@/utils/is";
import { EncryptionParams, AesEncryption } from "/@/utils/cipher";
import { cacheCipher } from "/@/settings/encryptionSetting";

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

export const createStorage = ({
  prefixKey = "",
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("hasEncrypt 为 true 时，加解密 key 和 iv 必须为 16 位");
  }

  const encryption = new AesEncryption({ key, iv });

  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     *
     * @param key
     * @param value
     * @param expire 缓存过期时间（单位：秒）
     * @description 设置缓存
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire)
          ? new Date().getTime() + expire * 1000
          : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue || "");
    }

    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) {
        return def;
      }

      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal || "");
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
      } catch (e) {
        return def;
      }
    }

    /**
     *
     * @param key
     * @description 移除缓存
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * @description 清空缓存
     */
    clear(): void {
      this.storage.clear();
    }
  };

  return new WebStorage();
};
