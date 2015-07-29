/**
 * Created by freeze on 2015/7/9.
 */

var CardSprite = DraggableSprite.extend({
    _index: 0,
    _isShow: true,
    _backDraw: null,
    _label: null,
    ctor: function (index, isShow) {
        this._super();

        this._index = index;
        cc.log(this._index);
        if(isShow){
            this._isShow = isShow;
        }

        this._backDraw = new cc.DrawNode();

        this.addChild(this._backDraw, GameConfig.Priority.CARD_BG);


        this._label = new cc.LabelTTF(Card.getCardLabel(this._index), 'Arial', 24);
        this._label.setFontFillColor(cc.color.BLACK);
        this._label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this._label, GameConfig.Priority.CARD_LABEL);

        if(isShow) {
            this.showFront();
        }else{
            this.showBack();
        }

        this.setDraggable(true);
    },

    turnOver: function () {
        if(this._isShow){
            this.showBack();
        } else {
            this.showFront();
        }
    },

    showFront: function () {
        this._backDraw.clear();
        this._backDraw.drawRect(cc.p(- CardSprite.CARD_WIDTH / 2,- CardSprite.CARD_HEIGHT / 2),
            cc.p(CardSprite.CARD_WIDTH / 2, CardSprite.CARD_HEIGHT / 2), cc.color(255, 255, 255), 1, cc.color(0,0,0));
        this._label.setVisible(true);
        this._isShow = true;
    },

    showBack: function () {
        this._backDraw.clear();
        this._backDraw.drawRect(cc.p(- CardSprite.CARD_WIDTH / 2,- CardSprite.CARD_HEIGHT / 2),
            cc.p(CardSprite.CARD_WIDTH / 2, CardSprite.CARD_HEIGHT / 2), cc.color(55, 155, 155), 1, cc.color(0,0,0));
        this._label.setVisible(false);
        this._isShow = false;
    },

    getRect: function () {
        return cc.rect(- CardSprite.CARD_WIDTH / 2, - CardSprite.CARD_HEIGHT / 2,
            CardSprite.CARD_WIDTH, CardSprite.CARD_HEIGHT);
    }


});


CardSprite.CARD_WIDTH = 100;
CardSprite.CARD_HEIGHT = 150;