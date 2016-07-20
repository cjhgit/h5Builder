/**
 * Created by cjh1 on 2016/7/20.
 */

// 保存
$('#save').on('click', function() {
    $('#test-item .viewport').html($('#demo').html());
});

$('#preview-list').on('click', '.preview-item', function() {
    $('#demo').html($(this).find('.viewport').html());
});

/* 展示 */
$('#display-close').on('click', function() {
    $('#display').hide();
});
$('#display-show').on('click', function() {
    initDisplay();
    $('#display').show();
});
var displayIndex = 0;
var totalPage = 4;
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



$('#display-prev').on('click', function() {
    if (displayIndex > 0) {
        displayIndex--;
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        $items.eq(displayIndex + 1).hide();
        $items.eq(displayIndex).show();
    }
});
$('#display-next').on('click', function() {
    if (displayIndex < totalPage - 1) {
        displayIndex++;
        var $list = $('.display-list');
        var $items = $list.find('.display-item');
        $items.eq(displayIndex - 1).hide();
        $items.eq(displayIndex).show();
    }
});