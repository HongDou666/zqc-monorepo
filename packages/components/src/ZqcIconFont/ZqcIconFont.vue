<script setup lang="ts">
import { createFromIconfontCN } from "@ant-design/icons-vue";

interface Props {
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: ""
});

const IconFontDom = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3161761_5i14iy8nix.js"
});
</script>

<template>
  <span>
    <IconFontDom :type="type" v-bind="$attrs"></IconFontDom>
  </span>
</template>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>
