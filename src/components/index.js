import FormModal from "./FormModal.vue";
import TablePlus from "./TablePlus.vue";
import VNode from "./VNode";
import IconTag from "./IconTag.vue";
import TagList from "./TagList.vue";

export default (app) => {
  app.component("FormModal", FormModal);
  app.component("TablePlus", TablePlus);
  app.component("VNode", VNode);
  app.component("IconTag", IconTag);
  app.component("TagList", TagList);
};
