import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface AppState {
  sidebarCollapsed: Ref<boolean>; // 侧边栏是否折叠
  getSidebarCollapsed: Function;
  setSidebarCollapsed: Function;
}

export const useAppStore = defineStore("useAppStore", (): AppState => {
  const sidebarCollapsed = ref(false);

  function getSidebarCollapsed(): Ref<boolean> {
    return sidebarCollapsed;
  }

  function setSidebarCollapsed(isCollapsed: boolean) {
    sidebarCollapsed.value = isCollapsed;
  }

  return {
    sidebarCollapsed,
    getSidebarCollapsed,
    setSidebarCollapsed,
  };
});
