/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 11:35:46
 * @Description:
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from "@form-create/utils/lib/unique";
import {
  localeProps,
  makeTreeOptions,
  makeTreeOptionsRule,
} from "../../utils/index";

const label = "树形控件";
const name = "tree";

export default {
  menu: "main",
  icon: "icon-tree",
  label,
  name,
  event: [
    "nodeClick",
    "nodeContextmenu",
    "checkChange",
    "check",
    "currentChange",
    "nodeExpand",
    "nodeCollapse",
    "nodeDragStart",
    "nodeDragEnter",
    "nodeDragLeave",
    "nodeDragOver",
    "nodeDragEnd",
    "nodeDrop",
  ],
  validate: ["string", "number", "array"],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t("com.tree.name"),
      info: "",
      effect: {
        fetch: "",
      },
      $required: false,
      props: {
        fieldNames: {
          title: "label",
          key: "id",
        },
        checkable: true,
        nodeKey: "id",
        treeData: makeTreeOptions(
          t("props.option"),
          { label: "label", value: "id" },
          3
        ),
      },
    };
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      makeTreeOptionsRule(t, "props.treeData", "label", "id"),
      { type: "input", field: "emptyText" },
      {
        type: "TableOptions",
        field: "fieldNames",
        props: {
          column: [
            { label: t("props.key"), key: "label" },
            { label: t("props.value"), key: "value" },
          ],
          valueType: "object",
        },
      },
      { type: "switch", field: "showLine" },
      { type: "switch", field: "defaultExpandAll" },
    ]);
  },
};
