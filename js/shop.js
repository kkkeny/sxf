(function() {
    //倒计时
    if (!$_obj)
        return;
    var eTime = new Date($_obj.endTime), now, left, str;
    (function() {
        now = new Date();
        left = now.getTime() - eTime.getTime();
        left = left >= 0 ? 0 : new Date(eTime - now);
        if (left === 0) {
            $('#time-left').text('已结束');
            return;
        }
        left = parseInt(left / 1000);
        var h = parseInt(left / 3600), m = parseInt((left % 3600) / 60);
        str = '';
        str += h + '小时';
        str += m + '分';
        str += (left % 60) + '秒';
        $('#time-left').text(str);
        var _arguments = arguments;
        window.setTimeout(function() {
            _arguments.callee.call();
        }, 1000);
    })();
    //金额
    $('.count span').bind('click', function() {
        var current = parseInt($('.count input').val()), step = 10000;
        if ($(this)[0].className.indexOf('plus') != -1)
            step = -step;
        current += step;
        current = current < 0 ? 0 : current;
        $('.count input').val(current + '元');
    });
})();
