<template>
  <div class="attrForm">
    <h3>字段属性</h3>
    <form-plus v-model="form" :schema="attrs[current.component]"></form-plus>
  </div>
</template>

<script setup lang="jsx">
import { computed, inject } from "vue";
import * as attrs from "./attrs";
import FormPlus from "../index.vue";

const current = inject("$current");
const setCurrent = inject("$setCurrent");

const form = computed({
  get() {
    return current.value;
  },
  set(e) {
    // console.log(e);
    setCurrent(e);
  },
});
</script>

<style scoped lang="less">
.attrForm {
  height: 100%;
  overflow: auto;
  h3 {
    margin-bottom: 10px;
  }
}
</style>
