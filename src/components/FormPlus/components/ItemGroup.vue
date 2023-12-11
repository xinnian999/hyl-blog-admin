<template>
  <div id="itemGroup">
    <form-item
      v-for="item in items"
      v-model="formValues[item.name]"
      v-bind="item"
      :label-width="labelWidth"
      :componentProps="item.props"
      :key="item.label"
      class="itemGroup-item"
    ></form-item>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, computed, defineEmits } from "vue";
import FormItem from "../FormItem.vue";

const props = defineProps({
  labelWidth: String,
  modelValue: { default: () => ({}), type: Object },
  items: Array,
});

const emit = defineEmits(["update:modelValue"]);

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

<style lang="less">
#itemGroup {
  width: 100%;
  .itemGroup-item {
    margin-bottom: 10px;
  }
}
</style>
