/**
 * Created by TNT on 2016/7/9.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            val = getComputedStyle(curEle, false)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d+)\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.cssFloat = value;
            curEle.style.styleFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?)/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr])
        }
    }

    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 === 'undefined') {
                return this.getCss(curEle, arg2);
            }
            this.setCss(curEle, arg2, arg3);
        }
        if (arg2.toString() === '[object Object]') {
            this.setGroupCss(curEle, arg2);
        }
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling
        }
        return pre
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        for (var i = 0; i < nex.length; i++) {
            while (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling
            }
        }
        return nex
    }

    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')')
    }

    return{
        jsonParse:jsonParse,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        prev:prev,
        prevAll:prevAll,
        next:next,
        nextAll:nextAll,
        siblings: siblings
    }
})();





