<template>
  <div class="comment-list p-t-20" v-loading="loading">
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

export default {
  props: ["targetId", "targetType"],
  data() {
    return {
      loading: false,
      comment: ""
    };
  },
  methods: {
    async createComment() {
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
          }
        });
    }
  }
};
</script>
