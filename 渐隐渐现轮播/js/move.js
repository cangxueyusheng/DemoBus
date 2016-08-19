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
        //����target������begin��change�����ֵ��
        for (var attr in target) {
            begin[attr] = utils.css(curEle, attr);
            change[attr] = target[attr] - begin[attr];
        }
        //��ʱ�������Ż�
        clearInterval(curEle.timer);//�رյ��ǿ�����ʱ��֮ǰ��û�õĶ�ʱ��
        curEle.timer = setInterval(function () {
            //ʱ��Ĳ����ۼ�
            time += 10;
            //ֹͣ����
            if (time >= duration) {
                //ֱ�����õ�Ŀ��ֵ
                utils.css(curEle, target);
                //����Ϊ�˹رն�ʱ��
                clearInterval(curEle.timer);//��ʱ�رյ������ڿ��ŵĶ�ʱ��
                /*if(typeof callback==='function'){
                 callback.call(curEle);
                 }*/
                callback && callback.call(curEle);
                return;
            }
            //��ȡÿ�����Ե�����λ�ã��õ�ÿ������λ�ã�����Ҫ�ֱ�����
            for (var attr in target) {
                //��ȡÿ�����Ե�����λ��
                var curPos = tmpEffect(time, begin[attr], change[attr], duration);
                //����λ�õķֱ�����
                utils.css(curEle, attr, curPos);
            }
        }, 10)
    }

    window.zhufengAnimate = move;
})();



