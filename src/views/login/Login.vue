<template>
  <div class="login-page">
    <div class="login-page__wrapper">
      <h2 class="login-page__title">{{ title }}</h2>
      <el-form ref="formRef" :model="loginInfo" :rules="getFormRules">
        <el-form-item prop="userName">
          <el-input
            v-model:value="loginInfo.userName"
            class="login-page__item"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model:value="loginInfo.password"
            class="login-page__item"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button
        class="login-page__item"
        type="primary"
        :loading="loading"
        @click="handleLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useFormRules, useFormValid } from "./hooks/useLogin";
// // import { useMessage } from "/@/hooks/useMessage";
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();
// const { notification, createErrorModal } = useMessage();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const loginInfo = reactive({
  userName: "wujieli",
  password: "123456",
});

const { validForm } = useFormValid(formRef);

async function handleLogin() {
  const data = await validForm();
  if (!data) {
    return;
  }

  try {
    loading.value = true;

    const userInfo = await userStore.login({
      userName: loginInfo.userName,
      password: loginInfo.password,
      mode: "none",
    });
    console.log("userInfo: ", userInfo);
  } catch (error) {
    console.log("error: ", error);
  }

  // try {
  //   loading.value = true;

  //   if (userInfo) {
  //     notification.success({
  //       message: "登陆成功",
  //       description: `欢迎回来: ${userInfo.realName}`,
  //       duration: 3,
  //     });
  //   }
  // } catch (error) {
  //   createErrorModal({
  //     title: "错误提示",
  //     content:
  //       (error as unknown as Error).message ||
  //       "网络异常，请检查您的网络连接是否正常！",
  //     getContainer: () => document.body,
  //   });
  // }
}
</script>

<style scoped lang="less">
@import "/@/styles/color.less";

@property --perA {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 75%;
}

@property --perB {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 99%;
}

@property --perC {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 15%;
}

@property --perD {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 16%;
}

@property --perE {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 86%;
}

@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(
      circle at var(--perE) 7%,
      rgba(40, 40, 40, 0.04) 0%,
      rgba(40, 40, 40, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--perC) var(--perD),
      rgba(99, 99, 99, 0.04) 0%,
      rgba(99, 99, 99, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--perA) var(--perB),
      rgba(243, 243, 243, 0.04) 0%,
      rgba(243, 243, 243, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 100%
    ),
    linear-gradient(var(--angle), #22deed, #8759d7);
  animation: move 30s infinite alternate linear;

  @keyframes move {
    100% {
      --perA: 85%;
      --perB: 49%;
      --perC: 45%;
      --perD: 39%;
      --perE: 70%;
      --angle: 360deg;
    }
  }

  .login-page__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 50px;
    background-color: rgba(@color-white, 0.2);
    border-radius: 15px;

    .login-page__title {
      padding-bottom: 10px;
      font-size: 1.4rem;
      color: @color-white;
    }

    .login-page__item {
      width: 240px;
      margin-top: 5px;
    }
  }
}
</style>
