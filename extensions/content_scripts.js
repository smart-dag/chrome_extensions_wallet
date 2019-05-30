//注入方法
function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

//注入api
injectScript(chrome.extension.getURL('api.js'), 'body');


//获得来自注入对api的消息
window.addEventListener('message', function(e) {
    // 接受来自api的消息，如果要给background，则传递给 background
    if (e.data.target === "background") {
        chrome.runtime.sendMessage(e.data, function(response) {
            console.log("response: " + JSON.stringify(response));
        });
    }

});


//接受来自 background 的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //转发给注入的api
    window.postMessage({
        "target": "api",
        "data": {},
        "method": request.method,
    }, "*");
    //给background的回调函数
    sendResponse("hi")
});