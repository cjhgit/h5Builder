/**
 * H5页面在线制作工具
 *
 * Created by cjh1 on 2016/7/20.
 */
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }
}


$(document).ready(function () {
    'use strict';

    var $curElem;
    var $elemMenu = $('#elem-menu');
    var $previewMenu = $('#preview-menu');

    function selectElem($this) {

        disableActiveElem();

        $curElem = $this;
        $this.addClass('active');
        $('#resize-tool').appendTo($this);
        $('#resize-tool').show();

        $this.draggable({
            cursor: "move",
            scroll: false,
            opacity: 0.5,
            //containment: '.device-body',
            distance: 5,
            zIndex: 10000,
            drag: function (event, ui) {
                //alert(1);
            }
        });
        $this.resizable({
            handles: 'n, e, s, w, ne, se, sw, nw'
        });
        $this.draggable('enable');
        $this.resizable('enable');

        if ($this.hasClass('elem-text')) {
            var $content = $this.find('.elem-content');
            dealTextElem($this);
        } else if ($this.hasClass('elem-img')) {
            var $content = $this.find('.elem-content');
            dealImageElem($this);
        }

        $('.tab-content').show();
        /*$('#tab11').show();
         $('#tab12').show();
         $('#tab13').show();
         $('#tab14').show();*/
    }

    // 编辑区域
    $(document).on('click', '.elem', function (e) {
        e.stopPropagation();

        if (displaying) {
            return false;
        }

        var $this = $(this);
        selectElem($this);
    });

    // 元素右键菜单
    $(document).on('contextmenu', '.elem', function (e) {
        e.preventDefault();

        if (e.clientY < 400) {
            $elemMenu.css({
                'left': e.clientX,
                'top': e.clientY
            });
        } else {
            $elemMenu.css({
                'left': e.clientX,
                'top': e.clientY - $elemMenu.height()
            });
        }

        $elemMenu.show();

        selectElem($(this));
    });
    $(document).on('click', function (e) {
        $elemMenu.hide();
    });
    // 置于顶层
    $('#elem-menu-move-front').on('click', function () {
        var $siblings = $curElem.siblings();
        var zIndex = $curElem.css('z-index');
        $curElem.css('z-index', $siblings.length);
        $siblings.each(function () {
            var z = $(this).css('z-index');
            if (z > zIndex) {
                $(this).css('z-index', z - 1);
            }
        });
    });
    // 上移一层
    $('#elem-menu-move-up').on('click', function () {
        var zIndex = $curElem.css('z-index');
        var $siblings = $curElem.siblings();
        if (zIndex >= $siblings.length) {
            return;
        }
        $curElem.css('z-index', zIndex + 1);
        $siblings.each(function () {
            var z = $(this).css('z-index');
            if (parseInt(z) === parseInt(zIndex) + 1) {
                $(this).css('z-index', zIndex);
            }
        });
    });
    // 置于底层
    $('#elem-menu-move-behind').on('click', function () {
        var zIndex = $curElem.css('z-index');
        $curElem.css('z-index', 0);
        $curElem.siblings().each(function () {
            var z = $(this).css('z-index');
            if (z < zIndex) {
                $(this).css('z-index', z + 1);
            }
        });
    });
    // 下移一层
    $('#elem-menu-move-down').on('click', function () {
        var zIndex = $curElem.css('z-index');
        if (zIndex === 0) {
            return;
        }
        $curElem.css('z-index', zIndex - 1);
        $curElem.siblings().each(function () {
            var z = $(this).css('z-index');
            if (parseInt(z) === parseInt(zIndex) - 1) {
                $(this).css('z-index', zIndex);
            }
        });
    });
    // 删除元素
    $('#elem-menu-delete').on('click', function (e) {
        e.preventDefault();
        $elemMenu.hide();

        $('#resize-tool').appendTo($(document.body));
        $('#resize-tool').hide();

        $curElem.remove();
    });

    // 左侧预览右键菜单
    $(document).on('contextmenu', '.preview-item', function (e) {
        e.preventDefault();

        if (e.clientY < 400) {
            $previewMenu.css({
                'left': e.clientX,
                'top': e.clientY
            });
        } else {
            $previewMenu.css({
                'left': e.clientX,
                'top': e.clientY - $previewMenu.height()
            });
        }

        $previewMenu.show();

        selectPreviewitem($(this));
    });
    $(document).on('click', function (e) {
        $previewMenu.hide();
    });
    // 删除页面
    $('#preview-menu-delete').on('click', function (e) {
        e.preventDefault();
        $previewMenu.hide();

        var $removeItem = $curPreviewItem;

        var $newElem = $('#preview-list').children().first();
        $newElem.addClass('active');
        selectPreviewitem($newElem);


        /*
         if ($curPreviewItem.hasClass('active')) {
         var $next = $curPreviewItem.next();
         if ($next.length) {
         $next.addClass('active');
         selectPreviewitem($next);
         } else {
         var $prev = $curPreviewItem.prev();
         if ($prev.length) {
         $prev.addClass('active');
         selectPreviewitem($prev);
         }
         }
         }
         */
        $removeItem.remove();


    });

    function disableActiveElem() {
        var $prevElem = $('.elem.active');
        if ($prevElem.length) {
            $prevElem.draggable('disable');
            $prevElem.draggable('disable');
            $prevElem.resizable('disable');
            $prevElem.removeClass('active');

            $('#resize-tool').appendTo($(document.body));
            $('#resize-tool').hide();
        }

    }

    function hideBaseEditor() {
        $('#editor-base-box').show();
        $('#editor-text-box').hide();
        $('#editor-img-box').hide();
        $('#editor-style-box').hide();
        $('#editor-anim-box2').hide();
    }

    // 点击工作台空白位置
    $('.h5-container').on('click', function () {
        disableActiveElem();

        // 隐藏多余的功能
        hideBaseEditor();

        //$('.tab-content').hide();
        /*$('#tab11').hide();
         $('#tab12').hide();
         $('#tab13').hide();
         $('#tab14').hide();*/
    });

    // 添加新页面
    $('#new-page').on('click', function () {
        var html = '<li class="preview-item">'
            + '<div class="viewport-box">'
            + '  <div class="viewport"></div>'
            + '</div></li>';
        var $item = $(html);
        var $previewList = $('#preview-list');
        $previewList.append($item);
        $previewList.scrollTop($previewList[0].scrollHeight);
        selectPreviewitem($item);
    });

    // 保存
    $('#save').on('click', function () {
        saveModify();

        eui.msg('功能暂未实现');
        //$('#test-item .viewport').html($('#demo').html());
    });

    // 发布
    $('#publish').on('click', function () {
        eui.msg('功能暂未实现');
    });

    var $curPreviewItem;

    /* 保存当前修改 */
    function saveModify() {
        var $viewport = $('.preview-item.active .viewport');
        var $demo = $('#demo');
        $viewport.html($demo.html());
        $viewport.css('background-color', $demo.css('background-color'));
        $viewport.css('background-image', $demo.css('background-image'));
    }

    function selectPage(index) {
        var $item = $('#preview-list').children().eq(index);
        selectPreviewitem($item);
    }


    function selectPreviewitem($item) {
        $curPreviewItem = $item;


        var $demo = $('#demo');

        $item.siblings().removeClass('active').end().addClass('active');

        var $newViewport = $item.find('.viewport');
        $demo.html($newViewport.html());
        $demo.css('background-color', $newViewport.css('background-color'));
        $demo.css('background-image', $newViewport.css('background-image'));

        $('.elem.active').removeClass('active');

        $('#resize-tool').appendTo($(document.body));
        $('#resize-tool').hide();

        dealBg();
    }

    var curIndex = 0;
    // 点击左侧预览，保存并更新编辑区
    $('#preview-list').on('click', '.preview-item', function () {
        disableActiveElem();
        saveModify();
        selectPreviewitem($(this));
    });
    $("#preview-list").sortable();
    /* 展示 */
    $('#display-close').on('click', function () {
        displaying = false;
        $('#display').hide();
        $('#demo').show();
    });
    function startAnim() {
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        var $cur = $items.eq(displayIndex);

        $('[data-anim]', $items).each(function () {
            var $this = $(this);
            //$this.hide();

            // 添加新动画
            var anim = $this.attr('data-anim');
            $this.addClass('animated');
            $this.addClass(anim);
        });
        //$cur.data('anim').split(';');
    }

    $('#display-show').on('click', function () {
        disableActiveElem();
        saveModify();
        initDisplay();
        hideBaseEditor();
        displaying = true; // TODO 上到上面？
        displayIndex = 0;
        $('#demo').hide();
        $('#display').show();
        startAnim();
    });
    var displayIndex = 0;
    var totalPage = 4;
    var displaying = false;

    function initDisplay() {
        $('.preview-item.active .viewport').html($('#demo').html());

        var $previewList = $('#preview-list');
        var $previewItems = $previewList.find('.preview-item');
        totalPage = $previewItems.length;
        var $list = $('.display-list');
        $list.empty();
        var html = '';
        var i = 0;
        $previewItems.each(function () {
            i++;
            var $viewport = $(this).find('.viewport');
            var bgImage = $viewport.css('background-image');
            bgImage = bgImage.replace(/\"/g, "'");
            //bgImage = "url('asset/img/demo/visit-bg.jpg')";

            html += '<li class="display-item" asd' + i + " style=\";background-image: " + bgImage + ";background-color: " + $viewport.css('background-color') + ';">' + $viewport.html() + '</li>'
        });
        $list.html(html);
        $('.display-list').find('.display-item').eq(0).show();
    }

    function prevDisplay() {
        if (displayIndex > 0) {
            displayIndex--;
            var $list = $('.display-list');
            var $items = $list.find('.display-item');
            var $curItem = $items.eq(displayIndex + 1);

            $curItem.animate({
                top: '100%'
            }, 500);


            var $prevItem = $items.eq(displayIndex);
            $prevItem.show();
            $prevItem.css('top', '-100%');
            $prevItem.animate({
                top: '0%'
            }, 500, function () {
                startAnim();
            });

        }
    }

    function nextDisplay() {
        if (displayIndex < totalPage - 1) {
            displayIndex++;
            var $list = $('.display-list');
            var $items = $list.find('.display-item');
            //$items.eq(displayIndex - 1).hide();
            var $nextItem = $items.eq(displayIndex);
            $nextItem.show();

            $items.eq(displayIndex - 1).css('top', '0%');
            $items.eq(displayIndex - 1).animate({
                top: '-100%'
            }, 500);

            $nextItem.css('top', '100%');
            $items.eq(displayIndex).animate({
                top: '0%'
            }, 500, function () {

                startAnim();
            });
        }
    }

    $('#display-prev').on('click', function () {
        prevDisplay();
    });
    $('#display-next').on('click', function () {
        nextDisplay();
    });
    $(document).on('keydown', function (e) {
        var keyCode = event.keyCode;
        if (keyCode == 37) { // 左
            if (displaying) {
                prevDisplay();
            }
        } else if (keyCode == 39) {
            if (displaying) { // 右
                nextDisplay();
            }
        }
    });


    // 拉伸
    var move = false;
    $(document).on('mousedown', '.scale-n', function () {
        move = true;
    });
    $(document).on('mousemove', function (e) {
        if (move) {

        }
    });
    $(document).on('mouseup', '.scale-n', function () {
        move = true;
    });


    // 选区
    $.fn.area = function () {
        var move2 = false;
        var startX;
        var startY;
        var $area;

        var html = '<div style="position: absolute; top: 0; left: 0; display: none; width: 100px; height: 100px; background-color: #00bbcc; opacity: .4;"></div>'
        $area = $(html);
        $(document.body).append($area);

        $(document).on('mousedown', function (e) {
            move2 = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        $(document).on('mousemove', function (e) {
            if (move2) {
                var left = Math.min(startX, e.clientX);
                var top = Math.min(startY, e.clientY);
                var width = Math.abs(e.clientX - startX);
                var height = Math.abs(e.clientY - startY);
                $area.css({
                    'top': top + 'px',
                    'left': left + 'px',
                    'width': width + 'px',
                    'height': height + 'px'
                });
                $area.show();
            }
        });
        $(document).on('mouseup', function (e) {
            move2 = false;
            $area.hide();
        });
    };
    //$(document.body).area();


    // 文字
    $('#editor-text').on('change', function () {
        $curElem.find('.elem-content').text($(this).val());
    });
    // 字体
    $('#editor-font-family').on('change', function () {
        var fontFamily = $(this).children('option:selected').val();
        $curElem.css('font-family', fontFamily);
    });
    // 动画方式
    $('#editor-anim-name').on('change', function () {
        var anim = $(this).val();
        selectAnim(anim);
        if (anim) {
            $('#editor-anim-box').show();
        } else {
            $('#editor-anim-box').hide();
        }
        //$curElem.css('font-size', $(this).val() + 'px');
    });
    // 字体大小
    $('#editor-font-size').on('change', function () {
        $curElem.css('font-size', $(this).val() + 'px');
    });
    // 边框大小
    $('#editor-border-width').on('change', function () {
        $curElem.css('border-width', $(this).val() + 'px');
    });
    // 边框样式
    $('#editor-border-style').on('change', function () {
        var borderStyle = $(this).children('option:selected').val();
        $curElem.css('border-style', borderStyle);
    });
    // 边框半径
    $('#editor-border-radius').on('change', function () {
        $curElem.css('border-radius', $(this).val() + 'px');
        $curElem.find('.elem-content').css('border-radius', $(this).val() + 'px');
    });
    // 透明度
    $('#editor-opacity').on('change', function () {
        $curElem.css('opacity', $(this).val() / 100.0);
    });
    // 动画持续时间
    $('#editor-anim-duration').on('change', function () {
        var duration = ($(this).val() / 1000) + 's';
        $curElem.css('animation-duration', duration);
    });
    // 动画开始时间
    $('#editor-anim-delay').on('change', function () {
        var delay = ($(this).val() / 1000) + 's';
        $curElem.css('animation-delay', delay);
    });
    // 动画执行次数
    $('#editor-anim-count').on('change', function () {
        $curElem.css('animation-iteration-count', $(this).val());
    });
    var replaceType = 0;
    // 替换图片
    $('#editor-relace-img').on('click', function () {
        /*$('#image-select-dialog').modal({
         big: true
         });*/
        //$('#image-select-dialog').show();
        replaceType = 0;
        eui.dialog({
            type: 1,
            shade: false,
            title: '选择图片',
            content: $('#image-selector'),
            cancel: function (index) {
                eui.close(index);
                this.content.hide();
            }
        })
    });

    // 替换背景图片
    $('#editor-base-bg-img').on('click', function () {
        replaceType = 1;
        eui.dialog({
            type: 1,
            shade: false,
            title: '选择图片',
            closeBtn: true,
            shadeClose: true,
            content: $('#image-selector'),
            cancel: function (index) {
                eui.close(index);
                this.content.hide();
            }
        });
    });

    var template = '<div class="colorpicker dropdown-menu">' +
        '<div class="colorpicker-saturation"><i><b></b></i></div>' +
        '<div class="colorpicker-hue"><i></i></div>' +
        '<div class="colorpicker-alpha"><i></i></div>' +
        '<div class="colorpicker-color"><div /></div>' +
        '<div class="colorpicker-selectors"></div>' + +'<div><a href="#">X</a></div>'
    '</div>';

    $('#editor-color').colorpicker({
        template: template
    }).on('changeColor', function (e) {
        $curElem.css('color', e.color.toHex());
    });

    $('#editor-bg-color').colorpicker({}).on('changeColor', function (e) {
        $curElem.css('background-color', e.color.toHex());
    });
    // 边框颜色
    $('#editor-border-color').colorpicker({}).on('changeColor', function (e) {
        $curElem.css('border-color', e.color.toHex());
    });
    // 背景颜色
    $('#editor-base-bg-color').colorpicker({}).on('changeColor', function (e) {
        $('#demo').css('background-color', e.color.toHex());
    });

    function dealTextElem($content) {
        dealElem($content);

        $('#editor-text-box').show();
        $('#editor-img-box').hide();


        // 文字
        $('#editor-text').val($content.text().trim());
        // 颜色
        var color = $content.css('color');
        var hex = color.colorHex();
        $('#editor-color').val(hex);
        $('#editor-color').colorpicker('setValue', hex);
        /*
         $('#editor-color').minicolors('destroy');
         $('#editor-color').minicolors({
         theme: 'bootstrap',
         change: function(hex, opacity) {
         $curElem.css('color', hex);
         },
         hide: function() {
         }
         });
         */
        // 背景颜色
        var bgColor = $content.css('background-color');
        $('#editor-bg-color').val(bgColor);
        // 字体
        var fontFamily = $content.css('font-family');
        $('#editor-font-family').find('option').each(function () {
            if ($(this).text() === fontFamily) {
                $(this).prop('selected', true);
            }
        });
        // 字体大小
        var fontSize = $content.css('font-size').replace('px', '');
        $('#editor-font-size').val(fontSize);
    }

    $('#editor-add-anim').on('click', function () {

    });
    function selectAnim(anim) {

        // 移去旧动画
        var animation = $curElem.attr("data-anim");
        $curElem.removeClass(animation);
        //$curElem.removeClass('animated');

        // 添加新动画
        $curElem.addClass('animated');
        $curElem.attr('data-anim', anim); // TODO
        $curElem.addClass(anim);

        var duration = $curElem.css('animation-duration').replace('s', '');
        duration = parseInt(duration) * 1000;

        setTimeout(function () {
            //alert(1);
            var animation2 = $curElem.attr("data-anim");
            $curElem.removeClass(animation2);
            //$curElem.removeClass('slideInLeft');
            $curElem.removeClass('animated');

        }, duration);

    }

    $('#editor-play-anim').on('click', function () {
        var anim = $curElem.attr('data-anim');
        selectAnim(anim);
    });

    function dealImageElem($content) {
        dealElem($content);

        $('#editor-img-box').show();
        $('#editor-text-box').hide();
        //$('#editor-text').val($content.text());
        //alert($content.css('border-width'));
    }

    // 处理背景颜色和背景图片
    function dealBg() {
        var bgColor = $('#demo').css('background-color');
        var hex = bgColor.colorHex();
        $('#editor-base-bg-color').val(hex);
        $('#editor-base-bg-color').colorpicker('setValue', hex);
    }

    function dealElem($content) {
        $('#editor-base-box').hide();
        $('#editor-style-box').show();
        $('#editor-anim-box2').show();

        // 边框颜色
        var borderColor = $content.css('border-color');
        $('#editor-border-color').val(borderColor);
        // 边框大小
        var borderWidth = $content.css('border-width').replace('px', '');
        $('#editor-border-width').val(borderWidth);
        // 边框样式
        var borderStyle = $content.css('border-style');
        $('#editor-border-style').val(borderStyle);
        //$('#editor-border-style').find('option[selected]').removeAttr('selected');
        //$('#editor-border-style').find('option[value=' + borderStyle + ']').attr("selected", true);
        // 边框半径
        var borderRadius = $content.css('border-radius').replace('px', '');
        $('#editor-border-radius').val(borderRadius);
        // 透明度
        var opacity = $content.css('opacity');
        $('#editor-opacity').val(opacity * 100);

        // 动画
        var anim = $curElem.attr('data-anim');
        if (!anim) {
            $('#editor-anim-name').val('');
            $('#editor-anim-box').hide();
        } else {
            $('#editor-anim-name').val(anim);
            $('#editor-anim-box').show();

            // 动画开始时间
            var delay = $curElem.css('animation-delay');
            delay = parseInt(delay.replace('s'), '') * 1000;
            $('#editor-anim-delay').val(delay);

            // 动画持续时间
            var duration = $curElem.css('animation-duration');
            duration = parseInt(duration.replace('s'), '') * 1000;
            $('#editor-anim-duration').val(duration);

            // 动画执行次数
            var count = $curElem.css('animation-iteration-count');
            $('#editor-anim-count').val(count);
            //duration = parseInt(duration.replace('s'), '') * 1000;
            //$('#editor-anim-duration').val(duration);


        }
    }

    /* 图片选择 */
    $('#select-img-list').on('click', '.select-img-item', function () {
        if (replaceType === 0) {
            var src = $(this).find('img').attr('src');
            $curElem.find('.elem-content').attr('src', src);
            $('#image-select-dialog').modal('hide');
        } else {
            var src = $(this).find('img').attr('src');
            $('#demo').css('background-image', 'url(' + src + ')');

            eui.closeAll();
            //$('#image-select-dialog').modal('hide'); // TODO ?
            //
        }

    });

    // 插入文字
    $('#insert-text').on('click', function () {
        var zIndex = $('#demo').children().length;
        var html = '<div class="elem elem-text" style="position: absolute; top: 200px; left: 110px; '
            + 'z-index:' + zIndex + ';width: 100px;">'
            + '<div class="elem-content">点击编辑文字</div>'
            + '</div>';
        $('#demo').append($(html));
    });

    // 插入图片
    $('#insert-img').on('click', function () {
        var zIndex = $('#demo').children().length;
        var html = '<div class="elem elem-img" style="position: absolute; top: 225px; left: 100px; '
            + 'z-index: ' + zIndex + ';width: 100px; height: 100px;">'
            + '<img class="elem-content" src="asset/img/avatar.jpg">'
            + '</div>';
        $('#demo').append($(html));
    });

    // 插入形状
    $('#insert-shape').on('click', function () {
        eui.msg('该功能暂未实现')
    });

    //十六进制颜色值域RGB格式颜色值之间的相互转换

    /*RGB颜色转换为16进制*/
    String.prototype.colorHex = function () {
        //十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var that = this;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:||rgb|RGB)*/g, "").replace('(', '').replace(')', '').split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return that;
        }
    };

    //-------------------------------------------------

    /*16进制颜色转为RGB格式*/
    String.prototype.colorRgb = function () {
        var sColor = this.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    };


    $('#editor-base-box').show();
    $('#editor-text-box').hide();
    $('#editor-img-box').hide();
    $('#editor-style-box').hide();
    $('#editor-anim-box2').hide();

    selectPage(2);
    //$('.tab-content').hide();
    //$('#tab-style').tab('show');
    //$('#display-show').click();
    //$('#tab-anim').tab('show');

});
