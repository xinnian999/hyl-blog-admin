export default {
  items: [
    { label: "字段label", component: "input", name: "label" },
    { label: "字段name", component: "input", name: "name" },
    {
      label: "",
      component: "itemGroup",
      name: "props",
      props: {
        items: [
          { label: "是否禁用", component: "switch", name: "disabled" },
          {
            label: "最小值",
            component: "inputNumber",
            name: "min",
            initialValue: 1,
          },
          {
            label: "最大值",
            component: "inputNumber",
            name: "max",
            initialValue: 9999,
          },
          {
            label: "单位",
            component: "input",
            name: "unit",
          },
        ],
      },
    },
  ],
};
