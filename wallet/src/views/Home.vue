<template>
  <div class="home">
    <van-cell-group>
      <van-field label="钱包地址" v-model="address" disabled/>
      <van-field label="钱包余额" v-model="balance" disabled/>
    </van-cell-group>
    <p>
      <van-button @click="getamount" type="info">猛击此处，获得测试token.</van-button>
    </p>
  </div>
</template>

<script>
const stringRandom = require("string-random");
const { default: Wallet } = require("sdagwallet.js");
export default {
  name: "home",
  components: {},
  data() {
    return {
      address: "",
      balance: ""
    };
  },
  methods: {
    getamount() {
      window.open(`http://faucet.sdag.io:60004/${this.address}`);
    }
  },
  created() {
    var _self = this;
    let peer_id = stringRandom(32);
    let wallet = new Wallet({ peerId: peer_id });
    console.log(peer_id);
    //从本地存储里获得助记词
    let mnemonic = localStorage.getItem("mnemonic");
    //如果没有助记词,则生成助记词
    if (!mnemonic) {
      mnemonic = wallet.generateMnemonic().toString();
      //保存在本地存储里
      localStorage.setItem("mnemonic", mnemonic);
    }
    //配置hub
    wallet.configHub("wss://explorer.sdag.io:20003");
    //登录钱包
    wallet.loginWithMnemonic(mnemonic).then(() => {
      //算出钱包地址
      let address = wallet.getAddress().toString();
      _self.address = address;
      //获得余额
      wallet.getBalance().then(balance => {
        let newbalance = balance / 1000000;
        _self.balance = newbalance;
      });
    });
  }
};
</script>
