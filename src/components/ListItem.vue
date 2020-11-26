<template>
  <div class="answer-main">
    <div class="title" v-if="showPart.indexOf('title') >= 0">
      <h2>{{ transtedInfo.title }}</h2>
    </div>

    <div class="creater-info" v-if="showPart.indexOf('creator') >= 0">
      <div class="avatar">
        <img :src="item.author.avatarUrl" alt="" />
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
              icon="el-iconarrow-down"
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
  </div>
</template>

<script>
export default {
  props: ["item", "showPart", "type"],
  data() {
    return {
      showType: "excerpt"
    };
  },
  computed: {
    transtedInfo() {
      if (this.type === "article") {
        return {
          title: this.item.title,
          cover: this.item.image_url || ""
        };
      } else if (this.type === "answer") {
        return {
          title: this.item.question.title,
          cover: this.item.thumbnail || ""
        };
      } else {
        return {
          title: "",
          cover: ""
        };
      }
    }
  }
};
</script>
