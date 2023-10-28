<template>
  <TablePlus
    table="category"
    :defaultSort="{ prop: 'id', order: 'descending' }"
    :columns="columns"
    :formData="formData"
  />
</template>
  
<script setup>
import { Tickets } from "@element-plus/icons-vue";

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "归属表",
    dataIndex: "belong",
    render: ({ belong }) => <TagList list={belong.split(",")} icon={Tickets} />,
  },
];

const formData = [
  {
    label: "名称",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "归属表",
    value: "belong",
    component: "select",
    multiple: true,
    required: true,
    selectData: [
      { name: "article", value: "article" },
      { name: "note", value: "note" },
      { name: "works", value: "works" },
    ],
    config: {
      mode: "static",
      label: "name",
      value: "value",
    },
  },
];
</script>
  
<style lang="less" >
.tag {
  margin-bottom: 5px;
  list-style: none;
}
</style>