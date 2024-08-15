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

window.addEventListener('popstate', function (event) {
  handleStateChange('popstate');
});
