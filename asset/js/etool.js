var DATA_LAYOUT = 'layoutdata';

// ���浱ǰ����
function handleSaveLayout() {
	var e = $(".demo").html();
	if (!stopsave && e != window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout();
		stopsave--;
	}
}

var layouthistory; // ������ʷ

// ���沼��
function saveLayout(){
	var data = layouthistory;
	if (!data) {
		data={};
		data.count = 0;
		data.list = [];
	}
	if (data.list.length>data.count) {
		for (i=data.count;i<data.list.length;i++)
			data.list[i]=null;
	}
	data.list[data.count] = window.demoHtml;
	data.count++;
	if (supportStorage()) {
		localStorage.setItem(DATA_LAYOUT, JSON.stringify(data));
	}
	layouthistory = data;
	//console.log(data);
	/*$.ajax({  
		type: "POST",  
		url: "/build/saveLayout",  
		data: { layout: $('.demo').html() },  
		success: function(data) {
			//updateButtonsVisibility();
		}
	});*/
}

// ��������ύ���ݣ���ת������ҳ��
function downloadLayout(){
	$.ajax({
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/download'; }
	});
}

function downloadHtmlLayout(){
	$.ajax({  
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/downloadHtml'; }
	});
}

// ����
function undoLayout() {
	var data = layouthistory;
	//console.log(data);
	if (data) {
		if (data.count<2) return false;
		window.demoHtml = data.list[data.count-2];
		data.count--;
		$('.demo').html(window.demoHtml);
		if (supportStorage()) {
			localStorage.setItem(DATA_LAYOUT, JSON.stringify(data));
		}
		return true;
	}
	return false;
	/*$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			undoOperation(data);
		}
	});*/
}

