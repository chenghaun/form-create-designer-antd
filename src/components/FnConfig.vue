<template>
  <div class="_fd-fn-list">
    <a-badge :count="eventNum" status="waring">
      <a-button
        @click="visible = true"
        type="primary"
        block
        ghost
        size="small"
        >{{ t("event.title") }}</a-button
      >
    </a-badge>
    <a-modal
      class="_fd-fn-list-dialog"
      :title="t('event.title')"
      v-model:open="visible"
      destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <a-layout class="_fd-fn-list-con" style="height: 600px;">
        <a-layout-sider style="width: 300px;">
          <a-layout class="_fd-fn-list-l">
            <a-layout-header class="_fd-fn-list-head" height="40px">
              <a-button type="link" size="default">
                {{ t("event.list") }}
              </a-button>
            </a-layout-header>
            <a-layout-content>
              <a-menu :default-active="defActive" v-model="activeData">
                <template v-for="(item, name) in event" :key="name">
                  <a-menu-item :index="name">
                    <div class="_fd-fn-list-method" @click.stop="edit(item)">
                      <span
                        >function<span>{{ name }}</span></span
                      >
                      <span class="_fd-label" v-if="eventInfo[name]">{{
                        eventInfo[name]
                      }}</span>
                    </div>
                  </a-menu-item>
                </template>
              </a-menu>
            </a-layout-content>
          </a-layout>
        </a-layout-sider>
        <a-layout-content>
          <a-layout class="_fd-fn-list-r">
            <a-layout-header
              class="_fd-fn-list-head"
              height="40px"
              v-if="activeData"
            >
              <a-button
                size="small"
                @click="close"
                style="margin-right: 12px;"
                >{{ t("props.cancel") }}</a-button
              >
              <a-button
                size="small"
                type="primary"
                @click="save"
                color="#2f73ff"
                >{{ t("props.save") }}
              </a-button>
            </a-layout-header>
            <a-layout-content v-if="activeData">
              <FnEditor
                ref="fn"
                v-model="eventStr"
                :name="activeData.item.name"
                :args="activeData.item.args"
              />
            </a-layout-content>
          </a-layout>
        </a-layout-content>
      </a-layout>
      <template #footer>
        <div>
          <a-button size="default" @click="visible = false">{{
            t("props.cancel")
          }}</a-button>
          <a-button
            type="primary"
            size="default"
            @click="submit"
            color="#2f73ff"
            >{{ t("props.ok") }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import unique from "@form-create/utils/lib/unique";
import deepExtend from "@form-create/utils/lib/deepextend";
import { defineComponent } from "vue";
import FnEditor from "./FnEditor.vue";
import errorMessage from "../utils/message";

const PREFIX = "[[FORM-CREATE-PREFIX-";
const SUFFIX = "-FORM-CREATE-SUFFIX]]";

export default defineComponent({
  name: "FnConfig",
  emits: ["update:modelValue"],
  props: {
    modelValue: [Object, undefined, null],
    eventConfig: {
      type: Array,
      default: () => [],
    },
  },
  inject: ["designer"],
  components: {
    FnEditor,
  },
  data() {
    return {
      visible: false,
      activeData: null,
      defActive: "no",
      event: {},
      cus: false,
      eventStr: "",
    };
  },
  computed: {
    eventInfo() {
      const info = {};
      this.eventConfig.forEach((v) => {
        info[v.name] = v.info;
      });
      return info;
    },
    t() {
      return this.designer.setupState.t;
    },
    eventNum() {
      let num = 0;
      Object.keys(this.modelValue || {}).forEach((k) => {
        if (this.modelValue[k]) {
          num++;
        }
      });
      return num;
    },
  },
  watch: {
    visible(v) {
      this.event = v ? this.loadFN(deepExtend({}, this.modelValue || {})) : {};
      if (!v) {
        this.destroy();
      }
    },
  },
  methods: {
    getArgs(item) {
      return item.args.join(", ");
    },
    loadFN(e) {
      const val = {};
      this.eventConfig.forEach((item) => {
        const k = item.name;
        const fn = e[k] || "";
        val[k] = {
          item,
          fn,
        };
      });
      return val;
    },
    parseFN(e) {
      const on = {};
      Object.keys(e).forEach((k) => {
        if (e[k].fn) {
          on[k] = e[k].fn;
        }
      });
      return on;
    },
    edit(data) {
      data.key = unique();
      this.activeData = data;
      this.eventStr =
        data.fn ||
        PREFIX +
          `function ${data.item.name}(${this.getArgs(data.item)}){}` +
          SUFFIX;
      this.defActive = data.item.name;
    },
    save() {
      if (this.$refs.fn.save()) {
        this.activeData.fn = this.eventStr;
        this.destroy();
      }
    },
    destroy() {
      this.activeData = null;
      this.defActive = "no";
    },
    close() {
      this.destroy();
    },
    submit() {
      if (this.activeData) {
        return errorMessage(this.t("event.saveMsg"));
      }
      this.$emit("update:modelValue", this.parseFN(this.event));
      this.visible = false;
      this.destroy();
    },
  },
});
</script>

<style>
._fd-fn-list,
._fd-fn-list .el-badge {
  width: 100%;
}

._fd-fn-list .el-button {
  font-weight: 400;
  width: 100%;
  border-color: #2e73ff;
  color: #2e73ff;
}

._fd-fn-list-dialog .el-dialog__body {
  padding: 10px 20px;
}

._fd-fn-list-con .el-main {
  padding: 0;
}

._fd-fn-list-l,
._fd-fn-list-r {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border: 1px solid #ececec;
}

._fd-fn-list-head {
  display: flex;
  padding: 5px 15px;
  height: 40px !important;
  border-bottom: 1px solid #eee;
  background: #f8f9ff !important;
  align-items: center;
}

._fd-fn-list-head .el-button.is-link {
  color: #2f73ff;
}

._fd-fn-list-r {
  border-left: 0 none;
}

._fd-fn-list-r ._fd-fn-list-head {
  justify-content: flex-end;
}

._fd-fn-list-l > .el-main,
._fd-fn-list-r > .el-main {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
}

._fd-fn-list-r > .el-main {
  flex-direction: column;
}

._fd-fn-list-l .el-menu {
  padding: 0 10px 5px;
  border-right: 0 none;
  width: 100%;
  border-top: 0 none;
  overflow: auto;
}

._fd-fn-list-l .el-menu-item.is-active {
  background: #e4e7ed;
  color: #303133;
}

._fd-fn-list-l .el-menu-item {
  height: auto;
  line-height: 1em;
  border: 1px solid #ececec;
  border-radius: 5px;
  padding: 0;
  margin-top: 5px;
}

._fd-fn-list-method {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1em;
  font-family: monospace;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
}

._fd-fn-list-method ._fd-label {
  margin-top: 4px;
  color: #aaaaaa;
  font-size: 12px;
}

._fd-fn-list-method-info > span:first-child,
._fd-fn-list-method > span:first-child {
  color: #9d238c;
}

._fd-fn-list-method-info > span:first-child > span,
._fd-fn-list-method > span:first-child > span {
  color: #000;
  margin-left: 10px;
}

._fd-fn-list-con .CodeMirror {
  height: 100%;
  width: 100%;
}

._fd-fn-list-con .CodeMirror-wrap pre.CodeMirror-line {
  padding-left: 20px;
}
</style>
