<template>
  <div class="people" v-loading="userLoading">
    <el-card class="profile">
      <div class="profile-header-cover">
        <img
          src="https://pic1.zhimg.com/80/v2-a15344fdf6d4824656f47a4bc1c8e29d_r.jpg"
          alt=""
        />
      </div>
      <div class="profile-header-wrapper">
        <img :src="userInfo.avatarUrl" alt="" />
        <div class="content">
          <p class="username">{{ userInfo.name }}</p>
          <div class="content-header" v-show="!userInfoEditorShow">
            <p class="introduce">{{ userInfo.headline }}</p>
          </div>
          <div class="sex" v-if="!detailsShow">
            <span class="el el-icon-fakezhihu-sexm middle-icon"></span>
          </div>
          <div class="details" v-if="detailsShow">
            个人具体信息静态展示
          </div>
          <el-button
            class="btn-text-gray"
            icon="el-icon-arrow-down"
            type="text"
            v-if="!detailsShow"
            @click="detailsShow = true"
          >
            查看详细资料
          </el-button>
          <el-button
            class="btn-text-gray"
            icon="el-icon-arrow-up"
            type="text"
            v-if="detailsShow"
            @click="detailsShow = false"
          >
            收起详细资料
          </el-button>
          <div class="btn-group" v-show="!activeUser">
            <div class="notActiveUser">
              主页用户非当前登录用户展示静态内容
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="profile-main">
      <div class="profile-content">
        列表主要内容（稍后开发）
      </div>
      <div class="profile-sidebar">
        个人相关信息静态展示．.
        <sidebar-footer />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarFooter from "../components/SidebarFooter.vue";
import request from "@/service";
import { getCookies } from "@/lib/utils";

export default {
  components: { SidebarFooter },
  data() {
    return {
      userInfo: {},
      userLoading: false,
      detailsShow: false,
      userInfoEditorShow: false
    };
  },
  computed: {
    activeUser() {
      return this.userInfo.id === parseFloat(getCookies("id"));
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      this.userLoading = true;
      await request
        .get("/users", {
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 200) {
            this.userInfo = res.data.content;
            this.userLoading = false;
          } else {
            this.$message.error("获取用户信息失败，请稍后再试");
            this.$router.push({ name: "home" });
          }
        });
    }
  }
};
</script>
