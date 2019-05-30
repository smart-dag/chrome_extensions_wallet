<template>
  <div class="send">
    <h2>{{address}}</h2>
    <h1>{{balance}} SDG</h1>
    <md-field>
      <md-input-item title="收款方" type="text" v-model="to" placeholder="输入收款地址"></md-input-item>
      <md-input-item title="金额" type="money" v-model="amount" placeholder="amount"></md-input-item>
      <md-input-item title="订单编号" type="text" v-model="text" placeholder></md-input-item>
      <md-button type="primary" @click="pay" plain>立刻支付</md-button>
    </md-field>
  </div>
</template>

<script>
import { Dialog, Button } from "mand-mobile";
export default {
  name: "send",
  components: {},
  methods: {
    pay() {
      this.$store.state.wallet
        .send({ amount: this.amount, to: this.to, text: this.text })
        .then(json => {
          console.log(json);
          var bg = chrome.extension.getBackgroundPage();
          bg.pay_success(); //pay_success()是background中的一个方法
          Dialog.alert({
            title: "提示",
            content: "付款成功",
            // cancelText: "取消",
            confirmText: "确定",
            onConfirm: () => {
                this.$router.push({ path: "/" });
            }
          });
          //成功
        })
        .catch(err => {
          //失败
        });
    }
  },
  data() {
    return {
      address: "",
      balance: "",
      to: "",
      amount: "",
      text: ""
    };
  },
  created() {
    this.to = this.$route.params.address;
    this.amount = this.$route.params.amount;
    this.text = this.$route.params.text;
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
