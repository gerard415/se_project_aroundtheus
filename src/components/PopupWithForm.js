import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
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
      console.log(this._getInputValues());
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
