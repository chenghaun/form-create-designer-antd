/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 14:01:30
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeProps } from "../../utils";

const label = "面板";
const name = "aCollapsePanel";

export default {
  icon: "icon-cell",
  label,
  name,
  drag: true,
  dragBtn: false,
  inside: true,
  mask: false,
  rule({ t }) {
    return {
      type: name,
      props: {
        header: t("com.aCollapsePanel.name"),
      },
      style: {},
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      { type: "input", field: "header" },
      { type: "input", field: "key" },
      { type: "switch", field: "disabled" },
      { type: "switch", field: "showArrow", value: true },
    ]);
  },
};
