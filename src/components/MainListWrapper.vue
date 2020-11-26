<template>
  <div>
    <main-list-nav :type="type" />

    <el-card>
      <div class="card-content">
        <router-view
          v-for="(item, index) in fakeInfo"
          :key="index"
          :item="item"
          :index="index"
          :type="'item.type'"
          :showPart="['title']"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import MainListNav from "./MainListNav.vue";
import mockData from "../../mock/target";

export default {
  components: { MainListNav },
  data() {
    return {
      type: "main",
      fakeInfo: mockData
    };
  }
};
</script>
