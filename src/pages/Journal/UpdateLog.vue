<template>
  <GridTable :params="params" :moreAction="moreAction" :toolbarAction="toolbarAction" :columns="columns" title="更新日志管理"
    ref="tableRef" />
  <FormModal title="写日志" width="40%" :formData="formData" :ok="() => handleOk('updateLog', formRef, tableRef)"
    ref="formRef" />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { handleAddOrUpdate, handleOk, handleDelete } from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  path: "/updateLog/query",
  data: {},
};

const columns = [
  {
    title: "更新内容",
    dataIndex: "content",
  },
  {
    title: "时间",
    dataIndex: "creatTime",
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
    handle: (record) => handleDelete("/updateLog/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "更新内容",
    value: "content",
    component: "textarea",
  },
];
</script>

