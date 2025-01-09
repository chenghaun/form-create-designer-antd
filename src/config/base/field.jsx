/*
 * @Author: chenghuan
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: chenghuan
 * @LastEditTime: 2025-01-09 16:28:51
 * @Description:
 * @contact_information: 945918116@qq.com
 */
export default function field({ t }) {
  return [
    {
      type: "FieldInput",
      field: "field",
      value: "",
      title: t("form.field"),
    },
    {
      type: "LanguageInput",
      field: "title",
      value: "",
      title: t("form.title"),
    },
    {
      type: "LanguageInput",
      field: "info",
      value: "",
      title: t("form.info"),
    },
    {
      type: "SizeInput",
      field: "formCreateWrap>labelWidth",
      value: "",
      title: t("form.labelWidth"),
    },
    {
      type: "Struct",
      field: "_control",
      name: "control",
      value: [],
      title: t("form.control"),
      info: {
        type: "tooltip",
        native: true,
        effect: "dark",
        align: "left",
        title: (
          <span>
            {t("form.controlDocument")}
            <a
              target="_blank"
              href="https://form-create.com/v3/guide/control"
              style="color: inherit;text-decoration: underline;"
            >
              {t("form.document")}
            </a>
          </span>
        ),
        rawContent: true,
      },
      props: {
        defaultValue: [],
        validate(val) {
          if (!Array.isArray(val)) return false;
          if (!val.length) return true;
          return !val.some(({ rule }) => {
            return !Array.isArray(rule);
          });
        },
      },
    },
  ];
}
