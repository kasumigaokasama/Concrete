let attachedTarget = null;
function ensureDebuggerAttached(_0x29418a, _0x380980) {
  if (attachedTarget && attachedTarget.tabId === _0x29418a) {
    return _0x380980();
  }
  attachedTarget = {
    'tabId': _0x29418a
  };
  chrome['debugger'].attach(attachedTarget, "1.2", () => {
    if (chrome.runtime.lastError) {
      console.warn("[Concrete] Failed to attach:", chrome.runtime.lastError.message);
      attachedTarget = null;
      return;
    }
    console.log("[Concrete] Debugger attached");
    _0x380980();
  });
}
function performClick(_0x3383a6, _0x4370ab, _0x1e92db = 'left') {
  chrome.tabs.query({
    'url': "*://www.wolvesville.com/*"
  }, _0xd1f5f4 => {
    if (!_0xd1f5f4.length) {
      console.warn("[Concrete] No Wolvesville tab found");
      return;
    }
    const _0x76038b = _0xd1f5f4[0x0].id;
    ensureDebuggerAttached(_0x76038b, () => {
      const _0x394c9f = {
        'tabId': _0x76038b
      };
      chrome["debugger"].sendCommand(_0x394c9f, "Input.dispatchMouseEvent", {
        'type': 'mouseMoved',
        'button': _0x1e92db,
        'x': _0x3383a6,
        'y': _0x4370ab,
        'clickCount': 0x1
      });
      chrome["debugger"].sendCommand(_0x394c9f, "Input.dispatchMouseEvent", {
        'type': 'mousePressed',
        'button': _0x1e92db,
        'x': _0x3383a6,
        'y': _0x4370ab,
        'clickCount': 0x1
      });
      chrome["debugger"].sendCommand(_0x394c9f, "Input.dispatchMouseEvent", {
        'type': "mouseReleased",
        'button': _0x1e92db,
        'x': _0x3383a6,
        'y': _0x4370ab,
        'clickCount': 0x1
      });
    });
  });
}
chrome.runtime.onMessage.addListener((_0x3df747, _0x4e302e, _0x3f94ab) => {
  if (_0x3df747.action !== 'performClick') {
    return;
  }
  console.log("[Concrete] Background will click at", _0x3df747.x, _0x3df747.y);
  performClick(_0x3df747.x, _0x3df747.y, _0x3df747.button);
  _0x3f94ab?.({
    'ok': true
  });
  return true;
});
chrome.runtime.onSuspend.addListener(() => {
  if (attachedTarget) {
    chrome["debugger"].detach(attachedTarget);
    attachedTarget = null;
  }
});