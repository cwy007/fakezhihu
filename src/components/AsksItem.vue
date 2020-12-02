<template>
  <div class="asks">
    <h2 class="question-title">
      <router-link :to="{ name: 'detailsQuestion', params: { id: item.id } }">
        {{ item.title }}
      </router-link>
    </h2>
    <span class="question-info">
      {{ item.updatedAt | dateFilter }}&nbsp;•&nbsp;
      {{ item.answers ? item.answers.length : 0 }}个回答&nbsp;•&nbsp;
      {{ item.comments ? item.comments.length : 0 }}条评论
    </span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["item"],
  filters: {
    dateFilter: date => {
      moment.locale("zh-cn");
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>

<style></style>
