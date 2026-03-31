const deck = document.getElementById("tarotDeck");
const selectedCard = document.getElementById("selectedCard");

const totalGhostCards = 78;
const ghostCards = [];
let busy = false;

// real data
const DATA_URL = "./cards.json";
let realCards = [];
let deckLoaded = false;
let currentSelection = null;

const cardImg = document.getElementById("cardImg");
const cardNameEl = document.getElementById("cardName");
const cardMeaningEl = document.getElementById("cardMeaning");
const cardAdviceEl = document.getElementById("cardAdvice");

async function loadDeck() {
    if (deckLoaded) return realCards;

    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL}: ${res.status}`);

    const data = await res.json();
    realCards = data.cards || [];
    if (!realCards.length) throw new Error("No cards found in tarot-cards.json");

    deckLoaded = true;
    return realCards;
}


function pickRandom() {
    const i = Math.floor(Math.random() * realCards.length);
    return realCards[i];
}

function hideSelection() {
    cardImg.src = "";
    cardNameEl.textContent = "";
    cardMeaningEl.textContent = "";
    cardAdviceEl.textContent = "";
}


const cardModal = document.getElementById("cardModal");
const closeModal = document.getElementById("closeModal");

function openCardModal() {
    cardModal.classList.remove("hide");
    selectedCard.style.display = "flex";
}

function closeCardModal() {
    cardModal.classList.add("hide");
}

closeModal.addEventListener("click", closeCardModal);

cardModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modalOverlay")) {
        closeCardModal();
    }
});

function reveal() {
    if (!currentSelection) return;
    cardImg.src = currentSelection.image || "";
    cardNameEl.textContent = currentSelection.name || "";
    cardMeaningEl.textContent = currentSelection.meaning || "";
    cardAdviceEl.textContent = currentSelection.advice || "";
    openCardModal();
}

// creating ghost cards
for (let i = 0; i < totalGhostCards; i++) {
    const el = document.createElement("div");
    el.className = "card";
    deck.appendChild(el);

    ghostCards.push({
        el,
        x: 0,
        y: 0,
        rotation: 0,
        z: i
    });
}

function renderCard(card) {
    card.el.style.transform =
        `translate(-50%, -50%) translate(${card.x}px, ${card.y}px) rotate(${card.rotation}deg)`;
    card.el.style.zIndex = card.z;
}

// render the original stack
function renderStack() {
    ghostCards.forEach((card, i) => {
        const baseY = -i * 0.12;

        card.x = (Math.random() - 0.5) * 14;
        card.y = baseY + (Math.random() - 0.5) * 8;
        card.rotation = (Math.random() - 0.5) * 10;
        card.z = i;

        card.el.style.opacity = "1";
        renderCard(card);
    });
}

// shuffle when click the stack
function shuffleThenDraw() {
    if (busy) return;
    busy = true;

    hideSelection();
    const shuffleDuration = 1300;

    ghostCards.forEach((card, i) => {
        const startX = card.x;
        const startY = card.y;
        const startRot = card.rotation;

        const jitterX = startX + (Math.random() - 0.5) * 36;
        const jitterY = startY + (Math.random() - 0.5) * 18;
        const jitterRot = startRot + (Math.random() - 0.5) * 20;

        card.el.animate(
            [
                {
                    transform: `translate(-50%, -50%) translate(${startX}px, ${startY}px) rotate(${startRot}deg)`
                },
                {
                    transform: `translate(-50%, -50%) translate(${jitterX}px, ${jitterY}px) rotate(${jitterRot}deg)`
                },
                {
                    transform: `translate(-50%, -50%) translate(${startX}px, ${startY}px) rotate(${startRot}deg)`
                }
            ],
            {
                duration: shuffleDuration,
                delay: i * 3,
                easing: "ease-in-out",
                fill: "forwards"
            }
        );
    });

    setTimeout(() => {
        currentSelection = pickRandom();
        reveal();
        busy = false;
    }, shuffleDuration + 180);
}

deck.addEventListener("click", shuffleThenDraw);

renderStack();
loadDeck();
