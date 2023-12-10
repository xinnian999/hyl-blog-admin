export default {
  items: [
    { label: "字段label", component: "input", name: "label" },
    { label: "字段name", component: "input", name: "name" },
    { label: "默认值", component: "input", name: "initialValue" },
    { label: "是否必填", component: "switch", name: "required" },
    {
      label: "",
      component: "itemGroup",
      name: "props",
      props: {
        items: [
          { label: "是否禁用", component: "switch", name: "disabled" },
          {
            label: "占位提示",
            component: "input",
            name: "placeholder",
            initialValue: "请输入...",
          },
        ],
      },
    },
  ],
};