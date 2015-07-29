/**
 * Created by freeze on 2015/7/9.
 */

var Card = {
    Color:{
        CLUB: "Club",
        SPADE: "Spade",
        HEART: "Heart",
        DIAMOND: "Diamond"
    },
    NUM: [
        0,
        'A','2','3','4','5','6','7','8','9','10','J','Q','K'
    ],

    //card index 1~52
    getCardLabel: function(index){
        if(!index || index == 0){

            return 'undefined';
        }
        var c = parseInt((index - 1) / 13) ;
        var label;
        switch(c){
            case 0:
                label = this.Color.CLUB;
                break;
            case 1:
                label = this.Color.SPADE;
                break;
            case 2:
                label = this.Color.HEART;
                break;
            case 3:
                label = this.Color.DIAMOND;
                break;
            default :
                cc.log('unsupported c:'+c);
                return 'undefined';
        }
        var n = (index - 1) % 13 + 1;
        return label + '\n' + this.NUM[n];
    }
};

var GameConfig = {
    Priority:{
        BACKGROUND: -10,
        LOCATION_BACKGROUND: -5,
        LABEL_BACKGROUND: -4,
        CARD_BG: 5,
        CARD_LABEL: 6
    }
};