// ����
function redoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
			$('.demo').html(window.demoHtml);
			if (supportStorage()) {
				localStorage.setItem(DATA_LAYOUT, JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
	/*
	$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			redoOperation(data);
		}
	});*/
}

function handleJsIds() {
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds()
}

function handleAccordionIds() {
	var e = $(".demo #myAccordion");
	var t = randomNumber();
	var n = "accordion-" + t;
	var r;
	e.attr("id", n);
	e.find(".accordion-group").each(function(e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function(e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function(e, t) {
			$(t).attr("id", r)
		})
	})
}
function handleCarouselIds() {
	var e = $(".demo #myCarousel");
	var t = randomNumber();
	var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function(e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}
function handleModalIds() {
	var e = $(".demo #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t;
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}
function handleTabsIds() {
	var e = $(".demo #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function(e, t) {
		var n = $(t).attr("id");
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}
function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
// 根据用户输入生成网格系统
function gridSystemGenerator() {
	$('#row-input input').on('keyup', function() {
		var e = 0;
		var t = "";
		var n = $(this).val().split(' ', 12);
		$.each(n, function(n, r) {
			e = e + parseInt(r);
			t += '<div class="col-sm-' + r + ' column"></div>'
		});
		if (e == 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show()
		} else {
			$(this).parent().prev().hide()
		}
	});
}
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}

// 点击删除按钮，删除组件
function removeElm() {
	$(".demo").on("click", ".remove", function(e) {
		e.preventDefault();
		$(this).parent().remove();
		if (!$(".demo .lyrow").length > 0) {
			clearDemo()
		}
	})
}
// 清空
function clearDemo() {
	$(".demo").empty();
	layouthistory = null;
	if (supportStorage()) {
		localStorage.removeItem(DATA_LAYOUT);
	}
}
function removeMenuClasses() {
	$("#menu-layoutit li button").removeClass("active")
}
function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(el) {
	$(el).parent().append($(el).children().html())
}
// ���ݹ������Ŀɱ༭Դ�룬���ɸɾ���Դ��
function buildCleanHtml() {
	var child = $("#download-layout").children();
	$("#download-layout").children().html($(".demo").html());

	child.find(".preview, .configuration, .drag, .remove").remove();
	child.find(".lyrow").addClass("removeClean");
	child.find(".box-element").addClass("removeClean");
	child.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".removeClean").each(function() {
		cleanHtml(this)
	});
	child.find(".removeClean").remove();
	$("#download-layout .column").removeClass("ui-sortable");
	$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
	if ($("#download-layout .container").length > 0) {
		changeStructure("row-fluid", "row")
	}
	formatSrc = $.htmlClean($("#download-layout").html(), {
		format: true,
		allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"]
		]
	});
	$("#download-layout").html(formatSrc);
	$("#downloadModal textarea").empty();
	$("#downloadModal textarea").val(formatSrc)
}

var timerSave = 2000; // 每隔两秒保存一次
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;


// 读取数据，显示
function restoreData(){
	if (supportStorage()) {
		layouthistory = JSON.parse(localStorage.getItem(DATA_LAYOUT));
		if (!layouthistory) {
			return false;
		}
		window.demoHtml = layouthistory.list[layouthistory.count-1];
		if (window.demoHtml) {
			$(".demo").html(window.demoHtml);
		}
	}
}

// 初始化工作区
function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function(e,t) {
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	configurationElm();
}

$(document).ready(function() {
	CKEDITOR.disableAutoInline = true;

	var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
		language: 'zh-cn',
		contentsCss: ['../dep/bootstrap/bootstrap.min.css'],
		allowedContent: true
	});

	// 自适应布局
    $("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
	$(window).resize(function() {
		$("body").css("min-height", $(window).height() - 90);
		$(".demo").css("min-height", $(window).height() - 160)
	});

	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function(e,t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function(e,t) {
					if(stopsave>0) stopsave--;
					startdrag = 0;
				}
			});
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function() {
			handleJsIds();
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	restoreData();
	initContainer();

	$('body.edit .demo').on("click","[data-target=#editorModal]",function(e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		var eText = currenteditor.html();
		contenthandle.setData(eText);
	});
	// 文本编辑器弹出框的保存按钮
	$("#savecontent").click(function(e) {
		alert('12');
		e.preventDefault();
		currenteditor.html(contenthandle.getData());
	});
	// 生成
	$("[data-target=#downloadModal]").click(function(e) {
		e.preventDefault();
		buildCleanHtml();
	});
	// 可编辑源码
	$("[data-target=#sourceModal]").click(function(e) {
		e.preventDefault();
		$('#sourceeditor').val($(".demo").html());
	});
	// 可编辑源码弹出框的保存按钮
	$("#savesource").click(function(){
		$('.demo').html($('#sourceeditor').val());
		initContainer();
		return;
	});
	// 保存
	$("[data-target=#shareModal]").click(function(e) {
		e.preventDefault();
		handleSaveLayout();
	});
	// 生成弹出框里面的下载按钮
	$("#download").click(function() {
		downloadLayout();
		return false;
	});
	$('#downloadhtml').click(function() {
		alert('1');
		downloadHtmlLayout();
		return false
	});
	// 编辑
	$('#edit').click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	// 清空
	$('#clear').click(function(e) {
		e.preventDefault();
		clearDemo()
	});
	// 布局编辑
	$('#devpreview').on('click', function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	// 预览
	$('#sourcepreview').click(function() {
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	// 自适应宽度
	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		buildCleanHtml()
	});
	// 固定宽度
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		buildCleanHtml()
	});
	// �˵��¼�
	$(".nav-header").click(function() {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown()
	});
	// 撤销
	$('#undo').on('click', function(){
		stopsave++;
		if (undoLayout()) {
			initContainer();
		}
		stopsave--;
	});
	// 重做
	$('#redo').on('click', function(){
		stopsave++;
		if (redoLayout()) {
			initContainer();
		}
		stopsave--;
	});
	removeElm();
	gridSystemGenerator();

	// 定时保存布局
	setInterval(function() {
		handleSaveLayout()
	}, timerSave);

	$("[data-toggle='tooltip']").tooltip();
})