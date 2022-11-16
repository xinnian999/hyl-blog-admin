<template>
  <GridTable
    :params="params"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    :columns="columns"
    title="资源管理"
    ref="tableRef"
  />
  <FormModal
    title="新增资源"
    width="40%"
    :formData="formData"
    :ok="() => handleOk('works', formRef, tableRef)"
    ref="formRef"
  />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {
  handleAddOrUpdate,
  handleOk,
  handleDelete,
  globalConfig,
} from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  methods: "get",
  path: "/works/query",
  data: {},
};

const columns = [
  {
    title: "配图",
    dataIndex: "picture",
    width: 200,
    render: (record) => (
      <ElImage
        preview-src-list={[record.picture]}
        preview-teleported
        src={`${globalConfig.remoteStaticUrl}/image/${record.picture}`}
        style={{ height: "100px" }}
      />
    ),
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "介绍",
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
    handle: (record) => handleDelete("/works/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "名称",
    value: "name",
    component: "input",
  },
  {
    label: "简介",
    value: "autograph",
    component: "textarea",
  },
  {
    label: "配图",
    value: "picture",
    component: "uploadPicture",
    uploadName: "image",
  },
  {
    label: "链接",
    value: "link",
    component: "textarea",
  },
];
</script>
