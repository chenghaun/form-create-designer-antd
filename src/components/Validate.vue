<template>
  <div class="_fd-validate">
    <template v-for="(item, idx) in validate" :key="idx">
      <div class="_fd-validate-item">
        <div class="_fd-validate-title">
          <div>
            <span>{{ idx + 1 }}</span>
            {{ modes[item.mode] }}
          </div>
          <i class="fc-icon icon-delete2" @click="remove(idx)"></i>
        </div>
        <a-row>
          <a-col :span="getSpan(item)">
            <a-form-item :label="t('validate.mode')">
              <a-select v-model:value="item.trigger" @change="onInput">
                <a-select-option
                  v-for="item in triggers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="getSpan(item)">
            <a-form-item :label="modes[item.mode]">
              <template v-if="item.mode === 'pattern'">
                <a-input
                  v-model:value="item[item.mode]"
                  @change="onInput"
                ></a-input>
              </template>
              <template v-else-if="item.mode === 'validator'">
                <FnInput
                  v-model="item[item.mode]"
                  name="name"
                  :args="['rule', 'value', 'callback']"
                  @change="onInput"
                  >{{ t("validate.modes.validator") }}
                </FnInput>
              </template>
              <template v-else>
                <a-input-number
                  v-model:value="item[item.mode]"
                  @change="onInput"
                ></a-input-number>
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item :label="t('validate.message')">
              <LanguageInput
                v-model="item.message"
                :placeholder="t('validate.requiredPlaceholder')"
                @change="onInput"
              >
              </LanguageInput>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </template>
    <a-dropdown trigger="click" size="default" popper-class="_fd-validate-pop">
      <a-button class="_fd-validate-btn" size="small"
        >{{ t("validate.rule") }} +</a-button
      >
      <template #overlay>
        <a-menu>
          <a-menu-item
            :command="value"
            v-for="(label, value) in modes"
            :key="value"
            @click="handleCommand(value)"
          >
            <div>{{ label }}</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { localeOptions } from "../utils";
import FnInput from "./FnInput.vue";
import { deepCopy } from "@form-create/utils/lib/deepextend";
import LanguageInput from "./language/LanguageInput.vue";

export default defineComponent({
  name: "Validate",
  inject: ["designer"],
  emits: ["update:modelValue"],
  props: {
    modelValue: Array,
  },
  components: {
    LanguageInput,
    FnInput,
  },
  watch: {
    modelValue(n) {
      this.validate = this.parseValue(n || []);
    },
  },
  data() {
    return {
      validate: this.parseValue(this.modelValue || []),
    };
  },
  computed: {
    t() {
      return this.designer.setupState.t;
    },
    modes() {
      const activeRule = this.designer.setupState.activeRule;
      if (activeRule && activeRule._menu.subForm === "object") {
        return {
          validator: this.t("validate.modes.validator"),
        };
      } else {
        return {
          min: this.t("validate.modes.min"),
          max: this.t("validate.modes.max"),
          len: this.t("validate.modes.len"),
          pattern: this.t("validate.modes.pattern"),
          validator: this.t("validate.modes.validator"),
        };
      }
    },
    triggers() {
      return localeOptions(this.t, [
        { label: "blur", value: "blur" },
        { label: "change", value: "change" },
        { label: "submit", value: "submit" },
      ]);
    },
  },
  methods: {
    handleCommand(mode) {
      this.validate.push({
        transform: new Function(
          "val",
          "this.type = val == null ? 'string' : (Array.isArray(val) ? 'array' : (typeof val)); return val;"
        ),
        mode,
        trigger: "blur",
      });
    },
    autoMessage(item) {
      const title = this.designer.setupState.activeRule.title;
      if (this.designer.setupState.activeRule) {
        item.message = this.t("validate.autoRequired", { title });
        this.onInput();
      }
    },
    getSpan(item) {
      return ["pattern", "validator", "required"].indexOf(item.mode) > -1
        ? 24
        : 12;
    },
    onInput: function () {
      this.$emit(
        "update:modelValue",
        this.validate.map((item) => {
          item = { ...item };
          if (!item.message) {
            delete item.message;
          }
          return item;
        })
      );
    },
    remove(idx) {
      this.validate.splice(idx, 1);
      this.onInput();
    },
    parseValue(val) {
      return deepCopy(
        val.map((v) => {
          if (v.validator) {
            v.mode = "validator";
          }
          if (!v.mode) {
            Object.keys(v).forEach((k) => {
              if (["message", "type", "trigger", "mode"].indexOf(k) < 0) {
                v.mode = k;
              }
            });
          }
          return v;
        })
      );
    },
  },
});
</script>

<style>
._fd-validate {
  display: flex;
  flex-direction: column;
  width: 100%;
}

._fd-validate-btn {
  font-weight: 400;
  width: 100%;
  border-color: #2e73ff;
  color: #2e73ff;
}

._fd-validate-pop .el-dropdown-menu__item {
  width: 248px;
}

._fd-validate-item {
  border-bottom: 1px dashed #ececec;
  margin-bottom: 10px;
}

._fd-validate-item .el-col-12:first-child {
  padding-right: 5px;
}

._fd-validate-item .el-col-12 + .el-col-12 {
  padding-left: 5px;
}

._fd-validate-item .el-input-number {
  width: 100%;
}

._fd-validate-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}

._fd-validate-title > div {
  display: flex;
  align-items: center;
}

._fd-validate-title > div > span {
  width: 16px;
  height: 16px;
  background: #ececec;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  border-radius: 15px;
  margin-right: 5px;
}

._fd-validate-title i {
  cursor: pointer;
}

._fd-validate-title i:hover {
  color: #ff2e2e;
}

._fd-validate .append-msg {
  cursor: pointer;
}

._fd-validate .el-input-group__append {
  padding: 0 10px;
}
</style>
