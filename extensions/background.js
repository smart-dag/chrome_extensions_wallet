//用于给popup调用的方法
function pay_success() {
    console.log("hahaha");
    //传递信息给content
    chrome.tabs.query({ active: true }, function(tabs) {
        console.log("tabs", tabs)
        console.log("tabs[0].id", tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, { msg: "支付成功", method: "pay_finish" }, function(response) {
            console.log(response);
        });
    });
}





//处理来自 content代理api.js的消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender);
    console.log(request);
    console.log(request.method);

    if (request.method == "show") {
        chrome.tabs.create({
            url: chrome.extension.getURL('index.html#'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
                // incognito, top, left, ...
                width: 450,
                height: 450
                    //top:0,
                    //left:0
            });
        });
    } else if (request.method == "pay") {
        //调用支付
        chrome.tabs.create({
            url: chrome.extension.getURL('index.html#send/' + request.address + '/' + request.amount + '/' + request.text),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
                // incognito, top, left, ...
                width: 450,
                height: 450

                //top:0,
                //left:0
            });
        });
    }
    sendResponse('hi!');
});



// chrome.runtime.onMessage.addListener(function(request, sender, callback) {
//     setTimeout(function() {
//         callback('hi!');
//     }, 2000);
//     return true; //这是重点，没有return true，上面返回的是undefined而不是"hi!"
// });