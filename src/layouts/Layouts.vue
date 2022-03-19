<template>
  <a-layout class="h-screen">
    <cho-header />
    <a-layout>
      <cho-sidebar />
      <a-layout-content class="m-3"
        ><router-view>
          <template #default="{ Component }">
            <transition>
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </template> </router-view
      ></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import ChoHeader from "./ChoHeader.vue";
  import ChoSidebar from "./ChoSidebar.vue";
</script>
