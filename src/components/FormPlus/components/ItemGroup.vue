<template>
  <div id="itemGroup">
    <FormRender v-model="form" :formItems="items" />
  </div>
</template>

<script setup lang="jsx">
import { defineProps, computed, defineEmits } from "vue";
import FormRender from "../FormRender.vue";

const props = defineProps({
  labelWidth: String,
  modelValue: { default: () => ({}), type: Object },
  items: Array,
});

const emit = defineEmits(["update:modelValue"]);

const form = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style lang="less">
#itemGroup {
  width: 100%;
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
