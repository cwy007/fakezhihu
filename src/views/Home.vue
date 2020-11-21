<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";
import "@/assets/style.css";

export default {
  name: "Home",
  components: {
    TodoList
  }
};
</script>

<style lang="css">
.home {
  margin: 0 auto;
  text-align: center;
  font-size: 12.077rpx;
}
</style>
