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
      v-if="articleData.status"
      :itemId="articleData.id"
      :thanks_count="JSON.parse(articleData.status.thanks).length"
      :comment_count="articleData.comment ? articleData.comment.length : 0"
      :voteup_count="JSON.parse(articleData.status.voteUp).length"
      :relationship="33"
      :showActionItems="showActionItems"
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
      articleData: {}
    };
  },
  components: { ListItemActions },
  mounted() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      await request
        .get("/articles", {
          articleId: this.$route.params.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.articleData = res.data.content;
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
