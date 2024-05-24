function players(name, marker,score = 0) {
    return {name, marker, score}
}
const game = ( () => {
    let board = Array(9).fill(null)    
    const player1 = players("Xerox", "X")
    const player2 = players("Oreo", "O")
    let currentPlayer = player1

    const getCurrentPlayer = () => currentPlayer

    const gameBoard = ( () => {

        const playTurn = (index) => {
          if (!board[index]) {
            board[index] = getCurrentPlayer().marker 
            console.log(`${getCurrentPlayer().name} placed an ${getCurrentPlayer().marker} on the cell ${index}`)
            
                if (checkWinner()) {
                    console.log(`${getCurrentPlayer().name} won this roud!`);
                    ++getCurrentPlayer().score
                    resetBoard()
                    
                } else if (checkDraw()) {
                    console.log("This round was a tie")
                    resetBoard()
                } else {
                    switchPlayer();
                }
            } else {
            console.log("ERROR this cell is used");
            }
    
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
        
        const resetBoard = () => board.fill(null)
                
        
        return {playTurn, checkWinner, checkDraw, resetBoard}


    })()  

    return {board,
        getCurrentPlayer,
        gameBoard,
    }
})()
