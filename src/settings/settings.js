import { Conf, strip } from "../lib/lib";
import "./settings.css";

var keyBindings = [];

function recordKeyPress(element) {
  if (
    (element.keyCode >= 48 && element.keyCode <= 57) || // Numbers 0-9
    (element.keyCode >= 65 && element.keyCode <= 90) || // Letters A-Z
    Conf.keyCodeLUT[element.keyCode] // Other character keys
  ) {
    element.target.value =
      Conf.keyCodeLUT[element.keyCode] || String.fromCharCode(element.keyCode);
    element.target.keyCode = element.keyCode;

    element.preventDefault(); // Why?
    element.stopPropagation(); // Why?
  } else if (element.keyCode === 8) {
    // Clear input when backspace pressed
    element.target.value = "";
  } else if (element.keyCode === 27) {
    // When esc clicked, clear input
    element.target.value = "null";
    element.target.keyCode = null;
  }
}

function inputFilterNumbersOnly(element) {
  var char = String.fromCharCode(element.keyCode);
  if (
    !/[\d\.]$/.test(char) ||
    !/^\d+(\.\d*)?$/.test(element.target.value + char)
  ) {
    element.preventDefault();
    element.stopPropagation();
  }
}

function inputFocus(e) {
  element.target.value = "";
}

function inputBlur(e) {
  element.target.value =
    Conf.keyCodeLUT[element.target.keyCode] ||
    String.fromCharCode(element.target.keyCode);
}

function updateShortcutInputText(inputId, keyCode) {
  document.getElementById(inputId).value =
    Conf.keyCodeLUT[keyCode] || String.fromCharCode(keyCode);
  document.getElementById(inputId).keyCode = keyCode;
}

function updateCustomShortcutInputText(inputItem, keyCode) {
  inputItem.value = Conf.keyCodeLUT[keyCode] || String.fromCharCode(keyCode);
  inputItem.keyCode = keyCode;
}

// List of custom actions for which customValue should be disabled
var customActionsNoValues = ["pause", "muted", "mark", "jump", "display"];

function add_shortcut() {
  var html = `<select class="customDo">
    <option value="slower">Decrease speed</option>
    <option value="faster">Increase speed</option>
    <option value="rewind">Rewind</option>
    <option value="advance">Advance</option>
    <option value="reset">Reset speed</option>
    <option value="fast">Preferred speed</option>
    <option value="muted">Mute</option>
    <option value="pause">Pause</option>
    <option value="mark">Set marker</option>
    <option value="jump">Jump to marker</option>
    <option value="display">Show/hide controller</option>
    </select>
    <input class="customKey" type="text" placeholder="press a key"/>
    <input class="customValue" type="text" placeholder="value (0.10)"/>
    <select class="customForce">
    <option value="false">Do not disable website key bindings</option>
    <option value="true">Disable website key bindings</option>
    </select>
    <button class="removeParent">X</button>`;
  var div = document.createElement("div");
  div.setAttribute("class", "row customs");
  div.innerHTML = html;
  var customs_element = document.getElementById("customs");
  customs_element.insertBefore(
    div,
    customs_element.children[customs_element.childElementCount - 1]
  );
}

function createKeyBindings(item) {
  const action = item.querySelector(".customDo").value;
  const key = item.querySelector(".customKey").keyCode;
  const value = Number(item.querySelector(".customValue").value);
  const force = item.querySelector(".customForce").value;
  const predefined = !!item.id; //item.id ? true : false;

  keyBindings.push({
    action: action,
    key: key,
    value: value,
    force: force,
    predefined: predefined,
  });
}

// Validates settings before saving
function validate() {
  var valid = true;
  var status = document.getElementById("status");

  // Ideally, in the future the blacklist feature will become deprecated in
  // favor of a per-url/regex configuration.

  var blacklist = document.getElementById("blacklist");

  blacklist.value.split("\n").forEach((entry) => {
    // Remove whitespace.

    // This was formerly done upstream on line 183 via
    // chrome.storage.sync.set({blacklist: blacklist.replace(regStrip, "")}).
    // Pushing this behavior into the top of the stack is a feature, not a bug.
    // This behavior must be known and easily discovered because it has the
    // potential to violate expectations.

    entry = strip(entry);

    if (entry.startsWith("/")) {
      try {
        var parts = entry.split("/");

        if (parts.length < 3) throw "invalid regex";

        var flags = parts.pop();
        var regex = parts.slice(1).join("/");

        var regexp = new RegExp(regex, flags);
      } catch (err) {
        status.textContent =
          'Error: Invalid blacklist regex: "' +
          entry +
          '". Unable to save. Try wrapping it in foward slashes.';
        valid = false;
        return;
      }
    }
  });
  return valid;
}

