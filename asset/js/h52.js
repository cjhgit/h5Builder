/**
 * Created by cjh1 on 2016/7/21.
 */



// 文字
$('#editor-text').on('change', function() {
    $curElem.find('.elem-content').text($(this).val());
});
// 字体
$('#editor-font-family').on('change', function() {
    var fontFamily = $(this).children('option:selected').val();
    $curElem.css('font-family', fontFamily);
});
// 字体大小
$('#editor-font-size').on('change', function() {
    $curElem.css('font-size', $(this).val() + 'px');
});
// 边框大小
$('#editor-border-width').on('change', function() {
    $curElem.css('border-width', $(this).val() + 'px');
});
// 边框样式
$('#editor-border-style').on('change', function() {
    var borderStyle = $(this).children('option:selected').val();
    $curElem.css('border-style', borderStyle);
});
// 边框半径
$('#editor-border-radius').on('change', function() {
    $curElem.css('border-radius', $(this).val() + 'px');
});
// 透明度
$('#editor-opacity').on('change', function() {
    $curElem.css('opacity', $(this).val() / 100.0);
});
// 替换图片
$('#editor-relace-img').on('click', function() {
    $('#image-select-dialog').modal({
        big: true
    });
});

var template = '<div class="colorpicker dropdown-menu">' +
'<div class="colorpicker-saturation"><i><b></b></i></div>' +
'<div class="colorpicker-hue"><i></i></div>' +
'<div class="colorpicker-alpha"><i></i></div>' +
'<div class="colorpicker-color"><div /></div>' +
'<div class="colorpicker-selectors"></div>' +
        + '<div><a href="#">X</a></div>'
'</div>';

$('#editor-color').colorpicker({
    template: template
}).on('changeColor', function(e) {
    $curElem.css('color', e.color.toHex());
});

$('#editor-bg-color').colorpicker({

}).on('changeColor', function(e) {
    $curElem.css('background-color', e.color.toHex());
});
// 边框颜色
$('#editor-border-color').colorpicker({

}).on('changeColor', function(e) {
    $curElem.css('border-color', e.color.toHex());
});

function dealTextElem($content) {
    dealElem($content);

    $('#editor-text').val($content.text());
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
            console.log('Hide event triggered!');
        }
    });
    */
    // 背景颜色
    var bgColor = $content.css('background-color');
    $('#editor-bg-color').val(bgColor);
    // 字体
    var fontFamily = $content.css('font-family');
    $('#editor-font-family').find('option').each(function() {
       if ($(this).text() === fontFamily) {
           $(this).prop('selected', true);
       }
    });
    // 字体大小
    var fontSize = $content.css('font-size').replace('px', '');
    $('#editor-font-size').val(fontSize);
}
$('#editor-add-anim').on('click', function() {

});
$('#editor-play-anim').on('click', function() {
    var duration = $curElem.css('animation-duration');
    $curElem.css('animation-play-state', 'running');
});

function dealImageElem($content) {
    dealElem($content);

    //$('#editor-text').val($content.text());
    //alert($content.css('border-width'));
}

function dealElem($content) {
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
}

/* 图片选择 */
$('#select-img-list').on('click', '.select-img-item', function() {
    var src = $(this).find('img').attr('src');
    $curElem.find('.elem-content').attr('src', src);
    $('#image-select-dialog').modal('hide');
});

// 插入文字
$('#insert-text').on('click', function() {
    var zIndex = $('#demo').children().length;
    var html = '<div class="elem elem-text" style="position: absolute; top: 200px; left: 110px; '
        + 'z-index:' + zIndex + ';width: 100px;">'
        + '<div class="elem-content">点击编辑文字</div>'
        + '</div>';
    $('#demo').append($(html));
});

// 插入图片
$('#insert-img').on('click', function() {
    var zIndex = $('#demo').children().length;
    var html = '<div class="elem elem-img" style="position: absolute; top: 225px; left: 100px; '
        + 'z-index: ' + zIndex + ';width: 100px; height: 100px;">'
        + '<img class="elem-content" src="asset/img/avatar.jpg">'
        + '</div>';
    $('#demo').append($(html));
});


//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
    var that = this;
    if(/^(rgb|RGB)/.test(that)){
        var aColor = that.replace(/(?:||rgb|RGB)*/g,"").replace('(', '').replace(')', '').split(",");
        var strHex = "#";
        console.log(aColor);
        for(var i=0; i<aColor.length; i++){
            var hex = Number(aColor[i]).toString(16);
            console.log(aColor[i]);
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = that;
        }
        return strHex;
    }else if(reg.test(that)){
        var aNum = that.replace(/#/,"").split("");
        if(aNum.length === 6){
            return that;
        }else if(aNum.length === 3){
            var numHex = "#";
            for(var i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }else{
        return sColor;
    }
};


var sRgb = "rgb(255,255,255)" , sHex = "#00538b";
var sHexColor = sRgb.colorHex();//转换为十六进制方法<code></code>
var sRgbColor = sHex.colorRgb();//转为RGB颜色值的方法


//$('#tab-style').tab('show');