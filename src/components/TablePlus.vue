<template>
  <div class="grid-table">
    <div class="toolbar">
      <el-popover placement="bottom-start" width="70vw" trigger="click">
        <template #reference>
          <el-button class="selected" type="primary"
            >已选 {{ data.selected.length }}</el-button
          >
        </template>
        <el-button-group>
          <el-button type="danger" @click="handleBatchDelete"
            >批量删除</el-button
          >
        </el-button-group>
        <el-table :data="data.selected">
          <el-table-column
            v-for="{
              title,
              dataIndex,
              render,
              width,
              fixed,
              sortable,
            } in columns"
            :key="dataIndex"
            :prop="dataIndex"
            :label="title"
            :formatter="render"
            :width="width"
            :fixed="fixed"
            :sortable="sortable"
          />
          <el-table-column fixed="right" width="150">
            <template #header>
              <el-button type="danger" @click="clearSelected">清空</el-button>
            </template>
            <template #default="record">
              <el-button type="primary" @click="handleUnSelected(record.row)"
                >移除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-popover>

      <div class="searchBar">
        <el-select
          v-model="data.searchType"
          placeholder="搜索字段"
          :clearable="true"
          @clear="onClearSearch"
        >
          <template v-for="item in columns">
            <el-option
              :key="item.dataIndex"
              :label="item.title"
              :value="item.dataIndex"
              v-if="item.search"
            />
          </template>
        </el-select>
        <el-input
          v-model="data.searchQ"
          :disabled="!data.searchType"
          placeholder="请输入搜索关键词"
          @input="handleSearch"
          clearable
        />
      </div>

      <div class="toolButton">
        <el-button
          type="success"
          size="small"
          :icon="Plus"
          @click="handleAdd"
          :disabled="disabled.includes('add')"
          >新增</el-button
        >
        <el-button
          :type="type"
          size="small"
          :icon="icon"
          @click="onClick"
          :key="name"
          v-for="{ name, type, icon, onClick } in toolbarAction"
          >{{ name }}</el-button
        >
        <el-button type="primary" :icon="Refresh" @click="fetchData" />
      </div>
    </div>

    <el-table
      :data="data.dataSource"
      v-loading="data.isLoading"
      height="100%"
      stripe
      :default-sort="defaultSort"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      @filter-change="handleFilterChange"
      row-key="id"
      empty-text="暂无数据"
      ref="tableRef"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />

      <el-table-column
        v-for="{
          title,
          dataIndex,
          render,
          width,
          fixed,
          sortable,
          filters,
        } in data.initColumns"
        :key="dataIndex"
        :prop="dataIndex"
        :label="title"
        :formatter="render"
        :width="width"
        :fixed="fixed"
        :sortable="sortable && 'custom'"
        :filters="filters"
        :column-key="dataIndex"
        :filter-multiple="false"
      />

      <el-table-column fixed="right" label="操作" width="150">
        <template #default="record">
          <el-space>
            <el-button
              type="warning"
              circle
              :icon="Edit"
              :disabled="disabled.includes('edit')"
              @click="handleUpdate(record.row)"
            ></el-button>
            <el-button
              type="danger"
              circle
              :icon="Delete"
              :disabled="disabled.includes('delete')"
              @click="handleDelete(record.row.id)"
            ></el-button>
            <el-button
              v-for="{ title, type, icon, onClick } in rowAction"
              :key="title"
              :type="type"
              circle
              :icon="icon"
              @click="onClick(record.row)"
            ></el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      v-model:page-size="params.pageSize"
      v-model:currentPage="params.pageNum"
      background
      layout="sizes, prev, pager, next"
      :page-sizes="[5, 10, 20, 50, 100]"
      :total="data.total"
    />
    <span class="total">共{{ data.total }}条数据</span>

    <FormModal
      :title="data.editId ? '修改' : '新增'"
      width="60%"
      :visible="formVisible"
      @close="closeFormModal"
      :formData="formData"
      :ok="handleOk"
      ref="formModalRef"
    />
  </div>
</template>

<script setup>
import {
  defineProps,
  defineExpose,
  watch,
  reactive,
  onMounted,
  ref,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { request, formatTime } from "@/utils";
import { Plus, Refresh, Edit, Delete } from "@element-plus/icons-vue";
import { pick, debounce } from "lodash";

const props = defineProps({
  rowAction: {
    type: Array,
    default: () => [],
  },
  table: { type: String, required: true },
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
    default: () => ({ prop: "createTime", order: "descending" }),
    type: Object,
  },
  disabled: {
    default: () => [],
    type: Array,
  },
});

