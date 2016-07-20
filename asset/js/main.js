/* 
 * JavaScript document
 * 作者：陈建杭
 * 时间：2014-12-19
 * 修改人：
 * 备注：
 */

var isBgColor = false;	// 当前颜色选择器是否为背景色

$(document).ready(function() {

    init();

    // 退出时提示保存
    //ShowConfirmClose(true);


});

function init() {
    initTopMenu();
    initToolbar();
    initRightMenu();
    initWorkplace();

    // 新建页面
    $("#new-page").click(function(){
        confirm("当前作品未保存，是否保存?", function(){
            alert("保存成功");
        });

    });

    $('#preview-list').slimScroll({
        width: $('#preview-list').width(),
        height: $('#preview-list').height(),
        opacity: 0.1,
        distance: '1px',
        railColor: '#f1f1f1'
    });
    $('#preview-list').selectable({});
}

function initTopMenu() {
    // 新建作品
    $("#new").on('click', function(){
        confirm("当前作品未保存，是否保存?", function(){
            alert("保存成功");
        });

    });

    // 关于
    $("#about").on('click', function(e){
        e.preventDefault();
        alert("陈建杭制作");
    });
}

function initToolbar() {
    /* 导入导出 */
    $("#export").hover(function(){
        $("#exportItem").show();
    }, function(){
        $("#exportItem").hide();
    });

    $("#exportPpt").click(function() {
        alert("该功能暂未实现");
    });

    $("#exportImg").click(function() {
        alert("该功能暂未实现");
    });

    /* 保存 */
    $("#save").click(function() {
        alert("该功能暂未实现");
    });

    /* 播放（预览） */
    $("#play").click(function() {
        //alert("该功能暂未实现");
       /* $('#workplace').css({

            'left': 0
        });*/
        $('#section1').html($('#workplace').html());
        $('#work-show').show();
    });

    $('#work-exit').on('click', function(){
        $('#work-show').hide();
    });

    /* 教程 */
    $("#teach").click(function(){
        window.open("help.html");
    });

    /* 全屏 */
    $("#full").click(function() {
        /*
        var ua = navigator.userAgent.toLowerCase();

        var isOpera = ua.indexOf("opera") > -1,
            isSafari = (/webkit|khtml/).test(ua),
            isIE = !isOpera && ua.indexOf("msie") > -1,
            isIE7 = !isOpera && ua.indexOf("msie 7") > -1,
            isIE8 = !isOpera && ua.indexOf("msie 8") > -1,
            isGecko = !isSafari && ua.indexOf("gecko") > -1;

    */
    });
}

var $activeElem;

// 初始化右键菜单
function initRightMenu() {
    var oMenu = document.getElementById("menu");
    //加载后隐藏自定义右键菜单
    oMenu.style.display = "none";
    /*
    $('#insert').on('contextmenu', function (event) {
        var event = event || window.event;
        $('#menu').css({
            'display': 'block',
            'top': event.clientY + 'px',
            'left': event.clientX + 'px'
        });
        return false;
    });
    */
    $(document).on('contextmenu', '.elem', function (event) {
        var event = event || window.event;
        $activeElem = $(this);
        $('.elem-active').removeClass('elem-active');
        $activeElem.addClass('elem-active');
        $('#elem-menu').css({
            'display': 'block',
            'top': event.clientY + 'px',
            'left': event.clientX + 'px'
        });
        return false;
    });

    //页面点击后自定义菜单消失
    document.onclick = function () {
        oMenu.style.display = "none";
        $('#elem-menu').hide();
    }

    // 关于项
    $("#itemAbout").click(function() {
        alert("陈建杭制作");
    });

    $('#menu-delete').on('click', function(){
        $activeElem.remove();
    });
}


