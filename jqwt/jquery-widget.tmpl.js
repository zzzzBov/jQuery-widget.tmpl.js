/**
 * jquery-<%=widgetName%>.js
 * By: <%=widgetAuthor%>
 * 
 * Generated using jQuery Widget Template<%=copyright%>
 */
(function ($, widget) {
    "use strict";
    $[widget] = function (element, opts) {
        if (!(this instanceof $[widget])) {
            return new $[widget](element, opts);
        }
        this._element = element;
        this._options = opts;
    };
    $[widget].prototype = {
        _options: {},
        _init: function () {
            
        },
        destroy: function () {
            
        }<%=methods%>
    };
    /**
     * $(...).widget();
     *       .widget(obj options);
     *       .widget(str method);
     *       .widget(str method, args...);
     */
    $.fn[widget] = function () {
        var args,
            ret;
        args = arguments;
  	    this.each(function (i, ele) {
            var $this,
                wgt,
                fn,
                res;
            $this = $(this);
            if (!$this.is(':' + widget)) {
                wgt = new $[widget]($this, $.extend({}, args[0] || {}, $[widget].prototype._options));
                $this.data(widget, wgt);
                wgt._init();
                return;
            }
            wgt = $this.data(widget);
            if (!args.length) {
                wgt._init();
                return;
            }
            fn = ''+args[0];
            if (/^_/.test(fn)) {
                throw new Error('Methods beginning with "_" are considered private and should not be called.');
            }
            if (!$.isFunction(wgt[fn])) {
                throw new Error('"' + fn + '" is not a function and cannot be called.');
            }
            res = wgt[fn].apply(wgt, Array.prototype.slice.call(args, 1));
            if (ret === undefined) {
                ret = res;
            }
            if (/^destroy$/.test(fn)) {
                delete $this.data()[widget];
            }
        });
        if (ret === undefined) {
            ret = this;
        }
        return ret;
    };
    $.expr[':'][widget] = function (ele) {
  	    return $(ele).data(widget) instanceof $[widget];
    };
}(jQuery, <%=safeWidgetName%>));