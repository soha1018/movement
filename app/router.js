'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  /**
   * admin后台管理
   */
  router.get('/admin', controller.home.admin);
  router.get('/admin/loginpage', controller.home.login);
  router.get('/admin/login', controller.scholl.login);
  router.get('/admin/getpage', controller.home.getPage);
  
  
  /**
   * api管理
   */
  router.get('/api/login', controller.api.login);
};
