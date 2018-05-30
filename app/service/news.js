'use strict';

const Service = require('egg').Service;

const tableName = 'news';

class News extends Service {
    async add(map) {
        const result = await this.app.mysql.insert(tableName, map);
        return result;
    }

    async del(id) {
        const result = await this.app.mysql.delete(tableName, {
            content_id: id,
        });
        return result;
    }

    async getAll() {
        const results = await this.app.mysql.select(tableName);
        return results.reverse();
    }

    async getAllByType(type) {
        const result = await this.app.mysql.select(tableName,
            { where: { type: type } })
        return result;
    }
    async update(map) {
        const result = await this.app.mysql.update(tableName, map);
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }
    /**
     * 获取十条数据
     */
    async getTenData() {
        const results = await this.app.mysql.select(tableName, { // 搜索 post 表
            // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
            // columns: ['author', 'title'], // 要查询的表字段
            orders: [['top', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
    }
}

module.exports = News;