/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 10:45:04
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from "@form-create/utils/lib/unique";
import { localeOptions, localeProps } from "../../utils";

const label = "日期区间";
const name = "dateRange";

export default {
  menu: "main",
  icon: "icon-date-range",
  label,
  name,
  event: [
    "change",
    "blur",
    "focus",
    "calendarChange",
    "panelChange",
    "visibleChange",
  ],
  rule({ t }) {
    return {
      type: "datePicker",
      field: uniqueId(),
      title: t("com.dateRange.name"),
      info: "",
      $required: false,
      props: {
        range: true,
      },
    };
  },
  props(_, { t }) {
    return localeProps(t, "datePicker.props", [
      { type: "switch", field: "disabled" },
      { type: "switch", field: "bordered", value: true },
      {
        type: "select",
        field: "picker",
        options: localeOptions(t, [
          { label: "year", value: "year" },
          { label: "month", value: "month" },
          { label: "date", value: "date" },
          { label: "week", value: "week" },
          { label: "quarter", value: "quarter" },
        ]),
      },
      { type: "switch", field: "showTime" },
      { type: "switch", field: "allowClear", value: true },
      { type: "switch", field: "inputReadOnly", value: false },
      { type: "input", field: "startPlaceholder" },
      { type: "input", field: "endPlaceholder" },
      { type: "input", field: "separator" },
      { type: "input", field: "format" },
      { type: "input", field: "valueFormat" },
    ]);
  },
};
