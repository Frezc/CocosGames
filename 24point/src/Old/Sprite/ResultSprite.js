/**
 * Created by freeze on 2015/7/29.
 */


var ResultSprite = DraggableSprite.extend({
    _index: 0,

    ctor: function(index){

        var draw = new cc.DrawNode();
        this.addChild(draw, GameConfig.Priority.CARD_BG);
        draw.drawRect(cc.p(- CardSprite.CARD_WIDTH / 2,- CardSprite.CARD_HEIGHT / 2),
            cc.p(CardSprite.CARD_WIDTH / 2, CardSprite.CARD_HEIGHT / 2), cc.color(255, 255, 255), 1, cc.color(0,0,0));

        var label = new cc.LabelTTF(index, 'Arial', 34);
        label.setFontFillColor(cc.color.BLACK);
        this.addChild(label, GameConfig.Priority.CARD_LABEL);
    },

    getRect: function () {
        return cc.rect(- CardSprite.CARD_WIDTH / 2, - CardSprite.CARD_HEIGHT / 2,
            CardSprite.CARD_WIDTH, CardSprite.CARD_HEIGHT);
    }
});