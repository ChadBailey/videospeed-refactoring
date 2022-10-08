import "./popup.css";

import { default as npm_package } from "../../package.json";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#config").addEventListener("click", function () {
    window.open(chrome.runtime.getURL("assets/html/settings.html"));
  });

  document.querySelector("#about").addEventListener("click", function () {
    window.open(npm_package.homepage);
  });

  document.querySelector("#feedback").addEventListener("click", function () {
    window.open(npm_package.bugs.url);
  });

  document.querySelector("#enable").addEventListener("click", function () {
    toggleEnabled(true, settingsSavedReloadMessage);
  });

  document.querySelector("#disable").addEventListener("click", function () {
    toggleEnabled(false, settingsSavedReloadMessage);
  });

  chrome.storage.sync.get({ enabled: true }, function (storage) {
    toggleEnabledUI(storage.enabled);
  });

  function toggleEnabled(enabled, callback) {
    chrome.storage.sync.set(
      {
        enabled: enabled,
      },
      function () {
        toggleEnabledUI(enabled);
        if (callback) callback(enabled);
      }
    );
  }

  function toggleEnabledUI(enabled) {
    console.log(`Hiding/unhiding VSC. Enabled: ${enabled}`);
    // Having two buttons is a little silly when updating only one to reflect
    // current state would be ideal.
    document.querySelector("#enable").style.display = `${
      enabled ? "none" : ""
    }`;
    document.querySelector("#disable").style.display = `${
      enabled ? "" : "none"
    }`;

    // Legacy code safekeeping.

    // ISSUE #1:
    // The original method was to add/remove the "hide" class. I do not know
    // why this stopped working, I only know that directly applying the display
    // style resolved it. This should be a target for clean up in a future
    // release.

    // Additionally, this new method generates a security/performance warning
    // when submitting to Firefox. See https://github.com/ChadBailey/videospeed-refactoring/issues/20

    // document.querySelector("#enable").classList.toggle("hide", enabled);
    // document.querySelector("#disable").classList.toggle("hide", !enabled);

    // ISSUE #2:
    // browserAction was removed in Manifest V3 and therefore showing the
    // disabled icon when VSC is disabled stopped working when we moved to
    // Manifest v3
    //
    // TODO: Migrate to https://developer.chrome.com/docs/extensions/reference/declarativeContent/

    // const suffix = `${enabled ? "" : "_disabled"}.png`;
    // console.log(`Setting icon suffix: ${suffix}`);

    // chrome.browserAction.setIcon({
    //   path: {
    //     19: "../../assets/images/icon19" + suffix,
    //     38: "../../assets/images/icon38" + suffix,
    //     48: "../../assets/images/icon48" + suffix
    //   }
    // });
  }

  function settingsSavedReloadMessage(enabled) {
    setStatusMessage(
      `${enabled ? "Enabled" : "Disabled"}. Reload page to see changes`
    );
  }

  function setStatusMessage(str) {
    const status_element = document.querySelector("#status");
    status_element.classList.toggle("hide", false);
    status_element.innerText = str;
  }
});
