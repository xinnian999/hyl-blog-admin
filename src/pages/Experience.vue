<template>
  <GridTable :params="params" :moreAction="moreAction" :toolbarAction="toolbarAction" :columns="columns" title="文案管理"
    ref="tableRef" />
  <FormModal title="新增文案" width="40%" :formData="formData" :ok="() => handleOk('experience', formRef, tableRef)"
    ref="formRef" />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { handleAddOrUpdate, handleOk, handleDelete } from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  path: "/experience/query",
  data: {},
};

const columns = [

  {
    title: "句子",
    dataIndex: "content",
  },

];

const toolbarAction = [
  {
    name: "新增",
    type: "success",
    icon: Plus,
    handle: () => handleAddOrUpdate(null, formRef),
  },
];

const moreAction = [
  {
    title: "编辑",
    status: "success",
    handle: (record) => handleAddOrUpdate(record, formRef),
  },
  {
    status: "danger",
    title: "删除",
    handle: (record) => handleDelete("/experience/delete", record.id, tableRef),
  },
];

const formData = [

  {
    label: "内容",
    value: "content",
    component: "textarea",
    required: true,
  },

];
</script>

