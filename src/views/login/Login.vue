<template>
  <div class="login-page">
    <div class="login-page__wrapper">
      <h2 class="login-page__title">{{ title }}</h2>
      <div class="login-page__item"><el-input placeholder="请输入用户名" /></div>
      <div class="login-page__item"><el-input placeholder="请输入密码" /></div>
      <div class="login-page__item"><el-button type="primary">登录</el-button></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>

<style scoped lang="scss">
  @import "/@/styles/variables.scss";

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
      //   background-color: rgba($--color-white, 0.2);
      background-color: rgba($--color-white, 0.2);
      border-radius: 15px;

      .login-page__title {
        padding-bottom: 20px;
        font-size: 1.4rem;
        color: $--color-white;
      }

      .login-page__item {
        width: 240px;
        margin: 1vh 0;

        button {
          width: 100%;
          height: 40px;
        }
      }
    }
  }
</style>
