
let game = new Game();
let cells = game.bord.cells;
let objLocal = JSON.parse(localStorage.getItem("globalStorage"));
let lenObjLocal = objLocal.length - 1;
//cretae a board DOM
$(document).ready(initDynmaicApp);
//stopWatch clock
let h1 = document.getElementsByTagName('h2')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;
function initDynmaicApp() {
    victoryMessage();
    let conatainer = $('.container');
    for (let i = 0; i < ROW; i++) {
        let row = $(`<div class ="row flex-nowrap"></div>`);
        for (let j = 0; j < COLUMN; j++) {
            let col = $(`<div class="col-md-3 col-sm-3"></div>`);
            let divCard = $(`<div class="card mt-4 card-rotating"></div>`);
            let imgCard = $(`<img class="img-responsive"/>`);
            let divFront = $(`<div class="front"></div>`);
            let divBack = $(`<div class="back"></div>`)
            divFront.append(imgCard);
            let imgBack = $(`<img class="img-responsive" src="../src/img/cards/back.png" />`);
            $(divCard).attr({ "data-img": `${cells[i][j].substr(0, cells[i][j].indexOf(' '))}` });
            $(imgCard).attr({ "src": `../src/img/cards/${cells[i][j]}` });
            divBack.append(imgBack);
            $(divCard).append(divFront);
            $(divCard).append(divBack);
            $(col).append(divCard);
            $(row).append(col);
            $(conatainer).append(row);
        }
    }
    timer();
    $(".card").click((e) => {
        let card = e.currentTarget;
        console.log(card);
        let backFlipped = card.children[0];
        $(backFlipped).addClass('flipped');
        game.cardClicked(card);
        victoryMessage();

    })
}
$(".new-game").click(function (e) {
    clearTimeout(t);
    let newGame = new Game();
    game = newGame;
    cells = game.bord.cells;
    let conatainer = $('.container');
    let lenChildren = conatainer[0].children.length;
    let containerChildren = conatainer[0].children;
    for (let i = 3; i < lenChildren; i++) {
        console.log(containerChildren[i]);
        $(containerChildren[i]).empty();
    }
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    initDynmaicApp();
});

function victoryMessage() {
    if (game.victory === false) {
        document.querySelector('.sccore').innerHTML = `NUM Of GUESSES: ${game.numOfGuesses}`;
    }
    else {
        clearTimeout(t);
        // console.log("victory");
        let conatainer = $('.container');
        let lenChildren = conatainer[0].children.length;
        let containerChildren = conatainer[0].children;
        for (let i = 3; i < lenChildren; i++) {
            console.log(containerChildren[i]);
            $(containerChildren[i]).empty();
        }
        let strTime = h1.textContent;
        let messageVictory = $('<div class="animated bounce won text-center"></div>');
        $(conatainer).append(messageVictory);
        document.querySelector('.won').innerHTML = `${objLocal[lenObjLocal].user} your time ${strTime} and number of guess ${game.numOfGuesses}`;
        objLocal[lenObjLocal].score = game.numOfGuesses;
        objLocal[lenObjLocal].time = strTime;
        window.localStorage.setItem("globalStorage", JSON.stringify(objLocal));
        tableScore();
    }
}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

// //TO DO
function tableScore() {
    let conatainer = $('.container');
    let objUpdateWithScore = JSON.parse(localStorage.getItem("globalStorage"));
    let continerTable = $(`<div class="table-responsive"></div>`);
    let table = $(`<table class="table"></table>`);
    let thead = $(`<thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">score</th>
                            <th scope="col">time</th>
                        </tr>
                </thead>`);
    let tbody = $(`<tbody></tbody>`);
    for (let i = 0; i < lenObjLocal + 1; i++) {
        let tr = $('<tr></tr>');
        tbody.append(tr);
        for (let prop in objUpdateWithScore[i]) {
            if (prop === `user`) {
                let userName = `${objUpdateWithScore[i]['user']}`;
                let td = $(`<td class="td"></td>`);
                td.html(`${userName}`);
                tr.append(td);
            }
            else if (prop === 'score') {
                let strScore = `${objUpdateWithScore[i]['score']}`;
                let td = $(`<td class="td"></td>`);
                td.html(`${strScore}`);
                tr.append(td);

            }
            else if (prop === `time`) {
                let time = `${objUpdateWithScore[i]['time']}`;
                let td = $(`<td class="td"></td>`);
                td.html(`${time}`);
                tr.append(td);

            }
        }
    }
    continerTable.append(table);
    table.append(thead);
    table.append(tbody);
    conatainer.append(continerTable);
}
