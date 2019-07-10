class Card {
  constructor(rank, suit) {
    this.suit = suit;
    this.rank = rank; // 2-10, 'J', 'Q', 'K', 'A'
    this.value = this.calculateValue(rank);
  }

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

  takeCard(deck) {
    this.hand.push(deck.draw());
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
let dealer = new Player();
dealer.takeCard(deck);
dealer.takeCard(deck);
let player = new Player();
player.takeCard(deck);
player.takeCard(deck);

console.clear();
console.log(`♣♥♦♠ BLACKJACK ♠♦♥♣`);
console.log(`===================\n\n`);
console.log(`Dealer's Hand Worth ${dealer.calculateHandValue()}:`);
console.log(`${dealer.handToString()}\n`);
console.log(`Player's Hand Worth ${player.calculateHandValue()}:`);
console.log(`${player.handToString()}\n`);
console.log(`\n${resultToString(player, dealer)}\n`);

function resultToString(player, dealer) {
  let playerVal = player.calculateHandValue();
  let dealerVal = dealer.calculateHandValue();
  if (playerVal > dealerVal) {
    return 'PLAYER WINS!';
  } else if (playerVal < dealerVal) {
    return 'DEALER WINS!';
  } else {
    return "IT'S A DRAW";
  }
}
