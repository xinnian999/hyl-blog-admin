<template>
  <div id="formGroup">
    <el-card
      v-if="component === 'card'"
      v-bind="componentProps"
      :header="label"
    >
      <slot />
    </el-card>

    <div v-if="component === 'divider'" style="margin-bottom: 60px">
      <el-divider style="margin-bottom: 40px">{{ label }}</el-divider>
      <slot />
    </div>

    <el-form-item
      id="form-item"
      :label-width="labelWidth"
      :label="label"
      v-if="component === 'inline'"
      class="inline"
    >
      <slot />
    </el-form-item>
    <el-form-item
      id="form-item"
      :label-width="labelWidth"
      :label="label"
      v-if="component === 'formList'"
    >
      <form-list
        v-model="value"
        v-bind="componentProps"
        :fields="children"
        :title="label"
      />
    </el-form-item>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject, computed, defineEmits } from "vue";
import FormList from "./components/FormList.vue";

const props = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  componentProps: Object,
  modelValue: null,
  initialValue: null,
  children: Array,
});

const emit = defineEmits(["update:modelValue"]);

const labelWidth = inject("labelWidth");

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style lang="less" scoped>
#formGroup {
  margin-bottom: 10px;
}
.inline {
  display: flex;
  width: 100%;
}
</style>
