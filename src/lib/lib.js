const { Logger } = require("./logger");
const {
  regexStrip,
  regexEndsWithFlags,
  regexOperators,
  defaultSettings,
  keyCodeLUT,
} = require("./constants");

function strip(str) {
  return str.replace(regexStrip, "");
}

function regexEscapeString(str) {
  return str.replace(regexOperators, "\\$&");
}

defaultSettings.blacklist = strip(defaultSettings.blacklist);

class Conf {
  static regexStrip = regexStrip;
  static regexEndsWithFlags = regexEndsWithFlags;
  static keyCodeLUT = keyCodeLUT;
  static defaults = defaultSettings;
}
module.exports = {
  Conf,
  strip,
  regexEscapeString,
};
