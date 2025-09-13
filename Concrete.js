function click(_0x49d189, _0x44154c = 'left') {
  const _0x2acab0 = _0x49d189.getBoundingClientRect();
  const _0x55512a = _0x2acab0.left + _0x2acab0.width / 0x2;
  const _0x4bb074 = _0x2acab0.top + _0x2acab0.height / 0x2;
  console.log("[Concrete] Request click @", _0x55512a, _0x4bb074, '→', _0x49d189.textContent.trim());
  chrome.runtime.sendMessage({
    'action': 'performClick',
    'x': _0x55512a,
    'y': _0x4bb074,
    'button': _0x44154c
  }, _0xb332e4 => {
    if (chrome.runtime.lastError) {
      console.error("[Concrete] sendMessage error:", chrome.runtime.lastError.message);
    } else {
      console.log("[Concrete] BG responded:", _0xb332e4);
    }
  });
}
function isVisible(_0x4567bd) {
  const _0x22409e = window.getComputedStyle(_0x4567bd);
  return _0x4567bd.offsetParent !== null && _0x4567bd.offsetWidth > 0x0 && _0x4567bd.offsetHeight > 0x0 && _0x22409e.visibility !== "hidden" && _0x22409e.display !== "none" && _0x4567bd.getClientRects().length > 0x0;
}
function waitForTextInDOM(_0x94bd78, {
  timeout = 0x7530,
  interval = 0xc8,
  cancelText = null
} = {}) {
  return waitForCondition(() => {
    for (const _0x54205b of document.body.querySelectorAll('*')) {
      if (_0x54205b.textContent.includes(_0x94bd78) && isVisible(_0x54205b)) {
        return _0x54205b;
      }
    }
  }, timeout, interval, cancelText);
}
function waitForExactText(_0x3b6798, {
  timeout = 0x7530,
  interval = 0xc8,
  cancelText = null
} = {}) {
  const _0x42ed4b = new RegExp("\\b" + _0x3b6798 + "\\b");
  return waitForCondition(() => {
    for (const _0x2705cd of document.body.querySelectorAll('*')) {
      if (_0x42ed4b.test(_0x2705cd.textContent) && isVisible(_0x2705cd)) {
        return _0x2705cd;
      }
    }
  }, timeout, interval, cancelText);
}
function waitForImageInDOM(_0x1600f1, {
  timeout = 0x7530,
  interval = 0xc8,
  cancelText = null
} = {}) {
  return waitForCondition(() => {
    for (const _0x2c135a of document.images) {
      if (_0x2c135a.src.includes(_0x1600f1) && isVisible(_0x2c135a)) {
        return _0x2c135a;
      }
    }
  }, timeout, interval, cancelText);
}
function waitForImageCountInDOM(_0x5d5498, _0xe170bb = 0x2, {
  timeout = 0x7530,
  interval = 0xc8,
  cancelText = null
} = {}) {
  return waitForCondition(() => {
    const _0x2ae9df = [];
    for (const _0x49bba9 of document.images) {
      if (_0x49bba9.src.includes(_0x5d5498) && isVisible(_0x49bba9)) {
        _0x2ae9df.push(_0x49bba9);
      }
      if (_0x2ae9df.length >= _0xe170bb) {
        return _0x2ae9df;
      }
    }
  }, timeout, interval, cancelText);
}
function waitForCondition(_0x4da2fc, _0x3fb8e6, _0x226806, _0x41c744) {
  return new Promise(_0x370104 => {
    const _0x4d2ec0 = Date.now();
    const _0x3ff3a0 = () => {
      const _0x449711 = _0x4da2fc();
      if (_0x449711) {
        return _0x370104(_0x449711);
      }
      if (_0x41c744 && document.body.innerText.includes(_0x41c744)) {
        return _0x370104(null);
      }
      if (Date.now() - _0x4d2ec0 >= _0x3fb8e6) {
        return _0x370104(null);
      }
      setTimeout(_0x3ff3a0, _0x226806);
    };
    _0x3ff3a0();
  });
}
function sleep(_0x3a6564) {
  return new Promise(_0x256758 => setTimeout(_0x256758, _0x3a6564));
}
async function clickAndVerifyDisappear(_0x5792e6, _0x5df0f9, _0x506d6f = 0x3) {
  for (let _0x46245c = 0x0; _0x46245c < _0x506d6f; _0x46245c++) {
    const _0x33ab46 = _0x5df0f9();
    if (!_0x33ab46) {
      break;
    }
    click(_0x33ab46);
    await sleep(0x12c);
    const _0x408c42 = Array.from(document.querySelectorAll('*')).some(_0x48cd2f => _0x48cd2f.textContent.includes(_0x5792e6) && isVisible(_0x48cd2f));
    if (!_0x408c42) {
      break;
    }
  }
}
function clickElementByImage(_0x4ec7c9) {
  const _0x3177b2 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x3cb874 => Array.from(_0x3cb874.querySelectorAll("img")).some(_0x316867 => _0x4ec7c9.test(_0x316867.src)) && !_0x3cb874.disabled);
  if (_0x3177b2) {
    click(_0x3177b2);
  }
}
function clickElementByImageInElement(_0x14aad2, _0x649776) {
  const _0x352bdb = Array.from(_0x14aad2.querySelectorAll("img")).find(_0x2dac61 => _0x649776.test(_0x2dac61.src));
  if (_0x352bdb) {
    const _0x50fc05 = _0x352bdb.closest("[tabindex=\"0\"]");
    if (_0x50fc05 && !_0x50fc05.disabled) {
      click(_0x50fc05);
    }
  }
}
function clickElementByText(_0x4cc263) {
  const _0x1690c1 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x25e961 => _0x25e961.textContent.includes(_0x4cc263) && !_0x25e961.disabled);
  if (_0x1690c1) {
    click(_0x1690c1);
  }
}
function clickInnermostElementByImage(_0x36f23d) {
  const _0x2ab3f8 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).filter(_0x43e84d => Array.from(_0x43e84d.querySelectorAll("img")).some(_0x3c179d => _0x3c179d.src.includes(_0x36f23d)) && !_0x43e84d.disabled);
  if (_0x2ab3f8.length === 0x0) {
    return;
  }
  let _0x5bd8d4 = _0x2ab3f8[0x0];
  let _0x377940 = 0x0;
  for (const _0x4a5412 of _0x2ab3f8) {
    let _0x3009ea = 0x0;
    let _0x2b9529 = _0x4a5412.parentElement;
    while (_0x2b9529) {
      _0x3009ea++;
      _0x2b9529 = _0x2b9529.parentElement;
    }
    if (_0x3009ea > _0x377940) {
      _0x377940 = _0x3009ea;
      _0x5bd8d4 = _0x4a5412;
    }
  }
  click(_0x5bd8d4);
}
function clickInnermostElementByText(_0x57f5a1) {
  const _0x2693f8 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).filter(_0x33738b => _0x33738b.textContent.includes(_0x57f5a1) && !_0x33738b.disabled);
  if (_0x2693f8.length === 0x0) {
    return;
  }
  let _0x4ff268 = _0x2693f8[0x0];
  let _0x92345f = 0x0;
  _0x2693f8.forEach(_0x235207 => {
    let _0x76453b = 0x0;
    let _0x468c4f = _0x235207.parentElement;
    while (_0x468c4f) {
      _0x76453b++;
      _0x468c4f = _0x468c4f.parentElement;
    }
    if (_0x76453b > _0x92345f) {
      _0x92345f = _0x76453b;
      _0x4ff268 = _0x235207;
    }
  });
  click(_0x4ff268);
}
function clickOutermostElement(_0xb08b59) {
  const _0xe1337c = Array.from(_0xb08b59.querySelectorAll("[tabindex=\"0\"]")).filter(_0x2a0c67 => !_0x2a0c67.disabled);
  if (_0xe1337c.length === 0x0) {
    return;
  }
  let _0x3f1e11 = _0xe1337c[0x0];
  let _0x2d2cf9 = Infinity;
  _0xe1337c.forEach(_0x4eda38 => {
    let _0x5120f4 = 0x0;
    let _0x2ef019 = _0x4eda38.parentElement;
    while (_0x2ef019 && _0x2ef019 !== _0xb08b59) {
      _0x5120f4++;
      _0x2ef019 = _0x2ef019.parentElement;
    }
    if (_0x5120f4 < _0x2d2cf9) {
      _0x2d2cf9 = _0x5120f4;
      _0x3f1e11 = _0x4eda38;
    }
  });
  click(_0x3f1e11);
}
function findImageInDocument(_0x1909a5) {
  return Array.from(document.querySelectorAll("img")).some(_0x3079bb => _0x3079bb.src.includes(_0x1909a5));
}
function findImageInElement(_0x52a8f5, _0x2a9081) {
  return Array.from(_0x52a8f5.querySelectorAll('img')).some(_0x4bc3e5 => _0x2a9081.test(_0x4bc3e5.src));
}
function findTextInDocument(_0x386754) {
  return document.body.textContent.includes(_0x386754);
}
function getMessages() {
  let _0x127537 = [];
  let _0x20de7a = Infinity;
  document.querySelectorAll("span").forEach(_0x4214a1 => {
    if (_0x4214a1.textContent.includes(':')) {
      let _0x46f339 = _0x4214a1.closest('div');
      if (_0x46f339) {
        let _0x27388b = _0x46f339.getBoundingClientRect().width * _0x46f339.getBoundingClientRect().height;
        if (_0x27388b < _0x20de7a) {
          _0x20de7a = _0x27388b;
          _0x127537 = [{
            'div': _0x46f339,
            'spanText': _0x4214a1.textContent
          }];
        } else if (_0x27388b === _0x20de7a) {
          _0x127537.push({
            'div': _0x46f339,
            'spanText': _0x4214a1.textContent
          });
        }
      }
    }
  });
  return _0x127537.length > 0x0 ? _0x127537.map(({
    div: _0x55e151,
    spanText: _0x3c9117
  }) => _0x55e151.textContent.replace(_0x3c9117, '').trim()) : null;
}
function getPlayerRole(_0x5db153) {
  if (!_0x5db153) {
    return "Unknown";
  }
  let _0x3d5e22 = "Other";
  const _0x102528 = {
    'juniorwerewolf': "Junior Werewolf",
    'junior_werewolf': "Junior Werewolf",
    'split_wolf': "Split Wolf",
    'splitwolf': "Split Wolf",
    'wolf': "Wolf",
    'priest': "Priest",
    'vigilante': "Shooter",
    'gunner': "Shooter"
  };
  for (const _0x189c38 of Object.keys(_0x102528)) {
    if (_0x5db153.includes(_0x189c38)) {
      _0x3d5e22 = _0x102528[_0x189c38];
      break;
    }
  }
  return _0x3d5e22;
}
async function shooterAction(_0x5dbf62, _0x3da36c, _0xefcf26, _0x42d1b3 = 0x2) {
  console.log("[Λ] shooterAction: looking for", _0x42d1b3, "vote marker(s)");
  if (_0x42d1b3 > 0x4) {
    return;
  }
  const _0xd78aab = await waitForImageCountInDOM('vote_day_selected', _0x42d1b3, {
    'timeout': 0x15f90,
    'cancelText': "Continue"
  });
  if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
    return;
  }
  if (!_0xd78aab) {
    return;
  }
  console.log("[Λ] Clicking bullet icon...");
  clickElementByImage(/.*gunner_bullet.*\.png/);
  await sleep(0xc8);
  const _0x524327 = _0xefcf26.find(_0x1bf01f => findImageInElement(_0x1bf01f, new RegExp(".*vote_day_selected.*\\.png")) && !_0x3da36c.includes(_0x1bf01f) && !_0x1bf01f.textContent.includes(_0x5dbf62.name));
  if (_0x524327) {
    console.log("[Λ] Shooter found target:", _0x524327?.["textContent"]["trim"]());
    clickElementByImageInElement(_0x524327, /.*gunner_voting_shoot.*\.png/);
    return;
  }
  await sleep(0x1f4);
  await shooterAction(_0x5dbf62, _0x3da36c, _0xefcf26, _0x42d1b3 + 0x1);
}
async function inGameDay(_0x9c2380, _0x251e3b, _0x3217f1, _0x501c32) {
  if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
    return;
  }
  console.log("[Λ] inGameDay(): role =", _0x9c2380.role, "| Lovers =", _0x251e3b.map(_0x3af2d9 => _0x3af2d9?.['textContent']["trim"]()));
  if (!wolfSet.has(_0x9c2380.coupleRole1) && !wolfSet.has(_0x9c2380.coupleRole2)) {
    if (wolfSet.has(_0x9c2380.role)) {
      let _0x252689 = getMessages()?.["flatMap"](_0x52e9cb => _0x52e9cb.match(/\b\d{1,2}\b/g) || []);
      if (_0x252689?.['some'](_0x23d1f1 => _0x23d1f1 == _0x9c2380.number)) {
        return;
      }
      if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
        return;
      }
      console.log("[Λ] Wolf sending number:", _0x9c2380.number);
      let _0x5ad7aa = document.querySelector("textarea");
      Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set.call(_0x5ad7aa, _0x9c2380.number);
      _0x5ad7aa.dispatchEvent(new Event("input", {
        'bubbles': true
      }));
      _0x5ad7aa.dispatchEvent(new Event('change', {
        'bubbles': true
      }));
      clickElementByImage(/.*icon_send.*\.png/);
      sleep(0x3e8);
    } else {
      const _0x517eff = {
        'Priest': {
          'triggerRegex': /.*priest_holy_water.*\.png/,
          'actionRegex': /.*priest_holy_water.*\.png/
        },
        'Shooter': {
          'triggerRegex': /.*gunner_bullet.*\.png/,
          'actionRegex': /.*gunner_voting_shoot.*\.png/
        }
      };
      const _0x271493 = _0x517eff[_0x9c2380.role];
      if (!_0x271493) {
        return;
      }
      await waitForImageInDOM("vote_day_selected", {
        'timeout': 0x15f90,
        'cancelText': "Continue"
      });
      if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
        return;
      }
      console.log("[Λ] Role ability triggered:", _0x9c2380.role);
      clickElementByImage(_0x271493.triggerRegex);
      await sleep(0xc8);
      const _0x4bd03e = _0x501c32.find(_0x5bf5ba => findImageInElement(_0x5bf5ba, /.*vote_day_selected.*\.png/));
      if (_0x4bd03e) {
        clickElementByImageInElement(_0x4bd03e, _0x271493.actionRegex);
      }
    }
  } else {
    if (!_0x3217f1.some(_0x33054e => _0x33054e.some(_0x29857f => _0x29857f.includes("hand-skin")))) {
      console.log("[Λ] Voting couple:", wolfSet.has(_0x9c2380.coupleRole1) ? _0x251e3b[0x0].textContent.trim() : _0x251e3b[0x1].textContent.trim());
      clickOutermostElement(wolfSet.has(_0x9c2380.coupleRole1) ? _0x251e3b[0x0] : _0x251e3b[0x1]);
    }
    if (_0x9c2380.role === 'Priest') {
      console.log("[Λ] Role ability triggered:", _0x9c2380.role);
      clickElementByImage(/.*priest_holy_water.*\.png/);
      setTimeout(() => {
        const _0x49b55e = _0x501c32.find(_0x42be59 => findImageInElement(_0x42be59, /.*priest_holy_water.*\.png/));
        if (_0x49b55e) {
          clickElementByImageInElement(_0x49b55e, /.*priest_holy_water.*\.png/);
        }
      }, 0xc8);
    } else {
      if (_0x9c2380.role === "Shooter") {
        await shooterAction(_0x9c2380, _0x251e3b, _0x501c32);
      }
    }
  }
}
async function inGameNight(_0x5c3e10, _0x3f975b, _0x5bcbd9) {
  if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
    return;
  }
  console.log("[Λ] inGameNight(): role =", _0x5c3e10.role);
  const _0xd667dc = (_0x4c383a, _0x579d81) => {
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
      return;
    }
    console.log("[Λ] sendAction:", _0x4c383a, "| Target:", _0x579d81?.["textContent"]["trim"]());
    const _0x585d5b = document.querySelector("textarea");
    Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set.call(_0x585d5b, _0x4c383a);
    _0x585d5b.dispatchEvent(new Event("input", {
      'bubbles': true
    }));
    _0x585d5b.dispatchEvent(new Event("change", {
      'bubbles': true
    }));
    clickElementByImage(/.*icon_send.*\.png/);
    if (_0x579d81 && (_0x5c3e10.coupleRole1 !== "Priest" && _0x5c3e10.coupleRole2 !== 'Priest' || _0x5c3e10.role === "Junior Werewolf")) {
      clickOutermostElement(_0x579d81);
    }
  };
  const _0x525eca = async _0x129089 => {
    if (wolfSet.has(_0x5c3e10.coupleRole1) && wolfSet.has(_0x5c3e10.coupleRole2) || wolfSet.has(_0x5c3e10.coupleRole1) && _0x5c3e10.coupleRole2 === null) {
      return;
    }
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw")) {
      return;
    }
    console.log("[Λ] handleWolfTag() triggered for:", _0x5c3e10.role);
    await waitForTextInDOM('25s', {
      'cancelText': 'Continue'
    });
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw") || document.body.textContent.includes("Voting")) {
      return;
    }
    const _0x1fc4b9 = !wolfSet.has(_0x5c3e10.coupleRole1);
    _0xd667dc("Who? Mine " + (_0x1fc4b9 ? _0x5c3e10.coupleNumber1 : _0x5c3e10.coupleNumber2), _0x1fc4b9 ? _0x3f975b[0x0] : _0x3f975b[0x1]);
    await waitForExactText('5s', {
      'cancelText': "Continue"
    });
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw") || document.body.textContent.includes("Voting")) {
      return;
    }
    clickElementByImage(_0x129089);
    setTimeout(() => {
      const _0x193dc2 = getMessages();
      const _0x511a75 = _0x193dc2?.['flatMap'](_0x361c1f => (_0x361c1f.match(/\b\d{1,2}\b/g) || []).filter(_0x5280c1 => ![_0x5c3e10.number, _0x5c3e10.coupleNumber1, _0x5c3e10.coupleNumber2].includes(_0x5280c1)))[0x0];
      if (!_0x511a75) {
        return;
      }
      console.log("[Λ] Target number chosen:", _0x511a75);
      const _0x47a2cd = _0x5bcbd9[parseInt(_0x511a75, 0xa) - 0x1];
      const _0x4c6e9d = [..._0x47a2cd.querySelectorAll('img')].find(_0x589b98 => _0x129089.test(_0x589b98.src));
      const _0xb7afd5 = _0x4c6e9d?.["closest"]("[tabindex=\"0\"]:not([disabled])");
      if (_0xb7afd5) {
        click(_0xb7afd5);
      }
    }, 0xc8);
    await waitForTextInDOM("Voting", {
      'cancelText': "Continue"
    });
  };
  if (_0x5c3e10.role === "Wolf") {
    await waitForTextInDOM('25s', {
      'cancelText': "Continue"
    });
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw") || document.body.textContent.includes("Voting")) {
      return;
    }
    const _0x3ee67f = _0x5c3e10.coupleRole1;
    const _0x3d3181 = _0x5c3e10.coupleRole2;
    if (wolfSet.has(_0x3ee67f) && wolfSet.has(_0x3d3181) || wolfSet.has(_0x3ee67f) && _0x3d3181 === null) {
      return;
    }
    const _0x48aa63 = _0x3ee67f === "Priest" || _0x3d3181 === "Priest";
    const _0x3bc5bd = !wolfSet.has(_0x5c3e10.coupleRole1);
    const _0x1749e8 = _0x3bc5bd ? _0x5c3e10.coupleNumber1 : _0x5c3e10.coupleNumber2;
    const _0x529252 = _0x3bc5bd ? _0x3f975b[0x0] : _0x3f975b[0x1];
    _0xd667dc(_0x48aa63 ? _0x1749e8 + " priest" : _0x1749e8, _0x529252);
    await waitForExactText('5s', {
      'cancelText': "Continue"
    });
    if (document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw") || document.body.textContent.includes("Voting")) {
      return;
    }
    let _0x5dba1a = 0x0;
    for (let _0x3986af = _0x5bcbd9.length; _0x5dba1a < _0x3986af; _0x5dba1a++) {
      const _0x23a4c8 = _0x5bcbd9[_0x5dba1a];
      const _0x3db97a = _0x23a4c8.querySelectorAll("img");
      let _0x1ecec2;
      let _0x3932fa = '';
      for (let _0x18024f = _0x3db97a.length - 0x1; _0x18024f >= 0x0; _0x18024f--) {
        _0x1ecec2 = _0x3db97a[_0x18024f].src;
        if (_0x1ecec2.indexOf("vote_day") !== -0x1 || _0x1ecec2.indexOf('vote_werewolves') !== -0x1 || _0x1ecec2.indexOf('hand-skin') !== -0x1) {
          continue;
        }
        _0x3932fa = _0x1ecec2.slice(_0x1ecec2.lastIndexOf('/') + 0x1);
        break;
      }
      if (!_0x3932fa || getPlayerRole(_0x3932fa) !== "Junior Werewolf") {
        continue;
      }
      for (let _0x34461b = 0x0; _0x34461b < _0x3db97a.length; _0x34461b++) {
        if (_0x3db97a[_0x34461b].src.indexOf("vote_werewolves_voter") !== -0x1) {
          if (!_0x48aa63) {
            clickOutermostElement(_0x529252);
          }
          break;
        }
      }
    }
    await waitForTextInDOM("Voting", {
      'cancelText': 'Continue'
    });
  } else {
    if (_0x5c3e10.role === "Junior Werewolf") {
      await _0x525eca(/.*junior_werewolf_selection_marker.*\.png/);
    } else {
      if (_0x5c3e10.role === "Split Wolf") {
        await _0x525eca(/.*splitwolf_bind.*\.png/);
      }
    }
  }
}
async function inGame(_0x487724) {
  const _0x2f5eae = Array.from(document.querySelectorAll("[style*=\"flex-direction: column\"]")).filter(_0x385261 => {
    const _0x51bb17 = _0x385261.textContent.trim();
    return /^\d+\s/.test(_0x51bb17);
  });
  const _0x5bd863 = _0x2f5eae.filter(_0x5c2869 => {
    const _0x1e2732 = Array.from(_0x5c2869.querySelectorAll("img"));
    return _0x1e2732.some(_0x43fea8 => _0x43fea8.src.includes('cupid_select_lovers_sticker_small'));
  });
  const _0x2c32b7 = _0x5bd863.filter(_0x4373a6 => !_0x4373a6.textContent.includes(_0x487724));
  while (_0x2c32b7.length < 0x2) {
    _0x2c32b7.push(null);
  }
  const _0x591321 = _0x472934 => {
    return _0x472934.map(_0x292847 => {
      return Array.from(_0x292847.querySelectorAll("img")).map(_0x213fc5 => {
        const _0x376733 = _0x213fc5.src.split('/');
        return _0x376733[_0x376733.length - 0x1];
      });
    });
  };
  const _0x5d4cc7 = _0x591321(_0x5bd863.filter(_0x3a916f => !_0x3a916f.textContent.includes(_0x487724)));
  const _0x41d678 = _0x591321(_0x5bd863.filter(_0x1b18de => _0x1b18de.textContent.includes(_0x487724)));
  const _0x53501e = _0x35be62 => {
    return _0x35be62.map(_0x4430cd => {
      var _0x3fff7c = _0x4430cd.length - 0x1;
      while (_0x4430cd[_0x3fff7c].includes('vote_day') || _0x4430cd[_0x3fff7c].includes("vote_werewolves") || _0x4430cd[_0x3fff7c].includes("hand-skin")) {
        _0x3fff7c -= 0x1;
      }
      return _0x4430cd[_0x3fff7c];
    });
  };
  const _0x47cd94 = _0x53501e(_0x41d678);
  const _0x4507bd = _0x53501e(_0x5d4cc7);
  const _0x15eda2 = _0x2f5eae.find(_0x5b14fd => _0x5b14fd.textContent.includes(_0x487724));
  const _0x3b9fec = {
    'name': _0x487724,
    'number': _0x15eda2 ? _0x15eda2.textContent.match(/\d+/) ? _0x15eda2.textContent.match(/\d+/)[0x0] : null : null,
    'role': getPlayerRole(_0x47cd94[0x0]),
    'coupleNumber1': _0x2c32b7[0x0] ? _0x2c32b7[0x0].textContent.match(/\d+/) ? _0x2c32b7[0x0].textContent.match(/\d+/)[0x0] : null : null,
    'coupleRole1': _0x4507bd[0x0] ? getPlayerRole(_0x4507bd[0x0]) : null,
    'coupleNumber2': _0x2c32b7[0x1] ? _0x2c32b7[0x1].textContent.match(/\d+/) ? _0x2c32b7[0x1].textContent.match(/\d+/)[0x0] : null : null,
    'coupleRole2': _0x4507bd[0x1] ? getPlayerRole(_0x4507bd[0x1]) : null
  };
  console.log("[Λ] Player object:", _0x3b9fec);
  console.log("[Λ] Detected phase:", getLabelBeforeTime() === "Discussion" || getLabelBeforeTime() === "Voting" ? "Day" : getLabelBeforeTime() === '' ? "Night" : 'Unknown');
  if (getLabelBeforeTime() === "Discussion" || getLabelBeforeTime() === "Voting") {
    await inGameDay(_0x3b9fec, _0x2c32b7, _0x41d678, _0x2f5eae);
  } else {
    if (getLabelBeforeTime() === '') {
      await inGameNight(_0x3b9fec, _0x2c32b7, _0x2f5eae);
    }
  }
}
async function playAgain() {
  if (document.body.innerText.includes("Waiting for players")) {
    return;
  }
  await clickAndVerifyDisappear("Continue", () => Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x482233 => _0x482233.textContent.includes('Continue') && isVisible(_0x482233) && _0x482233.getBoundingClientRect().top > 0x64));
  await waitForTextInDOM("Play again", {
    'cancelText': "INVENTORY"
  });
  const _0x56b819 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x2821dd => _0x2821dd.textContent.includes("Play again") && isVisible(_0x2821dd) && _0x2821dd.getBoundingClientRect().top > 0x64);
  if (_0x56b819) {
    click(_0x56b819);
  }
  await sleep(0x12c);
  await waitForCondition(() => {
    return Array.from(document.querySelectorAll("[tabindex=\"0\"]")).some(_0x5c26cd => {
      if (!_0x5c26cd.textContent.includes('OK') || !isVisible(_0x5c26cd) || _0x5c26cd.getBoundingClientRect().top <= 0x64) {
        return false;
      }
      const _0x37ff64 = Array.from(_0x5c26cd.parentElement?.["querySelectorAll"]("[tabindex=\"0\"]") || []).some(_0x199b8a => _0x199b8a !== _0x5c26cd && _0x199b8a.textContent.includes("Cancel") && isVisible(_0x199b8a));
      return _0x37ff64;
    });
  }, 0xbb8, 0xc8);
  const _0x400509 = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x2345ed => {
    if (!_0x2345ed.textContent.includes('OK') || !isVisible(_0x2345ed) || _0x2345ed.getBoundingClientRect().top <= 0x64) {
      return false;
    }
    const _0xb83b5a = Array.from(_0x2345ed.parentElement?.["querySelectorAll"]("[tabindex=\"0\"]") || []).some(_0x49911d => _0x49911d !== _0x2345ed && _0x49911d.textContent.includes('Cancel') && isVisible(_0x49911d));
    return _0xb83b5a;
  });
  if (_0x400509) {
    click(_0x400509);
  }
  await sleep(0x12c);
}
function getLabelBeforeTime() {
  const _0x284258 = document.querySelectorAll("div");
  for (let _0x242ae3 = 0x0; _0x242ae3 < _0x284258.length; _0x242ae3++) {
    const _0x12a2aa = _0x284258[_0x242ae3].textContent;
    const _0x4a3c10 = _0x12a2aa && _0x12a2aa.match(/^([\S\s]*?)\s*\d{1,2}s$/);
    if (_0x4a3c10) {
      return _0x4a3c10[0x1].trim();
    }
  }
  return null;
}
function isDay() {
  return getLabelBeforeTime() === "Discussion" || getLabelBeforeTime() === "Voting";
}
function isNight() {
  return getLabelBeforeTime() === '';
}
function gameIsOver() {
  return document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw");
}
async function main(_0x3d69f0) {
  let _0x4eebe4 = document.body.textContent;
  if (_0x4eebe4.includes("MORE PLAYERS REQUIRED") || _0x4eebe4.includes("START GAME")) {
    const _0x552f7d = Array.from(document.querySelectorAll("[tabindex=\"0\"]")).find(_0x511def => _0x511def.textContent.includes("START GAME") && isVisible(_0x511def) && _0x511def.getBoundingClientRect().top > 0x64);
    if (_0x552f7d) {
      click(_0x552f7d);
    }
  }
  if (_0x4eebe4.includes("SELECT A ROLE") || _0x4eebe4.includes("Team: You belong to")) {
    if (findImageInDocument('instigator')) {
      return clickInnermostElementByImage("cupid");
    }
  }
  if (_0x4eebe4.includes("Continue")) {
    return await playAgain();
  }
  if ((_0x4eebe4.includes("Welcome to the werewolves chat.") || _0x4eebe4.includes('Voting')) && !(document.body.textContent.includes("Continue") || document.body.textContent.includes("Play again") || document.body.textContent.includes("Victory") || document.body.textContent.includes('Defeat') || document.body.textContent.includes("Draw"))) {
    await inGame(_0x3d69f0);
  }
}
const wolfSet = new Set(["Wolf", "Junior Werewolf", "Split Wolf"]);
// Lokaler Heartbeat an http://localhost:3000/api/heartbeat
function sendHeartbeat() {
  fetch('http://localhost:3000/api/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp: Date.now() })
  })
  .then(res => console.log('[Heartbeat] Status', res.status))
  .catch(err => console.error('[Heartbeat] Fehler:', err.message));
}
let BOT_RUNNING = false;
let ACTIVE_NAME = '';
let loopHandle = null;
function startBot(_0x1558b2) {
  if (BOT_RUNNING) {
    return;
  }
  BOT_RUNNING = true;
  ACTIVE_NAME = _0x1558b2;
  console.log("[Concrete] Starting bot as", _0x1558b2);
  sendHeartbeat(_0x1558b2);
  (async function _0x4b4364() {
    try {
      await main(_0x1558b2);
    } catch (_0x31aa26) {
      console.error("[Concrete] main() error:", _0x31aa26);
    } finally {
      if (BOT_RUNNING) {
        loopHandle = setTimeout(_0x4b4364, 0x3e8);
      }
    }
  })();
}
function stopBot() {
  if (!BOT_RUNNING) {
    return;
  }
  BOT_RUNNING = false;
  console.log("[Concrete] Bot paused");
  if (loopHandle) {
    clearTimeout(loopHandle);
  }
}
chrome.runtime.onMessage.addListener((_0x35ab32, _0x5979e0, _0x1d4dd0) => {
  if (_0x35ab32.action !== 'toggleBot') {
    return;
  }
  if (_0x35ab32.enabled) {
    startBot(_0x35ab32.name);
  } else {
    stopBot();
  }
  _0x1d4dd0?.({
    'ok': true
  });
  return true;
});