const permissions = require("../permissions");
const npm_package = require("../../../package.json");

module.exports = {
  name: npm_package.long_name, // Shows in extension icon right-click menu
  version: npm_package.version,
  manifest_version: 2,
  description: npm_package.description,
  homepage_url: npm_package.homepage, // Linked on clicking name in extension icon right-click menu
  permissions: [...permissions, "https://*/*"],
  browser_action: {
    default_title: npm_package.name,
    default_popup: "assets/html/popup.html",
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
    scripts: ["background.js"],
  },
  web_accessible_resources: [
    "assets/css/content.css", // CSS fixes for many pages such as YouTube
    "background.js.map", // Maps to allow "real" line and column numbers/debugging
    "content.js.map",
    "options.js.map",
    "popup.js.map",
  ],
  // ...(process.env.NODE_ENV === 'development' ? {
  //   content_security_policy: "script-src 'self' 'unsafe-eval'; font-src 'self' data: https://fonts.gstatic.com/s/dmsans; object-src 'self';"
  // } : {})
};
