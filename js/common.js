(function() {
    function setProgress(node) {
        var node = node || this;
        if (node.className.indexOf('progress') == -1)
            return;
        var value = parseInt(node.getAttribute("value"));
        value = isNaN(value) ? 0 : (value > 100 ? 100 : (value < 0) ? Math.abs(value) : value);
        //$(node).find('.max div:last-of-type').css('left', (value - 100) + "%");
        var span = $(node).find('span');
        $(node).find('.max div:last-of-type').animate({
            width : value + '%'
        }, {
            duration : 1000,
            step : function() {
                span.text(parseInt(this.style.width) + '%');
            },
            complete : function() {
                span.text(value + '%');
            }
        });
        return node;
    }

    (function init() {
        try {
            HTMLElement.prototype.setProgress = setProgress;
        } catch(e) {

        } finally {
            //init
            $('.progress').each(function() {
                if (!(this.setProgress && this.setProgress())) {
                    setProgress(this);
                }
            });
        }
        try {
            
            $('.nav .menu').bind('mouseenter mouseleave', function() {
                $(this).find('div,span').toggleClass('hidden');
            });            
            $('.icon-show').toggle(function() {
                with ($('.icon-show')) {
                    css('background-position-y', '-35px');
                    siblings('div.show-info').hide();
                }
                with ($(this)) {
                    css('background-position-y', '0px');
                    siblings('div.show-info').show();
                }
            }, function() {
                with ($(this)) {
                    css('background-position-y', '-35px');
                    siblings('div.show-info').hide();
                }
            });
        } catch(e) {

        }
    })();
})();
