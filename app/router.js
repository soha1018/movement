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
  router.get('/admin/addtask', controller.scholl.addTask);
  router.get('/admin/deltask', controller.scholl.delTask);
  router.get('/admin/addnews', controller.scholl.addNews);
  router.post('/admin/uploadexcel', controller.scholl.uploadExcel);
  router.get('/admin/importout', controller.scholl.importOut);


  /**
   * api管理
   */
  router.get('/api/login', controller.api.login);
  router.get('/api/getnews', controller.api.getNews);
  router.get('/api/getmyselftask', controller.api.getMySelfTask);
  router.get('/api/getcomment', controller.api.getComment);
  router.get('/api/addcomment', controller.api.addComment);
  router.get('/api/changeuserpwd', controller.api.changeUserPwd);
  router.get('/api/changeuserdesc', controller.api.changeUserDesc);
  router.post('/api/uploadimage', controller.api.uploadImage);
  router.post('/api/loginout', controller.api.loginOut);
};
