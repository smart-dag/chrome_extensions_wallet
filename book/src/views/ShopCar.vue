<template>
  <div class="shopcar">
    <van-nav-bar :fixed="true" title="我的购物车" left-text="返回" left-arrow @click-left="gohome"/>
    <van-card
      :num="item.num"
      :price="item.price"
      :title="item.title"
      :thumb="item.img"
      :key="$index"
      currency="SDG"
      v-for="(item, $index) in $store.state.shopcarlist"
    >
      <div slot="footer">
        <van-checkbox class="selectshop" @change="upamount" v-model="item.checked"></van-checkbox>
        <van-button class="cp" size="mini" @click="sub($index)">-</van-button>
        <van-button class="cp" size="mini" @click="add($index)">+</van-button>
        <van-button size="mini" @click="del($index)" type="danger">删除</van-button>
      </div>
    </van-card>

    <van-submit-bar
      v-if="this.$store.state.shopcarlist.length>0"
      :price="price"
      :disabled="pay_btn_disabled"
      :button-text="pay_btn_text"
      currency="SDG"
      @submit="pay"
    >
      <van-checkbox v-model="checked" class="selectall">全选</van-checkbox>
    </van-submit-bar>
    <van-action-sheet v-model="show_no_sdag_wallet" title="提示">
      <p>你还没有安装SDAG的chrome扩展钱包</p>
      <van-button @click="download" type="danger">立刻下载</van-button>
      <p></p>
    </van-action-sheet>
    <van-action-sheet v-model="show" title>
      <p>正在等待付款</p>
      <p></p>
    </van-action-sheet>
  </div>
</template>
<style scoped>
.shopcar {
  padding-top: 35px;
  margin-bottom: 50px;
}
.van-card__header {
  margin-left: 40px;
}
.selectshop {
  margin-top: -60px;
  position: absolute;
  border: solid 1px #ccc;
  border-radius: 100%;
}
.cp {
  width: 40px;
  min-width: 40px;
}
.selectall {
  margin-left: 15px;
}
</style>

<script>
//载入对话框组件
import { Dialog } from "vant";
export default {
  name: "shopcar",
  components: {},
  created() {
    //页面被创建后，更新总价。
    this.upamount();
  },
  methods: {
    download() {
      window.open(
        "https://github.com/smart-dag/chrome_extensions_wallet/releases"
      );
    },
    //更新总价
    upamount() {
      var amount = 0;
      this.$store.state.shopcarlist.forEach(element => {
        if (element.checked) {
          amount += element.price * element.num;
        }
      });
      // this.text = `总金额 ${amount.toFixed(2)}`;
      this.price = amount.toFixed(2) * 100;
      if (this.price > 0) {
        this.pay_btn_disabled = false;
        this.pay_btn_text = "立刻支付";
      } else {
        this.pay_btn_disabled = true;
        this.pay_btn_text = "请选商品";
      }
    },
    //支付按钮被点击
    pay() {
      let _self = this;
      if (typeof window.sdag == "undefined") {
        this.show_no_sdag_wallet = true;
      } else {
        this.show = true;
        sdag.pay(
          "DDZOSUYQ5TRVDKJPKREDUL473LJP5ZRV",
          _self.price/100,
          `图书订单，共${this.price}SDG`,
          function(hash) {
            Dialog.alert({
              title: "付款成功",
              message: `hash:${hash}`
            }).then(() => {
              //循环购物车，把已经购买的给删掉。留下没有购买的（未打勾的）
              _self.show = false;
              var list = [];
              _self.$store.state.shopcarlist.forEach(element => {
                if (!element.checked) {
                  list.push(element);
                }
              });
              _self.$store.state.shopcarlist = list;
            });
          }
        );
      }
      // this.show = true;
      // Dialog.alert({
      //   title: "付款成功",
      //   message: ""
      // }).then(() => {
      //   //循环购物车，把已经购买的给删掉。留下没有购买的（未打勾的）
      //   var list = [];
      //   this.$store.state.shopcarlist.forEach(element => {
      //     if (!element.checked) {
      //       list.push(element);
      //     }
      //   });
      //   this.$store.state.shopcarlist = list;
      // });
    },
    //回到首页，路由跳转
    gohome() {
      this.$router.push({
        path: "/",
        name: "home"
      });
    },
    //减
    sub(index) {
      this.$store.state.shopcarlist[index].num -= 1;
      if (this.$store.state.shopcarlist[index].num < 1) {
        this.del(index);
      }
      this.upamount();
    },
    //加
    add(index) {
      this.$store.state.shopcarlist[index].num += 1;
      this.upamount();
    },
    //删
    del(index) {
      this.$store.state.shopcarlist.splice(index, 1);
      this.upamount();
    }
  },
  watch: {
    //对全选按钮进行监控
    checked(newvalue, oldvalue) {
      //循环每个商品，更新选择状态
      this.$store.state.shopcarlist.forEach(element => {
        if (newvalue) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      });
      this.upamount();
    }
  },
  data() {
    return {
      show: false,
      show_no_sdag_wallet: false,
      pay_btn_text: "", //支付按钮的文本
      pay_btn_disabled: false, //支付按钮能否现实
      checked: false, //全选按钮
      price: 0, //总价
      active: 1 //当前的底部菜单序列号（颜色变换）
    };
  }
};
</script>
