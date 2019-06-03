import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
Vue.use(Vant);
const { default: Wallet } = require("sdagwallet.js");
//初始化钱包
let wallet = new Wallet();
store.state.is_login = false;
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


    store.state.address = address;
    store.state.is_login = true;
    //获得余额
    wallet.getBalance().then(balance => {
        let newbalance = balance / 1000000;
        store.state.balance = newbalance;
    });

    console.log(store.state.address);
    console.log(store.state.balance);

    // setInterval(() => {
    //     wallet.getBalance().then(balance => {
    //         let newbalance = balance / 1000000;
    //         store.state.balance = newbalance;
    //     });
    // }, 5000);

    // //监控转账及到账
    // wallet.onAssetMessage(msg => {
    //   console.log(msg);
    // });
});

store.state.wallet = wallet;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')