/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 13:57:33
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeProps } from "../../utils";

const label = "折叠面板";
const name = "aCollapse";

export default {
  menu: "layout",
  icon: "icon-collapse",
  label,
  name,
  mask: false,
  children: "aCollapsePanel",
  event: ["change"],
  rule() {
    return {
      type: name,
      props: {},
      style: {
        width: "100%",
      },
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      { type: "switch", field: "accordion" },
      { type: "switch", field: "ghost" },
      { type: "switch", field: "bordered", value: true },
    ]);
  },
};
