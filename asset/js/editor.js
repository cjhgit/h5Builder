/**
 * Created by cjh1 on 2016/3/17.
 */

$(document).ready(function () {
    /* 文本编辑器 */
    $("#editText").hide();		// 默认不显示

    // 把iframe设成可编辑
    var iframe = document.getElementById("editIfream");
    iframe.contentWindow.document.designMode = "on";
    iframe.contentWindow.document.contentEditable = true;

    /*
     但是在实际运行的时候，你是否发现除了chrome浏览器外（用IETester, Firefox, Chrome测试）打开这个页面都处于正在加载的状态（那个轮子转啊转，转个不停…）
     只要在doc.write()方法前后加上doc.open(), doc.close()就可以了（在写之前开启，写完之后关闭）

     $d = $("#editor")[0].contentWindow.document; // IE、FF都兼容
     $d.designMode="on";
     $d.contentEditable= true;
     $d.open();
     $d.close();
     $("body", $d).append("<div>A</div><div>B</div><div>C</div>");

     $('#insert_img').click(function(){
     // 在iframe中插入一张图片
     var img = '<img src="' + $('#path').val() +'" />';
     $("body", $d).append(img);
     });

     $('#preview').click(function(){
     // 获取iframe的body内容，用于显示或者插入到数据库
     alert($('#editor').contents().find('body').html());
     $('#preview_area').html($('#editor').contents().find('body').html());

     });


     document.execCommand('createLink', true, 'http://io-meter.com'); // 为所选文字加链接
     document.execCommand('unlink'); // 取消链接

     document.execCommand('formatBlock', true, 'h1'); // 将光标所在段落修改为一级标题
     document.execCommand('formatBlock', true, 'p'); // 将光标所在块修改为段落

     4. 文字能下载成word文件主要利用浏览器自带功能——把html内容保存成word文件。但要在servlet中设置此命令。

     //告知浏览器显示的内容为msword：即微软的word

     response.setContentType("application/msword;charset=utf-8");

     //告知浏览器页面为附件下载。filename后面跟的是下载文件名。xxx.doc是下载后默认保存的word文件名。

     response.setHeader("Content-disposition","attachment;charset=utf-8;filename=xxx.doc" );
     */
    var editor = document.getElementById("editIfream");

    /* 点击编辑框外，编辑框隐藏，不过这样的话就无法通过点击按钮显示编辑器 */
    $(document).bind("click", function(e){
        var target = $(e.target);
        if (target.closest("#editText").length == 0)
        {
            if (!$("#editText").is(":hidden")) {
                var iframe = document.getElementById("editIfream");
                $(".curElem").html(iframe.contentWindow.document.body.innerHTML);
                $("#editText").hide();
            }

        }
    });

    /* 字体大小 */
    $("#fontSize").attr("oninput", "OnInput(event)");
    $("#fontSize").attr("onpropertychange", "OnPropChanged(event)");
    /*
     $('#fontSize').bind({
     focus:function() {
     },
     blur:function() { 	// 失去焦点
     $("#editIfream").contents().find("div").css("font-size", this.value + "px");
     }
     });
     */

    /* 样式 */
    $("#style").click(function() {
        alert("该功能暂未实现");
    });

    /* 字体 */
    $("#font").click(function() {
        $("#fontSelector").toggle();
    });

    /* 字体选择 */
    $("#fontSelector li").click(function(){
        var win = document.getElementById('editIfream').contentWindow;
        win.document.execCommand("FontName", "false", $(this).text());
        win.focus();

        $("#fontType").text($(this).text());
        $("#fontSelector").hide();
    });

    /* 表格操作 */
    $("#tableOperate").click(function() {
        alert("该功能暂未实现");
    });

    /* 插入表格 */
    $("#insertTable").click(function() {
        // 表格的代码
        var table = '<table><tr><td><input type="text" /></td><td><input type="text" /></td></tr><tr><td><input type="text" /></td><td><input type="text" /></td></tr><tr><td><input type="text" /></td><td><input type="text" /></td></tr></table>';

        editor.contentWindow.document.body.innerHTML += table;
    });

    /* 字体颜色 */
    $("#textColor").click(function() {
        isBgColor = false;
        showColorSelector();
    });

    // 初始化颜色选择器
    initColorSelector();

    /* 插入 */
    $("#in").click(function() {
        alert("该功能暂未实现");
    });

    var win = document.getElementById('editIfream').contentWindow;

    /* 对齐 */
    $("#align").click(function() {
        //alert("该功能暂未实现")

        /*
         // 获得选中的文本
         var dom = document.getElementById('editIfream').contentWindow.document;
         var t = dom.getSelection().toString();
         */

        // 选中文字变为粗体
        win.document.execCommand("CreateLink", true, "http://www.baidu.com");//弹出一个对话框输入URL
        win.focus();

    });

    /* 文字样式 */
    $("#textStyle").click(function() {
        $("#fontStyleSelector").toggle();
    });
    $("#bold").click(function() {
        win.document.execCommand("Bold", false, null);
        win.focus();

        $("#fontStyleSelector").hide();
    });
    $("#italic").click(function() {

        win.document.execCommand("Italic", false, null);
        win.focus();

        $("#fontStyleSelector").hide();
    });
    $("#underline").click(function() {
        win.document.execCommand("Underline");
        win.focus();

        $("#fontStyleSelector").hide();
    });
    $("#deleteLine").click(function() {
        win.document.execCommand("StrikeThrough");
        win.focus();

        $("#fontStyleSelector").hide();
    });

    /* 清除格式 */
    $("#brush").click(function() {
        // 文字样式变成默认样式
        $("#editIfream").contents().find("div").css("color", "black");
        $("#editIfream").contents().find("div").css("background", "none");
        $("#editIfream").contents().find("div").css("text-decoration", "none");
        // TODO
        $("#editIfream").contents().find("div").css("font-weight", "nomal");
    });

    /* 背景色 */
    $("#bgColor").click(function() {
        isBgColor = true;
        showColorSelector();
    });

    /* 撤销 */
    $("#undo").click(function() {
        alert("该功能暂未实现");
    });

    /* 编辑器保存 */
    $("#saveEditor").click(function() {
        var iframe = document.getElementById("editIfream");
        $(".curElem").html(iframe.contentWindow.document.body.innerHTML);
        $("#editText").hide();
    });

    /* 编辑器关闭 */
    $("#closeEditor").click(function() {
        $("#editText").hide();
    });



    /* 点击插入形状的选项，在画布插入形状 */
    $("#shape svg").click(function() {
        // TODO
        // 获得元素自身的html代码
        alert(            $("<p>").append($(this).clone()).html()       )   ;

        // 要插入的html代码
        var html = '<div class="dragable elem">' + ("<p>").append($(this).clone()).html() + '</div>';
        $(html).appendTo("#workplace");

        // 使新插入的文本可拖拽到任意位置 TODO 可优化
        elemDragable();
        clickableElem();

    });

    /* 工具栏 */
    // 使工具栏可拖拽
    $('#toolbar').draggable({
        cursor:"move",
        scroll: false,

        /* opacity:0.5	拖拽时颜色变淡，会震动containment: 'parent' */
    });

    /* 插入文本 */
    $("#insertText").click(function() {
        $("#photo").hide();
        $("#shape").hide();
        // 要插入的html代码
        var html = '<div class="elem elem_text"><div class="trueText defaultText">编辑文本</div></div>';
        insertElem(html);
    });

    /* 插入图片 */
    $("#insertPhoto").click(function() {
        $("#photo").show();
        $("#shape").hide();
    });

    $("#insertNetImg").click(function() {
        var value = $.trim($("#imgUrl").val());
        if (value == "") {
            alert("网络图片的网址不能为空");
            return;
        }
        // 要插入的html代码
        var html = '<div class="dragable elem"><img class="defaultImg" src="' + value + '" alt="网络图片显示出错" /></div>';
        insertElem(html);
    });


    /* 插入页面 */
    $("#insertPage").click(function() {
        alert("该功能暂未实现");
    });

    /* 插入形状 */
    $("#insertShape").click(function() {
        $("#shape").show();
        $("#photo").hide();
    });

    /* 插入公式 */
    $("#insertExpression").click(function() {
        // 要插入的html代码
        var html = '<div class="dragable elem"><img class="defaultImg" src="http://latex.codecogs.com/gif.latex?%5Cfrac%7B1%7D%7B2%7D" alt="公式" /></div>';
        insertElem(html);
    });


});



