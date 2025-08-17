import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',

})
export class CardComponent implements OnInit {
  board: string[][] = [];
  currentPlayer: string = '';
  winner: 'X' | 'O' | null = null;
  isDraw: boolean = false;


  showResult: boolean = false;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
    this.showResult = false;
  }

  makeMove(row: number, col: number): void {
    if (this.board[row][col] || this.winner) {
      return; 
    }

    this.board[row][col] = this.currentPlayer;

    if (this.checkWinner()) {
      this.winner = this.currentPlayer as 'X' | 'O';
      this.showResult = true;
    } else if (this.checkDraw()) {
      this.isDraw = true;
      this.showResult = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(): boolean {
    const b = this.board;

    for (let i = 0; i < 3; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return true;
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return true;
    }

    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return true;
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return true;

    return false;
  }

  checkDraw(): boolean {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === '') return false;
      }
    }
    return true;
  }

  get resultTitle(): string {
    if (this.winner) return `Winner is ${this.winner}! 🎉`;
    if (this.isDraw) return `It's a Draw! 🤝`;
    return '';
  }

  get winnerBadgeClasses(): Record<string, boolean> {
    return {
      'bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-500/30': this.winner === 'X',
      'bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30': this.winner === 'O'
    };
  }

  closeModal(): void {
    this.showResult = false;
  }

  playAgain(): void {
    this.initializeGame();
  }
}
