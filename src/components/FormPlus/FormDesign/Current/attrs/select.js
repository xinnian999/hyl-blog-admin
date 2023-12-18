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
      children: [
        { label: "是否禁用", component: "switch", name: "disabled" },
        {
          label: "占位提示",
          component: "input",
          name: "placeholder",
          initialValue: "请选择...",
        },
        {
          label: "选择模式",
          component: "switch",
          name: "multiple",
          props: {
            activeText: "多选",
            inactiveText: "单选",
          },
        },

        {
          label: "自动选中第一项",
          component: "switch",
          name: "autoSelectedFirst",
        },
        {
          label: "labelKey",
          component: "input",
          name: "labelKey",
          initialValue: "label",
        },
        {
          label: "valueKey",
          component: "input",
          name: "valueKey",
          initialValue: "value",
        },
        {
          label: "数据模式",
          component: "radio",
          name: "mode",
          props: {
            mode: "static",
            options: [
              { label: "静态", value: "static" },
              { label: "远程", value: "remote" },
            ],
          },
        },
        {
          label: "静态选项",
          name: "options",
          component: "formList",
          hidden: '{{$form.props.mode!=="static"}}',
          children: [
            {
              label: "",
              name: "label",
              component: "input",
              props: {},
            },
            {
              label: "",
              name: "value",
              component: "input",
              props: {},
            },
          ],
        },
        {
          label: "",
          component: "itemGroup",
          name: "api",
          hidden: '{{$form.props.mode==="static"}}',
          props: {
            items: [
              {
                label: "url",
                component: "input",
                name: "url",
                initialValue: "/iac/api/",
              },
              {
                label: "请求方式",
                component: "radio",
                name: "method",
                props: {
                  mode: "static",
                  autoSelectedFirst: true,
                  options: [
                    { label: "GET", value: "GET" },
                    { label: "POST", value: "POST" },
                    { label: "PUT", value: "PUT" },
                    { label: "DELETE", value: "DELETE" },
                  ],
                  optionType: "button",
                },
              },
            ],
          },
        },
      ],
    },
  ],
};
