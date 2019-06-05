<template>
  <div class="search">
    <table>
      <tr>
        <td>
          <img height="20" src="../assets/logo.jpg" alt>
        </td>
        <td>
          <van-search background="transparent" shape="round" placeholder="输入关键字查询" v-model="value"/>
        </td>
        <td class="icon" valign="middle">
          <img height="20" src="../assets/more.png" alt>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "search",
  components: {},
  data() {
    return {
      value: "人类简历"
    };
  }
};
</script>
<style scoped lang="scss">
.search {
  padding: 10px 0 10px 0;
}
table {
  text-align: center;
  width: 100%;
  vertical-align: middle;
}
tr,
td {
  vertical-align: middle;
  padding: 5px;
}
.logo {
  width: 60px;
}
.icon {
  width: 30px;
}
img {
  text-align: center;
  margin: 0 auto;
}
.van-search {
  padding: 0;
}
td img,
td input {
  vertical-align: middle;
}
</style>
