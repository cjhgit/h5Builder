/**
 * H5页面在线制作工具
 *
 * Created by cjh1 on 2016/7/20.
 */
var $curElem;

// 编辑区域
$(document).on('click', '.elem', function(e) {
    e.stopPropagation();

    if (displaying) {
        return false;
    }

    var $prevElem = $('.elem.active');
    if ($prevElem.length) {
        $prevElem.draggable('disable');
        $prevElem.resizable('disable');
        $prevElem.removeClass('active');
    }

    var $this = $(this);
    $curElem = $this;
    $this.addClass('active');
    //$('#resize-tool').appendTo($this);
    //$('#resize-tool').show();
    $this.resizable({
        handles: 'n, e, s, w, ne, se, sw, nw'
    });
    $this.draggable({
        cursor:"move",
        scroll: false,
        opacity:0.5,
        //containment: '.device-body',
        distance: 5,
        zIndex: 10000,
        drag: function(event, ui) {
            //alert(1);
        }
    });
    $this.draggable('enable');
    $this.resizable('enable');

    if ($this.hasClass('elem-text')) {
        var $content = $this.find('.elem-content');
        dealTextElem($content);
    } else if ($this.hasClass('elem-img')) {
        var $content = $this.find('.elem-content');
        dealImageElem($content);
    }
});
$('.h5-container').on('click', function() {
    var $prevElem = $('.elem.active');
    if ($prevElem.length) {
        $prevElem.draggable('disable');
        $prevElem.resizable('disable');
        $prevElem.removeClass('active');
    }
});

// 添加新页面
$('#new-page').on('click', function() {
    var html = '<li class="preview-item">'
        + '<div class="viewport-box">'
        + '  <div class="viewport"></div>'
        + '</div></li>';
    $previewList = $('#preview-list');
    $previewList.append($(html));
});

// 保存
$('#save').on('click', function() {
    $('#test-item .viewport').html($('#demo').html());
});

var curIndex = 0;
// 点击左侧预览，保存并更新编辑区
$('#preview-list').on('click', '.preview-item', function() {
    $('.preview-item.active .viewport').html($('#demo').html());
    $(this).siblings().removeClass('active').end().addClass('active');
    $('#demo').html($(this).find('.viewport').html());
    $('.elem.active').removeClass('active');
});

/* 展示 */
$('#display-close').on('click', function() {
    displaying = false;
    $('#display').hide();
});
$('#display-show').on('click', function() {
    initDisplay();
    displaying = true;
    $('#display').show();
});
var displayIndex = 0;
var totalPage = 4;
var displaying = false;
function initDisplay() {
    $previewList = $('#preview-list');
    $previewItems = $previewList.find('.preview-item');
    totalPage = $previewItems.length;
    var $list = $('.display-list');
    $list.empty();
    var html = '';
    $previewItems.each(function() {
        html += '<li class="display-item">' + $(this).find('.viewport').html() + '</li>'
    });
    $list.html(html);
    $('.display-list').find('.display-item').eq(0).show();
}

function prevDisplay() {
    if (displayIndex > 0) {
        displayIndex--;
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        $items.eq(displayIndex + 1).hide();
        $items.eq(displayIndex).show();
    }
}

function nextDisplay() {
    if (displayIndex < totalPage - 1) {
        displayIndex++;
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        $items.eq(displayIndex - 1).hide();
        $items.eq(displayIndex).show();
    }
}

$('#display-prev').on('click', function() {
    prevDisplay();
});
$('#display-next').on('click', function() {
    nextDisplay();
});
$(document).on('keydown', function(e) {
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
$(document).on('mousedown', '.scale-n', function() {
    move = true;
});
$(document).on('mousemove', function(e) {
    if (move) {

    }
});
$(document).on('mouseup', '.scale-n', function() {
    move = true;
});


// 选区
$.fn.area = function() {
    var move2 = false;
    var startX;
    var startY;
    var $area;

    var html = '<div style="position: absolute; top: 0; left: 0; display: none; width: 100px; height: 100px; background-color: #00bbcc; opacity: .4;"></div>'
    $area = $(html);
    $(document.body).append($area);

    $(document).on('mousedown', function(e) {
        move2 = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    $(document).on('mousemove', function(e) {
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
    $(document).on('mouseup', function(e) {
        move2 = false;
        $area.hide();
    });
};
//$(document.body).area();