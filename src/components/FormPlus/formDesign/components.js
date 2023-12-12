export default [
  { label: "单行文本", component: "input", props: {}, type: "basic" },
  {
    label: "下拉选择框",
    component: "select",
    props: {
      mode: "static",
      options: [
        { label: "选项1", value: "value1" },
        { label: "选项2", value: "value2" },
        { label: "选项3", value: "value3" },
      ],
    },
    type: "basic",
  },
  {
    label: "单选框",
    component: "radio",
    props: {
      mode: "static",
      options: [
        { label: "选项1", value: "value1" },
        { label: "选项2", value: "value2" },
        { label: "选项3", value: "value3" },
      ],
    },
    type: "basic",
  },
  { label: "计数器", component: "inputNumber", type: "basic" },
  {
    label: "卡片",
    component: "card",
    children: [],
    header: "卡片",
    type: "layout",
  },
];
