import { MenuSetting } from "/#/config";
import { computed, unref } from "vue";
import { useAppStore } from "/@/store/modules/app";

export function useMenuSetting() {
  const appStore = useAppStore();

  // 侧边栏折叠属性
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  /**
   * @description 控制侧边栏折叠
   */
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getCollapsed,
  };
}
