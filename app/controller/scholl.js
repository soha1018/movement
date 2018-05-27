'use strict';

const Controller = require('egg').Controller;

class SchollController extends Controller {
    async login() {
        const { ctx } = this;
        const name = ctx.query.adminname;
        const pwd = ctx.query.adminpwd;
        const result = await ctx.service.scholl.isHave({ adminname: name, adminpwd: pwd });
        if (result.length === 1) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
}

module.exports = SchollController;
