import ScriptInjection = chrome.scripting.ScriptInjection;

console.log("background script loaded")

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

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

