const { version } = require("../version.json");
const permissions = require("../permissions");
const { name, short_name, description, homepage_url } = require("../app_info");

module.exports = {
  version,
  manifest_version: 3,
  name,
  short_name,
  description,
  homepage_url,
  permissions,
  options_ui: {
    page: "assets/html/options.html",
    open_in_tab: true,
  },
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
      all_frames: true,
      matches: ["<all_urls>"],
      match_about_blank: true,
      exclude_matches: [
        "https://plus.google.com/hangouts/*",
        "https://hangouts.google.com/*",
        "https://meet.google.com/*",
      ],
      css: ["assets/css/content.css"],
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
      resources: [
        "assets/css/content.css", // CSS fixes for many pages such as YouTube
        "background.js.map", // Maps to allow "real" line and column numbers/debugging
        "content.js.map",
        "options.js.map",
        "popup.js.map",
      ],
      matches: ["<all_urls>"],
    },
  ],
};
