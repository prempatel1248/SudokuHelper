var numSelected = null
var tileSelected = null
const board = [];


window.onload = function(){
    setGame();
}

function setGame(){    

    // Instructions
    setTimeout(function(){
        alert("Firstly, Enter the Question Sudoku. To get Hint, click on the Get Hint button and the click wherever you want the Hint. To get the Answer, click on Get Answer button");
    }, 1000);

    //Digits 1-9
    for(let i=1; i<=9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").append(number);
    }

    //Board 9x9
    for(let r=0; r<9; r++){
        for(let c=0; c<9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + c.toString();
            if(r==2 || r==5){
                tile.classList.add("horizontal-line");
            }
            if(r==3 || r==6){
                tile.classList.add("horizontalline");
            }
            if(c==2 || c==5){
                tile.classList.add("vertical-line");
            }
            if(c==3 || c==6){
                tile.classList.add("verticalline");
            }
            if(r==0){
                tile.classList.add("border-top");
            }
            if(r==8){
                tile.classList.add("border-bottom");
            }
            if(c==0){
                tile.classList.add("border-left");
            }
            if(c==8){
                tile.classList.add("border-right");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    const solveButton = document.getElementById("getAnswer");
    solveButton.addEventListener("click", getAnswer);

    const hintButton = document.getElementById("getHint");
    hintButton.addEventListener("click", getHint);
}

function selectNumber(){
    if(numSelected){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile(){
    if(numSelected){
        this.innerText = numSelected.id;
        this.classList.add("tile-selected");
    }
}

function getHint(){
    if(numSelected){
        numSelected.classList.remove("number-selected");
    }
    numSelected = null;

    // Fill the board with input values from the grid
    for(let row=0; row<9; row++){
        board[row] = [];
        for(let col=0; col<9; col++){
            const tileId = row.toString() + col.toString();
            const tileValue = document.getElementById(tileId);
            if(tileValue.innerText){
                board[row][col] = tileValue.innerText;
            }
            else{
                board[row][col] = 0;
            }
        }
    }

    if(isValidSudoku(board)){
        if(solveBoard(board)){
            for(let row=0; row<9; row++){
                for(let col=0; col<9; col++){
                    const tileId = row.toString() + col.toString();
                    const tile = document.getElementById(tileId);
                    tile.addEventListener("click", function(){
                        this.innerText = board[row][col]
                    });
                }
            }
        }
        else{
            let notSolvable = document.createElement("div");
            notSolvable.innerText = "The given Sudoku is Not Solvable :(";
            document.getElementById("notValid").append(notSolvable);
        }
    }
    else{
        let notValid = document.createElement("div");
        notValid.innerText = "The given Sudoku is Not Valid :(";
        document.getElementById("notValid").append(notValid);
    }

}

function getAnswer(){
    if(numSelected){
        numSelected.classList.remove("number-selected");
    }
    numSelected = null;

    // Fill the board with input values from the grid
    for(let row=0; row<9; row++){
        board[row] = [];
        for(let col=0; col<9; col++){
            const tileId = row.toString() + col.toString();
            const tileValue = document.getElementById(tileId);
            if(tileValue.innerText){
                board[row][col] = tileValue.innerText;
            }
            else{
                board[row][col] = 0;
            }
        }
    }

    if(isValidSudoku(board)){
        if(solveBoard(board)){
            for(let row=0; row<9; row++){
                for(let col=0; col<9; col++){
                    const tileId = row.toString() + col.toString();
                    const tile = document.getElementById(tileId);
                    tile.innerText = board[row][col];
                }
            }
        }
        else{
            let notSolvable = document.createElement("div");
            notSolvable.innerText = "The given Sudoku is Not Solvable :(";
            document.getElementById("notValid").append(notSolvable);
        }
    }
    else{
        let notValid = document.createElement("div");
        notValid.innerText = "The given Sudoku is Not Valid :(";
        document.getElementById("notValid").append(notValid);
    }

}

function isValidSudoku(board){
    let temp;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            temp = board[i][j];
            if(temp!=0){
                if(!checkRepeat(board, temp, i, j)){
                    return false;
                }
            }
        }
    }
    return true;
}

function checkRepeat(board, temp, row, col){
    for(let i=col+1; i<9; i++){
        if(board[row][i]==temp){
            return false;
        }
    }
    for(let i=row+1; i<9; i++){
        if(board[i][col]==temp){
            return false;
        }
    }
    const startRow = Math.floor(row/3)*3;
    const startCol = Math.floor(col/3)*3;

    for (let i=startRow; i<startRow+3; i++){
        for (let j = startCol; j < startCol + 3; j++){
            if (board[i][j]==temp && (i!=row || j!=col)){
                return false;
            }
        }
    }
    return true;
}

function solveBoard(board){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(board[i][j]==0){
                for(let temp=1; temp<=9; temp++){
                    if(isSafe(board, i, j, temp)){
                        board[i][j]=temp;
                        let next = solveBoard(board);
                        if(next==true){
                            return true;
                        }
                        else{
                            board[i][j]=0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(board, row, col, temp){
    for(let i=0; i<9; i++){
        if(board[row][i]==temp){
            return false;
        }
    }
    for(let i=0; i<9; i++){
        if(board[i][col]==temp){
            return false;
        }
    }
    for(let i=0; i<9; i++){
        if((board[3*Math.floor(row/3)+Math.floor(i/3)][3*Math.floor(col/3)+(i%3)]) == temp){
            return false;
        }
    }
    return true;
}