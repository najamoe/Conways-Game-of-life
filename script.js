"use strict"

window.addEventListener("load", start);

function start(){
setup();
}

let grid;
        let cols = 20; // Number of columns
        let rows = 20; // Number of rows

        function setup() {
            grid = make2dArray(cols, rows);
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = Math.floor(Math.random() * 2); // Randomly initialize the grid
                }
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

     