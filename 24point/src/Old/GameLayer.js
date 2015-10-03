/**
 * Created by freeze on 2015/7/9.
 */

var GameLayer = cc.Layer.extend({
    cardPos: null,
    operatorItems: null,
    cardLayout: null,
    ctor: function () {
        this._super();

        this.initPos();
        this.initBackground();
        this.resetCard();
    },

    initPos: function () {
        this.cardPos = {
            defaultPos: [cc.p(0.2, 0.8),cc.p(0.4, 0.8),cc.p(0.6, 0.8),cc.p(0.8, 0.8)],
            calcPos: [
                cc.p(0.2,0.6),cc.p(0.55,0.6),
                cc.p(0.2,0.4),cc.p(0.55,0.4),
                cc.p(0.2,0.2),cc.p(0.55,0.2)
            ],
            resultPos: [
                cc.p(0.84, 0.6),
                cc.p(0.84, 0.4),
                cc.p(0.84, 0.2)
            ]
        };

        cc.log("winsize: ["+cc.winSize.width+","+cc.winSize.height+"]");

        var pos = this.cardPos.defaultPos;
        for(var i=0; i<pos.length; i++){
            pos[i].x *= cc.winSize.width;
            pos[i].y *= cc.winSize.height;
        }
        pos = this.cardPos.calcPos;
        for(var i=0; i<pos.length; i++){
            pos[i].x *= cc.winSize.width;
            pos[i].y *= cc.winSize.height;
        }
        pos = this.cardPos.resultPos;
        for(var i=0; i<pos.length; i++){
            pos[i].x *= cc.winSize.width;
            pos[i].y *= cc.winSize.height;
        }
        //cc.log(this.cardPos);
    },

    initBackground: function () {
        var bg = new cc.Sprite(res.Background);
        bg.setNormalizedPosition(0.5,0.5);
        this.addChild(bg, GameConfig.Priority.BACKGROUND);

        var draw = new cc.DrawNode();
        this.addChild(draw, GameConfig.Priority.LOCATION_BACKGROUND);
        draw.setPosition(- CardSprite.CARD_WIDTH / 2, - CardSprite.CARD_HEIGHT / 2);
        var cardSize = cc.p(CardSprite.CARD_WIDTH, CardSprite.CARD_HEIGHT);

        var defPos = this.cardPos.defaultPos;
        for(var i=0; i < defPos.length; i++){
            var desPos = cc.pAdd(defPos[i], cardSize);
            cc.log(JSON.stringify(defPos[i]));
            cc.log(JSON.stringify(desPos));
            draw.drawRect(defPos[i], desPos, 0, 1, cc.color(0,0,0));
        }

        var calcPos = this.cardPos.calcPos;
        for(var i=0; i < calcPos.length; i++){
            var desPos = cc.pAdd(calcPos[i], cardSize);
            draw.drawRect(calcPos[i], desPos, 0, 1, cc.color(0,0,0));
        }

        var resultPos = this.cardPos.resultPos;
        var cOffset = cc.p(CardSprite.CARD_WIDTH / 2, CardSprite.CARD_HEIGHT / 2);
        var eOffset = cc.p(- (resultPos[0].x - calcPos[1].x) / 2, 0);
        for(var i=0; i < resultPos.length; i++){
            if(i == 2) {
                draw.drawCircle(cc.pAdd(resultPos[i], cOffset), CardSprite.CARD_WIDTH / 2, 0, 50, false, 1, cc.color(0, 0, 0));
            }else{
                draw.drawRect(resultPos[i], cc.pAdd(resultPos[i], cardSize), 0, 1, cc.color(0,0,0));
            }
            var iLabel = new cc.LabelTTF((i+1),'Arial', 24);
            if(i == 2){
                iLabel.setFontName("微软雅黑");
                iLabel.setString("结果");
            }
            iLabel.setFontFillColor(cc.color.BLACK);
            iLabel.setPosition(resultPos[i]);
            this.addChild(iLabel, GameConfig.Priority.LABEL_BACKGROUND);
            cc.log("label : ["+iLabel.x+","+iLabel.y+"]");

            var eLabel = new cc.LabelTTF("=", 'Arial', 32);
            eLabel.setFontFillColor(cc.color.BLACK);
            eLabel.setPosition(cc.pAdd(resultPos[i], eOffset));
            this.addChild(eLabel, GameConfig.Priority.LABEL_BACKGROUND);
        }

        //init operator
        var menu = new cc.Menu();

        cc.MenuItemFont.setFontSize(60);
        for (var i = 0; i < 3; i++) {
            var opItem = new cc.MenuItemFont("+", this.toggleNextOperator, this);
            opItem.setPosition((calcPos[2*i].x+calcPos[2*i+1].x) / 2, calcPos[2*i].y);
            opItem.setColor(cc.color(0,0,0));
            menu.addChild(opItem);
        }

        menu.setPosition(0,0);
        this.addChild(menu, GameConfig.Priority.LABEL_BACKGROUND);
        this.operatorItems = menu.getChildren();

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(res.ButtonBackNormal, res.ButtonBackPressed, "");
        button.setTitleColor(cc.color(0,0,0));
        button.setTitleText("确定");
        button.setTitleFontName("微软雅黑");
        button.setTitleFontSize(23);
        button.setNormalizedPosition(0.83, 0.05);
        this.addChild(button, GameConfig.Priority.LABEL_BACKGROUND);

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(res.ButtonBackNormal, res.ButtonBackPressed, "");
        button.setTitleColor(cc.color(0,0,0));
        button.setTitleText("重置");
        button.setTitleFontName("微软雅黑");
        button.setTitleFontSize(23);
        button.setNormalizedPosition(0.6, 0.05);
        button.addTouchEventListener(function (sender, type) {
           if(type == ccui.Widget.TOUCH_ENDED){
                this.resetCard();
           }
        }, this);
        this.addChild(button, GameConfig.Priority.LABEL_BACKGROUND);
    },

    resetCard: function () {
        this.clearCard();

        this.cardLayout = {
            defaultLayout: [],
            calcLayout: [],
            resultLayout: []
        };

        var random = this.getRandomArray();
        cc.log("random array: "+random);
        for(var i=0; i<random.length; i++){
            this.addCard(random[i], i);
        }
    },

    clearCard: function () {
        if(this.cardLayout){
            for(var i=0; i < this.cardLayout.defaultLayout.length; i++){
                if(this.cardLayout.defaultLayout[i]) {
                    this.cardLayout.defaultLayout[i].removeFromParent();
                }
            }
            for(var i=0; i < this.cardLayout.calcLayout.length; i++){
                if(this.cardLayout.calcLayout[i]) {
                    this.cardLayout.calcLayout[i].removeFromParent();
                }
            }
            for(var i=0; i < this.cardLayout.resultLayout.length; i++){
                if(this.cardLayout.resultLayout[i]) {
                    this.cardLayout.resultLayout[i].removeFromParent();
                }
            }
        }
    },

    addCard: function(index, locIndex){
        var card = new CardSprite(index, true);
        this.cardLayout.defaultLayout[locIndex] = card;
        card.setNormalizedPosition(0.2*(locIndex+1), 0.8);
        this.addChild(card);
        //cc.log(this.locate.bind(this));
        card.setLocateListener(this.locate.bind(this));
    },

    removeCard: function(locIndex){
        var card = this.cardLayout.defaultLayout[locIndex];
        if(card){
            card.remove();
            this.cardLayout.defaultLayout[locIndex] = null;
        }
    },

    changeCard: function (index, locIndex) {
        this.removeCard(locIndex);
        this.addCard(index, locIndex);
    },

    toggleNextOperator: function (obj) {
        switch(obj.getString()){
            case '+':
                obj.setString('-');
                break;
            case '-':
                obj.setString('×');
                break;
            case '×':
                obj.setString('÷');
                break;
            case '÷':
            default:
                obj.setString('+');
        }
    },

    getRandomArray: function () {
        var random = [];
        outer:
        while(random.length < 4){
            var temp = Math.floor(Math.random() * 52 + 1);
            for(var r in random){
                if(r == temp){
                    continue outer;
                }
            }
            random.push(temp);
        }
        return random;
    },

    locate: function (touch) {
        var relLoc = touch.getLocation();
        var cardSize = cc.size(CardSprite.CARD_WIDTH, CardSprite.CARD_HEIGHT);
        if(relLoc.y >= this.cardPos.defaultPos[0].y - cardSize.height / 2){
            for (var i = 0; i < this.cardPos.defaultPos.length; i++) {
                var pos = this.cardPos.defaultPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return pos;
                }
            }
        }else{
            for (var i = 0; i < this.cardPos.calcPos.length; i++) {
                var pos = this.cardPos.calcPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return pos;
                }
            }
        }

        return null;
    }


});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});