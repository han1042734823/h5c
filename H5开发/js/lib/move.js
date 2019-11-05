
///////////////////////////////////////////////////////////////////////////////////////////////////////
//构造函数
///////////////////////////////////////////////////////////////////////////////////////////////////////
var MoveObject = function(options){
    var defOptions = {
        x: 0, y: 0,
        scale: 1,
        rotate: 0,
        img: "",
        parent: "body",
        skew: {x: 0, y: 0},
        fixed: false,
    }
    this.options = $.extend(defOptions, options);                                                                   //合并参数


    

    ////////////////////////
    //常规属性
    ////////////////////////
    this.id = MoveObject.count;                                                                                     //id
    MoveObject.count ++;
    MoveObject.objArray.push(this);

    this.name = this.options.name? this.options.name: "moveObject-" + this.id;
    this.layer = this.id;

    this.fixed = this.options.fixed;

    this.el = null;                                                                                                 //我的对象(element)
    this.position = {
        x: this.options.x,
        y: this.options.y
    };
    // this.position = {
    //     x: this.options.x * this.options.scale,
    //     y: this.options.y * this.options.scale
    // };                                                                                                           //坐标位置
    this.scale = {x: this.options.scale, y: this.options.scale};                                                    //缩放比
    this.rotate = this.options.rotate;                                                                              //旋转角度
    this.skew = {
        x: this.options.skew.x, 
        y: this.options.skew.y
    };


    ////////////////////////
    //事件性属性
    ////////////////////////
    this.draging = false;
    this.dragUpdateId = null;
    this.dragHand = null;


    // var elTemplate ='<div class="js-divobject" data-id="' + this.id + '" style="left: ' + this.position.x + 'px; top: ' + this.position.y + 
    //                 'px;transform: scale(' + this.scale.x + ',' + this.scale.y + ') rotate(' + this.rotate + 'deg);">' + 
    //                     '<img src='+ this.options.img + ' alt="" style="width: auto, height: auto">' +
    //                 '</div>';
    var elTemplate ='<div class="js-divobject" data-id="' + this.id + '" name="' + this.name + '">' + 
                        /*'<img src='+ this.options.img + ' alt="" style="width: auto, height: auto" crossOrigin="Anonymous">' +*/
                        '<img src='+ this.options.img + ' alt="" style="width: auto, height: auto">' +
                        '<div class="bg-border" style="display: none;"><div class="icon-rotate"></div></div>' +
                    '</div>';

    this.el = $(elTemplate).appendTo(this.options.parent);
    MoveObject.matrixTool( this.el,
        this.position, this.scale, this.rotate, this.skew);


    MoveObject.setInitSize(this);




    var moClass= this;
    var hammertime = new Hammer($(this.el)[0]);

    this.hammer = {
        object: hammertime,
        revisePosition: {x: 0, y: 0},
        reviseAngle: 0,
        reviseScale: 0,
    }

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });
    hammertime.on('tap panstart pan panend rotatestart rotate pinchstart pinch', function(ev) {
        // console.log(ev);
        // console.log(ev.deltaX);
        if(MoveObject.activeObject){
            $(MoveObject.activeObject.el).css("border", "0px");
            $(MoveObject.activeObject.el).find(".bg-border").hide();
            // $(MoveObject.activeObject).find(".bg-border").css("background-color", "transparent");
        }
        $(moClass.el).css("border", MoveObject.ACTIVE_STYLE);
        $(moClass.el).find(".bg-border").show();
        // $(this).find(".bg-border").css("background-color", MoveObject.ACTIVE_STYLE);
        MoveObject.activeObject = moClass;

        if(ev.type == "panstart" || ev.type == "tap"){
            if(moClass.fixed) return;
            // if(e.touches.length > 1) return;
            moClass.draging = true;
            // moClass.dragHand = e;
            
            $("#btn-createimg").fadeOut();
            $("#setting-object").show();
            infoToRangeValue(moClass);


            // var touch = e.originalEvent.targetTouches[0];
            // MoveObject.DragLastPos = bfn.getMousePosition(touch, "client");
            MoveObject.DragLastPos = ev.center;
            MoveObject.DragStartPos = moClass.position;
            MoveObject.DragCorrect = {x:0, y:0}

        }else if(ev.type == "pan"){
            if(!moClass.draging) return;

            // var touch = e.originalEvent.targetTouches[0];
            // var movePos = bfn.getMousePosition(touch, "client");
            var movePos = ev.center;
            // moClass.position = {
            //     x: parseFloat(movePos.x) - parseFloat(MoveObject.DragLastPos.x) - parseFloat(MoveObject.DragCorrect.x) + parseFloat(moClass.position.x),
            //     y: parseFloat(movePos.y) - parseFloat(MoveObject.DragLastPos.y) - parseFloat(MoveObject.DragCorrect.y) + parseFloat(moClass.position.y),
            // }
            moClass.position = {
                x: parseFloat(MoveObject.DragStartPos.x) + ev.deltaX,
                y: parseFloat(MoveObject.DragStartPos.y) + ev.deltaY,
            }
            MoveObject.DragLastPos = movePos;
            // console.log(moClass.position)
            moClass.updateMatrix();

        }else if(ev.type=="panend"){
            moClass.draging = false;
            MoveObject.DragLastPos = MoveObject.DragCorrect = {x: 0, y: 0};
        }

        // if(!moClass.draging) return;

        if(ev.type == "rotatestart" || ev.type == "rotate"){
            if(ev.type == 'rotatestart') {
                moClass.hammer.reviseAngle = ev.rotation - moClass.rotate;
            }
            moClass.rotateMe(ev.rotation - moClass.hammer.reviseAngle);
        }

        // if(!moClass.draging) return;
        if(ev.type == "pinchstart" || ev.type == "pinch"){
            if(ev.type == 'pinchstart') {
                moClass.hammer.reviseScale = ev.scale - moClass.scale.x;
            }
            var locScale = ev.scale - moClass.hammer.reviseScale;
    
            if(locScale > 1.25) locScale = 1.25;
            if(locScale < 0.25) locScale = 0.25;
            moClass.scaleMe(locScale, locScale);
            // moClass.scaleMe(ev.scale);
        }
    });
    // hammertime.on("rotatestart rotate", function(ev){
    //     if(!moClass.draging) return;
    //     if(ev.type == 'rotatestart') {
    //         moClass.hammer.reviseAngle = ev.rotation - moClass.rotate;
    //     }
    //     moClass.rotateMe(ev.rotation - moClass.hammer.reviseAngle);
    // })
    // hammertime.on("pinchstart pinch", function(ev){
    //     if(!moClass.draging) return;
    //     if(ev.type == 'pinchstart') {
    //         moClass.hammer.reviseScale = ev.scale - moClass.scale.x;
    //     }
    //     var locScale = ev.scale - moClass.hammer.reviseScale;

    //     if(locScale > 1.25) locScale = 1.25;
    //     if(locScale < 0.1) locScale = 0.1;
    //     moClass.scaleMe(locScale, locScale);
    //     // moClass.scaleMe(ev.scale);
    // })


    //拖拽事件
    // $(this.el).on("touchstart", function (e){
    //     if(moClass.fixed) return;
    //     if(e.touches.length > 1) return;
    //     moClass.draging = true;
    //     // moClass.dragHand = e;
        
    //     if(MoveObject.activeObject){
    //         $(MoveObject.activeObject.el).css("border", "0px");
    //         // $(MoveObject.activeObject).find(".bg-border").css("background-color", "transparent");
    //     }
    //     $(moClass.el).css("border", MoveObject.ACTIVE_STYLE);
    //     // $(this).find(".bg-border").css("background-color", MoveObject.ACTIVE_STYLE);
    //     MoveObject.activeObject = moClass;
    //     $("#btn-createimg").fadeOut();
    //     $("#setting-object").show();
    //     infoToRangeValue(moClass);


    //     var touch = e.originalEvent.targetTouches[0];
    //     MoveObject.DragLastPos = bfn.getMousePosition(touch, "client");
    //     MoveObject.DragCorrect = {x:0, y:0}
    //     // {
    //     //     x: MoveObject.DragLastPos.x - moClass.position.x,
    //     //     y: MoveObject.DragLastPos.y - moClass.position.y,
    //     // }
    //     // DragUpdata();
    //     return false;
    // });


    // $(this.el).on("touchmove", function(e){
    //     if(!moClass.draging) return;

    //     var touch = e.originalEvent.targetTouches[0];
    //     var movePos = bfn.getMousePosition(touch, "client");
    //     moClass.position = {
    //         x: parseFloat(movePos.x) - parseFloat(MoveObject.DragLastPos.x) - parseFloat(MoveObject.DragCorrect.x) + parseFloat(moClass.position.x),
    //         y: parseFloat(movePos.y) - parseFloat(MoveObject.DragLastPos.y) - parseFloat(MoveObject.DragCorrect.y) + parseFloat(moClass.position.y),
    //     }
    //     MoveObject.DragLastPos = movePos;
    //     // console.log(moClass.position)
    //     moClass.updateMatrix();
    //     //  MoveObject.DragLastPos
    // })

    // $(this.el).on("touchend", function (e) {
    //     moClass.draging = false;
    //     MoveObject.DragLastPos = MoveObject.DragCorrect = {x: 0, y: 0};
    // });
}



