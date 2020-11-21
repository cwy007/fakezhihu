<template>
  <div class="hello">
    <input type="text" v-model="words" />
    <h3>{{ words }}</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      words: "hello world"
    };
  }
};
</script>
