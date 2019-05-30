sdag = {
    name: "sdag",
    extensionId: "klckigplglpnolgbpknkjobjajmngijk",
    version: 0.1,
    test: function() {
        console.log(this.extensionId);
    },
    //打开钱包
    show: function() {
        // 转发到content，告诉content转发给 background
        window.postMessage({
            "target": "background",
            "data": {},
            "method": "show",
        }, "*");
    },
    //支付方法
    pay: function(address, amount, text, success_cb) {
        // 转发到content，告诉content转发给 background
        this.pay_success_cb = success_cb;
        console.log("cb:", success_cb);
        window.postMessage({
            "target": "background",
            "data": {
                address: address,
                amount: amount,
                text: text
            },
            "method": "pay",
        }, "*");
    }
}


//接收来自content的消息
window.addEventListener('message', function(e) {
    if (e.data.target == "api") {
        console.log(e.data);
        if (e.data.method == "pay_finish") {
            //执行成功的方法
            sdag.pay_success_cb();
        }
    }
});