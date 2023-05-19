const createPlayers = (playerOneName ='Player One', playerTwoName = 'Player Two') =>{   

    const players = [
        playerOne={
            name: playerOneName,
            token: 'X'
        },
        playerTwo={
            name: playerTwoName,
            token: 'O'
        }
    ]
    return players   
}

const gameBoard = (()=>{
    const squares = document.querySelectorAll(".square");
    
    const row = []
    const column = []
    const diagonal = [[squares[0], squares[4], squares[8]], [squares[0], squares[4], squares[8]], [squares[2], squares[4], squares[6]]]

    
    for(i=0; i< squares.length; i+=3){
        const rowData =[]
        for(j = i; j < i+3 ; j++ ){
            rowData.push(squares[j])
        }
        row.push(rowData)
    
    }
    for (x = 0; x< 3; x++){
        const columnData = []
        for(y = 0; y < 3; y++ ){
            columnData.push(row[y][x])
        }
        column.push(columnData)
    }

    const markSquare = (square, playerToken)=>{
        square.textContent = playerToken
    }
    
    const resetBoard = () =>{
        squares.forEach(square => {
            square.textContent = ''
        });
    };  
   

    return{
        squares,
        markSquare,
        resetBoard,
        row,
        column,
        diagonal
    };
})()



const gameController = ((square)=>{
    const players = createPlayers()
    let activePlayer = players[0]
    let gameOver = false;
    

    const switchPlayers = () =>{             
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    


    const playRound = (square) =>{
        const currentPlayer = activePlayer;
        const winCondition = currentPlayer.token.repeat(3);
        const boardRow = gameBoard.row;
        const boardColumn = gameBoard.column;
        const boardDiagonal = gameBoard.diagonal;
        console.log(boardDiagonal)

        if (square.textContent !== '') return;
        

        gameBoard.markSquare(square, currentPlayer.token);
        
        switchPlayers();

        const checkWin = () =>{
            
            for(b = 0; b<3; b++){
                if (boardRow[b].map(square => square.textContent).join('') === winCondition) {
                    prompt(`${currentPlayer.name} won`)
                    gameOver = true;
                    return;
                }
                if (boardColumn[b].map(square => square.textContent).join('') === winCondition) {
                    prompt(`${currentPlayer.name} won`)
                    gameOver = true;
                    return;
                }
                if (boardDiagonal[b].map(square => square.textContent).join('') === winCondition) {
                    prompt(`${currentPlayer.name} won`)
                    gameOver = true;
                    return;
                }                                   
            }
        
        }
        checkWin();

               
    }
    
    return{
        playRound
    }

})()

gameBoard.squares.forEach(square => {
    square.addEventListener('click', () => gameController.playRound(square))       
});


/*gameBoard.squareMark() */


