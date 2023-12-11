import FormModal from "./FormModal.vue";
import TablePlus from "./TablePlus.vue";
import VNode from "./VNode";
import IconTag from "./IconTag.vue";
import FormPlus from "./FormPlus";
import FilterInput from "./FilterInput.vue";
import IconFont from "./IconFont";

export default (app) => {
  app.component("FormModal", FormModal);
  app.component("TablePlus", TablePlus);
  app.component("VNode", VNode);
  app.component("IconTag", IconTag);
  app.component("FormPlus", FormPlus);
  app.component("FilterInput", FilterInput);
  app.component("IconFont", IconFont);
};
