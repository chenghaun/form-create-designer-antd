/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 11:30:10
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from "@form-create/utils/lib/unique";
import { localeProps, makeTreeOptions, makeTreeOptionsRule } from "../../utils";

const label = "穿梭框";
const name = "aTransfer";

export default {
  menu: "main",
  icon: "icon-transfer",
  label,
  name,
  event: ["change", "leftCheckChange", "rightCheckChange"],
  validate: ["string", "number", "array"],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t("com.aTransfer.name"),
      info: "",
      $required: false,
      props: {
        data: makeTreeOptions(
          t("props.option"),
          { label: "label", value: "key" },
          1
        ),
      },
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      makeTreeOptionsRule(t, "props.data", "label", "key"),
      { type: "switch", field: "oneWay" },
      { type: "switch", field: "pagination" },
      { type: "switch", field: "showSearch" },
      { type: "switch", field: "showSelectAll" },
      {
        type: "TableOptions",
        field: "titles",
        props: {
          column: [{ label: t("props.value"), key: "value" }],
          valueType: "string",
          max: 2,
        },
      },
      //   { type: "input", field: "filterPlaceholder" },
      //   {
      //     type: "select",
      //     field: "targetOrder",
      //     info: t("com.aTransfer.targetOrderInfo"),
      //     options: [
      //       { label: "original", value: "original" },
      //       {
      //         label: "push",
      //         value: "push",
      //       },
      //       { label: "unshift", value: "unshift" },
      //     ],
      //   },
      //   {
      //     type: "TableOptions",
      //     field: "buttonTexts",
      //     props: {
      //       column: [{ label: t("props.value"), key: "value" }],
      //       valueType: "string",
      //       max: 2,
      //     },
      //   },
    ]);
  },
};
