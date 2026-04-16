import { GEOGRAPHICAL_CENTER } from "../config.js";
import { GameConfig } from "../gameConfig.js";
import { Game } from "../game.js";
import { Player } from "../player.js";
import { PlayMap } from "../playMap.js";
class gameView {
  _parentElement = document.querySelector("#countriesBattleGamePlay");
  _gameMessageField = document.querySelector(".countries-battle-game-message");
  _gameConfiguration;
  _playMap;
  _playerOne;
  _playerTwo;
  _game;

  initGameView(firebase) {
    this._gameConfiguration = new GameConfig("default");
    this._playMap = new PlayMap(
      "playMap",
      this._gameConfiguration,
      "player-one-selected-countries-container",
      "player-one-countries-number",
      "player-two-selected-countries-container",
      "player-two-countries-number",
      "Your Map",
      GEOGRAPHICAL_CENTER
    );
    this._playerOne = new Player(
      this._playMap,
      "player-one-selected-countries-container",
      "player-one-countries-number",
      this._gameConfiguration,
      "userPlayer"
    );
    this._playerTwo = new Player(
      this._playMap,
      "player-two-selected-countries-container",
      "player-two-countries-number",
      this._gameConfiguration,
      this._gameConfiguration.gameMode === "computer"
        ? "computerPlayer"
        : "friendPlayer"
    );
    this._playerOne.setOpponentPlayer(this._playerTwo);
    this._playerTwo.setOpponentPlayer(this._playerOne);
    this._game = new Game(
      this._playerOne,
      this._playerTwo,
      this._playMap,
      this._gameConfiguration.gameMode === "computer" ? undefined : firebase,
      this._gameConfiguration
    );
    firebase.setGame(this._game);
    this._playMap.setGame(this._game);
    this._playMap.setPlayerOne(this._playerOne);
    this._playMap.setPlayerTwo(this._playerTwo);
    this._playerOne.setGame(this._game);
    this._playerTwo.setGame(this._game);
    this._playerOne.initData();
    this._playerTwo.initData();
    this._playerOne.requestSelectedCountriesFromOpponent();
  }

  showGame() {
    this._parentElement.classList.remove("not-displayed");
    this._playMap.map.invalidateSize();
  }

  hideGame() {
    this._parentElement.classList.add("not-displayed");
  }
}

export default new gameView();
