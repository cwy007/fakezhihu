<template>
  <div class="home">
    <main-header />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "home",
  components: {
    MainHeader
  }
};
</script>

<style lang="css"></style>
