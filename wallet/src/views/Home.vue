<template>
  <div class="home">
    <h2>{{address}}</h2>
    <h1>{{balance}} SDG</h1>
    <p>
      <a :href="`http://faucet.sdag.io:60004/${address}`" target="_blank">猛击此处，获得测试token.</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      address: "",
      balance: ""
    };
  },
  created() {
    var loop = setInterval(() => {
      if (this.$store.state.is_login) {
        clearInterval(loop);
        this.address = this.$store.state.address;
        this.balance = this.$store.state.balance;
      }
    }, 1000);
  }
};
</script>
