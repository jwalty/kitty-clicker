//stats for nerds
let totalClicks = 0;
let goodKittiesClicked = 0
let currentScore = 0;
let clicksThatHitNothing = 0;
let badKittiesClicked = 0;
let hungryKittiesClicked = 0;
let badKittiesEaten = 0;

//array of stats for nerds
let statsForNerds = ['totalClicks', 'goodKittiesClicked', 'currentScore', 'clicksThatHitNothing', 'badKittiesClicked', 'hungryKittiesClicked'];

//spawnrates
let startingKitties = 7;
let hungryKittySpawnrate = 200;

//kitty container
let kittyContainer = document.querySelector('#kittyContainer');

//spawn starting kitties
for (let i=0; i < startingKitties; i++) {
    createGood();

}

function createGood(left, top) {
    const goodKitty = document.createElement("img");
    goodKitty.classList = 'goodKitty';
    goodKitty.src = 'res/img/kitty.jpg';
    goodKitty.draggable = false;

    //random spawning
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    goodKitty.style.left = `${randomNumber1}%`;
    goodKitty.style.top = `${randomNumber2}%`;
    goodKitty.style.transform = `translate(-50%, -50%);`

    goodKitty.onmousedown = function() {
        totalClicks++;
        goodKittiesClicked++;
        currentScore++;
        updateStats();

        goodKitty.remove();
        createGood();

        //check for evil cat spawn
        if (currentScore % 5 == 0) {
            let dingSE = new Audio('res/audio/ding.mp3');
            dingSE.volume = .2;
            dingSE.play();
            createBad();
        }

        //play sound
        let popSoundEffect = new Audio('res/audio/pop.mp3');
        popSoundEffect.volume = .2;
        popSoundEffect.play();

        //check for hungry cat spawn
        let randNumber = Math.floor(Math.random() * hungryKittySpawnrate);
        if (randNumber == 0) {
            createHungry();
        }

    }
    kittyContainer.appendChild(goodKitty);
}

//updates frontend visuals, saves to localStorage
function updateStats() {
    document.getElementById("totalClicks").textContent = totalClicks;
    document.getElementById("goodKittiesClicked").textContent = goodKittiesClicked;
    document.getElementById("currentScore").textContent = currentScore;
    document.getElementById("clicksThatHitNothing").textContent = clicksThatHitNothing;
    document.getElementById("badKittiesClicked").textContent = badKittiesClicked;
    document.getElementById("hungryKittiesClicked").textContent = hungryKittiesClicked;
    document.getElementById("badKittiesEaten").textContent = badKittiesEaten;
    document.title = `kitty clicker - ${currentScore}`;
    saveStats();
}

function createBad() {
    const baddie = document.createElement("img");
    baddie.src = 'res/img/jail.jpg';
    baddie.classList = 'badKitty';
    baddie.draggable = false;
    
    //random spawning
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    baddie.style.left = `${randomNumber1}%`;
    baddie.style.top = `${randomNumber2}%`;
    baddie.style.transform = `translate(-50%, -50%);`

    //adding popping event listener
    baddie.onmousedown = function() {
        totalClicks++;
        badKittiesClicked++;
        currentScore -= 10;
        updateStats();
        baddie.remove();
        createFlash("red");
        let errorSoundEffect = new Audio('res/audio/error.mp3');
        errorSoundEffect.volume = .8;
        errorSoundEffect.play();
    }
    kittyContainer.appendChild(baddie);
}

//flash effect for 'special kitties'
function createFlash(color) {
    const flash = document.createElement("figure");
    flash.style.position = 'absolute';
    flash.style.height = `100%`;
    flash.style.width = `100%`;
    flash.style.margin = '0px';
    flash.style.padding = '0px';
    flash.style.backgroundColor = color;
    flash.style.opacity = '0%';
    flash.style.animationName = 'opacityDrop';
    flash.style.animationDuration = '4s';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '20';
    document.body.appendChild(flash);
    setTimeout(() => {flash.remove()}, 5000);
}

function createHungry() {
    const hungry = document.createElement("img");
    hungry.src = 'res/img/hungry.jpg';
    hungry.draggable = false;

    //random spawning
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    hungry.style.left = `${randomNumber1}%`;
    hungry.style.top = `${randomNumber2}%`;
    hungry.style.transform = `translate(-50%, -50%);`

    hungry.onmousedown = function() {
        totalClicks++;
        hungryKittiesClicked++;
        hungry.remove();
        createFlash("yellow");
        const badKitties = document.querySelectorAll('.baddie');
        badKitties.forEach(badKitty => {
            currentScore++;
            badKitty.remove();
            badKittiesEaten++;
        });
        let mlemSoundEffect = new Audio('res/audio/mlem.mp3');
        mlemSoundEffect.volume = .2;
        mlemSoundEffect.play();
        updateStats();
    }
    kittyContainer.appendChild(hungry);
}

//tracks missing clicks
function clickMissed() {
    clicksThatHitNothing++;
    totalClicks++;
    updateStats();
}

//loads stats from localStorage, called onload
function loadStats() {
    totalClicks = Number(localStorage.getItem('totalClicks'));
    goodKittiesClicked = Number(localStorage.getItem('goodKittiesClicked'));
    currentScore = Number(localStorage.getItem('currentScore'));
    clicksThatHitNothing = Number(localStorage.getItem('clicksThatHitNothing'));
    badKittiesClicked = Number(localStorage.getItem('badKittiesClicked'));
    badKittiesEaten = Number(localStorage.getItem('hungryKittiesClicked'));
    hungryKittiesClicked = Number(localStorage.getItem('hungryKittiesClicked'));
    updateStats();
}

//Saving stats (called in updateStats to update after every click)
function saveStats() {
    localStorage.setItem('totalClicks', totalClicks);
    localStorage.setItem('goodKittiesClicked', goodKittiesClicked);
    localStorage.setItem('currentScore', currentScore);
    localStorage.setItem('clicksThatHitNothing', clicksThatHitNothing);
    localStorage.setItem('badKittiesClicked', badKittiesClicked);
    localStorage.setItem('hungryKittiesClicked', hungryKittiesClicked);
    localStorage.setItem('hungryKittiesClicked', hungryKittiesClicked);
}

//Resetting stats on 'R'
document.addEventListener('keydown', function(event){
    if (event.keyCode === 82) {
        localStorage.clear();
        alert("Score reset! Happy clicking! :)");
        this.location.reload();
    }

} );