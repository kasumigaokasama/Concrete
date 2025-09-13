(() => {
  const _0xcc4cfd = document.getElementById('activeName');
  const _0x3f0a3e = document.getElementById("nameInput");
  const _0x1b970f = document.getElementById("editName");
  const _0x257890 = document.getElementById("confirmName");
  const _0x5eb8b4 = document.getElementById("licenseDot");
  const _0x57a9e8 = document.getElementById('licenseText');
  const _0x1013cf = document.getElementById("licenseTime");
  const _0x441d83 = document.getElementById('toggleBot');
  const _0x39ace4 = document.getElementById("playIcon");
  const _0xaf5b4b = document.getElementById("timer");
  const _0x1ed588 = document.getElementById('botStatusDot');
  const _0x5d15ed = document.getElementById("botStatusText");
  let _0x3eccbf = null;
  let _0xcdf6ee = false;
  const _0x2f6d2a = _0x18892a => {
    const _0x189bfb = Math.floor(_0x18892a / 0x3e8);
    return (_0x189bfb / 0xe10 >> 0x0).toString().padStart(0x2, '0') + ':' + (_0x189bfb % 0xe10 / 0x3c >> 0x0).toString().padStart(0x2, '0') + ':' + (_0x189bfb % 0x3c).toString().padStart(0x2, '0');
  };
  function _0x1b90f8(_0x21a575) {
    clearInterval(_0x3eccbf);
    if (!_0x21a575) {
      _0xaf5b4b.textContent = '00:00:00';
      return;
    }
    _0xaf5b4b.textContent = _0x2f6d2a(Date.now() - _0x21a575);
    _0x3eccbf = setInterval(() => {
      _0xaf5b4b.textContent = _0x2f6d2a(Date.now() - _0x21a575);
    }, 0x3e8);
  }
  function _0x896ba1(_0x592498) {
    const _0x422c52 = Date.now();
    const _0xe996a7 = new Date(_0x592498).getTime();
    if (_0xe996a7 <= _0x422c52) {
      return 'expired';
    }
    const _0x4fd759 = _0xe996a7 - _0x422c52;
    if (_0x4fd759 > 315360000000) {
      return "never expires";
    }
    const _0x9846d = Math.floor(_0x4fd759 / 86400000);
    const _0x360a03 = Math.floor(_0x4fd759 % 86400000 / 3600000);
    return _0x9846d >= 0x7 ? _0x9846d + " day" + (_0x9846d !== 0x1 ? 's' : '') : _0x9846d + " day" + (_0x9846d !== 0x1 ? 's' : '') + " and " + _0x360a03 + " hour" + (_0x360a03 !== 0x1 ? 's' : '');
  }
  async function _0x5930d6(_0x6c4240) {
    _0x57a9e8.textContent = 'Checking…';
    _0x5eb8b4.className = "license-dot";
    _0x1013cf.textContent = '';
    _0x441d83.disabled = true;
    try {
      const _0x279932 = await fetch('http://localhost:3000/api/verify-name', {
        'method': "POST",
        'headers': {
          'Content-Type': "application/json"
        },
        'body': JSON.stringify({
          'name': _0x6c4240
        })
      });
      const _0x43a0f3 = await _0x279932.json();
      const _0x2301cb = _0x896ba1(_0x43a0f3.expireAt);
      _0xcdf6ee = _0x43a0f3.allowed && _0x2301cb !== "expired";
      if (_0xcdf6ee) {
        _0x5eb8b4.classList.add("valid");
        _0x57a9e8.textContent = 'Valid';
        _0x1013cf.textContent = _0x2301cb;
        _0x441d83.disabled = false;
      } else {
        _0x5eb8b4.classList.add("invalid");
        _0x57a9e8.textContent = "Blocked";
        _0x1013cf.textContent = '';
        _0x441d83.disabled = true;
      }
    } catch {
      _0x5eb8b4.classList.add('invalid');
      _0x57a9e8.textContent = "Error";
      _0xcdf6ee = false;
      _0x441d83.disabled = true;
    }
    return _0xcdf6ee;
  }
  function _0x2ec5ff(_0x4d7446) {
    _0x5d15ed.textContent = _0x4d7446 ? "Enabled" : 'Disabled';
    _0x1ed588.classList.toggle("running", _0x4d7446);
    _0x39ace4.textContent = _0x4d7446 ? '⏸' : '▶';
  }
  chrome.storage.local.get(["abstract_name", "abstract_state", 'abstract_start'], async _0x1f2baa => {
    const _0x51af52 = _0x1f2baa.abstract_name || "Player";
    const _0x5022ff = _0x1f2baa.abstract_state || false;
    const _0x5b62b6 = _0x1f2baa.abstract_start || null;
    _0xcc4cfd.textContent = _0x51af52;
    await _0x5930d6(_0x51af52);
    _0x2ec5ff(_0x5022ff && _0xcdf6ee);
    _0x1b90f8(_0x5022ff && _0xcdf6ee ? _0x5b62b6 : null);
  });
  _0x1b970f.onclick = () => {
    _0x3f0a3e.value = _0xcc4cfd.textContent;
    _0xcc4cfd.hidden = true;
    _0x1b970f.hidden = true;
    _0x3f0a3e.style.display = 'inline-block';
    _0x257890.style.display = "inline-block";
    _0x3f0a3e.focus();
  };
  _0x257890.onclick = async () => {
    const _0x3484a6 = _0x3f0a3e.value.trim().slice(0x0, 0xe) || 'Player';
    chrome.storage.local.set({
      abstract_name: _0x3484a6
    });
    _0xcc4cfd.textContent = _0x3484a6;
    _0x3f0a3e.style.display = "none";
    _0x257890.style.display = 'none';
    _0xcc4cfd.hidden = false;
    _0x1b970f.hidden = false;
    await _0x5930d6(_0x3484a6);
  };
  _0x3f0a3e.addEventListener("keydown", _0x36d709 => {
    if (_0x36d709.key === "Enter") {
      _0x257890.click();
    }
  });
  _0x441d83.addEventListener("click", async () => {
    const _0x5ba0ac = _0xcc4cfd.textContent;
    if (!(await _0x5930d6(_0x5ba0ac))) {
      alert("Name not allowed or license expired.");
      return;
    }
    chrome.storage.local.get(["abstract_state", 'abstract_start'], _0x4fdd2a => {
      const _0x16c8bb = !_0x4fdd2a.abstract_state;
      const _0x56e954 = Date.now();
      const _0x23a0e4 = {
        abstract_state: _0x16c8bb
      };
      if (_0x16c8bb) {
        _0x23a0e4.abstract_start = _0x56e954;
      }
      chrome.storage.local.set(_0x23a0e4, () => {
        _0x2ec5ff(_0x16c8bb);
        _0x1b90f8(_0x16c8bb ? _0x56e954 : null);
        chrome.tabs.query({
          'url': "*://*.wolvesville.com/*"
        }, _0x59bc99 => {
          const _0x48eee0 = _0x59bc99[0x0];
          if (!_0x48eee0) {
            return;
          }
          if (_0x16c8bb) {
            chrome.storage.local.set({
              wolf_tab_id: _0x48eee0.id
            });
          }
          chrome.tabs.sendMessage(_0x48eee0.id, {
            'action': "toggleBot",
            'enabled': _0x16c8bb,
            'name': _0x5ba0ac
          });
        });
      });
    });
  });
})();