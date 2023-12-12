<template>
  <template v-for="item in formItems">
    <form-group
      v-if="item.children"
      v-bind="item"
      :componentProps="item.props"
      v-model="formValues[item.name]"
      :key="item.name"
    >
      <FormRender v-model="form" :formItems="item.children" />
    </form-group>

    <form-item
      v-else
      v-model="formValues[item.name]"
      v-bind="item"
      :componentProps="item.props"
      :key="item.label"
    />
  </template>
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "./FormItem.vue";
import FormGroup from "./FormGroup.vue";

const props = defineProps({
  modelValue: Object,
  formItems: Array,
});

const emit = defineEmits(["update:modelValue"]);

//原form总数据源
const form = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

// 通过Proxy接管的数据源，某项属性被修改会立刻通知父组件，遵守单项数据流原则
const formValues = computed(() => {
  return new Proxy(props.modelValue, {
    set(target, key, value) {
      // console.log(target, key, value);
      emit("update:modelValue", { ...target, [key]: value });
      return true;
    },
  });
});
</script>
