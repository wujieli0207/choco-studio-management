import { computed, unref, ref, Ref } from "vue";
import type { ValidationRule } from "ant-design-vue/lib/form/Form";

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) {
      return;
    }

    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export function useFormRules(_loginInfo?: Recordable) {
  const getAccountFormRule = computed(() => {
    return createRule("请输入账号");
  });
  const getPasswordFormRule = computed(() => {
    return createRule("请输入密码");
  });

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);

    switch (unref(currentState)) {
      // login form rule
      default:
        return {
          userName: accountFormRule,
          password: passwordFormRule,
        };
    }
  });

  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: "change",
    },
  ];
}