///////////////////////////////////////////////////////////////////////////////////////////////////////
//主动方法
///////////////////////////////////////////////////////////////////////////////////////////////////////
var ktArrayInfo = [{//用于存放卡通人物组
        key: 0,
        name: "仨闺女",
        imgs: [
            {file: "01.png", x: 142.22097778320312, y: 44.4439697265625, r:0, s: 0.6},
            {file: "02.png", x: 0, y: 0, r:0, s: 0.6},
            {file: "03.png", x: -125.77699279785156, y: -36.33201599121094, r:0, s: 0.6}
        ],
    },{
        key: 1,
        name: "彩虹鸡",
        imgs: [
            {file: "10.png", x: 253.66598510742188, y: -221.4440155029297, r: 0, s: 0.6}, 
            {file: "04.png", x: 67.55499267578125, y: -68.11100769042969, r: 0, s: 0.6}, 
            {file: "07.png", x: -69.33499145507812, y: -106.66596984863281, r: 0, s: 0.6}, 
            {file: "06.png", x: -169.33399200439453, y: 98.99996948242188, r: -35.2, s: 0.6}, 
            {file: "05.png", x: -10.6669921875, y: 138.88900756835938, r: 0, s: 0.6}, 
            {file: "08.png", x: 181.333984375, y: 74.88900756835938, r: 8.5, s: 0.79}, 
            {file: "09.png", x: -104.88803100585938, y: 250.33291625976562, r: 0, s: 0.6}, 
        ],
    },{
        key: 2,
        name: "一窝鸡",
        imgs: [
            {file: "15.png", x: 0, y: 0, r: 0, s: 0.89}, 
            {file: "12.png", x: -188.4440155029297, y: 216.88998413085938, r: -17, s: 0.34}, 
            {file: "13.png", x: 71.1109619140625, y: 188.4440460205078, r: 18.2, s: 0.39}, 
            {file: "11.png", x: -55.665985107421875, y: 193.7779541015625, r: 0, s: 0.37}, 
            {file: "14.png", x: 212.44403076171875, y: 202.66806030273438, r: 0, s: 0.41}, 
        ],
    },{
        key: 3,
        name: "变形金刚",
        imgs: [
            {file: "21.png", x: -80, y: -112, r: 0, s: 0.6},
            {file: "18.png", x: 174.44500732421875, y: -91.22200012207031, r: 0, s: 0.6}, 
            {file: "16.png", x: -40.11201477050781, y: 88.8900146484375, r: 0, s: 0.6}, 
            {file: "17.png", x: 151.11105346679688, y: 155.55795288085938, r: 0, s: 0.6}, 
            {file: "19.png", x: 29.444000244140625, y: 304.22198486328125, r: 0, s: 0.6}, 
            {file: "20.png", x: -178.4440155029297, y: 221.11099243164062, r: 0, s: 0.51}, 
        ],
    },{
        key: 4,
        name: "5只猪",
        imgs: [
            {file: "26.png", x: -108.44401550292969, y: -8.88800048828125, r: 0, s: 0.6}, 
            {file: "25.png", x: 124.22198486328125, y: 0.3330078125, r: 0, s: 0.6}, 
            {file: "24.png", x: -209.7779998779297, y: 270.2219696044922, r: 0, s: 0.6}, 
            {file: "23.png", x: 184.887939453125, y: 286.2220458984375, r: 0, s: 0.6}, 
            {file: "22.png", x: 10.555999755859375, y: 283.8879699707031, r: 0, s: 0.6}, 
        ],
    },{
        key: 5,
        name: "男女",
        imgs: [
            {file: "28.png", x: 276.4449768066406, y: 248.88900756835938, r: 0, s: 0.6}, 
            {file: "27.png", x: 96.00001525878906, y: 248.88897705078125, r: 0, s: 0.6},
        ],
    },{
        key: 6,
        name: "小那吒",
        imgs: [
            {file: "29.png", x: 5.3330078125, y: 190.22201538085938, r: 0, s: 0.86},
        ],
    },{
        key: 7,
        name: "一堆熊",
        imgs: [
            {file: "35.png", x: -126.22200775146484, y: -94.22198486328125, r: 0, s: 0.41}, 
            {file: "34.png", x: 140.44500732421875, y: -103.11100006103516, r: 0, s: 0.54}, 
            {file: "30.png", x: 0, y: 0, r: 0, s: 0.6}, 
            {file: "33.png", x: -138.66700744628906, y: 108.44400024414062, r: 0, s: 0.6}, 
            {file: "32.png", x: 179.11099243164062, y: 104.88800048828125, r: 0, s: 0.6}, 
            {file: "31.png", x: -8.8900146484375, y: 183.11203002929688, r: 0, s: 0.49}, 
        ],
    },{
        key: 8,
        name: "隔壁老王",
        imgs: [
            {file: "36.png", x: -147.55599975585938, y: 104.44400024414062, r: 0, s: 0.6},
            {file: "39.png", x: 163.55596923828125, y: 135.11099243164062, r: 0, s: 0.6},
        ],
    },{
        key: 9,
        name: "熊猫和鼹鼠",
        imgs: [ 
            {file: "42.png", x: -108.89000701904297, y: -91.66598510742188, r: 0, s: 0.6},
            {file: "41.png", x: 176.2240219116211, y: 248.33291625976562, r: 0, s: 0.49},
        ],
    },{
        key: 10,
        name: "一窝猪",
        imgs: [
            {file: "43.png", x: -172.44398498535156, y: 267.9989929199219, r: 0, s: 0.48}, 
            {file: "46.png", x: 174.22097778320312, y: 270.2230529785156, r: 0, s: 0.48}, 
            {file: "45.png", x: 49.77801513671875, y: 325.3329772949219, r: 0, s: 0.42}, 
            {file: "44.png", x: -53.44401550292969, y: 339.5560302734375, r: 0, s: 0.42}, 
        ],
    },{
        key: 11,
        name: "一只猴子俩小孩",
        imgs: [
            {file: "40.png", x: 103.8900146484375, y: 27.88897705078125, r: 0, s: 0.9},
            {file: "37.png", x: -174.00103759765625, y: 102.55499267578125, r: 0, s: 0.6}, 
            {file: "38.png", x: -30.222007751464844, y: 233.7779541015625, r: 0, s: 0.6}, 
        ],
    },
];

