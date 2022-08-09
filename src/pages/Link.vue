<template>
  <GridTable
    :params="params"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    :columns="columns"
    title="友情链接管理"
    ref="tableRef"
  />
  <FormModal
    title="新增友链"
    width="40%"
    :formData="formData"
    :ok="() => handleOk('link', formRef, tableRef)"
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
  path: "/link/query",
  data: {},
};

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "签名",
    dataIndex: "autograph",
  },
  {
    title: "链接",
    dataIndex: "link",
    render: (record) => (
      <el-link type="primary" href={record.link} target="_blank">
        {record.link}
      </el-link>
    ),
  },
  {
    title: "图标",
    dataIndex: "avator",
    render: (record) => (
      <el-link type="primary" href={record.avator} target="_blank">
        {record.avator}
      </el-link>
    ),
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
    label: "签名",
    value: "autograph",
    component: "textarea",
    required: true,
  },
  {
    label: "链接",
    value: "link",
    component: "input",
    required: true,
  },
  {
    label: "图标",
    value: "avator",
    component: "input",
    required: true,
  },
];
</script>

