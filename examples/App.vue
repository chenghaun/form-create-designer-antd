<template>
  <div id="app">
    <div class="_fc-top">
      <div
        v-if="topImg"
        @click="goPro"
        class="js-top-img top_img"
        style="
          background: url('https://static.form-create.com/file/img/top2.jpg');
          height: 60px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        "
      >
        <div class="container pos">
          <div class="close" @click.stop="topImg = false">X</div>
        </div>
      </div>
      <div class="_fc-top-nav">
        <div class="_fc-top-copyright">
          <img
            class="_fc-t-logo"
            src="http://form-create.com/logo.png"
            alt="logo"
          />
          <div class="_fc-t-name"><span>FcDesigner</span></div>
        </div>
        <div class="_fc-top-link">
          <a href="https://form-create.com/" target="_blank" class="item"
            >官网</a
          >
          <a href="https://form-create.com/v3/mobile" class="item"
            >移动端设计器</a
          >
          <a href="https://pro.form-create.com/view" class="item pro-version"
            >高级版🔥</a
          >
          <a href="https://view.form-create.com/" target="_blank" class="item"
            >文档</a
          >
          <a
            href="https://form-create.com/designer"
            target="_blank"
            class="item"
            >Vue2版本</a
          >
          <a
            href="https://github.com/xaboy/form-create-designer"
            target="_blank"
            class="item"
            >查看源码</a
          >
        </div>
      </div>
    </div>
    <fc-designer
      ref="designer"
      :config="config"
      :handle="handle"
      :locale="locale"
    >
      <template #handle>
        <div class="handle">
          <a-dropdown>
            <div class="ant-dropdown-link">
              <span>导入</span>
              <span class="fc-icon icon-down"></span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="setJson">导入JSON</a-menu-item>
                <a-menu-item @click="setOption">导入Options</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-dropdown>
            <div class="ant-dropdown-link">
              <span>导出</span>
              <span class="fc-icon icon-down"></span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="showJson">生成JSON</a-menu-item>
                <a-menu-item @click="showOption">生成Options</a-menu-item>
                <a-menu-item @click="copyUrl">生成预览链接</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </fc-designer>

    <a-layout-footer class="_fc-copyright" height="30px">
      <div class="_fc-b-item">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=chenghaun&repo=form-create-designer-antd&type=star&count=true"
          frameborder="0"
          scrolling="0"
          width="80"
          height="21"
          title="GitHub"
        ></iframe>
      </div>
      <span style="margin: 0 10px;">|</span>
      <div class="_fc-b-item">
        <a
          href="https://github.com/chenghaun/form-create-designer-antd"
          target="_blank"
          style="display: inline-flex;"
        >
          <img
            src="https://img.shields.io/badge/License-MIT-yellow.svg"
            alt="mit"
          />
        </a>
      </div>
    </a-layout-footer>

    <a-modal
      :title="title[type]"
      v-model:open="state"
      class="_fc-t-dialog"
      @cancel="state = false"
      @ok="onOk"
    >
      <div ref="editor" v-if="state"></div>
      <span style="color: red;" v-if="err">输入内容格式有误!</span>
      <template #footer>
        <span class="dialog-footer" v-if="type > 2">
          <a-button @click="state = false">取 消</a-button>
          <a-button type="primary" @click="onOk">确 定</a-button>
        </span>
      </template>
    </a-modal>
  </div>
</template>

<script>
import jsonlint from "jsonlint-mod";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/addon/mode/overlay";
import "codemirror/addon/mode/simple";
import "codemirror/addon/selection/selection-pointer";
import "codemirror/mode/handlebars/handlebars";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/pug/pug";

import is from "@form-create/utils/lib/type";
import formCreate from "@form-create/ant-design-vue";
import ZhCn from "../src/locale/zh-cn";
import En from "../src/locale/en";
import { copyTextToClipboard } from "../src/utils";

const CACHE_KEY = "fc-config-$101";
const TITLE = [
  "生成规则",
  "表单规则",
  "生成组件",
  "设置生成规则",
  "设置表单规则",
];

