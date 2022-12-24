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

//spawn starting kitties
for (let i=0; i < startingKitties; i++) {
    createGood(Math.floor(Math.random() * 75) + 10, Math.floor(Math.random() * 75) + 10);

}

function createGood(left, top) {
    const goodKitty = document.createElement("img");
    goodKitty.style.position = 'absolute';
    goodKitty.src = 'res/img/kitty.jpg';
    goodKitty.style.height = '10vmin';
    goodKitty.style.width = '10vmin';
    goodKitty.style.borderRadius = '50%';
    goodKitty.draggable = false;

    //random spawning
    goodKitty.style.left = `${left}%`;
    goodKitty.style.top = `${top}%`;
    goodKitty.style.transform = `translate(-50%, -50%);`

    goodKitty.onmousedown = function() {
        totalClicks++;
        goodKittiesClicked++;
        currentScore++;
        updateStats();
        goodKitty.remove();
        createGood(Math.floor(Math.random() * 75) + 10, Math.floor(Math.random() * 75) + 10);

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

        updateStats();
    }
    document.body.appendChild(goodKitty);
}

//updates frontend visuals, saves to localStorage
function updateStats() {
    document.getElementById("totalClicks").innerHTML = totalClicks;
    document.getElementById("goodKittiesClicked").innerHTML = goodKittiesClicked;
    document.getElementById("currentScore").innerHTML = currentScore;
    document.getElementById("clicksThatHitNothing").innerHTML = clicksThatHitNothing;
    document.getElementById("badKittiesClicked").innerHTML = badKittiesClicked;
    document.getElementById("hungryKittiesClicked").innerHTML = hungryKittiesClicked;
    document.getElementById("badKittiesEaten").innerHTML = badKittiesEaten;
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
    baddie.style.zIndex = '20';
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    baddie.style.left = `${randomNumber1}%`;
    baddie.style.top = `${randomNumber2}%`;
    baddie.style.transform = `translate(-50%, -50%);`
    baddie.draggable = false;
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
    document.body.appendChild(hungry);
}

//TODO: KITTY BUILDER, kitty generalization

// createKitty("good","res/img/kitty.jpg", "rgba(0, 0, 0, 0.0)");

// function createKitty(name, imgsrc, color) {
//     const kittyBuilder = document.createElement("img");
//     kittyBuilder.style.position = 'absolute';
//     kittyBuilder.src = imgsrc;
//     kittyBuilder.style.height = '10vmin';
//     kittyBuilder.style.boxShadow = `0px 0px 8vmin 5vmin ${color}`;
//     kittyBuilder.style.width = '10vmin';
//     kittyBuilder.style.borderRadius = '50%';
//     let randomNumber1 = Math.floor(Math.random() * 75) + 10;
//     let randomNumber2 = Math.floor(Math.random() * 75) + 10;
//     kittyBuilder.style.left = `${randomNumber1}%`;
//     kittyBuilder.style.top = `${randomNumber2}%`;
//     kittyBuilder.style.transform = `translate(-50%, -50%);`
//     kittyBuilder.draggable = false;
//     kittyBuilder.onmousedown = function() {

//     }
//     document.body.appendChild(kittyBuilder);
// }

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