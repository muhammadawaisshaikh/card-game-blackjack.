import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BlackjackService } from './services/black-jeck/black-jeck.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  playerHand: any = [];
  dealerHand: any = [];

  constructor(private blackjackService: BlackjackService) { }

  startGame(): void {
    this.blackjackService.startGame();
    this.playerHand = this.blackjackService.getPlayerHand();
    this.dealerHand = this.blackjackService.getDealerHand();
  }

  hit(): void {
    this.blackjackService.hit();
    this.playerHand = this.blackjackService.getPlayerHand();
  }

  stand(): void {
    this.blackjackService.stand();
    this.dealerHand = this.blackjackService.getDealerHand();
  }

  isGameStarted(): boolean {
    return this.blackjackService.onGameStarted();
  }

  isGameOver(): boolean {
    return this.blackjackService.onGameOver();
  }
}
