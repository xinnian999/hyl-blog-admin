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
    title: "简介",
    dataIndex: "descr",
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
    handle: (record) => handleDelete("/link/delete", record.id, tableRef),
  },
];

const formData = [
  {
    label: "导入",
    value: "import",
    component: "textarea",
    required: true,
    placeholder: "输入友链信息，脱离焦点后自动导入",
    blur: () => {
      let form = formRef.value.form;
      form.import.split("\n").forEach((item) => {
        // 判断用的中英文冒号
        let f = "：";
        if (item.search(f) === -1) {
          f = ": ";
        }

        const [label, value] = item.split(f);

        console.log(label, value);
        // 检索图标
        if (
          label.search("图标") !== -1 ||
          label.search("avatar") !== -1 ||
          label.search("头像") !== -1
        ) {
          form.avator = value;
        }

        // 检索名称
        if (label.search("名称") !== -1 || label.search("name") !== -1) {
          form.name = value;
        }

        // 检索地址
        if (
          label.search("链接") !== -1 ||
          label.search("地址") !== -1 ||
          label.search("link") !== -1
        ) {
          form.link = value;
        }

        // 检索描述
        if (
          label.search("描述") !== -1 ||
          label.search("简介") !== -1 ||
          label.search("descr") !== -1
        ) {
          form.descr = value;
        }
      });
    },
  },
  {
    label: "名字",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "简介",
    value: "descr",
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
