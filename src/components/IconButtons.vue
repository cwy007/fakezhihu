<template>
  <div class="wrapper">
    <div class="icon-item normal-btn" v-if="exists.indexOf('question') >= 0">
      <i class="el-icon-tickets big-icon"></i>
      <p>写回答</p>
    </div>
    <div class="icon-item normal-btn" v-if="exists.indexOf('article') >= 0">
      <router-link :to="{ name: 'editor', params: { articleId: 0 } }">
        <i class="el-icon-edit-outline big-icon"></i>
        <p>写文章</p>
      </router-link>
    </div>
    <div class="icon-item normal-btn" v-if="exists.indexOf('thinking') >= 0">
      <span class="el el-icon-fakezhihu-thinking big-icon"></span>
      <p>写想法</p>
    </div>
    <div class="icon-item thunder-btn" v-if="exists.indexOf('live') >= 0">
      <span class="el el-icon-fakezhihu-thunder big-icon"></span>
      <p>Live</p>
    </div>
    <div class="icon-item book-btn" v-if="exists.indexOf('book') >= 0">
      <span class="el el-icon-fakezhihu-book big-icon"></span>
      <p>书店</p>
    </div>
    <div class="icon-item desk-btn" v-if="exists.indexOf('desk') >= 0">
      <span class="el el-icon-fakezhihu-desk big-icon"></span>
      <p>圆桌</p>
    </div>
    <div class="icon-item pen-btn" v-if="exists.indexOf('expert') >= 0">
      <span class="el el-icon-fakezhihu-pen big-icon"></span>
      <p>专栏</p>
    </div>
    <div class="icon-item money-btn" v-if="exists.indexOf('consult') >= 0">
      <span class="el el-icon-fakezhihu-money big-icon"></span>
      <p>付费咨询</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconButtons",
  props: ["exists"]
};
</script>
