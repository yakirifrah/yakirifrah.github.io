const ROW = 3;
const COLUMN = 4;
const TOTAL_COUPLES_CARDS = 6;

class Game {
    constructor() {
        this.bord = new Board(COLUMN);
        // console.log(this.bord);
        this.elPreviousCard = null;
        this.flippedCouplesCount = 0;
        this.isProcessing = false;
        this.victory = false;
        this.numOfGuesses = 0;
    }
    cardClicked(CurrentCard) {
        if (CurrentCard.classList.contains('flipped')) {
            return;
        }
        if (!this.isProcessing) {
            CurrentCard.classList.add('flipped');
        }
        this.checkIfCardFirst(CurrentCard);
    }
    checkIfCardFirst(CurrentCard) {
        if (this.elPreviousCard === null) {
            this.elPreviousCard = CurrentCard;
        }
        else {
            let Firstcard = this.elPreviousCard.getAttribute('data-img');
            this.isMatchCards(Firstcard, CurrentCard);
        }
    }
    isMatchCards(Firstcard, CurrentCard) {
        let Secondcard = CurrentCard.getAttribute('data-img');
        if (Firstcard === Secondcard) {
            this.flippedCouplesCount++;
            this.isVicotry(this.flippedCouplesCount, TOTAL_COUPLES_CARDS);
            this.elPreviousCard = null;
        }
        else {
            this.numOfGuesses++;
            this.isProcessing = true;
            setTimeout(() => {
                if (this.elPreviousCard) {
                    this.elPreviousCard.classList.remove('flipped');
                }
                CurrentCard.classList.remove('flipped');
                this.elPreviousCard = null;
                this.isProcessing = false;
            }, 1000);
        }
    }
    isVicotry(flippedCouplesCount, TOTAL_COUPLES_CARDS) {
        if (flippedCouplesCount === TOTAL_COUPLES_CARDS) {
            this.victory = true;
        }
    }
}

