import { localization } from "./localization/ua.js";
import * as model from "./model.js";
import { setChatArrow } from "./helpers.js";

let chatElement = null;
const refs = {};
let transport = { send: () => false, isConnected: () => false };
let mainChatWanted = false;

export const setChatTransport = function (newTransport) {
  transport = newTransport;
};

const text = (key) => localization[model.worldCountries.language][key];

const applyLabels = function () {
  refs.buttonText.textContent = text("CHAT");
  refs.fromOpponent.placeholder = "🧓 " + text("Message From Opponent");
  refs.toOpponent.placeholder =
    "✉️ " + text("Type Your Message Here... (max. length 300 characters)");
  refs.sendButton.title = text("Send Message");
};

const sendFromInput = function () {
  const messageInput = refs.toOpponent;
  let sent = false;
  if (messageInput.value !== "") {
    sent = transport.send(messageInput.value);
  }
  if (!sent && messageInput.value !== "") {
    refs.fromOpponent.value =
      "🧓: " +
      text(
        "Opponent has not yet entered the game room to read your messages. Try sending a message later",
      );
  }
  messageInput.value = "";
  messageInput.focus();
};

const toggleChat = function () {
  setChatArrow(refs.leftArrow, refs.leftArrow.dataset.direction !== "up");
  setChatArrow(refs.rightArrow, refs.rightArrow.dataset.direction !== "up");
  refs.rightArrow.style.display = "none";
  refs.container.classList.toggle("not-displayed");
  refs.toOpponent.focus();
};

const buildChat = function () {
  const chat = document.createElement("div");
  chat.id = "chat";
  chat.style.width = "100%";
  chat.style.marginBottom = "0px";
  chat.classList.add("text-center");
  const chatButton = document.createElement("div");
  chatButton.id = "chat-button";
  chatButton.style.background =
    "linear-gradient(135deg, #8fb0f2 0%, #5b8def 100%)";
  chatButton.style.color = "#0f2557";
  chatButton.style.cursor = "pointer";
  chatButton.style.boxShadow = "0 -2px 10px rgba(37, 99, 235, 0.3)";
  chatButton.style.fontSize = "0.75rem";
  chatButton.style.width = "25%";
  chatButton.style.fontWeight = "600";
  chatButton.style.letterSpacing = "0.04em";
  chatButton.style.marginBottom = "0px";
  chatButton.style.display = "inline-block";
  chatButton.style.borderTopLeftRadius = "10px";
  chatButton.style.borderTopRightRadius = "10px";
  chatButton.style.userSelect = "none";
  chatButton.style.transition = "filter 0.2s ease";
  chatButton.addEventListener("mouseover", () => {
    chatButton.style.filter = "brightness(1.05) saturate(1.2)";
  });
  chatButton.addEventListener("mouseout", () => {
    chatButton.style.filter = "none";
  });
  chatButton.classList.add("text-center");
  const chatButtonLeftArrow = document.createElement("span");
  chatButtonLeftArrow.id = "chat-button-left-arrow";
  setChatArrow(chatButtonLeftArrow, true);
  chatButtonLeftArrow.style.marginRight = "10px";
  chatButtonLeftArrow.style.opacity = "0.8";
  const chatButtonText = document.createElement("span");
  chatButtonText.id = "chat-button-text";
  const chatButtonRightArrow = document.createElement("span");
  chatButtonRightArrow.id = "chat-button-right-arrow";
  setChatArrow(chatButtonRightArrow, true);
  chatButtonRightArrow.style.display = "none";
  const chatContainer = document.createElement("div");
  chatContainer.id = "chat-container";
  chatContainer.classList.add("not-displayed");
  chatContainer.style.backgroundColor = "rgba(255, 255, 255, 0.88)";
  chatContainer.style.backdropFilter = "blur(8px)";
  chatContainer.style.webkitBackdropFilter = "blur(8px)";
  chatContainer.style.color = "#1e293b";
  chatContainer.style.boxShadow = "0 -4px 16px rgba(15, 23, 42, 0.25)";
  chatContainer.style.fontSize = "0.7rem";
  chatContainer.style.width = "100%";
  chatContainer.style.fontWeight = "500";
  chatContainer.style.marginBottom = "0px";
  chatContainer.style.overflow = "hidden";
  chatContainer.style.borderTopLeftRadius = "10px";
  chatContainer.style.borderTopRightRadius = "10px";
  const chatMessageFromOpponent = document.createElement("input");
  chatMessageFromOpponent.id = "chat-message-from-opponent";
  chatMessageFromOpponent.readOnly = true;
  chatMessageFromOpponent.ariaReadonly = true;
  chatMessageFromOpponent.style.width = "100%";
  chatMessageFromOpponent.style.boxSizing = "border-box";
  chatMessageFromOpponent.style.border = "0px";
  chatMessageFromOpponent.style.borderBottom =
    "1px solid rgba(100, 116, 139, 0.25)";
  chatMessageFromOpponent.style.padding = "2px 12px";
  chatMessageFromOpponent.style.background = "rgba(241, 245, 249, 0.8)";
  chatMessageFromOpponent.style.color = "#334155";
  chatMessageFromOpponent.style.outline = "none";
  chatMessageFromOpponent.style.overflowX = "hidden";
  const chatMessageToOpponentContainer = document.createElement("div");
  chatMessageToOpponentContainer.style.display = "flex";
  const chatMessageToOpponent = document.createElement("input");
  chatMessageToOpponent.id = "chat-message-to-opponent";
  chatMessageToOpponent.type = "text";
  chatMessageToOpponent.style.width = "90%";
  chatMessageToOpponent.style.boxSizing = "border-box";
  chatMessageToOpponent.style.border = "0px";
  chatMessageToOpponent.style.padding = "2px 12px";
  chatMessageToOpponent.style.background = "transparent";
  chatMessageToOpponent.style.color = "#1e293b";
  chatMessageToOpponent.style.outline = "none";
  chatMessageToOpponent.style.transition = "box-shadow 0.2s ease";
  chatMessageToOpponent.addEventListener("focus", () => {
    chatMessageToOpponent.style.boxShadow = "inset 0 -2px 0 #2563eb";
  });
  chatMessageToOpponent.addEventListener("blur", () => {
    chatMessageToOpponent.style.boxShadow = "none";
  });
  chatMessageToOpponent.maxLength = 300;
  chatMessageToOpponent.style.overflowX = "hidden";
  const chatMessageToOpponentButton = document.createElement("input");
  chatMessageToOpponentButton.type = "button";
  chatMessageToOpponentButton.id = "chat-message-to-opponent-button";
  chatMessageToOpponentButton.value = `📩`;
  chatMessageToOpponentButton.style.width = "10%";
  chatMessageToOpponentButton.style.backgroundColor = "transparent";
  chatMessageToOpponentButton.style.border = "0px";
  chatMessageToOpponentButton.style.borderLeft =
    "1px solid rgba(100, 116, 139, 0.25)";
  chatMessageToOpponentButton.style.cursor = "pointer";
  chatMessageToOpponentButton.style.transition = "background-color 0.2s ease";
  chatMessageToOpponentButton.addEventListener("click", sendFromInput);
  chatMessageToOpponentButton.addEventListener("mouseover", () => {
    chatMessageToOpponentButton.style.backgroundColor =
      "rgba(37, 99, 235, 0.15)";
  });
  chatMessageToOpponentButton.addEventListener("mouseout", () => {
    chatMessageToOpponentButton.style.backgroundColor = "transparent";
  });
  chatMessageToOpponent.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendFromInput();
    }
  });
  chatMessageToOpponentContainer.appendChild(chatMessageToOpponent);
  chatMessageToOpponentContainer.appendChild(chatMessageToOpponentButton);
  chat.appendChild(chatButton);
  chat.appendChild(chatContainer);
  chatContainer.appendChild(chatMessageFromOpponent);
  chatContainer.appendChild(chatMessageToOpponentContainer);
  chatButton.appendChild(chatButtonLeftArrow);
  chatButton.appendChild(chatButtonText);
  chatButton.appendChild(chatButtonRightArrow);
  chatButton.addEventListener("click", toggleChat);
  Object.assign(refs, {
    container: chatContainer,
    buttonText: chatButtonText,
    leftArrow: chatButtonLeftArrow,
    rightArrow: chatButtonRightArrow,
    fromOpponent: chatMessageFromOpponent,
    toOpponent: chatMessageToOpponent,
    sendButton: chatMessageToOpponentButton,
  });
  chatElement = chat;
};

