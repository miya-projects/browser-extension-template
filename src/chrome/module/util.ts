
/**
 * 注入js脚本到网站中，这种方式注入的代码不受扩展程序的限制，可以访问window对象等，可通过事件的方式和扩展程序通讯
 * @param url
 */
export const injectToWebsite = function(url: string = 'inject.js') {
  const s = document.createElement('script');
  // @ts-ignore
  s.src = chrome.runtime.getURL('inject.js');
  (document.head||document.documentElement).appendChild(s);
  s.onload = function() {
    s.remove();
  };
}
