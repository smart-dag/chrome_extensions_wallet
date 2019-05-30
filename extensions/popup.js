document.getElementById("haha").addEventListener("click", function() {
    var bg = chrome.extension.getBackgroundPage();
    bg.pay_success(); //pay_success()是background中的一个方法
});