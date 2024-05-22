function players(name, marker) {
    return {name, marker}
}
const game = ( () => {
    let board = Array(9).fill(null)
    const player1 = players("Xerox", "X")
    const player2 = players("Oreo", "O")
    let currentPlayer = player1

    const winConditions = [
        [0,1,2],[3,4,5],[6,7,8] //Rows
        [0,3,6],[1,4,7],[2,5,8] //Columns
        [0,4,8],[2,4,6] //Diagonal        
    ]    

    const switchPlayer = () => {
        game.currentPlayer = game.currentPlayer === player1? 
        player2: 
        player1
    };

    const gameBoard = ( () => {
        const playTurn = (index) => {
            board[index] = game.currentPlayer.marker
            switchPlayer()
        }
        const checkWinner = () => {
            
            
        }
        return {playTurn, checkWinner}


    })()  

    return {board,
        currentPlayer,
        gameBoard,
    }
})()
