'use strict';

const Controller = require('egg').Controller;
const tools = require('../untils/application');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const path = require('path');

/**
 * 对外的接口api
 */
class ApiController extends Controller {
    async login() {
        const { ctx } = this;
        const name = ctx.query.study_code;
        const pwd = ctx.query.pwd;
        if (!tools.errNull(name, pwd)) {
            ctx.body = { status: 11 };
            return;
        }
        let token = new Date().getTime() + pwd;
        ctx.session.token = name + '#' + pwd;
        const result = await ctx.service.users.isHave(
            { study_code: name, pwd: pwd });
        if (result) {
            ctx.body = { status: 1, user: result, token: token };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 修改用户密码
     */
    async changeUserPwd() {
        const { ctx } = this;
        const { user_id, pwd } = ctx.query;
        if (!tools.errNull(user_id, pwd)) {
            ctx.body = { status: 11 };
            return;
        }

        if (pwd.length > 12) {
            ctx.body = { status: 12 };
            return;
        } else {
            const result = await ctx.service.users.update({
                users_id: user_id,
                pwd: pwd,
            });
            ctx.body = { status: 1 };
        }
    }
    /**
     * 修改用户介绍
     */
    async changeUserDesc() {
        const { ctx } = this;
        const { user_id, desc } = ctx.query;
        if (!tools.errNull(user_id, desc)) {
            ctx.body = { status: 11 };
            return;
        }
        if (desc.length > 100) {
            ctx.body = { status: 100 };
            return;
        } else {
            const result = await ctx.service.users.update({
                users_id: user_id,
                desc: desc,
            });
            if (result) {
                ctx.body = { status: 1 };
            } else {
                ctx.body = { status: 0 };
            }
        }
    }
    /**
     * 上传图片
     * @newsOrUser: 默认代表上传用户头像
     */
    async uploadImage() {
        const { ctx } = this;
        const parts = this.ctx.multipart({ autoFields: true });
        let newsOrUser = 'users';
        // const files = [];
        let stream;
        let i = 0;
        let resultUrl = '';
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                // 需要做出处理，例如给出错误提示消息
                // ctx.body = { status: 6 };
                // return;
            } else {
                // files.push(stream.filename);
                newsOrUser = parts.field.tag;
                const imgname = new Date().getTime() + '.jpg';
                resultUrl = '/public/upload/' + newsOrUser + '/' + imgname;
                let target = path.join(this.config.baseDir, 'app/public/upload/' + newsOrUser, imgname);
                const writeStream = fs.createWriteStream(target);
                try {
                    await awaitWriteStream(stream.pipe(writeStream));
                    switch (newsOrUser) {
                        case 'users':
                            const study_code = parts.field.study_code;  //用户上传自己的图片
                            break;
                        case 'news':   //上传新闻图片

                            break;
                    }
                    i++;
                } catch (err) {
                    i = 100;
                    await sendToWormhole(stream);
                    throw err;
                }
            }
            if (i === 1) {
                break;
            } else if (i == 100) {
                ctx.body = { status: 0 };
                return;
            }
        }
        stream = null;
        if (i === 0) {
            ctx.body = { status: 6 };
        } else {
            ctx.body = { status: 1, url: resultUrl };
        }
    }


    /**
     * 提交任务
     */
    async completeTask() {
        const { ctx } = this;
        const { task_id, user_id, fraction, starttime, endtime } = ctx.query;
        if (!tools.errNull(task_id, user_id, fraction, starttime, endtime)) {
            ctx.body = { status: 11 };
            return;
        }
        let result = await ctx.service.peopleinfo.add({
            task_id: task_id,
            user_id: user_id,
            fraction: fraction,
            starttime: starttime,
            endtime: endtime,
        });
        if (result) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 获取所有新闻
     */
    async getNews() {
        const { ctx } = this;
        const result = await ctx.service.news.getAll();
        ctx.body = result;
    }
    /**
     * 获取自身所有的任务
     */
    async getMySelfTask() {
        const { ctx } = this;
        const study_code = ctx.query.study_code;
        const scholl_id = ctx.query.scholl_id;
        const isko = ctx.query.isko || 0; // 0未完成　　１完成

        if (!tools.errNull(study_code, scholl_id)) {
            ctx.body = { status: 11 };
            return;
        }
        let result = [];
        result = await ctx.service.peopleinfo.getAllByMap(
            { study_code: study_code });
        if (isko) {
            ctx.body = result;
            return;
        } else {
            let objs = [];
            const taskAll = await ctx.service.task.getAllByMap({
                scholl_id: scholl_id,
            });
            for (let index = 0; index < taskAll.length; index++) {
                const element = taskAll[index];
                const obj = result[index];
                if (element.task_id != obj.task_id) {
                    objs.push(element);
                }
            }
            ctx.body = objs;
        }
    }
    /**
     * 根据news_id获取新闻评论
     */
    async getComment() {
        const { ctx } = this;
        const news_id = ctx.query.news_id;
        if (!tools.errNull(news_id)) {
            ctx.body = { status: 11 };
            return;
        }
        const result = await ctx.service.comment.getAllByMap({ news_id: news_id });
        if (result) {
            ctx.body = { status: 1, data: result };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 评论新闻
     */
    async addComment() {
        const { ctx } = this;
        const news_id = ctx.query.news_id;
        const content = ctx.query.content;
        const time = ctx.query.time;
        const user_id = ctx.query.user_id;
        if (!tools.errNull(news_id, content, time, user_id)) {
            ctx.body = { status: 11 };
            return;
        }
        if (content.length > 100) {
            ctx.body = { status: 100 };
            return;
        }
        const result = await ctx.service.comment.add({
            news_id: news_id,
            content: content,
            time: tools.timeFormatter(time),
            user_id: user_id,
        });
        if (result) {
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 0 };
        }
    }
    /**
     * 发一条新闻
     */
    async addNew() {
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
                top: 99,
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
     * 退p出登录
     */
    async loginOut() {
        const { ctx } = this;
        const { token } = this;
        if (ctx.session.token) {
            ctx.session.token = null;
            ctx.body = { status: 1 };
        } else {
            ctx.body = { status: 5 };
        }
    }
    /**
     * 获取前十名(根据学分　｜｜　积分　｜｜　当前任务成绩)
     */
    getTopTen() {
        const { ctx } = this;
        const { type } = ctx.query;
        if (!tools.errNull(type)) {
            ctx.body = { status: 11 };
            return;
        }
        switch (type) {
            case 'value':  //学分

                break;
            case 'integral':  //积分

                break;

            case 'task':   //任务成绩   如果是根据任务 需要任务id
                const task_id = ctx.query.task_id;
                if (task_id != undefined) {

                } else {
                    ctx.body = { status: 11 };
                }
                break;

            default:
                ctx.body = { status: 11 };
                break;
        }
    }
}

module.exports = ApiController;
