<template>
  <div id="Menu">
    <div class="list">
      <div class="topBar">
        <el-input placeholder="搜索菜单" />
        <el-button type="primary" @click="handleAddFirst"
          >新增一级菜单</el-button
        >
      </div>
      <el-tree
        :data="MenuListData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>

    <div class="detail">
      <template v-if="Object.keys(currentMenuData).length">
        <div class="info">
          <h4 class="title">基本信息</h4>

          <remote-schema-form
            schemaId="5"
            v-model="currentMenuData"
            :disabled="!isEdit"
            ref="formRef"
            style="width: 600px"
          />

          <el-button v-if="!isEdit" type="primary" @click="isEdit = true"
            >编辑</el-button
          >
          <el-button v-if="isEdit" @click="isEdit = false">取消</el-button>
          <el-button v-if="isEdit" type="primary" @click="handleEditSave"
            >保存</el-button
          >
          <el-button type="danger" @click="handleDelete">删除</el-button>
        </div>

        <div class="children" v-if="!currentMenuData.parentId">
          <h4 class="title">子菜单</h4>
          <div>
            <el-button type="primary" @click="handleAddChild"
              >新增子菜单</el-button
            >
          </div>
        </div>
      </template>
    </div>

    <form-modal
      v-model:visible="modalState.visible"
      v-model="addFormValues"
      :title="modalState.title"
      schemaId="5"
      @onSave="onAddSave"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";
import { pickBy } from "lodash";

const modalState = reactive({ visible: false, title: "" });

const MenuListData = ref([]);

const addFormValues = ref({});

const currentMenuData = ref({});

const formRef = ref();

const isEdit = ref(false);

const getMenuListData = async () => {
  const { data } = await request({ url: "/menu/query" });
  MenuListData.value = data;
};

onBeforeMount(() => {
  getMenuListData();
});

const handleNodeClick = (data) => {
  currentMenuData.value = { ...data };
};

const handleAddFirst = () => {
  modalState.visible = true;
  modalState.title = "新增一级菜单";
};

const handleAddChild = () => {
  modalState.visible = true;
  modalState.title = `新增【${currentMenuData.value.title}】的子菜单`;
  addFormValues.value = { path: currentMenuData.value.path };
};

const onAddSave = async (values) => {
  const data = pickBy(values, Boolean);

  if (currentMenuData.value.id) {
    data.parentId = currentMenuData.value.id;
  }

  const { status } = await request({
    url: "/current/add/menu",
    method: "POST",
    data,
  });
  if (status === 0) {
    modalState.visible = false;
    getMenuListData();
  }
};

const handleEditSave = async () => {
  const values = await formRef.value.submit();
  const { status } = await request({
    url: "/current/update/menu",
    method: "PUT",
    data: pickBy(values, Boolean),
  });
  if (status === 0) {
    getMenuListData();
    isEdit.value = false;
    ElMessage.success("修改成功");
  }
};

const handleDelete = async () => {
  const { status } = await request({
    url: "/current/delete/menu",
    method: "DELETE",
    params: { id: currentMenuData.value.id },
  });
  if (status === 0) {
    getMenuListData();
    isEdit.value = false;
    currentMenuData.value = {};
    ElMessage.success("删除成功");
  }
};

const defaultProps = {
  children: "children",
  label: "title",
};
</script>

<style scoped lang="less">
#Menu {
  display: flex;
  background-color: #fff;
  height: 100%;

  .list {
    .topBar {
      display: flex;
      padding: 10px;
      gap: 10px;
    }
    width: 30vw;
    border-right: 1px solid #eee;
  }

  .detail {
    padding: 30px;
    width: 100%;
    .title {
      border-left: 5px solid #000;
      padding-left: 10px;
      margin-bottom: 20px;
    }

    .children {
      margin-top: 30px;
    }
  }
}
</style>
