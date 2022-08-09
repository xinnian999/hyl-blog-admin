import { pick } from "lodash";
import { ElMessage, ElMessageBox } from "element-plus";
import { request, nowTime } from "@/utils";

export const handleAddOrUpdate = (record, formRef) => {
  if (record) {
    //如果修改，从数据里通过pick方法取出需要回显的数据，更新表单的v-model(与v-model合并对象)
    Object.assign(
      formRef.value.form,
      pick(record, Object.keys(formRef.value.form))
    );
  } else {
    // 如果新增，将表单v-model所有键值赋为空
    Object.keys(formRef.value.form).forEach((key) => {
      formRef.value.form[key] = "";
    });
  }
  formRef.value.handleVisible(true);
};

export const handleDelete = (path, id, tableRef) => {
  ElMessageBox.confirm("确认删除吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    request.delete(path, { params: { id } }).then((res) => {
      if (res.status === 0) {
        ElMessage.success("删除成功");
        tableRef.value.handleRefresh();
      }
    });
  });
};

export const handleOk = (path, formRef, tableRef, data, closeModal = true) => {
  formRef.formRef.validate((valid) => {
    if (valid) {
      const id = formRef.form.id;
      const params = {
        ...formRef.form,
        updateTime: nowTime(),
      };
      if (params.content) {
        params.content = params.content.replace(/'/g, '"');
      }
      if (!id) {
        params.creatTime = nowTime();
      }

      if (data) Object.assign(params, data);

      request[id ? "put" : "post"](
        `/${path}/${id ? "update" : "add"}`,
        params
      ).then((res) => {
        if (res.status === 0) {
          ElMessage.success(`${id ? "修改" : "新增"}成功`);
          if (closeModal) formRef.handleVisible(false);
          tableRef.handleRefresh();
        } else {
          ElMessage.error(`${id ? "修改" : "新增"}失败`);
        }
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
