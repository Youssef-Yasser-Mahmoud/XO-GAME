import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  board = signal<string[][]>([]);
  currentPlayer = signal<'X' | 'O'>('X');
  winner = signal<'X' | 'O' | null>(null);
  isDraw = signal<boolean>(false);

  showResult = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.board.set([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    this.currentPlayer.set('X');
    this.winner.set(null);
    this.isDraw.set(false);
    this.showResult.set(false);
  }

  makeMove(row: number, col: number): void {
    if (this.board()[row][col] || this.winner()) {
      return;
    }

    this.board()[row][col] = this.currentPlayer();

    if (this.checkWinner()) {
      this.winner.set(this.currentPlayer() as 'X' | 'O');
      this.showResult.set(true);
    } else if (this.checkDraw()) {
      this.isDraw.set(true);
      this.showResult.set(true);
    } else {
      this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X');
    }
  }

  checkWinner(): boolean {
    const b = this.board();

    for (let i = 0; i < 3; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return true;
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return true;
    }

    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return true;
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return true;

    return false;
  }

  checkDraw(): boolean {
    for (let row of this.board()) {
      for (let cell of row) {
        if (cell === '') return false;
      }
    }
    return true;
  }

  get resultTitle(): string {
    if (this.winner) return `Winner is ${this.winner}! 🎉`;
    if (this.isDraw()) return `It's a Draw! 🤝`;
    return '';
  }

  get winnerBadgeClasses(): Record<string, boolean> {
    return {
      'bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-500/30':
        this.winner() === 'X',
      'bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30':
        this.winner() === 'O',
    };
  }

  closeModal(): void {
    this.showResult.set(false);
  }

  playAgain(): void {
    this.initializeGame();
  }
}
