/**
 * Created by TNT on 2016/5/5.
 */
var utils = {
    listToArray: function (similarArray) {
        var a = [];
        try {
            a = Array.prototype.slice.call(similarArray);
        } catch (e) {
            alert();
            //var a = [];
            for (var i = 0; i < similarArray; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },

    jsonParse: function (jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    },

    offset: function (ele) {
        var eleLeft = ele.offsetLeft;
        var eleTop = ele.offsetTop;
        var eleParent = ele.offsetParent;
        var left = null;
        var top = null;
        left += eleLeft;
        top += eleTop;
        while (eleParent) {
            if (window.navigator.userAgent.indexOf('MSIE 8.0') !== -1) {
                left += eleParent.offsetLeft;
                top += eleParent.clientTop + eleParent;
            }
            eleParent = eleParent.offsetParent;
        }
        return {left: left, top: top};
    },

    getWin: function (attr, val) {
        if (val !== undefined) {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },

    getCss: function (curEle, attr) {
        var reg = /^-?\d+(\.\d+)?(?:px|em|pt|deg|rem)?$/;
        var val = null;
        if (/MSIE(?:6|7|8)/.test(window.navigator.userAgent)) {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                var reg1 = /^alpha\(opacity=(\d+(\.\d+)?)\)/;
                return reg1.test(val) ? RegExp.$1 / 100 : 1;
            }
            val = curEle.currentStyle[attr];
        } else {
            val = window.getComputedStyle(curEle, null)[attr];
        }
        return reg.test(val) ? parseFloat(val) : val;
    },

    setCss: function (ele, attr, value) {
        if (attr === 'opacity') {
            if (/MSIE(?:6|7|8)/.test(window.navigator.userAgent)) {
                ele.style['filter'] = 'alpha(opacity=' + value * 100 + ')';
            } else {
                ele.style.opacity = value;
            }
            return;
        }
        if (attr === 'float') {
            ele.style['cssFloat'] = value;
            ele.style['styleFloat'] = value;
            return;
        }
        var reg = /^(width|height|top|right|bottom|left|(margin|padding)(Top|Bottom|Left|Right)?)$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += 'px';
            }
        }
        ele.style[attr] = value;
    },

    setGroupCss: function (ele, obj) {
        obj = obj || '0';
        if (obj.toString() != '[object Object]') {
            return;
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.setCss(ele, key, obj[key]);
            }
        }
    }

}


















