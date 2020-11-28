<template>
  <div class="editor">
    <editor-header @release-articles="releaseArticles" />
    <div class="content m-t-50">
      <el-upload
        v-show="imgUrl === ''"
        class="img-upload m-b-15"
        drag
        action="/imgs/upload"
        :on-success="uploadSuc"
        accept=".jpg, .jpeg, .JPG, .png, .PNG"
      >
        <i class="el-icon-upload"></i>
        <div ref="hiddenUpload">添加题图</div>
      </el-upload>
      <img
        v-show="imgUrl !== ''"
        class="oldImg m-b-15"
        :src="imgUrl"
        @click="$refs.hiddenUpload.click()"
      />

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
import { imgDec } from "@/lib/config.js";

export default {
  components: { EditorHeader, RichTextEditor },
  data() {
    return {
      title: "", // 标题
      content: "", // 富文本
      contentText: "", // 纯文本
      placeHolder: "请输入正文",
      imgUrl: "" // 题图url
    };
  },
  methods: {
    uploadSuc(response) {
      this.imgUrl = `${imgDec}${response.fileName}`;
    },
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
          excerpt: this.contentText.slice(0, 100),
          title: this.title,
          imgUrl: this.imgUrl,
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
