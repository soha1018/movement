
//今日早报 -> 数据导入 -> 教学任务
var pages = ['todynews', 'dataimport', 'scholltask']; //所有页面page的名称
const content = $('.content')[0];  //主内容

const defaultPage = pages[2]; //默认显示主页


$('#leftlink').click(function (e) {
    let href = $(e.target).attr('href');
    if (!href) {
        return;
    }
    const pageName = href.slice(1, href.length);
    if (inArray(pages, pageName)) {
        showPageByName(pageName);
    }
});
/**
 * 根据页面名称获取内容
 * @param {*} pageName 
 */
function showPageByName(pageName) {
    $.ajax({
        url: '/admin/getpage',
        type: 'get',
        dataType: 'json',
        data: { pagename: pageName },
        success: function (data) {
            if (data.status === 1) {
                let page = data.html;
                content.innerHTML = page;
                loadPageScrpat(pageName);
            } else {
                alert('数据请求失败');
            }
        },
        error: function (err) {
            alert('服务器出错');
        },
    });
}


function inArray(array, pageName) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === pageName) {
            return true;
        }
    }
    return false;
}

function loadPageScrpat(pageName) {
    let script = document.createElement('script');
    script.src = window.location.origin + '/public/js/pages/' + pageName;
    script.onload = function () {
        script = null;
    } 
}

showPageByName(defaultPage);