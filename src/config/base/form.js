import { localeOptions } from "../../utils";

export default function form({ t }) {
  return [
    {
      type: "input",
      field: ">formName",
      value: "",
      title: t("form.formName"),
    },
    {
      type: "radio",
      field: "layout",
      value: "small",
      title: t("form.layout"),
      options: localeOptions(t, [
        { value: "horizontal", label: "horizontal" },
        { value: "vertical", label: "vertical" },
      ]),
    },
    {
      type: "radio",
      field: "labelAlign",
      value: "left",
      title: t("form.labelAlign"),
      options: localeOptions(t, [
        { value: "left", label: "left" },
        { value: "right", label: "right" },
      ]),
    },
    {
      type: "switch",
      field: "labelWrap",
      title: t("form.labelWrap"),
    },
    {
      type: "radio",
      field: "size",
      value: "small",
      title: t("form.size"),
      options: localeOptions(t, [
        { value: "large", label: "large" },
        { value: "middle", label: "middle" },
        { value: "small", label: "small" },
      ]),
    },
    {
      type: "switch",
      field: "colon",
      title: t("form.colon"),
      value: true,
    },
    {
      type: "SizeInput",
      field: "form>labelCol>style>width",
      value: "125px",
      title: t("form.labelWidth"),
    },
    {
      type: "switch",
      field: "hideRequiredMark",
      value: false,
      title: t("form.hideRequiredAsterisk"),
    },
    {
      type: "switch",
      field: "scrollToFirstError",
      value: false,
      title: t("form.scrollToFirstError"),
    },
    {
      type: "switch",
      field: "_submitBtn>show",
      value: true,
      title: t("form.submitBtn"),
    },
    {
      type: "switch",
      field: "_resetBtn>show",
      value: false,
      title: t("form.resetBtn"),
    },
    {
      type: "switch",
      field: ">ignoreHiddenFields",
      value: false,
      title: t("form.ignoreHiddenFields"),
    },
    {
      type: "ConfigItem",
      props: {
        label: t("form.labelStyle"),
        arrow: true,
      },
      children: [
        {
          type: "span",
          slot: "append",
          showAppend: true,
          children: [
            {
              type: "StyleConfig",
              field: ">title>style",
              title: "",
              value: {},
            },
          ],
        },
      ],
    },
    {
      type: "FnConfig",
      field: ">_event",
      info: {
        type: "tooltip",
        native: true,
        effect: "dark",
        placement: "top-end",
        align: "left",
        content: t("form.controlDocument", {
          doc:
            '<a target="_blank" href="https://form-create.com/v3/guide/global-event" style="color: inherit;text-decoration: underline;">' +
            t("form.document") +
            "</a>",
        }),
        rawContent: true,
      },
      value: {},
      col: { show: true },
      props: {
        eventConfig: [
          {
            name: "onSubmit",
            info: t("form.onSubmit"),
            args: ["formData", "api"],
          },
          {
            name: "onReset",
            info: t("form.onReset"),
            args: ["api"],
          },
          {
            name: "onCreated",
            info: t("form.onCreated"),
            args: ["api"],
          },
          {
            name: "onMounted",
            info: t("form.onMounted"),
            args: ["api"],
          },
          {
            name: "onReload",
            info: t("form.onReload"),
            args: ["api"],
          },
          {
            name: "onChange",
            info: t("form.onChange"),
            args: ["field", "value", "options"],
          },
          {
            name: "beforeFetch",
            info: t("form.beforeFetch"),
            args: ["config", "data"],
          },
        ],
      },
      title: t("form.event"),
    },
  ];
}
