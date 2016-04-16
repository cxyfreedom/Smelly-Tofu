var queueData = [];

/**
  * 生成队列
  */
function showQueue() {
    var queueString = "";
    for(var i=0;i<queueData.length;++i){
        if(queueData[i]){
           queueString += "<div id='queue_"+i+"'>"+queueData[i]+"</div>"; 
        }           
    }
    document.getElementById('queue').innerHTML = queueString;
}

/**
 * 数据处理
 */
function initQueue(id) {
    var num = getValues();
    switch(id){
        case 'leftin':
            while(num.length != 0){
                queueData.unshift(num.pop()); 
            }  
            showQueue();     
            break;     
        case 'rightin':
            while(num.length != 0){
                queueData.push(num.shift());
            }
            showQueue();
            break;
        case 'leftout':
            queueData.shift(num);
            showQueue();break;
        case 'rightout':
            queueData.pop(num);
            showQueue();break;
        case 'search':
            var searchString = document.getElementById('searchString').value;
            for (var i=0;i<queueData.length;++i){
                if(queueData[i].indexOf(searchString) >= 0){
                    var block = document.getElementById('queue_'+i);
                    block.style.background = "blue";
                }
            }
    }
}

/**
 * 获取数据
 */
function getValues(){
    var string = document.getElementById('num').value;
    return string.split(/[^0-9a-zA-Z\u4e00-\u9faf]/);
}

function init() {
    var buttonList = document.getElementsByTagName('button');
    for(var i=0; i<buttonList.length; i++){
        buttonList[i].addEventListener('click',function(){initQueue(this.id)});
    }
}

init();