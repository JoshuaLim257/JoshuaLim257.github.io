
let meowplaying = false; /*default is switched off*/
let meowInterval; /*every 7 seconds plays a meow*/
const meowButton = document.querySelector("#meowSoundsbutton"); /*meow button on list*/
const meowSounds = [ /*listen of meow sounds*/
    document.getElementById("meowSound1"),
    document.getElementById("meowSound2"),
    document.getElementById("meowSound3"),
    document.getElementById("meowSound4"),
    document.getElementById("meowSound5"),
    document.getElementById("meowSound6")
];

function playRandomMeow() {
    const index = Math.floor(Math.random() * meowSounds.length); /*random number from 1-6*/
    const selectedMeow = meowSounds[index]; /*plays randomized meow*/
    selectedMeow.currentTime = 0;           //forces the audio to go back to the start
    selectedMeow.play();                    // plays the audio
}


meowButton.addEventListener("click", function () {      //when meow button gets pressed
    if (!meowplaying) {
        meowplaying = true;                             //sets the meows playing to true
        meowButton.innerHTML = "Stop Meows";            //changes button text
        meowInterval = setInterval(playRandomMeow, 7000); //performs the function every 7000ms (7s)
    } else {
        meowplaying = false;
        meowButton.innerHTML = "Play Meows";            //changes button text
        clearInterval(meowInterval);                    //stop timed event
    }
});

const page1btn = document.querySelector("#page1btn");       //list of subtopics 
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");
var allpages = document.querySelectorAll(".page");          //array of elements with class page
var allfooters = document.querySelectorAll(".footer");      //array of elements with class footer


function hideall() {                            //hiding all pages
    for (let onepage of allpages) {             //go through all subtopic pages
        onepage.style.display = "none";         //hide it
    }
    for (let onefooter of allfooters) {         //go through all subtopic footer
        onefooter.style.display = "none";       //hide it
    }
}
function show(pgno) {                                           //function to show selected page and footer no
    hideall();                                                  //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";                            //show the page
    let onefooter = document.querySelector("#footer" + pgno);
    onefooter.style.display = "block";                          //show the footer
}

