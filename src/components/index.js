import GridTable from "./GridTable.vue";
import FormModal from "./FormModal.vue";
import VNode from "./VNode";

export default (app) => {
  app.component("GridTable", GridTable);
  app.component("FormModal", FormModal);
  app.component("VNode", VNode);
};
