/**
 * Created by Frezc on 2015/9/24.
 */

var GameLayer = cc.Layer.extend({
    //卡片可以放置的相对位置
    cardPosNormalize: null,
    cardPos: null,


    ctor: function () {
        this._super();

        this.initPos();
        this.initBackground();

        gameManager.bindGameView(this);
    },

    //初始化相对位置
    initPos: function () {
        this.cardPosNormalize = {
            defaultPos: [cc.p(0.2, 0.85),cc.p(0.4, 0.85),cc.p(0.6, 0.85),cc.p(0.8, 0.85)],
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

        this.adaptPixelPos();
        //cc.log(this.cardPos);
    },

    //根据相对位置和分辨率初始化绝对位置
    adaptPixelPos: function () {
        this.cardPos = {defaultPos: [], calcPos: [], resultPos:[]};
        var pos = this.cardPos.defaultPos;
        for(var i=0; i<pos.length; i++){
            var abPos = cc.p(
                pos[i].x * cc.winSize.width,
                pos[i].y * cc.winSize.height
            );
            this.cardPos.defaultPos.push(abPos);
        }

        pos = this.cardPos.calcPos;
        for(var i=0; i<pos.length; i++){
            var abPos = cc.p(
                pos[i].x * cc.winSize.width,
                pos[i].y * cc.winSize.height
            );
            this.cardPos.calcPos.push(abPos);
        }

        pos = this.cardPos.resultPos;
        for(var i=0; i<pos.length; i++){
            var abPos = cc.p(
                pos[i].x * cc.winSize.width,
                pos[i].y * cc.winSize.height
            );
            this.cardPos.calcPos.push(abPos);
        }
    },

    //初始化背景和一些不变的元素
    initBackground: function () {
        var bg = new cc.Sprite(res.Background);
        bg.setNormalizedPosition(0.5,0.5);
        this.addChild(bg, -10);

        var draw = new cc.DrawNode();
        this.addChild(draw, -9);
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
            this.addChild(iLabel, -8);
            cc.log("label : ["+iLabel.x+","+iLabel.y+"]");

            var eLabel = new cc.LabelTTF("=", 'Arial', 32);
            eLabel.setFontFillColor(cc.color.BLACK);
            eLabel.setPosition(cc.pAdd(resultPos[i], eOffset));
            this.addChild(eLabel, -8);
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
        this.addChild(menu, 0);
        this.operatorItems = menu.getChildren();

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(res.ButtonBackNormal, res.ButtonBackPressed, "");
        button.setTitleColor(cc.color(0,0,0));
        button.setTitleText("确定");
        button.setTitleFontName("微软雅黑");
        button.setTitleFontSize(23);
        button.setNormalizedPosition(0.83, 0.05);
        button.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED){

            }
        }, this);
        this.addChild(button, 0);

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
                gameManager.resetCard();
            }
        }, this);
        this.addChild(button, 0);
    },

    resetCard: function () {
        this.removeChildByTag(CardSprite.TAG);

        for (var i = 0; i < gameManager.cardLayout.length; i++) {
            var card = gameManager.cardLayout[i];
            var cardView = new CardSprite(card);
            cardView.setNormalizedPosition(this.cardPosNormalize.defaultPos[i]);
            cardView.setLocateListener(this.locate.bind(this));
            cardView.setMoveListener(this.move.bind(this));
            this.addChild(cardView, 1, CardSprite.TAG);
        }
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

            for (var i = 0; i < this.cardPos.resultPos.length; i++) {
                var pos = this.cardPos.resultPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return pos;
                }
            }
        }

        return null;
    },

    move: function (prevPos, nextPos) {
        return gameManager.moveCard(this.getIndexFromPosition(prevPos), this.getIndexFromPosition(nextPos));
    },

    getIndexFromPosition: function (position) {
        if(relLoc.y >= this.cardPos.defaultPos[0].y - cardSize.height / 2){
            for (var i = 0; i < this.cardPos.defaultPos.length; i++) {
                var pos = this.cardPos.defaultPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return i;
                }
            }
        }else{
            for (var i = 0; i < this.cardPos.calcPos.length; i++) {
                var pos = this.cardPos.calcPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return 4 + i;
                }
            }

            for (var i = 0; i < this.cardPos.resultPos.length; i++) {
                var pos = this.cardPos.resultPos[i];
                if(cc.rectContainsPoint(cc.rect(pos.x - cardSize.width / 2, pos.y - cardSize.height / 2, cardSize.width, cardSize.height),
                        relLoc)){
                    return 10 + i;
                }
            }
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});