class Board {
    constructor(column) {
        this.cells = this.createBordCards(column);
    }
    createBordCards(column) {
        let cardsObj = new Cards();
        let arrayCards = cardsObj.cardMix;
        let newArray = [];
        while (arrayCards.length)
            newArray.push(arrayCards.splice(0, column));
        return newArray;
    }
}
