import Popup from "./Popup.js";

// Creating a popup for deleting a card
export default class PopupConfirmation extends Popup {
  constructor(popUpSelector, handleConfirmation) {
    super(popUpSelector);
    this._confirmButton = document.querySelector("#confirmation-modal-button");
    this._handleConfirmation = handleConfirmation;
    this._setEventListeners();
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirmation(this._cardId, this._cardElement)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error("Error Deleting Card", err);
        });
    });
  }
}
