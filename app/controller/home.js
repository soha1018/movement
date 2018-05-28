'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

class HomeController extends Controller {
  async index() {
    this.ctx.body = { status: '0' };
  }
  /**
   * 后台登录界面
   */
  async login() {
    const { ctx } = this;
    await ctx.render('login.ejs');
  }
  /**
   * 后台主页
   */
  async admin() {
    const { ctx } = this;
    await ctx.render('index.ejs');
  }
  /**
   * 获取对应的单页面
   */
  async getPage() {
    const { ctx } = this;
    const pageName = ctx.query.pagename;
    try {
      let pagePath = path.resolve(__dirname, '..') + '/view/pages/' + pageName + '.ejs';
      let info = fs.readFileSync(pagePath, 'utf-8');
      let template = ejs.render(info, {});
      ctx.body = { status: 1, html: template };
    } catch (error) {
      ctx.body = { status: 'file open err' };
    }
  }
}

module.exports = HomeController;