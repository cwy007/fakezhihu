<template>
  <div class="comment-list p-t-20" v-loading="loading">
    <p v-show="commentList.length === 0">当前没有评论</p>
    <p v-show="commentList.length !== 0">共{{ commentList.length }}条评论</p>
    <comment-item
      v-for="(comment, index) in commentList"
      :key="index"
      :item="comment"
      @get-comments="getComments"
      v-on="$listeners"
    />
    <div class="comment-part clearfix">
      <el-input class="comment-input" v-model="comment" />
      <el-button class="comment-btn" type="primary" @click="createComment">
        发布
      </el-button>
    </div>
  </div>
</template>

<script>
import request from "@/service";
import { getCookies } from "@/lib/utils";
import CommentItem from "@/components/CommentItem";

export default {
  props: ["targetId", "targetType", "watchCommentListUpdated"],
  data() {
    return {
      loading: false,
      comment: "",
      commentList: []
    };
  },
  watch: {
    watchCommentListUpdated: function() {
      // 重新获取次级评论
      this.getComments();
    }
  },
  components: { CommentItem },
  mounted() {
    this.getComments();
  },
  methods: {
    /**
     * 这个方法是获取一经评论的内容
     * 1. 问题的一级评论
     * 2. 答案的一级评论
     */
    async getComments() {
      this.loading = true;
      await request
        .get("/comments", {
          targetId: this.targetId,
          targetType: this.targetType
        })
        .then(res => {
          if (res.data.status === 200) {
            this.commentList = res.data.list;
            this.loading = false;
            this.comment = "";
          } else {
            this.$message.error(res.error);
          }
        });
    },
    async createComment() {
      console.log("createComment is called");
      await request
        .post("/comments", {
          targetId: this.targetId,
          targetType: this.targetType,
          content: this.comment,
          creatorId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("评论成功");
            this.getComments();
            this.comment = "";
            this.$emit("update-comment-count");
          }
        });
    }
  }
};
</script>