export default {
  name: "app",
  components: {
    // arrowDown,
  },
  data() {
    let data = window.location.hash.substring(1);
    let hashData = null;
    if (data) {
      try {
        hashData = JSON.parse(decodeURIComponent(escape(atob(data))));
      } catch (e) {}
    }
    return {
      state: false,
      value: null,
      title: TITLE,
      editor: null,
      err: false,
      type: -1,
      autoSaveId: null,
      lang: "cn",
      locale: null,
      hashData,
      topImg: false,
      config: {
        autoActive: true,
        fieldReadonly: false,
        showSaveBtn: true,
      },
      handle: [
        {
          label: "中英切换",
          handle: () => {
            this.changeLocale();
          },
        },
      ],
    };
  },
  watch: {
    state(n) {
      if (!n) {
        this.value = null;
        this.err = false;
      }
    },
    value() {
      this.load();
    },
  },
  methods: {
    goPro() {
      location.href = "https://pro.form-create.com/view";
    },
    getCache() {
      function def() {
        return { opt: null, rule: null };
      }

      try {
        let cache = localStorage.getItem(CACHE_KEY);
        if (!cache) {
          return def();
        }
        cache = JSON.parse(cache);
        cache.rule = formCreate.parseJson(cache.rule);
        return cache;
      } catch (e) {
        return def();
      }
    },
    setCache({ opt, rule }) {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          opt,
          rule: formCreate.toJson(rule),
        })
      );
    },
    loadAutoSave() {
      const s = this.autosave;
      if (s === false) return;
      this.autoSaveId = setInterval(
        () => {
          if (this.$refs.designer) {
            this.setCache({
              opt: this.$refs.designer.getOption(),
              rule: this.$refs.designer.getRule(),
            });
          } else {
            this.autoSaveId && clearInterval(this.autoSaveId);
            this.autoSaveId = null;
          }
        },
        is.Number(s) ? s : 2000
      );
    },
    changeLocale() {
      if (this.lang === "cn") {
        this.locale = En;
        this.lang = "en";
      } else {
        this.locale = ZhCn;
        this.lang = "cn";
      }
    },
    load() {
      let val;
      if (this.type === 2) {
        val = this.value;
      } else if (this.type === 0) {
        val = formCreate.toJson(this.value, 2);
      } else {
        val = JSON.stringify(this.value, null, 2);
      }
      this.$nextTick(() => {
        this.editor = CodeMirror(this.$refs.editor, {
          lineNumbers: true,
          mode: this.type === 2 ? { name: "vue" } : "application/json",
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
          line: true,
          tabSize: 2,
          lineWrapping: true,
          value: val || "",
        });
        this.editor.on("blur", () => {
          this.err = this.editor.state.lint.marked.length > 0;
        });
      });
    },
    onValidationError(e) {
      this.err = e.length !== 0;
    },
    showJson() {
      this.state = true;
      this.type = 0;
      this.value = this.$refs.designer.getRule();
    },
    showOption() {
      this.state = true;
      this.type = 1;
      this.value = this.$refs.designer.getOption();
    },
    showTemplate() {
      this.state = true;
      this.type = 2;
      this.value = this.makeTemplate();
    },
    setJson() {
      this.state = true;
      this.type = 3;
      this.value = [];
    },
    setOption() {
      this.state = true;
      this.type = 4;
      this.value = { form: {} };
    },
    copyUrl() {
      const rule = this.$refs.designer.getJson();
      const options = this.$refs.designer.getOptionsJson();
      const str = btoa(
        unescape(encodeURIComponent(JSON.stringify({ rule, options })))
      );
      copyTextToClipboard("https://form-create.com/v3/designer#" + str);
    },
    onOk() {
      if (this.err) return;
      const json = this.editor.getValue();
      let val = JSON.parse(json);
      if (this.type === 3) {
        if (!Array.isArray(val)) {
          this.err = true;
          return;
        }
        this.$refs.designer.setRule(formCreate.parseJson(json));
      } else {
        if (!is.Object(val) || !val.form) {
          this.err = true;
          return;
        }
        this.$refs.designer.setOption(val);
      }
      this.state = false;
    },
    makeTemplate() {
      const rule = this.$refs.designer.getRule();
      const opt = this.$refs.designer.getOption();
      return `<template>
    <form-create
      v-model="fapi"
      :rule="rule"
      :option="option"
      @submit="onSubmit"
    ></form-create>
  </template>

<script>
import formCreate from "@form-create/ant-design-vue";

export default {
  data () {
    return {
        fapi: null,
        rule: formCreate.parseJson('${formCreate
          .toJson(rule)
          .replaceAll("\\", "\\\\")}'),
        option: formCreate.parseJson('${JSON.stringify(opt)}')
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`;
    },
  },
  mounted() {
    if (this.hashData && this.hashData.rule) {
      this.$refs.designer.setRule(this.hashData.rule);
      if (this.hashData.options) {
        this.$refs.designer.setOptions(this.hashData.options);
      }
    } else {
      const cache = this.getCache();
      if (cache.rule) {
        this.$refs.designer.setRule(cache.rule);
      }
      if (cache.opt) {
        this.$refs.designer.setOption(cache.opt);
      }
      if (
        !this.$refs.designer.formOptions.language ||
        Object.keys(this.$refs.designer.formOptions.language).length === 0
      ) {
        this.$refs.designer.formOptions.language = {
          "zh-cn": {
            Az87OmQS: "商品名称",
            BAVvUidu: "商品价格",
            CkD1fG2H: "商品描述",
            DgH2iJ3K: "库存数量",
            EhI3jK4L: "发货方式",
            FiJ4kL5M: "配送时间",
            GjK5lM6N: "用户评价",
            HkL6mN7O: "添加到购物车",
            IkM7nO8P: "立即购买",
            JlN8oP9Q: "优惠活动",
            KmO9pQ0R: "搜索商品",
            LnP0qR1S: "分类",
            MoQ1rS2T: "品牌",
            NpR2sT3U: "付款方式",
            OqS3tU4V: "订单确认",
            PrT4uV5W: "用户注册",
            QsU5vW6X: "用户登录",
            RtV6wX7Y: "联系客服",
            SuW7xY8Z: "退出登录",
            TvX8yZ9A: "个人信息",
            UwY9zA0B: "购物车",
            VxZ0aB1C: "结算",
            WyA1bC2D: "运费",
            XzB2cD3E: "订单状态",
            YaC3dE4F: "支付成功",
            ZbD4eF5G: "支付失败",
          },
          en: {
            Az87OmQS: "Goods name",
            BAVvUidu: "Goods price",
            CkD1fG2H: "Product description",
            DgH2iJ3K: "Stock quantity",
            EhI3jK4L: "Shipping method",
            FiJ4kL5M: "Delivery time",
            GjK5lM6N: "User reviews",
            HkL6mN7O: "Add to cart",
            IkM7nO8P: "Buy now",
            JlN8oP9Q: "Promotions",
            KmO9pQ0R: "Search products",
            LnP0qR1S: "Category",
            MoQ1rS2T: "Brand",
            NpR2sT3U: "Payment method",
            OqS3tU4V: "Order confirmation",
            PrT4uV5W: "User registration",
            QsU5vW6X: "User login",
            RtV6wX7Y: "Contact customer service",
            SuW7xY8Z: "Logout",
            TvX8yZ9A: "Personal information",
            UwY9zA0B: "Shopping cart",
            VxZ0aB1C: "Checkout",
            WyA1bC2D: "Shipping fee",
            XzB2cD3E: "Order status",
            YaC3dE4F: "Payment successful",
            ZbD4eF5G: "Payment failed",
          },
        };
      }
    }

    this.$nextTick(() => {
      this.loadAutoSave();
    });
  },
  beforeDestroy() {
    const id = this.autoSaveId;
    id && clearInterval(id);
  },
  beforeCreate() {
    window.jsonlint = jsonlint;
  },
};
</script>

