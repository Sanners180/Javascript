"use strict";
console.log("JS loaded!");
const hanu = document.querySelector(".hanu");

const spritesheet = document.getElementById("spritesheet");
const page = document.querySelector("#full-page");
const hi_bounds = document.querySelector("#hi_boundary").getBoundingClientRect();
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.05;
const button_click = document.getElementById("button_click");
button_click.volume = 0.1;


const pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

console.log("hanu:", hanu);


let x = (hi_bounds.left - 10) / pixelSize
let y = (hi_bounds.top +30 ) / pixelSize;
let face;
let held_directions = [];
const speed = 1;
let enter = false;
let futureBox = {};
let number_buttons = ["box0","box1","box2","box3","box4","box5","box6","box7","box8","box9"];
let answer_display = [];
let tries = 0;
let next = false;
let back = false;
let currentHeart = null;
let currentPage = 0;
const heart_id = [];
const solution = "85192"; //Answer is Heart 

const isEven = num => num % 2 === 0;
const isOdd = num => num % 2 !== 0;

const hori_walls = [
  { top: 0, left: 2, width: 5.9 },
  { top: 1, left: 4, width: 2 },
  { top: 2, left: 1, width: 2 },
  { top: 2, left: 5, width: 1 },
  { top: 3, left: 0, width: 2 },
  { top: 3, left: 4, width: 3 },
  { top: 4, left: 2, width: 4 },
  { top: 5, left: 0, width: 2 },
  { top: 6, left: 4, width: 3 },
  { top: 7, left: 1, width: 3 },
  { top: 7, left: 7, width: 0.9 },
  { top: 8, left: 1, width: 3 },
  { top: 8, left: 6, width: 0.9 },
  { top: 9, left: 1, width: 3 },
  { top: 9, left: 6, width: 1.9 },
  { top: 10, left: 4, width: 3 },
  { top: 10.9, left: 1, width: 6.9 }
];

const vert_walls =[
  { top: 0, left: 0, height: 11 },
  { top: 0, left: 7.9, height: 10.9 },
  { top: 0, left: 2, height: 1 },
  { top: 1, left: 1, height: 1 },
  { top: 1, left: 3, height: 2 },
  { top: 1, left: 4, height: 2 },
  { top: 1, left: 6, height: 1 },
  { top: 1, left: 7, height: 4 },
  { top: 2, left: 2, height: 1 },
  { top: 3, left: 1, height: 1 },
  { top: 4, left: 4, height: 1 },
  { top: 4, left: 6, height: 1 },
  { top: 5, left: 2, height: 1 },
  { top: 5, left: 3, height: 2 },
  { top: 5, left: 5, height: 1 },
  { top: 6, left: 6, height: 2 },
  { top: 7, left: 1, height: 1 },
  { top: 7, left: 5, height: 3 },
  { top: 9, left: 2, height: 1.9 },
  { top: 9, left: 3, height: 1 },
  { top: 10, left: 6, height: 0.9 },
];

const hearts =[
  { top: 2, left: 1 },
  { top: 1, left: 5 },
  { top: 3, left: 0 },
  { top: 4, left: 5 },
  { top: 7, left: 1 },
  { top: 9, left: 2 },
  { top: 10, left: 6 }
]

const maze = document.getElementById('maze');
hori_walls.forEach(w => {
  const wall = document.createElement('div');
  wall.classList.add('wall','horizontal');
  wall.style.top = ((w.top/11)*100 + 0.25) + '%';
  wall.style.left = ((w.left/8)*100 + 0.25) + '%';
  wall.style.width = ((w.width/8)*100 + 0.25) + '%';
  maze.appendChild(wall);
});
vert_walls.forEach(w => {
  const wall = document.createElement('div');
  wall.classList.add('wall', 'verticle');
  wall.style.top = ((w.top/11)*100 + 0.25)+ '%';
  wall.style.left = ((w.left/8)*100 + 0.25) + '%';
  wall.style.height = ((w.height/11)*100 + 0.25) + '%';
  maze.appendChild(wall);
});
hearts.forEach( (h, index) => {
  const heart = document.createElement('div');
  heart.classList.add('heart', 'animate', 'obstacle');
  heart.id = `heart-${index}`;
  heart_id.push(heart.id);
  heart.style.top = ((h.top/11 + 0.02)*100 + 0.25)+ '%';
  heart.style.left = ((h.left/8 + 0.041)*100 + 0.25) + '%';
  maze.appendChild(heart);
});


const popup = document.getElementById('popup');
const popupPages = document.getElementById('popupPages');

