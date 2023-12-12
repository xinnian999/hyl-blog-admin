export default {
  items: [
    { label: "字段label", component: "input", name: "label" },
    { label: "字段name", component: "input", name: "name" },
    { label: "是否必填", component: "switch", name: "required" },
    {
      label: "",
      component: "itemGroup",
      name: "props",
      props: {
        fields: [],
      },
    },
  ],
};
