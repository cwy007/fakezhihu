<template>
  <div>
    <div class="actions">
      <el-button
        v-if="showActionItems.indexOf('hot') >= 0"
        class="btn-text-gray"
        size="medium"
        type="text"
      >
        <span class="el el-icon-fakezhihu-fire"></span>
        {{ metrics_area.text }}
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        :plain="JSON.parse(activeStatus.voteUp).indexOf(userId) < 0"
        icon="el-icon-caret-top"
        @click="updateStatus('voteUp')"
      >
        赞同 {{ JSON.parse(activeStatus.voteUp).length }}
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        :plain="JSON.parse(activeStatus.voteDown).indexOf(userId) < 0"
        icon="el-icon-caret-bottom"
        @click="updateStatus('voteDown')"
      ></el-button>
      <el-button
        v-if="showActionItems.indexOf('comment') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        @click="displayComments"
      >
        <span class="el el-icon-fakezhihu-comment"></span>评论
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('comment') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
      >
        <span class="el-el-icon-fakezhihu-comment"></span>
        {{ comment_count }} 条评论
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('share') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-share"
      >
        分享
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('favorite') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-star-on"
      >
        收藏
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('thanks') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        @click="updateStatus('thanks')"
      >
        <span class="el el-icon-fakezhihu-heart"></span>
        {{ thanksCountText }}
      </el-button>
      <el-dropdown
        v-if="showActionItems.indexOf('more') >= 0"
        placement="bottom"
        class="m-l-25"
      >
        <el-button
          class="btn-text-gray"
          size="medium"
          type="text"
          icon="el-icon-more"
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>没有帮助</el-dropdown-item>
          <el-dropdown-item>举报</el-dropdown-item>
          <el-dropdown-item>申请授权</el-dropdown-item>
          <el-dropdown-item>不感兴趣</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        v-if="showActionItems.includes('setting') && activeUser"
        placement="bottom"
        class="m-l-25"
      >
        <el-button
          class="btn-text-gray"
          size="medium"
          type="text"
          icon="el-icon-setting"
        >
          设置
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="deleteContent"
            >删除</el-dropdown-item
          >
          <el-dropdown-item @click.native="editContent">编辑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-card class="comment" v-if="commentListShow">
      <comment-list v-on="$listeners" :targetId="itemId" :targetType="type" />
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
    <el-dialog
      class="no-title-dialog"
      title=""
      :visible.sync="commentDialogShow"
      :modal-append-to-body="false"
    >
      <comment-list v-on="$listeners" :targetId="itemId" :targetType="type" />
    </el-dialog>
  </div>
</template>

<script>
import { getCookies } from "../lib/utils";
import _ from "lodash";
import request from "../service";

export default {
  props: [
    "comment_count",
    "thanks_count",
    "voteup_count",
    "metrics_area",
    "showActionItems",
    "commentShowType", // 不传递时，点击评论按钮默认显示弹窗dialog形式的评论
    "type",
    "itemId",
    "status",
    "activeUser"
  ],
  inheritAttrs: false,
  data() {
    return {
      commentListShow: false, // 评论列表
      commentDialogShow: false, // 评论弹窗
      updatedStatus: {},
      userId: 0
    };
  },
  computed: {
    thanksCountText() {
      if (_.isEmpty(this.activeStatus)) {
        return "0个感谢";
      }
      return JSON.parse(this.activeStatus.thanks).indexOf(this.userId) < 0
        ? `${JSON.parse(this.activeStatus.thanks).length} 个感谢`
        : "取消感谢";
      // try {
      // } catch (error) {
      //   console.log("出错了");
      //   return "感谢";
      // }
    },
    activeStatus() {
      return _.isEmpty(this.updatedStatus) ? this.status : this.updatedStatus;
    }
  },
  mounted() {
    this.userId = parseFloat(getCookies("id"));
  },
  methods: {
    displayComments() {
      if (this.commentShowType === "excerpt") {
        this.commentListShow = true;
      } else {
        this.commentDialogShow = true;
      }
    },
    async updateStatus(colName) {
      await request
        .put("/status", {
          statusId: this.status.id,
          colName,
          operation: this.getOperation(colName),
          value: this.userId
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("修改成功");
            this.updatedStatus = res.data.content;
          }
        });
    },
    getOperation(colName) {
      switch (colName) {
        case "voteUp":
          return JSON.parse(this.activeStatus.voteUp).indexOf(this.userId) < 0
            ? "add"
            : "pull";
        case "voteDown":
          return JSON.parse(this.activeStatus.voteDown).indexOf(this.userId) < 0
            ? "add"
            : "pull";
        case "thanks":
          return JSON.parse(this.activeStatus.thanks).indexOf(this.userId) < 0
            ? "add"
            : "pull";
      }
    },
    editContent() {
      if (this.type === 0) {
        this.$router.push({
          name: "editor",
          params: { articleId: this.itemId }
        });
      }
      if (this.type === 2) {
        // article:0, question:1, answer:2, comment:3
        this.$emit("editor-show-fuc", this.itemId);
      }
    },
    deleteContent() {
      if (this.type === 0) {
        this.deleteArticles();
      }
      if (this.type === 2) {
        this.deleteAnswers();
      }
    },
    async deleteAnswers() {
      await request
        .delete("/answers", {
          data: { userId: this.userId, answerId: this.itemId }
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$message.success("删除成功");
            this.$emit("get-list");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    async deleteArticles() {
      await request
        .delete("/articles", {
          data: { creatorId: getCookies("id"), articleId: this.itemId }
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$message.success("删除成功");
            this.$emit("get-list");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  }
};
</script>
