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
        var d = parseInt(left / 86400), h = parseInt((left % 86400) / 3600), m = parseInt((left % 3600) / 60);
        str = '' + (d > 0 ? (d + '天') : '');
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
        var max = parseInt($('#c-left').text().replace(',', '')), current = parseInt($('.count input').val()), step = 10000;
        if (isNaN(max) || isNaN(current))
            alert('请正确填写金额');
        if ($(this)[0].className.indexOf('plus') != -1)
            step = -step;
        current += step;
        current = current < 0 ? 0 : current;
        current = current > max ? max : current;
        $('.count input[type="text"]').val(current + '元');
        $('#c-date').trigger('change');
    });
    $('#new-submit').click(function() {
        var flag = true;
        var form = $('#new'), money = form.find('input[name="money"]'), num = parseFloat(money.val());
        num = isNaN(num) ? 0 : num;
        if (num <= 0) {
            alert('请重新输入金额');
            flag = false;
        }
        money.val(num + '元');
        if (flag)
            $('#new').submit();
        return false;
    });
    //计算
    $('#c-date').bind('change', function() {
        var m = parseInt($(this).valueOf().val()), n = parseInt($('#c-money').val()), p = parseInt($('#c-p').text());
        m = isNaN(m) ? 0 : m;
        n = isNaN(n) ? 0 : n;
        p = isNaN(p) ? 0 : p;
        console.log(m + '<>' + n + '<>' + p);
        $('#c-res').text(m * n * p / 100);

    });
    $('#c-money').bind('input', function() {
        $('#c-date').trigger('change');
    });
    $('#c-date').trigger('change');
})();
