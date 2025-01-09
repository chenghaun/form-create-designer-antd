import uniqueId from "@form-create/utils/lib/unique";
import {
  localeProps,
  makeTreeOptions,
  makeTreeOptionsRule,
} from "../../utils/index";

const label = "树形选择";
const name = "aTreeSelect";

export default {
  menu: "main",
  icon: "icon-tree-select",
  label,
  name,
  event: ["change", "visibleChange", "removeTag", "clear", "blur", "focus"],
  validate: ["string", "number", "array"],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t("com.aTreeSelect.name"),
      info: "",
      effect: {
        fetch: "",
      },
      $required: false,
      modelField: "value",
      props: {
        treeNodeFilterProp: "label",
        treeData: makeTreeOptions(
          t("props.option"),
          { label: "label", value: "value" },
          3
        ),
      },
    };
  },
  watch: {
    multiple({ rule }) {
      rule.key = uniqueId();
    },
  },
  props(_, { t }) {
    return localeProps(t, name + ".props", [
      makeTreeOptionsRule(t, "props.treeData", "label", "value"),

      { type: "switch", field: "multiple" },
      { type: "switch", field: "disabled" },
      { type: "switch", field: "allowClear" },
      { type: "switch", field: "showSearch" },
      { type: "switch", field: "treeCheckable" },
      { type: "switch", field: "treeDefaultExpandAll" },
      { type: "switch", field: "treeLine" },
      { type: "input", field: "placeholder" },
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
    ]);
  },
};
