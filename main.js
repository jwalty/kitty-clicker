let value = 0;
let lifetimeClicks = 0;
let missedClicks = 0;


let lastClickTime = new Date();
let timeBetweenClicks = [];


let pop = function() {
    const timeOfClick = new Date();
    timeBetweenClicks.push(timeOfClick - lastClickTime);
    lastClickTime = timeOfClick;
    let popSoundEffect = new Audio('res/audio/pop.mp3');
    popSoundEffect.volume = .2;
    popSoundEffect.play();
    value = value + 1;
    lifetimeClicks++;
    if (value % 5 == 0) {
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

}

//stolen average from stackoverflow lol
const average = array => array.reduce((a, b) => a + b) / array.length;

function updateStats() {
    document.getElementById("value").innerHTML = value;
    document.getElementById("lifetimeClicks").innerHTML = lifetimeClicks;
    document.getElementById("bestReaction").innerHTML = Math.min(...timeBetweenClicks);
    document.getElementById("worstReaction").innerHTML = Math.max(...timeBetweenClicks);
    document.getElementById("averageReaction").innerHTML = Math.floor(average(timeBetweenClicks));
    document.title = `kitty clicker - ${value}`;
}

function createBad() {
    const baddie = document.createElement("img");
    baddie.style.position = 'absolute';
    baddie.src = 'res/img/jail.jpg';
    baddie.style.height = '10vmin';
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
        value = value - 10;
        updateStats();
        baddie.style.visibility = 'hidden';
        badFlash();
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

function clickMissed() {
    missedClicks = missedClicks + 1;
    document.getElementById("missedClicks").innerHTML = missedClicks;
}