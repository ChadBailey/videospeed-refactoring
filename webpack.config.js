const chrome = require("./webpack/chrome");
const firefox = require("./webpack/firefox");
const safari = require("./webpack/safari");

module.exports = {
  mode: "development",
  entry: [chrome, firefox, safari]
};
