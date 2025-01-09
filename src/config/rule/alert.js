/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 12:12:10
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeProps } from "../../utils";

const label = "提示";
const name = "aAlert";

export default {
  menu: "aide",
  icon: "icon-alert",
  label,
  name,
  event: ["close"],
  rule({ t }) {
    return {
      type: name,
      props: {
        message: t("com.aAlert.name"),
        description: t("com.aAlert.description"),
        type: "success",
        effect: "dark",
      },
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      { type: "input", field: "message" },
      {
        type: "select",
        field: "type",
        options: [
          { label: "success", value: "success" },
          { label: "warning", value: "warning" },
          { label: "info", value: "info" },
          { label: "error", value: "error" },
        ],
      },
      { type: "input", field: "description" },
      { type: "switch", field: "closable", value: true },
      { type: "switch", field: "banner" },
      { type: "input", field: "closeText" },
      { type: "switch", field: "showIcon" },
    ]);
  },
};