<style>
._fc-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #282828;
  position: relative;
  cursor: default;
}

:focus-visible {
  outline: 0 none;
}

.top_img {
  cursor: pointer;
}

._fc-top .close {
  position: absolute;
  right: 15px;
  top: 6px;
  color: #ffffff;
  background-color: #c6c6c652;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  cursor: pointer;
}

._fc-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 20px;
}

._fc-top-copyright {
  display: flex;
}

._fc-top-link {
}

._fc-top a {
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  color: #aaa;
  text-decoration: none;
}

._fc-top a + a {
  margin-left: 20px;
}

._fc-t-header {
  height: 60px;
  margin: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: default;
}

._fc-t-logo {
  height: 26px;
}

._fc-t-name {
  display: inline-block;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
}

._fc-t-menu {
  position: absolute;
  right: 0;
}

._fc-t-menu i {
  font-size: 12px;
}

.handle {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

._fc-t-menu .el-dropdown,
.handle .el-dropdown {
  cursor: pointer;
}

.handle .el-icon {
  margin-left: 0;
}

body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex !important;
  flex-direction: column !important;
}

#app {
  display: flex;
  flex-direction: column;
  flex: 1;
}

._fc-copyright {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  border-top: 1px solid #ececec;
  background-color: #fff;
  cursor: pointer;
}

._fc-t-dialog .CodeMirror {
  height: 450px;
}

._fc-t-dialog .CodeMirror-line {
  line-height: 16px !important;
  font-size: 13px !important;
}

.CodeMirror-lint-tooltip {
  z-index: 2021 !important;
}

._fc-t-dialog .el-dialog__body {
  padding: 0px 20px;
}

._fc-b-item {
  display: flex;
}

._fc-zz {
  background-image: -webkit-linear-gradient(
    left,
    #cd7f32,
    #d81159 10%,
    #ffbc42 20%,
    #75d701 30%,
    #30a9de 40%,
    #d81159 60%,
    #ffbc42 70%,
    #75d701 80%,
    #30a9de 90%,
    #cd7f32
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 100%;
  -webkit-animation: flowlight 5s linear infinite;
  animation: flowlight 5s linear infinite;
  font-weight: 700;
}

@keyframes flowlight {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@-webkit-keyframes flowlight {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.pro-version {
  color: #cd7f32 !important;
  font-weight: 600;
}
</style>
