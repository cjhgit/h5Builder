/**
 * Created by cjh1 on 2016/3/12.
 */

var DATA_FORM = 'data_form';


$(function(){
    $( ".component" ).draggable({
        helper: 'clone',
        cursor:"move",
    });

    function save() {
        if (supportStorage()) {
            localStorage.setItem(DATA_FORM + curPage, $('#src').html());
        } else {
            alert('浏览器版本太低，保存失败'); // TODO
        }
    }
    function droppableSrc() {
        $('#src form').droppable({
            activeClass: 'target-active',
            hoverClass: 'target-hover',
            accept: ":not(.ui-sortable-helper)",
            drop: function (e, ui) {
                var html = ui.draggable.html();
                var $el = $('<div class="component">' + html + '</div>');
                var $tool = $("#tool").clone(true);
                //$el.append(tool);
                $(this).append($el);
            }
        }).sortable({
            items: '.component',
            placeholder: 'ui-sortable-placeholder',
            sort: function() {
                // gets added unintentionally by droppable interacting with sortable
                // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                $(this).removeClass( "target-active" );
            }
        });
    }

    function restoreData() {
        if (supportStorage()) {
            var html = localStorage.getItem(DATA_FORM + 1);
            if (!html) {
                html = '<form id="target" class="target form-horizontal"></form>'
            }
            $('#src').html(html);
            curPage = page;
        }
        droppableSrc();
    }

    restoreData();
    //droppableSrc();

    function cleanElement(el) {
        $(el).parent().append($(el).html())
    }

    function cleanHtml() {
        var $dl = $('#download-layout');
        $dl.html($('#src').html());
        var $form = $dl.find('form');


        $form.find('.component').each(function(){
            cleanElement(this);
        });
        $form.find(".component").remove();
        $form.removeClass('ui-sorttable');
        $form.removeClass('ui-draggable');
        $("#download-layout .component").removeClass("ui-sortable");
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
        //alert(formatSrc);
        $('#code-src').html(formatSrc);
        $('#src-modal').modal();
    }

    // 源码
    $('#html-src').on('click', function() {
        cleanHtml();
    });

    var $text;
    var curPage = 1;
    $("#page").on('change', function() {
        var page = $(this).find('option:selected').val();
        if (supportStorage()) {
            localStorage.setItem(DATA_FORM + curPage, $('#src').html());
            var html = localStorage.getItem(DATA_FORM + page);
            if (!html) {
                html = '<form id="target" class="target form-horizontal"></form>'
            }
            $('#src').html(html);
            curPage = page;

            droppableSrc();

        }
    });

    $(document).on('click', '#src .component', function(){
        $this = $(this);
        $text = $this;
        input = $this.find('.form-group');
        //alert(input);
        if ($this.find('input[type=text]').length || $this.find('input[type=password]').length) {
            //alert();
            var id = input.find('input').attr('id');
            if (!id) {
                id = 'eui-' + $.fn.uid();
            }
            $('#text-id').val(id);
            $('#text-label').val(input.find('label').text());
            $('#text-tip').val(input.find('input').attr('placeholder'));
            $('#text-help').val(input.find('.help-block').text());

            $('#text-modal').modal();
        } else if ($this.find('select').length) {
            //alert();
            var id = input.find('input').attr('id');
            if (!id) {
                id = 'eui-' + $.fn.uid();
            }
            $('#text-id').val(id);
            $('#text-label').val(input.find('label').text());
            $('#text-help').val(input.find('.help-block').text());

            var arr = [];
            input.find('option').each(function() {
                //alert($(this).text());
                arr.push($(this).text());
            });
            $('#text-textarea').val(arr.join('\n'));
            $('#text-modal').modal();
        }



    });

    $('#text-modal-save').on('click', function () {
        $text.find('label').text($('#text-label').val());
        $text.find('input').attr('placeholder', $('#text-tip').val());
        $text.find('.help-block').text($('#text-help').val());
        var arr = $('#text-textarea').val().split('\n');
        $text.find('select').empty();
        var $select = $text.find('select');
        for (var i = 0, length = arr.length; i < length; i++) {
            $select.append('<option>' + arr[i] + '</option>');
        }
    });

    $('#text-modal-delete').on('click', function () {
        $text.remove();
    });

    $('#save').on('click', function() {
        save();
    });

    if (supportStorage()) {
        setInterval(AutoSave, 10000);
    }

    function AutoSave() {

    }
    //var time = date.getHours() + ':' + date.getMinutes();
    //$('#textModal').modal();
});

(function ($) {

    $.fn.uid = function (options) {
        var count = 1;
        var defaults = {
            checkall_name: "checkall_name", //ȫѡ��name
            checkbox_name: "checkbox_name" //�������ĸ�ѡ��name
        };
        count++;
        return count;
    };
})(jQuery);
