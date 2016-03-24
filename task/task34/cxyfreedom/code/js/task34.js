var area = document.getElementById('board');
var rotate_value = 0;   // 角度
var ret = 0;
var cur_dir = 0;    // 方向
var step = 0;       // 步数
var cur_x = 0;      // X坐标
var cur_y = 0;      // Y坐标

// 创建小块
function create_block(){
    var ctrl_block = document.createElement('div');
    ctrl_block.setAttribute("id", "main");
    area.appendChild(ctrl_block);
}

// 创建表格
function create_board() {
    // 创建表格主体部分
    var area_body = document.createElement('tbody');
    for(var i = 0; i < 11; i++) {
        // 创建表格的行
        var area_tr = document.createElement('tr');
        for(var j = 0; j < 11; j++) {
            var area_td = document.createElement('td');
            if (i == 0) {
                if (j != 0) {
                    area_td.innerHTML = "<b>" + j + "</b>";
                }
            }
            else{
                if (j == 0) {
                    area_td.innerHTML = "<b>" + i + "</b>";
                }
            }
            area_tr.appendChild(area_td);
        }
        area_body.appendChild(area_tr);
    }
    area.appendChild(area_body);
}

// 确认小块的方向
function confirm_dir(){
    var exp = new RegExp('-?[0-9]\\d*');
    var angle = document.getElementById('main').style.transform;
    rotate_value = parseInt(exp.exec(angle));

    switch(rotate_value % 360)
    {
        case 0:
            return "left";
        case 90:
        case -270:
            return "top";
        case 180:
        case -180:
            return "right";
        case 270:
        case -90:
            return "down";
    }
}

// 文本输入执行指令
function get_cmd_from_input() {
    var input_cmd = document.getElementById('input-cmd').value;
    exec_cmd(input_cmd);
}

// 按钮执行指令
function get_cmd_from_button(id) {
    var button_cmd = document.getElementById(id).value;
    exec_cmd(button_cmd);
}

function cmd_event(e){
    var cmd_id = e.target.id;
    switch(cmd_id)
    {
        case "go-ahead":
            cur_dir = confirm_dir();
            move();
            break;
        case "exec-cmd":
            get_cmd_from_input();
            break;
        case "tun-left":
        case "tun-right":
        case "tun-bac":
        case "tra-left":
        case "tra-right":
        case "tra-top":
        case "tra-down":
        case "mov-left":
        case "mov-top":
        case "mov-right":
        case "mov-down":
            get_cmd_from_button(cmd_id);
            break;
    }
}

// 指令集
function exec_cmd(cmd){
    cur_x = (parseInt(document.getElementById('main').style.left) - 1) / 51;
    cur_y = (parseInt(document.getElementById('main').style.top) - 1) / 51;
    cur_dir = confirm_dir();

    switch(cmd)
    {
        case "TUN LEF":
            rotate_value -= 90;
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            break;
        case "TUN RIG":
            rotate_value += 90;
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            break;
        case "TUN BAC":
            rotate_value += 180;
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            break;
        case "TRA LEF":
            cur_dir = "left";
            move();
            break;
        case "TRA TOP":
            cur_dir = "top";
            move();
            break;
        case "TRA RIG":
            cur_dir = "right";
            move();
            break;
        case "TRA BOT":
            cur_dir = "down";
            move();
            break;
        case "MOV LEF":
            if (cur_dir == "top"){
                rotate_value -= 90;
            }
            else if (cur_dir == "down"){
                rotate_value += 90;
            }
            else if (cur_dir == "right"){
                rotate_value += 180;
            }
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            if (cur_x > 1) {
                cur_dir = "left";
                move();
            }
            break;
        case "MOV TOP":
            if (cur_dir == "right"){
                rotate_value -= 90;
            }
            else if (cur_dir == "left"){
                rotate_value += 90;
            }
            else if (cur_dir == "down"){
                rotate_value += 180;
            }
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            if (cur_y > 1){
                cur_dir = "top";
                move();
            }
            break;
        case "MOV RIG":
            if (cur_dir == "down"){
                rotate_value -= 90;
            }
            else if (cur_dir == "top"){
                rotate_value += 90;
            }
            else if (cur_dir == "left"){
                rotate_value += 180;
            }
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            if (cur_x < 10){
                cur_dir = "right";
                move();
            }
            break;
        case "MOV BOT":
            if (cur_dir == "left"){
                rotate_value -= 90;
            }
            else if (cur_dir == "right"){
                rotate_value += 90;
            }
            else if (cur_dir == "top"){
                rotate_value += 180;
            }
            document.getElementById('main').style.transform = "rotate(" + rotate_value + "deg)";
            if (cur_y < 10){
                cur_dir = "down";
                move();
            }
            break;
        default:
            alert("Command is illegal!");
            document.getElementById('input-cmd').value = "";
            break;
    }
}

function pos_init(){
    // 随机初始位置
    cur_x = Math.floor(Math.random()*10+1);
    cur_y = Math.floor(Math.random()*10+1);

    document.getElementById('main').style.top = (51 * cur_y + 1) + 'px';
    document.getElementById('main').style.left = (51 * cur_x + 1) + 'px';

    // 默认左为0°
    document.getElementById('main').style.transform = "rotate(0deg)";
    // 事件委托
    document.getElementById('cmd-all').onclick = cmd_event;
    // 清空文本
    document.getElementById('input-cmd').value = "";
}

// 移动一小格
function move_by_cmd(){
    var left_distance = parseInt(document.getElementById('main').style.left);
    var top_distance = parseInt(document.getElementById('main').style.top);

    cur_x = (left_distance - 1) / 51;
    cur_y = (top_distance - 1) / 51;

    step += 1;
    if (step <= 17) {
        switch(cur_dir)
        {
            case "left":
                if (cur_x > 1){
                    document.getElementById('main').style.left = left_distance - 3 + 'px';
                }
                else{
                    step = 0;
                    window.clearInterval(ret);
                }
                break;
            case "top":
                if (cur_y > 1){
                    document.getElementById('main').style.top = top_distance - 3 + 'px';
                }
                else {
                    step = 0;
                    window.clearInterval(ret);
                }
                break;
            case "right":
                if (cur_x < 10){
                    document.getElementById('main').style.left = left_distance + 3 + 'px';
                }
                else {
                    step = 0;
                    window.clearInterval(ret);
                }
                break;
            case "down":
                if (cur_y < 10){
                    document.getElementById('main').style.top = top_distance + 3 + 'px';
                }
                else {
                    step = 0;
                    window.clearInterval(ret);
                }
                break;
        }
    }
    else {
        step = 0;
        window.clearInterval(ret);
    }
}

function move(){
    if (step != 0){
        return;
    }
    ret = setInterval("move_by_cmd()", 5);
}

function run(){
    create_board();
    create_block();
    pos_init();
}

window.onload = run;