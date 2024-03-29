
    var iconBtn = document.getElementsByClassName('f-t-icon')[0],//获取展开图标
        canvas = document.getElementById('c-canvas'),//获取canvas并生成环境
        content = document.getElementsByClassName('content')[0],//获取canvasdom节点
        canvasNode = '',//储存canvas节点
        footerEle = document.getElementsByClassName('footer')[0],//获取底部盒子
        triangle = document.getElementsByClassName('icon-top')[0],//获取展开三角
        navNode = document.getElementsByClassName('f-t-nav'),//绘制文字购物车节点
        SCAndFX = document.getElementsByClassName('sidebar'),//收藏和分享
        listBtn = document.getElementsByClassName('b-list'),//绘制文字各项功能
        fontBox = document.getElementsByClassName('f-font')[0],//获取字体盒子
        colorBox = document.getElementsByClassName('f-color')[0],//获取颜色盒子
        element = document.getElementsByClassName('alterBox')[0],//获取可拖拽的dom
        eleText = document.getElementsByClassName('a-text')[0],//拖拽dom文字
        inputNode = document.getElementsByClassName('ctx-input')[0],//获取input节点
        inputValue = document.getElementsByClassName('input-data')[0],//获取input值
        fontBoxState = true,//字体盒子状态
        colorBoxState = true,//颜色盒子状态
        footerState = true,//底部盒子状态
        colorState = true,//绘制文字或购物车颜色状态
        inputState = true,//输入框状态
        dragState = true,//拖拽框状态 
        thickState = true,//加粗状态
        ctx = canvas.getContext('2d'),
        ctxW = window.innerWidth, //获取页面宽高
        ctxH = window.innerHeight;

        canvas.width = ctxW;//设置canvas的宽高及背景色
        canvas.height = ctxH;
        canvas.style.backgroundColor='rgb(245,245,245)';
   

    //点击展开或关闭底部盒子方法
    function iconBtnMethod(){
        triangle.style.transform = footerState?'rotate(180deg)':'rotate(0deg)';

        footerEle.style.bottom = footerState?'0':'-2.5rem';//底部盒子变化
        footerEle.style.transition = '.2s';
        footerState = !footerState;
        
        inputNode.style.bottom = inputState?'4.5rem':'0.5rem';//input框变化
        inputNode.style.transition = inputState?'.2s':'0s';
        inputState = !inputState;

        // element.innerHTML = '请输入内容';//清空输入框内容
        inputValue.value = '';
        element.style.display = dragState?'block':'none';
        dragState = !dragState;

        clickParalle();//变横向

        element.style.fontWeight = 'normal';//变细
        changeWhite(2);
        thickState = true;
        // fontBox.style.display = 'none';//更改字体盒子高度
        // colorBox.style.display = 'none'//更改颜色盒子高度


    }
    //点击收缩
    iconBtn.onclick = function(){
        if(!footerState){
            iconBtnMethod();
            iconBtn.style.display = 'none';
            colorwhite(0);
        }
    }

    //绘制文字，添加购物车颜色变黑
    function colorblank(i){
        navNode[i].style.color = '#282828';
    }
    //绘制文字，添加购物车颜色变白
    function colorwhite(i){
        navNode[i].style.color = 'rgb(180,180,180)';
    }

    //绘制文字操作
    function drawText(){
        //展开收缩高度
        if(footerState){
            iconBtnMethod();
            iconBtn.style.display = 'block';
        }else{
            return;
        }
        
    }
    //字体变黑方法
    function changeBlock(i){
        listBtn[i].classList.add('checked-list');
    }
    //字体变白方法
    function changeWhite(i){
        listBtn[i].classList.remove('checked-list');
    }
    //点击字体操作方法
    function clickFont(){
        if(fontBox.style.display=='none'){
            changeBlock(4);
        }else{
            changeBlock(4);
        }
        changeWhite(3);
        fontBox.style.transition = '.2s';
        fontBox.style.height = fontBoxState?'4rem':'0rem';
        // colorBox.style.display = 'none';
        // fontBox.style.display = fontBox.style.display=='none'?'block':'none';
        fontBoxState = !fontBoxState;
    }

    //点击颜色操作方法
    function clickColor(){
        colorBoxState?changeBlock(3): changeWhite(3);
        changeWhite(4);
        colorBox.style.bottom = colorBoxState?'0':'-4.5rem';
        colorBox.style.transition = '.2s';
        // colorBox.style.height = colorBoxState?'3rem':'0rem';
        // fontBox.style.display = 'none'
        // colorBox.style.display = colorBox.style.display=='none'?'block':'none';
        colorBoxState = !colorBoxState;

    }
    //加粗操作
    function clickOverstriking(){
        thickState?changeBlock(2):changeWhite(2);
        eleText.style.fontWeight = thickState?'bold':'normal';
        // element.classList.add('text-bold');
        thickState = !thickState;
    }
    //横向操作
    function clickParalle(){
        changeBlock(0);
        changeWhite(1);
        element.classList.remove('vertical');
    }
    //竖向操作
    function clickVertical(){
        changeBlock(1);
        changeWhite(0);
        element.classList.add('vertical');
    }
    //点击绘制文字各项功能操作
    for(var i=0;i<listBtn.length;i++){
        (function(i){
            listBtn[i].onclick = function(){
                switch(i){
                    case 0:
                        clickParalle();
                        console.log('横向操作');
                        break;
                    case 1:
                        clickVertical();
                        console.log('竖向操作');
                        break;
                    case 2:
                        clickOverstriking();
                        console.log('加粗操作');
                        break;
                    case 3:
                        clickColor();
                        console.log('颜色操作');
                        break;
                    case 4:
                        clickFont();
                        console.log('字体操作');
                        break;
                }
            }
        }(i))
    }

    //点击绘制文字 添加购物车
    for(var i=0;i<navNode.length;i++){
        (function(i){
            navNode[i].onclick = function(){
                if(i==0){
                    //绘制文字操作
                    colorblank(i);//点击颜色变黑
                    drawText();//显示节点
                    console.log('绘制文字');
                }
                if(i==1){
                    //添加购物车操作
                    console.log('添加购物车');
                }
            }
        }(i))
    }

    //收藏和分享操作
    for(var i=0;i<SCAndFX.length;i++){
        (function(i){
            SCAndFX[i].onclick = function(){
                if(i==0){
                    createImg();
                    console.log('收藏操作');
                }
                if(i==1){
                    //dom生成canvas
                    html2canvas(content,{
                         onrendered: function(canvas) {
                            canvasNode = canvas;
                            console.log(canvas);
                            }
                        }
                    )
                    console.log('分享操作');
                }
            }
        }(i));
    }

    //监听input事件
    function onPropChanged(event){
        console.log(inputValue.value);
        if(inputValue.value==''){
            eleText.innerHTML = '请输入内容';
        }else{
            eleText.innerHTML = inputValue.value;
        }
        // eleText.innerHTML = inputValue.value;
    }

    //生成图片
    function createImg(){
        var base64Img = canvasNode.toDataURL('image/png');
        console.log(base64Img);
    }
    
    //绘制图片
    function drawImg() {
        ctx.clearRect(0,0,ctxW, ctxH);
        img = new Image();//生成图片
        img.setAttribute("crossOrigin",'anonymous');//需要放在图片赋值前，否则部分浏览器会报错
        img.src = 'http://img.ibaiqiu.com/pim-upload/6226219-124-1-1699-2-main.jpg';//图片地址
        //img.crossOrigin='Anonymous';
        
        var imposeH =  getComputedStyle(document.getElementsByTagName('html')[0])['font-size'];//获取底部高度
        var NumberH = Number(imposeH.split(/\s+|px/)[0]);//底部高度转数字
        img.onload = function () {//绘制图片
            ctx.drawImage(img, 0, ctxH/20, ctxW, ctxW);
        }
    }
    drawImg();

    var initScale = 1;
    
    function ease(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }
    Transform(element);
    //手势插件
    //element为需要监听手势的dom对象
    var af = new AlloyFinger(element, {
        pointStart: function () {
            //手指触摸屏幕触发
        },
        multipointStart: function () {
            //一个手指以上触摸屏幕触发
            initScale = element.scaleX;
            To.stopAll();
        },
        rotate: function (evt) {
            //evt.angle代表两个手指旋转的角度
            console.log(evt.angle);
            element.rotateZ+=evt.angle;
        },
        pinch: function (evt) {
            //evt.scale代表两个手指缩放的比例
            element.style.transform = 'scale('+evt.scale+')';
            element.scaleX = element.scaleY = initScale * evt.zoom;
        },
        multipointEnd: function () {
            //当手指离开，屏幕只剩一个手指或零个手指触发
            To.stopAll();
            if (element.scaleX < 1) {

                new To(element, "scaleX", 1, 500, ease);
                new To(element, "scaleY", 1, 500, ease);
            }
            if (element.scaleX > 2) {

                new To(element, "scaleX", 2, 500, ease);
                new To(element, "scaleY", 2, 500, ease);
            }
        },
        pressMove: function (evt) {
            //evt.deltaX和evt.deltaY代表在屏幕上移动的距离
            // var elLeft = Number(getComputedStyle(element).left.replace("px",""));//获取拖动元素left值
            // var elTop = Number(getComputedStyle(element).top.replace("px",""));//获取拖动元素top值
            // elLeft += evt.deltaX;
            // elTop += evt.deltaY;
            // element.style.left = elLeft+'px';
            // element.style.top = elTop+'px';
            element.translateX += evt.deltaX;
            element.translateY += evt.deltaY;
            evt.preventDefault();
        },
        tap: function (evt) {
            //点按触发
        },
        doubleTap: function (evt) {
            //双击屏幕触发
        },
        longTap: function (evt) {
            //长按屏幕750ms触发
        },
        swipe: function (evt) {
            //evt.direction代表滑动的方向
            console.log("swipe" + evt.direction);
        },
        singleTap: function (evt) {
            //单击
        }
    });


  //移动端适配
  (function change(){
    var oFz = document.getElementsByTagName("html")[0];
    var width = window.innerWidth;
    oFz.style.fontSize = width/10 +"px";
    window.onresize=function(){change();};
  })();
  //阻止Safari等浏览器 页面缩放
  window.onload = function() {
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });
  }