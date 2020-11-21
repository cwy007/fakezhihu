<template>
  <div class="item">
    <p>
      <span v-show="!isActive" v-on:click="activeItem">{{ item }}</span>
      <span v-show="isActive">
        <input v-model="content" v-on:blur="inactiveItem" type="text" />
      </span>
      <span v-on:click="$emit('delete-item', index)">X</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: ["item", "index"],
  data() {
    return {
      content: "",
      isActive: false
    };
  },
  methods: {
    activeItem() {
      this.isActive = true;
      this.content = this.item;
    },
    inactiveItem() {
      this.$emit("modify-item", this.content, this.index);
      this.isActive = false;
    }
  }
};
</script>

<style></style>
