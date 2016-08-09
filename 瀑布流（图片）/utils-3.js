var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg)
        }
        var ary = [];
        for (var i = 0; i < ary.length; i++) {
            ary.push(arg[i]);
        }
        return ary;
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')')
    }

    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offSet(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8') < 0) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    /*function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            //val = getComputedStyle(curEle, false)[attr];
            val = getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[:=](\d+)\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^[+-]?\d+(\.\d+)?(pm|px|em|rem)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }*/

    function getCss(curEle,attr){
        var val,reg;
        if(flag){
            val=getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle['filter'];
                reg=/^alpha\(opacity[=:](\d+)\)$/;
                return reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        reg=/^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/
        return reg.test(val)?parseFloat(val):val;
    }
    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            tmp = n;
            n = m;
            m = tmp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function getByClass(strClass, curEle) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass));
            //或者写成return Array.prototype.slice.call(curEle.getElementsByClassName(strClass))
            //或者写成return Array.prototype.slice.call(curEle.getElementsByClassName(strClass))
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var bOk = true;
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                var reg = new RegExp('\\b' + curClass + '\\b');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className)
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ',' + curClass;
            }
        }
    }

    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            var reg = new RegExp('(^| +)' + curClass + '( +|$)');
            if (reg.test(curEle.className)) {
                curEle.className = curEle.className.replace(reg, ' ').replace(/\s+/);
            }
        }
    }

    function getChildren(curEle) {
        if (flag) {
            return this.listToArray(curEle.children)
        }
        var ary = [];
        var childrenList = curEle.childNodes;
        for (var i = 0; i < childrenList.length; i++) {
            if (childrenList[i].nodeType === 1) {
                ary[ary.length] = childrenList[i];
            }
        }
        return ary;
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

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0]
    }

    function lastChild(curEle) {
        var lChs = this.getChildren(curEle);
        return lChs[lChs.length - 1]
    }

    function index(curEle) {
        return this.prevAll(curEle).length
    }

    function prependChild(parent, newEle) {
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(newEle, first);
        } else {
            parent.appendChild(newEle)
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle)
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
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

    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        win: win,
        offSet: offSet,
        getCss: getCss,
        rnd: rnd,
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getChildren: getChildren,
        prev: prev,
        prevAll: prevAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        firstChild: firstChild,
        lastChild: lastChild,
        index: index,
        prependChild: prependChild,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        setCss: setCss,
        css: css,
        setGroupCss: setGroupCss


        /*setCss: function (curEle, attr, value) {
         if (attr === 'float') {
         curEle.style.styleFloat = value;
         curEle.style.cssFloat = value;
         }
         if (attr === 'opacity') {
         curEle.style.opacity = value;
         curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
         return;
         }
         var reg = /(width|height|top|right|bottom|left|(margin|padding(top|right|bottom|left)?))/;
         if (reg.test(attr)) {
         value = parseFloat(value) + 'px';
         }
         curEle.style[attr] = value;
         },*/
        /*setGroupCss: function (curEle, options) {
         for (var attr in options) {
         this.setCss(curEle, attr, options[attr]);
         }
         },*/
        /*css: function (curEle) {
         var arg2 = arguments[1];
         if (typeof arg2 === 'string') {
         var arg3 = arguments[2];
         if (typeof arg3 === 'undefined') {
         return this.getCss(curEle, arg2)
         } else {
         this.setCss(curEle, arg2, arg3)
         }
         }
         if (arg2.toString() === "[object Object]") {
         this.setGroupCss(curEle, arg2);
         }
         },*/
    }
})();
