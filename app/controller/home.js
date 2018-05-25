'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.ejs');
  }
  async login() {
    const { ctx } = this;
    await ctx.render('login.ejs');
  }
}

module.exports = HomeController;
