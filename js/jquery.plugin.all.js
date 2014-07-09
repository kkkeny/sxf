/*!
 * HTML5 Placeholder jQuery Plugin v1.7
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
;(function($) {

    var isInputSupported = 'placeholder' in document.createElement('input'),
        isTextareaSupported = 'placeholder' in document.createElement('textarea');
    if (isInputSupported && isTextareaSupported) {
        $.fn.placeholder = function() {
            return this;
        };
    } else {
        $.fn.placeholder = function() {
            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .bind('focus.placeholder', clearPlaceholder)
                .bind('blur.placeholder', setPlaceholder)
                .trigger('blur.placeholder').end();
        };
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {},
            rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder() {
        var $input = $(this);
        if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                //$input.hide().next().show().focus();
                //avoiding dom traversing by unsure dom structure
                $input.hide().data('placeholder-src').show().focus();
            } else {
                $input.val('').removeClass('placeholder');
            }
        }
    }

    function setPlaceholder(elem) {
        var $replacement,
            $input = $(this);
        if ($input.val() === '' || $input.val() === $input.attr('placeholder')) {
            if ($input.is(':password')) {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({ type: 'text' });  //ie涓媡ype="password" 涓嶈兘鏀规垚"text" 浼氬嚭鐜板紓甯�
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args($input[0]), { type: 'text'}));
                    }
                    $replacement
                        .removeAttr('id') //we don't need id, it will be confused by selector within id
                        .removeAttr('name')
                        .data('placeholder-password', true)
                        .data('placeholder-src', $input)
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data('placeholder-textinput', $replacement)
                        .before($replacement);

                }
                var _class = $input.attr('class');
                //$input = $input.hide().prev().show();
                //avoiding dom traversing by unsure dom structure
                $input = $input.hide().data('placeholder-textinput').show();
                $input.addClass(_class);
            }
            $input.addClass('placeholder txt').val($input.attr('placeholder'));

        } else {
            $input.removeClass('placeholder');
        }
    }

    $(function() {
        // Look for forms
        $('form').bind('submit.placeholder', function() {
            // Clear the placeholder values so they don鈥檛 get submitted
            var $inputs = $('.placeholder', this).each(clearPlaceholder);
            setTimeout(function() {
                $inputs.each(setPlaceholder);
            }, 10);
        });
    });

    // Clear placeholder values upon page reload
    $(window).bind('unload.placeholder', function() {
        $('.placeholder').val('');
    });

})(jQuery);

/*
 custom tadu tabs
 鏍规嵁濉旇html缁撴瀯缂栧啓鐨勫垏鎹ab
 */
;(function($){
    $.fn.tabs = function(option){
        o = $.extend({
            container:".tabRight span",
            content:'.content ul',
            curClass:'current',
            start:0
        },option||{});

        return this.each(function(){
            var _self = $(this);
            var tabs = _self.find(o.container),
                contents = _self.next().find(o.content);

            if(contents.length<1) return false;
            //init tabs;
            tabs.removeClass(o.curClass);
            tabs.eq(o.start).addClass(o.curClass);
            contents.hide();
            contents.eq(o.start).show();

            tabs.bind('click',function(){

                var tab = $(this);

                //鍒ゆ柇鏄惁瑙﹀彂鏈韩
                if(tab.hasClass(o.curClass)) return;

                var i = tab.index();
                tabs.removeClass(o.curClass);
                tab.addClass(o.curClass);

                contents.hide();
                contents.eq(i).show();
            });
        });
    };
})(jQuery);

/*
 $('#first_slider').mousehover()
 $('.sliderBox').mousehover({
 target:".imgList ul li",
 content:".recdBox ul li"
 })
 $('.listBox').mousehover({
 target:"ul li",
 content:"ul li"
 })
 */
;(function($){
    $.fn.mhover = function(option){
        o = $.extend({
            target:".sliderList ul li",
            content:".imgBox ul li",
            curClass:"current",
            timeout: 100,
            auto:false
        },option||{});

        return this.each(function(){
            var _self = $(this),
                _time,
                _stop = false,
                _cur = 0,
                targets = _self.find(o.target),
                contents = _self.find(o.content);
            targets.eq(0).addClass(o.curClass);
            contents.eq(0).addClass(o.curClass);
            //auto play
            if(o.auto){
                var length = targets.length;
                setInterval(function(){
                    if(_stop) return;
                    _cur++;
                    if(_cur>=length)
                        _cur = 0;
                    targets.removeClass(o.curClass);
                    targets.eq(_cur).addClass(o.curClass);
                    contents.removeClass(o.curClass);
                    contents.eq(_cur).addClass(o.curClass);
                },o.auto);

                _self.hover(function(){
                    _stop = true;
                },function(){
                    _stop = false;
                });
            };
            //mouse trigger
            targets.bind('mouseover',function(){
                var _e = $(this);

                _time = setTimeout(function(){
                    targets.removeClass(o.curClass);
                    _e.addClass(o.curClass);
                    contents.removeClass(o.curClass);
                    contents.eq(_e.index()).addClass(o.curClass);
                    _cur = _e.index();
                },o.timeout);
                $(_e).bind('mouseout',function(){
                    clearTimeout(_time);
                });
            });

        });
    };
})(jQuery)

