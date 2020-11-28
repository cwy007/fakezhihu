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
import request from "../service";

export default {
  components: { MainListNav },
  data() {
    return {
      type: "main",
      fakeInfo: [],
      loading: false
    };
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      if (this.$route.name === "home") {
        this.getNormalList();
        this.loading = false;
      } else if (this.$route.name === "hot") {
        console.log("route name is hot");
      } else {
        this.getNormalList();
        this.loading = false;
      }
    },
    async getNormalList() {
      await request.get("/articles/list").then(res => {
        if (res.data.status === 200) {
          this.fakeInfo = res.data.list;
        }
      });
    }
  }
};
</script>
