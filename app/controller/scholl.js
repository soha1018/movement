'use strict';

const fs = require('fs');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const tools = require('../untils/application');

/**
 * 关于Admin的所有内部接口
 */
class SchollController extends Controller {
    async login() {
        const { ctx } = this;
        const name = ctx.query.adminname;
        const pwd = ctx.query.adminpwd;
        if (!tools.errNull(name, pwd)) {
            ctx.body = { status: 11 };
            return;
        }
        const result = await ctx.service.scholl.isHave({ adminname: name, adminpwd: pwd });
        if (result) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 增加一个教学任务
     */
    async addTask() {
        const ctx = this.ctx;
        let { scholl_id, tag, content, starttime, endtime, value, pass, receiver } = ctx;
        if (!tools.errNull(scholl_id, tag, content, starttime, endtime, value, pass, receiver)) {
            ctx.body = { status: 11 };
            return;
        }
        const result = await ctx.service.task.add({
            scholl_id: scholl_id,
            tag: tag,
            starttime: starttime,
            endtime: endtime,
            value: value,
            pass: pass,
            receiver: receiver,
        });
        if (result) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 删除一个教学任务
     */
    async delTask() {
        const ctx = this.ctx;
        let { user_id } = ctx;
        if (!tools.errNull(user_id)) {
            ctx.body = { status: 11 };
            return;
        }
        const result = await ctx.service.task.del(user_id)
        if (result) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 增加一条top为5的新闻　
     */
    async addNews() {
        const ctx = this.ctx;
        const ctx = this.ctx;
        const { content, user_id, tag, time, title } = ctx.query;
        if (!tools.errNull(user_id, content, tag, time, title)) {
            ctx.body = { status: 11 };
            return;
        }
        if (content.length > 100) {
            ctx.body = { status: 100 };
        } else {
            let result = await ctx.service.news.add({
                content: content,
                user_id: user_id,
                tag: tag,
                time: tools.timeFormatter(time),
                top: 10,
                title: title,
            });
            if (result) {
                ctx.body = { status: 1 };
            } else {
                ctx.body = { status: 0 };
            }
        }
    }
    /**
     * 导入Excel文件
     */
    async uploadExcel() {
        const ctx = this.ctx;
        const tag = ctx.req.body.tag;
        const stream = await ctx.getFileStream();
        const filename = new Date().getTime() + '.xlsx';
        const target = path.join(this.config.baseDir, 'app/public/upload/files', filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
            tools.excelToJson('/public/upload/files/' + filename);
            ctx.body = { status: 1 };
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
    }
    /**
     * 导出数据库
     */
    async importOut() {
        const ctx = this.ctx;
        ctx.body = { status: 1 }
    }
}

module.exports = SchollController;