$(function(){
    // mObject = new MoveObject({
    //     // x: "100",
    //     // y: "100",
    //     x: 200,
    //     y: 100,
    //     scale: 1,
    //     rotate: 30,
    //     img:"img/testimg.gif",
    //     parent: "#object-div",
    // });
    
    $("#object-div").mousedown(function(){
        if(MoveObject.activeObject){
            $(MoveObject.activeObject.el).css("border", "0px");
            $(MoveObject.activeObject.el).find(".bg-border").hide();
            // $(MoveObject.activeObject).find(".bg-border").css("background-color", "transparent");
        }
        MoveObject.activeObject = null;
        $("#setting-object").fadeOut();
        $("#btn-createimg").fadeIn();
    })

    $("#scaleRange").bind('input porpertychange',function(){
        if(MoveObject.activeObject){
            MoveObject.activeObject.scaleMe($(this).val()/100);
        }
        // mObject.scaleMe($(this).val()/10);
    })
    $("#rotateRange").bind('input porpertychange',function(){
        if(MoveObject.activeObject){
            MoveObject.activeObject.rotateMe($(this).val()/10);
        }
        // mObject.rotateMe($(this).val()/10);
    })

    //上移图层
    $("#btn-layerup-object").click(function(){
        if(!MoveObject.activeObject) return;
        if($(MoveObject.activeObject.el).next()){
            $(MoveObject.activeObject.el).next().after($(MoveObject.activeObject.el));
        }
    })
    //下移图层
    $("#btn-layerdown-object").click(function(){
        if(!MoveObject.activeObject) return;
        if($(MoveObject.activeObject.el).prev()){
            $(MoveObject.activeObject.el).after($(MoveObject.activeObject.el).prev());
        }
    })
    //移除选中挂件
    $("#btn-remove-object").click(function(){
        if(!MoveObject.activeObject){
            return;
        }
        console.log("ready to del")
        MoveObject.objArray.removeByObject(MoveObject.activeObject);
        $(MoveObject.activeObject.el).remove();
        MoveObject.activeObject = null;
        $("#setting-object").fadeOut();
        $("#btn-createimg").fadeIn();
    })
    //取消选中
    $("#btn-unselect-object").click(function(){
        if(MoveObject.activeObject){
            $(MoveObject.activeObject.el).css("border", "0px");
            $(MoveObject.activeObject.el).find(".bg-border").hide();
        }
        MoveObject.activeObject = null;
        $("#setting-object").fadeOut();
        $("#btn-createimg").fadeIn();
    })


    //渲染完成图
    $("#btn-createimg").click(function(){
        $(".page-inputtext").fadeIn();
    })
    $("#btn-createimg2").click(function(){
        if($("#object-div .js-divobject").length <= 0){
            // alert("请任意选择一款腕表进行试戴");

            $("#text-ui-tips").text("请任意选择一款腕表进行试戴");
            $(".mask-tip").fadeIn();
            return;
        }
        $(".mask-creating").fadeIn();
        // var str = $("#input-flagtext").val();
        // if(!str || str.length < 1){
        //     alert("请输入你的新年Flag哦");
        //     return;
        // }

        // $("#text-object").text(str);
        // $(".page-inputtext").fadeOut();
        // $(".page-mask").fadeIn();
        // $("html, body").css("position", "relative");
        $(".div-moveobject").hide();
        if(MoveObject.activeObject){
            $(MoveObject.activeObject.el).css("border", "0px");
            $(MoveObject.activeObject.el).find(".bg-border").hide();
        }
        MoveObject.activeObject = null;

        var borderStyle = $("#object-div").css("border");
        $("#object-div").css("border", "0px");
        $("#object-div .bg-border").hide();

        html2canvas(document.getElementById("object-div"),{scale:2}).then(function(canvas) {
            var ctx = canvas.getContext("2d");
            var url = canvas.toDataURL("image/png", 0.1);
            var img = document.getElementById("img-endshow");
            var imgGhost = document.getElementById("img-ghost");
            
            img.onload = function(){//试戴合成图
                var canvas = document.getElementById("canvas-end");
                var ctx = canvas.getContext("2d");
                var locImg = new Image();

                locImg.onload = function(){
                    var cropSize = {
                        width: 436,
                        height: 637
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);//清屏

                    // ctx.drawImage(img, 100, 193, 440, 440/cropSize.width*cropSize.height);//绘制试戴合成图
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);//绘制上层图
                    // ctx.drawImage(img, 35, 135, 572, 572/cropSize.width*cropSize.height);//绘制试戴合成图
                    ctx.drawImage(img, 74, 214, 495, 495/cropSize.width*cropSize.height);//绘制试戴合成图
                    var endUrl = canvas.toDataURL("image/png", 0.1);

                    imgGhost.onload = function(){//最终事件
                        $(".mask-endimg").show();
                        $("#object-div").css("border", borderStyle);
                        $(".mask-creating").fadeOut();
                    }
                    imgGhost.src = endUrl;
                }
                locImg.src = "img/img-end.jpg";



                
                // $(".page-mask").fadeOut();
                // $("html, body").css("position", "fixed");

                // $(".page-object").hide();
            }
            img.src = url;
        }).catch(function(){
            alert("图片生成失败，请重试")
            $(".div-moveobject").fadeIn();
            // $(".page-mask").fadeOut();
            // $("html, body").css("position", "fixed");
        });
    })

    //点击添加具体挂件
    $(".el-item").click(function(){
        var domSrc = $(this).attr("data-src");
        var imgSrc = domSrc? domSrc: $(this).find("img").attr("src");

        var domPos = {
            x: $(this).attr("data-x"),
            y: $(this).attr("data-y"),
            rotate: $(this).attr("data-rotate"),
        }
        var myPos = {
            x: domPos.x? domPos.x: 0,
            y: domPos.y? domPos.y: 0
        }

        var eScale = 0.6;//用来缩小其他元素的参数 日历除外
        var domName = $(this).attr("data-name");

        $(MoveObject.objArray).each(function(i, el){
            el.el.remove();
            MoveObject.objArray.removeByObject(el);
        })

        mObject = new MoveObject({
            x: domPos.x,
            y: domPos.y,
            scale: eScale,
            rotate: domPos.rotate? domPos.rotate: 0,
            img: imgSrc,
            parent: "#object-div",
            name: domName,
            fixed: $(this).attr("data-fixed"),
        });

        return;

        if(domName == "rl"){//日历操作
            $(MoveObject.objArray).each(function(i, el){
                if(el.name == "rl"){
                    el.el.remove();
                    MoveObject.objArray.removeByObject(el);
                }
            })
            eScale = 1;
        }else if(domName == "kt"){//卡通人物操作
            var domIndex = $(this).attr("data-index");
            var IMG_PATH = "img/el-katong/";
            var infos = ktArrayInfo[domIndex].imgs;

            $(MoveObject.objArray).each(function(i, el){
                if(el.name == "kt"){
                    el.el.remove();
                    MoveObject.objArray.removeByObject(el);
                }
            })

            $(infos).each(function(i, e){
                mObject = new MoveObject({
                    x: e.x,
                    y: e.y,
                    scale: e.s,
                    rotate: e.r,
                    img: IMG_PATH + e.file,
                    parent: "#object-div",
                    name: domName,
                    fixed: false,
                });
            })

            return;
        }

        mObject = new MoveObject({
            x: domPos.x,
            y: domPos.y,
            scale: eScale,
            rotate: 0,
            img: imgSrc,
            parent: "#object-div",
            name: domName,
            fixed: $(this).attr("data-fixed"),
        });
    })
    //切换挂件组
    $(".tab-list .tab-btn").click(function(){
        var tabName = $(this).attr("data-tab");
        $(".el-line").hide();
        document.getElementById('el-list').scrollLeft=200
        $(".el-line[data-name=" + tabName + "]").show();
    })
})

