
//今日早报 -> 数据导入 -> 教学任务
var pages = ['todynews', 'dataimport', 'scholltask']; //所有页面page的名称
const content = $('.content')[0];  //主内容

const defaultPage = pages[2]; //默认显示主页
const defaultPageData = window.localStorage.getItem(defaultPage);

initPage();

/**
 * 根据页面名称获取内容
 * @param {*} pageName 
 */
function showPageByName(pageName, sucCallback) {
    $.ajax({
        url: '/admin/getpage',
        type: 'get',
        dataType: 'json',
        data: { pagename: pageName },
        success: function (data) {
            if (data.status === 1) {
                let page = data.html;
                window.localStorage.setItem(pageName, page);   //对页面做一次缓存
                setShowPage(pageName, page);
                sucCallback();
            } else {
                alert('数据请求失败');
            }
        },
        error: function (err) {
            alert('服务器出错');
        },
    });
}

function setShowPage(pageName, pageData) {
    content.innerHTML = pageData;
    loadPageScrpat(pageName);
}

function inArray(array, pageName) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === pageName) {
            return true;
        }
    }
    return false;
}
/**
 * 加载指定js文件
 * @param {*} pageName 
 */
function loadPageScrpat(pageName) {
    $.getScript(window.location.origin + '/public/js/pages/' + pageName + '.js', function () { });
}

function removeScript(NowScript) {
    for (let index = 0; index < pages.length; index++) {
        if (NowScript != pages[index]) {
            const element = pages[index];
            let mnode = $('#' + element + 'js')[0];
            if (mnode != undefined) {
                $('body')[0].removeChild(mnode);
            }
            // if ($('#' + pages[index] + 'js')[0] == 'undefined') {
            //     return;
            // }else{
            //     console.log($('#' + pages[index] + 'js')[0])
            //     $('body')[0].removeChild($('#' + pages[index] + 'js')[0]);
            // }
        }
    }
}

/**
 * 清除页面缓存
 */
function clearCache() {
    for (let index = 0; index < pages.length; index++) {
        window.localStorage.removeItem(pages[index]);
    }
}
/**
 * 在页面关闭，刷新时清空一次缓存。
 */
window.onunload = function () {
    clearCache();
};

function initPage() {
    if (!defaultPageData) {
        showPageByName(defaultPage, function () { });
    } else {
        setShowPage(defaultPage, defaultPageData);
    }
    $('#leftlink').click(function (e) {
        let href = $(e.target).attr('href');
        if (!href) {
            return;
        }
        const pageName = href.slice(1, href.length);
        if (inArray(pages, pageName)) {
            var loadPage = window.localStorage.getItem(pageName);
            if (loadPage) {
                setShowPage(pageName, loadPage);
            } else {
                showPageByName(pageName, function () {
                    loadPageScrpat(pageName);
                });
            }
        }
    });
}
