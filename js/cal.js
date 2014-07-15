(function() {

    //计算
    $('#c-date').bind('change', function() {

        //$('#c-res').text(m * n * p / 100);

    });
    $('.green-btn').bind('click', function() {
        var m = parseInt($('#c-date').valueOf().val());
        var n = parseInt($('#c-money').val());
        var p = parseInt($('#c-p').val());
        var pay = parseInt($('#c-pay').val());
        var tr = $($('.c-tr')[0]);
        tr.parent().children(':not(:first)').remove();
        m = isNaN(m) ? 0 : m;
        n = isNaN(n) ? 0 : n;
        p = isNaN(p) ? 0 : p;
        pay = isNaN(pay) ? 0 : pay;
        // console.log(m + '<>' + n + '<>' + p + '<>' + pay);
        var benjin = n / m, fwf = Math.round((benjin * pay / 100) * 100) / 100;
        var total = {
            total : function() {
                return this.fwf + this.lx;
            },
            fwf : 0,
            lx : 0
        };
        for (var i = 1; i < m; i++) {
            tr.parent().append(tr.clone());
        }
        tr.parent().children().each(function(i) {
            var tr = $(this), sm = i + 1, lx = (n * (sm - (sm - 1)) / sm * p / 100 / 12);
            lx = Math.round((lx) * 100) / 100;
            tr.children().each(function(index) {
                var td = $(this);
                switch(index) {
                    case 0:
                        td.text('第' + sm + '个月');
                        break;
                    case 1:
                        td.text(Math.round((benjin + fwf + lx) * 100) / 100);
                        break;
                    case 2:
                        td.text(Math.round((benjin) * 100) / 100);
                        break;
                    case 3:
                        td.text(fwf);
                        break;
                    case 4:
                        td.text(lx);
                        break;
                }
            });
            total.lx += lx;
            total.fwf += fwf;

        });
        var res;
        for (var p in total) {
            if (p == 'total')
                res = Math.round((total[p]()) * 100) / 100;
            else
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