const formModalRef = ref(null);

const tableRef = ref(null);

const formVisible = ref(false);

const data = reactive({
  isLoading: false,
  dataSource: [],
  total: 0,
  searchQ: "",
  searchType: "",
  selected: [],
  initColumns: [],
  editId: null,
});

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  filters: {},
  orderBys: {},
});

watch(params, () => {
  fetchData();
});

const fetchData = async () => {
  data.isLoading = true;

  const {
    status,
    data: dataSource,
    total,
  } = await request(`/current/query/${props.table}`, {
    params,
  });

  if (status === 0) {
    data.dataSource = dataSource;
    data.total = total;
    data.isLoading = false;
  }
};

const closeFormModal = () => {
  formVisible.value = false;
  data.editId = null;
};

const handleFilterChange = (filters) => {
  params.filters = filters;
  data.searchType = "";
  data.searchQ = "";
};

const handleSortChange = ({ prop, order }) => {
  if (prop && order) {
    params.orderBys = { [prop]: order.replace("ending", "") };
  } else {
    params.orderBys == {};
  }
};

const handleSearch = debounce(() => {
  params.filters = data.searchQ ? { [data.searchType]: data.searchQ } : {};
  tableRef.value.clearFilter();
}, 700);

const handleSelectionChange = (rows) => {
  data.selected = rows;
};

const handleUnSelected = (row) => {
  tableRef.value.toggleRowSelection(row, false);
};

const clearSelected = () => {
  tableRef.value.clearSelection();
};

const onClearSearch = () => {
  data.searchType = "";
  data.searchQ = "";
  fetchData();
};

const handleAdd = () => {
  formVisible.value = true;
  formModalRef.value.reset();
};

const handleUpdate = (rowData) => {
  formVisible.value = true;
  data.editId = rowData.id;

  //数据回显
  props.formData.forEach((item) => {
    let val = rowData[item.value];
    // 回显格式化处理
    if (item.multiple) {
      val = rowData[item.value].split(",");
    }
    Object.assign(formModalRef.value.form, { [item.value]: val });
  });
};

const handleOk = async (values) => {
  if (data.editId) {
    Object.assign(values, { id: data.editId });
  }
  const { status } = await request[data.editId ? "put" : "post"](
    `/current/${data.editId ? "update" : "add"}/${props.table}`,
    values
  );

  if (status === 0) {
    ElMessage.success(`${data.editId ? "更新" : "新增"}成功`);
    closeFormModal();
    formModalRef.value.reset();
    fetchData();
  }
};

const handleDelete = (id) => {
  ElMessageBox.confirm("确认删除吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    request
      .delete(`/current/delete/${props.table}`, { params: { id } })
      .then((res) => {
        if (res.status === 0) {
          ElMessage.success("删除成功");
          fetchData();
        }
      });
  });
};

const handleBatchDelete = async () => {
  await ElMessageBox.confirm("确认删除吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });

  const { status } = await request.delete(
    `/current/batchDelete/${props.table}`,
    {
      params: {
        ids: data.selected.map((item) => item.id),
      },
    }
  );

  if (status === 0) {
    ElMessage.success("批量删除成功");
    fetchData();
    clearSelected();
  }
};

onMounted(async () => {
  // 初始化筛选
  params.orderBys[props.defaultSort.prop] = props.defaultSort.order.replace(
    "ending",
    ""
  );

  // 初始化列
  const asyncCols = props.columns.map(async (item) => {
    const { dataIndex, filterKey, switchable, timeParse } = item;
    //开启过滤
    if (filterKey) {
      const { data } = await request(`/current/query/${dataIndex}`);
      return {
        ...item,
        filters: data.map((v) => ({ text: v[filterKey], value: v[filterKey] })),
      };
    }
    //格式化时间
    if (timeParse) {
      return {
        ...item,
        render: (record) => formatTime(record[dataIndex]),
      };
    }
    //开启切换，开启后，value会在0和1切换
    if (switchable) {
      return {
        ...item,
        render: (record) => (
          <ElSwitch
            model-value={record[dataIndex]}
            active-value={1}
            inactive-value={0}
            onChange={async (val) => {
              const { status } = await request.put(
                `/current/update/${props.table}`,
                { [dataIndex]: val, id: record.id }
              );
              if (status === 0) {
                fetchData();
              }
            }}
          />
        ),
      };
    }
    return item;
  });
  data.initColumns = await Promise.all(asyncCols);
});

//  抛出方法
defineExpose({ fetchData });
</script>

<style lang="less">
.flex {
  display: flex;
}

.batchActions {
  display: flex;
  justify-content: right;
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
