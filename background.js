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

// --- BEGIN injected API proxy handler ---
const API_HOSTS_ALLOW = new Set([
  "game.api-wolvesville.com",
  "game-asia.api-wolvesville.com",
  "core.api-wolvesville.com"
]);

async function backoffFetch(url, options = {}, tries = 5) {
  let delay = 500;
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;
    await new Promise(r => setTimeout(r, delay + Math.floor(Math.random() * 250)));
    delay = Math.min(8000, delay * 2);
  }
  // last attempt
  return fetch(url, options);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "API_FETCH") {
    (async () => {
      try {
        const u = new URL(msg.payload.url);
        if (!API_HOSTS_ALLOW.has(u.hostname)) {
          sendResponse({ ok: false, status: 400, statusText: "Bad Request", error: "Host not allowed" });
          return;
        }

        const opt = {
          method: msg.payload.method || "GET",
          headers: msg.payload.headers || {},
        };
        if (msg.payload.body) {
          opt.body = msg.payload.body;
        }

        const r = await backoffFetch(msg.payload.url, opt);
        const text = await r.text();
        const headers = {};
        r.headers.forEach((v, k) => headers[k] = v);

        sendResponse({
          ok: r.ok,
          status: r.status,
          statusText: r.statusText,
          headers,
          body: text
        });
      } catch (e) {
        sendResponse({ ok: false, status: 0, statusText: "FetchError", error: String(e) });
      }
    })();
    return true; // keep channel open for async response
  }
});
// --- END injected API proxy handler ---