<template>
  <div class="question-details" v-loading="loading">
    <div class="question-header">
      <el-dialog
        title="修改问题"
        :visible.sync="askModelVisible"
        :modal-append-to-body="false"
      >
        <!-- 事件使用连字符连接的形式 -->
        <ask-model
          @change-ask-model-visible="changeAskModelVisible"
          @update-question="getQuestion"
          :oldItem="questionData"
        />
      </el-dialog>
      <div class="question-header-content">
        <div class="question-header-main">
          <h1 class="question-header-title">
            {{ questionData.title }}
            <el-button
              type="text"
              class="m-l-25 gray"
              @click="askModelVisible = true"
            >
              <i class="el-icon-edit el-icon--left"></i>
              编辑
            </el-button>
          </h1>
          <div
            class="question-header-details"
            v-show="showType === 'excerpt'"
            v-if="questionData.excerpt"
          >
            <span>{{ questionData.excerpt }}</span>
            <el-button
              class="btn-no-padding m-l-10"
              type="text"
              icon="el-icon-arrow-down"
              @click="showType = 'all'"
            >
              阅读全文
            </el-button>
          </div>
          <div
            class="question-header-details"
            v-show="showType === 'all'"
            v-if="questionData.excerpt"
          >
            <div v-html="questionData.description"></div>
            <el-button
              class="btn-no-padding"
              type="text"
              icon="el-icon-arrow-up"
              @click="showType = 'excerpt'"
            >
              收起
            </el-button>
          </div>
        </div>
        <!-- question-header-main -->
        静态展示部分
      </div>
      <div class="question-header-footer">
        <div class="question-header-footer-inner">
          <div class="question-header-footer-main">
            <div class="question-header-btnGroup">
              <el-button type="primary">关注问题</el-button>
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                @click="showAnswerPart"
                :disabled="!currentAnswerEmpty"
              >
                写回答
              </el-button>
            </div>
            <div class="question-header-actions">
              <el-button class="button" type="info" plain>
                <span class="el el-icon-fakezhihu-and-person-fill"></span>
                邀请回答
              </el-button>
              <list-item-actions
                class="actions"
                :itemId="questionData.id"
                :type="1"
                :showActionItems="['comment', 'share', 'more']"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="question-main">
      <div class="question-main-clo">
        <el-card
          class="m-b-15"
          v-loading="authorLoading"
          v-show="answerVisible"
        >
          <div class="author-info m-t-25">
            <div class="avatar">
              <img :src="authorInfo.avatarUrl || ''" alt="" />
            </div>
          </div>
          <div class="userinfo">
            <p class="username">{{ authorInfo.name }}</p>
            <p class="headline">{{ authorInfo.headline }}</p>
          </div>
          <rich-text-editor
            class="with-border m-t-25 m-b-25"
            ref="richtext"
            :content="answerContent"
            :placeholder="placeHolder"
            @update-content="updateContent"
          />
          <div class="m-b-25">
            <el-button type="default" @click="answerVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="createAnswer">提交回答</el-button>
          </div>
        </el-card>
        回答展示
      </div>

      <div class="question-main-sidebar">
        静态侧边栏展示内容
        <sidebar-footer />
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/service";
import { getCookies } from "@/lib/utils";
import AskModel from "../components/AskModel.vue";
import ListItemActions from "../components/ListItemActions.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import SidebarFooter from "../components/SidebarFooter.vue";
import _ from "lodash";

export default {
  components: { AskModel, ListItemActions, RichTextEditor, SidebarFooter },
  data() {
    return {
      loading: true,
      askModelVisible: false,
      questionData: {},
      authorLoading: false,
      answerVisible: false,
      commentShowType: "all",
      showType: "excerpt",
      answerContent: "",
      answerExcerpt: "",
      placeHolder: "写回答",
      authorInfo: {},
      currentAnswer: {}
    };
  },
  mounted() {
    this.getQuestion();
  },
  computed: {
    currentAnswerEmpty() {
      return _.isEmpty(this.currentAnswer);
    }
  },
  methods: {
    changeAskModelVisible(status) {
      this.askModelVisible = status;
    },
    async getQuestion() {
      this.loading = true;
      await request
        .get("/questions", {
          questionId: this.$route.params.id
        })
        .then(res => {
          this.questionData = res.data.content;
          this.loading = false;
        });
    },
    async getAuthorInfo() {
      this.authorLoading = true;
      await request
        .get("/users", {
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 200) {
            this.authorInfo = res.data.content;
            this.authorLoading = false;
          }
        });
    },
    async createAnswer() {
      this.authorLoading = true;
      await request
        .post("/answer", {
          creatorId: getCookies("id"),
          content: this.answerContent,
          excerpt: this.answerExcerpt,
          targetId: this.questionData.id
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$message.success("回答成功");
            this.authorLoading = false;
            this.answerVisible = false;
            this.getQuestion();
          } else {
            this.$message.error("回答失败，请稍后再试");
          }
        });
    },
    updateContent(content, contentText) {
      this.answerContent = content;
      this.answerExcerpt = contentText.slice(0, 100);
    },
    showAnswerPart() {
      this.answerVisible = true;
      this.getAuthorInfo;
    }
  }
};
</script>

<style></style>
