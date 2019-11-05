
    var iconBtn = document.getElementsByClassName('f-t-icon')[0],//获取展开图标
        canvas = document.getElementById('c-canvas'),//获取canvas并生成环境
        content = document.getElementsByClassName('content')[0],//获取canvasdom节点
        canvasNode = '',//储存canvas节点
        footerEle = document.getElementsByClassName('footer')[0],//获取底部盒子
        triangle = document.getElementsByClassName('icon-top')[0],//获取展开三角
        navNode = document.getElementsByClassName('f-t-nav'),//绘制文字购物车节点
        SCAndFX = document.getElementsByClassName('sidebar'),//收藏和分享
        listBtn = document.getElementsByClassName('b-list'),//绘制文字各项功能
        fontBox = document.getElementsByClassName('f-font')[0],//获取字体按钮盒子
        colorBox = document.getElementsByClassName('f-color')[0],//获取颜色按钮盒子
        element = document.getElementsByClassName('alterBox')[0],//获取可拖拽的dom
        eleText = document.getElementsByClassName('a-text')[0],//拖拽dom文字
        inputNode = document.getElementsByClassName('ctx-input')[0],//获取input节点
        inputValue = document.getElementsByClassName('input-data')[0],//获取input值
        fItem = document.getElementsByClassName('f-item')[0],//获取字体列表节点
        fOff = document.getElementsByClassName('f-pul'),//获取字体确定或离开节点
        cItem = document.getElementsByClassName('c-item')[0],//获取颜色列表节点
        cOff = document.getElementsByClassName('c-pul'),//获取颜色确定或离开节点
        createImgNode = document.getElementsByClassName('create-img')[0],//获取生成按钮节点
        closeEle = document.getElementsByClassName('a-close'),//获取拖拽元素关闭及缩放按钮
        closeImg = document.getElementsByClassName('img-close')[0],//获取关闭生成的图片
        showImgBox = document.getElementsByClassName('show-img')[0],//显示图片
        cList = document.getElementsByClassName('c-list'),//获取颜色列表
        cListDiv = document.getElementsByClassName('c-list-b'),
        colorIndex,//暂存上一个颜色
        fList = document.getElementsByClassName('f-list'),//获取字体列表
        folorIndex,//暂存上一个字体
        imgSite = 'http://img.ibaiqiu.com/pim-upload/6226219-124-1-1699-2-main.jpg',//开始要绘制的图片地址
        base64Img = '',
        fontList = [
            {font:'微软雅黑'},
            {font:'宋体'}
        ]
        colorList = [
            {color:'#000000'},
            {color:'#FFFF00'},
            {color:'#CCFF00'},
            {color:'#99FF00'},
            {color:'#FFCC00'},
            {color:'#CCCC00'},
            {color:'#FF9900'},
            {color:'#FF66FF'},
            {color:'#FF0000'},
            {color:'#9900FF'},
            {color:'#3333FF'},
            {color:'#FF6600'}
        ],//颜色列表
        fontBoxState = true,//字体盒子状态
        colorBoxState = true,//颜色盒子状态
        footerState = true,//底部盒子状态
        colorState = true,//绘制文字或购物车颜色状态
        inputState = true,//输入框状态
        dragState = true,//拖拽框状态 
        thickState = true,//加粗状态
        ctx = canvas.getContext('2d'),
        ctxW = window.innerWidth, //获取页面宽高
        ctxH = '548';
        container.style.height = window.innerHeight+'px';//设置最大盒子高度
        canvas.width = ctxW;//设置canvas的宽高及背景色
        canvas.height = ctxH;
        canvas.style.backgroundColor='rgb(245,245,245)';
   

    //点击展开或关闭底部盒子方法
    function iconBtnMethod(){
        triangle.style.transform = footerState?'rotate(180deg)':'rotate(0deg)';

        footerEle.style.bottom = footerState?'0':'-2.5rem';//底部盒子变化
        footerEle.style.transition = '.2s';
        footerState = !footerState;

        // inputNode.style.bottom = '0.5rem';
        // inputNode.style.transition = '0s';

        // element.innerHTML = '请输入内容';//清空输入框内容
        // inputValue.value = '';
        // element.style.display = 'block';
        // element.style.display = dragState?'block':'none';
        // dragState = !dragState;

        // clickParalle();//变横向

        // thickState = false;
        // clickOverstriking();//加粗

    }
    //遍历颜色
    function getColorList(){
        cItem.style.width = (colorList.length+1)*1.5+'rem';
        for(var i=0;i<colorList.length;i++){
            var li=document.createElement("li");  //创建元素节点
            var bAttr=document.createAttribute("class"); //创建属性节点
            bAttr.value='c-list';
            li.style.backgroundColor=colorList[i].color;
            li.setAttributeNode(bAttr);
            cItem.appendChild(li);

            var div=document.createElement("div");  //创建元素节点
            var cAttr=document.createAttribute("class"); //创建属性节点
            cAttr.value='c-list-b';
            div.setAttributeNode(cAttr);
            li.appendChild(div);
            
        }
    }
    getColorList();//遍历颜色
    //点击颜色操作
    function clickColorList(){
        
        for(var i=0;i<cList.length;i++){
            (function(i){
                cList[i].onclick = function(){
                    if(colorIndex||colorIndex==0){
                        cList[colorIndex].style.backgroundColor = colorList[colorIndex].color;//上一个去掉样式
                        cList[colorIndex].style.borderColor='';
                        cList[colorIndex].style.borderStyle='';
                        cListDiv[colorIndex].style.backgroundColor = '';
                    }
                    colorIndex = i;
                    cList[i].style.backgroundColor = '';//更换颜色的样式
                    cList[i].style.borderColor=colorList[i].color;
                    cList[i].style.borderStyle='solid';
                    cListDiv[i].style.backgroundColor = colorList[i].color;

                    eleText.style.color = colorList[i].color;
                }
            }(i));
        }
        
    }


    //遍历字体
    function getFontList(){
        fItem.style.width = (fontList.length+1)*2.5+'rem';
        for(var i=0;i<fontList.length;i++){
            var li=document.createElement("li");  //创建元素节点
            var bAttr=document.createAttribute("class"); //创建属性节点
            bAttr.value='f-list';
            li.style.fontWeight=fontList[i].font;
            var fontText = document.createTextNode(fontList[i].font);
            li.setAttributeNode(bAttr);
            li.appendChild(fontText);
            fItem.appendChild(li);
        }
    }
    getFontList();//遍历字体
    //点击字体操作
    function clickFontList(){
        
        for(var i=0;i<fList.length;i++){
            (function(i){
                fList[i].onclick = function(){
                    if(folorIndex||folorIndex==0){
                        fList[folorIndex].style.borderColor = '#fff';
                    }
                    folorIndex = i;
                    fList[i].style.borderColor = '#000';
                    eleText.style.fontFamily = fontList[i].font;
                    console.log(fontList[i].font);
                }
            }(i));
        }
        
    }


    //点击离开
    function clickLeave(){
        // var saveColor = 'rgb(0,0,0)';//存上一个颜色
        fOff[0].onclick = function(){
            clickFont();
        }
        cOff[0].onclick = function(){
            // saveColor = eleText.style.color;
            clickColor();
        }
        // cOff[0].onclick = function(){
        //     eleText.style.color = saveColor;
        //     console.log(eleText.style.color);
        //     clickColor();
        // }
        // fOff[0].onclick = function(){
        //     clickFont();
        // }
    }
    clickLeave();//点击离开

    //点击关闭拖拽元素
    function clickCloseEle(){
        closeEle[0].onclick = function(){
            footerState = false;
            iconBtnMethod();
            iconBtn.style.display = 'none';
            element.style.display = 'none';
            colorwhite(0);
        }
    }
    clickCloseEle();

    //生成图片
    function createBaseImg(){
        element.style.borderColor = 'rgba(245, 118, 118,0)';
        closeEle[0].style.display='none';
        closeEle[1].style.display='none';
        //dom生成canvas
        html2canvas(content,{
            onrendered: function(canvas) {
               canvasNode = canvas;
               console.log(canvas);
               }
           }
        );
        setTimeout(createImg,100);
    }
    //点击生成图片
    createImgNode.onclick = function(){
        createBaseImg();
    }

    //点击文字焦点获取到input
    eleText.onclick = function(){
        if(inputState){
            inputNode.style.bottom = '4.5rem';
            inputNode.style.transition = '.2s';
            footerState = true;
            iconBtn.style.display = 'block';
            navNode[0].style.color = '#282828';
            iconBtnMethod();
            
        }
        // inputNode.style.bottom = inputState?'4.5rem':'0.5rem';//input框变化
        // inputNode.style.transition = inputState?'.2s':'0s';
        inputValue.focus();

    }
    //ipnut失去焦点
    inputValue.onblur = function(){
        inputNode.style.bottom = '0.5rem';
        inputNode.style.transition = '0s';
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
        fontBoxState?changeBlock(4): changeWhite(4);
        changeWhite(3);
        fontBox.style.transition = '.2s';
        fontBox.style.bottom = fontBoxState?'0':'-4.5rem';
        // colorBox.style.display = 'none';
        // fontBox.style.display = fontBox.style.display=='none'?'block':'none';
        fontBoxState = !fontBoxState;

        clickFontList();//点击字体
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

        clickColorList();//点击颜色
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
                    element.style.display = 'block';
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
                    
                    console.log('收藏操作');
                }
                if(i==1){
                    
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
        base64Img = canvasNode.toDataURL('image/png');
        console.log(base64Img);
        document.getElementsByClassName('s-img')[0].src = base64Img;
        element.style.borderColor = 'rgba(245, 118, 118,1)';
        closeEle[0].style.display='block';
        closeEle[1].style.display='block';
        showImgBox.style.display = 'block';
        
    }
    //关闭生成的图片
    closeImg.onclick = function(){
        showImgBox.style.display = 'none';
    }

    //绘制图片
    function drawImg() {
        ctx.clearRect(0,0,ctxW, ctxH);
        img = new Image();//生成图片
        img.setAttribute("crossOrigin",'anonymous');//需要放在图片赋值前，否则部分浏览器会报错
        img.src = imgSite;//图片地址
        //img.crossOrigin='Anonymous';
        
        var imposeH =  getComputedStyle(document.getElementsByTagName('html')[0])['font-size'];//获取底部高度
        var NumberH = Number(imposeH.split(/\s+|px/)[0]);//底部高度转数字
        img.onload = function () {//绘制图片
            ctx.drawImage(img, 0, ctxH/20, ctxW, ctxW);
        }
    }
    drawImg();

    var initScale = 1;
    var maxWidth = window.innerWidth;
    var maxHeight = 11.7*window.innerWidth/10;
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
            // initScale = element.scaleX;
            // To.stopAll();
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
            console.log(evt.scale,evt.zoom);
        },
        multipointEnd: function () {
            //当手指离开，屏幕只剩一个手指或零个手指触发
            // To.stopAll();
            // if (element.scaleX < 1) {

            //     new To(element, "scaleX", 1, 500, ease);
            //     new To(element, "scaleY", 1, 500, ease);
            // }
            // if (element.scaleX > 2) {

            //     new To(element, "scaleX", 2, 500, ease);
            //     new To(element, "scaleY", 2, 500, ease);
            // }
        },
        pressMove: function (evt) {
            //evt.deltaX和evt.deltaY代表在屏幕上移动的距离
            // var elLeft = Number(getComputedStyle(element).left.replace("px",""));//获取拖动元素left值
            // var elTop = Number(getComputedStyle(element).top.replace("px",""));//获取拖动元素top值
            // elLeft += evt.deltaX;
            // elTop += evt.deltaY;
            // element.style.left = elLeft+'px';
            // element.style.top = elTop+'px';
            // if(element.offsetLeft){

            // }
            element.translateX += evt.deltaX;
            element.translateY += evt.deltaY;
            //限制移动位置
            element.translateX = element.translateX>=maxWidth-element.offsetWidth/5*4?maxWidth-element.offsetWidth/5*4:element.translateX;
            element.translateX = element.translateX<=0-element.offsetWidth/5*4?0-element.offsetWidth/5*4:element.translateX;
            element.translateY = element.translateY>=maxHeight-element.offsetHeight/5*4?maxHeight-element.offsetHeight/5*4:element.translateY;
            element.translateY = element.translateY<=0-element.offsetHeight/5*4?0-element.offsetHeight/5*4:element.translateY;
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
            console.log(evt);
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