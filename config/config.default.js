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

  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: 'localhost',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: '123456',
  //     // 数据库名
  //     database: 'movement',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };
  config.security = {
    csrf: false,
  }

  config.bodyParser = {
    jsonLimit: '50mb',
    formLimit: '50mb',
  }
  return config;
};
