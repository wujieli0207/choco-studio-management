<template>
  <router-view>
    <template #default="{ Component }">
      <transition>
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- :key="route.meta.usePathKey ? route.path : undefined" -->
        <!-- </keep-alive> -->
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup></script>
