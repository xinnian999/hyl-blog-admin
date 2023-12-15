<template>
  <div id="formGroup">
    <el-card v-if="component === 'card'" v-bind="props" :header="label">
      <slot />
    </el-card>

    <el-form-item
      v-if="component === 'inline'"
      id="form-item"
      :label-width="labelWidth"
      :label="label"
      class="inline"
    >
      <slot />
    </el-form-item>

    <el-form-item
      v-if="component === 'formList'"
      id="form-item"
      :label-width="labelWidth"
      :label="label"
    >
      <form-list
        v-model="value"
        v-bind="props"
        :fields="children"
        :title="label"
      />
    </el-form-item>

    <item-group
      v-model="value"
      :items="children"
      v-if="component === 'itemGroup'"
    >
      <slot />
    </item-group>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject, computed, defineEmits } from "vue";
import FormList from "./group/FormList.vue";
import ItemGroup from "./group/ItemGroup.vue";

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  children: Array,
});

const emit = defineEmits(["update:modelValue"]);

const labelWidth = inject("labelWidth");

const value = computed({
  get() {
    return thisProps.modelValue;
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
</style>
