let currentScore = 0;
let lifetimeClicks = 0;
let missedClicks = 0;

let pop = function() {
    let popSoundEffect = new Audio('res/audio/pop.mp3');
    popSoundEffect.volume = .2;
    popSoundEffect.play();
    currentScore = currentScore + 1;
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
    let randNumber = Math.floor(Math.random() * 50);
    if (randNumber == 0) {
        createHungry();
    }
    console.log(randNumber);


}

//stolen average from stackoverflow lol
const average = array => array.reduce((a, b) => a + b) / array.length;

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
        badFlash();
        let errorSoundEffect = new Audio('res/audio/error.mp3');
        errorSoundEffect.volume = .2;
        errorSoundEffect.play();
    }
    document.body.appendChild(baddie);
}

function badFlash() {
    const badFlash = document.createElement("figure");
    badFlash.style.position = 'absolute';
    badFlash.style.height = `100%`;
    badFlash.style.width = `100%`;
    badFlash.style.margin = '0px';
    badFlash.style.padding = '0px';
    badFlash.style.backgroundColor = 'red';
    badFlash.style.opacity = '0%';
    badFlash.style.animationName = 'opacityDrop';
    badFlash.style.animationDuration = '4s';
    badFlash.style.pointerEvents = 'none';
    badFlash.style.zIndex = '20';
    document.body.appendChild(badFlash);
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
        currentScore = currentScore - 10;
        updateStats();
        hungry.style.visibility = 'hidden';
        goodFlash();
        const badKitties = document.querySelectorAll('.baddie');
        badKitties.forEach(badKitty => {
            badKitty.remove();
        });
        let mlemSoundEffect = new Audio('res/audio/mlem.mp3');
        mlemSoundEffect.volume = .2;
        mlemSoundEffect.play();
    }
    document.body.appendChild(hungry);
}


function goodFlash() {
    const goodFlash = document.createElement("figure");
    goodFlash.style.position = 'absolute';
    goodFlash.style.height = `100%`;
    goodFlash.style.width = `100%`;
    goodFlash.style.margin = '0px';
    goodFlash.style.padding = '0px';
    goodFlash.style.backgroundColor = 'yellow';
    goodFlash.style.opacity = '0%';
    goodFlash.style.animationName = 'opacityDrop';
    goodFlash.style.animationDuration = '4s';
    goodFlash.style.pointerEvents = 'none';
    goodFlash.style.zIndex = '20';
    document.body.appendChild(goodFlash);
}

function clickMissed() {
    missedClicks = missedClicks + 1;
    document.getElementById("missedClicks").innerHTML = missedClicks;
}

function loadStats() {
    
    currentScore = Number(localStorage.getItem('currentScore'));
    lifetimeClicks = Number(localStorage.getItem('lifetimeClicks'));
    missedClicks = Number(localStorage.getItem('missedClicks'));
    updateStats();

}

function saveStats() {
    localStorage.setItem('currentScore', currentScore);
    localStorage.setItem('lifetimeClicks', lifetimeClicks);
    localStorage.setItem('missedClicks', missedClicks);
}

//resetting stats
document.addEventListener('keydown', function(event){
    if (event.keyCode === 82) {
        localStorage.clear();
        alert("Score reset! Happy clicking! :)");
        this.location.reload();
    }

} );