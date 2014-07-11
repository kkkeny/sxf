(function() {
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
        str = '';
        str += parseInt(left / 3600) + '小时';
        str += parseInt(left / 60) + '分';
        str += (left % 60) + '秒';
        $('#time-left').text(str);
        var _arguments = arguments;
        window.setTimeout(function() {
            _arguments.callee.call();
        }, 1000);
    })();
    //console.log(left.getFullYear() + '<>' + left.getMonth() + left.getDate());
})();
