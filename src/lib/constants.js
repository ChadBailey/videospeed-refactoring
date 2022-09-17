const regexStrip = /^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm;
const regexEndsWithFlags = /\/(?!.*(.).*\1)[gimsuy]*$/;
const regexOperators = /[|\\{}()[\]^$+*?.]/g;
const defaultSettings = {
  speed: 1.0, // default:
  displayKeyCode: 86, // default: V
  rememberSpeed: false, // default: false
  audioBoolean: false, // default: false
  startHidden: false, // default: false
  forceLastSavedSpeed: false, //default: false
  enabled: true, // default enabled
  controllerOpacity: 0.3, // default: 0.3
  keyBindings: [
    { action: "display", key: 86, value: 0, force: false, predefined: true }, // V
    { action: "slower", key: 83, value: 0.1, force: false, predefined: true }, // S
    { action: "faster", key: 68, value: 0.1, force: false, predefined: true }, // D
    { action: "rewind", key: 90, value: 10, force: false, predefined: true }, // Z
    { action: "advance", key: 88, value: 10, force: false, predefined: true }, // X
    { action: "reset", key: 82, value: 1, force: false, predefined: true }, // R
    { action: "fast", key: 71, value: 1.8, force: false, predefined: true }, // G
  ],
  blacklist: `www.instagram.com
    twitter.com
    imgur.com
    teams.microsoft.com
  `,
};
const keyCodeLUT = {
  0: "null",
  null: "null",
  undefined: "null",
  32: "Space",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  96: "Num 0",
  97: "Num 1",
  98: "Num 2",
  99: "Num 3",
  100: "Num 4",
  101: "Num 5",
  102: "Num 6",
  103: "Num 7",
  104: "Num 8",
  105: "Num 9",
  106: "Num *",
  107: "Num +",
  109: "Num -",
  110: "Num .",
  111: "Num /",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  186: ";",
  188: "<",
  189: "-",
  187: "+",
  190: ">",
  191: "/",
  192: "~",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  "Num 0": 96,
  "Num 1": 97,
  "Num 2": 98,
  "Num 3": 99,
  "Num 4": 100,
  "Num 5": 101,
  "Num 6": 102,
  "Num 7": 103,
  "Num 8": 104,
  "Num 9": 105,
  "Num *": 106,
  "Num +": 107,
  "Num -": 109,
  "Num .": 110,
  "Num /": 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  ";": 186,
  "<": 188,
  "-": 189,
  "+": 187,
  ">": 190,
  "/": 191,
  "~": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
};
module.exports = {
  regexStrip,
  regexEndsWithFlags,
  regexOperators,
  defaultSettings,
  keyCodeLUT,
};
