const pickle = document.getElementById('pickle');
const scoreEl = document.getElementById('score');
const highscoreEl = document.getElementById('highscore');
const multiplierEl = document.getElementById('multiplier');
const gameArea = document.getElementById('game-area');
const colorPicker = document.getElementById('pickleColor');
const bgMusic = document.getElementById('bgMusic');
const milestoneSound = document.getElementById('milestoneSound');

let score = 0;
let highscore = localStorage.getItem('highscore') || 0;
highscoreEl.textContent = highscore;

let holding = false;
let pickleY = 20;
let objects = [];
let multiplier = 1;
let milestones = [1000, 10000, 50000, 100000];
let lastMilestone = 0;
let trailActive = false;

bgMusic.volume = 0.15;
bgMusic.play();

colorPicker.addEventListener('input', () => {
  pickle.style.background = colorPicker.value;
});

document.addEventListener('keydown', e => { if (e.code === 'Space') holding = true; });
document.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    holding = false;
    score = 0;
    pickleY = 20;
    multiplier = 1;
    lastMilestone = 0;
    multiplierEl.textContent = multiplier;
    pickle.style.bottom = pickleY + 'px';
    objects.forEach(obj => obj.remove());
    objects = [];
  }
});

function spawnCloud(y) {
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  cloud.style.bottom = y + 'px';
  cloud.style.left = Math.random() * 500 + 'px';
  gameArea.appendChild(cloud);
  objects.push(cloud);
}

function spawnRainbow(y) {
  if (Math.random() > 0.01) return; // 1% chance
  const rainbow = document.createElement('div');
  rainbow.className = 'rainbow';
  rainbow.style.bottom = y + 'px';
  rainbow.style.left = Math.random() * 500 + 'px';
  gameArea.appendChild(rainbow);
  objects.push(rainbow);
  spawnParticles(parseFloat(rainbow.style.left)+50, y+15);
}

function spawnParticles(x, y) {
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + Math.random() * 20 - 10 + 'px';
    particle.style.bottom = y + Math.random() * 20 - 10 + 'px';
    particle.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
    gameArea.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

function activateTrail() {
  trailActive = true;
  const trailInterval = setInterval(() => {
    if (!trailActive) return clearInterval(trailInterval);
    spawnParticles(275, gameArea.clientHeight/2);
  }, 100);
  setTimeout(() => trailActive = false, 2000);
}

function showMultiplierPopup(multiplier) {
  const popup = document.createElement('div');
  popup.className = 'multiplier-popup';
  popup.textContent = `Multiplier x${multiplier}!`;
  gameArea.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
  // Change pickle expression on milestone
  pickle.querySelector('.mouth').style.height = '8px';
  setTimeout(()=> pickle.querySelector('.mouth').style.height='4px', 1000);
}

function check
