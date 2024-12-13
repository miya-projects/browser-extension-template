import Tab = chrome.tabs.Tab;
import MessageSender = chrome.runtime.MessageSender;

console.log("background script loaded")

// 设置扩展图标小圆点
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// 消息监听
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let func = onMessageListeners[request.action]
    if (func) {
      return func(request, sender, sendResponse);
    }
    console.log("接收到消息:" + JSON.stringify(request))
    return true;
  }
);

// 消息监听器注册
let onMessageListeners: {
  [key: string]: ((message: any, sender: MessageSender, sendResponse: (response?: any) => void) => boolean)
} = {}

onMessageListeners['getCurrentTab'] = (request, sender, sendResponse) => {
  chrome.tabs.query( {active: true, lastFocusedWindow: true}).then(res => {
    sendResponse(res);
  })
  return true;
}

// 监听标签页切换事件，可能还没有网址
// chrome.tabs.onActivated.addListener(function (activeInfo: chrome.tabs.TabActiveInfo) {
//   chrome.tabs.get(activeInfo.tabId).then((tab: Tab) => {
//     chrome.action.setBadgeText({
//       text: tab.title!.charAt(0),
//     });
//   })
// })

// 标签页切换时间，并更新网址的时候
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!tab.url) {
    return;
  }
  const url = new URL(tab.url);
  chrome.action.setBadgeText({
    text: tab.title!.charAt(0),
  });
})

chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: false}).then(r =>{})
