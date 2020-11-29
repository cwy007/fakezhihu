<template>
  <div class="ask-model">
    <el-input
      type="text"
      v-model="title"
      placeholder="写下你的问题，准确地描述问题更容易得到答案"
    />
    <rich-text-editor
      class="width-border m-t-10"
      ref="richtext"
      :content="description"
      :placeHolder="placeHolder"
      @updateContent="updateContent"
    />
    <div class="footer m-t-10">
      <el-button @click="$emit('change-ask-model-visible', false)">
        取消
      </el-button>
      <el-button type="primary" @click="releaseQuestion">确定</el-button>
    </div>
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor.vue";
import request from "../service";
import { getCookies } from "../lib/utils";
import _ from "lodash";

export default {
  props: ["oldItem"],
  components: {
    RichTextEditor
  },
  data() {
    return {
      title: "",
      description: "",
      excerpt: "",
      placeHolder: "请输入问题背景、条件等详细信息（选填）"
    };
  },
  mounted() {
    if (!_.isEmpty(this.oldItem)) {
      this.title = this.oldItem;
      this.description = this.oldItem.description;
      // 调用富文本组件中更新内容的方法
      this.$ref.richtext.updateContent(this.description);
    }
  },
  methods: {
    updateContent(content, contentText) {
      this.description = content;
      this.excerpt = contentText.slice(0, 100);
    },
    releaseQuestion() {
      if (!_.isEmpty(this.oldItem)) {
        this.updateQuestion();
      } else {
        this.createQuestion();
      }
    },
    async createQuestion() {
      await request
        .post("/questions", {
          title: this.title,
          excerpt: this.excerpt,
          description: this.description,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("问题创建成功");
            this.$emit("change-ask-model-visible", false);
          } else {
            this.$message.error("问题创建失败，请稍后再试");
          }
        });
    },
    async updateQuestion() {
      await request
        .put("/question", {
          questionId: this.oldItem.id,
          title: this.title,
          excerpt: this.excerpt,
          description: this.description,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$message.success("问题修改成功");
            this.$emit("change-ask-model-visible", false);
            this.$emit("update-question");
          } else {
            this.$message.error("问题修改失败，请稍后再试");
          }
        });
    }
  }
};
</script>

<style></style>
