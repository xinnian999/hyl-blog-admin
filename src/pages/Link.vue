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
    label: "导入",
    value: "import",
    component: "textarea",
    required: true,
    placeholder: "输入友链信息，脱离焦点后自动导入",
    blur: () => {
      let data = formRef.value.form.import;
      data = data.split("\n");
      let source = data.map((item) => item.split("：")[1]);
      const reg = RegExp(/(.jpg|.png)/);

      source.forEach((item) => {
        // 检索图标
        if (reg.test(item)) {
          formRef.value.form.avator = item;

          source.splice(source.indexOf(item), 1);
        }
        // 检索链接
        if (item && !reg.test(item) && item.search("https") !== -1) {
          formRef.value.form.link = item;
          source.splice(source.indexOf(item), 1);
        }
      });

      // 检索名称
      data.forEach((item) => {
        const [label, value] = item.split("：");
        if (
          (label.search("名") !== -1) |
          (label.search("name") !== -1) |
          (label.search("title") !== -1)
        ) {
          formRef.value.form.name = value;
          source.splice(source.indexOf(value), 1);
        }
      });

      // 检索描述
      source.forEach((item) => {
        if (item) {
          formRef.value.form.autograph = item;
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