/*scroll婊氬姩鍥�*/
;(function($) {
    $.fn.carousel = function(o) {
        o = $.extend({
                btnPrev: null,
                btnNext: null,
                btnGo: null,
                auto: false,
                speed: 500,
                easing: null,
                vertical: false,
                circular: true,
                visible: 1,
                start: 0,
                scroll: 1,
                beforeStart: null,
                afterEnd: null
            },
            o || {});
        return this.each(function() {
            var b = false,
                animCss = o.vertical ? "top": "left",
                sizeCss = o.vertical ? "height": "width";
            var c = $(this),
                ul = $("ul", c),
                tLi = $("li", ul),
                tl = tLi.size(),
                v = o.visible;
            if(tl <= v){
                o.btnNext.addClass('vhidden');
                o.btnPrev.addClass('vhidden');
                return false;
            } 
            if (o.circular) {
                ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone());
                o.start += v;
            }
            var f = $("li", ul),
                itemLength = f.size(),
                curr = o.start;
            c.css("visibility", "visible");
            f.css({
                overflow: "hidden",
                float: o.vertical ? "none": "left"
            });
            ul.css({
                margin: "0",
                padding: "0",
                position: "relative",
                "list-style-type": "none",
                "z-index": "1"
            });
            c.css({
                overflow: "hidden",
                position: "relative",
                "z-index": "2",
                left: "0px"
            });
            var g = o.vertical ? height(f) : width(f);
            var h = g * itemLength;
            var j = g * v;
            var interval =setInterval(function(){});
            f.css({
                width: f.width(),
                height: f.height()
            });
            ul.css(sizeCss, h + "px").css(animCss, -(curr * g));
            c.css(sizeCss, j + "px");

            if (o.btnPrev) $(o.btnPrev,c.parent().parent()).click(function() {
                return go(curr - o.scroll);
            });
            if (o.btnNext) $(o.btnNext,c.parent().parent()).click(function() {
                return go(curr + o.scroll);
            });
            c.hover(function(){
                if(interval)
                    clearInterval(interval);
            },function(){
                if(!o.auto) return;
                interval = setInterval(function() {
                        go(curr + o.scroll);
                    },o.auto + o.speed);
            });
            var time;
            if (o.btnGo) $.each($(o.btnGo,c.parent().parent()),
                function(i, a) {
                    /*
                    $(a).click(function(){
                        go(o.circular ? o.visible * (i+1): i)  
                    })*/
                    $(a).hover(function() {
                        clearInterval(interval);
                        time = setTimeout(function(){
                          go(o.circular ? o.visible * (i+1): i)  ;
                        },100) ;
                    },function(){
                        clearTimeout(time);
                        if(!o.auto) return;
                        interval = setInterval(function() {
                                go(curr + o.scroll);
                            },o.auto + o.speed);
                    });
                });
            if(o.auto){
                interval = setInterval(function() {
                                go(curr + o.scroll);
                            },o.auto + o.speed);
            }
            function vis() {
                return f.slice(curr).slice(0, v);
            };
            function go(a) {
                if (!b) {
                    if (o.circular) {
                        if (a <= o.start - v - 1) {
                            ul.css(animCss, -((itemLength - (v * 2)) * g) + "px");
                            curr = a == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll;
                        } else if (a >= itemLength - v + 1) {
                            ul.css(animCss, -((v) * g) + "px");
                            curr = a == itemLength - v + 1 ? v + 1 : v + o.scroll;
                        } else curr = a;
                    } else {
                        if (a < 0 || a > itemLength - v) return;
                        else curr = a;
                    }
                    if (o.beforeStart) o.beforeStart.call(this, vis(),curr,tl);
                    b = true;

                    ul.animate(animCss == "left" ? {
                        left: -(curr * g)
                    }: {
                        top: -(curr * g)
                    },o.speed, o.easing,function() {
                            if (o.afterEnd) o.afterEnd.call(this, vis(),curr,tl);
                            b = false;
                        });

                    if (!o.circular) {
                        $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                        $((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled");
                    }
                }
                return false;
            }
        });
    };
    function css(a, b) {
        return parseInt($.css(a[0], b)) || 0;
    };
    function width(a) {
        try{
            return a[0].offsetWidth + css(a, 'marginLeft') + css(a, 'marginRight');
        }catch(e){
            return 0;
        }

    };
    function height(a) {
        try{
            return a[0].offsetHeight + css(a, 'marginTop') + css(a, 'marginBottom');
        }catch(e){
            return 0;
        }

    }
})(jQuery);

/*
 TextLimit 鏂囨湰璁℃暟鍣�
 $("#test").textlimit('#tip',200)
 textarea             瀛楁暟鏄剧ず浣嶇疆   鏈€澶у瓧鏁�
 */
;(function(jQuery) {
    jQuery.fn.textlimit = function(counter_el, thelimit, reverse, speed) {
        var charDelSpeed = speed || 15;
        var toggleCharDel = speed != -1;
        var toggleTrim = true;
        var that = this[0];
        var isCtrl = false;
        updateCounter();

        function updateCounter(){
            if(typeof that == "object" && !reverse)
                jQuery(counter_el).text(thelimit - that.value.length);
            else if(typeof that == "object")
                jQuery(counter_el).text(that.value.length+"/"+thelimit);
        };

        this.keydown (function(e){
            if(e.which == 17) isCtrl = true;
            var ctrl_a = (e.which == 65 && isCtrl == true) ? true : false; // detect and allow CTRL + A selects all.
            var ctrl_v = (e.which == 86 && isCtrl == true) ? true : false; // detect and allow CTRL + V paste.
            // 8 is 'backspace' and 46 is 'delete'
            if( this.value.length >= thelimit && e.which != '8' && e.which != '46' && ctrl_a == false && ctrl_v == false)
                e.preventDefault();
        });
        this.bind('input',function(e){
            updateCounter();
        });
        this.keyup(function(e){
            updateCounter();
            if(e.which == 17)
                isCtrl=false;

            if( this.value.length >= thelimit && toggleTrim ){
                if(toggleCharDel){
                    // first, trim the text a bit so the char trimming won't take forever
                    // Also check if there are more than 10 extra chars, then trim. just in case.
                    if ( (this.value.length - thelimit) > 10 )
                        that.value = that.value.substr(0,thelimit+100);
                    var init = setInterval
                    (
                        function(){
                            if( that.value.length <= thelimit ){
                                init = clearInterval(init); updateCounter();
                            }
                            else{
                                // deleting extra chars (one by one)
                                that.value = that.value.substring(0,that.value.length-1);
                            }
                        } ,charDelSpeed
                    );
                }
                else this.value = that.value.substr(0,thelimit);
            }
        });
    };
})(jQuery);


/*dialog alert window*/
// ColorBox v1.3.20.1 - jQuery lightbox plugin
// (c) 2011 Jack Moore - jacklmoore.com
// License: http://www.opensource.org/licenses/mit-license.php
;(function ($, document, window) {
    var
    // Default settings object.
    // See http://jacklmoore.com/colorbox for details.
        defaults = {
            transition: "elastic",
            speed: 300,
            width: false,
            initialWidth: "600",
            innerWidth: false,
            maxWidth: false,
            height: false,
            initialHeight: "450",
            innerHeight: false,
            maxHeight: false,
            scalePhotos: true,
            scrolling: true,
            inline: false,
            html: false,
            iframe: false,
            fastIframe: true,
            photo: false,
            href: false,
            title: false,
            rel: false,
            opacity: 0.9,
            preloading: true,

            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "",
            xhrError: "This content failed to load.",
            imgError: "This image failed to load.",

            open: false,
            returnFocus: true,
            reposition: true,
            loop: true,
            slideshow: false,
            slideshowAuto: true,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            onOpen: false,
            onLoad: false,
            onComplete: false,
            onCleanup: false,
            onClosed: false,
            overlayClose: true,
            escKey: true,
            arrowKey: true,
            top: false,
            bottom: false,
            left: false,
            right: false,
            fixed: false,
            data: undefined
        },

    // Abstracting the HTML and event identifiers for easy rebranding
        colorbox = 'colorbox',
        prefix = 'cbox',
        boxElement = prefix + 'Element',

    // Events
        event_open = prefix + '_open',
        event_load = prefix + '_load',
        event_complete = prefix + '_complete',
        event_cleanup = prefix + '_cleanup',
        event_closed = prefix + '_closed',
        event_purge = prefix + '_purge',

    // Special Handling for IE
        isIE = !$.support.opacity && !$.support.style, // IE7 & IE8
        isIE6 = isIE && !window.XMLHttpRequest, // IE6
        event_ie6 = prefix + '_IE6',

    // Cached jQuery Object Variables
        $overlay,
        $box,
        $wrap,
        $content,
        $topBorder,
        $leftBorder,
        $rightBorder,
        $bottomBorder,
        $related,
        $window,
        $loaded,
        $loadingBay,
        $loadingOverlay,
        $title,
        $current,
        $slideshow,
        $next,
        $prev,
        $close,
        $groupControls,

    // Variables for cached values or use across multiple functions
        settings,
        interfaceHeight,
        interfaceWidth,
        loadedHeight,
        loadedWidth,
        element,
        index,
        photo,
        open,
        active,
        closing,
        loadingTimer,
        publicMethod,
        div = "div",
        init;

    // ****************
    // HELPER FUNCTIONS
    // ****************

    // Convience function for creating new jQuery objects
    function $tag(tag, id, css) {
        var element = document.createElement(tag);

        if (id) {
            element.id = prefix + id;
        }

        if (css) {
            element.style.cssText = css;
        }

        return $(element);
    }

    // Determine the next and previous members in a group.
    function getIndex(increment) {
        var
            max = $related.length,
            newIndex = (index + increment) % max;

        return (newIndex < 0) ? max + newIndex : newIndex;
    }

    // Convert '%' and 'px' values to integers
    function setSize(size, dimension) {
        return Math.round((/%/.test(size) ? ((dimension === 'x' ? winWidth() : winHeight()) / 100) : 1) * parseInt(size, 10));
    }

    // Checks an href to see if it is a photo.
    // There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
    function isImage(url) {
        return settings.photo || /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(url);
    }

    function winWidth() {
        // $(window).width() is incorrect for some mobile browsers, but
        // window.innerWidth is unsupported in IE8 and lower.
        return window.innerWidth || $window.width();
    }

    function winHeight() {
        return window.innerHeight || $window.height();
    }

    // Assigns function results to their respective properties
    function makeSettings() {
        var i,
            data = $.data(element, colorbox);

        if (data == null) {
            settings = $.extend({}, defaults);
            if (console && console.log) {
                console.log('Error: cboxElement missing settings object');
            }
        } else {
            settings = $.extend({}, data);
        }

        for (i in settings) {
            if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
                settings[i] = settings[i].call(element);
            }
        }

        settings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';
        settings.href = settings.href || $(element).attr('href');
        settings.title = settings.title || element.title;

        if (typeof settings.href === "string") {
            settings.href = $.trim(settings.href);
        }
    }

    function trigger(event, callback) {
        $.event.trigger(event);
        if (callback) {
            callback.call(element);
        }
    }

    // Slideshow functionality
    function slideshow() {
        var
            timeOut,
            className = prefix + "Slideshow_",
            click = "click." + prefix,
            start,
            stop,
            clear;

        if (settings.slideshow && $related[1]) {
            start = function () {
                $slideshow
                    .html(settings.slideshowStop)
                    .unbind(click)
                    .bind(event_complete, function () {
                        if (settings.loop || $related[index + 1]) {
                            timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
                        }
                    })
                    .bind(event_load, function () {
                        clearTimeout(timeOut);
                    })
                    .one(click + ' ' + event_cleanup, stop);
                $box.removeClass(className + "off").addClass(className + "on");
                timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
            };

            stop = function () {
                clearTimeout(timeOut);
                $slideshow
                    .html(settings.slideshowStart)
                    .unbind([event_complete, event_load, event_cleanup, click].join(' '))
                    .one(click, function () {
                        publicMethod.next();
                        start();
                    });
                $box.removeClass(className + "on").addClass(className + "off");
            };

            if (settings.slideshowAuto) {
                start();
            } else {
                stop();
            }
        } else {
            $box.removeClass(className + "off " + className + "on");
        }
    }

    function launch(target) {
        if (!closing) {

            element = target;

            makeSettings();

            $related = $(element);

            index = 0;

            if (settings.rel !== 'nofollow') {
                $related = $('.' + boxElement).filter(function () {
                    var data = $.data(this, colorbox),
                        relRelated;

                    if (data) {
                        relRelated =  $(this).data('rel') || data.rel || this.rel;
                    }

                    return (relRelated === settings.rel);
                });
                index = $related.index(element);

                // Check direct calls to ColorBox.
                if (index === -1) {
                    $related = $related.add(element);
                    index = $related.length - 1;
                }
            }

            if (!open) {
                open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

                $box.show();

                if (settings.returnFocus) {
                    $(element).blur().one(event_closed, function () {
                        $(this).focus();
                    });
                }

                // +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
                $overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();

                // Opens inital empty ColorBox prior to content being loaded.
                settings.w = setSize(settings.initialWidth, 'x');
                settings.h = setSize(settings.initialHeight, 'y');
                publicMethod.position();

                if (isIE6) {
                    $window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
                        $overlay.css({width: winWidth(), height: winHeight(), top: $window.scrollTop(), left: $window.scrollLeft()});
                    }).trigger('resize.' + event_ie6);
                }

                trigger(event_open, settings.onOpen);

                $groupControls.add($title).hide();

                $close.html(settings.close).show();
            }

            publicMethod.load(true);
        }
    }

    // ColorBox's markup needs to be added to the DOM prior to being called
    // so that the browser will go ahead and load the CSS background images.
    function appendHTML() {
        if (!$box && document.body) {
            init = false;

            $window = $(window);
            $box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
            $overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
            $loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic"));
            $wrap = $tag(div, "Wrapper");
            $content = $tag(div, "Content").append(
                $loaded = $tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
                $title = $tag(div, "Title"),
                $current = $tag(div, "Current"),
                $next = $tag(div, "Next"),
                $prev = $tag(div, "Previous"),
                $slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
                $close = $tag(div, "Close")
            );

            $wrap.append( // The 3x3 Grid that makes up ColorBox
                $tag(div).append(
                    $tag(div, "TopLeft"),
                    $topBorder = $tag(div, "TopCenter"),
                    $tag(div, "TopRight")
                ),
                $tag(div, false, 'clear:left').append(
                    $leftBorder = $tag(div, "MiddleLeft"),
                    $content,
                    $rightBorder = $tag(div, "MiddleRight")
                ),
                $tag(div, false, 'clear:left').append(
                    $tag(div, "BottomLeft"),
                    $bottomBorder = $tag(div, "BottomCenter"),
                    $tag(div, "BottomRight")
                )
            ).find('div div').css({'float': 'left'});

            $loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');

            $groupControls = $next.add($prev).add($current).add($slideshow);

            $(document.body).append($overlay, $box.append($wrap, $loadingBay));
        }
    }

    // Add ColorBox's event bindings
    function addBindings() {
        if ($box) {
            if (!init) {
                init = true;

                // Cache values needed for size calculations
                interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
                interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
                loadedHeight = $loaded.outerHeight(true);
                loadedWidth = $loaded.outerWidth(true);

                // Setting padding to remove the need to do size conversions during the animation step.
                $box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth});

                // Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
                $next.click(function () {
                    publicMethod.next();
                });
                $prev.click(function () {
                    publicMethod.prev();
                });
                $close.click(function () {
                    publicMethod.close();
                });
                $overlay.click(function () {
                    if (settings.overlayClose) {
                        publicMethod.close();
                    }
                });

                // Key Bindings
                $(document).bind('keydown.' + prefix, function (e) {
                    var key = e.keyCode;
                    if (open && settings.escKey && key === 27) {
                        e.preventDefault();
                        publicMethod.close();
                    }
                    if (open && settings.arrowKey && $related[1]) {
                        if (key === 37) {
                            e.preventDefault();
                            $prev.click();
                        } else if (key === 39) {
                            e.preventDefault();
                            $next.click();
                        }
                    }
                });

                $('.' + boxElement, document).live('click', function (e) {
                    // ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
                    // See: http://jacklmoore.com/notes/click-events/
                    if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
                        e.preventDefault();
                        launch(this);
                    }
                });
            }
            return true;
        }
        return false;
    }

    // Don't do anything if ColorBox already exists.
    if ($.colorbox) {
        return;
    }

    // Append the HTML when the DOM loads
    $(appendHTML);


    // ****************
    // PUBLIC FUNCTIONS
    // Usage format: $.fn.colorbox.close();
    // Usage from within an iframe: parent.$.fn.colorbox.close();
    // ****************

    publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
        var $this = this;

        options = options || {};

        appendHTML();

        if (addBindings()) {
            if (!$this[0]) {
                if ($this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
                    return $this;
                }
                // if no selector was given (ie. $.colorbox()), create a temporary element to work with
                $this = $('<a/>');
                options.open = true; // assume an immediate open
            }

            if (callback) {
                options.onComplete = callback;
            }

            $this.each(function () {
                $.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
            }).addClass(boxElement);

            if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
                launch($this[0]);
            }
        }

        return $this;
    };

    publicMethod.position = function (speed, loadedCallback) {
        var
            css,
            top = 0,
            left = 0,
            offset = $box.offset(),
            scrollTop,
            scrollLeft;

        $window.unbind('resize.' + prefix);

        // remove the modal so that it doesn't influence the document width/height
        $box.css({top: -9e4, left: -9e4});

        scrollTop = $window.scrollTop();
        scrollLeft = $window.scrollLeft();

        if (settings.fixed && !isIE6) {
            offset.top -= scrollTop;
            offset.left -= scrollLeft;
            $box.css({position: 'fixed'});
        } else {
            top = scrollTop;
            left = scrollLeft;
            $box.css({position: 'absolute'});
        }

        // keeps the top and left positions within the browser's viewport.
        if (settings.right !== false) {
            left += Math.max(winWidth() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
        } else if (settings.left !== false) {
            left += setSize(settings.left, 'x');
        } else {
            left += Math.round(Math.max(winWidth() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
        }

        if (settings.bottom !== false) {
            top += Math.max(winHeight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
        } else if (settings.top !== false) {
            top += setSize(settings.top, 'y');
        } else {
            top += Math.round(Math.max(winHeight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
        }

        $box.css({top: offset.top, left: offset.left});

        // setting the speed to 0 to reduce the delay between same-sized content.
        speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;

        // this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
        // but it has to be shrank down around the size of div#colorbox when it's done.  If not,
        // it can invoke an obscure IE bug when using iframes.
        $wrap[0].style.width = $wrap[0].style.height = "9999px";

        function modalDimensions(that) {
            $topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
            $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
        }

        css = {width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: top, left: left};
        if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
            $box.css(css);
        }
        $box.dequeue().animate(css, {
            duration: speed,
            complete: function () {
                modalDimensions(this);

                active = false;

                // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
                $wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
                $wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

                if (settings.reposition) {
                    setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
                        $window.bind('resize.' + prefix, publicMethod.position);
                    }, 1);
                }

                if (loadedCallback) {
                    loadedCallback();
                }
            },
            step: function () {
                modalDimensions(this);
            }
        });
    };

    publicMethod.resize = function (options) {
        if (open) {
            options = options || {};

            if (options.width) {
                settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
            }
            if (options.innerWidth) {
                settings.w = setSize(options.innerWidth, 'x');
            }
            $loaded.css({width: settings.w});

            if (options.height) {
                settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
            }
            if (options.innerHeight) {
                settings.h = setSize(options.innerHeight, 'y');
            }
            if (!options.innerHeight && !options.height) {
                $loaded.css({height: "auto"});
                settings.h = $loaded.height();
            }
            $loaded.css({height: settings.h});

            publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
        }
    };

    publicMethod.prep = function (object) {
        if (!open) {
            return;
        }

        var callback, speed = settings.transition === "none" ? 0 : settings.speed;

        $loaded.remove();
        $loaded = $tag(div, 'LoadedContent').append(object);

        function getWidth() {
            settings.w = settings.w || $loaded.width();
            settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
            return settings.w;
        }
        function getHeight() {
            settings.h = settings.h || $loaded.height();
            settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
            return settings.h;
        }

        $loaded.hide()
            .appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
            .css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
            .css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
            .prependTo($content);

        $loadingBay.hide();

        // floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
        //$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});

        $(photo).css({'float': 'none'});

        // Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
        if (isIE6) {
            $('select').not($box.find('select')).filter(function () {
                return this.style.visibility !== 'hidden';
            }).css({'visibility': 'hidden'}).one(event_cleanup, function () {
                    this.style.visibility = 'inherit';
                });
        }

        callback = function () {
            var preload,
                i,
                total = $related.length,
                iframe,
                frameBorder = 'frameBorder',
                allowTransparency = 'allowTransparency',
                complete,
                src,
                img,
                data;

            if (!open) {
                return;
            }

            function removeFilter() {
                if (isIE) {
                    $box[0].style.removeAttribute('filter');
                }
            }

            complete = function () {
                clearTimeout(loadingTimer);
                // Detaching forces Andriod stock browser to redraw the area underneat the loading overlay.  Hiding alone isn't enough.
                $loadingOverlay.detach().hide();
                trigger(event_complete, settings.onComplete);
            };

            if (isIE) {
                //This fadeIn helps the bicubic resampling to kick-in.
                if (photo) {
                    $loaded.fadeIn(100);
                }
            }

            $title.html(settings.title).add($loaded).show();

            if (total > 1) { // handle grouping
                if (typeof settings.current === "string") {
                    $current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
                }

                $next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
                $prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);

                if (settings.slideshow) {
                    $slideshow.show();
                }

                // Preloads images within a rel group
                if (settings.preloading) {
                    preload = [
                        getIndex(-1),
                        getIndex(1)
                    ];
                    while (i = $related[preload.pop()]) {
                        data = $.data(i, colorbox);

                        if (data && data.href) {
                            src = data.href;
                            if ($.isFunction(src)) {
                                src = src.call(i);
                            }
                        } else {
                            src = i.href;
                        }

                        if (isImage(src)) {
                            img = new Image();
                            img.src = src;
                        }
                    }
                }
            } else {
                $groupControls.hide();
            }

            if (settings.iframe) {
                iframe = $tag('iframe')[0];

                if (frameBorder in iframe) {
                    iframe[frameBorder] = 0;
                }

                if (allowTransparency in iframe) {
                    iframe[allowTransparency] = "true";
                }

                if (!settings.scrolling) {
                    iframe.scrolling = "no";
                }

                $(iframe)
                    .attr({
                        src: settings.href,
                        name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
                        'class': prefix + 'Iframe',
                        allowFullScreen : true, // allow HTML5 video to go fullscreen
                        webkitAllowFullScreen : true,
                        mozallowfullscreen : true
                    })
                    .one('load', complete)
                    .one(event_purge, function () {
                        iframe.src = "//about:blank";
                    })
                    .appendTo($loaded);

                if (settings.fastIframe) {
                    $(iframe).trigger('load');
                }
            } else {
                complete();
            }

            if (settings.transition === 'fade') {
                $box.fadeTo(speed, 1, removeFilter);
            } else {
                removeFilter();
            }
        };

        if (settings.transition === 'fade') {
            $box.fadeTo(speed, 0, function () {
                publicMethod.position(0, callback);
            });
        } else {
            publicMethod.position(speed, callback);
        }
    };

    publicMethod.load = function (launched) {
        var href, setResize, prep = publicMethod.prep;

        active = true;

        photo = false;

        element = $related[index];

        if (!launched) {
            makeSettings();
        }

        trigger(event_purge);

        trigger(event_load, settings.onLoad);

        settings.h = settings.height ?
            setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
            settings.innerHeight && setSize(settings.innerHeight, 'y');

        settings.w = settings.width ?
            setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
            settings.innerWidth && setSize(settings.innerWidth, 'x');

        // Sets the minimum dimensions for use in image scaling
        settings.mw = settings.w;
        settings.mh = settings.h;

        // Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
        // If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
        if (settings.maxWidth) {
            settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
            settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
        }
        if (settings.maxHeight) {
            settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
            settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
        }

        href = settings.href;

        loadingTimer = setTimeout(function () {
            $loadingOverlay.show().appendTo($content);
        }, 100);

        if (settings.inline) {
            // Inserts an empty placeholder where inline content is being pulled from.
            // An event is bound to put inline content back when ColorBox closes or loads new content.
            $tag(div).hide().insertBefore($(href)[0]).one(event_purge, function () {
                $(this).replaceWith($loaded.children());
            });
            prep($(href));
        } else if (settings.iframe) {
            // IFrame element won't be added to the DOM until it is ready to be displayed,
            // to avoid problems with DOM-ready JS that might be trying to run in that iframe.
            prep(" ");
        } else if (settings.html) {
            prep(settings.html);
        } else if (isImage(href)) {
            $(photo = new Image())
                .addClass(prefix + 'Photo')
                .error(function () {
                    settings.title = false;
                    prep($tag(div, 'Error').html(settings.imgError));
                })
                .load(function () {
                    var percent;
                    photo.onload = null; //stops animated gifs from firing the onload repeatedly.

                    if (settings.scalePhotos) {
                        setResize = function () {
                            photo.height -= photo.height * percent;
                            photo.width -= photo.width * percent;
                        };
                        if (settings.mw && photo.width > settings.mw) {
                            percent = (photo.width - settings.mw) / photo.width;
                            setResize();
                        }
                        if (settings.mh && photo.height > settings.mh) {
                            percent = (photo.height - settings.mh) / photo.height;
                            setResize();
                        }
                    }

                    if (settings.h) {
                        photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
                    }

                    if ($related[1] && (settings.loop || $related[index + 1])) {
                        photo.style.cursor = 'pointer';
                        photo.onclick = function () {
                            publicMethod.next();
                        };
                    }

                    if (isIE) {
                        photo.style.msInterpolationMode = 'bicubic';
                    }

                    setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
                        prep(photo);
                    }, 1);
                });

            setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
                photo.src = href;
            }, 1);
        } else if (href) {
            $loadingBay.load(href, settings.data, function (data, status, xhr) {
                prep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());
            });
        }
    };

    // Navigates to the next page/image in a set.
    publicMethod.next = function () {
        if (!active && $related[1] && (settings.loop || $related[index + 1])) {
            index = getIndex(1);
            publicMethod.load();
        }
    };

    publicMethod.prev = function () {
        if (!active && $related[1] && (settings.loop || index)) {
            index = getIndex(-1);
            publicMethod.load();
        }
    };

    // Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
    publicMethod.close = function () {
        if (open && !closing) {

            closing = true;

            open = false;

            trigger(event_cleanup, settings.onCleanup);

            $window.unbind('.' + prefix + ' .' + event_ie6);

            $overlay.fadeTo(200, 0);

            $box.stop().fadeTo(300, 0, function () {

                $box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();

                trigger(event_purge);

                $loaded.remove();

                setTimeout(function () {
                    closing = false;
                    trigger(event_closed, settings.onClosed);
                }, 1);
            });
        }
    };

    // Removes changes ColorBox made to the document, but does not remove the plugin
    // from jQuery.
    publicMethod.remove = function () {
        $([]).add($box).add($overlay).remove();
        $box = null;
        $('.' + boxElement)
            .removeData(colorbox)
            .removeClass(boxElement)
            .die();
    };

    // A method for fetching the current element ColorBox is referencing.
    // returns a jQuery object.
    publicMethod.element = function () {
        return $(element);
    };

    publicMethod.settings = defaults;

}(jQuery, document, window));

