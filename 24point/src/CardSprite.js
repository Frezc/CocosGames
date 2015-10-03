/**
 * Created by Frezc on 2015/9/24.
 */

var CardSprite = DraggableSprite.extend({
    card: null,
    _backDraw: null,
    _label: null,
    ctor: function (card) {
        this._super();

        this.card = card;

        this._backDraw = new cc.DrawNode();
        this._backDraw.drawRect(cc.p(- CardSprite.CARD_WIDTH / 2,- CardSprite.CARD_HEIGHT / 2),
            cc.p(CardSprite.CARD_WIDTH / 2, CardSprite.CARD_HEIGHT / 2), cc.color(255, 255, 255), 1, cc.color(0,0,0));
        this.addChild(this._backDraw, -1);


        this._label = new cc.LabelTTF(this.card.getLabel(), 'Arial', 24);
        this._label.setFontFillColor(cc.color.BLACK);
        this._label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this._label, 0);

        this.setDraggable(true);
    },

    getRect: function () {
        return cc.rect(- CardSprite.CARD_WIDTH / 2, - CardSprite.CARD_HEIGHT / 2,
            CardSprite.CARD_WIDTH, CardSprite.CARD_HEIGHT);
    }
});


CardSprite.CARD_WIDTH = 100;
CardSprite.CARD_HEIGHT = 150;
CardSprite.TAG = 12;