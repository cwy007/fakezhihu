<template>
  <div>
    <div class="comment-actions">
      <el-button class="btn-text-gray" size="medium" type="text">
        {{ /* activeStatus 为跨组件 v-bind="$attrs" 获取的属性 */ }}
        <span class="el el-icon-fakezhihu-like"></span>
        {{ JSON.parse(activeStatus.voteUp).length }}
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        @click="replyShow = true"
        v-show="!replyShow"
        v-if="!deleteShow"
      >
        <span class="el el-icon-fakezhihu-reply"></span>回复
      </el-button>
      <el-button
        class="btn-text-gray"
        size="medium"
        type="text"
        @click="replyShow = false"
        v-show="replyShow"
        v-if="!deleteShow"
      >
        <span class="el el-icon-fakezhihu-reply"></span>取消回复
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="deleteShow"
        @click="deleteComment"
      >
        <i class="el-icon-delete"></i>删除
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="item.subComments.length !== 0"
        @click="commentListShow = true"
      >
        <span class="el el-icon-fakezhihu-Chat"></span>查看回复
      </el-button>
      <el-button class="btn-text-gray hover-hidden" size="medium" type="text">
        {{ JSON.parse(activeStatus.voteDown).length }}
        <span class="el el-icon-fakezhihu-dislike"></span>踩
      </el-button>
      <el-button class="btn-text-gray hover-hidden" size="medium" type="text">
        <span class="el el-icon-fakezhihu-flug"></span>举报
      </el-button>
    </div>
    <el-card class="comment m-b-15" v-if="commentListShow">
      <comment-list
        :targetId="item.id"
        :targetType="item.type"
        :watchCommentListUpdated="watchCommentListUpdated"
      />
      <hr class="hr m-b-15 m-t-15" color="#dcdfe6" size="1" />
      <el-button
        class="block-center m-b-15"
        type="info"
        size="mini"
        plain
        @click="commentListShow = false"
      >
        收起评论
      </el-button>
    </el-card>
    <div class="reply" v-show="replyShow">
      <el-input class="input" type="text" v-model="replyContent" size="small" />
      <el-button
        type="primary"
        size="small"
        class="m-l-25"
        @click="createComment"
      >
        发布
      </el-button>
    </div>
  </div>
</template>

<script>
import { getCookies } from "@/lib/utils";
import request from "@/service";
import _ from "lodash";

export default {
  props: ["item"],
  data() {
    return {
      replyShow: false, // 回复部分展示与隐藏
      replyContent: "",
      updatedStatus: {},
      commentListShow: false, // 次级评论
      watchCommentListUpdated: false
    };
  },
  computed: {
    // 评论为当前登录用户时，显示删除按钮
    deleteShow() {
      return this.item.author
        ? this.item.author.id === parseFloat(getCookies("id"))
        : false;
    },
    activeStatus() {
      return _.isEmpty(this.updatedStatus)
        ? this.item.status
        : this.updatedStatus;
    }
  },
  methods: {
    async createComment() {
      console.log("this.item", this.item);
      await request
        .post("/comments", {
          targetId: this.item.id,
          targetType: this.item.type, // 当前类型
          content: this.replyContent,
          creatorId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("评论成功");
            if (this.item.type === 3 && this.commentListShow) {
              this.watchCommentListUpdated = !this.watchCommentListUpdated;
            } else {
              this.$emit("get-comments");
            }
            this.replyContent = "";
          }
        });
    },
    async deleteComment() {
      await request
        .delete("/comments", {
          data: {
            id: this.item.id,
            creatorId: getCookies("id")
          }
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$message.success("删除成功");
            this.$emit("get-comments");
            this.$emit("update-comment-count"); // 删除评论时，更新文章下面的评论数
          }
        });
    }
  }
};
</script>
