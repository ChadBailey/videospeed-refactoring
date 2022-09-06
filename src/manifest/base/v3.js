const { version } = require("../version.json");
const permissions = require("../permissions");
const { name, short_name, description } = require("../app_info");

module.exports = {
  version,
  manifest_version: 3,
  name,
  short_name,
  description,
  permissions,
  host_permissions: ["<all_urls>"],
  action: {
    default_title: name,
    default_popup: "assets/html/popup.html",
    default_icon: {
      19: "assets/images/icon19.png",
      38: "assets/images/icon38.png",
      48: "assets/images/icon48.png",
    },
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      css: ["assets/css/shadow.css"],
      js: ["content.js"],
    },
  ],
  icons: {
    16: "assets/images/icon16.png",
    48: "assets/images/icon48.png",
    128: "assets/images/icon128.png",
  },
  background: {
    service_worker: "background.js",
  },
  web_accessible_resources: [
    {
      resources: ["assets/**"],
      matches: ["<all_urls>"],
    },
  ],
};
