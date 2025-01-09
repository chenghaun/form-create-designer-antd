import { localeOptions, localeProps } from "../../utils";

const label = "标签";
const name = "aTag";

export default {
  menu: "aide",
  icon: "icon-tag",
  label,
  name,
  mask: true,
  event: ["click", "close"],
  rule({ t }) {
    return {
      type: name,
      title: "",
      native: true,
      children: [t("com.aTag.name")],
    };
  },
  watch: {
    formCreateNative({ value, rule }) {
      if (value) {
        rule.title = "";
      }
    },
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      //   {
      //     type: "switch",
      //     field: "formCreateNative",
      //     props: {
      //       checkedValue: false,
      //       unCheckedValue: true,
      //     },
      //     control: [{ value: false, rule: ["formCreateTitle"] }],
      //   },
      //   {
      //     type: "input",
      //     field: "formCreateTitle",
      //   },
      {
        type: "input",
        field: "formCreateChild",
      },
      {
        type: "ColorInput",
        field: "color",
      },
      {
        type: "switch",
        field: "closable",
      },
      {
        type: "switch",
        field: "bordered",
      },
    ]);
  },
};
