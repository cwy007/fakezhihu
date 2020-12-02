<template>
  <div class="answer-main">
    <div class="title" v-if="showPart.indexOf('title') >= 0">
      <h2>
        <router-link
          :to="{
            name: type === 0 ? 'detailsArticle' : 'detailsQuestion',
            params: { id: item.id }
          }"
        >
          {{ transtedInfo.title }}
        </router-link>
      </h2>
    </div>

    <div class="author-info clearfix" v-if="showPart.indexOf('creator') >= 0">
      <router-link
        :to="{
          name: 'peopleMain',
          params: { id: item.author ? item.author.id : 0 }
        }"
      >
        <img :src="item.author ? item.author.avatarUrl : ''" alt="" />
        <div class="userinfo">
          <p class="username">{{ item.author ? item.author.name : "" }}</p>
          <p class="headline">{{ item.author ? item.author.headline : "" }}</p>
        </div>
      </router-link>
    </div>

    <div class="vote" v-if="showPart.indexOf('votes') >= 0">
      <span>{{ JSON.parse(item.status.voteUp).length }} 人赞同了该回答</span>
    </div>

    <div class="content-wrapper clearfix">
      <div class="shortCut" v-if="showType === 'excerpt'">
        <div class="cover" v-if="transtedInfo.cover">
          <img :src="transtedInfo.cover" alt="" />
        </div>
        <div class="excerpt">
          <span>
            <span v-html="item.excerpt"></span>
            <el-button
              class="btn-no-padding"
              type="text"
              icon="el-icon-arrow-down"
              @click="showType = 'all'"
            >
              阅读全文
            </el-button>
          </span>
        </div>
      </div>

      <div class="content" v-if="showType === 'all'">
        <router-link
          v-if="!showPart.includes('creator')"
          class="minicreator-info clearfix"
          :to="{
            name: 'people',
            params: { id: item.author ? item.author.id : 0 }
          }"
        >
          <img class="avatar" :src="item.author ? item.author.avatarUrl : ''" />
          <p class="username">{{ item.author ? item.author.name : "" }}</p>
        </router-link>
        <span v-html="item.content"></span>
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

    <list-item-actions
      v-bind="$attrs"
      v-on="$listeners"
      :type="type"
      :itemId="item.id"
      :status="item.status"
      :thanks_count="JSON.parse(item.status.thanks).length"
      :comment_count="commentCount"
      @update-comment-count="updateCommentCount"
      :voteup_count="JSON.parse(item.status.voteUp).length"
      :relationship="33"
      :commentShowType="showType"
      :showActionItems="showActionItems"
    />
  </div>
</template>

<script>
import ListItemActions from "./ListItemActions.vue";
import request from "@/service";

export default {
  props: ["item", "showPart", "type"],
  inheritAttrs: false,
  components: { ListItemActions },
  data() {
    return {
      commentCount: this.item.comments ? this.item.comments.length : 0,
      showType: "excerpt"
    };
  },
  computed: {
    transtedInfo() {
      // article
      if (this.type === 0) {
        return {
          title: this.showPart.includes("title") ? this.item.title : "",
          cover: this.item.cover || ""
        };
        // answer
      } else if (this.type === 2 && this.showPart.includes("title")) {
        return {
          title: this.item.question.title,
          cover: this.item.thumbnail || ""
        };
      }
      return {
        title: "",
        cover: ""
      };
    },
    showActionItems() {
      if (
        this.$route.name === "peopleArticles" ||
        this.$route.name === "peopleMain"
      ) {
        return ["vote", "thanks", "comment", "share", "favorite", "setting"];
      }
      return ["vote", "thanks", "comment", "share", "favorite", "more"];
    }
  },
  methods: {
    async updateCommentCount() {
      console.log("update-comment-count is called");
      await request
        .get("/articles", {
          articleId: this.item.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.commentCount = res.data.content.comments
              ? res.data.content.comments.length
              : 0;
          } else {
            this.$message.error("获取文章失败，请稍后再试");
          }
        });
    },
    async getArticle() {
      await request
        .get("/articles", {
          articleId: this.item.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.loading = false;
          } else {
            this.$message.error("获取文章失败，请稍后再试");
            this.$router.go(-1);
          }
        });
    }
  }
};
</script>
