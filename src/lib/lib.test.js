const { defaultSettings } = require("./constants");
const { strip, Conf } = require("./lib");

describe("Conf Object", () => {
  let conf;
  beforeEach(() => {
    conf = new Conf();
  });
  it("Should have the static property stripRegEx", () => {
    expect(Conf.regexStrip).toStrictEqual(/^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm);
  });
});

describe("Regex utilities", () => {
  it("Strip should return a string with no whitespace, only newlines", () => {
    input = "    test\n \t       ";
    expected_result = "test\n";
    expect(strip(input)).toStrictEqual(expected_result);
  });
});

// - Planned for Conf class

// constructor() {
//   this.ready = false;
//   this.speeds = {};
//   this.lastSpeed = 1.0; // default 1x
//   this.enabled = true; // default enabled
//   this.speeds = {}; // empty object to hold speed for each source
//   this.mediaElements = [];
//   this.keybindings = [];
// }
// setupLogger() {
//   this.logger = new Logger();
//   //  = tc.settings.logLevel;
//   // logger.defaultLogLevel = tc.settings.defaultLogLevel;
// }
// applyOptions() {
//   // Saves options to chrome.storage
//   if (validate() === false) {
//     return;
//   }
//   keyBindings = [];
//   Array.from(document.querySelectorAll(".customs")).forEach((item) =>
//     createKeyBindings(item)
//   ); // Remove added shortcuts

//   var rememberSpeed = document.getElementById("rememberSpeed").checked;
//   var forceLastSavedSpeed = document.getElementById(
//     "forceLastSavedSpeed"
//   ).checked;
//   var audioBoolean = document.getElementById("audioBoolean").checked;
//   var enabled = document.getElementById("enabled").checked;
//   var startHidden = document.getElementById("startHidden").checked;
//   var controllerOpacity = document.getElementById("controllerOpacity").value;
//   var blacklist = document.getElementById("blacklist").value;

//   chrome.storage.sync.remove([
//     "resetSpeed",
//     "speedStep",
//     "fastSpeed",
//     "rewindTime",
//     "advanceTime",
//     "resetKeyCode",
//     "slowerKeyCode",
//     "fasterKeyCode",
//     "rewindKeyCode",
//     "advanceKeyCode",
//     "fastKeyCode",
//   ]);
//   chrome.storage.sync.set(
//     {
//       rememberSpeed: rememberSpeed,
//       forceLastSavedSpeed: forceLastSavedSpeed,
//       audioBoolean: audioBoolean,
//       enabled: enabled,
//       startHidden: startHidden,
//       controllerOpacity: controllerOpacity,
//       keyBindings: keyBindings,
//       blacklist: blacklist.replace(regStrip, ""),
//     },
//     function () {
//       // Update status to let user know options were saved.
//       var status = document.getElementById("status");
//       status.textContent = "Options saved";
//       setTimeout(function () {
//         status.textContent = "";
//       }, 1000);
//     }
//   );
// }
