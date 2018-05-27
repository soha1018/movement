'use strict';

const Service = require('egg').Service;

const tableName = 'task';

class Task extends Service {
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
}

module.exports = Task;