import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popUpForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    // collects data from all input fields and returns it as object
    const inputValues = {};
    const inputFields = this._popUpForm.querySelectorAll(".modal__input");
    inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.setLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
