<template>
  <div class="_fd-tree-opt">
    <a-tree :tree-data="value" node-key="index" :expand-on-click-node="false">
      <template #title="{ node, data}">
        <div class="_fd-tree-opt-node">
          <a-input
            class="_fd-tree-opt-first"
            v-model:value="data[overColumns.label]"
            @blur="change"
          />
          <ValueInput
            class="_fd-tree-opt-last"
            v-model="data[overColumns.value]"
            @blur="change"
            @change-type="change"
          >
            <template #addonAfter>
              <div class="_fd-tree-opt-btn" @click="add(node, data)">
                <i class="fc-icon icon-add"></i>
              </div>
              <div class="_fd-tree-opt-btn" @click="append(data)">
                <i class="fc-icon icon-add-child"></i>
              </div>
              <div
                class="_fd-tree-opt-btn _fd-tree-opt-danger"
                @click="remove(node, data)"
              >
                <i class="fc-icon icon-delete"></i>
              </div>
            </template>
          </ValueInput>
        </div>
      </template>
    </a-tree>
  </div>
</template>

<script>
import { defineComponent, toRaw } from "vue";
import { deepCopy } from "@form-create/utils/lib/deepextend";
import ValueInput from "./ValueInput.vue";

export default defineComponent({
  name: "TreeOptions",
  emits: ["update:modelValue"],
  components: {
    ValueInput,
  },
  props: {
    modelValue: Array,
    columns: Object,
  },
  inject: ["designer"],
  data() {
    return {
      value: [...deepCopy(this.modelValue || [])],
    };
  },
  computed: {
    t() {
      return this.designer.setupState.t;
    },
    overColumns() {
      if (!this.columns) {
        return {
          label: "label",
          value: "value",
        };
      }
      return {
        label: this.columns.label || "label",
        value: this.columns.value || "value",
      };
    },
  },
  created() {
    if (!this.value.length) {
      this.value = [{}];
    }
  },
  methods: {
    tidyValue() {
      return deepCopy(this.value);
    },
    change() {
      this.$emit("update:modelValue", this.tidyValue());
    },
    findItemRecursive(tree, data, path = []) {
      for (const [index, item] of tree.entries()) {
        if (JSON.stringify(item) == JSON.stringify(toRaw(data))) {
          // 找到目标项
          return [...path, index];
        }
        if (item.children && item.children.length > 0) {
          const result = this.findItemRecursive(item.children, data, [
            ...path,
            index,
          ]);
          if (result) {
            // 子树中找到目标项
            return result;
          }
        }
      }
      // 未找到目标项
      return null;
    },
    addTree(list, data) {
      for (let child of list) {
        console.log(JSON.stringify(child) == JSON.stringify(toRaw(data)));
        if (JSON.stringify(child) === JSON.stringify(toRaw(data))) {
          list.push({});
        } else if (child.children) {
          child.children = this.addTree(child.children, data);
        }
      }
      return list;
    },

    add(node, data) {
      let indexList = this.findItemRecursive(this.value, data) || [];
      let parentNode = this.value;
      console.log(indexList);
      for (let i = 0; i < indexList.length - 1; i++) {
        parentNode = parentNode[indexList[i]].children;
      }
      parentNode.push({});
    },
    append(data) {
      if (!data.children) {
        data.children = [];
      }
      data.children.push({});
    },
    remove(node, data) {
      let indexList = this.findItemRecursive(this.value, data) || [];
      if (!indexList.length) return;
      if (indexList.length === 1) {
        this.value.splice(indexList[0], 1);
      } else {
        let parentNode = this.value[indexList[0]];
        for (let i = 1; i < indexList.length - 1; i++) {
          parentNode = parentNode.children[indexList[i]];
        }
        if (parentNode.children) {
          parentNode.children.splice(indexList.pop(), 1);
          if (!parentNode.children.length) {
            delete parentNode.children;
          }
        }
      }
      this.change();
    },
  },
});
</script>

<style>
._fd-tree-opt ._fd-tree-opt-btn {
  height: 19px;
  width: 18px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  padding-bottom: 1px;
  float: left;
  cursor: pointer;
  justify-content: center;
  background-color: #2f73ff;
}

._fd-tree-opt-node {
  display: flex;
  align-items: center;
}

._fd-tree-opt-first {
  width: 60px;
  margin-right: 5px;
  font-size: 12px;
  height: 22px;
}

._fd-tree-opt-last {
  width: 165px;
}

._fd-tree-opt-last._label {
  width: 175px;
}

._fd-tree-opt-last._label .el-input-group__append {
  width: 65px;
}

._fd-tree-opt ._fd-tree-opt-danger {
  background-color: #ff2d2e;
  border-radius: 0 2px 2px 0;
}

._fd-tree-opt .el-tree-node__content {
  margin-bottom: 3px;
  height: 28px;
}

._fd-tree-opt .el-input__inner {
  border-right: 0 none;
}

._fd-tree-opt .el-input-group__append {
  width: 90px;
  padding-right: 2px;
  padding-left: 1px;
  background: #fff;
}
</style>