// Saves options to chrome.storage
function save_options() {
  if (validate() === false) {
    return;
  }
  keyBindings = [];
  Array.from(document.querySelectorAll(".customs")).forEach((item) =>
    createKeyBindings(item)
  ); // Remove added shortcuts

  var rememberSpeed = document.getElementById("rememberSpeed").checked;
  var forceLastSavedSpeed = document.getElementById(
    "forceLastSavedSpeed"
  ).checked;
  var audioBoolean = document.getElementById("audioBoolean").checked;
  var enabled = document.getElementById("enabled").checked;
  var startHidden = document.getElementById("startHidden").checked;
  var controllerOpacity = document.getElementById("controllerOpacity").value;
  var blacklist = document.getElementById("blacklist").value;

  chrome.storage.sync.remove([
    "resetSpeed",
    "speedStep",
    "fastSpeed",
    "rewindTime",
    "advanceTime",
    "resetKeyCode",
    "slowerKeyCode",
    "fasterKeyCode",
    "rewindKeyCode",
    "advanceKeyCode",
    "fastKeyCode",
  ]);
  chrome.storage.sync.set(
    {
      rememberSpeed: rememberSpeed,
      forceLastSavedSpeed: forceLastSavedSpeed,
      audioBoolean: audioBoolean,
      enabled: enabled,
      startHidden: startHidden,
      controllerOpacity: controllerOpacity,
      keyBindings: keyBindings,
      blacklist: blacklist,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved";
      setTimeout(function () {
        status.textContent = "";
      }, 1000);
    }
  );
}

// Restores options from chrome.storage
function restore_options() {
  chrome.storage.sync.get(Conf.defaults, function (storage) {
    document.getElementById("rememberSpeed").checked = storage.rememberSpeed;
    document.getElementById("forceLastSavedSpeed").checked =
      storage.forceLastSavedSpeed;
    document.getElementById("audioBoolean").checked = storage.audioBoolean;
    document.getElementById("enabled").checked = storage.enabled;
    document.getElementById("startHidden").checked = storage.startHidden;
    document.getElementById("controllerOpacity").value =
      storage.controllerOpacity;
    document.getElementById("blacklist").value = storage.blacklist;

    // ensure that there is a "display" binding for upgrades from versions that had it as a separate binding
    if (storage.keyBindings.filter((x) => x.action == "display").length == 0) {
      storage.keyBindings.push({
        action: "display",
        value: 0,
        force: false,
        predefined: true,
      });
    }

    for (let i in storage.keyBindings) {
      var item = storage.keyBindings[i];
      if (item.predefined) {
        //do predefined ones because their value needed for overlay
        // document.querySelector("#" + item["action"] + " .customDo").value = item["action"];
        if (item["action"] == "display" && typeof item["key"] === "undefined") {
          item["key"] = storage.displayKeyCode || Conf.defaults.displayKeyCode; // V
        }

        if (customActionsNoValues.includes(item["action"]))
          document.querySelector(
            "#" + item["action"] + " .customValue"
          ).disabled = true;

        updateCustomShortcutInputText(
          document.querySelector("#" + item["action"] + " .customKey"),
          item["key"]
        );
        document.querySelector("#" + item["action"] + " .customValue").value =
          item["value"];
        document.querySelector("#" + item["action"] + " .customForce").value =
          item["force"];
      } else {
        // new ones
        add_shortcut();
        const dom = document.querySelector(".customs:last-of-type");
        dom.querySelector(".customDo").value = item["action"];

        if (customActionsNoValues.includes(item["action"]))
          dom.querySelector(".customValue").disabled = true;

        updateCustomShortcutInputText(
          dom.querySelector(".customKey"),
          item["key"]
        );
        dom.querySelector(".customValue").value = item["value"];
        dom.querySelector(".customForce").value = item["force"];
      }
    }
  });
}

function restore_defaults() {
  chrome.storage.sync.set(Conf.defaults, function () {
    restore_options();
    document
      .querySelectorAll(".removeParent")
      .forEach((button) => button.click()); // Remove added shortcuts
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Default options restored";
    setTimeout(function () {
      status.textContent = "";
    }, 1000);
  });
}

function show_experimental() {
  document
    .querySelectorAll(".customForce")
    .forEach((item) => (item.style.display = "inline-block"));
}

document.addEventListener("DOMContentLoaded", function () {
  restore_options();

  document.getElementById("save").addEventListener("click", save_options);
  document.getElementById("add").addEventListener("click", add_shortcut);
  document
    .getElementById("restore")
    .addEventListener("click", restore_defaults);
  document
    .getElementById("experimental")
    .addEventListener("click", show_experimental);

  function eventCaller(event, className, funcName) {
    if (!event.target.classList.contains(className)) {
      return;
    }
    funcName(event);
  }

  document.addEventListener("keypress", (event) => {
    eventCaller(event, "customValue", inputFilterNumbersOnly);
  });
  document.addEventListener("focus", (event) => {
    eventCaller(event, "customKey", inputFocus);
  });
  document.addEventListener("blur", (event) => {
    eventCaller(event, "customKey", inputBlur);
  });
  document.addEventListener("keydown", (event) => {
    eventCaller(event, "customKey", recordKeyPress);
  });
  document.addEventListener("click", (event) => {
    eventCaller(event, "removeParent", function () {
      event.target.parentNode.remove();
    });
  });
  document.addEventListener("change", (event) => {
    eventCaller(event, "customDo", function () {
      if (customActionsNoValues.includes(event.target.value)) {
        event.target.nextElementSibling.nextElementSibling.disabled = true;
        event.target.nextElementSibling.nextElementSibling.value = 0;
      } else {
        event.target.nextElementSibling.nextElementSibling.disabled = false;
      }
    });
  });
});
