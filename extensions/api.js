sdag = {
    name: "sdag",
    extensionId: "klckigplglpnolgbpknkjobjajmngijk",
    version: 0.1,
    test: function(success_cb) {
        // 转发到content，告诉content转发给 background
        this.pay_success_cb = success_cb;
        console.log("0:cb", success_cb);
        // 1)
        console.log("1:post msg from api to content");
        window.postMessage({
            "target": "background",
            "method": "test",
        }, "*");
    },
    //打开钱包
    show: function() {
        // 转发到content，告诉content转发给 background
        window.postMessage({
            "target": "background",
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
            "address": address,
            "amount": amount,
            "text": text,
            "method": "pay",
        }, "*");
    }
}


//接收来自content的消息
window.addEventListener('message', function(e) {
    if (e.data.target == "api") {
        console.log("get api msg from background", e.data);
        if (e.data.method == "pay_finish") {
            //执行成功的方法
            console.log("pay finish");
            sdag.pay_success_cb(e.data.text);
        }
    }
});