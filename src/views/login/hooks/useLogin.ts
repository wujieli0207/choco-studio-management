import { computed, reactive, Ref, ref, unref } from "vue";
import { FormRules } from "element-plus";

export enum LoginStateEnum {
  LOGIN,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useFormValid<T extends Object>(formRef: Ref<unknown>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;

    const data = await (form as any).validate();

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

  const getFormRules = computed((): FormRules => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);

    switch (unref(currentState)) {
      // login form rule
      default:
        return {
          username: accountFormRule,
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
