/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 12:25:02
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeOptions, localeProps } from "../../utils";

const label = "按钮";
const name = "aButton";

export default {
  menu: "aide",
  icon: "icon-button",
  label,
  name,
  mask: true,
  event: ["click"],
  rule({ t }) {
    return {
      type: name,
      props: {},
      children: [t("com.aButton.name")],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "input",
        field: "formCreateChild",
      },
      {
        type: "select",
        field: "size",
        options: localeOptions(t, [
          { label: "large", value: "large" },
          { label: "default", value: "middle" },
          { label: "small", value: "small" },
        ]),
      },
      {
        type: "select",
        field: "type",
        options: [
          { label: "primary", value: "primary" },
          { label: "ghost", value: "ghost" },
          { label: "dashed", value: "dashed" },
          { label: "link", value: "link" },
          { label: "text", value: "text" },
          { label: "default", value: "default" },
        ],
      },
      {
        type: "select",
        field: "shape",
        options: [
          { label: "circle", value: "circle" },
          { label: "round", value: "round" },
          { label: "default", value: "default" },
        ],
      },
      { type: "switch", field: "ghost" },
      { type: "switch", field: "danger" },
      { type: "switch", field: "block" },
      { type: "switch", field: "loading" },
      { type: "switch", field: "disabled" },
    ]);
  },
};
