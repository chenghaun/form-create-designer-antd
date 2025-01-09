/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 13:43:04
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeOptions, localeProps } from "../../utils";

const label = "卡片";
const name = "aCard";

export default {
  menu: "layout",
  icon: "icon-card",
  label,
  name,
  drag: true,
  inside: false,
  mask: false,
  rule({ t }) {
    return {
      type: name,
      props: {
        title: t("com.aCard.props.title"),
      },
      style: {
        width: "100%",
      },
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "input",
        field: "title",
      },
      {
        type: "select",
        field: "size",
        options: localeOptions(t, [
          { label: "default", value: "default" },
          { label: "small", value: "small" },
        ]),
      },
      {
        type: "select",
        field: "type",
        options: localeOptions(t, [
          { label: "inner", value: "inner" },
          { label: "default", value: "default" },
        ]),
      },
    ]);
  },
};
