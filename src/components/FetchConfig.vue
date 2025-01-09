<template>
  <div class="_fd-gfc">
    <a-badge status="warning" :dot="configured" >
      <a-button @click="visible = true"  type="primary" block ghost size="small">{{
        t("struct.title")
      }}</a-button>
    </a-badge>
    <a-modal
      class="_fd-gfc-dialog"
      :title="t('fetch.optionsType.fetch')"
      v-model:open="visible"
      destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <a-layout class="_fd-gfc-con" style="height: 450px;">
        <a-tabs class="_fc-tabs" style="width: 100%;">
          <a-tab-pane :tab="t('fetch.config')" key="first">
            <DragForm
              v-model:api="form.api"
              v-model="form.formData"
              :rule="form.rule"
              :option="form.options"
            ></DragForm>
          </a-tab-pane>
          <a-tab-pane lazy :tab="t('fetch.parse')" key="second">
            <FnEditor
              style="height: 415px;"
              v-model="form.parse"
              name="parse"
              :args="[
                { name: 'res', info: t('fetch.response') },
                'rule',
                'api',
              ]"
              ref="parse"
            ></FnEditor>
          </a-tab-pane>
          <a-tab-pane lazy :tab="t('fetch.onError')" key="third">
            <FnEditor
              style="height: 415px;"
              v-model="form.onError"
              name="onError"
              :args="['e']"
              ref="error"
            ></FnEditor>
          </a-tab-pane>
        </a-tabs>
      </a-layout>
      <template #footer>
        <div>
          <a-button size="default" @click="visible = false">{{
            t("props.cancel")
          }}</a-button>
          <a-button type="primary" size="default" @click="save" color="#2f73ff"
            >{{ t("props.ok") }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { deepCopy } from "@form-create/utils/lib/deepextend";
import FnEditor from "./FnEditor.vue";
import StructEditor from "./StructEditor.vue";
import { defineComponent } from "vue";
import { designerForm } from "../utils/form";
import errorMessage from "../utils/message";
import is from "@form-create/utils/lib/type";

const makeRule = (t) => {
  return [
    {
      type: "input",
      field: "action",
      title: t("fetch.action"),
      value: "",
      props: { size: "default" },
      validate: [
        { required: true, message: t("fetch.actionRequired"), trigger: "blur" },
      ],
    },
    {
      type: "radio",
      field: "method",
      title: t("fetch.method"),
      value: "GET",
      props: {
        size: "default",
      },
      options: [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
      ],
      $required: true,
    },
    {
      type: "radio",
      field: "dataType",
      title: t("fetch.dataType"),
      value: "json",
      props: {
        size: "default",
      },
      options: [
        { label: "JSON", value: "json" },
        { label: "FormData", value: "formData" },
      ],
      $required: true,
    },
    {
      type: "TableOptions",
      field: "headers",
      title: t("fetch.headers"),
      value: {},
      props: {
        column: [
          { label: t("props.key"), key: "label" },
          { label: t("props.value"), key: "value" },
        ],
        valueType: "object",
        size: "small",
      },
    },
    {
      type: "TableOptions",
      field: "query",
      title: t("fetch.query"),
      value: {},
      props: {
        column: [
          { label: t("props.key"), key: "label" },
          { label: t("props.value"), key: "value" },
        ],
        valueType: "object",
        size: "small",
      },
    },
    {
      type: "TableOptions",
      field: "data",
      title: t("fetch.data"),
      value: {},
      props: {
        column: [
          { label: t("props.key"), key: "label" },
          { label: t("props.value"), key: "value" },
        ],
        valueType: "object",
        size: "small",
      },
    },
  ];
};

export default defineComponent({
  name: "FetchConfig",
  emits: ["update:modelValue"],
  props: {
    modelValue: [Object, String],
    to: String,
  },
  components: {
    DragForm: designerForm.$form(),
    FnEditor,
    StructEditor,
  },
  inject: ["designer"],
  data() {
    return {
      visible: false,
      value: deepCopy(this.modelValue || {}),
      form: {
        api: {},
        formData: {},
        rule: [],
        options: {
          form: {
            labelWidth: "90px",
            size: "default",
          },
          submitBtn: false,
          resetBtn: false,
        },
      },
    };
  },
  computed: {
    t() {
      return this.designer.setupState.t;
    },
    configured() {
      return !is.empty(this.modelValue);
    },
  },
  watch: {
    visible(v) {
      if (v) {
        this.value = deepCopy(this.modelValue || {});
        this.active();
      }
    },
  },
  methods: {
    open() {
      this.visible = true;
    },
    active() {
      const formData = this.value;
      this.form.rule = formData.type === "static" ? [] : makeRule(this.t);
      this.form.formData = { ...formData };
      this.form.label = formData.label;
      this.form.type = formData.type;
      this.form.data = formData.data;
      this.form.dataType = formData.dataType;
      this.form.parse = formData.parse || "";
      this.form.onError = formData.onError || "";
    },
    save() {
      this.form.api
        .validate()
        .then(() => {
          const formData = { ...this.form.formData };
          if (
            (this.$refs.parse && !this.$refs.parse.save()) ||
            (this.$refs.error && !this.$refs.error.save())
          ) {
            return;
          }
          formData.parse = this.form.parse;
          formData.onError = this.form.onError;
          formData.label = this.form.label;
          formData.type = this.form.type;
          formData.to = this.to || "options";
          this.$emit("update:modelValue", formData);
          this.visible = false;
        })
        .catch((err) => {
          console.error(err);
          errorMessage(err[Object.keys(err)[0]][0].message);
        });
    },
  },
  created() {
    this.active();
  },
});
</script>

<style>
._fd-gfc,
._fd-gfc .ant-badge {
  width: 100%;
}

._fd-gfc .ant-button {
  font-weight: 400;
  width: 100%;
  border-color: #2e73ff;
  color: #2e73ff;
}
._fd-gfc-con{
    background: #FFF !important;
}
._fd-gfc-dialog .ant-tabs-nav {
  margin-bottom: 0;
}

._fd-gfc-dialog .form-create {
  margin-top: 15px;
}

._fd-gfc-con .CodeMirror {
  height: 100%;
  width: 100%;
}

._fd-gfc-con .CodeMirror-wrap pre.CodeMirror-line {
  padding-left: 20px;
}
</style>
