<template>
  <div class="success">
    <p>支付成功</p>
    <p>{{hash}}</p>
  </div>
</template>
<script>
export default {
  name: "success",
  data() {
    hash: "";
  },
  created() {
    this.hash = this.$route.params.hash;
    var bg = chrome.extension.getBackgroundPage();
    bg.pay_success(this.hash); //pay_success()是background中的一个方法
  }
};
</script>
