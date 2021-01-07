
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const turn = document.getElementById('turnIndicator')
const reset = document.getElementById('reset')
const wins = document.getElementById('wins')
const draws = document.getElementById('draws')
const losses = document.getElementById('losses')
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let counterW = 0 , counterD = 0, counterL = 0
let circleTurn

// <div class="play-with-ai" id="play-with-ai">AI Player</div>
// https://wallpapercave.com/w/wp2913772

/* Reset's game */
restartButton.addEventListener('click', startGame)
reset.addEventListener('click', startGame)

/* Start's Game */
startGame()

/* Set's up board */
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

/* Event Listener */
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

/* Bring's up pop up */
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
        counterD++
        draws.innerHTML = "Draws: " + counterD
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        if (circleTurn) {
            counterL++
            losses.innerHTML = "Losses: " + counterL
        } else {
            counterW++
            wins.innerHTML = "Wins: " + counterW
        }
    }
    winningMessageElement.classList.add('show')
}

/* Checks every cell element as an array */
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

/* Adds X's or O's */
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

/* Switch turn */
function swapTurns() {
    circleTurn = !circleTurn;
    turn.innerHTML = `${circleTurn ? "O's" : "X's"} Turn`
}

/* Switches board based on who's turn is next */
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}


/* Check's win conditions */
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
