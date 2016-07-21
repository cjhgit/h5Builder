/**
 * Created by cjh1 on 2016/7/21.
 */

$('#tool-tab li:eq(1) a').tab('show')

// 文字
$('#editor-text').on('blur', function() {
    $curElem.find('.elem-content').text($(this).val());
});
// 替换图片
$('#editor-relace-img').on('click', function() {
    $('#image-select-dialog').modal({
        big: true
    });
});

function dealTextElem($content) {
    $('#editor-text').val($content.text());
}

function dealImageElem($content) {
    //$('#editor-text').val($content.text());
    //alert($content.css('border-width'));
}

/* 图片选择 */
$('#select-img-list').on('click', '.select-img-item', function() {
    var src = $(this).find('img').attr('src');
    $curElem.find('.elem-content').attr('src', src);
    $('#image-select-dialog').modal('hide');
});