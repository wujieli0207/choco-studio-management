<template>
  <div class="flex items-center justify-between h-12 bg-slate-900">
    <div class="flex flex-row ml-4" @click.stop="toggleCollapsed">
      <el-icon v-if="getCollapsed">
        <fold v-if="getCollapsed" class="text-white rotate-180" />
      </el-icon>
      <el-icon v-else>
        <fold class="text-white" />
      </el-icon>
    </div>
    <!-- 右侧下拉菜单 -->
    <div class="mr-12">
      <el-dropdown>
        <div class="flex items-center">
          <el-avatar :src="avatar" />
          <span class="ml-4 text-sm text-white">wujieli</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a href="javascript:;">帮助文档</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="javascript:;">个人中心</a>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a href="javascript:;">退出登录</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Fold } from "@element-plus/icons-vue";
// TODO 头像链接暂时写死
import avatar from "/@/assets/image/avatar.jpg";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

const { getCollapsed, toggleCollapsed } = useMenuSetting();
</script>
