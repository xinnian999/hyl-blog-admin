<template>
  <div class="grid-table">
    <div class="toolbar">
      <el-button class="selected" type="primary" :icon="Search" @click="handleSearch">已选 {{ data.selected.length
      }}</el-button>
      <div class="searchBar">
        <el-select v-model="data.searchType" placeholder="搜索字段" :clearable="true" @clear="onClearSearch">
          <template v-for="item in columns">
            <el-option :key="item.dataIndex" :label="item.title" :value="item.dataIndex" v-if="item.filter" />
          </template>
        </el-select>
        <el-input v-model="data.search" :disabled="!data.searchType" placeholder="请输入搜索关键词" @input="handleSearch"
          clearable />

      </div>

      <div class="toolButton">
        <el-button type="success" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" :icon="Refresh" @click="handleRefresh" />
        <!-- <el-button
          :key="name"
          v-for="{ name, type, handle, icon } in toolbarAction"
          :type="type"
          :icon="icon"
          @click="handle"
          >{{ name }}</el-button
        >
        <el-button type="primary" :icon="Refresh" @click="handleRefresh" /> -->
      </div>
    </div>

    <el-table :data="data.dataSource" v-loading="data.isLoading" height="100%" stripe :default-sort="defaultSort"
      @sort-change="handleSortChange" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column v-for="{ title, dataIndex, render, width, fixed, sortable } in columns" :key="dataIndex"
        :prop="dataIndex" :label="title" :formatter="render" :width="width" :fixed="fixed" :sortable="sortable" />

      <el-table-column fixed="right" label width="150">
        <template #default="record">
          <el-space>
            <el-button type="warning" @click="handleUpdate(record.row)">修改</el-button>
            <el-button type="danger" @click="handleDelete(record.row.id)">删除</el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" background layout="sizes, prev, pager, next" :page-sizes="[5, 10, 20, 50, 100]"
      :total="data.total" v-model:page-size="data.pageSize" v-model:currentPage="data.pageNum"
      @current-change="handleRefresh" @size-change="handleRefresh" />
    <span class="total">共{{ data.total }}条数据</span>

    <FormModal title="新增" width="60%" :formData="formData" :ok="handleOk" ref="formModalRef" />
  </div>
</template>

<script setup>
import { defineProps, defineExpose, reactive, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "@/utils";
import { Plus, Refresh } from "@element-plus/icons-vue";
import { pick, debounce } from 'lodash'

const props = defineProps({
  rowAction: {
    type: Array,
    default: () => [],
  },
  table: { type: String, default: "article" },
  columns: { default: () => [], type: Array },
  toolbarAction: {
    default: () => [],
    type: Array,
  },
  formData: {
    default: () => [],
    type: Array,
  },
  defaultSort: {
    default: () => ({ prop: 'createTime', order: 'descending' }),
    type: Object,
  }
});

const formModalRef = ref();

const data = reactive({
  isLoading: false,
  dataSource: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  search: "",
  searchType: "",
  orderBys: {},
  selected: []
});


const handleRefresh = async () => {
  data.isLoading = true;

  const {
    status,
    data: dataSource,
    total,
  } = await request(`/current/query/${props.table}`, {
    params: {
      orderBys: data.orderBys,
      pageSize: data.pageSize,
      pageNum: data.pageNum,
      filters: data.search ? { [data.searchType]: data.search } : {},
    },
  });

  if (status === 0) {
    data.dataSource = dataSource;
    data.total = total;
    data.isLoading = false;
  }
};

const handleSearch = debounce(handleRefresh, 700);

const handleSortChange = ({ prop, order }) => {
  if (prop && order) {
    data.orderBys = { [prop]: order.replace('ending', '') }
  } else {
    data.orderBys = {}
  }
  handleRefresh()
}

const handleSelectionChange = (rows) => {
  data.selected = rows
}

const onClearSearch = () => {
  data.searchType = "";
  data.search = "";
  handleRefresh();
};

const handleAdd = () => {
  formModalRef.value.handleVisible(true);
  formModalRef.value.reset()
};

const handleUpdate = (rowData) => {
  formModalRef.value.handleVisible(true);

  //数据回显
  const formFields = props.formData.map(item => item.value)
  Object.assign(
    formModalRef.value.form,
    pick(rowData, formFields)
  );
  Object.assign(
    formModalRef.value.form,
    { id: rowData.id }
  );
};

const handleOk = () => {
  const {
    formRef: { validate },
    form,
    handleVisible,
    reset,
  } = formModalRef.value;

  validate(async (valid) => {
    if (valid) {
      const { status } = await request[form.id ? "put" : "post"](`/current/${form.id ? "update" : "add"}/${props.table}`, form);

      if (status === 0) {
        handleRefresh();
        handleVisible(false);
        reset();
        ElMessage.success(`${form.id ? "更新" : "新增"}成功`);
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const handleDelete = (id) => {
  ElMessageBox.confirm("确认删除吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    request
      .delete("/current/delete", { params: { table: props.table, id } })
      .then((res) => {
        if (res.status === 0) {
          ElMessage.success("删除成功");
          handleRefresh();
        }
      });
  });
};

onMounted(() => {
  data.orderBys[props.defaultSort.prop] = props.defaultSort.order.replace('ending', '')

  handleRefresh();

});

//  抛出方法
defineExpose({ handleRefresh });
</script>

<style lang="less">
.flex {
  display: flex;
}

.grid-table {
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;

  .pagination {
    margin-top: 15px;
    justify-content: right;
  }

  h2 {
    margin: 0 15px 15px;
  }

  .toolbar {
    .flex;
    margin-bottom: 5px;

    .selected {
      margin-right: 15px;
    }

    .searchBar {
      display: flex;
      flex: 1;
    }

    .toolButton {
      .flex;
      margin-left: 20px;
    }

    button {
      height: 100%;
    }
  }

  .cell {
    text-align: center;
  }

  .total {
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-weight: bold;
  }
}
</style>