var infoToRangeValue = function(mObject){
    $("#scaleRange").val(mObject.scale.x * 100);
    $("#rotateRange").val(mObject.rotate * 10);
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
//静态属性
///////////////////////////////////////////////////////////////////////////////////////////////////////
MoveObject.ACTIVE_STYLE = "2px solid #8f7853";
// MoveObject.ACTIVE_STYLE = "#00F";
MoveObject.DragLastPos = {x: 0, y: 0}//拖拽时上次的位置
MoveObject.DragCorrect = {x: 0, y: 0};//拖拽补正
MoveObject.DragStartPos = {x: 0, y: 0}//拖拽的起始点

MoveObject.count = 0;//数量总计
MoveObject.objArray = new Array();//对象队列
MoveObject.activeObject = null;//当前活动（选中）的对象



///////////////////////////////////////////////////////////////////////////////////////////////////////
//静态方法
///////////////////////////////////////////////////////////////////////////////////////////////////////
//依照图片的尺寸重设div层尺寸 并使图片为100%自适应
MoveObject.setInitSize = function(mObj){
    var imgEl = $(mObj.el).find('img');
    if(imgEl[0].complete){
        $(mObj.el).width($(imgEl).width());
        $(mObj.el).height($(imgEl).height());
        $(mObj.el).css("background-image", "url(" + imgEl[0].src.replace("file:///", "") + ")");
        $(imgEl).css({
            width: "100%",
            height: "100%"
        })
        $(imgEl).remove();
        console.log("remove img")
    }else{
        imgEl.onload = function(){
            $(mObj.el).width($(imgEl).width());
            $(mObj.el).height($(imgEl).height());
            $(mObj.el).css("background-image", "url(" + imgEl[0].src.replace("file:///", "") + ")");
            $(imgEl).css({
                width: "100%",
                height: "100%"
            })
            $(imgEl).remove();
            console.log("remove img")
        }
    }
    
}

//矩阵工具
MoveObject.matrixTool = function(element, pos, scale, deg, skew){
    var a,b,c,d,e,f = 0;
    var rad = MoveObject.angleToRadian(deg);

    if(skew){
        skew = {
            x: MoveObject.angleToRadian(skew.x),
            y: MoveObject.angleToRadian(skew.y),
        }
    }else{
        skew = {x: 0, y: 0};
    }

    // console.log("[MatrixTool Position]");
    // console.log(pos);
    // console.log("[MatrixTool Scale]");
    // console.log(scale);
    // console.log("[MatrixTool Rotate]");
    // console.log(deg);
    // console.log("[MatrixTool Skew]");
    // console.log(skew);

    var sin0 = Math.sin(rad);
    var fSin0 = -sin0;
    var cos0 = Math.cos(rad);
    var tanX = Math.tan(skew.x);
    var tanY = Math.tan(skew.y);
    
    a = scale.x * (cos0 + fSin0 * tanY);
    b = scale.x * (sin0 + cos0 * tanX);
    c = scale.y * (fSin0 + cos0 * tanY);
    d = scale.y * (cos0 + sin0 * tanX);
    e = pos.x;
    f = pos.y;

    var matrixStr = a + "," +
                    b + "," +
                    c + "," +
                    d + "," +
                    e + "," +
                    f;

    $(element).css("transform", "matrix(" + matrixStr + ")")
}

//角度转弧度
MoveObject.angleToRadian = function(angle){
    return angle * Math.PI/180;
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
//公开方法
///////////////////////////////////////////////////////////////////////////////////////////////////////
MoveObject.prototype.getId = function(){
    return this.id;
}

MoveObject.prototype.updateMatrix = function(){
    MoveObject.matrixTool( this.el,
        this.position, this.scale, this.rotate, this.skew);
}
MoveObject.prototype.scaleMe = function(x, y){
    var locPos = {
        x: this.position.x / this.scale.x,
        y: this.position.y / this.scale.y,
    }
    x = x>2? 2: x;
    y = y>2? 2: y;
    this.scale = {
        x: x,
        y: y? y: x,
    }

    $(this.el).css({
        "transform": "scale("+ this.scale.x +"," + this.scale.y + ") rotate(" + this.rotate + ");"
    })
    
    this.updateMatrix();
}
MoveObject.prototype.moveMe = function(x, y){
    this.position = {
        x: x,
        y: y
    }
    this.updateMatrix();
}
MoveObject.prototype.rotateMe = function(deg){
    this.rotate = deg;
    this.updateMatrix();
}
MoveObject.prototype.skewMe = function(x, y){
    this.skew = {
        x: x,
        y: y? y: x
    }

    this.updateMatrix();
}
// moveObject.prototype

