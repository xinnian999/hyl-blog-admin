<template>
    <GridTable :params="params" :moreAction="moreAction" :toolbarAction="toolbarAction" :columns="columns" title="说说管理"
        ref="tableRef" />
    <FormModal title="发说说" width="40%" :formData="formData" :ok="() => handleOk('mood', formRef, tableRef)"
        ref="formRef" />
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {
    handleAddOrUpdate,
    handleOk, handleDelete
} from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
    methods: "get",
    path: "/mood/query",
    data: {}
};

const columns = [

    {
        title: "说说",
        dataIndex: "content"
    },
    {
        title: "配图",
        dataIndex: "picture"
    },
    {
        title: "时间",
        dataIndex: "creatTime"
    },
];

const toolbarAction = [
    {
        name: "新增",
        type: "success",
        icon: Plus,
        handle: () => handleAddOrUpdate(null, formRef)
    }
];

const moreAction = [
    {
        title: "编辑",
        status: "success",
        handle: record => handleAddOrUpdate(record, formRef)
    },
    {
        status: "danger",
        title: "删除",
        handle: record => handleDelete("/mood/delete", record.id, tableRef)
    }
];

const formData = [
    {
        label: "说说",
        value: "content",
        component: "textarea"
    },
    {
        label: "配图",
        value: "picture",
        component: "uploadPicture",
        uploadName: "moodPicture"
    },
    {
        label: "分类",
        value: "category",
        component: "select",
        selectData: [{ name: '位置', value: 'weizhi' }, { name: '图片', value: 'tupian' }, { name: '视频', value: 'shipin' }],
        config: {
            mode: 'static',
            label: 'name',
            value: 'value'
        }
    },
];
</script>

