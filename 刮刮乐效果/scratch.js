// 刮刮乐js
var myCanvas;		// 画布
var ctx;			// 画笔
var isMouseDown; 	// 标志用户是否按下鼠标或开始触摸
var isOk = 0; 		// 标志用户是否已经划开一半以上
var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);	// 这是为了不同分辨率上配合@media自动调节刮的宽度
var options = ['谢谢惠顾', '再来一瓶', '再买一瓶', '送你一瓶', '5折优惠'];
var getOption = false;

// 页面加载后开始初始化画布
window.onload = function () {
  myCanvas = document.getElementById("myCanvas");
  // 这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
  // 最好设置成跟画布在页面中的实际大小一样
  // 不然canvas中的坐标跟鼠标的坐标无法匹配
  myCanvas.width = myCanvas.parentNode.clientWidth;
  myCanvas.height = myCanvas.parentNode.clientHeight;
  ctx = myCanvas.getContext("2d");

  // pc端的处理
  myCanvas.addEventListener("mousemove", eventMove, false);
  myCanvas.addEventListener("mousedown", eventDown, false);
  myCanvas.addEventListener("mouseup", eventUp, false);

  // 移动端的处理
  myCanvas.addEventListener("touchmove", eventMove, false);
  myCanvas.addEventListener("touchstart", eventDown, false);
  myCanvas.addEventListener("touchend", eventUp, false);

  // 初始化
  initCanvas();
}

// 画灰色的矩形铺满
function initCanvas() {
  //网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div
  //myCanvas.style.backgroundImage="url(中奖图片.jpg)";
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
  ctx.fill();

  // 在画布中显示“刮一刮”
  ctx.font = "Bold 40px 微软雅黑";
  ctx.textAlign = "center";
  ctx.fillStyle = "#999999";
  ctx.fillText("刮一刮", myCanvas.width / 2, myCanvas.height / 2);

  ctx.globalCompositeOperation = "destination-out"; 	// 有些老的手机自带浏览器不支持destination-out，下面的代码中有修复的方法
}

// 鼠标按下或触摸开始
function eventDown(e) {
  e.preventDefault();
  isMouseDown = true;
  if (!getOption) {
    randomOption();
  }
}

// 鼠标抬起或触摸结束
function eventUp(e) {
  e.preventDefault();

  // 得到canvas的全部数据
  var a = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
  var j = 0;
  for (var i = 3; i < a.data.length; i += 4) {
    if (a.data[i] == 0) {
      j++;
    }
  }

  // 当被刮开的区域等于一半时，则可以开始处理结果
  if (j >= a.data.length / 8) {
    isOk = 1;
    myCanvas.width = 0;
  }
  isMouseDown = false;
}

// 鼠标移动或触摸移动
function eventMove(e) {
  e.preventDefault();
  if (isMouseDown) {
    var wrap = document.getElementById('wrap');
    if (e.changedTouches) {
      e = e.changedTouches[e.changedTouches.length - 1];
    }
    var oX = wrap.offsetLeft;
    var oY = wrap.offsetTop;
    var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0;
    var y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

    //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
    //画出来是透明的
    ctx.beginPath();
    ctx.arc(x, y, fontem * 1.2, 0, Math.PI * 2, true);

    // 下面3行代码是为了修复部分手机浏览器不支持destination-out
    // 添加这3行代码会导致在滚动条距离不为0时刮奖，页面会上移
    // myCanvas.style.display = 'none';
    // myCanvas.offsetHeight;
    // myCanvas.style.display = 'inherit';

    ctx.fill();
  }
}

function randomOption() {
  var number = Math.floor(Math.random() * 10);
  var result = document.getElementById('result');
  result.innerHTML = options[number];
  getOption = true;
}




