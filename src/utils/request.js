import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: "/api",
});

request.interceptors.request.use((config) => {
  config.xsrfHeaderName = "X-CSRF-TOKEN";
  config.xsrfCookieName = "csrf_token";

  return config;
});

request.interceptors.response.use(
  (res) => {
    if (res.data.message) {
      ElMessage({
        message: res.data.message,
        type: "warning",
      });
    }

    return res?.data;
  },
  (error) => {
    const { status } = error.response;
    switch (status) {
      case 500:
        ElMessage({
          message: "接口异常500",
          type: "error",
        });
        break;
      case 404:
        ElMessage({
          message: "接口不存在404",
          type: "error",
        });
        break;
      default:
        break;
    }
  }
);

export default request;
