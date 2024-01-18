import { Injectable } from '@angular/core';
import { DeckService } from '../deck/deck.service';
import { Card } from '../../models/card.model'

@Injectable({
  providedIn: 'root',
})
export class BlackjackService {
  private deck: Card[] = [];
  private playerHand: Card[] = [];
  private dealerHand: Card[] = [];
  private isGameStarted: boolean = false;
  private isGameOver: boolean = false;

  constructor(private deckService: DeckService) {}

  startGame(): void {
    this.deck = this.deckService.generateDeck();
    this.shuffleDeck();
    this.dealInitialHands();
    this.isGameStarted = true;
    this.isGameOver = false;
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private dealInitialHands(): void {
    this.playerHand = this.drawCards(2);
    this.dealerHand = this.drawCards(2);
  }

  private drawCards(count: number): Card[] {
    const drawnCards = this.deck.splice(0, count);
    return drawnCards;
  }

  getPlayerHand(): Card[] {
    return this.playerHand;
  }

  getDealerHand(): Card[] {
    return this.dealerHand;
  }

  onGameStarted(): boolean {
    return this.isGameStarted;
  }

  onGameOver(): boolean {
    return this.isGameOver;
  }

  hit(): void {
    if (!this.isGameOver) {
      this.playerHand.push(...this.drawCards(1));
      this.checkPlayerBust();
    }
  }

  stand(): void {
    if (!this.isGameOver) {
      this.dealerTurn();
      this.determineWinner();
      this.isGameOver = true;
    }
  }

  private dealerTurn(): void {
    while (this.calculateHandValue(this.dealerHand) < 17) {
      this.dealerHand.push(...this.drawCards(1));
    }
  }

  private calculateHandValue(hand: Card[]): number {
    let value = hand.reduce((sum, card) => sum + card.value, 0);

    // Handle Aces
    let numAces = hand.filter((card) => card.rank === 'A').length;
    while (value > 21 && numAces > 0) {
      value -= 10;
      numAces--;
    }

    return value;
  }

  private checkPlayerBust(): void {
    if (this.calculateHandValue(this.playerHand) > 21) {
      this.isGameOver = true;
    }
  }

  private determineWinner(): void {
    const playerValue = this.calculateHandValue(this.playerHand);
    const dealerValue = this.calculateHandValue(this.dealerHand);

    if (playerValue > 21) {
      // Player busts, dealer wins
      console.log('Player busts! Dealer wins.');
    } else if (dealerValue > 21) {
      // Dealer busts, player wins
      console.log('Dealer busts! Player wins.');
    } else if (playerValue > dealerValue) {
      // Player has higher value, player wins
      console.log('Player wins!');
    } else if (dealerValue > playerValue) {
      // Dealer has higher value, dealer wins
      console.log('Dealer wins.');
    } else {
      // It's a tie
      console.log('It\'s a tie!');
    }
  }
}