/* 图片拖拽上传 */
var fileUploadPreview = function (aFile) {
    if (typeof FileReader == "undefined") {
        alert("浏览器不支持");
    }
    var i;
    for (i = 0; i < aFile.length; i++) {
        var tmp = aFile[i];
        var reader = new FileReader();
        reader.readAsDataURL(tmp);
        reader.onload = (function (f) {
            return function (e)
            {
                alert(e.target.result);
                // 要插入的html代码
                var html = '<div class="dragable elem"><img src="' + e.target.result + '" title="' + f.name + '"></div>';
                $(html).appendTo("#workplace");

                dragable(".dragable");		// 使所有可编辑元素可拖拽 TODO 可优化
                clickableElem();

            }
        })(tmp)
    }
}

var dropFile = function (e) {
    fileUploadPreview(e.dataTransfer.files);
    e.stopPropagation();
    e.preventDefault();
};

/* 颜色选择器 */

/* 初始化颜色选择器 */
function initColorSelector() {
    /* 动态绘制颜色选择器 */
    var colorTable='';
    for (i = 0; i < 2; i++) {
        for (j = 0; j <6; j++) {
            colorTable += '<tr><td width="15" onclick="changeColor(#000000)" style="background:#000000">';
            if (i == 0) {
                colorTable += '<td width="15" onclick=changeColor("#' + ColorHex[j] + ColorHex[j] + ColorHex[j] + '") style="cursor:pointer;background:#' + ColorHex[j] + ColorHex[j] + ColorHex[j] + '">';
            } else {
                colorTable += '<td width="15" onclick=changeColor("#'+SpColorHex[j]+'") style="cursor:pointer;background:#' + SpColorHex[j] + '">';
            }
            colorTable += '<td width="15" onclick=changeColor("#000000") style="background:#000000">';
            for (k = 0; k < 3; k++) {
                for (l = 0; l < 6; l++) {
                    colorTable += '<td width="15" onclick=changeColor("#' + ColorHex[k+i*3] + ColorHex[l] + ColorHex[j] + '") style="cursor:pointer;background:#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j]+'">';
                }
            }
        }
    }
    colorTable = '<div class="header"><span style="float:right;padding-right:3px;cursor:pointer;" onclick="closePane()">×关闭</span></div>' + '<table class="pointer">' + colorTable + '</table>';
    document.getElementById("colorpane").innerHTML=colorTable;
}
var colorPane=document.getElementById("colorpane");
var ColorHex=new Array('00','33','66','99','CC','FF');
var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF');
var current=null;


