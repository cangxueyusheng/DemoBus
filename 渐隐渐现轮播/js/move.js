(function () {
    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };

    function move(curEle, target, duration,callback) {
        var tmpEffect=zhufengEffect.Linear;
        var begin = {};
        var change = {};
        var time = null;
        //根据target来补充begin和change里面的值；
        for (var attr in target) {
            begin[attr] = utils.css(curEle, attr);
            change[attr] = target[attr] - begin[attr];
        }
        //定时器性能优化
        clearInterval(curEle.timer);//关闭的是开启定时器之前的没用的定时器
        curEle.timer = setInterval(function () {
            //时间的不断累加
            time += 10;
            //停止条件
            if (time >= duration) {
                //直接设置到目标值
                utils.css(curEle, target);
                //这里为了关闭定时器
                clearInterval(curEle.timer);//此时关闭的是现在开着的定时器
                /*if(typeof callback==='function'){
                 callback.call(curEle);
                 }*/
                callback && callback.call(curEle);
                return;
            }
            //获取每个属性的最新位置，拿到每个最新位置，都需要分别设置
            for (var attr in target) {
                //获取每个属性的最新位置
                var curPos = tmpEffect(time, begin[attr], change[attr], duration);
                //对新位置的分别设置
                utils.css(curEle, attr, curPos);
            }
        }, 10)
    }

    window.zhufengAnimate = move;
})();



