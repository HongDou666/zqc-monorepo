<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="login-form"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit"> 提交 </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  InputPassword as AInputPassword,
  Button as AButton
} from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";

/*
 * 类型定义
 */
export interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

/*
 * Props
 */
const props = withDefaults(
  defineProps<{
    defaultValues?: Partial<FormState>;
  }>(),
  {
    defaultValues: () => ({})
  }
);

/*
 * Emits
 */
const emit = defineEmits<{
  (e: "submit", values: FormState): void;
}>();

/*
 * 表单状态
 */
const formRef = ref<FormInstance>();

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true
});

/*
 * 同步默认值
 */
watch(
  () => props.defaultValues,
  val => {
    Object.assign(formState, val);
  },
  { immediate: true, deep: true }
);

/*
 * 表单提交
 */
const onFinish = (values: FormState) => {
  emit("submit", values);
};
</script>
