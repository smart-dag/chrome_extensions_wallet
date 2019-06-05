<template>
  <div class="home">
    <search/>
    <banner/>
    <tablemenu/>
    <img src="../assets/banner5.jpg" width="100%">
    <div class="book" :key="$index" v-for="(book, $index) in books">
      <img :src="book.img" alt>
      <div class="title">{{book.title}}</div>
      <div class="price">{{book.price}}</div>
      <van-button class="add" size="mini" @click="add($index)" type="danger">加到购物车</van-button>
    </div>
    <tabbar :active="0"/>
  </div>
</template>
<style scoped>
.home {
  margin-bottom: 70px;
}
.book {
  width: 50%;
  height: auto;
  display: inline-block;
}
.book img {
  width: 100%;
}
.add{
  padding: 0px 5px 0px 5px;
}
</style>


<script>
import { Dialog } from "vant";
// @ is an alias to /src
import Search from "@/components/Search.vue";
import Banner from "@/components/Banner.vue";
import Tablemenu from "@/components/Tablemenu.vue";
import Tabbar from "@/components/Tabbar.vue";

export default {
  name: "home",
  components: {
    Search,
    Banner,
    Tablemenu,
    Tabbar
  },
  data() {
    return {
      books: [
        {
          title: "全球最美的100处",
          price: 8.20,
          img: require("../assets/book1.jpg")
        },
        {
          title: "正面管教",
          price: 19.90,
          img: require("../assets/book2.jpg")
        },
        {
          title: "生活需要仪式感",
          price: 9.90,
          img: require("../assets/book3.jpg")
        },
        {
          title: "摆渡人",
          price: 15.00,
          img: require("../assets/book4.jpg")
        },
        {
          title: "精进",
          price: 23.00,
          img: require("../assets/book5.jpg")
        },
        {
          title: "少年读史记",
          price: 56.00,
          img: require("../assets/book6.jpg")
        },
        {
          title: "乌合之众",
          price: 9.90,
          img: require("../assets/book7.jpg")
        },
        {
          title: "笠翁对韵",
          price: 32,
          img: require("../assets/book8.jpg")
        },
        {
          title: "领导力21法则",
          price: 18.00,
          img: require("../assets/book9.jpg")
        },
        {
          title: "行政攻略",
          price: 25.00,
          img: require("../assets/book10.jpg")
        }
      ]
    };
  },
  methods: {
    add(index) {
      this.$store.state.shopcarlist.push({
        title: this.books[index].title,
        checked: false,
        img: this.books[index].img,
        price: this.books[index].price,
        num: 1
      });
      Dialog.alert({
        title: "已加入购物车",
        message: ""
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
