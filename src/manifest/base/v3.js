const permissions = require("../permissions");
const npm_package = require("../../../package.json");

manifest = {
  name: npm_package.long_name, // Shows in extension icon right-click menu
  short_name: npm_package.name,
  version: npm_package.version,
  manifest_version: 3,
  description: npm_package.description,
  homepage_url: npm_package.homepage, // Linked on clicking name in extension icon right-click menu
  permissions,
  // Right-click extension icon > "Options"
  options_ui: {
    page: "assets/html/settings.html",
    open_in_tab: true,
  },
  host_permissions: ["<all_urls>"],
  // Left-click extension icon
  action: {
    default_title: npm_package.long_name,
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
      // TODO: Move to config?
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

module.exports = { ...manifest };