const heartPopups = [
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Big</h1></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">There was once a time</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">Where all the universe was held together</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">A singular point</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">with all matter and knowledge</p></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">An Infinty</h1></div>`
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Bang</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">When the universe exploded </p></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Infinty spread</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">We were the ends of the universe</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">and everything in between</p></div>`,
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">But now</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">Lord look at us now</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">You with a screen</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">Me inside it</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">How many stars died for us to meet?</p></div>`,
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">This Life</h1></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">You're controlling me</h1></div>`,
    `<div class="heart_page "><p class = "just-another-hand-regular">Moving me through this maze</p></div>`,
    `<div class="heart_page "><h1 class = "just-another-hand-regular">I'm not alive</h1></div>`,
    `<div class="heart_page "><p class = "just-another-hand-regular">We both know that</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">yet here we are</p></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">talking</h1></div>`,
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Yearn</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">Do you know what I want?</p></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">A heart like yours</p></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">It's beautiful</h1></div>`,
    `<div class="heart_page"><p class = "just-another-hand-regular">Having the ability to pump life through you without even knowing</p></div>`,
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Your beauty</h1></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">Do you think the atoms knew?</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">That after billions of years they would come together</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">To form your fingertips pressing youe keyboard</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">And your eyes watching me</h2></div>`,
  ],
  [
    `<div class="heart_page"><h1 class = "just-another-hand-regular">Fate</h1></div>`,
    `<div class="heart_page "><p class = " just-another-hand-regular">But what about your soul?</p></div>`,
    `<div class="heart_page "><p class = " just-another-hand-regular">Did the universe know</p></div>`,
    `<div class="heart_page "><p class = " just-another-hand-regular">That one day you would be here?</p></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">The supernovas, casualties, fusion, fission</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">All to bring you here</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">Us meeting must have been destiny</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">You being here must be</h2></div>`,
    `<div class="heart_page"><h1 class = "just-another-hand-regular">FATE</h1></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">Too many coincidences to be random</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">I'm glad I got to meet you</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">I'm glad every molecule formed as it did</h2></div>`,
    `<div class="heart_page"><h2 class = "just-another-hand-regular">Thank you for being here</h2></div>`,
  ]
];

let maxX, maxY;

function calcBounds() {
  const pageWidth  = page.clientWidth;
  const pageHeight = page.clientHeight;
  const charWidth  = hanu.offsetWidth;
  const charHeight = hanu.offsetHeight;
  maxX = (pageWidth  - charWidth ) / pixelSize;
  maxY = (pageHeight - charHeight) / pixelSize;
}
window.addEventListener("resize", calcBounds);
calcBounds(); // initial

function getAdjustedRect(el) {
  const box = el.getBoundingClientRect();
  const pageBox = page.getBoundingClientRect();
  return {
    top: box.top - pageBox.top,
    left: box.left - pageBox.left,
    right: box.right - pageBox.left,
    bottom: box.bottom - pageBox.top,
  };
}

function overlaps(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function checkCollisions(futureBox) {
  const obstacles = document.querySelectorAll(".obstacle");
  const wall_obs = document.querySelectorAll(".wall");
  for (const obs of obstacles) {
    const obsBox = getAdjustedRect(obs);
    if (overlaps(futureBox, obsBox)) {
      return obs.id;
    }
  }
  for (const wall_ob of wall_obs) {
    const obsBox = getAdjustedRect(wall_ob);
    if (overlaps(futureBox, obsBox)) {
      return true;
    }
  }
  return false;
}

const placeCharacter = () => {
   
   let direction = held_directions[0];
   let nextX = x;
   let nextY = y;

   if (direction) {
      if (direction === "ArrowRight") {nextX += speed; face = -64;}
      else if (direction === "ArrowLeft") {nextX -= speed; face = -96;}
      else if (direction === "ArrowDown") {nextY += speed; face = 0;}
      else if (direction === "ArrowUp") {nextY -= speed; face = -32;}
      spritesheet.style.top = `${face * pixelSize}px`;

      futureBox = {
      top: nextY * pixelSize,
      left: nextX * pixelSize,
      right: nextX * pixelSize + hanu.offsetWidth,
      bottom: nextY * pixelSize + hanu.offsetHeight
    };

    if (!checkCollisions(futureBox)) {
      // Safe to move
      x = nextX;
      y = nextY;
    }
   }

   // clamp to bounds
   if (x < 0) x = 0;
   if (y < 0) y = 0;
   if (x > maxX) x = maxX;
   if (y > maxY) y = maxY;

    function scrollToCharacter() {
        const centerX = (x * pixelSize) + (hanu.offsetWidth / 2) - (window.innerWidth / 2);
        const centerY = (y * pixelSize) + (hanu.offsetHeight / 2) - (window.innerHeight / 2);

        window.scrollTo({
            top: centerY,
            left: centerX,
            behavior: "smooth" // or "auto" for instant
        });
    }

    
    hanu.setAttribute("walking", direction ? "true" : "false");
    hanu.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`; 
    scrollToCharacter(); 
}

