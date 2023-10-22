<template>
  <TablePlus
    :columns="columns"
    table="tag"
    :formData="formData"
    :defaultSort="{ prop: 'id', order: 'descending' }"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { request } from "@/utils";
import { ElTag } from "element-plus";
const tableNames = ref([]);

onMounted(async () => {
  const { data } = await request("/all/getTableNames");
  tableNames.value = data.map((name) => ({ text: name, value: name }));
});

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    render: ({ bg, name }) => {
      return (
        <ElTag effect="dark" type="info">
          {name}
        </ElTag>
      );
    },
  },
  {
    title: "所属表",
    dataIndex: "belong",
    // filters: tableNames,
  },
];

const formData = [
  {
    label: "分类名称",
    value: "name",
    component: "input",
  },
  {
    label: "所属表",
    value: "belong",
    component: "select",
    selectData: tableNames,
    multiple: true,
    config: {
      mode: "static",
      label: "value",
      value: "value",
    },
  },
];
</script>

<style></style>