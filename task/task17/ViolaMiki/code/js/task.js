/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chartHTML = "";
  var width = {'day':10,'week':40,'month':60};
  var margin = {'day':5,'week':40,'month':80};
  var chart = document.getElementById('aqi-chart-wrap');
  var colorArray = ['red','black','blue','green','grey'];
  var color = "";
  for (var key in chartData){
    color = colorArray[Math.floor(Math.random()*colorArray.length)];
    chartHTML += "<div style='height:"+chartData[key]+"px; width:"+width[pageState.nowGraTime]+"px; background:"+color+"; margin:0px "+margin[pageState.nowGraTime]+"px' title='"+key+"空气质量指数："+chartData[key]+"'></div>";
  }
  chart.innerHTML=chartHTML;
  chartBar = chart.getElementsByTagName('div');
  for (var i=0; i<chartBar.length; ++i){
    chartBar[i].addEventListener('mousein',function(){showTitle(this.title)});
    chartBar[i].addEventListener('mouseout',hiddenTitle);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var redioList = document.getElementById('form-gra-time').getElementsByTagName('input');
  var time = "";
  for (var i=0; i<redioList.length; ++i){
    if (redioList[i].checked){
      time = redioList[i].value;
    }
  }
  if(time != pageState.nowGraTime){
    // 设置对应数据
    pageState.nowGraTime = time;
    // 调用图表渲染函数    
    initAqiChartData();  
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var select = document.getElementById('city-select').value;
  if(select != pageState.nowSelectCity){
    // 设置对应数据
    pageState.nowSelectCity = select;
    // 调用图表渲染函数
    initAqiChartData();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var redioList = document.getElementById('form-gra-time').getElementsByTagName('input');
  for (var i=0; i<redioList.length; ++i){
      redioList[i].addEventListener('change',graTimeChange,false);
      if(redioList[i].checked){
          pageState.nowGraTime = redioList[i].value;
      }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var optionList = "";
  var select = document.getElementById('city-select');
  for ( var key in aqiSourceData){
      optionList += "<option>"+key+"</option>";
  }
  select.innerHTML=optionList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener('change', citySelectChange, false);
  pageState.nowSelectCity = select.value;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var aqiCityData = aqiSourceData[pageState.nowSelectCity];
  var count = 0;
  chartData = {};
  switch (pageState.nowGraTime){
    case 'week':
      var weekCount = 0;
      var day = '';
      var dayKey = '';
      var week = 1;
      for (var key in aqiCityData){
        if(weekCount == 7){
          chartData[dayKey] /= weekCount;
          chartData[dayKey] = chartData[dayKey].toFixed(2);
          weekCount = 0;
          if(key.split('-')[1] != day[1]){
            day = key.split('-');
            week = 0;
          }
          ++week;
          dayKey = day[0]+'-'+day[1]+'-第'+week+'周';
        }else if(!dayKey){
          day = key.split('-');
          dayKey = day[0]+'-'+day[1]+'-第'+week+'周';
        }
        chartData[dayKey]?true:chartData[dayKey]=0;
        chartData[dayKey] += aqiCityData[key];
        ++weekCount;
      }
      chartData[dayKey] /= weekCount;
      chartData[dayKey] = chartData[dayKey].toFixed(2);
      break;
    case 'month':
      var month = "";
      var monthDay = 0;
      for (var key in aqiCityData){
        if(key.split('-')[1] != month){
          if(month){
            chartData[count] /= monthDay;
            chartData[count] = chartData[count].toFixed(2);
            monthDay = 0;
            count=key.substring(0,7);            
          }
          month = key.split('-')[1];
          count=key.substring(0,7);
        }
        chartData[count]?true:chartData[count]=0;
        chartData[count] += aqiCityData[key];
        monthDay++;
      }
      chartData[count] /= monthDay;
      chartData[count] = chartData[count].toFixed(2);
      break;
    case 'day':
      for (var key in aqiCityData){
        chartData[key] = aqiCityData[key];
      }
      break;
  }
  renderChart();
}

/**
 * 显示悬浮层
 */
function showTitle(title) {
  var x,y; 
  x = event.clientX; 
  y = event.clientY; 
  document.getElementById("popLayout").style.left = x; 
  document.getElementById("popLayout").style.top = y; 
  document.getElementById("popLayout").innerText = title; 
  document.getElementById("popLayout").style.display = "block"; 
}

/**
 * 隐藏悬浮层
 */
function hiddenTitle(){
  document.getElementById("popLayout").style.display = "none"; 
}

/**
 * 初始化函数
 */
function init() {
  var time = initGraTimeForm()
  var day = initCitySelector();
  initAqiChartData();
}

init();
