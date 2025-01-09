<template>
  <div class="_td-table-opt">
    <a-table
      v-if="value && value.length"
      :data-source="value"
      border
      :size="size || 'small'"
      style="width: 100%;"
      :pagination="false"
    >
      <template v-for="(col, idx) in column" :key="col.label + idx">
        <a-table-column :title="col.label">
          <template #default="{record:row}">
            <template v-if="col.value">
              <ValueInput
                :size="size || 'small'"
                :modelValue="row[col.key]"
                @update:modelValue="(n) => (row[col.key] = n)"
                @blur="onInput(row)"
                @change-type="onInput(row)"
              ></ValueInput>
            </template>
            <template v-else>
              <a-input
                :size="size || 'small'"
                v-model:value="row[col.key]"
                @blur="onInput(row)"
              ></a-input>
            </template>
          </template>
        </a-table-column>
      </template>
      <a-table-column width="45" align="center" fixed="right">
        <template #default="{index}">
          <i class="fc-icon icon-delete" @click="del(index)"></i>
        </template>
      </a-table-column>
    </a-table>
    <div class="_td-table-opt-handle">
      <a-button type="link" @click="add" v-if="!max || max > value.length">
        <i class="fc-icon icon-add"></i> {{ t("tableOptions.add") }}
      </a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { copy } from "@form-create/utils/lib/extend";
import ValueInput from "./ValueInput.vue";

export default defineComponent({
  name: "TableOptions",
  emits: ["update:modelValue", "change"],
  components: {
    ValueInput,
  },
  props: {
    modelValue: [Array, Object],
    column: {
      type: Array,
      default: () => [
        { label: "label", key: "label" },
        { label: "value", key: "value" },
      ],
    },
    valueType: String,
    max: Number,
    size: {
      type: String,
      default: "small",
    },
  },
  inject: ["designer"],
  watch: {
    modelValue() {
      this.value = this.tidyModelValue();
    },
  },
  computed: {
    t() {
      return this.designer.setupState.t;
    },
  },
  data() {
    return {
      value: this.tidyModelValue(),
    };
  },
  methods: {
    tidyModelValue() {
      const modelValue = this.modelValue;
      if (this.valueType === "string") {
        return (modelValue || []).map((value) => {
          return { value: "" + value };
        });
      } else if (this.valueType === "object") {
        return Object.keys(modelValue || {}).map((label) => {
          return { label, value: modelValue[label] };
        });
      } else {
        return [...(modelValue || [])].map((v) => {
          return copy(v);
        });
      }
    },
    tidyValue() {
      if (this.valueType === "object") {
        const obj = {};
        this.value.forEach((v) => {
          if (v.label && v.value) {
            obj[v.label] = v.value;
          }
        });
        return obj;
      } else {
        return this.value.map((v) => {
          if (this.valueType === "string") {
            return v.value;
          }
          return { ...v };
        });
      }
    },
    onInput(item) {
      if (this.column.length === 1 && !item[this.column[0].key]) {
        return;
      }
      const flag = this.column.every((v) => {
        if (v.required === false) {
          return true;
        }
        if (["object", "string"].indexOf(this.valueType) > -1) {
          return (
            item[v.key] !== undefined &&
            item[v.key] !== "" &&
            item[v.key] !== null
          );
        }
        return item[v.key] !== undefined;
      });
      if (flag) {
        this.input();
      }
    },
    input() {
      const value = this.tidyValue();
      this.$emit("update:modelValue", value);
      this.$emit("change", value);
    },
    add() {
      this.value.push(
        this.column.reduce((initial, v) => {
          initial[v.key] = "";
          return initial;
        }, {})
      );
    },
    del(idx) {
      this.value.splice(idx, 1);
      this.input();
    },
  },
});
</script>

<style scoped>
._td-table-opt {
  width: 100%;
}

._td-table-opt .el-table {
  z-index: 1;
}

._td-table-opt-handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
}
</style>
