/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 10:32:30
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from "@form-create/utils/lib/unique";
import { localeOptions, localeProps } from "../../utils";

const label = "时间";
const name = "timePicker";

export default {
  menu: "main",
  icon: "icon-time",
  label,
  name,
  event: ["change", "blur", "focus", "visibleChange"],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t("com.timePicker.name"),
      info: "",
      $required: false,
      props: {},
    };
  },
  watch: {
    isRange({ rule }) {
      rule.key = uniqueId();
    },
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      {
        type: "switch",
        field: "disabled",
      },
      {
        type: "switch",
        field: "allowClear",
        value: true,
      },
      {
        type: "select",
        field: "valueFormat",
        options: localeOptions(t, [
          { label: "HH:mm:ss", value: "HH:mm:ss" },
          { label: "HH:mm", value: "HH:mm" },
        ]),
      },
      {
        type: "inputNumber",
        field: "hourStep",
      },
      {
        type: "inputNumber",
        field: "minuteStep",
      },
      {
        type: "inputNumber",
        field: "secondStep",
      },
      { type: "switch", field: "inputReadOnly", value: true },
      {
        type: "input",
        field: "placeholder",
      },
      {
        type: "switch",
        field: "bordered",
        value: true,
      },
    ]);
  },
};
