//meowing noises

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


//pages shown

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
    onefooter.style.display = "grid";                           //show the footer
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


//when page is scrolled down

//settings

var settings = document.querySelectorAll('.settings-button'); //array of settings buttons
var setting1 = document.querySelector('.settings1');
var setting2 = document.querySelector('.settings2');
var setting2a = document.querySelector('.settings2a');
var setting3 = document.querySelector('.settings3');

setting1.addEventListener('click', function () { //bring out side settings when setting button is clicked
    setting2.classList.toggle('scaledown');
    setting2a.classList.toggle('scaledown');
    setting3.classList.toggle('scaledown');
});

setting2.addEventListener("click", enterFullscreen); //enter and exit fullscreen commands
setting2a.addEventListener("click", exitFullscreen);

// Enter full screen
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
    setting2a.classList.remove('remove');   //change fullscreen to exit fullscreen
    setting2.classList.add('remove');
}

// Exit full screen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    setting2.classList.remove('remove');    //change exit fullscreen to fullscreen
    setting2a.classList.add('remove');
}

setting3.addEventListener('click', function () {
    window.scrollTo(0, 0);           //scrolls to top left of page (very top)

    stopGame();                     //stops minigame
    playerscore.innerHTML = ('');   //hides score msg
    difficultySelect.selectedIndex = 1;         //medium is [1] in diff

    hideallcountries();             //hides countries
    document.getElementById("country-base").style.display = "block";        //sets back to default msg

    meowplaying = false;                        //stops playing meow sounds
    meowButton.innerHTML = "Play Meows";        //reset back to original
    clearInterval(meowInterval);                //clears the meowing

    catfact.innerHTML = ('Click for a fact');   //sets back to default msg

    hideall(); //hides every page from showing up
    show(1); //default to show home page

    const card1 = document.querySelector('.card1');     //hard coding every card to flipped back to normal
    card1.classList.remove('flip');
    const card2 = document.querySelector('.card2');
    card2.classList.remove('flip');
    const card3 = document.querySelector('.card3');
    card3.classList.remove('flip');
    const card4 = document.querySelector('.card4');
    card4.classList.remove('flip');


});


//pages scrolling

const header = document.getElementById('catHeader'); //cat banner 
window.addEventListener('DOMContentLoaded', function () {
    for (let setting of settings) {
        setting.classList.add('scaledown');    //makes it disappear
    }
});

window.addEventListener('scroll', function () { //after scrolled down
    if (window.scrollY > 50) {                  //by Y -50
        header.classList.add('shrink');         //adds shrink class to header
        setting1.classList.remove('scaledown');
    } else {                                    //else if scrolled up to Y -49 or above
        header.classList.remove('shrink');      //removes shrink class from header
        for (let setting of settings) {
            setting.classList.add('scaledown');     //makes it disappear
        }
    }
});



//cards flipping

//event delegation
const cardContainer = document.querySelector(".sub-box3");

cardContainer.addEventListener("click", function (e) {           //adds a click event onto .sub-box3, any click inside this triggers the function
    const clickedCard = e.target.closest(".card_");             //e.target = element that was clicked .closest() searchs for the closest ancestor or itself with a .card_ class
    if (clickedCard) {                                          //if line 91 returns true, runs this
        clickedCard.classList.toggle("flip");                   //toggles classes in css
    }
});


//minigame

const startbtn = document.getElementById("startbtn");       //button to start game
const playerscore = document.getElementById("score");       //score
const timerDisplay = document.getElementById("timer");      //timer
let score = 0;              //default score = 0
let gamestarted = false;    //default bool value for gamestarted: false
let gameTimer;              //initialize timer
let countdown;              //initialize countdown
const laser = document.getElementById("laser");                 //laser
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
    laser.style.top = getXandY(0, (window.innerHeight) * 0.4) + "px";                //randomize Y position
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
}

