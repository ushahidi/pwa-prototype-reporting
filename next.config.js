const { parsed: localEnv } = require('dotenv').config()
const withOffline = require('next-offline')
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const nextConfig = {
  generateInDevMode: true,
  workboxOpts: {
    // importsDirectory: 'static', // puts workbox in .next/static
    // importWorkboxFrom: 'local',
    runtimeCaching: [
      {
        urlPattern: /^http[s|]?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          }
        }
      },
      {
        urlPattern: /api/,
        handler: 'NetworkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200, 204],
            headers: {
              'Content-Type': 'application/json'
            }
          }
        }
      },
    ]
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config
  }
};
module.exports = withCSS(withOffline(nextConfig));