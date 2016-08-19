var oBox = document.getElementById('box');
var oBoxInner = oBox.getElementsByTagName('div')[0];
var aDiv = oBoxInner.getElementsByTagName('div');
var aImg = oBoxInner.getElementsByTagName('img');
var oUl = oBox.getElementsByTagName('ul')[0];
var aLi = oBox.getElementsByTagName('li');
var oBtnLeft = oBox.getElementsByTagName('a')[0];
var oBtnRight = oBox.getElementsByTagName('a')[1];
var data = null;
var step = 0;
var interval = 2000;
var autoTimer = null;


getData();
function getData() {
    var xml = new XMLHttpRequest;
    xml.open('get', 'json/data.txt?=' + Math.random(), false);
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
            data = utils.jsonParse(xml.responseText);
        }
    };
    xml.send(null)
}

bind();
function bind() {
    var str1 = '';
    var str2 = '';
    for (var i = 0; i < data.length; i++) {
        str1 += '<div><img realImg="' + data[i].imgSrc + '" alt=""/></div>';
        str2 += i === 0 ? '<li class="bg"></li>' : '<li></li> ';
    }
    oBoxInner.innerHTML = str1;
    oUl.innerHTML = str2;
}

lazyImg();
function lazyImg() {
    for (var i = 0; i < aImg.length; i++) {
        var tmpImg = new Image;
        tmpImg.src = aImg[i].getAttribute('realImg');
        tmpImg.index = i;
        tmpImg.onload = function () {
            aImg[this.index].src = this.src;
            utils.css(aDiv[0], 'zIndex', 1);
            zhufengAnimate(aDiv[0], {opacity: 1}, 1000)
        }
    }
}
clearInterval(autoTimer);
autoTimer = setInterval(autoMove, interval);
function autoMove() {
    if (step >= aDiv.length - 1) {
        step = -1
    }
    step++;
    setBanner();
}


function setBanner() {
    for (var i = 0; i < aDiv.length; i++) {
        var curEle = aDiv[i];
        if (i === step) {
            utils.css(curEle, 'zIndex', 1);
            zhufengAnimate(curEle, {opacity: 1}, 1000, function () {
                var siblings = utils.siblings(this);
                for (var k = 0; k < siblings.length; k++) {
                    utils.css(siblings[k], 'opacity', 0)
                    //zhufengAnimate(siblings[k], {opacity: 0}, 1000)
                }
            })
        } else {
            utils.css(curEle, 'zIndex', 0)
        }
    }
    bannerTip()
}

function bannerTip() {
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].className = i === step ? 'bg' : '';
    }
}

oBox.onmousemove = function () {
    clearInterval(autoTimer);
    oBtnLeft.style.display = oBtnRight.style.display = 'block';
};
oBox.onmouseout = function () {
    autoTimer = setInterval(autoMove, interval);
    oBtnLeft.style.display = oBtnRight.style.display = 'none';
};

handleChange();
function handleChange() {
    for (var i = 0; i < aLi.length; i++) {
        var cur = aLi[i];
        cur.index = i;
        cur.onclick = function () {
            step = this.index;
            setBanner()
        }
    }
}

oBtnLeft.onclick = function () {
    if (step <= 0) {
        step = aDiv.length;
    }
    step--;
    setBanner()
};
oBtnRight.onclick = autoMove;