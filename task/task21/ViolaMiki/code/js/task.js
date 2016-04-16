function Queue(input, id) {
    this.queueData = [];
    this.regex = /[^0-9a-zA-Z\u4e00-\u9faf]/;
    this.input = "";
    this.initQueue = initQueue;
    this.getValues = getValues;
    this.showQueue = showQueue;
    this.checkInput = checkInput;
    this.id = id;
    this.input = input;

    /**
     * 数据处理
     */
    function initQueue() {
        if (this.num instanceof Array) {
            while (this.num.length != 0) {
                this.checkInput(this.num.shift());
            }
        } else {
            this.checkInput(this.num);
        }
        this.showQueue();
    }
    /**
     * 检查输入
     */
    function checkInput(num) {
        for (var i = 0; i < this.queueData.length; ++i) {
            if (this.queueData[i] != num) {
                if (this.queueData.length == 10) {
                    this.queueData.shift();
                }
            } else {
                return;
            }
        }
        this.queueData.push(num);
    }

    /**
     * 生成队列
     */
    function showQueue() {
        var queueString = "";
        for (var i = 0; i < this.queueData.length; ++i) {
            if (this.queueData[i]) {
                queueString += "<div id='" + this.id + "_" + i + "'>" + this.queueData[i] + "</div>";
            }
        }
        document.getElementById(this.id).innerHTML = queueString;
    }

    /**
     * 获取数据
     */
    function getValues() {

    }
}

function init() {
    tag.addEventListener('keyup', function() { tagArea.getValues(); });
    var tagArea = new Queue(tag, 'tagArea');
    tagArea.getValues = function() {
        if (this.input.value.match(tagArea.regex)) {
            this.num = this.input.value.substring(0, this.input.value.length - 1);
            this.initQueue();
            this.input.value = "";
            this.addEvent();
        } else if (event.keyCode==13){
            this.num = this.input.value;
            this.initQueue();
            this.input.value = "";
            this.addEvent();
        }
    }
    //tagArea添加事件
    tagArea.addEvent = function() {
        var area = document.getElementById('tagArea').getElementsByTagName('div');
        for (var i = 0; i < area.length; ++i) {
            area[i].addEventListener('mouseover', function() { tagArea.changeStyle(this, 'in'); });
            area[i].addEventListener('mouseout', function() { tagArea.changeStyle(this, 'out'); });
            area[i].addEventListener('click', function() { tagArea.deleteTag(this.innerText); });
        }
    }
    //添加Tag改变样式事件
    tagArea.changeStyle = function(tab, action) {
        switch (action) {
            case 'in':
                tab.innerText = "点击删除" + " " + tab.innerText;
                tab.style.background = 'red';
                break;
            case 'out':
                tab.innerText = tab.innerText.split(" ")[1];
                tab.style.background = 'blue';
                break;
        }

    }
    //添加tag删除事件
    tagArea.deleteTag = function(num) {
        var index = this.queueData.indexOf(num.split(" ")[1]);
        this.queueData.splice(index,1);
        this.showQueue();
    }
    var hobby = document.getElementById('hobby');
    var button = document.getElementById('hobbyButton');
    button.addEventListener('click', function() { hobbyArea.getValues(hobby.value); });
    var hobbyArea = new Queue(hobby, 'hobbyArea');
    hobbyArea.getValues = function() {
        var string = this.input.value;
        this.num = string.split(this.regex);
        this.initQueue();
        this.input.value = "";
    }
}

init();