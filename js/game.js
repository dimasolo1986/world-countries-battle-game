import { localization } from "../localization/ua.js";
export class Game {
  id;
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }
  initGame() {
    this.id = crypto.randomUUID();
  }
}
