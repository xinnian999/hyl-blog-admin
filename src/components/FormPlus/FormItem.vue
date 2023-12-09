<template>
  <el-form-item
    id="form-item"
    :key="name"
    :prop="name"
    :label="label"
    :label-width="label ? labelWidth : '0'"
    :rules="
      required
        ? { required: true, message: `请输入${label}`, trigger: 'blur' }
        : null
    "
  >
    <el-input
      v-model="value"
      autocomplete="off"
      v-if="component === 'input'"
      v-bind="componentProps"
      class="form-item-input"
    />

    <el-input
      v-model="value"
      autocomplete="off"
      v-if="component === 'password'"
      show-password
      v-bind="componentProps"
      type="password"
      class="form-item-input"
    />

    <el-input
      v-model="value"
      autocomplete="off"
      v-bind="componentProps"
      :autosize="{ minRows: 4, maxRows: 999 }"
      type="textarea"
      v-if="component === 'textarea'"
      class="form-item-input"
    />

    <number-input
      v-model="value"
      v-bind="componentProps"
      v-if="component === 'inputNumber'"
    />

    <select-plus
      v-model="value"
      v-bind="componentProps"
      v-if="component === 'select'"
      :name="name"
    />

    <radio-plus
      v-model="value"
      v-bind="componentProps"
      v-if="component === 'radio'"
      :name="name"
    />

    <el-color-picker
      v-model="value"
      v-if="component === 'colorPicker'"
      v-bind="componentProps"
    />

    <form-list
      v-model="value"
      v-if="component === 'formList'"
      v-bind="componentProps"
    />

    <Table-plus
      v-model="value"
      v-if="component === 'selectTable'"
      v-bind="componentProps"
      :name="name"
    />

    <el-switch
      v-model="value"
      v-if="component === 'switch'"
      v-bind="componentProps"
    />

    <item-group
      v-model="value"
      v-if="component === 'itemGroup'"
      :labelWidth="labelWidth"
      v-bind="componentProps"
    />

    <div v-if="component === 'text'">
      {{ componentProps.formatter || value }}
    </div>
  </el-form-item>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, onMounted, inject } from "vue";
import {
  ItemGroup,
  NumberInput,
  SelectPlus,
  RadioPlus,
  FormList,
} from "./elements";

const props = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  componentProps: Object,
  modelValue: null,
  initialValue: null,
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

onMounted(() => {
  //TODO：初始值：这里由于onMounted时v-model还没有挂载完成，所以转为异步更新暂时解决
  setTimeout(() => {
    if (!value.value && props.initialValue) {
      emit("update:modelValue", props.initialValue);
    }
  });
});
</script>

<style lang="less">
#form-item {
  .el-form-item__label {
    font-weight: bold;
    &::before {
      display: none;
    }
  }

  .form-item-input {
    max-width: 400px;
  }
}
</style>
