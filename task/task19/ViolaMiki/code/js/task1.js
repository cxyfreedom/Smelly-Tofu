var chartData = [];
var sortStep = [];
/**
 * 随机生成数据
 */
function initChart(){
    for(var i=0; i<15; ++i){
        chartData.push(parseInt(Math.random() * 90 + 10));
    }
}

/**
  * 生成队列
  */
function showChart() {
    var chartString = "";
    for(var i=0;i<chartData.length;++i){
        chartString += "<div id="+i+" style='height:"+chartData[i]*3+"px; width:20px; background:red; margin:0px 10px; order: "+i+" '></div>";
    }
    document.getElementById('chart-area').innerHTML = chartString;
}

/**
 * 排序算法
 */
function sort(){
    for(var i=chartData.length; i!=0; --i){
        for(var j=0; j<i; ++j){
            if(chartData[j]>chartData[j+1]){
               changeData(j);               
            }
        }
    }
}

function sleep(n)   
{   
    var  start=new Date().getTime();   
    while(true) if(new Date().getTime()-start>n)  break;   
}  

/**
 * 数据交换
 */
function changeData(position){
    var temp = 0;
    temp = chartData[position];
    chartData[position] = chartData[position+1];
    chartData[position+1] = temp;
    sleep(100);
    showChart();
    sortStep.push(chartData);
}
/**
 * 数据处理
 */
function changeChart(id) {
    var num = document.getElementById('num').value;
    switch(id){
        case 'leftin':
            chartData.unshift(num);showChart();break;
        case 'rightin':
            chartData.push(num);showChart();break;
        case 'leftout':
            chartData.shift(num);showChart();break;
        case 'rightout':
            chartData.pop(num);showChart();break;
        case 'sort':
            sort();break;
    }
}

function init() {
    initChart();
    showChart();
    var buttonList = document.getElementsByTagName('button');
    for(var i=0; i<buttonList.length; i++){
        buttonList[i].addEventListener('click',function(){changeChart(this.id)});
    }
}

init();