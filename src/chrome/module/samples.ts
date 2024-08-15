// api调用备忘录
//文档见 https://developer.chrome.google.cn/docs/extensions/reference?hl=zh-cn

import ScriptInjection = chrome.scripting.ScriptInjection;


// 执行注入脚本，返回结果(contentScript域，不可访问window对象)
function executeScript() {
  chrome.scripting
    .executeScript({
      target : {tabId : 1},
      func : getTitle,
    } as ScriptInjection<any, string>)
    .then((res: any) => console.log("injected a function", res.result));
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "收到来自content script的消息:" + sender.tab.url :
      "收到来自extension的消息:");
    console.log(request)

    if (sender.tab) {
      chrome.scripting
        .executeScript({
          target : {tabId : sender.tab!.id},
          func : getTitle,
        } as ScriptInjection<any, string>)
        .then((res: any) => console.log("injected a function", res.result));
    }
    sendResponse({farewell: "ok"});
  }
);
function getTitle(): string {
  console.log("getTitle")
  return document.title;
}


// 标签页切换时间，并更新网址的时候
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!tab.url) {
    return;
  }
  const url = new URL(tab.url);
  console.log(url.origin)
  if (url.origin === "https://www.baidu.com") {
    console.log("设置sidepanel")
    chrome.sidePanel.setOptions({
      tabId,
      path: 'index.html?#/side-panel',
      enabled: true
    });
  } else {
    chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
})

// 侧边栏
chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true}).then(r =>{})
