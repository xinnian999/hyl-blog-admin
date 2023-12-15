<template>
  <el-form-item
    id="form-item"
    :style="style"
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
      v-if="currentComponent === 'input'"
      v-bind="props"
      class="form-item-input"
    />

    <el-input
      v-model="value"
      autocomplete="off"
      v-if="currentComponent === 'password'"
      show-password
      v-bind="props"
      type="password"
      class="form-item-input"
    />

    <el-input
      v-model="value"
      autocomplete="off"
      v-bind="props"
      :autosize="{ minRows: 4, maxRows: 999 }"
      type="textarea"
      v-if="currentComponent === 'textarea'"
      class="form-item-input"
    />

    <number-input
      v-model="value"
      v-bind="props"
      v-if="currentComponent === 'inputNumber'"
    />

    <select-plus
      v-model="value"
      v-bind="props"
      v-if="currentComponent === 'select'"
      :name="name"
    />

    <radio-plus
      v-model="value"
      v-bind="props"
      v-if="currentComponent === 'radio'"
      :name="name"
    />

    <el-color-picker
      v-model="value"
      v-if="currentComponent === 'colorPicker'"
      v-bind="props"
    />

    <el-switch
      v-model="value"
      v-if="currentComponent === 'switch'"
      v-bind="props"
    />

    <div v-if="currentComponent === 'text'">
      {{ props.formatter || value }}
    </div>
  </el-form-item>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, onMounted, inject } from "vue";
import { isString } from "lodash";
import SelectPlus from "./basic/SelectPlus.vue";
import RadioPlus from "./basic/RadioPlus.vue";
import NumberInput from "./basic/NumberInput.vue";
import ItemGroup from "./group/ItemGroup.vue";

const formItemProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  style: Object,
});

const emit = defineEmits(["update:modelValue"]);

const labelWidth = inject("labelWidth");

const value = computed({
  get() {
    return formItemProps.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const currentComponent = computed(() => {
  if (isString(value.value) && /^{{\s*(.*?)\s*}}$/.test(value.value)) {
    return "input";
  }

  return formItemProps.component;
});

onMounted(() => {
  //TODO：初始值：这里由于onMounted时v-model还没有挂载完成，所以转为异步更新暂时解决
  setTimeout(() => {
    if (
      !value.value &&
      (formItemProps.initialValue || formItemProps.initialValue === 0)
    ) {
      emit("update:modelValue", formItemProps.initialValue);
    }
  });
});
</script>

<style lang="less">
#form-item {
  .el-form-item__label {
    font-weight: bold;
    &::before {
      // display: none;
    }
  }

  .form-item-input {
    max-width: 400px;
  }
}
</style>
