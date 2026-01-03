<script setup lang="ts">
import { ref } from "vue";
import { ZqcArea, ZqcRangePicker, ZqcLoginForm, ZqcIconFont } from "@zqc-monorepo/components";
import { Space as ASpace } from "ant-design-vue";
import HelloWorld from "./components/HelloWorld.vue";

interface FormValueType {
  username: string;
  password: string;
  remember: boolean;
}

const defaultValue = ref(["2023-12-01", "2023-12-31"]);
const formValue = ref<FormValueType>({
  username: "",
  password: "",
  remember: false
});

const handleChange = (val: [string, string]) => {
  console.log("时间切换后：", val);
};

const handleSubmit = (values: FormValueType) => {
  console.log("父组件收到：", values);
};
</script>

<template>
  <div>
    <a href="#" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="#" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <a-space direction="vertical">
    <ZqcArea />
    <ZqcRangePicker :default-value="defaultValue" :day-range="5" @change="handleChange" />
    <ZqcLoginForm :default-values="formValue" @submit="handleSubmit" />
    <ZqcIconFont type="icon-redianlianchan" class="iconfont" />
  </a-space>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
:deep(.anticon.iconfont) {
  font-size: 50px;
  color: #48a7ff;
}
</style>
