<template>
  <a-range-picker
    value-format="YYYY-MM-DD"
    v-bind="pickerProps"
    :disabled-date="disabledDate"
    @change="onChange"
    @open-change="onOpenChange"
    @calendar-change="onCalendarChange"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import dayjs, { Dayjs } from "dayjs";
import { RangePicker as ARangePicker } from "ant-design-vue";

/**
 * 对外类型（string）
 */
export type RangeString = [string, string];

/**
 * AntD 内部事件类型
 */
type PickerValue = [string, string] | [Dayjs, Dayjs];

/**
 * Props / Emits
 */
const props = defineProps<{
  /** 默认值，如 ["2023-12-01","2023-12-31"] */
  defaultValue?: RangeString;
  dayRange?: number;
}>();

const emit = defineEmits<{
  /** 时间变化后对外通知 */
  (e: "change", value: RangeString): void;
}>();

/**
 * 内部状态
 */
const value = ref<RangeString>();
const hackValue = ref<RangeString>();
const dates = ref<RangeString>();

/**
 * 接收外部默认值（只在初始化 / 变更时同步）
 */
watch(
  () => props.defaultValue,
  val => {
    if (val) {
      value.value = val;
    }
  },
  { immediate: true }
);

/**
 * ⭐ 关键：不传 undefined 的 value
 */
const pickerProps = computed(() => {
  const props: Record<string, unknown> = {};

  if (hackValue.value) {
    props.value = hackValue.value;
  } else if (value.value) {
    props.value = value.value;
  }

  return props;
});

/**
 * disabledDate（Dayjs）
 */
const disabledDate = (current: Dayjs) => {
  if (!dates.value || (dates.value as string[]).length === 0) {
    return false;
  }
  const [start, end] = dates.value;
  if (start && current.diff(dayjs(start), "days") > ((props.dayRange && props.dayRange - 1) || 7)) {
    return true;
  }
  if (end && dayjs(end).diff(current, "days") > ((props.dayRange && props.dayRange - 1) || 7)) {
    return true;
  }
  return false;
};

/**
 * 事件处理
 */
const onOpenChange = (open: boolean) => {
  if (open) {
    dates.value = [] as unknown as RangeString;
    hackValue.value = [] as unknown as RangeString;
  } else {
    hackValue.value = undefined;
  }
};

const onChange = (val: PickerValue) => {
  const result = val as RangeString;
  value.value = result;
  emit("change", result); // ⭐ 对外暴露“切换时间后”
};

const onCalendarChange = (val: PickerValue) => {
  dates.value = val as RangeString;
};
</script>
