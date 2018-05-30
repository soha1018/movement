'use strict';

const Service = require('egg').Service;

const tableName = 'comment';

class Comment extends Service {
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

    async getAllByMap(map) {
        const result = await this.app.mysql.select(tableName,
            { where: map })
        return result;
    }
    async update(map) {
        const result = await this.app.mysql.update(tableName, map);
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }
}

module.exports = Comment;