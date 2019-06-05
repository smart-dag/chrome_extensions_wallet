<template>
  <div class="profile">
    <van-nav-bar :fixed="true" title="我的" left-text="返回" left-arrow @click-left="gohome"/>
    <div class="profile card shadow">
      <img class="face" src="../assets/face.jpg" width="160">
      <p>此人尚未设置昵称</p>
      <p>1关注 0粉丝 0发布 5喜欢</p>
    </div>
    <div class="card">
      <p>必备工具</p>
      <table>
        <tr>
          <td>
            <img height="50" src="../assets/jsq.png">
            <br>计算器
          </td>
          <td>
            <img height="50" src="../assets/yhq.png">
            <br>优惠券
          </td>
          <td>
            <img height="50" src="../assets/lpk.png">
            <br>礼品卡
          </td>
          <td>
            <img height="50" src="../assets/bi.png">
            <br>点读笔
          </td>
        </tr>
      </table>
    </div>
    <tabbar :active="2"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from "@/components/Tabbar.vue";
export default {
  name: "profile",
  components: {
    Tabbar
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/",
        name: "home"
      });
    }
  }
};
</script>

<style scoped>
.profile {
  margin-top: 50px;
  margin-bottom: 150px;
}
table {
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.myhomeicons {
  text-align: right;
  width: 100%;
  height: 80px;
  margin-top: 20px;
}
.myhomeicons .md-icon {
  margin: 10px;
}
.card {
  width: 80%;
  margin: 0 auto;
  background: #e0e2e8;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 40px;
}
.shadow {
  box-shadow: 0px 0px 10px #999;
}
.face {
  border: solid 4px #ccc;
  border-radius: 100%;
}
</style>
