/*
 * 剩余字数统计
 * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class="word">200</var>
 */
(function($){
    $.fn.inputLimiter = function(options){

        var DEFAULTS = {
            limit: 100, // 限制的字数
            tipLimit: -1 // 当剩余字数小于等于这个值的时候才显示提示文字，-1表示永远提示
        };

        var opts = $.extend({}, DEFAULTS, options);

        var $this = $(this);
        var $counter = $(opts.counter);

        var curLength = $this.val().length;

        console.log(opts.tipLimit);
        if (opts.tipLimit != -1 && (opts.limit - curLength > opts.tipLimit)) {
            $counter.hide();
        }

        $this[0].setAttribute("maxlength", opts.limit);
        $counter.text((opts.limit - curLength) + ' / ' + opts.limit);
        $this.on('input propertychange', function () {
            var curLength = $this.val().length;
            $counter.text((opts.limit - curLength) + ' / ' + opts.limit);
            if (opts.tipLimit != -1 && (opts.limit - curLength <= opts.tipLimit)) {
                $counter.show();
            } else {
                $counter.hide();
            }
        });
    };
})(jQuery);