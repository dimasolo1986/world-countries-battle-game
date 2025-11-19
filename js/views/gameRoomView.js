import { localization } from "../localization/ua.js";
import * as model from "../model.js";
import { generateRoomId } from "../helpers.js";
import { Firebase } from "../firebase.js";
class gameRoomView {
  _parentElement = document.querySelector("#create-game-room-page");
  _firebase;

  constructor() {
    this._firebase = new Firebase();
  }
  _gameRoomCreateButton = document.querySelector(".create-game-room");
  _gameRoomDeleteButton = document.querySelector(".delete-game-room");
  _gameRoomInputLink = document.querySelector("#roomIdInput");
  _gameLinkForFriendLabel = document.querySelector(
    "#game-link-for-friend-label"
  );
  _gameRoomGameConfigurationHeader = document.querySelector(
    "#game-configuration-header-game-room"
  );
  _gameRoomOnlyIndependentCountriesCheckboxLabel = document.querySelector(
    "#only-independent-countries-checkbox-label-game-room"
  );
  _gameRoomOnlyIndependentCountriesCheckbox = document.querySelector(
    "#only-independent-countries-checkbox-game-room"
  );
  _gameRoomInstructionHeader = document.querySelector(
    "#game-room-instruction-header"
  );
  _gameRoomInstructionText = document.querySelector(
    "#game-room-instruction-text"
  );
  _gameRoomCopyLink = document.querySelector(".copy-to-clipboard-link");
  _gameRoomCopyToClipboardLabel = document.querySelector(
    "#copy-to-clipboard-label"
  );
  _gameShareLink = document.querySelector(".share-game-room");

  _gameRoomReturnBack = document.querySelector(".return-game-room");
  _gameRoomImportantHeader = document.querySelector(".game-room-important");
  _gameRoomImportantDescription = document.querySelector(
    ".game-room-important-description"
  );
  _startButton = document.querySelector("#start-button-game-room");

  _returnBackListenerAdded = false;
  _startButtonListenerAdded = false;
  _gameRoomCreateListenerAdded = false;
  _gameRoomDeleteListenerAdded = false;
  _gameRoomCopyLinkListenerAdded = false;
  _gameRoomShareLinkListenerAdded = false;
  _onlyIndependentCountriesListenerAdded = false;

  addOnlyIndependentCountriesListener() {
    if (!this._onlyIndependentCountriesListenerAdded) {
      this._gameRoomOnlyIndependentCountriesCheckbox.addEventListener(
        "change",
        () => {
          document.getElementById(
            "only-independent-countries-checkbox"
          ).checked = this._gameRoomOnlyIndependentCountriesCheckbox.checked;
        }
      );
      this._onlyIndependentCountriesListenerAdded = true;
    }
  }

  returnBack(mainView, aboutView, gameRulesView, donateAuthorView) {
    this._gameRoomCopyToClipboardLabel.textContent = " ";
    this.hideGameRoomProject();
    mainView.showMain();
    donateAuthorView.hideDonateProject();
    aboutView.hideAboutProject();
    gameRulesView.hideGameRulesProject();
    sessionStorage.setItem("currentWindow", "main");
  }

  async createGameRoom() {
    const spinner = document.getElementById("gameRoomLoaderSpinner");
    spinner.classList.remove("not-displayed");
    const gameRoomId = generateRoomId();
    const onlyIndependentCountriesCheckbox = document.getElementById(
      "only-independent-countries-checkbox"
    );
    onlyIndependentCountriesCheckbox.disabled = true;
    this._gameRoomOnlyIndependentCountriesCheckbox.disabled = true;
    const gameUrl =
      window.location.href +
      `?gameRoom=${gameRoomId}&allCountries=${
        onlyIndependentCountriesCheckbox.checked ? false : true
      }`;
    try {
      await this._firebase.initializeApplication();
      this._firebase.getApplicationDatabase();
      await this._firebase.createConnection();
      this._firebase.setIsHost(true);
      await this._firebase.createGameRoom(gameRoomId);
      this._firebase.setGameRoomId(gameRoomId);
      this._startButton.disabled = false;
    } catch (err) {
      this._gameRoomInputLink.value =
        localization[model.worldCountries.language][
          "Failed to create game room with ID:"
        ] + ` ${gameRoomId}`;
      return;
    }
    this._gameRoomInputLink.value = gameUrl;
    sessionStorage.setItem("game-room", gameRoomId);
    this._gameRoomCopyToClipboardLabel.textContent = " ";
    this._gameRoomCreateButton.disabled = true;
    spinner.classList.add("not-displayed");
    this._gameRoomDeleteButton.disabled = false;
    this._gameRoomCopyLink.disabled = false;
    this._gameShareLink.disabled = false;
    const createGameRoomButton = document.querySelector(
      "#create-game-room-button"
    );
    createGameRoomButton.textContent =
      localization[model.worldCountries.language]["Open Game Room"];
    const gameRoomHeadingContainer = document.querySelector(
      "#game-room-heading-container"
    );
    gameRoomHeadingContainer.classList.remove("not-displayed");
    document.querySelector("#game-room-heading-id").textContent = gameRoomId;
  }

