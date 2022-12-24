//stats for nerds
let currentScore = 0;
let lifetimeClicks = 0;
let missedClicks = 0;

//hungryKitties will spawn 1/hungryKittySpawnrate
let hungryKittySpawnrate = 200;

//moves normal kitty to a new location, increments score
let pop = function() {
    let popSoundEffect = new Audio('res/audio/pop.mp3');
    popSoundEffect.volume = .2;
    popSoundEffect.play();
    currentScore++;
    lifetimeClicks++;
    if (currentScore % 5 == 0) {
        let dingSE = new Audio('res/audio/ding.mp3');
        dingSE.volume = .2;
        dingSE.play();
        createBad();
    }
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    this.style.left = `${randomNumber1}%`;
    this.style.top = `${randomNumber2}%`;
    updateStats();
    let randNumber = Math.floor(Math.random() * hungryKittySpawnrate);
    if (randNumber == 0) {
        createHungry();
    }
}

//stolen average from stackoverflow lol
const average = array => array.reduce((a, b) => a + b) / array.length;

//updates frontend visuals, saves to localStorage
function updateStats() {
    document.getElementById("currentScore").innerHTML = currentScore;
    document.getElementById("lifetimeClicks").innerHTML = lifetimeClicks;
    document.getElementById("missedClicks").innerHTML = missedClicks;
    document.title = `kitty clicker - ${currentScore}`;
    saveStats();
}

function createBad() {
    const baddie = document.createElement("img");
    baddie.style.position = 'absolute';
    baddie.src = 'res/img/jail.jpg';
    baddie.style.height = '10vmin';
    baddie.setAttribute('class','baddie');
    baddie.style.boxShadow = `0px 0px 3vmin 0px rgba(255,0,0,0.55)`;
    baddie.style.width = '10vmin';
    baddie.style.borderRadius = '50%';
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    baddie.style.left = `${randomNumber1}%`;
    baddie.style.top = `${randomNumber2}%`;
    baddie.style.transform = `translate(-50%, -50%);`
    baddie.draggable = false;
    baddie.onmousedown = function() {
        currentScore = currentScore - 10;
        updateStats();
        baddie.style.visibility = 'hidden';
        createFlash("red");
        let errorSoundEffect = new Audio('res/audio/error.mp3');
        errorSoundEffect.volume = .8;
        errorSoundEffect.play();
    }
    document.body.appendChild(baddie);
}

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
}

function createHungry() {
    const hungry = document.createElement("img");
    hungry.style.position = 'absolute';
    hungry.src = 'res/img/hungry.jpg';
    hungry.style.height = '10vmin';
    hungry.style.boxShadow = `0px 0px 8vmin 5vmin rgba(255, 210, 0, 0.40)`;
    hungry.style.width = '10vmin';
    hungry.style.borderRadius = '50%';
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    hungry.style.left = `${randomNumber1}%`;
    hungry.style.top = `${randomNumber2}%`;
    hungry.style.transform = `translate(-50%, -50%);`
    hungry.draggable = false;
    hungry.onmousedown = function() {
        hungry.style.visibility = 'hidden';
        createFlash("yellow");
        const badKitties = document.querySelectorAll('.baddie');
        badKitties.forEach(badKitty => {
            currentScore++;
            badKitty.remove();
        });
        let mlemSoundEffect = new Audio('res/audio/mlem.mp3');
        mlemSoundEffect.volume = .2;
        mlemSoundEffect.play();
        updateStats();
    }
    document.body.appendChild(hungry);
}

//tracks missing clicks
function clickMissed() {
    missedClicks = missedClicks + 1;
    updateStats();
}

//loads stats from localStorage, called onload
function loadStats() {
    currentScore = Number(localStorage.getItem('currentScore'));
    lifetimeClicks = Number(localStorage.getItem('lifetimeClicks'));
    missedClicks = Number(localStorage.getItem('missedClicks'));
    updateStats();
}

//Saving stats (called in updateStats to update after every click)
function saveStats() {
    localStorage.setItem('currentScore', currentScore);
    localStorage.setItem('lifetimeClicks', lifetimeClicks);
    localStorage.setItem('missedClicks', missedClicks);
}

//Ressetting stats on 'R'
document.addEventListener('keydown', function(event){
    if (event.keyCode === 82) {
        localStorage.clear();
        alert("Score reset! Happy clicking! :)");
        this.location.reload();
    }

} );