startbtn.addEventListener("click", function () {        //start btn listens to click
    if (!gamestarted) {                                 //if game not started, starts game
        timerDisplay.classList.remove("warning");       //removes warning from timer classlist
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


//countries image map

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
    countries[i].addEventListener("click", function (e) {   //all countries on img map listen for click event
        e.preventDefault();                                 //prevents the website from going back to default, href scrolls to top of page
        countryshow(i);                                     //runs function to show current country info
    });
}

function updateMapImage() {
    const seaMap = document.getElementById("sea-map"); //image dependant on screen width

    if (window.innerWidth <= 800) {
        seaMap.src = "images/sea-map-mobile.jpg";   //  mobile version
    } else {
        seaMap.src = "images/sea-map.jpg";          //  desktop version
    }
}

window.addEventListener("DOMContentLoaded", updateMapImage);    //run when page load

window.addEventListener("resize", updateMapImage);              //run when width resized

hideallcountries();                                         //hides all countries by default


const desktopCoords = {         //image map coords on pc
    "Myanmar": [5, 81, 77, 97],
    "Vietnam": [121, 79, 183, 95],
    "Laos": [101, 105, 139, 122],
    "Thailand": [74, 147, 140, 163],
    "Philippines": [297, 129, 377, 146],
    "Cambodia": [118, 181, 189, 196],
    "Malaysia": [113, 253, 182, 269],
    "Brunei": [219, 249, 272, 262],
    "Singapore": [136, 293, 215, 308],
    "Indonesia": [208, 338, 287, 351],
    "East-Timor": [303, 478, 384, 495]
};

const mobileCoords = {          //image map coords on mobile
    "Myanmar": [1, 30, 31, 40],
    "Vietnam": [47, 30, 75, 39],
    "Laos": [39, 41, 56, 50],
    "Thailand": [30, 57, 57, 67],
    "Cambodia": [47, 72, 76, 79],
    "Philippines": [117, 50, 153, 59],
    "Malaysia": [44, 100, 74, 108],
    "Brunei": [87, 98, 110, 106],
    "Singapore": [53, 115, 87, 125],
    "Indonesia": [82, 133, 114, 142],
    "East-Timor": [117, 189, 155, 199]
};

function applyCoords(coordSet) {
    for (let key in coordSet) {                     // goes thru mobile/desktop coords 
        const coords = coordSet[key];               // takes country array
        const area = document.getElementById(key);  // get index 
        if (area) {                                 // skip if area tag not found
            area.coords = coords.join(",");         // turns array to string with , in between each element in the array
        }
    }
}

window.addEventListener("DOMContentLoaded", function () {   //run when content loaded
    if (window.innerWidth <= 800) {                         //RWD
        applyCoords(mobileCoords);
    } else {
        applyCoords(desktopCoords);
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth <= 800) {
        applyCoords(mobileCoords);
    } else {
        applyCoords(desktopCoords);
    }
});


//few facts about cats

const catFacts = [
    "Cats have the largest eyes relative to their head size of any mammal.",
    "Cats have better memories than dogs.",
    "Domestic cats share approximately 95.6% of their DNA with tigers.",
    "The domesticated house cat has very little genetic difference from its wild ancestors.",
    "Cats have one of the smallest nucleoli of any mammal.",
    "Male cats inherit their orange coloring from their mother via X-linked genes.",
    "The cat genome shows virtually no evidence of inbreeding over the past 100,000 years.",
    "Domestic cats share about 10 genes difference from wildcats.",
    "Cats have 500 skeletal muscles (humans have 650).",
    "A domestic cat's claws are non-retractable only partially—not all are retractable.",
    "Cats have an astonishing sense of balance due to the righting reflex.",
    "A cat's field of vision is about 200°, compared to 180° for humans.",
    "Cats can drink seawater; their kidneys filter salt efficiently.",
    "Cats have nearly no blind spot under their nose.",
    "Cats are one of the few mammals that purr, using vibrating bones in their throat.",
    "A cat's carbon footprint is about one-third that of a medium-sized dog.",
    "Cats have fewer cones in their eyes, seeing mainly blues and yellows.",
    "Cats can see ultraviolet light.",
    "Cats lack the sweetness taste receptor gene, so can't taste sweet things.",
    "Cats have around 473 taste buds vs 9,000 in humans.",
    "Domestic cats are obligate carnivores, needing meat to live.",
    "Cats have a third eyelid called the nictitating membrane.",
    "An adult cat has 30 teeth; kittens have 26 temporary ones.",
    "Cats sweat only through paw pads.",
    "Cats have scent glands on their face, paws, and tail.",
    "A cat's tongue has backward-facing papillae for grooming.",
    "Cats have 32 muscles in each ear and can rotate them 180°.",
    "Cats have free-floating shoulder blades.",
    "Their jaw moves only up-and-down—no side-to-side chewing.",
    "Cats are crepuscular—most active at dawn and dusk.",
    "Cats have flexible spines and can twist head-to-tail mid-fall.",
    "Cats can make about 100 distinct vocal sounds (dogs ~10).",
    "Kittens from the same litter can have different fathers (superfecundation).",
    "Cats can rotate their ears 180° independently.",
    "Cats can't climb head-first down trees—they go down backward.",
    "Cats walk with both right legs, then both left legs—like giraffes & camels.",
    "Cats spend about 70% of their life sleeping.",
    "The oldest known pet cat lived ~9,500 years ago (Cyprus grave).",
    "Cats share 95.6% DNA with tigers.",
    "A Maine Coon named Stewie was 48.5 inches long—world's longest cat.",
    "Merlin produced the loudest known purr: 67.7 dB.",
    "Blackie inherited £13 million—the richest cat ever.",
    "Isaac Newton invented the hinged cat door.",
    "Felicette became the first (and only) cat in space in Oct 1963.",
    "Ancient Egyptians shaved their eyebrows when their cats died.",
    "Cats lack glucuronyl transferase—have trouble digesting carbs.",
    "Cats are obligate nasal breathers—they can't breathe through mouths.",
    "Cats share ~90% of their brain structure with humans.",
    "Pope Innocent VIII associated cats with evil—led to mass killings.",
    "A group of cats is called a clowder.",
    "Male cats are more left-pawed; females more right-pawed.",
    "Adult cats meow only to humans, not each other.",
    "The cat's nose print is unique—like a fingerprint.",
    "Cats have up to 24 whiskers on each side of their face.",
    "Kittens are born with blue eyes that change color as they age.",
    "Cats' paws contain sweat glands for scent marking.",
    "Cats' tongues are rough like sandpaper.",
    "Cats have almost twice as many olfactory genes as humans.",
    "Cats' coat colors are genetic and affect hearing/deafness.",
    "White cats with blue eyes are more prone to deafness.",
    "Black fur genetics might help disease resistance.",
    "Polydactyl cats can have up to 9 toes per paw.",
    "Jake the polydactyl cat had 28 toes—Guinness record.",
    "Polydactyly was valued by sailors for balance on ships.",
    "Cats fell into superstition during the Middle Ages—mass killings.",
    "Cats domesticated themselves ~10,000 years ago.",
    "There are ~600 million domestic cats worldwide.",
    "Cats see 6-8 times better than humans in low light.",
    "Cats can hear 55 Hz-79 kHz (humans ~20 Hz-20 kHz).",
    "Cats can pinpoint sound location within ~3 in at 1 yd away.",
    "Cats have Jacobson's organ (for sensing pheromones).",
    "70-80% of cats react to catnip and silver vine.",
    "Cats lack sweet taste receptors—no sweet tooth.",
    "Cats prefer food around 38 °C—like fresh prey.",
    "Cats groom to clean and stimulate blood flow.",
    "A cat's vestibular system aids balance and orientation.",
    "Cats are nearsighted but excel peripherally and in dark.",
    "Cats form emotional attachments and can suffer separation anxiety.",
    "Petting a cat can reduce human stress and blood pressure.",
    "Cats mentally map humans via voice location.",
    "Cats cannot taste sweetness",
    "Cats make ~100 vocal sounds—far more than dogs",
    "Kittens from same litter may have different fathers",
    "Cats walk like giraffes & camels",
    "Ancient cat grave in Cyprus ~9,500 years ago",
    "Cats spend ~70% of their lives sleeping",
    "Felicette was first cat in space",
    "Cats rotate ears 180° independently",
    "Cats lack ability to taste sugar",
    "Cats drink seawater; kidneys filter salt"
];

const facts = document.querySelector("#facts-button");  //facts button
const catfact = document.querySelector("#cat-fact");    //where the facts show up

facts.addEventListener("click", function () {
    var index = Math.floor(Math.random() * catFacts.length);
    catfact.innerHTML = catFacts[index];
});

