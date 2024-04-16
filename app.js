document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0

    //  criando o tabuleiro do jogo
    function createBoard() {
        for (let i=0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }    
    createBoard()


    //  gerar um numero aleatorio
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    // mover para direita
    function moveRight() {
        for (let i=0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]


            }
        }
    }

    // mover para esquerda
    function moveLeft() {
        for (let i=0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

                
            }
        }
    }

    // mover para baixo
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let column = [];
            for (let j = 0; j < 4; j++) {
                column.push(parseInt(squares[i + j * width].innerHTML));
            }
    
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);
    
            for (let j = 0; j < 4; j++) {
                squares[i + j * width].innerHTML = newColumn[j];
            }
        }
        combineColumnDown();
    }

    // mover para cima
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let column = [];
            for (let j = 0; j < 4; j++) {
                column.push(parseInt(squares[i + j * width].innerHTML));
            }
    
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);
    
            for (let j = 0; j < 4; j++) {
                squares[i + j * width].innerHTML = newColumn[j];
            }
        }
        combineCollumn();
    }

    function combineRow(){
        for (let i=0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }  
        checkForWin()  
    }

    function combineColumnDown() {
        for (let i = 12; i >= 0; i--) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        moveDown();
        generate();
    }

    function combineCollumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        moveUp();

    }

    // Vincular teclas aos comandos
    function control(e) {
        if(e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown() {
        moveDown()
        combineCollumn()
        moveDown()
        generate()
    }

    function keyUp() {
        moveUp()
        combineCollumn()
        moveUp()
        generate()
    }
    
    // Conferir Vitoria
    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'Você Ganhou!'
                document.removeEventListener('keyup', control);
            }
        } 
    }       

    function checkForGameOver() {
        let zeros = 0
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'Você Perdeu!'
            document.removeEventListener('keyup', control);
        }
    }
})