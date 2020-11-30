<template>
  <div class="article-details clearfix" v-loading="loading">
    <el-button type="primary" round>
      <router-link :to="{ name: 'home' }"
        ><i class="el-icon-back"></i>返回文章列表
      </router-link>
    </el-button>
    <div class="article-wrapper">
      <div class="cover">
        <img :src="articleData.cover" alt="" />
      </div>
      <h1 class="title">{{ articleData.title }}</h1>
      <div class="author-info" v-if="articleData.author">
        <div class="avatar">
          <img :src="articleData.author.avatarUrl || ''" alt="" />
        </div>
        <div class="userinfo">
          <p class="username">{{ articleData.author.name }}</p>
          <p class="headline">{{ articleData.author.headline }}</p>
        </div>
      </div>
      <div class="content" v-html="articleData.content"></div>
    </div>

    <list-item-actions
      v-on="$listeners"
      v-if="articleData.status"
      :itemId="articleData.id"
      :thanks_count="JSON.parse(articleData.status.thanks).length"
      :comment_count="commentCount"
      @update-comment-count="updateCommentCount"
      :voteup_count="JSON.parse(articleData.status.voteUp).length"
      :relationship="33"
      :showActionItems="showActionItems"
      :type="0"
    />
  </div>
</template>

<script>
import request from "@/service";
import ListItemActions from "@/components/ListItemActions.vue";

export default {
  data() {
    return {
      showActionItems: [
        "vote",
        "thanks",
        "comment",
        "share",
        "favorite",
        "more"
      ],
      loading: true,
      articleData: {},
      commentCount: 0
    };
  },
  components: { ListItemActions },
  mounted() {
    this.getArticle();
  },
  methods: {
    async updateCommentCount() {
      console.log("update-comment-count is called");
      await request
        .get("/articles", {
          articleId: this.articleData.id
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
          articleId: this.$route.params.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.articleData = res.data.content;
            this.commentCount = res.data.content.comments
              ? res.data.content.comments.length
              : 0;
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
