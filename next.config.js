const { parsed: localEnv } = require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withOffline = require("next-offline");
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const nextConfig = {
  generateInDevMode: true,
  workboxOpts: {
    swDest: "static/service-worker.js", // this is the important part
    // importsDirectory: 'static', // puts workbox in .next/static
    // importWorkboxFrom: 'local',
    runtimeCaching: [
      {
        urlPattern: /^http[s|]?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200
          }
        }
      },
      {
        urlPattern: /api/,
        handler: "NetworkFirst",
        options: {
          cacheableResponse: {
            statuses: [0, 200, 204],
            headers: {
              "Content-Type": "application/json"
            }
          }
        }
      }
    ]
  },
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      }),
      new webpack.EnvironmentPlugin([
        "base_url",
        "client_id",
        "client_secret",
        "form_id"
      ])
    ];
    return config;
  }
};
module.exports = withOffline(withCSS(nextConfig));
