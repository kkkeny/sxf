(function() {

    //计算
    $('.green-btn').bind('click', function() {
        var m = parseInt($('#c-date').valueOf().val());
        var n = parseInt($('#c-money').val());
        var p = 8 / 100;
        var tr = $($('.c-tr')[0]);
        tr.parent().children(':not(:first)').remove();
        m = isNaN(m) ? 0 : m;
        n = isNaN(n) ? 0 : n;
        console.log(m + '<>' + n + '<>' + p);
        //var benjin = n / m, fwf = Math.round((n * pay / 100) * 100) / 100;

        for (var i = 1; i < m; i++) {
            tr.parent().append(tr.clone());
        }
        var total = {
            lx : 0
        };
        tr.parent().children().each(function(i) {
            var tr = $(this), lx = n * (i + 1) * p;
            console.log(lx);
            lx = Math.round((lx) * 100) / 100;
            console.log(lx);
            tr.children().each(function(index) {
                var td = $(this);
                switch(index) {
                    case 0:
                        td.text('第' + (i + 1) + '个月');
                        break;
                    case 1:
                        td.text('随行付');
                        break;
                    case 2:
                        td.text(n + '元');
                        break;
                    case 3:
                        td.text(lx);
                        break;
                }
            });
            total.lx += lx;

        });
        var res;
        for (var p in total) {
            res = Math.round((total[p]) * 100) / 100;
            //处理分位
            if (res > 1000) {
                var a = (res + '').split('.');
                res = a[0].split('');
                res = res.reverse().join('');
                console.log(res);
                res = res.replace(/(\d\d\d)/g, '$1' + ',').split('').reverse().join('');
                if (res[0] == ',')
                    res = res.substr(1);
                if (a[1])
                    res += '.' + a[1];
            }
            $('#' + p).text(res);
        }
        return false;
    });
    $('.green-btn').trigger('click');
})();