export const hasChat = () => chatElement !== null;

export const destroyChat = function () {
  if (!chatElement) return;
  chatElement.remove();
  chatElement = null;
  Object.keys(refs).forEach((key) => delete refs[key]);
  mainChatWanted = false;
  const slot = document.getElementById("main-chat-slot");
  const footer = document.querySelector("footer");
  if (slot) slot.classList.add("not-displayed");
  if (footer) footer.style.display = "flex";
};

export const receiveChat = function (message) {
  if (!chatElement) return;
  refs.fromOpponent.value = "🧓: " + message;
  if (refs.container.classList.contains("not-displayed")) {
    refs.container.classList.remove("not-displayed");
    setChatArrow(refs.leftArrow, false);
    setChatArrow(refs.rightArrow, false);
    refs.rightArrow.style.display = "none";
  }
};

export const takeChatForMap = function () {
  if (!chatElement) buildChat();
  applyLabels();
  mainChatWanted = false;
  const slot = document.getElementById("main-chat-slot");
  if (slot) slot.classList.add("not-displayed");
  return chatElement;
};

export const showMainChat = function () {
  const slot = document.getElementById("main-chat-slot");
  const footer = document.querySelector("footer");
  if (slot && chatElement && transport.isConnected()) {
    applyLabels();
    chatElement.classList.remove("leaflet-control");
    slot.appendChild(chatElement);
    slot.classList.remove("not-displayed");
    if (footer) footer.style.display = "none";
    mainChatWanted = true;
    return true;
  }
  if (slot) slot.classList.add("not-displayed");
  if (footer) footer.style.display = "flex";
  mainChatWanted = false;
  return false;
};

export const syncMainChatWithConnection = function (connectionState) {
  const slot = document.getElementById("main-chat-slot");
  const footer = document.querySelector("footer");
  if (!slot || !mainChatWanted) return;
  if (["disconnected", "failed", "closed"].includes(connectionState)) {
    slot.classList.add("not-displayed");
    if (footer) footer.style.display = "flex";
  } else if (connectionState === "connected" && chatElement) {
    slot.classList.remove("not-displayed");
    if (footer) footer.style.display = "none";
  }
};
