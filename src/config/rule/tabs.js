import { localeOptions, localeProps } from "../../utils";

const label = "标签页";
const name = "aTabs";

export default {
  menu: "layout",
  icon: "icon-tab",
  label,
  name,
  mask: false,
  event: ["tabClick", "tabChange", "tabRemove", "tabAdd", "edit"],
  children: "aTabPane",
  rule() {
    return {
      type: name,
      style: { width: "100%" },
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "select",
        field: "type",
        options: [
          { label: "card", value: "card" },
          { label: "line", value: "line" },
          { label: "border-card", value: "border-card" },
        ],
      },
      //   { type: "switch", field: "closable" },
      {
        type: "select",
        field: "tabPosition",
        options: localeOptions(t, [
          { label: "top", value: "top" },
          { label: "bottom", value: "bottom" },
          { label: "right", value: "right" },
          { label: "left", value: "left" },
        ]),
      },
      { type: "switch", field: "centered" },
    ]);
  },
};
