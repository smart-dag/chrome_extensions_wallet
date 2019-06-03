<template>
  <div class="send">
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
      v-if="notenoughbalance"
    >余额不足，无法支付!，当前余额 {{balance}} SDG</van-notice-bar>
    <van-cell-group>
      <van-field label="付款地址" v-model="address" disabled/>
      <van-field label="收款地址" v-model="to" placeholder="输入收款地址"/>
      <van-field label="付款金额" type="number" v-model="amount" placeholder="输入付款金额"/>
      <van-field label="备注信息" v-model="text" placeholder="输入备注信息"/>
    </van-cell-group>
    <van-submit-bar button-text="付款" :disabled="!checked" @submit="pay">
      <van-checkbox v-model="checked">勾选代表后果自己承担！</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<style scoped>
.van-checkbox {
  width: 100%;
  padding-left: 10px;
}
</style>

<script>
import { Dialog } from 'vant';
export default {
  name: "send",
  components: {},
  methods: {
    pay() {
      this.$store.state.wallet
        .send({ amount: this.amount, to: this.to, text: this.text })
        .then(json => {
          console.log(json);
          Dialog.alert({
            title: "标题",
            message: "付款成功"
          }).then(() => {
            var bg = chrome.extension.getBackgroundPage();
            bg.pay_success(); //pay_success()是background中的一个方法
            this.$router.push({ path: "/" });
          });
          //成功
        })
        .catch(err => {
          //失败
        });
    }
  },
  watch: {
    amount(newvalue, oldvalue) {
      if (newvalue >= this.balance) {
        console.log(newvalue);
        this.notenoughbalance = true;
      } else {
        this.notenoughbalance = false;
      }
    },
    balance(newvalue, oldvalue) {
      if (newvalue > this.amount) {
        this.notenoughbalance = false;
      } else {
        this.notenoughbalance = true;
      }
    }
  },
  data() {
    return {
      notenoughbalance: false,
      checked: false,
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
