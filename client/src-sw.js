// const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// const { CacheFirst } = require('workbox-strategies');
// const { registerRoute } = require('workbox-routing');
// const { CacheableResponsePlugin } = require('workbox-cacheable-response');
// const { ExpirationPlugin } = require('workbox-expiration');
// const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// precacheAndRoute(self.__WB_MANIFEST);

// const pageCache = new CacheFirst({
//   cacheName: 'page-cache',
//   plugins: [
//     new CacheableResponsePlugin({
//       statuses: [0, 200],
//     }),
//     new ExpirationPlugin({
//       maxAgeSeconds: 30 * 24 * 60 * 60,
//     }),
//   ],
// });

// warmStrategyCache({
//   urls: ['/index.html', '/'],
//   strategy: pageCache,
// });

// registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// // TODO: Implement asset caching
// registerRoute(
//   ({request}) => request.destination === "image",
//   new CacheFirst({
//     cacheName: "assets",
//     plugins: [
//       newCacheableResponsePlugin ({statuses: [0, 200]}),
      
//       new ExpirationPlugin({maxEntries: 60,
//       maxAgeSeconds: 30*24*60*60,
//     }) 
//   ]
//   })
// );

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new WebpackPwaManifest({
        name: "JATE",
        short_name: "JATE",
        description: "Just Another Text Editor",
        display: "standalone",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};