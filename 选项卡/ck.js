var oLis = document.getElementsByClassName('outer')[0].getElementsByTagName('li');
var oDivs = document.getElementsByClassName('outer')[0].getElementsByClassName('content');
for (var i = 0; i < oLis.length; i++) {
    oLis[i].selfIndex = i;
    oLis[i]['onmouseover'] = function () {
        tab(this.selfIndex);
    }
}
function tab(index){
    for(var i=0;i<oLis.length;i++){
        oLis[i].className='';
        oDivs[i].className='content';
    }
    oLis[index].className='active';
    oDivs[index].className='content selected';
}