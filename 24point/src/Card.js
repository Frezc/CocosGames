/**
 * Created by Frezc on 2015/9/25.
 */

function Card(index) {
    this._index = index;
    this.tag = "poker";
}

Card.COLOR = [
    "Club",
    "Spade",
    "Heart",
    "Diamond"
];

Card.NUM = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

Card.prototype.getColorLabel = function () {
    return Card.COLOR[this._index / 13];
};

Card.prototype.getNumberLabel = function () {
    return Card.NUM[this._index % 13];
}

Card.prototype.getLabel = function () {
    return this.getColorLabel() + "/n" + this.getNumberLabel();
};

Card.prototype.getNumber = function () {
    return this._index % 13;
}
