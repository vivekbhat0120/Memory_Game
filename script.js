// Select all elements with the class "card"
const cards = document.querySelectorAll(".card");

let matchedCard = 0;  // Counter to track matched card pairs
let cardOne, cardTwo; // Variables to store selected cards
let disableDeck = false; // Flag to prevent multiple card flips at the same time

// Function to handle card flip
function flipCard(e) {
    let clickedCard = e.target.closest(".card"); // Ensure we get the card element
    if (!clickedCard || clickedCard === cardOne || disableDeck) return; // Prevent re-clicking the same card or clicking during animation

    clickedCard.classList.add("flip"); // Add "flip" class to reveal the card

    if (!cardOne) { // If it's the first selected card, store it
        cardOne = clickedCard;
        return;
    }

    cardTwo = clickedCard; // Store second selected card
    disableDeck = true; // Temporarily disable further clicks

    // Get the image source of both selected cards
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;

    matchCards(cardOneImg, cardTwoImg); // Check if the cards match
}

// Function to check if selected cards match
function matchCards(img1, img2) {      
    if (img1 === img2) { // If both cards have the same image
        matchedCard++;  // Increment matched pairs count

        // If all pairs are matched (8 pairs = 16 cards)
        if (matchedCard == 8) {
            setTimeout(() => shuffleCard(), 1000);  // Restart the game after 1 second
        }

        // Remove click event to prevent re-flipping matched cards
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetCards(); // Reset for next selection
        return;
    }

    // If cards do not match, add shake effect for 400ms
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Remove "flip" and "shake" class after 1.2 seconds to hide cards again
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        resetCards(); // Reset for next selection
    }, 1200);
}

// Function to reset selected cards
function resetCards() {
    [cardOne, cardTwo] = [null, null]; // Reset selected cards
    disableDeck = false; // Enable card clicks again
}

// Function to shuffle and restart the game
function shuffleCard() {
    matchedCard = 0; // Reset matched card count
    disableDeck = false; // Allow clicks again

    // Create an array with paired numbers for matching
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Randomly shuffle the array

    // Assign shuffled images to cards
    cards.forEach((card, index) => {
        card.classList.remove("flip"); // Remove flip class to reset cards
        let imgTag = card.querySelector("img");
        imgTag.src = `img/img-${arr[index]}.png`; // Assign shuffled images

        // Remove old event listeners and add new ones
        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard(); // Call function to start the game
