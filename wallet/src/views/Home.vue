<template>
  <div class="home">
    <van-cell-group>
      <van-field label="钱包地址" v-model="address" disabled/>
      <van-field label="钱包余额" v-model="balance" disabled/>
    </van-cell-group>
    <p><van-button @click="getamount" type="info">猛击此处，获得测试token.</van-button></p>
    
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
  methods:{
    getamount(){
      window.open(`http://faucet.sdag.io:60004/${this.address}`);
    }
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
