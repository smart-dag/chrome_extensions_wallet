<template>
  <div class="tablemenu">
    <table>
      <tr>
        <td :key="$index" v-for="(item, $index) in list">
          <img :src="item.img">
          <br>
          {{item.title}}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "tablemenu",
  components: {},
  data() {
    return {
      list: [
        {
          title: "畅销",
          img: require("../assets/1.jpg")
        },
        {
          title: "新榜",
          img: require("../assets/2.jpg")
        },
        {
          title: "童榜",
          img: require("../assets/3.jpg")
        },
        {
          title: "促销",
          img: require("../assets/4.jpg")
        },
        {
          title: "特价",
          img: require("../assets/5.jpg")
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
table {
  width: 100%;
  font-size: 14px;
  margin: 0 auto;
}
img {
  width: 80%;
}
tr {
  height: 70px;
}
td,
tr {
  margin: 0;
  padding: 0;
}
</style>
