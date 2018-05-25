'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527222140013_6726';

  // add your config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    }
  }

  // config.default.js
  // errorPageUrl support funtion
  config.onerror = {
    errorPageUrl: (err, ctx) => ctx.errorPageUrl || '/500',
  };

  return config;
};
