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
        <el-card class="achievement">
          <div class="list-header">
            <span>个人成就</span>
          </div>
          <div class="list-item">
            <div class="title">
              <p>
                <span
                  class="el el-icon-fakezhihu-like middle-icon side-padding"
                ></span>
                获得8644次赞同
              </p>
            </div>
            <p class="info">获得2,733次感谢，21,791次收藏</p>
          </div>
          <div class="list-item">
            <div class="title">
              <p>
                <span
                  class="el el-icon-fakezhihu-edit-together middle-icon side-padding"
                ></span>
                参与6次公共编辑
              </p>
            </div>
          </div>
        </el-card>
        <el-card class="followship">
          <div class="numberBoard">
            <div class="item">
              <p class="text">关注了</p>
              <strong class="num">43</strong>
            </div>
            <div class="item">
              <p class="text">关注者</p>
              <strong class="num">433</strong>
            </div>
          </div>
        </el-card>
        <el-card class="no-padding m-b-15">
          <div class="nav-link">
            <a href="#">
              <span class="text">
                赞助的Live
                <span class="el el-icon-fakezhihu-Thunder"></span>
              </span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的话题
              </span>
              <span class="num">320</span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的专栏
              </span>
              <span class="num">21</span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的问题
              </span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的收藏夹
              </span>
            </a>
          </div>
        </el-card>
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
