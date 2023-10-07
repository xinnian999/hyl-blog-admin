import GridTable from "./GridTable.vue";
import FormModal from "./FormModal.vue";
import FormModal2 from "./FormModal2.vue";
import TablePlus from "./TablePlus.vue";
import VNode from "./VNode";

export default (app) => {
  app.component("GridTable", GridTable);
  app.component("FormModal", FormModal);
  app.component("FormModal2", FormModal2);
  app.component("TablePlus", TablePlus);
  app.component("VNode", VNode);
};
