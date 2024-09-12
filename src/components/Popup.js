export default class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.type === "keydown" && e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // event listeners for the popup close button and clicking outside to close
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popUpElement.addEventListener("click", (e) => {
      if (e.target.className === "modal modal_opened") {
        this.close();
      }
    });
  }
}
