/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value;
	var value = document.getElementById('aqi-value-input').value;
	var cityRegex = /[a-zA-Z\u4E00-\u9FA5]/
	if(!cityRegex.exec(city)){
		alert('城市名称只能输入英文或者中文字符');
		return false;
	}
	var valueRegex = /[0-9]/
	if(!valueRegex.exec(value)){
		alert('空气质量指数只能输入数字');
		return false;
	}
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var key in aqiData){
		aqiTable += "<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button value='"+key+"'>删除</button></td></tr>"
	}
	document.getElementById("aqi-table").innerHTML = aqiTable;
	buttonList = document.getElementById('aqi-table').getElementsByTagName('button');
	if(buttonList){
		for(var i=0;i<buttonList.length;++i){
		buttonList[i].addEventListener('click',function(){delBtnHandle(buttonList[i].value)},false);
		}
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
  // do sth.
  delete aqiData[key];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener('click',addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();
