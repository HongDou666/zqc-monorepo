<template>
  <div class="zqc-area">
    <div class="num">
      <span>number 1：</span>
      <a-input-number v-model:value="n1" data-testid="n1" :min="1" :max="100" />
    </div>
    <div class="num">
      <span>number 2：</span>
      <a-input-number v-model:value="n2" data-testid="n2" :min="1" :max="100" />
    </div>
    <div class="sum">
      <span data-testid="result">sum:{{ result }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { InputNumber as AInputNumber } from "ant-design-vue";
import { sum } from "@zqc-monorepo/utils";

const n1 = ref(1);
const n2 = ref(2);
const result = computed(() => sum(+n1.value, +n2.value));
</script>

<style scoped>
.zqc-area {
  border: 1px solid #eee;
  padding: 20px;
}
.num {
  margin: 10px 0;
}
.sum {
  font-weight: bold;
}
</style>
