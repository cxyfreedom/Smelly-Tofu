var binTree = {};
var i = 0;
function Node(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
}

//二叉树遍历
function search(node) {
    if (null != node) {
        var nodeDom = document.getElementById(node.value);
        setTimeout(function() {
            nodeDom.style.background = 'blue';
        }, (i++) * 500);
        setTimeout(function() {
            nodeDom.style.background = 'white';
        }, (i++) * 500);
        search(node.left);
        search(node.right);
    }
}

function init() {
    //构造二叉树
    binTree.node_15 = new Node('14', null, null);
    binTree.node_14 = new Node('13', null, null);
    binTree.node_13 = new Node('12', null, null);
    binTree.node_12 = new Node('11', null, null);
    binTree.node_11 = new Node('10', null, null);
    binTree.node_10 = new Node('9', null, null);
    binTree.node_9 = new Node('8', null, null);
    binTree.node_8 = new Node('7', null, null);
    binTree.node_7 = new Node('6', binTree.node_14, binTree.node_15);
    binTree.node_6 = new Node('5', binTree.node_12, binTree.node_13);
    binTree.node_5 = new Node('4', binTree.node_10, binTree.node_11);
    binTree.node_4 = new Node('3', binTree.node_8, binTree.node_9);
    binTree.node_3 = new Node('2', binTree.node_6, binTree.node_7);
    binTree.node_2 = new Node('1', binTree.node_4, binTree.node_5);
    binTree.node_1 = new Node('root', binTree.node_2, binTree.node_3);
    var button = document.getElementById('search');
    button.addEventListener('click', function() { search(binTree.node_1) });
}

init();