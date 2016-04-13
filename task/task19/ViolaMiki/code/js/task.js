var chartData = [];

/**
 * 随机生成数据
 */
function initChart() {
    for (var i = 0; i < 30; ++i) {
        chartData.push(parseInt(Math.random() * 90 + 10));
    }
}

/**
  * 生成队列
  */
function showChart(arr) {
    var chartString = "";
    
    var max = Math.max.apply(null,arr)
    
    for (var i = 0; i < arr.length; ++i) {
        chartString += "<div id=" + i + " style='height:" + arr[i] * 3 + "px; width:16px; background:red; margin:0px 2px; order: " + i + " '></div>";
    }
    document.getElementById('chart-area').innerHTML = chartString;
}

/**
 * 数据处理
 */
function sort() {
    var index = 0;
    for (var i = chartData.length; i != 0; --i) {
        for (var j = 0; j < i; ++j) {
            if (chartData[j] > chartData[j + 1]) {
                changeData(j,index);
                index++;
            }
        }
    }
}

// function sleep(n)   
// {   
//     var  start=new Date().getTime();   
//     while(true) if(new Date().getTime()-start>n)  break;   
// }  

/**
 * 数据交换
 */
function changeData(position,index ) {
    var temp = 0;
    temp = chartData[position];
    chartData[position] = chartData[position + 1];
    chartData[position + 1] = temp;
    var arr = chartData.slice()
    setTimeout(function(){
        showChart(arr);
    },index*50,arr)
    
}
/**
 * 数据处理
 */
function changeChart(id) {
    var num = document.getElementById('num').value;
    switch (id) {
        case 'leftin':
            if(checkInput(num)){
               chartData.unshift(num);  
            }
            break;               
        case 'rightin':
            if(checkInput(num)){
                chartData.push(num);
            }
            break;
        case 'leftout':
            chartData.shift(num); break;
        case 'rightout':
            chartData.pop(num); break;
        case 'sort':
            sort(); break;
    }
    showChart(chartData);
}

/**
 * 输入检测
 */
function checkInput(num){
    if(chartData.length>=60){
        alert("排序限制最多60个数据");
        return false;
    }
    if(!num.match(/^[0-9]+$/)){
        alert("只能输入数字");
        return false;
    }
    if(num<10 || num>100){
        alert("数据范围在10-100中间");
        return false;
    }
    return true;
}

function init() {
    initChart();
    showChart(chartData);
    var buttonList = document.getElementsByTagName('button');
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener('click', function() { changeChart(this.id) });
    }
}

init();