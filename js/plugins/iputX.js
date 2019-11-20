TouchInput._onTouchStart = function(event) {
	//循环 在 事件改变触摸组
    for (var i = 0; i < event.changedTouches.length; i++) {
	    //触摸 =  事件改变触摸组[i]
        var touch = event.changedTouches[i];
        //画布x
        var x = Graphics.pageToCanvasX(touch.pageX);
        //画布y
        var y = Graphics.pageToCanvasY(touch.pageY);
        //是在画布中
        if (Graphics.isInsideCanvas(x, y)) {
	        //屏幕按下 = true
            this._screenPressed = true;
            //按下时间=0
            this._pressedTime = 0;
            //触摸大于等于 2
            if (event.touches.length >= 2) {
             //当前场景在地图
             if(SceneManager._scene instanceof Scene_Map){
             }else{
              //当取消(x,y)
                this._onCancel(x, y);
             }      
            } else {
	            //当触发(x,y)
                this._onTrigger(x, y);
            }
            //避免默认
            event.preventDefault();
        }
    }
    if (window.cordova || window.navigator.standalone) {
	    //避免默认
        event.preventDefault();
    }
};
