import {injectToWebsite} from "./module/util";

console.log("content script loaded")


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
  }
);

// @ts-ignore
chrome.runtime.sendMessage({greeting: "hello"}, response => {
  console.log(response)
})

injectToWebsite('inject.js')
document.addEventListener('historyStateChange', function(e: Event) {
  // if(location.href.indexOf("dppt.shanxi.chinatax.gov.cn:8443/blue-invoice-makeout/invoice-makeout")!=-1) {
  // }
  let data = (e as CustomEvent<any>).detail;
  console.log('History method called:', data.type, data.url);
})


// /**
//  * 注入js脚本到网站中，这种方式注入的代码不受扩展程序的限制，可以访问window对象等，可通过事件的方式和扩展程序通讯
//  * @param url
//  */
// function injectToWebsite(url: string = 'inject.js') {
//   const s = document.createElement('script');
//   // @ts-ignore
//   s.src = chrome.runtime.getURL('inject.js');
//   (document.head||document.documentElement).appendChild(s);
//   s.onload = function() {
//     s.remove();
//   };
// }
