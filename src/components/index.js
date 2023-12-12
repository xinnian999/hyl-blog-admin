import FormModal from "./FormModal.vue";
import TablePlus from "./TablePlus.vue";
import VNode from "./VNode";
import IconTag from "./IconTag.vue";
import FormPlus from "./FormPlus";
import FilterInput from "./FilterInput.vue";
import SvgIcon from "./SvgIcon";

// 将本地svg图标全部导入
const request = require.context("../assets/icons", false, /\.svg$/);
request.keys().forEach(request);

export default (app) => {
  app.component("SvgIcon", SvgIcon);
  app.component("FormModal", FormModal);
  app.component("TablePlus", TablePlus);
  app.component("VNode", VNode);
  app.component("IconTag", IconTag);
  app.component("FormPlus", FormPlus);
  app.component("FilterInput", FilterInput);
};
