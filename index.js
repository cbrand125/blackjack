const readlineSync = require('readline-sync');

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

  /**
   * represents this card as a string and returns it
   * @return {string} representation of this card showing rank and suit
   */
  cardToString() {
    return `${this.rank}${this.suit}`;
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

  /**
   * shuffles this deck of cards, putting them in a random order
   */
  shuffle() {
    this.cards.sort(() => Math.random() * 2 - 1);
  }

  /**
   * draws a card from this deck by removing it from the deck and returning it
   * @return {Card} the card removed from this deck
   */
  draw() {
    return this.cards.pop();
  }
}

class Player {
  constructor() {
    this.hand = [];
  }

  /**
   * adds a card to the player's hand from a deck
   * @param {Deck} cardDeck the deck of cards for the player to take from
   */
  takeCard(cardDeck) {
    this.hand.push(cardDeck.draw());
  }

  /**
   * calculates the point value of this player's hand and returns that number
   * @return {number} represents the total blackjack point value of this player's hand
   */
  calculateHandValue() {
    return this.hand.reduce((total, curr) => total + curr.value, 0);
  }

  /**
   * represents the player's hand as a string and returns it
   * @return {string} a printable representation of this player's current hand
   */
  handToString() {
    return this.hand.map(card => `${card.cardToString()}`).join(' ');
  }

  /**
   * gets the last card added to this player's hand
   * @return {Card} gets the last card added to this player's hand
   */
  getLastCard() {
    return this.hand[this.hand.length - 1];
  }
}

let continuePlaying = true;
while (continuePlaying) {
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

  let takeHit = true;
  while (takeHit) {
    takeHit = readlineSync.keyInYNStrict('Would you like to hit?');
    if (takeHit) {
      currentPlayer.takeCard(deck);
      console.log(
        `\nPlayer takes a card: ${currentPlayer.getLastCard().cardToString()}`
      );
      console.log("\nPLAYER'S HAND");
      console.log(`${currentPlayer.handToString()}`);
      console.log(`Value: ${currentPlayer.calculateHandValue()}\n`);
    }
    if (currentPlayer.calculateHandValue() >= 21) {
      takeHit = false;
    }
  }

  const isPlayerBusted = currentPlayer.calculateHandValue() > 21;
  if (isPlayerBusted) {
    console.log('PLAYER BUST! DEALER WINS!');
  } else {
    while (currentDealer.calculateHandValue() <= 17) {
      currentDealer.takeCard(deck);
      console.log(
        `\nDealer takes a card: ${currentDealer.getLastCard().cardToString()}`
      );
      console.log("\nDEALER'S HAND");
      console.log(`${currentDealer.handToString()}`);
      console.log(`Value: ${currentDealer.calculateHandValue()}\n`);
    }

    const isDealerBusted = currentDealer.calculateHandValue() > 21;
    if (isDealerBusted) {
      console.log('DEALER BUST! PLAYER WINS!');
    } else {
      console.log(`\n${resultToString(currentPlayer, currentDealer)}\n`);
    }
  }
  continuePlaying = readlineSync.keyInYNStrict('Would you like to play again?');
}

/**
 * determines the winner between a player and the dealer by returning an output string
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
