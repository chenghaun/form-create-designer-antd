/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 12:45:27
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeProps } from "../../utils";

const label = "栅格布局";
const name = "fcRow";

export default {
  menu: "layout",
  icon: "icon-row",
  label,
  name,
  mask: false,
  children: "col",
  childrenLen: 2,
  rule() {
    return {
      type: name,
      props: {},
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "inputNumber",
        field: "gutter",
        props: { min: 0 },
      },
      {
        type: "select",
        field: "justify",
        options: [
          { label: "start", value: "start" },
          { label: "end", value: "end" },
          {
            label: "center",
            value: "center",
          },
          { label: "space-around", value: "space-around" },
          { label: "space-between", value: "space-between" },
        ],
      },
      {
        type: "select",
        field: "align",
        options: [
          { label: "top", value: "top" },
          { label: "middle", value: "middle" },
          {
            label: "bottom",
            value: "bottom",
          },
        ],
      },
    ]);
  },
};
