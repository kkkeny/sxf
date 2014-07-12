var debuger = (function() {
    var table = $('.banner_ > table'), point = $(".banner_ > div span");
    function animate(argu) {
        table.animate({
            marginLeft : '-=100' + '%'
        }, {
            duration : 1000,
            complete : function() {
                var index = Math.abs(countData.index);

                index = index >= countData.length ? (index - countData.length) : index;
                point.removeClass('current');
                //console.log(index);
                $(point[index]).addClass('current');
                console.log(index);
                countData.restart = window.setTimeout(function() {
                    countData.animate(null, true);
                }, 2000);
            }
        });
    }

    var countData = {
        index : 0,
        length : 4,
        animate : function(target, auto) {
            if (!auto) {
                var current = $('.banner_ > div span.current').index();
                if (current !== target) {
                    point.removeClass('current');
                    $(point[target]).addClass('current');
                    table[0].style.marginLeft = -(target * 100) + "%";
                    countData.index = -target;
                }
            } else {
                var index = this.index;
                if (Math.abs(index) === (this.length * 2 - 1)) {
                    index = -(this.length - 1);
                    table[0].style.marginLeft = (index * 100) + "%";
                }
                index--;
                animate();
                countData.index = index;
            }
        }
    };
    var banner = {
        init : function() {
            var _this = this;
            try {
                $(".banner_ > table img").bind("click", function() {
                    location.href = this.getAttribute("href");
                });
                point.bind('mouseover', function() {
                    //console.log($(this).index());
                    //return;
                    if (table.is(':animated'))
                        return;
                    window.clearTimeout(countData.restart);
                    countData.restart = null;
                    countData.restart = window.setTimeout(function() {
                        //countData.index--;
                        countData.animate(null, true);
                    }, 2000);
                    countData.animate($(this).index());
                });
                countData.restart = window.setTimeout(function() {
                    countData.animate(null, true);
                }, 2000);
            } catch(e) {
                console.log(e);
            }
            return this;
        }
    };
    return banner.init();
})();