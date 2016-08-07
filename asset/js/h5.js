/**
 * H5页面在线制作工具
 *
 * Created by cjh1 on 2016/7/20.
 */
var $curElem;
var $elemMenu = $('#elem-menu');
var $previewMenu = $('#preview-menu');

function selectElem($this) {
    var $prevElem = $('.elem.active');
    if ($prevElem.length) {
        $prevElem.draggable('disable');
        $prevElem.resizable('disable');
        $prevElem.removeClass('active');
    }


    $curElem = $this;
    $this.addClass('active');
    $('#resize-tool').appendTo($this);
    $('#resize-tool').show();
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
$(document).on('click', '.elem', function(e) {
    e.stopPropagation();

    if (displaying) {
        return false;
    }

    var $this = $(this);
    selectElem($this);
});

// 元素右键菜单
$(document).on('contextmenu', '.elem', function(e) {
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
$(document).on('click', function(e) {
    $elemMenu.hide();
});
// 置于顶层
$('#elem-menu-move-front').on('click', function() {
    var $siblings = $curElem.siblings();
    var zIndex = $curElem.css('z-index');
    $curElem.css('z-index', $siblings.length);
    $siblings.each(function() {
        var z = $(this).css('z-index');
        if (z > zIndex) {
           $(this).css('z-index', z - 1);
        }
    });
});
// 上移一层
$('#elem-menu-move-up').on('click', function() {
    var zIndex = $curElem.css('z-index');
    var $siblings = $curElem.siblings();
    if (zIndex >= $siblings.length) {
        return;
    }
    $curElem.css('z-index', zIndex + 1);
    $siblings.each(function() {
        var z = $(this).css('z-index');
        if (parseInt(z) === parseInt(zIndex) + 1) {
            console.log(1);
            $(this).css('z-index', zIndex);
        }
    });
});
// 置于底层
$('#elem-menu-move-behind').on('click', function() {
    var zIndex = $curElem.css('z-index');
    $curElem.css('z-index', 0);
    $curElem.siblings().each(function() {
        var z = $(this).css('z-index');
        if (z < zIndex) {
            $(this).css('z-index', z + 1);
        }
    });
});
// 下移一层
$('#elem-menu-move-down').on('click', function() {
    var zIndex = $curElem.css('z-index');
    if (zIndex === 0) {
        return;
    }
    $curElem.css('z-index', zIndex - 1);
    $curElem.siblings().each(function() {
        var z = $(this).css('z-index');
        if (parseInt(z) === parseInt(zIndex) - 1) {
            $(this).css('z-index', zIndex);
        }
    });
});
// 删除元素
$('#elem-menu-delete').on('click', function(e) {
    e.preventDefault();
    $elemMenu.hide();

    $('#resize-tool').appendTo($(document.body));
    $('#resize-tool').hide();

    $curElem.remove();
});

// 左侧预览右键菜单
$(document).on('contextmenu', '.preview-item', function(e) {
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
$(document).on('click', function(e) {
    $previewMenu.hide();
});
// 删除页面
$('#preview-menu-delete').on('click', function(e) {
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
        $prevElem.resizable('disable');
        $prevElem.removeClass('active');
    }
    $('#resize-tool').hide();
}

$('.h5-container').on('click', function() {
    disableActiveElem();

    // 隐藏多余的功能
    $('.tab-content').hide();
    /*$('#tab11').hide();
    $('#tab12').hide();
    $('#tab13').hide();
    $('#tab14').hide();*/
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

var $curPreviewItem;

function selectPreviewitem($this) {
    $curPreviewItem = $this;
    $('.preview-item.active .viewport').html($('#demo').html());
    $this.siblings().removeClass('active').end().addClass('active');
    $('#demo').html($this.find('.viewport').html());
    $('.elem.active').removeClass('active');

    $('#resize-tool').appendTo($(document.body));
    $('#resize-tool').hide();
}

var curIndex = 0;
// 点击左侧预览，保存并更新编辑区
$('#preview-list').on('click', '.preview-item', function() {
    disableActiveElem();
    selectPreviewitem($(this));
});
$( "#preview-list" ).sortable();
/* 展示 */
$('#display-close').on('click', function() {
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
$('#display-show').on('click', function() {
    initDisplay();
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

        startAnim();
    }
}

function nextDisplay() {
    if (displayIndex < totalPage - 1) {
        displayIndex++;
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        $items.eq(displayIndex - 1).hide();
        $items.eq(displayIndex).show();

        startAnim();
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