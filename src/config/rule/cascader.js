/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 11:01:06
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from "@form-create/utils/lib/unique";
import {
  localeOptions,
  localeProps,
  makeTreeOptions,
  makeTreeOptionsRule,
} from "../../utils/index";

const label = "级联选择器";
const name = "cascader";

export default {
  menu: "main",
  icon: "icon-cascader",
  label,
  name,
  event: [
    "change",
    "expandChange",
    "blur",
    "focus",
    "visibleChange",
    "removeTag",
  ],
  validate: ["string", "number", "array"],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t("com.cascader.name"),
      info: "",
      effect: {
        fetch: "",
      },
      $required: false,
      props: {
        options: makeTreeOptions(
          t("props.option"),
          { label: "label", value: "value" },
          3
        ),
      },
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      makeTreeOptionsRule(t, "props.options"),
      ...[
        { type: "switch", field: "disabled" },
        { type: "switch", field: "allowClear" },
        { type: "switch", field: "multiple" },
        { type: "input", field: "placeholder" },
        { type: "switch", field: "showSearch" },
      ],
    ]);
  },
};
