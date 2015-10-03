/**
 * Created by Frezc on 2015/9/24.
 */

var gameManager = {

    gameView: null,

    bindGameView: function(view) {
        this.gameView = view;
    },

    resetCard: function () {
        this.cardLayout = [];

        var random = this.getRandomArray();
        cc.log("random array: "+random);
        for(var i=0; i<random.length; i++){
            var card = new Card(random[i]);
            this.cardLayout.push(card);
        }

        if(this.gameView) {
            this.gameView.resetCard();
        }
    },

    //移动卡片，返回是否可以移动
    moveCard: function (from, to) {
        cc.log("move " + from + " to " + to);

        if (this.cardLayout[from]){
            if (!this.cardLayout[to]) {
                if (this.cardLayout[from].tag == "poker") {
                    if (to != 10 && to != 11){
                        this.cardLayout[to] = this.cardLayout[from];
                        this.cardLayout[from] = null;
                        return true;
                    }
                } else if (this.cardLayout[from].tag == "result") {
                    if (to != 0 && to != 1 && to != 2 && to != 3){
                        this.cardLayout[to] = this.cardLayout[from];
                        this.cardLayout[from] = null;
                        return true;
                    }
                }
            }
        }

        return false;
    }

};