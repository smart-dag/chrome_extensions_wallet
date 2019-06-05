<template>
  <div class="banner">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item :key="$index" v-for="(item, $index) in list">
        <img width="100%" :src="item">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "banner",
  components: {},
  data() {
    var list = [];
    for (let index = 1; index < 4; index++) {
      list.push(require(`../assets/banner${index}.jpg`));
    }
    return {
      list: list
    };
  }
};
</script>
<style scoped lang="scss">
</style>
