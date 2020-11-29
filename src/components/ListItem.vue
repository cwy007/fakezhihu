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

    <div class="creater-info" v-if="showPart.indexOf('creator') >= 0">
      <div class="avatar">
        <img :src="item.author ? item.author.avatarUrl : ''" alt="" />
      </div>
      <div class="userinfo">
        <p class="username">{{ item.author.name }}</p>
        <p class="headline">{{ item.author.headline }}</p>
      </div>
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
      :thanks_count="JSON.parse(item.status.thanks).length"
      :comment_count="20"
      :voteup_count="JSON.parse(item.status.voteUp).length"
      :relationship="33"
      :showActionItems="[
        'vote',
        'thanks',
        'comment',
        'share',
        'favorite',
        'more'
      ]"
    />
  </div>
</template>

<script>
import ListItemActions from "./ListItemActions.vue";
export default {
  props: ["item", "showPart", "type"],
  inheritAttrs: false,
  components: { ListItemActions },
  data() {
    return {
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
    }
  }
};
</script>
