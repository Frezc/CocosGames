/**
 * Created by Frezc on 2015/9/24.
 */


var DraggableSprite = cc.Sprite.extend({
    _listener: null,

    ctor: function () {
        this._super();
    },

    containsTouchLocation: function (touch) {
        var gloc = touch.getLocation();
        var rect = this.getRect();

        rect.x += this.x;
        rect.y += this.y;
        //cc.log(rect);
        return cc.rectContainsPoint(rect, gloc);
    },

    setDraggable: function (draggable) {
        if(draggable){
            if(this._listener){
                cc.eventManager.addListener(this._listener, this);
            }else {
                this._listener = cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan,
                    onTouchMoved: this.onTouchMoved,
                    onTouchEnded: this.onTouchEnded
                }, this);
            }
        }else{
            if(this._listener){
                cc.eventManager.removeListener(this._listener);
            }
        }
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        //cc.log(touch.getLocation());
        if(target.containsTouchLocation(touch)){
            //cc.log(target.getPosition());
            target.prevPosition = target.getPosition();
            target.setLocalZOrder(target.getParent().getChildrenCount() - 1);
            return true;
        }
        return false;
    },

    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var loc = touch.getLocation();
        //cc.log(target.x+","+target.y);
        target.setPosition(loc);
    },

    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        var newPos = target.locate(touch);
        //cc.log("newPos: "+newPos);
        if(!newPos && target.prevPosition &&　!target.move(target.prevPosition, newPos)) {
            target.setPosition(target.prevPosition);
        }else{
            target.setPosition(newPos);
        }
    },

    setLocateListener: function(listener){
        //cc.log("set locate listener: "+listener);
        this.locate = listener;
    },

    setMoveListener: function (listener) {
        this.move = listener;
    },

    //interface
    getRect: function () {
        return cc.rect(0,0,0,0);
    },

    //得到正确的放置位置 interface
    locate: function (touch) {
        return null;
    },

    //移动 interface
    move: function (pre, next) {
        return false;
    }
});