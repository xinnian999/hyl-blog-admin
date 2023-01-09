<template>
  <div class="grid-table">
    <div class="toolbar">
      <div class="searchBar">
        <el-select v-model="data.searchType" placeholder="搜索字段" :clearable="true" @clear="onClearSearch">
          <template v-for="item in columns">
            <el-option :key="item.dataIndex" :label="item.title" :value="item.dataIndex" v-if="item.filter" />
          </template>
        </el-select>
        <el-input v-model="data.search" placeholder="请输入搜索关键词" @change="handleSearch" clearable />
        <el-button type="primary" :icon="Search" @click="handleSearch" />
      </div>
      <div class="toolButton">
        <el-button :key="name" v-for="{ name, type, handle, icon } in toolbarAction" :type="type" :icon="icon"
          @click="handle">{{ name }}</el-button>
        <el-button type="primary" :icon="Refresh" @click="handleRefresh" />
      </div>
    </div>
    <el-table :data="data.dataSource" v-loading="data.isLoading" height="100%" stripe>
      <el-table-column v-for="{ title, dataIndex, render, width, fixed, sortable } in columns" :key="dataIndex"
        :prop="dataIndex" :label="title" :formatter="render" :width="width" :fixed="fixed" :sortable="sortable" />

      <el-table-column fixed="right" label width="150" v-if="moreAction">
        <template #default="record">
          <el-dropdown>
            <el-button type="primary" plain>操作</el-button>
            <template #dropdown>
              <el-space direction="vertical" style="padding: 10px 5px 0">
                <el-button :key="title" :type="status" @click="handle(record.row)"
                  v-for="{ title, handle, status } in moreAction">{{ title }}</el-button>
              </el-space>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" background layout="sizes, prev, pager, next" :page-sizes="[5, 10, 20, 50, 100]"
      :total="data.total" v-model:page-size="data.pageSize" v-model:currentPage="data.pageNum"
      @current-change="handleRefresh" @size-change="handleRefresh" />
    <span class="total">共{{ data.total }}条数据</span>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, reactive, onMounted } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";



const props = defineProps({
  columns: {},
  params: {},
  moreAction: {},
  title: {},
  toolbarAction: {},
  remotePage: {
    default: false,
  },
});

const data = reactive({
  isLoading: false,
  dataSource: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  search: "",
  searchType: "",
});

const handleRefresh = () => {
  const { path, data: requestData } = props.params;
  const defaultRequestData = {
    orderBys: 'id desc',
    pageSize: data.pageSize,
    pageNum: data.pageNum
  }


  if (data.search) {
    requestData.filters = { [data.searchType]: data.search };
  } else {
    delete requestData.filters;
  }

  data.isLoading = true;
  request(path, { params: { ...defaultRequestData, ...requestData } }).then((res) => {
    data.dataSource = res.data;
    if (res.total) {
      data.total = res.total;
    } else {
      data.total = data.dataSource.length;
    }
    data.isLoading = false;
  });
};


const handleSearch = () => {
  if (!data.search) {
    return ElMessage.error("请输入搜索词");
  }
  if (!data.searchType) {
    return ElMessage.error("请选择搜索字段");
  }
  handleRefresh();
};

const onClearSearch = () => {
  data.searchType = "";
  data.search = "";
  handleRefresh();
};

onMounted(() => {
  if (props.params) handleRefresh();

  const defaultSearch = props.columns.filter(item => item.filter)
  if (defaultSearch.length) {
    data.searchType = defaultSearch[0].dataIndex
  }
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
