<template>
  <TablePlus
    :columns="columns"
    table="tag"
    :formData="formData"
    :defaultSort="{ prop: 'id', order: 'descending' }"
  />
</template>

<script setup>
const columns = [
  {
    title: "标签名称",
    dataIndex: "name",
    sortable: true,
    search: true,
  },
  {
    title: "关联数量",
    dataIndex: "count",
  },
  {
    title: "ID",
    dataIndex: "id",
    sortable: true,
  },
];

const formData = [
  {
    label: "标签名",
    value: "name",
    component: "input",
    required: true,
  },
];
</script>

<style></style>