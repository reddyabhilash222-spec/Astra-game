
let players = [];
let scores = [0,0,0,0];
let currentPlayer = 0;
let selectedCard = null;
let tableCards = [];

const sampleDeck = [
  { name: "Agneyāstra", power: 8 },
  { name: "Vāyavyāstra", power: 6 },
  { name: "Indrāstra", power: 7 },
  { name: "Māyāstra", power: 5 }
];

function show(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screen).classList.add("active");
}

function goToSetup() {
  show("setup");
}

function startGame() {
  players = [
    p1.value, p2.value, p3.value, p4.value
  ];
  if (players.some(p => p === "")) {
    alert("All 4 players required");
    return;
  }
  updateScoreboard();
  dealHand();
  show("game");
}

function updateScoreboard() {
  let sb = players.map((p,i)=>`${p}: ${scores[i]} VP`).join(" | ");
  document.getElementById("scoreboard").innerText = sb;
}

function dealHand() {
  const hand = document.getElementById("hand");
  hand.innerHTML = "";
  sampleDeck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = `${card.name}\nPower: ${card.power}`;
    div.onclick = () => selectCard(div, card);
    hand.appendChild(div);
  });
}

function selectCard(div, card) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  div.classList.add("selected");
  selectedCard = card;
}

function playCard() {
  if (!selectedCard) return alert("Select a card");
  tableCards.push({player: currentPlayer, card: selectedCard});
  document.querySelectorAll(".slot")[currentPlayer].innerText = "🂠";
  selectedCard = null;
  currentPlayer++;

  if (currentPlayer === 4) {
    reveal();
  }
}

function reveal() {
  let highest = tableCards[0];
  tableCards.forEach(c => {
    if (c.card.power > highest.card.power) highest = c;
  });

  scores[highest.player]++;
  updateScoreboard();

  document.getElementById("resultText").innerText =
    `${players[highest.player]} wins the round!`;

  document.getElementById("result").style.display = "block";
}

function nextRound() {
  tableCards = [];
  currentPlayer = 0;
  document.querySelectorAll(".slot").forEach(s => s.innerText = "?");
  document.getElementById("result").style.display = "none";
}