function initWorkplace() {
    draggableElem(".elem");
    //resizableElem(".elem");
    clickableElem($(".elem"));

    //$elem.attr('onclick', 'elemOneClick()');
    $(document).on('click', '.elem', elemOneClick);

    /* 可编辑元素 */
    $(".elem").mousedown(function(e){
        //e.which 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
        if (e.which == 3) {
            //$(this).remove();		// 删除该元素
            /*
            var $menu = $('#elemMenu');
            $('#menu').hide();
            var event = e || window.event;

            $menu.css({
                'display': 'block',
                'top': event.clientY + "px",
                'left': event.clientX + "px"
            });

            document.onclick = function ()
            {
                oMenu.style.display = "none"
            }
            $(this).find("div").width("600px");
            $(this).find("svg").width("600px");
            */
        }
        return false;

    });
}

/* 插入可编辑元素 */ 
function insertElem(html) {
    var $elem = $(html);
	$elem.appendTo("#workplace");

    draggableElem(".elem");		// 使所有可编辑元素可拖拽 TODO 可优化
	$(".elem").resizable();
	
	clickableElem($elem);
}

function draggableElem(selector) {
    $(selector).draggable({
        cursor:"move",
        scroll: false,
        opacity:0.5,
        containment: '#workplace',
        distance: 5,
        zIndex: 10000,
        drag: function(event, ui) {
            //alert(1);
        }
    });
}

function resizableElem(selector) {
    $(selector).resizable({
        resize: function(event, ui) {
            $('#statusbar').text(ui.size.width);
        }
    });
}

/* 使鼠标点击元素外时隐藏改元素，有BUG */
function outHide(selector) {
	$(document).bind("click", function(e){ 
		var target = $(e.target); 
		if (target.closest(selector).length == 0)
		{ 
			$(selector).hide(); 
		} 
	});
}

var isdb;
/* 可编辑元素的单击双击事件 */
function elemOneClick() {

    $(this).addClass('elem-active');
	isdb = false;
	window.setTimeout(cc, 300)
	function cc() {
		if (isdb)
			return;
			
		// 处理单击事件 TODO 与拖拽事件冲突

	}
}

/* 可编辑元素双击 */
function elemDbClick(mythis) {
	isdb=true;
	// 处理双击事件
	// 切换当前元素
    $(".elem-active").resizable({
        disable: false
    });

	$(".elem-active").removeClass("elem-active");
	mythis.addClass("elem-active");

    resizableElem(".elem-active");

	// 如果是文本
	if (mythis.hasClass('elem-text')) {
		$("#editText").show();	//弹出文本编辑器
		var iframe = document.getElementById("editIfream");
		
		iframe.contentWindow.document.body.innerHTML = $(".elem-active").html();
		
		// 更新编辑器显示的文本大小
		var size = $("#editIfream").contents().find("div").css("font-size");	// 获取文本大小
		size = size.split('px')[0];		// 去掉后面的px
		$("#fontSize").attr("value", size);
		
		// 更新编辑器显示的字体
		var font = $("#editIfream").contents().find("div").css("font-family");
		$("#fontType").text(font);
	}
	
	
}

/* 为所有可编辑元素添加事件 */
function clickableElem($elem) {
    /* 可编辑元素双击 */
    $elem.attr('ondblclick', "elemDbClick($(this))");

    /* 可编辑元素单击 */
    //$elem.attr('onclick', 'elemOneClick()');

}

/* 使选择器选择的元素可拖拽 */
function dragable(selector) {
	$(selector).draggable({
		cursor:"move",
		scroll: false,
		
		/* opacity:0.5	拖拽时颜色变淡，会震动containment: 'parent' */
	});
}

/* 回收站 */


/* 初始化回收站 */
$(function() {
	var folder = $("#folder");
	folder.draggable();		// 回收站可拖拽

	folder.droppable({
		drop : function(event, ui) {
			ui.draggable.remove();
		},
		activate : function(){
			folder.addClass('bin-active');
		},
		deactivate : function(){
			folder.removeClass('bin-active');
		},
		hoverClass: 'bin-hover'
		
	});

    $('#workplace').on('', function () {

    });
});

/* 鼠标滚轮缩放 */
function bbimg(o) {
	var zoom = parseInt(o.style.zoom, 10) || 100;
	zoom += event.wheelDelta / 12;
	if (zoom>0) {
		o.style.zoom = zoom + '%';
	}
	return false;
}
