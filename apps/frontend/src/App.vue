<script setup lang="ts">
import { ref } from "vue";
import { ZqcArea, ZqcRangePicker } from "@zqc-monorepo/components";
import HelloWorld from "./components/HelloWorld.vue";

const defaultValue = ref(["2023-12-01", "2023-12-31"]);

const handleChange = (val: [string, string]) => {
  console.log("时间切换后：", val);
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
  <ZqcArea />
  <ZqcRangePicker :default-value="defaultValue" :day-range="5" @change="handleChange" />
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
</style>
