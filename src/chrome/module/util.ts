
/**
 * 注入js脚本到网站中，这种方式注入的代码不受扩展程序的限制，可以访问window对象等，可通过事件的方式和扩展程序通讯
 * @param url
 */
export const injectJsToWebsite = function(url: string = 'inject.js') {
  const s = document.createElement('script');
  // @ts-ignore
  s.src = chrome.runtime.getURL(url);
  (document.head||document.documentElement).appendChild(s);
  s.onload = function() {
    s.remove();
  };
}

/**
 * 注入css样式到网站中
 * @param cssContent css样式
 */
export const injectCssToWebsite = function(cssContent: string) {
  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);
}


/**
 * 根据html字符串创建dom元素
 * @param html
 */
export const createDomElement = function(html: string): Element {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.body.firstElementChild as Element;
}


/**
 * 生成随机字符串
 * @param length
 */
export const generateRandomString = function(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

