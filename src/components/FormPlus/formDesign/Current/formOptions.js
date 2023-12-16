export default {
  items: [
    { label: "label宽度", component: "input", name: "labelWidth" },
    {
      label: "label对齐方式",
      component: "radio",
      name: "labelAlign",
      props: {
        mode: "static",
        options: [
          { label: "左对齐", value: "left" },
          { label: "居上", value: "top" },
          { label: "右对齐", value: "right" },
        ],
      },
      initialValue: "right",
    },
  ],
};
