<template>
  <GridTable
    :params="params"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    :columns="columns"
    title="句子管理"
    ref="tableRef"
  />
  <FormModal
    title="新增句子"
    width="40%"
    :formData="formData"
    :ok="() => handleOk('lines', formRef, tableRef)"
    ref="formRef"
  />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { handleAddOrUpdate, handleOk, handleDelete } from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  methods: "get",
  path: "/lines/query",
  data: {},
};

const columns = [
  {
    title: "名字",
    dataIndex: "name",
  },
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
    handle: (record) => handleDelete("/lines/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "名字",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "台词",
    value: "content",
    component: "textarea",
    required: true,
  },
];
</script>

