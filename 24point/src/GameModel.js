/**
 * Created by Frezc on 2015/9/24.
 */


function Card(index) {
    this._index = index;
}

Card.COLOR = {
    CLUB: "Club",
    SPADE: "Spade",
    HEART: "Heart",
    DIAMOND: "Diamond"
};

Card.NUM = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

Card.prototype.getLabel = function () {

};


