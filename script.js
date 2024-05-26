const cells = document.querySelectorAll('.cell')
const playerOne = document.querySelector('.playerOne-score')
const playerTwo = document.querySelector('.playerTwo-score')
const dialog = document.querySelector('dialog')
const playerOneInput = document.querySelector('#playerOne-name')
const playerTwoInput = document.querySelector('#playerTwo-name')
const startBtn = document.querySelector('#start-game')
const restartBtn = document.querySelector('.restart')

const startGame = ( () => {
    document.addEventListener("DOMContentLoaded", () => {
        dialog.showModal()
    })
    startBtn.addEventListener("click", () => {
        game.player1.name = playerOneInput.value
        game.player2.name = playerTwoInput.value
    })
})()
const restartGame = ( () => {
    const showRestardBtn = () => {
        const hidden = restartBtn.getAttribute('hidden')

        if (hidden) {
            restartBtn.removeAttribute('hidden')
        }    
    }
    restartBtn.addEventListener("click", () => {
        game.resetBoard()
        game.gameBoard.render.removeMarkers()
        game.player1.score = 0
        game.player2.score = 0
    } )
        return {showRestardBtn}
   
})()    

function players(name, marker,score) {
    return {name, marker, score}
}

const game = ( () => {
    let board = Array(9).fill(null) 
    const player1 = players("X", "X",0)
    const player2 = players("O", "O",0)
    let currentPlayer = player1

    const getCurrentPlayer = () => currentPlayer    
    const resetBoard = () => board.fill(null)   

    const gameBoard = ( () => {

        const playTurn = (index) => {
            if (!board[index]) {
            board[index] = getCurrentPlayer().marker 
            // console.log(`${getCurrentPlayer().name} placed an ${getCurrentPlayer().marker} on the cell ${index}`)            
            
                if (checkWinner()) {
                    // console.log(`${getCurrentPlayer().name} won this roud!`);
                    ++getCurrentPlayer().score                 
                    resetBoard()                    
                    render.removeMarkers()
                    
                } else if (checkDraw()) {
                    // console.log("This round was a tie")
                    resetBoard()
                    render.removeMarkers()
                } else {                    
                    switchPlayer();
                }
            } 
            render.showScore()
            restartGame.showRestardBtn()               
        }

        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1? 
            player2: 
            player1
        };

        const checkWinner = () => {
            const winConditions = [
                [0,1,2],[3,4,5],[6,7,8], //Rows
                [0,3,6],[1,4,7],[2,5,8], //Columns
                [0,4,8],[2,4,6] //Diagonal        
            ]    
            return winConditions.some(condition => 
                condition.every(index => board[index] === getCurrentPlayer().marker)                
            )
        }; 
        
        const checkDraw = () => {
            return !checkWinner() && board.every(item => item !== null)                
        }
        
        const render = ( () =>{
            const getCellId = ( () => {

                cells.forEach(cell => cell.addEventListener("click", (e) => {
                    let id = e.target.id
                    let square = e.target.textContent
                    if (!square) {
                        e.target.textContent = getCurrentPlayer().marker;
                        playTurn(id);
                    }                    
                }))
            })()
            // clear the boxes in UI
            const removeMarkers = () => {              
                cells.forEach(cell => cell.textContent = "")
            }    
            const showScore =  () => {              
                playerOne.textContent = `Player ${player1.name} score: ${player1.score}`;               
                playerTwo.textContent = `Player ${player2.name} score: ${player2.score}`;
            }     

            return { removeMarkers,
                showScore
            }
        })()             
 
        return { playTurn, 
            checkWinner, 
            checkDraw, 
            render,
            }
    })()      

    return { board,
        getCurrentPlayer,
        gameBoard,
        resetBoard,
        player1,
        player2}
})()

