import request from "./request";
import { handleDelete, handleAddOrUpdate, handleOk } from "./handle";
import { nowTime, formatTime } from "./timeUtils";

const globalConfig = {
  remoteStaticUrl: "https://cdn.hyl999.co/public",
};

export {
  request,
  handleDelete,
  handleAddOrUpdate,
  handleOk,
  nowTime,
  formatTime,
  globalConfig,
};
