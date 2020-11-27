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
        @updateContent="updateContent"
      />
    </div>
  </div>
</template>

<script>
import EditorHeader from "../components/EditorHeader.vue";
import RichTextEditor from "../components/RichTextEditor.vue";

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
      console.log("发布文章");
    }
  }
};
</script>

<style></style>
