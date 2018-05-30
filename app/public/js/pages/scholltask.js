(function () {
    let starttime = ''
    let endtime = ''
    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' },
        function (start, end, label) {
            starttime = start;
            endtime = end;
            starttime = start.format(this.locale.format);
            endtime = end.format(this.locale.format);
        });


    $('#sendinfo').click(function (e) {
        let tag = getTag();
        let title = $('#title').val();
        let desc = $('#desc').val();
        let value = $('#value').val();
        let pass = $('#pass').val();
        let distance = $('#distance').val();
        let receiver = $('#receiver option:selected').text();
        if (starttime === '' || endtime === '') {
            alert('请选择任务执行时间');
            return;
        }
        if (isAjaxNull(tag, title, desc, value, pass, distance, receiver)) {
            var data = {
                title: title, content: desc, starttime: starttime, endtime: endtime, value: value,
                pass: pass, tag: tag, receiver: receiver,
            };
            // mhttp({ url: '/admin/add/task', data: data }, function (msg) {

            // });
        } else {
            alert('输入不能为空！');
        }
    });
    /**
     * 获取类型
     */
    function getTag() {
        if ($('#optionsRadios1').is(':checked')) {
            return '1';
        } else if ($('#optionsRadios2').is(':checked')) {
            return '2';
        }
        return '1';
    }
})();