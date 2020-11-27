<template>
  <div class="editor">
    <editor-header @release-articles="releaseArticles" />
    <div class="content m-t-50">
      <el-input
        v-model="title"
        class="m-b-15"
        size="medium"
        placeholder="请输入标题（最多50个字）"
      />
      <rich-text-editor
        ref="textEditor"
        :content="content"
        :placeHolder="placeHolder"
        @update-content="updateContent"
      />
    </div>
  </div>
</template>

<script>
import EditorHeader from "../components/EditorHeader.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import request from "@/service";
import { getCookies } from "@/lib/utils";

export default {
  components: { EditorHeader, RichTextEditor },
  data() {
    return {
      title: "",
      content: "",
      contentText: "",
      placeHolder: "亲输入正文"
    };
  },
  methods: {
    updateContent(content, contentText) {
      this.content = content;
      this.contentText = contentText;
    },
    releaseArticles() {
      if (parseFloat(this.$route.params.articleId) !== 0) {
        console.log("修改文章");
      } else {
        this.createArticle();
      }
    },
    async createArticle() {
      await request
        .post("/articles", {
          content: this.content,
          excerpt:
            this.contentText.length > 100
              ? this.contentText.slice(0, 100)
              : this.contentText,
          title: this.title,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("文章新建成功！");
          } else {
            this.$message.error(res.error);
          }
        });
    }
  }
};
</script>

<style></style>
