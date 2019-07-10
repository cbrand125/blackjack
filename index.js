class Card {
  constructor(rank, suit) {
    this.suit = suit;
    this.rank = rank;
    this.value = this.calculateValue(rank);
  }

  /**
   * determines the blackjack point value of the card
   * @param {string} rank of the card (i.e. A, J, 2, 10, ...)
   * @return {number} the point value for this rank
   */
  calculateValue(rank) {
    const rankVal = parseInt(rank);
    if (rankVal) return rankVal;
    if (rank === 'A') return 11;
    return 10;
  }
}

class Deck {
  constructor() {
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A'
    ];
    const suits = ['♠', '♦', '♥', '♣'];

    // populate deck by creating a card for each combination of rank and suit
    this.cards = [];
    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        this.cards.push(new Card(ranks[i], suits[j]));
      }
    }
  }

  shuffle() {
    this.cards.sort(() => Math.random() * 2 - 1);
  }

  draw() {
    return this.cards.pop();
  }
}

class Player {
  constructor() {
    this.hand = [];
  }

  takeCard(cardDeck) {
    this.hand.push(cardDeck.draw());
  }

  calculateHandValue() {
    return this.hand.reduce((total, curr) => total + curr.value, 0);
  }

  handToString() {
    return this.hand.map(card => `${card.rank}${card.suit}`).join(' ');
  }
}

const deck = new Deck();
deck.shuffle();
const currentDealer = new Player();
currentDealer.takeCard(deck);
currentDealer.takeCard(deck);
const currentPlayer = new Player();
currentPlayer.takeCard(deck);
currentPlayer.takeCard(deck);

console.clear();
console.log(`♣♥♦♠ BLACKJACK ♠♦♥♣`);
console.log(`===================\n\n`);
console.log("DEALER'S HAND");
console.log(`${currentDealer.handToString()}`);
console.log(`Value: ${currentDealer.calculateHandValue()}\n`);
console.log("PLAYER'S HAND");
console.log(`${currentPlayer.handToString()}`);
console.log(`Value: ${currentPlayer.calculateHandValue()}\n`);
console.log(`\n${resultToString(currentPlayer, currentDealer)}\n`);

/**
 * determines the winner between a player and the dealer by returninig an output string
 * @param {Player} player represents the current player playing
 * @param {Player} dealer represents the current dealer playing
 * @return {string} a printable message determining the winner of blackjack
 */
function resultToString(player, dealer) {
  const playerVal = player.calculateHandValue();
  const dealerVal = dealer.calculateHandValue();
  if (playerVal > dealerVal) {
    return 'PLAYER WINS!';
  }
  if (playerVal < dealerVal) {
    return 'DEALER WINS!';
  }
  return "IT'S A DRAW";
}
