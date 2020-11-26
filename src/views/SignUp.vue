<template>
  <div class="signup">
    <div class="signup-wrapper">
      <sign-up-core />
      <el-button class="download" type="primary">下载Fake知乎App</el-button>
    </div>
    <footer class="signup-footer">
      <div class="ZhihuLinks">
        <a target="_blank" rel="noopener noreferrer" href="#">
          Fake知乎专栏
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          圆桌
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          发现
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          移动应用
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          联系我们
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          来Fake知乎工作
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          注册机构号
        </a>
      </div>
      <div class="ZhihuRights">
        <span>
          ©2019Fake知乎
        </span>
        <a target="_blank" rel="noopener noreferrer" href="#">
          京ICP 证 666666 号
        </a>
        <span
          >京公网安备 6666666666666 号
          <a href="#" target="_blank" rel="noopener noreferrer">
            出版物经营许可证
          </a>
        </span>
      </div>
      <div class="ZhihuReports">
        <a target="_blank" rel="noopener noreferrer" href="#">
          侵权举报
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          网上有害信息举报专区
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          儿童色情信息举报专区
        </a>
        <span>
          违法和不良信息举报：010-666666
        </span>
      </div>
      <div class="ZhihuIntegrity">
        <div>
          <a href="#">
            诚信网站示范企业
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import SignUpCore from "@/components/SignUpCore";

export default {
  components: {
    SignUpCore
  },
  data() {
    return {};
  }
};
</script>
