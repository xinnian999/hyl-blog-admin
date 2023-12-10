<template>
  <div class="attrForm">
    <h3>字段属性</h3>
    <form-plus v-model="form" :schema="attrs[current.component]"></form-plus>

    <div>
      <el-button @click="handleEdit">编辑配置文本</el-button>
    </div>

    <el-drawer v-model="editVisible">
      <json-editor-vue
        class="editor"
        v-model="form"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
      />
    </el-drawer>
  </div>
</template>

<script setup lang="jsx">
import { computed, inject, ref } from "vue";
import JsonEditorVue from "json-editor-vue3";
import * as attrs from "./attrs";
import FormPlus from "../index.vue";

const current = inject("$current");
const setCurrent = inject("$setCurrent");

const editVisible = ref(false);

const form = computed({
  get() {
    return current.value;
  },
  set(e) {
    // console.log(e);
    setCurrent(e);
  },
});

const handleEdit = () => {
  editVisible.value = true;
};
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
