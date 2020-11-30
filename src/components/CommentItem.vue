<template>
  <div class="comment-item">
    <div class="header clearfix">
      <div class="user-info">
        <span class="avatar">
          <img :src="item.author.avatarUrl" alt="" />
        </span>
        <span class="username">{{ item.author.name }}</span>
      </div>
      <span class="content">{{ item.content }}</span>
    </div>
    <div>
      <!-- v-bind="$attrs" 跨组件获取数据 -->
      <!-- v-on="$listeners" 跨组件调用方法 -->
      <comment-item-actions :item="item" v-bind="$attrs" v-on="$listeners" />
    </div>
    <hr class="hr m-b-15" color="#dcdfe6" size="1" />
  </div>
</template>

<script>
// import CommentItemActions from "@/components/CommentItemActions";
import moment from "moment";
import CommentItemActions from "./CommentItemActions.vue";

export default {
  components: { CommentItemActions },
  props: ["item"],
  filters: {
    dateFilter: date => {
      moment.locale("zh-cn");
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
