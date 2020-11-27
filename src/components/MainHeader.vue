<template>
  <header class="main-header">
    <div class="header-content">
      <router-link class="m-r-20" :to="{ name: 'home' }">
        <img src="./../assets/imgs/logo.png" alt="" class="logo" />
      </router-link>
      <el-menu
        :default-active="activeIndex"
        class="m-r-20"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">发现</el-menu-item>
        <el-menu-item index="2">话题</el-menu-item>
      </el-menu>
      <el-input
        size="small"
        class="search m-r-10"
        placeholder="请输入内容"
        v-model="keywords"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button size="small" type="primary">提问</el-button>

      <div class="userInfo" v-if="!isLogin">
        <router-link :to="{ name: 'signup' }">登录</router-link>
      </div>
      <div class="userInfo" v-if="isLogin">
        <i class="el-icon-bell m-r-40 icon-item"></i>
        <i class="el-icon-message m-r-40 icon-item"></i>
        <el-dropdown placeholder="bottom" trigger="click" class="hand-click">
          <span>
            {{ this.name }}
            <img src="./../assets/imgs/avatar.jpg" alt="" class="avatar" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="goToPersonalPage">
                <span class="el el-icon-fakezhihu-person"></span>
                我的主页
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i class="el-icon-setting">设置</i>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div @click="logout">
                <span class="el el-icon-fakezhihu-poweroff"></span>
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import request from "@/service";

export default {
  data() {
    return {
      activeIndex: "1",
      keywords: "",
      isLogin: false,
      name: ""
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      await request.get("/users/checkLogin").then(res => {
        if (res.status === 200) {
          this.name = res.data.name;
          this.isLogin = true;
        } else {
          this.$router.push({ name: "signup" });
          this.isLogin = false;
        }
      });
    },
    async logout() {
      await request.post("/users/logout").then(res => {
        if (res.status === 200) {
          this.$message.success("注销成功");
          this.name = "";
          this.$router.push({ name: "signup" });
        } else {
          this.$message.error("注销失败，请稍后再试");
        }
      });
    },
    handleSelect(key) {
      console.log(key);
    },
    goToPersonalPage() {
      console.log("跳转到用户首页");
    }
  }
};
</script>