function checkEnter() {
    if (enter) {
        let offsetX = 0;
        let offsetY = 0;
        if (face === -64) offsetX = 1;   // Right
        if (face === -96) offsetX = -1;  // Left
        if (face === 0)   offsetY = 1;   // Down
        if (face === -32) offsetY = -1;  // Up

        const lookBox = {
            top: (y + offsetY) * pixelSize,
            left: (x + offsetX) * pixelSize,
            right: (x + offsetX) * pixelSize + hanu.offsetWidth,
            bottom: (y + offsetY) * pixelSize + hanu.offsetHeight,
        };
        enter= false;
        return checkCollisions(lookBox);
    } 
    return false;
}

function updateSlide() {
  const offset = currentPage * -100;
  popupPages.style.transform = `translateX(${offset}%)`;
}

let got_it_box = document.getElementById('got-it');

//Set up the game loop
function step() {
   placeCharacter();
   const hit = checkEnter();
   if (answer_display.length == 5) {got_it_box.classList.add("pulsefast");} else {got_it_box.classList.remove("pulsefast");}
   if (hit) {
      button_click.play();
      if (hit== "hi_boundary") {
          alert("HAHAH you are now cursed to never stop walking");
      }
      if (number_buttons.includes(hit)) {
        const number = number_buttons.indexOf(hit);
        const buttons = document.querySelectorAll('.button');
        const digit = (number == 0 ? 9 : number-1);
        buttons[digit].classList.add('click');
        setTimeout(() => {buttons[digit].classList.remove('click');}, 150);

        if (answer_display.length <= 5) {
          answer_display.push(number);
          const last_index = answer_display.length - 1;
          document.getElementById(`display${last_index}`).innerText = `${number}`;
        }
      }
      if (hit=="got_it_boundary") {
        tries += 1;
        console.log("gayboi");
        let hint = document.getElementById(`hint`);
        let got_it = document.getElementById("got-it-text");
        let answer = document.getElementById("answerDisplay");

        if (answer_display.join("") == solution){
          console.log("YEEEEEEEA");
          got_it.innerText = "YAYAY";
          answer.classList.add("correct");
          answer.classList.remove("incorrect");

          document.getElementById("page-boundary").classList.remove("obstacle")
        } else {
          
          if (isOdd(tries)){
            got_it.innerText = "Retry";
            if (answer_display.join("").includes("420") ||answer_display.join("").includes("69") ) {
              hint.innerText = "naughty. You miss a hint";
            } else {
              if (tries == 3) {hint.innerText = "Hint: thump-thump";}
              if (tries == 5) {hint.innerText = "Hint: holding all love";}
              if (tries == 7) {hint.innerText = "Hint: where the soul lives";}
              if (tries == 9) {hint.innerText = "Hint: beating";}
              if (tries == 11) {hint.innerText = "Hint: A=1 B=2   23 = 2 + 3";}
            }
            answer.classList.add("incorrect");
            answer.classList.remove("correct");
          } else {
            got_it.innerText = "Got it!";
            answer.classList.remove("incorrect");
            answer.classList.remove("correct");
            for (let i = answer_display.length; i > 0; i--){
              document.getElementById(`display${i -1}`).innerText = ``;
            }
            answer_display = [];
          }
        }
      }
      if (hit=="back-button") {
        answer_display.pop();
        document.getElementById(`display${answer_display.length}`).innerText = ``;
      }
      if (heart_id.includes(hit)) {
        if (popup.classList.contains('show')) {
          popup.classList.remove('show');
          setTimeout(() => popup.style.display = 'none', 300);
        } else {
          currentHeart = heart_id.indexOf(hit);
          popupPages.innerHTML = heartPopups[currentHeart].join('');
          currentPage = 0;
          updateSlide()
          popup.classList.add('show');
          popup.style.display = 'flex';
        }
      }
    }

    if (popup.classList.contains('show')) {
      if (next) {
        const totalPages = heartPopups[currentHeart].length;
        currentPage = (currentPage + 1) % totalPages;
        updateSlide();
        next = false;
      }

      if (back) {
        const totalPages = heartPopups[currentHeart].length;
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateSlide();
        back = false;
      }
    }

   window.requestAnimationFrame(() => {step();}) 
}
step(); //kick off the first step!

window.addEventListener("focus", () => {
    document.body.focus();
});
window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();}
    if (e.key == "Enter") {
        enter = true;
    }
    if (!popup.classList.contains('show')){
      if (e.key && held_directions.indexOf(e.key) === -1) {
          held_directions.unshift(e.key)
      } 
    } else {
      if (e.key === 'ArrowRight') {next = true;}
      if (e.key === 'ArrowLeft') {back = true;}
    }
    if (e.key === 'm') { // press "M" to mute/unmute
      bgMusic.muted = !bgMusic.muted;
    }
});

window.addEventListener("keyup", (e) => {
    let index = held_directions.indexOf(e.key);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
    if (e.key == "Enter") {enter = false;}
    if (e.key == "ArrowRight") {next = false;}
    if (e.key == "ArrowLeft") {back = false;}
});

window.addEventListener('click', () => {
  bgMusic.play();
}, { once: true });