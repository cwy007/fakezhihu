<template>
  <div>
    <main-list-nav :type="type" />

    <el-card>
      <div class="card-content">
        <!-- <router-view></router-view> -->
        <router-view
          v-for="(item, index) in fakeInfo"
          :key="index"
          :item="item"
          :index="index"
          :type="item.type"
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
  beforeMounted() {
    this.fakeInfo = []; // 解决 home 和 hot 按钮之间切换时，由于数据结构不一致导致的报错
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.fakeInfo = [];
      if (this.$route.name === "home") {
        this.getNormalList();
        this.loading = false;
      } else if (this.$route.name === "hot") {
        this.getHotList();
        this.loading = false;
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
    },
    async getHotList() {
      await request
        .get("/hot-list-web", {
          limit: 50,
          desktop: true
        })
        .then(res => {
          if (res.status === 200) {
            this.fakeInfo = [];
            this.fakeInfo = res.data.data;
          }
        });
    }
  }
};
</script>