  async deleteGameRoom() {
    this._gameRoomInputLink.value = "";
    this._gameRoomCopyToClipboardLabel.textContent = " ";
    this._gameRoomCreateButton.disabled = false;
    this._gameRoomDeleteButton.disabled = true;
    this._gameRoomCopyLink.disabled = true;
    this._gameShareLink.disabled = true;
    const onlyIndependentCountriesCheckbox = document.getElementById(
      "only-independent-countries-checkbox"
    );
    onlyIndependentCountriesCheckbox.disabled = false;
    this._gameRoomOnlyIndependentCountriesCheckbox.disabled = false;
    const gameRoomId = sessionStorage.getItem("game-room");
    if (gameRoomId) {
      try {
        await this._firebase.initializeApplication();
        this._firebase.getApplicationDatabase();
        await this._firebase.createConnection();
        await this._firebase.deleteGameRoom(gameRoomId);
        this._firebase.sendMessage(JSON.stringify({ type: "deleteGameRoom" }));
        await this._firebase.cleanupResources(true);
        this._gameRoomCopyToClipboardLabel.style.color = "red";
        this._gameRoomCopyToClipboardLabel.textContent =
          localization[model.worldCountries.language]["Game Room Deleted:"] +
          ` ${gameRoomId}`;
      } catch (err) {
        this._gameRoomCopyToClipboardLabel.textContent =
          localization[model.worldCountries.language][
            "Failed to delete game room with ID:"
          ] + ` ${gameRoomId}`;
        this._gameRoomCopyToClipboardLabel.style.color = "red";
        return;
      }
    }
    sessionStorage.removeItem("game-room");
    this._startButton.disabled = true;
    const createGameRoomButton = document.querySelector(
      "#create-game-room-button"
    );
    createGameRoomButton.textContent =
      localization[model.worldCountries.language]["Create Game Room"];
    const gameRoomHeadingContainer = document.querySelector(
      "#game-room-heading-container"
    );
    gameRoomHeadingContainer.classList.add("not-displayed");
    document.querySelector("#game-room-heading-id").textContent = "";
  }

  copyLink() {
    this.copyText(this._gameRoomInputLink.value);
  }

