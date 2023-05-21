const getUserInfo = document.querySelector("[data-attribute='formulary']"); 
const userButton = document.querySelector('[data-attribute="button"]');
const roundDisplay = document.querySelector('[data-attribute="round-display"]');
const turnDisplay = document.querySelector('.players-display')

const userInput = () => {
    const playerOne = document.querySelector("[data-attribute='playerOne']").value
    const playerTwo = document.querySelector("[data-attribute='playerTwo']").value 

    const pOneDisplay = document.querySelector('[data-attribute="pOneDisplay"]')
    const pTwoDisplay = document.querySelector('[data-attribute="pTwoDisplay"]')
    pOneDisplay.textContent =` ${playerOne}: X`;
    pTwoDisplay.textContent = ` ${playerTwo}: O`

    return createPlayers(playerOne, playerTwo);
};



getUserInfo.addEventListener('submit', (event) => {
    event.preventDefault();

    gameBoard.clearBoard()
    const players = userInput()
    gameController.setPlayers(players);
    roundDisplay.textContent= ''
    getUserInfo.reset();

   
      
});




const createPlayers = (playerOneName ='Player One', playerTwoName = 'Player Two') =>{   

    const playerOne={
        name: playerOneName || 'Player One',
        token: 'X'
    }

    const playerTwo={
        name: playerTwoName || 'Player Two',
        token: 'O'
    }
    
    const players = [playerOne, playerTwo];
    
    return players;  
}

const gameBoard = (()=>{
    
    const squares = document.querySelectorAll(".square");
    
    

    
    const row = []
    const column = []
    const diagonal = [[squares[0], squares[4], squares[8]], 
    [squares[0], squares[4], squares[8]], 
    [squares[2], squares[4], squares[6]]]

    
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

    const clearBoard = () =>{
        squares.forEach(square => square.textContent = '');
        turnDisplay.textContent = '';
        gameController.clearGame();
    }

    return{
        squares,
        markSquare,
        row,
        column,
        diagonal,
        clearBoard
    };
})()



const gameController = (()=>{
    let players = createPlayers();
    let activePlayer = players[0];
    
    const setPlayers = (newPlayers) => {
        players = newPlayers;
        console.log(players);
        activePlayer = players[0];
    };
     
    let gameOver = false;
    
    const switchPlayers = () =>{             
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        
    };
    
    const playRound = (square) =>{
        console.log(gameOver)
        const currentPlayer = activePlayer;
        const winCondition = currentPlayer.token.repeat(3);
        const boardRow = gameBoard.row;
        const boardColumn = gameBoard.column;
        const boardDiagonal = gameBoard.diagonal;
        
        let nextPlayer = players[0]
        
       


        console.log(currentPlayer.name)

        if (gameOver) return;
        if (square.textContent !== '') return;

        console.log(currentPlayer)
        gameBoard.markSquare(square, currentPlayer.token);
        
        switchPlayers();
           
        if(currentPlayer === players[0]){
            nextPlayer = players[1]
        }
        turnDisplay.textContent = `${nextPlayer.name}  (${nextPlayer.token}) turn `;
      

        const updateDisplay = (toWhatHappened = '')=>{
            
            roundDisplay.textContent = toWhatHappened
                      
        }

        const checkWin = () =>{
            const isTie = boardRow.every(row => row.every(square => square.textContent !== ''));
            
            
            for(b = 0; b<3; b++){
                if (boardRow[b].map(square => square.textContent).join('') === winCondition) {
                    updateDisplay(`${currentPlayer.name} won!`)
                    gameOver = true;
                    return;
                }
                if (boardColumn[b].map(square => square.textContent).join('') === winCondition) {
                    updateDisplay(`${currentPlayer.name} won`)
                    gameOver = true;
                    return;
                }
                if (boardDiagonal[b].map(square => square.textContent).join('') === winCondition) {
                    updateDisplay(`${currentPlayer.name} won`)
                    gameOver = true;
                    return;
                }
                                     
            }
               
            if (isTie && !gameOver) {
                updateDisplay("It's a tie!");
                gameOver = true;
                return;
            }
           
        }    
        checkWin();

        if(gameOver){
            const button = document.createElement("button")
            button.classList.add('restart')
            button.textContent = "RESTART"
            roundDisplay.appendChild(button);

            turnDisplay.remove();
            const restartButton = document.querySelector(".restart")
            restartButton.addEventListener('click', ()=>{
                roundDisplay.textContent = '';
                
                gameBoard.clearBoard();
            })

        }

               
    }
    const clearGame = () => {
        gameOver = false;
    };
    
    return{
        playRound,
        setPlayers,
        gameOver,
        players,
        clearGame

    }

})()



gameBoard.squares.forEach((square) => {
    square.addEventListener("click", () => {gameController.playRound(square); console.log(gameController.gameOver)}
    );
});

/*gameBoard.squareMark() */


