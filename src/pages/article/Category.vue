<template>
  <grid-table
    :params="params"
    :columns="columns"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    title="分类管理"
    search="/article/search"
    ref="tableRef"
  />

  <FormModal
    :formData="formData"
    :ok="() => handleOk('category', formRef, tableRef)"
    ref="formRef"
  />
</template>

<script setup>
import { ref } from "vue";
import { Plus, Coin } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { handleAddOrUpdate, handleOk, handleDelete, request } from "@/utils";

const params = {
  methods: "get",
  path: "/category/query",
  data: {},
};

const tableRef = ref();
const formRef = ref();

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "文章数",
    dataIndex: "count",
  },
];

const formData = [
  {
    label: "分类名称",
    value: "name",
    component: "input",
  },
];

const handleUpdateCount = () => {
  request("/category/updateCount").then((res) => {
    if (res.status === 0) {
      ElMessage.success("更新成功");
      tableRef.value.handleRefresh();
    }
  });
};

const toolbarAction = [
  {
    name: "新增分类",
    type: "success",
    icon: Plus,
    handle: () => handleAddOrUpdate(null, formRef),
  },
  {
    name: "更新所有数量",
    type: "warning",
    icon: Coin,
    handle: handleUpdateCount,
  },
];

const moreAction = [
  {
    status: "danger",
    title: "删除",
    handle: (record) => handleDelete("/category/delete", record.id, tableRef),
  },
];
</script>

<style>
</style>