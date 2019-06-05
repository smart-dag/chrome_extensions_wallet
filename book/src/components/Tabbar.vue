<template>
  <div class="tabbar">
    <van-tabbar v-model="index" :route="true">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/shopcar" icon="shop">购物车</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabber",
  components: {},
  props: {
    active: 0
  },
  data() {
    return {
      index: 0
    };
  },
  created() {
    this.index = this.active;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
