/**
 * 添加url变动监听并触发自定义事件，contentScript可监听该事件。这可以监听到包括SPA应用URL中hash部分的更新
 */
export function addUrlStateListener() {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  function handleStateChange(type: string) {
    document.dispatchEvent(new CustomEvent('historyStateChange', {
      detail: {
        type: type, url: window.location.href
      }
    }))
  }

  history.pushState = function (state, title, url) {
    const result = originalPushState.apply(this, [state, title, url]);
    handleStateChange('pushState');
    return result;
  };

  history.replaceState = function (state, title, url) {
    const result = originalReplaceState.apply(this, [state, title, url]);
    handleStateChange('replaceState');
    return result;
  };

  // 前进和后退都会触发
  window.addEventListener('popstate', function (event) {
    handleStateChange('popstate');
  });


  handleStateChange('pushState');
}

// addUrlStateListen();
