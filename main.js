let value = 0;
let lifetimeClicks = 0;
var dingSE = new Audio('ding.mp3');
dingSE.volume = .2;

let lastClickTime = new Date();
let timeBetweenClicks = [];


var pop = function() {
    const timeOfClick = new Date();
    timeBetweenClicks.push(timeOfClick - lastClickTime);
    lastClickTime = timeOfClick;
    var popSoundEffect = new Audio('pop.mp3');
    popSoundEffect.volume = .2;
    popSoundEffect.play();
    value = value + 1;
    lifetimeClicks++;
    if (value % 5 == 0) {
        dingSE.play();
        createBad();
    }
    let randomNumber1 = Math.floor(Math.random() * 75) + 10;
    let randomNumber2 = Math.floor(Math.random() * 75) + 10;
    this.style.left = `${randomNumber1}%`;
    this.style.top = `${randomNumber2}%`;
    updateStats();

}

function testTimeMath() { 
    const newDate = new Date();
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
    baddie.src = 'jail.jpg';
    baddie.style.height = '10vmin';
    baddie.style.boxShadow = `0px 0px 62px 0px rgba(255,0,0,0.55)`;
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

function evilMode() {
    document.body.style.backgroundColor = '#7c1b1e';
    document.getElementById("value").style.color = 'black';
    document.getElementById("value").style.opacity = '75%';
}