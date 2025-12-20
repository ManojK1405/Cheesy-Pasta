import { Chess } from "chess.js";

export class Game {
  constructor() {
    this.chess = new Chess();
    this.players = [];
    this.turn = "w";
  }
}
