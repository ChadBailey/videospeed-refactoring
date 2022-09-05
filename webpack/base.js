// const TerserPlugin = require("terser-webpack-plugin"); // Eventually: Used to minify prod
const { NONAME } = require("dns");
const { resolve, join } = require("path");

const Root = join(__dirname, "..");
const Source = join(Root, "src");
const Dist = join(Root, "dist");

const Static = join(Source, "static");
const Background = join(Source, "background");
const Content = join(Source, "content");
const Popup = join(Source, "popup");
const Lib = join(Source, "lib");
const Options = join(Source, "options");

const config = {
  // mode: development,
  // target: "web",
  // devtool: isProd ? "none" : "cheap-source-map",

  // mode: "production",
  // devtool options: https://webpack.js.org/configuration/devtool/
  // devtool: "none",
  mode: "production",
  entry: {
    // background: join(Background, "background.js"),
    popup: join(Popup, "popup.js"),
    content: join(Content, "content.js"),
    options: join(Options, "options.js")
  },
  output: {
    path: join(__dirname, "../", "dist"),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "static/images"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // plugins: [
  //   new CopyPlugin({
  //     patterns: [
  //       {
  //         from: join(Assets, "html"),
  //         to: "assets/html"
  //       },
  //       {
  //         from: join(Assets, "images"),
  //         to: "assets/images"
  //       },
  //       {
  //         from: join(Assets, "json"),
  //         to: "assets/json"
  //       }
  //     ]
  //   })
  // ],

  resolve: {
    extensions: [".js", ".png"],
    alias: {
      lib: Lib,
      background: Background,
      content: Content,
      popup: Popup,
      static: Static,
      options: Options
    }
  }
  // Eventually: Enable for prod-only
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: true
  //     })
  //   ]
  // }
};

const buildConfig = (browser, path) => ({
  ...config,
  name: browser,
  output: {
    path: join(Dist, path || browser),
    filename: "[name].js"
  }
});

module.exports = {
  config,
  buildConfig
};
