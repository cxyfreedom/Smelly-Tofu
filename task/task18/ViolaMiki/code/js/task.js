var queueData = [];

/**
  * 生成队列
  */
function showQueue() {
    var queueString = "";
    for(var i=0;i<queueData.length;++i){
        queueString += "<div>"+queueData[i]+"</div>";
    }
    document.getElementById('queue').innerHTML = queueString;
}

/**
 * 数据处理
 */
function initQueue(id) {
    var num = document.getElementById('num').value;
    switch(id){
        case 'leftin':
            queueData.unshift(num);break;
        case 'rightin':
            queueData.push(num);break;
        case 'leftout':
            queueData.shift(num);break;
        case 'rightout':
            queueData.pop(num);break;
    }
    showQueue();
}

function init() {
    var buttonList = document.getElementsByTagName('button');
    for(var i=0; i<buttonList.length; i++){
        buttonList[i].addEventListener('click',function(){initQueue(this.id)});
    }
}

init();