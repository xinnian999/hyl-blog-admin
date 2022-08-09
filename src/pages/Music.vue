<template>
  <GridTable
    :params="params"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    :columns="columns"
    title="歌曲管理"
    ref="tableRef"
  />
  <FormModal
    title="新增歌曲"
    width="40%"
    :formData="formData"
    :ok="() => handleOk('music', formRef, tableRef)"
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
  path: "/music/query",
  data: {},
};

const columns = [
  {
    title: "歌名",
    dataIndex: "name",
  },
  {
    title: "歌手",
    dataIndex: "artist",
  },
  {
    title: "歌曲头像",
    dataIndex: "cover",
    render: (record) => (
      <ElImage
        preview-src-list={[record.cover]}
        preview-teleported
        src={record.cover}
        style={{ height: "60px" }}
      />
    ),
  },
  {
    title: "歌曲地址",
    dataIndex: "url",
    render: (record) => <audio src={record.url} controls />,
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
    handle: (record) => handleDelete("/music/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "歌名",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "歌手",
    value: "artist",
    component: "input",
    required: true,
  },
  {
    label: "歌曲头像",
    value: "cover",
    component: "textarea",
    required: true,
  },
  // {
  //   label: "在线上传",
  //   value: "cover",
  //   component: "upload",
  // },
  {
    label: "歌曲地址",
    value: "url",
    component: "textarea",
    required: true,
  },
  {
    label: "在线上传",
    value: "url",
    component: "upload",
  },
];
</script>