  async copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        this._gameRoomCopyToClipboardLabel.textContent =
          localization[model.worldCountries.language]["Game Link Copied"];
        this._gameRoomCopyToClipboardLabel.style.color = "green";
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        this._gameRoomCopyToClipboardLabel.textContent =
          localization[model.worldCountries.language]["Game Link Copied"];
      }
    } catch (err) {
      this._gameRoomCopyToClipboardLabel.textContent =
        localization[model.worldCountries.language]["Copy Error"];
      this._gameRoomCopyToClipboardLabel.style.color = "red";
    }
  }

  addGameRoomCopyLinkHandlerClick() {
    if (!this._gameRoomCopyLinkListenerAdded) {
      this._gameRoomCopyLink.addEventListener(
        "click",
        this.copyLink.bind(this)
      );
      this._gameRoomCopyLinkListenerAdded = true;
    }
  }

  addGameRoomCreateListenerHandlerClick() {
    if (!this._gameRoomCreateListenerAdded) {
      this._gameRoomCreateButton.addEventListener(
        "click",
        this.createGameRoom.bind(this)
      );
      this._gameRoomCreateListenerAdded = true;
    }
  }

  addGameRoomDeleteListenerHandlerClick() {
    if (!this._gameRoomDeleteListenerAdded) {
      this._gameRoomDeleteButton.addEventListener(
        "click",
        this.deleteGameRoom.bind(this)
      );
      this._gameRoomDeleteListenerAdded = true;
    }
  }

  addShareLinkHandlerClick() {
    if (!this._gameRoomShareLinkListenerAdded) {
      this._gameShareLink.addEventListener(
        "click",
        function () {
          if (navigator.share) {
            navigator
              .share({
                title: `${
                  localization[model.worldCountries.language][
                    "Country Alliance Guesser Game"
                  ]
                }`,
                text: `${
                  localization[model.worldCountries.language][
                    "World Country Alliances Guesser Game"
                  ]
                } - ${
                  document.querySelector(".about-project-description")
                    .textContent
                }`,
                url: this._gameRoomInputLink.value,
              })
              .then(function () {})
              .catch(function () {});
          }
        }.bind(this)
      );
      this._gameRoomShareLinkListenerAdded = true;
    }
  }

  startGame(aboutView, gameView, donateAuthorView, gameRulesView, mainView) {
    if (!this._firebase.gameRoomId) {
      alert(
        localization[model.worldCountries.language][
          "You have selected the game mode with a friend. First, create a game room. Click the 'Create Game Room' button."
        ]
      );
      return;
    }
    this._startButton.disabled = true;
    mainView.hideMain();
    document.querySelector("header").classList.add("not-displayed");
    document.querySelector("footer").classList.add("not-displayed");
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    this.hideGameRoomProject();
    gameView.showGame();
    gameView.initGameView(this._firebase);
  }

  addStartGameHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    mainView
  ) {
    if (!this._startButtonListenerAdded) {
      this._startButton.addEventListener(
        "click",
        this.startGame.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          mainView
        )
      );
      this._startButtonListenerAdded = true;
    }
  }

  addReturnBackHandlerClick(
    mainView,
    aboutView,
    gameRulesView,
    donateAuthorView
  ) {
    if (!this._returnBackListenerAdded) {
      this._gameRoomReturnBack.addEventListener(
        "click",
        this.returnBack.bind(
          this,
          mainView,
          aboutView,
          gameRulesView,
          donateAuthorView
        )
      );
      this._returnBackListenerAdded = true;
    }
  }

  showGameRoomInfo() {
    this.showGameRoomProject();
  }

  showGameRoomProject() {
    if (this._firebase.gameRoomId) {
      this._startButton.disabled = false;
    } else {
      this._startButton.disabled = true;
    }
    this._parentElement.classList.remove("not-displayed");
  }

  hideGameRoomProject() {
    if (this._firebase.gameRoomId) {
      this._startButton.disabled = false;
    } else {
      this._startButton.disabled = true;
    }
    this._parentElement.classList.add("not-displayed");
  }

  getFirebase() {
    return this._firebase;
  }

  cleanFirebase(closeChannel) {
    if (this._firebase) {
      this._firebase.cleanupResources(closeChannel);
    }
  }

  translateElements() {
    this._gameRoomReturnBack.textContent = `${
      localization[model.worldCountries.language]["BACK TO MAIN PAGE"]
    }`;
    this._gameRoomCreateButton.textContent = `${
      localization[model.worldCountries.language]["Create Game Room"]
    }`;
    this._gameRoomDeleteButton.textContent = `${
      localization[model.worldCountries.language]["Delete Game Room"]
    }`;
    this._gameRoomInputLink.placeholder = `${
      localization[model.worldCountries.language][
        "Click 'Create Game Room' to generate game link"
      ]
    }`;
    this._gameLinkForFriendLabel.textContent = `${
      localization[model.worldCountries.language]["Game Link For Friend"]
    }`;
    this._gameRoomCopyLink.textContent = `${
      localization[model.worldCountries.language]["Copy Link"]
    }`;
    this._gameShareLink.textContent = `${
      localization[model.worldCountries.language]["Share Link With Friend"]
    }`;
    this._gameRoomGameConfigurationHeader.textContent = `${
      localization[model.worldCountries.language]["Game Configuration"]
    }`;
    this._gameRoomOnlyIndependentCountriesCheckboxLabel.textContent = `${
      localization[model.worldCountries.language]["Only Independent Countries"]
    }`;
    this._gameRoomInstructionHeader.textContent = `${
      localization[model.worldCountries.language]["Instructions."]
    }`;
    this._startButton.textContent = `${
      localization[model.worldCountries.language]["START"]
    }`;
    this._gameRoomInstructionText.textContent = `${
      localization[model.worldCountries.language][
        "To play with your friend, you need: 1. Choose the desired game configuration, whether you want to guess countries and alliances of countries from all over the world or only independent ones. You can do this on this page or on the main page (after creating a game room, you will not be able to change this setting). 2. Create a game room and a link to the game for your friend by clicking the 'Create Game Room' button. 3. Copy the game link by clicking the 'Copy Link' button and send it to your friend or share the game link by clicking the 'Share Link With Friend' button. 4. After completing a game or several games, you can delete the game room by clicking the 'Delete Game Room' button (after deleting the game room, your friend will no longer be able to use the game link to play with you)."
      ]
    }`;
    this._gameRoomImportantHeader.textContent = `${
      localization[model.worldCountries.language]["Important!"]
    }`;
    this._gameRoomImportantDescription.textContent = `${
      localization[model.worldCountries.language][
        "If your browser blocks or disables WebRTC (real-time communication for the web), you will not be able to play with your friend. Try a different browser."
      ]
    }`;
  }
}

export default new gameRoomView();
