/**
 * Forces Chatbase widget launcher/header avatars to the About graduation portrait.
 * Chatbase is configured outside this repo; this DOM override applies on every page.
 */
(function () {
  "use strict";

  var AVATAR =
    "https://seunghyun-lee.com/assets/images/about/amy-chat-about.png?v=20260622about";

  var LEGACY_PATTERNS = [
    /amy-headshot/i,
    /amy-chat-avatar/i,
    /amy-avatar-stole/i,
    /chatbase\.user/i,
    /chatbase\.co/i,
  ];

  function isChatbaseContext(node) {
    if (!node || node.nodeType !== 1) return false;
    var el = node;
    while (el && el !== document.documentElement) {
      var id = (el.id || "").toLowerCase();
      var cls = typeof el.className === "string" ? el.className.toLowerCase() : "";
      if (
        id.indexOf("chatbase") !== -1 ||
        cls.indexOf("chatbase") !== -1 ||
        el.getAttribute("data-chatbase") != null
      ) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  function shouldOverride(img) {
    if (!(img instanceof HTMLImageElement)) return false;
    var src = img.currentSrc || img.src || img.getAttribute("src") || "";
    if (src === AVATAR) return false;
    if (isChatbaseContext(img)) return true;
    return LEGACY_PATTERNS.some(function (pattern) {
      return pattern.test(src);
    });
  }

  function applyAvatar(img) {
    if (!shouldOverride(img)) return;
    img.src = AVATAR;
    img.setAttribute("src", AVATAR);
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll("img").forEach(applyAvatar);
  }

  function onMutations(mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) {
        applyAvatar(mutation.target);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.tagName === "IMG") applyAvatar(node);
        else scan(node);
      });
    });
  }

  function start() {
    scan(document.body || document.documentElement);
    new MutationObserver(onMutations).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