/* 关闭颜色选择器 */
function closePane() {
    colorPane.style.display="none";
}
function changeColor(obj) {
    colorPane.style.display="none";
    if (isBgColor) {
        $("#editIfream").contents().find("div").css("background-color", obj);
        /*
         var win = document.getElementById('editIfream').contentWindow;
         document.execCommand("BackColor", "false", obj);
         win.focus();
         */
    } else {
        var win = document.getElementById('editIfream').contentWindow;
        win.document.execCommand("ForeColor", "false", obj);
        win.focus();
    }
}

/* 显示颜色选择器 */
function showColorSelector() {
    colorPane.style.display = "";
}

/* 覆盖系统的方法 */
function alert(message) {
    if ($("#dialogalert").length == 0) {
        $("body").append('<div id="dialogalert"></div>');
        $("#dialogalert").dialog({
            autoOpen: false,
            title: '消息框',
            modal: true,
            resizable:false,
            overlay: {
                opacity: 0.5,
                background: "black"
            },
            buttons: {
                "确定": function(){
                    $(this).dialog("close");
                }
            }
        });
    }

    $("#dialogalert").html(message);
    $("#dialogalert").dialog("open");
}

/* 确定/取消框，callback是点击确定按钮的回调函数 */
function confirm(message, callback) {
    if ($("#dialogconfirm").length == 0) {
        $("body").append('<div id="dialogconfirm"></div>');
        $("#dialogconfirm").dialog({
            autoOpen: false,
            title: '消息框',
            modal: true,
            resizable:false,
            overlay: {
                opacity: 0.5,
                background: "black"
            },
            buttons: {
                "确定": function(){
                    callback();
                    $(this).dialog("close");
                },
                "取消": function(){
                    $(this).dialog("close");
                }
            }
        });
    }
    $("#dialogconfirm").html(message);
    $("#dialogconfirm").dialog("open");
}

/* 字体大小输入框内容改变事件（需IE9以上） */
function OnInput (event) {
    //$("#editIfream").contents().find("div").css("font-size", event.target.value + "px");
    var win = document.getElementById('editIfream').contentWindow;
    win.document.execCommand("FontSize", "false", event.target.value + "px");
    win.focus();
}
/* 字体大小输入框内容改变事件（IE9以下） */
function OnPropChanged (event) {
    $("#editIfream").contents().find("div").css("font-size", event.srcElement.value + "px");
}

/* 窗口关闭、刷新时提示保存文件 */
function ConfirmClose() {
    window.event.returnValue = "还有内容尚未保存";
}
function ShowConfirmClose(blnValue) {
    if (blnValue) {
        document.body.onbeforeunload = ConfirmClose;
    } else {
        document.body.onbeforeunload = null;
    }
}


/*
 修改样式
 $("#editIfream").css("font-family", $(this).text());

 $("#editIfream").contents().find("div").

 */