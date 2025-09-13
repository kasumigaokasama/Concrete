// fetch-proxy.js
// Intercepts window.fetch for api-wolvesville.com hosts and delegates to background.js
(function() {
  const originalFetch = window.fetch.bind(window);
  const API_HOSTS = [
    "game.api-wolvesville.com",
    "game-asia.api-wolvesville.com",
    "core.api-wolvesville.com"
  ];

  function shouldProxy(url) {
    try {
      const u = new URL(url, location.href);
      return API_HOSTS.some(h => u.hostname === h);
    } catch (_) {
      return false;
    }
  }

  async function proxyFetch(input, init = {}) {
    const url = (typeof input === "string") ? input : input.url;
    const method = (init && init.method) || (typeof input !== "string" ? input.method : "GET") || "GET";
    const headers = (init && init.headers) || (typeof input !== "string" ? input.headers : undefined);
    const body = init && init.body ? init.body : undefined;
    // Only permit simple JSON/text bodies through messaging
    let bodyText = null;
    if (typeof body === "string") {
      bodyText = body;
    } else if (body instanceof URLSearchParams) {
      bodyText = body.toString();
    } else if (body instanceof Blob || body instanceof ArrayBuffer) {
      // Fallback: not supported via message channel, use original fetch
      return originalFetch(input, init);
    }

    const resp = await chrome.runtime.sendMessage({
      type: "API_FETCH",
      payload: {
        url,
        method,
        headers: headers && Object.fromEntries(new Headers(headers).entries()),
        body: bodyText
      }
    });

    if (!resp || !resp.ok) {
      const status = (resp && resp.status) || 0;
      const statusText = (resp && resp.statusText) || "Proxy fetch failed";
      const msg = (resp && resp.error) ? `${status} ${statusText}: ${resp.error}` : `${status} ${statusText}`;
      return new Response(msg, { status: status || 502, statusText: statusText || "Bad Gateway" });
    }

    const rHeaders = new Headers(resp.headers || {});
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText || "",
      headers: rHeaders
    });
  }

  window.fetch = new Proxy(originalFetch, {
    apply(target, thisArg, args) {
      const [input, init] = args;
      const url = (typeof input === "string") ? input : input.url;
      if (url && shouldProxy(url)) {
        return proxyFetch(input, init);
      }
      return Reflect.apply(target, thisArg, args);
    }
  });
})();