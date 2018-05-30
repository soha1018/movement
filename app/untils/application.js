module.exports = {
    errNull(...arg) {
        for (let index = 0; index < arg.length; index++) {
            const element = arg[index];
            if (element === undefined) {
                return false;
            }
        }
        return true;
    },

    /**
 * 对时间进行格式化
 * @param {*} value 
 */

    timeFormatter(value) {
        var da = new Date(value.replace("/Date(", "").replace(")/", "").split("+")[0]);
        return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
    },
    /**
     * 解析Excel文件为Json数据
     * @param {*} path 
     */
    excelToJson(path) {

        // var arr = [];
        // let tag = true;
        // while (arr.length && tag) {
        //     tag = false;
        //     var map = arr.splice(0, 1)[0];
        //     try {
        //         let t = await mysql.insert(map);
        //         if (t) {
        //             tag = true;
        //         }
        //     } catch (error) {
        //         tag = true;
        //     }
        // }
    }
};