/*
 閫氱敤琛ㄥ崟楠岃瘉鏂规硶
 */

;(function($,win,undef){
    var errorobj=null,//鎸囩ず褰撳墠楠岃瘉澶辫触鐨勮〃鍗曞厓绱�;
        msgobj=null,//pop box object
        msghidden=true;//msgbox hidden?

    var tipmsg={//榛樿鎻愮ず鏂囧瓧;
        tit:"鎻愮ず淇℃伅",
        w:{
            "*":"涓嶈兘涓虹┖锛�",
            "*6-16":"璇峰～鍐�6鍒�16浣嶄换鎰忓瓧绗︼紒",
            "n":"璇峰～鍐欐暟瀛�!",
            "n6-16":"璇峰～鍐�6鍒�16浣嶆暟瀛楋紒",
            "s":"涓嶈兘杈撳叆鐗规畩瀛楃锛�",
            "s6-18":"璇峰～鍐�6鍒�18浣嶅瓧绗︼紒",
            "p":"璇峰～鍐欓偖鏀跨紪鐮�!",
            "m":"璇峰～鍐欐墜鏈哄彿鐮�!",
            "e":"閭鍦板潃鏍煎紡涓嶅!",
            "url":"璇峰～鍐欑綉鍧€!"
        },
        def:"璇峰～鍐欐纭俊鎭�!",
        undef:"datatype鏈畾涔夛紒",
        reck:"涓ゆ杈撳叆鐨勫唴瀹逛笉涓€鑷达紒",
        r:"楠岃瘉閫氳繃!",
        c:"姝ｅ湪鏍￠獙鈥�",
        s:"璇穥濉啓|閫夋嫨}{0|淇℃伅}锛�",
        v:"鎵€濉俊鎭病鏈夌粡杩囬獙璇�,璇风◢鍚庘€�",
        p:"姝ｅ湪鎻愪氦鏁版嵁鈥�"
    };
    $.Tipmsg=tipmsg;

    var Validform=function(forms,settings,inited){
        var settings=$.extend({},Validform.defaults,settings);
        settings.datatype && $.extend(Validform.util.dataType,settings.datatype);

        var brothers=this;
        brothers.tipmsg={w:{}};
        brothers.settings=settings;
        brothers.forms=forms;
        brothers.objects=[];

        //鍒涘缓瀛愬璞℃椂涓嶅啀缁戝畾浜嬩欢;
        if(inited===true){
            return false;
        }

        forms.each(function(){
            //宸茬粡缁戝畾浜嬩欢鏃惰烦杩囷紝閬垮厤浜嬩欢閲嶅缁戝畾;
            if(this.validform_inited=="inited"){return true;}
            this.validform_inited="inited";

            var $this=$(this);

            //闃叉琛ㄥ崟鎸夐挳鍙屽嚮鎻愪氦涓ゆ;
            this.validform_status="normal"; //normal | posting | posted;

            //label锛屽湪娌℃湁杈撳叆鏃舵煡鎵捐鏄剧ず鐨勬彁绀烘枃瀛�;
            this.validform_label=settings.label;

            //璁╂瘡涓猇alidform瀵硅薄閮借兘鑷畾涔塼ipmsg;
            $this.data("tipmsg",brothers.tipmsg);

            //bind the blur event;
            $this.delegate("[datatype]","blur",function(){
                //鍒ゆ柇鏄惁鏄湪鎻愪氦琛ㄥ崟鎿嶄綔鏃惰Е鍙戠殑楠岃瘉璇锋眰锛�
                var subpost=arguments[1];
                Validform.util.check.call(this,$this,brothers,subpost);
            });

            //鐐瑰嚮琛ㄥ崟鍏冪礌锛岄粯璁ゆ枃瀛楁秷澶辨晥鏋�;
            //琛ㄥ崟鍏冪礌鍊兼瘮杈冩椂鐨勪俊鎭彁绀哄寮�;
            //radio銆乧heckbox鎻愮ず淇℃伅澧炲己;
            //澶栬皟鎻掍欢鍒濆鍖�;
            Validform.util.enhance.call($this,settings.tiptype,settings.usePlugin,settings.tipSweep);

            settings.btnSubmit && $this.find(settings.btnSubmit).bind("click",function(){
                $this.trigger("submit");
                return false;
            });

            $this.submit(function(){
                var subflag=Validform.util.submitForm.call($this,settings);
                subflag === undef && (subflag=true);
                return subflag;
            });

            $this.find("[type='reset']").add($this.find(settings.btnReset)).bind("click",function(){
                Validform.util.resetForm.call($this);
            });

        });

        //棰勫垱寤簆op box;
        if( settings.tiptype==1 || (settings.tiptype==2 || settings.tiptype==3) && settings.ajaxPost ){
            creatMsgbox();
        }
    };

    Validform.defaults={
        tiptype:2,
        tipSweep:false,
        showAllError:false,
        postonce:true,
        ajaxPost:false
    };

    Validform.util={
        dataType:{
            "*":/[\w\W]+/,
            "*6-16":/^[\w\W]{6,16}$/,
            "n":/^\d+$/,
            "n6-16":/^\d{6,16}$/,
            "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
            "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
            "p":/^[0-9]{6}$/,
            "m":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
            "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/
        },

        toString:Object.prototype.toString,

        isEmpty:function(val){
            return val==="" || val===$.trim(this.attr("tip"));
        },

        getValue:function(obj){
            var inputval,
                curform=this;

            if(obj.is(":radio")){
                inputval=curform.find(":radio[name='"+obj.attr("name")+"']:checked").val();
                inputval= inputval===undef ? "" : inputval;
            }else if(obj.is(":checkbox")){
                inputval="";
                curform.find(":checkbox[name='"+obj.attr("name")+"']:checked").each(function(){
                    inputval +=$(this).val()+',';
                });
                inputval= inputval===undef ? "" : inputval;
            }else{
                inputval=obj.val();
            }
            inputval=$.trim(inputval);

            return Validform.util.isEmpty.call(obj,inputval) ? "" : inputval;
        },

        enhance:function(tiptype,usePlugin,tipSweep,addRule){
            var curform=this;

            //椤甸潰涓婁笉瀛樺湪鎻愮ず淇℃伅鐨勬爣绛炬椂锛岃嚜鍔ㄥ垱寤�;
            curform.find("[datatype]").each(function(){
                if(tiptype==2){
                    if($(this).parent().next().find(".Validform_checktip").length==0){
                        $(this).parent().next().append("<span class='Validform_checktip' />");
                    }
                }else if(tiptype==3 || tiptype==4){
                    if($(this).siblings(".Validform_checktip").length==0){
                        $(this).parent().append("<span class='Validform_checktip' />");
                    }
                }
            });

            //琛ㄥ崟鍏冪礌鍊兼瘮杈冩椂鐨勪俊鎭彁绀哄寮�;
            curform.find("input[recheck]").each(function(){
                //宸茬粡缁戝畾浜嬩欢鏃惰烦杩�;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var recheckinput=curform.find("input[name='"+$(this).attr("recheck")+"']");
                recheckinput.bind("keyup",function(){
                    if(recheckinput.val()==_this.val() && recheckinput.val() != ""){
                        if(recheckinput.attr("tip")){
                            if(recheckinput.attr("tip") == recheckinput.val()){return false;}
                        }
                        _this.trigger("blur");
                    }
                }).bind("blur",function(){
                        if(recheckinput.val()!=_this.val() && _this.val()!=""){
                            if(_this.attr("tip")){
                                if(_this.attr("tip") == _this.val()){return false;}
                            }
                            _this.trigger("blur");
                        }
                    });
            });

            //hasDefaultText;
            curform.find("[tip]").each(function(){//tip鏄〃鍗曞厓绱犵殑榛樿鎻愮ず淇℃伅,杩欐槸鐐瑰嚮娓呯┖鏁堟灉;
                //宸茬粡缁戝畾浜嬩欢鏃惰烦杩�;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var defaultvalue=$(this).attr("tip");
                var altercss=$(this).attr("altercss");
                $(this).focus(function(){
                    if($(this).val()==defaultvalue){
                        $(this).val('');
                        if(altercss){$(this).removeClass(altercss);}
                    }
                }).blur(function(){
                        if($.trim($(this).val())===''){
                            $(this).val(defaultvalue);
                            if(altercss){$(this).addClass(altercss);}
                        }
                    });
            });

            //enhance info feedback for checkbox & radio;
            curform.find(":checkbox[datatype],:radio[datatype]").each(function(){
                //宸茬粡缁戝畾浜嬩欢鏃惰烦杩�;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var name=_this.attr("name");
                curform.find("[name='"+name+"']").filter(":checkbox,:radio").bind("click",function(){
                    //閬垮厤澶氫釜浜嬩欢缁戝畾鏃剁殑鍙栧€兼粸鍚庨棶棰�;
                    setTimeout(function(){
                        _this.trigger("blur");
                    },0);
                });

            });

            //select multiple;
            curform.find("select[datatype][multiple]").bind("click",function(){
                var _this=$(this);
                setTimeout(function(){
                    _this.trigger("blur");
                },0);
            });

            //plugins here to start;
            Validform.util.usePlugin.call(curform,usePlugin,tiptype,tipSweep,addRule);
        },

        usePlugin:function(plugin,tiptype,tipSweep,addRule){
            /*
             plugin:settings.usePlugin;
             tiptype:settings.tiptype;
             tipSweep:settings.tipSweep;
             addRule:鏄惁鍦╝ddRule鏃惰Е鍙�;
             */

            var curform=this,
                plugin=plugin || {};
            //swfupload;
            if(curform.find("input[plugin='swfupload']").length && typeof(swfuploadhandler) != "undefined"){

                var custom={
                    custom_settings:{
                        form:curform,
                        showmsg:function(msg,type,obj){
                            Validform.util.showmsg.call(curform,msg,tiptype,{obj:curform.find("input[plugin='swfupload']"),type:type,sweep:tipSweep});
                        }
                    }
                };

                custom=$.extend(true,{},plugin.swfupload,custom);

                curform.find("input[plugin='swfupload']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).val("");
                    swfuploadhandler.init(custom,n);
                });

            }

            //datepicker;
            if(curform.find("input[plugin='datepicker']").length && $.fn.datePicker){
                plugin.datepicker=plugin.datepicker || {};

                if(plugin.datepicker.format){
                    Date.format=plugin.datepicker.format;
                    delete plugin.datepicker.format;
                }
                if(plugin.datepicker.firstDayOfWeek){
                    Date.firstDayOfWeek=plugin.datepicker.firstDayOfWeek;
                    delete plugin.datepicker.firstDayOfWeek;
                }

                curform.find("input[plugin='datepicker']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    plugin.datepicker.callback && $(this).bind("dateSelected",function(){
                        var d=new Date( $.event._dpCache[this._dpId].getSelected()[0] ).asString(Date.format);
                        plugin.datepicker.callback(d,this);
                    });
                    $(this).datePicker(plugin.datepicker);
                });
            }

            //passwordstrength;
            if(curform.find("input[plugin*='passwordStrength']").length && $.fn.passwordStrength){
                plugin.passwordstrength=plugin.passwordstrength || {};
                plugin.passwordstrength.showmsg=function(obj,msg,type){
                    Validform.util.showmsg.call(curform,msg,tiptype,{obj:obj,type:type,sweep:tipSweep});
                };

                curform.find("input[plugin='passwordStrength']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).passwordStrength(plugin.passwordstrength);
                });
            }

            //jqtransform;
            if(addRule!="addRule" && plugin.jqtransform && $.fn.jqTransSelect){
                var jqTransformHideSelect = function(oTarget){
                    var ulVisible = $('.jqTransformSelectWrapper ul:visible');
                    ulVisible.each(function(){
                        var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                        //do not hide if click on the label object associated to the select
                        if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
                    });
                };

                /* Check for an external click */
                var jqTransformCheckExternalClick = function(event) {
                    if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
                };

                var jqTransformAddDocumentListener = function (){
                    $(document).mousedown(jqTransformCheckExternalClick);
                };

                if(plugin.jqtransform.selector){
                    curform.find(plugin.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton();
                    curform.find(plugin.jqtransform.selector).filter('input:text, input:password').jqTransInputText();
                    curform.find(plugin.jqtransform.selector).filter('input:checkbox').jqTransCheckBox();
                    curform.find(plugin.jqtransform.selector).filter('input:radio').jqTransRadio();
                    curform.find(plugin.jqtransform.selector).filter('textarea').jqTransTextarea();
                    if(curform.find(plugin.jqtransform.selector).filter("select").length > 0 ){
                        curform.find(plugin.jqtransform.selector).filter("select").jqTransSelect();
                        jqTransformAddDocumentListener();
                    }

                }else{
                    curform.jqTransform();
                }

                curform.find(".jqTransformSelectWrapper").find("li a").click(function(){
                    $(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur");
                });
            }

        },

        getNullmsg:function(curform){
            var obj=this;
            var reg=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;
            var nullmsg;

            var label=curform[0].validform_label || ".Validform_label";
            label=obj.siblings(label).text() || obj.siblings().find(label).text() || obj.parent().siblings(label).text() ||  obj.parent().siblings().find(label).text();
            label=label.match(reg) || [""];

            reg=/\{(.+)\|(.+)\}/;
            nullmsg=curform.data("tipmsg").s || tipmsg.s;
            label=label[0].replace(/\s(?![a-zA-Z])/g,"");

            if(label != ""){
                nullmsg=nullmsg.replace(/\{0\|(.+)\}/,label);
                if(obj.attr("recheck")){
                    nullmsg=nullmsg.replace(/\{(.+)\}/,"");
                    obj.attr("nullmsg",nullmsg);
                    return nullmsg;
                }
            }else{
                nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/,"") : nullmsg.replace(/\{0\|(.+)\}/,"$1");
            }
            nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg,"$2") : nullmsg.replace(reg,"$1");

            obj.attr("nullmsg",nullmsg);
            return nullmsg;
        },

        getErrormsg:function(curform,datatype,recheck){
            var obj=this;
            var regxp=/^(.+?)((\d+)-(\d+))?$/,
                regxp2=/^(.+?)(\d+)-(\d+)$/,
                regxp3=/(.*?)\d+(.+?)\d+(.*)/,
                mac=datatype.match(regxp),
                temp,str;

            //濡傛灉鏄€间笉涓€鏍疯€屾姤閿�;
            if(recheck=="recheck"){
                str=curform.data("tipmsg").reck || tipmsg.reck;
                return str;
            }

            //濡傛灉鍘熸潵灏辨湁锛岀洿鎺ユ樉绀鸿椤圭殑鎻愮ず淇℃伅;
            if(mac[0] in tipmsg.w){
                return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
            }

            //娌℃湁鐨勮瘽鍦ㄦ彁绀哄璞￠噷鏌ユ壘鐩镐技;
            for(var name in tipmsg.w){
                if(name.indexOf(mac[1])!=-1 && regxp2.test(name)){
                    str=(curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3,"$1"+mac[3]+"$2"+mac[4]+"$3");
                    tipmsg.w[mac[0]]=str;

                    return str;
                }

            }

            return curform.data("tipmsg").def || tipmsg.def;
        },

        _regcheck:function(datatype,gets,obj,curform){
            var curform=curform,
                info=null,
                passed=false,
                reg=/\/.+\//g,
                regex=/^(.+?)(\d+)-(\d+)$/,
                type=3;//default set to wrong type, 2,3,4;

            //datatype鏈変笁绉嶆儏鍐碉細姝ｅ垯锛屽嚱鏁板拰鐩存帴缁戝畾鐨勬鍒�;

            //鐩存帴鏄鍒�;
            if(reg.test(datatype)){
                var regstr=datatype.match(reg)[0].slice(1,-1);
                var param=datatype.replace(reg,"");
                var rexp=RegExp(regstr,param);

                passed=rexp.test(gets);

                //function;
            }else if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object Function]"){
                passed=Validform.util.dataType[datatype](gets,obj,curform,Validform.util.dataType);
                if(passed === true || passed===undef){
                    passed = true;
                }else{
                    info= passed;
                    passed=false;
                }

                //鑷畾涔夋鍒�;
            }else{
                //鑷姩鎵╁睍datatype;
                if(!(datatype in Validform.util.dataType)){
                    var mac=datatype.match(regex),
                        temp;

                    if(!mac){
                        passed=false;
                        info=curform.data("tipmsg").undef||tipmsg.undef;
                    }else{
                        for(var name in Validform.util.dataType){
                            temp=name.match(regex);
                            if(!temp){continue;}
                            if(mac[1]===temp[1]){
                                var str=Validform.util.dataType[name].toString(),
                                    param=str.match(/\/[mgi]*/g)[1].replace("\/",""),
                                    regxp=new RegExp("\\{"+temp[2]+","+temp[3]+"\\}","g");
                                str=str.replace(/\/[mgi]*/g,"\/").replace(regxp,"{"+mac[2]+","+mac[3]+"}").replace(/^\//,"").replace(/\/$/,"");
                                Validform.util.dataType[datatype]=new RegExp(str,param);
                                break;
                            }
                        }
                    }
                }

                if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object RegExp]"){
                    passed=Validform.util.dataType[datatype].test(gets);
                }

            }


            if(passed){
                type=2;
                info=obj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r;

                //瑙勫垯楠岃瘉閫氳繃鍚庯紝杩橀渶瑕佸缁戝畾recheck鐨勫璞¤繘琛屽€兼瘮杈�;
                if(obj.attr("recheck")){
                    var theother=curform.find("input[name='"+obj.attr("recheck")+"']:first");
                    if(gets!=theother.val()){
                        passed=false;
                        type=3;
                        info=obj.attr("errormsg")  || Validform.util.getErrormsg.call(obj,curform,datatype,"recheck");
                    }
                }
            }else{
                info=info || obj.attr("errormsg") || Validform.util.getErrormsg.call(obj,curform,datatype);

                //楠岃瘉涓嶉€氳繃涓斾负绌烘椂;
                if(Validform.util.isEmpty.call(obj,gets)){
                    info=obj.attr("nullmsg") || Validform.util.getNullmsg.call(obj,curform);
                }
            }

            return{
                passed:passed,
                type:type,
                info:info
            };

        },

        regcheck:function(datatype,gets,obj){
            /*
             datatype:datatype;
             gets:inputvalue;
             obj:input object;
             */
            var curform=this,
                info=null,
                passed=false,
                type=3;//default set to wrong type, 2,3,4;

            //ignore;
            if(obj.attr("ignore")==="ignore" && Validform.util.isEmpty.call(obj,gets)){
                if(obj.data("cked")){
                    info="";
                }

                return {
                    passed:true,
                    type:4,
                    info:info
                };
            }

            obj.data("cked","cked");//do nothing if is the first time validation triggered;

            var dtype=Validform.util.parseDatatype(datatype);
            var res;
            for(var eithor=0; eithor<dtype.length; eithor++){
                for(var dtp=0; dtp<dtype[eithor].length; dtp++){
                    res=Validform.util._regcheck(dtype[eithor][dtp],gets,obj,curform);
                    if(!res.passed){
                        break;
                    }
                }
                if(res.passed){
                    break;
                }
            }
            return res;

        },

        parseDatatype:function(datatype){
            /*
             瀛楃涓查噷闈㈠彧鑳藉惈鏈変竴涓鍒欒〃杈惧紡;
             Datatype鍚嶇О蹇呴』鏄瓧姣嶏紝鏁板瓧銆佷笅鍒掔嚎鎴�*鍙风粍鎴�;
             datatype="/regexp/|phone|tel,s,e|f,e";
             ==>[["/regexp/"],["phone"],["tel","s","e"],["f","e"]];
             */

            var reg=/\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
                dtype=datatype.match(reg),
                sepor=datatype.replace(reg,"").replace(/\s*/g,"").split(""),
                arr=[],
                m=0;

            arr[0]=[];
            arr[0].push(dtype[0]);
            for(var n=0;n<sepor.length;n++){
                if(sepor[n]=="|"){
                    m++;
                    arr[m]=[];
                }
                arr[m].push(dtype[n+1]);
            }

            return arr;
        },

        showmsg:function(msg,type,o,triggered){
            /*
             msg:鎻愮ず鏂囧瓧;
             type:鎻愮ず淇℃伅鏄剧ず鏂瑰紡;
             o:{obj:褰撳墠瀵硅薄, type:1=>姝ｅ湪妫€娴� | 2=>閫氳繃, sweep:true | false},
             triggered:鍦╞lur鎴栨彁浜よ〃鍗曡Е鍙戠殑楠岃瘉涓紝鏈変簺鎯呭喌涓嶉渶瑕佹樉绀烘彁绀烘枃瀛楋紝濡傝嚜瀹氫箟寮瑰嚭鎻愮ず妗嗙殑鏄剧ず鏂瑰紡锛屼笉闇€瑕佹瘡娆lur鏃跺氨椹笂寮瑰嚭鎻愮ず;

             tiptype:1\2\3鏃堕兘鏈夊潙鑳戒細寮瑰嚭鑷畾涔夋彁绀烘
             tiptype:1鏃跺湪triggered bycheck鏃朵笉寮规
             tiptype:2\3鏃跺湪ajax鏃跺脊妗�
             tipSweep涓簍rue鏃跺湪triggered bycheck鏃朵笉瑙﹀彂showmsg锛屼絾ajax鍑洪敊鐨勬儏鍐典笅瑕佹彁绀�
             */

            //濡傛灉msg涓簎ndefined锛岄偅涔堝氨娌″繀瑕佹墽琛屽悗闈㈢殑鎿嶄綔锛宨gnore鏈夊彲鑳戒細鍑虹幇杩欐儏鍐�;
            if(msg==undef){return;}

            //tipSweep涓簍rue锛屼笖褰撳墠涓嶆槸澶勪簬閿欒鐘舵€佹椂锛宐lur浜嬩欢涓嶈Е鍙戜俊鎭樉绀�;
            if(triggered=="bycheck" && o.sweep && (o.obj && !o.obj.is(".Validform_error") || typeof type == "function")){return;}

            $.extend(o,{curform:this});

            if(typeof type == "function"){
                type(msg,o,Validform.util.cssctl);
                return;
            }

            if(type==1 || triggered=="byajax" && type!=4){
                msgobj.find(".Validform_info").html(msg);
            }

            //tiptypt=1鏃讹紝blur瑙﹀彂showmsg锛岄獙璇佹槸鍚﹂€氳繃閮戒笉寮规锛屾彁浜よ〃鍗曡Е鍙戠殑璇濓紝鍙楠岃瘉鍑洪敊锛屽氨寮规;
            if(type==1 && triggered!="bycheck" && o.type!=2 || triggered=="byajax" && type!=4){
                msghidden=false;
                msgobj.find(".iframe").css("height",msgobj.outerHeight());
                msgobj.show();
                setCenter(msgobj,100);
            }

            if(type==2 && o.obj){
                o.obj.parent().next().find(".Validform_checktip").html(msg);
                Validform.util.cssctl(o.obj.parent().next().find(".Validform_checktip"),o.type);
            }

            if((type==3 || type==4) && o.obj){
                o.obj.siblings(".Validform_checktip").html(msg);
                Validform.util.cssctl(o.obj.siblings(".Validform_checktip"),o.type);
            }

        },

        cssctl:function(obj,status){
            switch(status){
                case 1:
                    obj.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip Validform_loading");//checking;
                    break;
                case 2:
                    obj.removeClass("Validform_wrong Validform_loading").addClass("Validform_checktip Validform_right");//passed;
                    break;
                case 4:
                    obj.removeClass("Validform_right Validform_wrong Validform_loading").addClass("Validform_checktip");//for ignore;
                    break;
                default:
                    obj.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong");//wrong;
            }
        },

        check:function(curform,brothers,subpost,bool){
            /*
             妫€娴嬪崟涓〃鍗曞厓绱�;
             楠岃瘉閫氳繃杩斿洖true锛屽惁鍒欒繑鍥瀎alse銆佸疄鏃堕獙璇佽繑鍥炲€间负ajax;
             bool锛屼紶鍏rue鍒欏彧妫€娴嬩笉鏄剧ず鎻愮ず淇℃伅;
             */
            var settings=brothers.settings;
            var subpost=subpost || "";
            var inputval=Validform.util.getValue.call(curform,$(this));

            //闅愯棌鎴栫粦瀹歞ataIgnore鐨勮〃鍗曞璞′笉鍋氶獙璇�;
            if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
                return true;
            }

            //dragonfly=true鏃讹紝娌℃湁缁戝畾ignore锛屽€间负绌轰笉鍋氶獙璇侊紝浣嗛獙璇佷笉閫氳繃;
            if(settings.dragonfly && !$(this).data("cked") && Validform.util.isEmpty.call($(this),inputval) && $(this).attr("ignore")!="ignore"){
                return false;
            }

            var flag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

            //鍊兼病鍙樺寲涓嶅仛妫€娴嬶紝杩欐椂瑕佽€冭檻recheck鎯呭喌;
            //涓嶆槸鍦ㄦ彁浜よ〃鍗曟椂瑙﹀彂鐨刟jax楠岃瘉;
            if(inputval==this.validform_lastval && !$(this).attr("recheck") && subpost==""){
                return flag.passed ? true : false;
            }

            this.validform_lastval=inputval;//瀛樺偍褰撳墠鍊�;

            var _this;
            errorobj=_this=$(this);

            if(!flag.passed){
                //鍙栨秷姝ｅ湪杩涜鐨刟jax楠岃瘉;
                Validform.util.abort.call(_this[0]);

                if(!bool){
                    //浼犲叆"bycheck"锛屾寚绀哄綋鍓嶆槸check鏂规硶閲岃皟鐢ㄧ殑锛屽綋tiptype=1鏃讹紝blur浜嬩欢涓嶈瑙﹀彂閿欒淇℃伅鏄剧ず;
                    Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");

                    !settings.tipSweep && _this.addClass("Validform_error");
                }
                return false;
            }

            //楠岃瘉閫氳繃鐨勮瘽锛屽鏋滅粦瀹氭湁ajaxurl锛岃鎵цajax妫€娴�;
            //褰搃gnore="ignore"鏃讹紝涓虹┖鍊煎彲浠ラ€氳繃楠岃瘉锛岃繖鏃朵笉闇€瑕乤jax妫€娴�;
            var ajaxurl=$(this).attr("ajaxurl");
            if(ajaxurl && !Validform.util.isEmpty.call($(this),inputval) && !bool){
                var inputobj=$(this);

                //褰撴彁浜よ〃鍗曟椂锛岃〃鍗曚腑鐨勬煇椤瑰凡缁忓湪鎵цajax妫€娴嬶紝杩欐椂闇€瑕佽璇ラ」ajax缁撴潫鍚庣户缁彁浜よ〃鍗�;
                if(subpost=="postform"){
                    inputobj[0].validform_subpost="postform";
                }else{
                    inputobj[0].validform_subpost="";
                }

                if(inputobj[0].validform_valid==="posting" && inputval==inputobj[0].validform_ckvalue){return "ajax";}

                inputobj[0].validform_valid="posting";
                inputobj[0].validform_ckvalue=inputval;
                Validform.util.showmsg.call(curform,brothers.tipmsg.c||tipmsg.c,settings.tiptype,{obj:inputobj,type:1,sweep:settings.tipSweep},"bycheck");

                Validform.util.abort.call(_this[0]);

                var ajaxsetup=curform[0].validform_config || {};
                ajaxsetup=ajaxsetup.ajaxurl || {};

                var data = {};
                data[$(this).attr("name")] = inputval;
                var localconfig={
                    type: "POST",
                    cache:false,
                    url: ajaxurl,
                    data: data,
                    success: function(data){
                        if($.trim(data.status)==="y"){
                            inputobj[0].validform_valid="true";
                            data.info && inputobj.attr("sucmsg",data.info);
                            Validform.util.showmsg.call(curform,inputobj.attr("sucmsg") || brothers.tipmsg.r||tipmsg.r,settings.tiptype,{obj:inputobj,type:2,sweep:settings.tipSweep},"bycheck");
                            _this.removeClass("Validform_error");
                            errorobj=null;
                            if(inputobj[0].validform_subpost=="postform"){
                                curform.trigger("submit");
                            }
                        }else{
                            inputobj[0].validform_valid=data.info;
                            Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
                            _this.addClass("Validform_error");
                        }
                        _this[0].validform_ajax=null;
                    },
                    error: function(data){
                        if(data.status=="200"){
                            if(data.responseText=="y"){
                                ajaxsetup.success({"status":"y"});
                            }else{
                                ajaxsetup.success({"status":"n","info":data.responseText});
                            }
                            return false;
                        }

                        //姝ｅ湪妫€娴嬫椂锛岃妫€娴嬬殑鏁版嵁鍙戠敓鏀瑰彉锛岃繖鏃惰缁堟褰撳墠鐨刟jax銆備笉鏄繖绉嶆儏鍐靛紩璧风殑ajax閿欒锛岄偅涔堟樉绀虹浉鍏抽敊璇俊鎭�;
                        if(data.statusText!=="abort"){
                            var msg="status: "+data.status+"; statusText: "+data.statusText;

                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
                            _this.addClass("Validform_error");
                        }

                        inputobj[0].validform_valid=data.statusText;
                        _this[0].validform_ajax=null;

                        //localconfig.error杩斿洖true琛ㄧず杩橀渶瑕佹墽琛宼emp_err;
                        return true;
                    }
                };

                if(ajaxsetup.success){
                    var temp_suc=ajaxsetup.success;
                    ajaxsetup.success=function(data){
                        localconfig.success(data);
                        temp_suc(data,inputobj);
                    };
                }

                if(ajaxsetup.error){
                    var temp_err=ajaxsetup.error;
                    ajaxsetup.error=function(data){
                        //localconfig.error杩斿洖false琛ㄧず涓嶉渶瑕佹墽琛宼emp_err;
                        localconfig.error(data) && temp_err(data,inputobj);
                    };
                }

                ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});
                _this[0].validform_ajax=$.ajax(ajaxsetup);

                return "ajax";
            }else if(ajaxurl && Validform.util.isEmpty.call($(this),inputval)){
                Validform.util.abort.call(_this[0]);
                _this[0].validform_valid="true";
            }

            if(!bool){
                Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");
                _this.removeClass("Validform_error");
            }
            errorobj=null;

            return true;

        },

        submitForm:function(settings,flg,url,ajaxPost,sync){
            /*
             flg===true鏃惰烦杩囬獙璇佺洿鎺ユ彁浜�;
             ajaxPost==="ajaxPost"鎸囩ず褰撳墠琛ㄥ崟浠jax鏂瑰紡鎻愪氦;
             */
            var curform=this;

            //琛ㄥ崟姝ｅ湪鎻愪氦鏃剁偣鍑绘彁浜ゆ寜閽笉鍋氬弽搴�;
            if(curform[0].validform_status==="posting"){return false;}

            //瑕佹眰鍙兘鎻愪氦涓€娆℃椂;
            if(settings.postonce && curform[0].validform_status==="posted"){return false;}

            var beforeCheck=settings.beforeCheck && settings.beforeCheck(curform);
            if(beforeCheck===false){return false;}

            var flag=true,
                inflag;

            curform.find("[datatype]").each(function(){
                //璺宠繃楠岃瘉;
                if(flg){
                    return false;
                }

                //闅愯棌鎴栫粦瀹歞ataIgnore鐨勮〃鍗曞璞′笉鍋氶獙璇�;
                if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
                    return true;
                }

                var inputval=Validform.util.getValue.call(curform,$(this)),
                    _this;
                errorobj=_this=$(this);

                inflag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

                if(!inflag.passed){
                    Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
                    _this.addClass("Validform_error");

                    if(!settings.showAllError){
                        _this.focus();
                        flag=false;
                        return false;
                    }

                    flag && (flag=false);
                    return true;
                }

                //褰搃gnore="ignore"鏃讹紝涓虹┖鍊煎彲浠ラ€氳繃楠岃瘉锛岃繖鏃朵笉闇€瑕乤jax妫€娴�;
                if($(this).attr("ajaxurl") && !Validform.util.isEmpty.call($(this),inputval)){
                    if(this.validform_valid!=="true"){
                        var thisobj=$(this);
                        Validform.util.showmsg.call(curform,curform.data("tipmsg").v||tipmsg.v,settings.tiptype,{obj:thisobj,type:3,sweep:settings.tipSweep});
                        _this.addClass("Validform_error");

                        thisobj.trigger("blur",["postform"]);//continue the form post;

                        if(!settings.showAllError){
                            flag=false;
                            return false;
                        }

                        flag && (flag=false);
                        return true;
                    }
                }else if($(this).attr("ajaxurl") && Validform.util.isEmpty.call($(this),inputval)){
                    Validform.util.abort.call(this);
                    this.validform_valid="true";
                }

                Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
                _this.removeClass("Validform_error");
                errorobj=null;
            });

            if(settings.showAllError){
                //curform.find(".Validform_error:first").focus();
            }

            if(flag){
                var beforeSubmit=settings.beforeSubmit && settings.beforeSubmit(curform);
                if(beforeSubmit===false){return false;}

                curform[0].validform_status="posting";

                var config=curform[0].validform_config || {};

                if(settings.ajaxPost || ajaxPost==="ajaxPost"){
                    //鑾峰彇閰嶇疆鍙傛暟;
                    var ajaxsetup=config.ajaxpost || {};
                    //鏈夊彲鑳介渶瑕佸姩鎬佺殑鏀瑰彉鎻愪氦鍦板潃锛屾墍浠ユ妸action鎵€鎸囧畾鐨剈rl灞傜骇璁句负鏈€浣�;
                    ajaxsetup.url=url || ajaxsetup.url || config.url || curform.attr("action");

                    //byajax锛歛jax鏃讹紝tiptye涓�1銆�2鎴�3闇€瑕佸脊鍑烘彁绀烘;
                    //濡傛灉setup閲屽凡缁忚嚜瀹氫箟浜唖uccess鎴杄rror鏂规硶锛岃繖閲屼笉鏄剧ず鎻愮ず淇℃伅;
                    ajaxsetup.success || ajaxsetup.error || Validform.util.showmsg.call(curform,curform.data("tipmsg").p||tipmsg.p,settings.tiptype,{obj:curform,type:1,sweep:settings.tipSweep},"byajax");

                    //鏂规硶閲岀殑浼樺厛绾ц楂�;
                    //鏈塽ndefined鎯呭喌;
                    if(sync){
                        ajaxsetup.async=false;
                    }else if(sync===false){
                        ajaxsetup.async=true;
                    }

                    if(ajaxsetup.success){
                        var temp_suc=ajaxsetup.success;
                        ajaxsetup.success=function(data){
                            settings.callback && settings.callback(data);
                            curform[0].validform_ajax=null;
                            if($.trim(data.status)==="y"){
                                curform[0].validform_status="posted";
                            }else{
                                curform[0].validform_status="normal";
                            }

                            temp_suc(data,curform);
                        };
                    }

                    if(ajaxsetup.error){
                        var temp_err=ajaxsetup.error;
                        ajaxsetup.error=function(data){
                            settings.callback && settings.callback(data);
                            curform[0].validform_status="normal";
                            curform[0].validform_ajax=null;

                            temp_err(data,curform);
                        };
                    };

                    var localconfig={
                        type: "POST",
                        async:true,
                        data: curform.serializeArray(),
                        success: function(data){
                            if($.trim(data.status)==="y"){
                                //鎴愬姛鎻愪氦;
                                curform[0].validform_status="posted";
                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:2,sweep:settings.tipSweep},"byajax");
                            }else{
                                //鎻愪氦鍑洪敊;
                                curform[0].validform_status="normal";
                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");
                            }

                            settings.callback && settings.callback(data);
                            curform[0].validform_ajax=null;
                        },
                        error: function(data){
                            var msg="status: "+data.status+"; statusText: "+data.statusText;

                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");

                            settings.callback && settings.callback(data);
                            curform[0].validform_status="normal";
                            curform[0].validform_ajax=null;
                        }
                    };

                    ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});

                    curform[0].validform_ajax=$.ajax(ajaxsetup);

                }else{
                    if(!settings.postonce){
                        curform[0].validform_status="normal";
                    }

                    var url=url || config.url;
                    if(url){
                        curform.attr("action",url);
                    }

                    return settings.callback && settings.callback(curform);
                }
            }

            return false;

        },

        resetForm:function(){
            var brothers=this;
            brothers.each(function(){
                this.reset();
                this.validform_status="normal";
            });

            brothers.find(".Validform_right").text("");
            brothers.find(".passwordStrength").children().removeClass("bgStrength");
            brothers.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading");
            brothers.find(".Validform_error").removeClass("Validform_error");
            brothers.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function(){
                this.validform_lastval=null;
            });
            brothers.eq(0).find("input:first").focus();
        },

        abort:function(){
            if(this.validform_ajax){
                this.validform_ajax.abort();
            }
        }

    };

    $.Datatype=Validform.util.dataType;

    Validform.prototype={
        dataType:Validform.util.dataType,

        eq:function(n){
            var obj=this;

            if(n>=obj.forms.length){
                return null;
            }

            if(!(n in obj.objects)){
                obj.objects[n]=new Validform($(obj.forms[n]).get(),obj.settings,true);
            }

            return obj.objects[n];

        },

        resetStatus:function(){
            var obj=this;
            $(obj.forms).each(function(){
                this.validform_status="normal";
            });

            return this;
        },

        setStatus:function(status){
            var obj=this;
            $(obj.forms).each(function(){
                this.validform_status=status || "posting";
            });

            return this;
        },

        getStatus:function(){
            var obj=this;
            var status=$(obj.forms)[0].validform_status;

            return status;
        },

        ignore:function(selector){
            var obj=this;
            var selector=selector || "[datatype]";

            $(obj.forms).find(selector).each(function(){
                $(this).data("dataIgnore","dataIgnore").removeClass("Validform_error");
            });

            return this;
        },

        unignore:function(selector){
            var obj=this;
            var selector=selector || "[datatype]";

            $(obj.forms).find(selector).each(function(){
                $(this).removeData("dataIgnore");
            });

            return this;
        },

        addRule:function(rule){
            /*
             rule => [{
             ele:"#id",
             datatype:"*",
             errormsg:"鍑洪敊鎻愮ず鏂囧瓧锛�",
             nullmsg:"涓虹┖鏃剁殑鎻愮ず鏂囧瓧锛�",
             tip:"榛樿鏄剧ず鐨勬彁绀烘枃瀛�",
             altercss:"gray",
             ignore:"ignore",
             ajaxurl:"valid.php",
             recheck:"password",
             plugin:"passwordStrength"
             },{},{},...]
             */
            var obj=this;
            var rule=rule || [];

            for(var index=0; index<rule.length; index++){
                var o=$(obj.forms).find(rule[index].ele);
                for(var attr in rule[index]){
                    attr !=="ele" && o.attr(attr,rule[index][attr]);
                }
            }

            $(obj.forms).each(function(){
                var $this=$(this);
                Validform.util.enhance.call($this,obj.settings.tiptype,obj.settings.usePlugin,obj.settings.tipSweep,"addRule");
            });

            return this;
        },

        ajaxPost:function(flag,sync,url){
            var obj=this;

            //鍒涘缓pop box;
            if( obj.settings.tiptype==1 || obj.settings.tiptype==2 || obj.settings.tiptype==3 ){
                creatMsgbox();
            }

            Validform.util.submitForm.call($(obj.forms[0]),obj.settings,flag,url,"ajaxPost",sync);

            return this;
        },

        submitForm:function(flag,url){
            /*flag===true鏃朵笉鍋氶獙璇佺洿鎺ユ彁浜�*/


            var obj=this;

            //璁╄瀵硅薄鐨勭涓€涓〃鍗曟彁浜�;
            var subflag=Validform.util.submitForm.call($(obj.forms[0]),obj.settings,flag,url);
            subflag === undef && (subflag=true);
            if(subflag===true){
                obj.forms[0].submit();
            }

            return this;
        },

        resetForm:function(){
            var obj=this;
            Validform.util.resetForm.call($(obj.forms));

            return this;
        },

        abort:function(){
            var obj=this;
            $(obj.forms).each(function(){
                Validform.util.abort.call(this);
            });

            return this;
        },

        check:function(bool,selector){
            /*
             bool锛氫紶鍏rue锛屽彧妫€娴嬩笉鏄剧ず鎻愮ず淇℃伅;
             */

            var selector=selector || "[datatype]",
                obj=this,
                curform=$(obj.forms),
                flag=true;

            curform.find(selector).each(function(){
                Validform.util.check.call(this,curform,obj,"",bool) || (flag=false);
            });

            return flag;
        },

        config:function(setup){
            /*
             config={
             url:"ajaxpost.php",//鎸囧畾浜唘rl鍚庯紝鏁版嵁浼氭彁浜ゅ埌杩欎釜鍦板潃;
             ajaxurl:{
             timeout:1000,
             ...
             },
             ajaxpost:{
             timeout:1000,
             ...
             }
             }
             */
            var obj=this;
            setup=setup || {};
            $(obj.forms).each(function(){
                this.validform_config=$.extend(true,this.validform_config,setup);
            });

            return this;
        }
    };

    $.fn.Validform=function(settings){
        return new Validform(this,settings);
    };

    function setCenter(obj,time){
        var left=($(window).width()-obj.outerWidth())/2,
            top=($(window).height()-obj.outerHeight())/2,

            top=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);

        obj.css({
            left:left
        }).animate({
                top : top
            },{ duration:time , queue:false });
    }

    function creatMsgbox(){
        if($("#Validform_msg").length!==0){return false;}
        msgobj=$('<div id="Validform_msg"><div class="Validform_title">'+tipmsg.tit+'<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body");//鎻愮ず淇℃伅妗�;
        msgobj.find("a.Validform_close").click(function(){
            msgobj.hide();
            msghidden=true;
            if(errorobj){
                errorobj.focus().addClass("Validform_error");
            }
            return false;
        }).focus(function(){this.blur();});

        $(window).bind("scroll resize",function(){
            !msghidden && setCenter(msgobj,400);
        });
    };

    //鍏敤鏂规硶鏄剧ず&鍏抽棴淇℃伅鎻愮ず妗�;
    $.Showmsg=function(msg){
        creatMsgbox();
        Validform.util.showmsg.call(win,msg,1,{});
    };

    $.Hidemsg=function(){
        msgobj.hide();
        msghidden=true;
    };

})(jQuery,window);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch(er) {}
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                config.raw ? key : encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {
        expires: 365,
        path: '/'
    };

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            $.cookie(key, '', $.extend(options, { expires: -1 }));
            return true;
        }
        return false;
    };
}));