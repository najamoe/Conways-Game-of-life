"use strict"

window.addEventListener("load", start);

function start() {
    setup();
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('stopBtn').addEventListener('click', stopGame);
    document.getElementById('slowBtn').addEventListener('click', slowDown);
    document.getElementById('speedUpBtn').addEventListener('click', speedUp);
    document.getElementById('restartBtn').addEventListener('click', restart);
}

let intervalId;
let grid;
let cols = 20; 
let rows = 20; 

function setup() {
    grid = make2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2); 
    }
    drawGrid();
}

function make2dArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function drawGrid() {
    const container = document.getElementById('grid');
    container.innerHTML = ''; // Clear previous content
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = i;
            cell.dataset.y = j;
            if (grid[i][j] === 1) {
                cell.style.backgroundColor = 'black'; // Alive cell
            }
            container.appendChild(cell);
        }
    }
}

function nextGeneration() {
    let nextGrid = make2dArray(cols, rows);

    // Loop through every cell in the grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Count the number of neighbors for the current cell
            let neighbors = countNeighbors(grid, i, j);

            // Apply the rules of Conway's Game of Life
            if (grid[i][j] === 1) { // If the cell is alive
                if (neighbors <= 1 || neighbors >= 4) {
                    nextGrid[i][j] = 0; // Cell dies due to solitude or overpopulation
                } else {
                    nextGrid[i][j] = 1; // Cell survives
                }
            } else { // If the cell is dead
                if (neighbors === 3) {
                    nextGrid[i][j] = 1; // Cell becomes alive due to reproduction
                } else {
                    nextGrid[i][j] = 0; // Cell remains dead
                }
            }
        }
    }

    // Update the current grid with the next generation
    grid = nextGrid;

    // Redraw the grid with the updated generation
    drawGrid();
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    // Loop through the neighbors of the cell
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            // Calculate the neighbor's coordinates, handling edge cases
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            // Add the neighbor's value to the sum
            sum += grid[col][row];
        }
    }
    // Subtract the cell's own value from the sum
    sum -= grid[x][y];
    return sum;
}


function startGame() {
    clearInterval(intervalId); // Clear any existing intervals
    intervalId = setInterval(nextGeneration, 500); // Start the game with default speed
}

function stopGame() {
    clearInterval(intervalId); // Stop the game
}

function slowDown() {
    clearInterval(intervalId); // Clear any existing intervals
    intervalId = setInterval(nextGeneration, 1000); // Slow down the game
}

function speedUp() {
    clearInterval(intervalId); // Clear any existing intervals
    intervalId = setInterval(nextGeneration, 250); // Speed up the game
}

function restart(){
    setup();
}

}


