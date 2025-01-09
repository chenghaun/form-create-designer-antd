/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 12:06:53
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import { localeProps } from "../../utils";
import uniqueId from "@form-create/utils/lib/unique";

const label = "分组";
const name = "subForm";

export default {
  menu: "subform",
  icon: "icon-group",
  label,
  name,
  inside: false,
  drag: true,
  dragBtn: true,
  mask: false,
  subForm: "object",
  event: ["change"],
  loadRule(rule) {
    rule.children = rule.props.rule || [];
    rule.type = "FcRow";
    delete rule.props.rule;
  },
  parseRule(rule) {
    rule.props.rule = rule.children;
    rule.type = "subForm";
    delete rule.children;
  },
  rule({ t }) {
    return {
      type: "fcRow",
      field: uniqueId(),
      title: t("com.subForm.name"),
      info: "",
      $required: false,
      props: {},
      children: [],
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "switch",
        field: "disabled",
      },
      //   { type: "switch", field: "syncDisabled", value: true },
    ]);
  },
};