page1btn.addEventListener("click", function () { //listens for a click event on any subpage btn, hides every page then reveal selected one
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
page5btn.addEventListener("click", function () {
    show(5);
});
hideall(); //hides every page from showing up
show(1); //default to show home page

const header = document.getElementById('catHeader'); //cat banner 

window.addEventListener('scroll', function () { //after scrolled down
    if (window.scrollY > 50) {                  //by Y -50
        header.classList.add('shrink');         //adds shrink class to header
    } else {                                    //else if scrolled up to Y -49 or above
        header.classList.remove('shrink');      //removes shrink class from header
    }
});

const facts = document.querySelector("#facts-button");  //facts button
const catfact = document.querySelector("#cat-fact");    //where the facts show up

facts.addEventListener("click", function () {               //function to generate cat facts in catfact
    const api = fetch("https://catfact.ninja/fact")
        .then(res => res.json())                            //followed from yt vid
        .then(data => {
            catfact.innerHTML = data.fact;                  //changes innerdata to data.fact
        });
});

const card1 = document.querySelector(".card1"); //card elements
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");
const card4 = document.querySelector(".card4");

card1.addEventListener("click", function () { //listens to click event on all cards and add/removes the flip class to the cards
    card1.classList.toggle("flip");
});
card2.addEventListener("click", function () {
    card2.classList.toggle("flip");
});
card3.addEventListener("click", function () {
    card3.classList.toggle("flip");
});
card4.addEventListener("click", function () {
    card4.classList.toggle("flip");
});



const startbtn = document.getElementById("startbtn");       //button to start game
const playerscore = document.getElementById("score");       //score
const timerDisplay = document.getElementById("timer");      //timer
let score = 0;              //default score = 0
let gamestarted = false;    //default bool value for gamestarted: false
let gameTimer;              //initialize timer
let countdown;              //initialize countdown
const laser = document.getElementById("laser"); //laser
const difficultySelect = document.getElementById("difficulty"); //difficulty

function setLaserSize(difficulty) {             //receives diff as parameter and sets laser size corresponding to difficulty
    if (difficulty === "easy") {
        laser.style.width = "4vw";
        laser.style.height = "4vw";
    } else if (difficulty === "medium") {
        laser.style.width = "2vw";
        laser.style.height = "2vw";
    } else if (difficulty === "hard") {
        laser.style.width = "1vw";
        laser.style.height = "1vw";
    }
}

function getXandY(min, max) {                                   //get a randomized X and Y position for the laser
    let pos = Math.round(Math.random() * (max - min)) + min;    //get a random number from 0 (inclusive) to 1 (exclusive), multiply it by maximum value and gets the rounded down number
    return pos;
}

function LaserPos() { //laser coords function
    laser.style.left = getXandY(0, 98) + "%";               //randomize the X position, % because of RWD, 98% to make sure it doesnt leave the box
    laser.style.top = getXandY(0, 450) + "px";              //randomize Y position, 450 to make sure it doesnt leave the box
    score++;                                                //score increases
    playerscore.innerHTML = "Score: " + score;              //score updates
    playerscore.classList.add("pop");                       //score gets animated
    setTimeout(function () {
        playerscore.classList.remove("pop");
    }, 300);                                                //after 0.3s (when anim is over) removes the score animation
}

function stopGame() {                               //stopping game function
    startbtn.innerHTML = "Start Game";              //changes button back to default start game
    gamestarted = false;                            //bool value becomes false
    laser.classList.add("remove");                  //adds remove to laser classlist
    timerDisplay.classList.add("remove");           //adds remove to timer classlist
    playerscore.innerHTML = "You scored " + score + "."; //shows final score of user
    timerDisplay.classList.remove("warning");       //removes warning from timer classlist
}

startbtn.addEventListener("click", function () {        //start btn listens to click
    if (!gamestarted) {                                 //if game not started, starts game
        clearInterval(countdown);                       //stops countdown in case of game before
        clearTimeout(gameTimer);                        //stops timer in case of game before

        //resets game (everything back to default values)
        score = 0;
        let timeLeft = 15;
        playerscore.innerHTML = "Score: " + score;
        timerDisplay.innerHTML = "Time: " + timeLeft;

        //revealing hidden elements
        startbtn.innerHTML = "Stop Game";               //changes start button to stop button
        laser.classList.remove("remove");               //removes remove from laser classlist
        playerscore.classList.remove("remove");         //removes remove from score classlist
        gamestarted = true;                             //changes bool value to true
        laser.addEventListener("click", LaserPos);      //laser listen for a click, runs laserPos after being clicked
        timerDisplay.classList.remove("remove");        //removes remove from timer

        const selectedDifficulty = difficultySelect.value;      //selected difficulty gets received
        setLaserSize(selectedDifficulty);                       //function runs on selected difficulty

        //countdown
        countdown = setInterval(function () {
            timeLeft--;                                         //timer goes down from 15 by 1
            timerDisplay.innerHTML = "Time: " + timeLeft;       //updates timer value
            if (timeLeft <= 0) {                                //if time is up
                clearInterval(countdown);                       //stop timer
                stopGame();                                     //runs stop game func
            }
            if (timeLeft <= 5) {                                //if time left is 5 or lower
                timerDisplay.classList.add("warning");          //adds warning to timer classlist
            }
        }, 1000);                                               //runs every second

        gameTimer = setTimeout(function () {    //game stops after 15 seconds by default (if stop button isnt pressed)
            if (gamestarted) {
                stopGame();
            }
        }, 15000);

    } else {                        //stop btn is pressed (everything resets to default)
        stopGame();
        clearInterval(countdown);   //clears timed events so it wont stay even if game is over
        clearTimeout(gameTimer);
    }
});



const countries = [                         //array of countries on img map
    document.getElementById("Myanmar"),
    document.getElementById("Vietnam"),
    document.getElementById("Laos"),
    document.getElementById("Thailand"),
    document.getElementById("Philippines"),
    document.getElementById("Cambodia"),
    document.getElementById("Malaysia"),
    document.getElementById("Brunei"),
    document.getElementById("Singapore"),
    document.getElementById("Indonesia"),
    document.getElementById("East-Timor")
];

var allcountries = document.querySelectorAll(".country");       //array of information about countries

function hideallcountries() {                   //keeps all information hidden
    for (let onecountry of allcountries) {
        onecountry.style.display = "none";      
    }
}

function countryshow(countrynum) {                                          //revealing a country
    document.getElementById("country-base").style.display = "none";         //removes default msg
    hideallcountries();                                                     //hides all country info
    let onecountry = document.getElementById("country" + (countrynum + 1)); //receives countrynum as parameter
    onecountry.style.display = "block";                                     //reveals selected country
}

for (let i = 0; i < countries.length; i++) {                //iterates thru whole country list
    const index = i;                                        //index becomes current country
    countries[i].addEventListener("click", function (e) {   //all countries on img map listen for click event
        e.preventDefault();                                 //prevents the website from going back to default, href scrolls to top of page
        countryshow(index);                                 //runs function to show current country info
    });
}

hideallcountries();                                         //hides all countries by default
