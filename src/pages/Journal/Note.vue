<template>
  <GridTable :params="params" :moreAction="moreAction" :toolbarAction="toolbarAction" :columns="columns" title="笔记管理"
    ref="tableRef" />
  <FormModal title="写笔记" width="40%" :formData="formData" :ok="() => handleOk('note', formRef, tableRef)"
    ref="formRef" />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { handleAddOrUpdate, handleOk, handleDelete } from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  path: "/note/query",
  data: {},
};

const columns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "笔记内容",
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
    handle: (record) => handleDelete("/note/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "标题",
    value: "title",
    component: "input",
  },
  {
    label: "说说",
    value: "content",
    component: "textarea",
  },
];
</script>
