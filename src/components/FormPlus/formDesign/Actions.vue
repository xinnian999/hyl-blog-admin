<template>
  <div class="formDesign-actions">
    <el-button @click="handlePreviewExec">预览脚本</el-button>
    <el-button @click="handlePreviewForm">预览表单</el-button>

    <el-dialog
      v-model="execVisible"
      title="预览脚本"
      width="70%"
      class="dialog"
      center
      destroy-on-close
    >
      <json-editor-vue
        class="editor"
        v-model="json"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
        @blur="onBlur"
      />
    </el-dialog>

    <el-dialog
      v-model="formVisible"
      title="预览表单"
      width="70%"
      class="dialog"
      destroy-on-close
      center
    >
      <schema-form v-model="form" :schema="schema" ref="formRef" />
      <div>
        <el-button @click="handlePush">模拟提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="jsx">
import { ref, defineProps, computed, defineEmits } from "vue";
import JsonEditorVue from "json-editor-vue3";
import { ElMessageBox } from "element-plus";
import { SchemaForm } from "../components";

const props = defineProps({
  schema: Object,
});

const emit = defineEmits(["update:schema"]);

const json = computed({
  get() {
    console.log(props.schema);
    return props.schema;
  },
  set(value) {
    Object.assign(props.schema, value);
    emit("update:schema", props.schema);
  },
});

const formRef = ref(null);

const form = ref({});

const execVisible = ref(false);

const formVisible = ref(false);

const handlePreviewExec = () => {
  execVisible.value = true;
};

const handlePreviewForm = () => {
  form.value = {};
  formVisible.value = true;
};

const onBlur = async (editor) => {
  const res = await editor.validate();
  if (res.length) {
    let parse = editor.getText();
    parse = new Function("return " + parse)();
    json.value = parse;
  }
};

const handlePush = async () => {
  await formRef.value.submit();
  ElMessageBox.alert(JSON.stringify(form.value), "模拟提交");
};
</script>

<style>
.formDesign-actions {
  padding: 10px;
  text-align: right;
}
.dialog {
  /* top: 8vh; */
}
</style>
