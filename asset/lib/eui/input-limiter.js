/*
 * ʣ������ͳ��
 * ע�� �������ֻ��Ҫ�ڷ����ֵĽڵ�����ֱ��д�ü��� �磺<var class="word">200</var>
 */
(function($){
    $.fn.inputLimiter = function(options){

        var DEFAULTS = {
            limit: 100, // ���Ƶ�����
            tipLimit: -1 // ��ʣ������С�ڵ������ֵ��ʱ�����ʾ��ʾ���֣�-1��ʾ��Զ��ʾ
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