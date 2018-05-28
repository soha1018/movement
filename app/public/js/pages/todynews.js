(function () {
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
            console.log(content)
            console.log(title)
            setNowPage();
        }
        e.preventDefault();
        e.stopPropagation();
    });

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
})();