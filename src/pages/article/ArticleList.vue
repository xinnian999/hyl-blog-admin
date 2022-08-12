<template>
  <GridTable
    :params="params"
    :remotePage="true"
    :columns="columns"
    :moreAction="moreAction"
    :toolbarAction="toolbarAction"
    title="所有文章"
    search="/article/search"
    ref="tableRef"
  />

  <FormModal
    :title="currentRecord ? `编辑文章` : '写文章'"
    :formData="formData"
    :ok="
      (closeModal) => handleOk('article', formRef, tableRef, null, closeModal)
    "
    :currentRecord="currentRecord"
    ref="formRef"
  />
</template>

<script setup>
import { ref } from "vue";
import { ElImage, ElSwitch } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  handleDelete,
  handleAddOrUpdate,
  handleOk,
  formatTime,
  request,
} from "@/utils";

const tableRef = ref();
const formRef = ref();

const currentRecord = ref(null);
const changePublish = (val, record) => {
  request
    .put("/article/update", { publish: val, id: record.id })
    .then((res) => {
      if (res.status === 0) {
        tableRef.value.handleRefresh();
      }
    });
};

const changeTopping = (val, record) => {
  request
    .put("/article/update", { topping: val, id: record.id })
    .then((res) => {
      if (res.status === 0) {
        tableRef.value.handleRefresh();
      }
    });
};

const params = {
  methods: "get",
  path: "/article/query",
  data: {
    orderBys: "topping desc,id desc",
  },
};

const columns = [
  {
    title: "文章海报",
    dataIndex: "picture",
    width: 200,
    render: (record) => (
      <ElImage
        preview-src-list={[record.picture]}
        preview-teleported
        src={record.picture}
        style={{ height: "100px" }}
      />
    ),
  },
  {
    title: "标题",
    dataIndex: "title",
    filter: true,
    width: 300,
  },
  {
    title: "分类",
    dataIndex: "category",
    filter: true,
    width: 150,
  },
  {
    title: "阅读次数",
    dataIndex: "visits",
    width: 100,
  },
  {
    title: "发布时间",
    width: 200,
    dataIndex: "creatTime",
    render: (record) => formatTime(record.creatTime),
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    render: (record) => formatTime(record.creatTime),
    width: 200,
  },
  {
    title: "是否上架",
    dataIndex: "publish",
    fixed: "right",
    render: (record) => (
      <ElSwitch
        model-value={record.publish}
        active-value={1}
        inactive-value={0}
        onChange={(val) => changePublish(val, record)}
      />
    ),
  },
  {
    title: "是否置顶",
    dataIndex: "publish",
    // sortable: true,
    fixed: "right",
    render: (record) => (
      <ElSwitch
        model-value={record.topping}
        active-value={1}
        inactive-value={0}
        onChange={(val) => changeTopping(val, record)}
      />
    ),
  },
];

const moreAction = [
  {
    title: "编辑",
    status: "success",
    handle: (record) => {
      currentRecord.value = record;
      handleAddOrUpdate(record, formRef);
    },
  },
  {
    status: "danger",
    title: "删除",
    handle: (record) => handleDelete("/article/delete", record.id, tableRef),
  },
];

const toolbarAction = [
  {
    name: "写文章",
    type: "success",
    icon: Plus,
    handle: () => handleAddOrUpdate(null, formRef),
  },
];

const formData = [
  {
    label: "文章标题",
    value: "title",
    component: "input",
    required: true,
  },
  {
    label: "文章简介",
    value: "introduce",
    component: "textarea",
    required: true,
  },
  {
    label: "文章分类",
    value: "category",
    component: "select",
    required: true,
    multiple: true,
    config: {
      mode: "remote",
      url: "/category/query",
      method: "get",
      label: "name",
      value: "name",
    },
  },
  {
    label: "文章海报",
    value: "picture",
    required: true,
    component: "uploadPicture",
    uploadName: "articlePicture",
  },
  {
    label: "文章内容",
    value: "content",
    component: "markdown",
    required: true,
  },
];
</script>
