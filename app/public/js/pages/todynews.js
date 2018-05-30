/**
 * 今日早报
 */
(function () {
    const parentNode = document.getElementById('list');
    init();
    setNowPage();
    $("#compose-textarea").wysihtml5();
    $('#addnews').click(function () {
        $('#todynews').hide();
        $('#addnewpage').css('display', 'block');
    });

    $('#ok').click(function (e) {
        let title = $('#title')[0].value;
        let content = $('#compose-textarea')[0].value;
        if (title.length == 0 || content.length == 0) {
            alert('输入不能为空!');
            return;
        } else {
            if (content.length > 100) {
                alert('长度不能超过100')
            } else {
                addNews(content, title);
                setNowPage();
            }
        }
        e.preventDefault();
        e.stopPropagation();
    });
    function addNews(content, title) {
        mhttp({
            url: '/admin/addnews',
            data: {
                title: title, content: content, time: new Date(),
                user_id: 1, tag: 1, top: 1,
            }
        }, function (data) {
            console.log(data)
        });
    }

    $('#cacul').click(function (e) {
        setNowPage();
        e.preventDefault();
        e.stopPropagation();
    });

    $('#list').click(function (e) {
        var widget = $(e.target).data('widget');
        if (widget === 'remove') {
            var uid = $(e.target).attr('uid');
            del(uid);
        }
        e.preventDefault();
        e.stopPropagation();
    });
    /**
     * 删除信息
     * @param {} id 
     */
    function del(id) {
        console.log(id)
    }
    /**
     * 当前显示的page
     * @param {} showPage 
     */
    function setNowPage() {
        $('#todynews').show();
        $('#addnewpage').css('display', 'none');
    }
    const html = `<div class="box box-widget">
    <div class="box-header with-border">
        <div class="user-block">
            <img class="img-circle" src="/public/dist/img/user1-128x128.jpg" alt="User Image">
            <span class="username">
                <a href="#">这是标题</a>
            </span>
            <span class="description">2018-05-28T16:00:00.000Z</span>
        </div>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="remove" uid="1">
                <i class="fa fa-times"></i>
            </button>
        </div>
    </div>
    <div class="box-body" style="display: block;">
        <img class="img-responsive pad" src="/public/dist/img/photo2.png" alt="Photo">
        <p>这是第一条新闻，晋城职业技术学院．</p>
    </div>
</div>`;
    function init() {
        mhttp({ url: '/api/getnews', data: {} }, function (data) {
            var result = data.data;
            let item = parentNode.childNodes[1].cloneNode();
            parentNode.innerHTML = '';
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let createNode = createItem(element, item);
                parentNode.appendChild(createNode);
            }
        });
    }
    /**
     *
     * @param {*} data 
     * @param {*} itemNode
     */
    function createItem(data) {
        let parentNode = document.createElement('div');
        $(parentNode).addClass('col-md-3');
        parentNode.innerHTML = html;
        $(parentNode).find('.username > a').text(data.title);
        $(parentNode).find('span.description').text(data.time);
        // var iconNode = '';
        $(parentNode).find('.box-body > p').text(data.content);
        if (data.images) {
            var imgNode = $(parentNode).find('.box-body > img');
            console.log(imgNode)
        }
        return parentNode;
    }
})();