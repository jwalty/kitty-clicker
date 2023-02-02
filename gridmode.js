let clickedYet = false;
let firstClickTime;
let totalActivations = 0;

function activate() {
    if (this.dataset.highOpacity == "false") {
        totalActivations++;
        this.innerHTML = totalActivations;
    }
        this.style.opacity = "100%";
        this.dataset.highOpacity = "true";
}

let rows = document.getElementById("kittyTable").children[0].childElementCount;
let columns = document.getElementById("kittyTable").children[0].children[0].childElementCount;


let totalCells = rows * columns;
console.log(totalCells);

console.log(document.getElementById("kittyTable").children[0].children[0].children[0]);

function resetGrid() {
    for (let i=0; i < rows; i++) {
        for (let j=0; j < columns; j++) {
            let currentTile = document.getElementById("kittyTable").children[0].children[i].children[j];
            currentTile.style.opacity = "0%";
            currentTile.dataset.highOpacity = "false";
        }
    }
    totalActivations = 0;
}