import { Injectable } from '@angular/core';
import { Card } from '../../models/card.model'

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private suits: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  private ranks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  generateDeck(): Card[] {
    const deck: Card[] = [];

    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        const value = this.calculateCardValue(rank);
        deck.push({ suit, rank, value });
      }
    }

    return deck;
  }

  private calculateCardValue(rank: string): number {
    if (['K', 'Q', 'J'].includes(rank)) {
      return 10;
    } else if (rank === 'A') {
      return 11; // Aces initially considered as 11, can be adjusted later
    } else {
      return parseInt(rank, 10);
    }
  }
}
