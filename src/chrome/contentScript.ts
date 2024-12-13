import {createDomElement, generateRandomString, injectCssToWebsite, injectJsToWebsite} from "@chrome/module/util";
import {debounceTime, of, Subject} from "rxjs";
import {debounce} from "@chrome/util";

console.debug("content script loaded")

// ID
const id = generateRandomString(10);

chrome.runtime.onMessage.addListener (
  function(request, sender, sendResponse) {
    if (request.action === 'registerButton') {
      registerButton();
    } else {
      console.debug("content script收到消息" + JSON.stringify(request));
    }
    return true;
  }
);


// 注射脚本到网页中,实现监听SPA应用路由切换，在某个路由中增加一些功能
injectJsToWebsite('inject.js')
document.addEventListener('historyStateChange', function(e: Event) {
  // if(location.href.indexOf("dppt.shanxi.chinatax.gov.cn:8443/blue-invoice-makeout/invoice-makeout")!=-1) {
  // }
  let data = (e as CustomEvent<any>).detail;
  console.debug('History method called:', data.type, data.url);
})

const observer = new MutationObserver(debounce((mutations: MutationRecord[], observer: MutationObserver) => {
  console.log('body变化')
}, 1000));

observer.observe(document.body, { childList: true, subtree: true });


// 注册按钮到页面中
function registerButton() {
  let btns = document.querySelector('.' + id)
  if (btns) {
    // 已经注册过了
    return
  }

  const cssContent = `
  .btn-get-current-tab{
    position: fixed;
    bottom: 39px;
    right: 11px;
    width: 100px;
    height: 50px;
    z-index: 99999;
    cursor: pointer;
  }
  `;
  injectCssToWebsite(cssContent);

  // 注册dom到网页中
  let html = `
  <button class="${id} btn-get-current-tab">获取tabId</button>
  `
  const element = createDomElement(html);
  element.addEventListener('click', getCurrentTab)
  document.body.append(element);

  function getCurrentTab() {
    chrome.runtime.sendMessage({action: "getCurrentTab"}).then(tabs => {
      console.debug("tabId: " + tabs[0].id)
    });
  }
}
