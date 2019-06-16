
class Cards {
    constructor() {
        this.cardMix = this.CardShuffling(IMG_NAME);
    }
    CardShuffling(cards) {
        var arrClone = cards.slice(0);
        // Shuffle the array
        return arrClone.sort(function () {
            return Math.random() - 0.5
        })
    }
}
