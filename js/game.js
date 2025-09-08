import { localization } from "./localization/ua.js";
export class Game {
  id;
  finished = false;
  constructor(playerOne, playerTwo, playMap) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playMap = playMap;
  }
  initGame() {
    this.id = crypto.randomUUID();
  }

  finishGame() {}

  playHit() {
    if (this.playerOne.playerAttemptToGuess) {
      this.playerOne.playerHit();
    } else {
      this.playerTwo.playerHit();
    }
  }

  startGame() {
    this.playMap.initStartPlayMapView();
    this.playerOne.playerHit();
  }
}
