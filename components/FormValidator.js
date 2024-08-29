export default class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._inputElements = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._options.inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._options.errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._options.inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._options.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  disableSubmitButton = () => {
    this._submitButton.classList.add(this._options.inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  _enableSubmitButton = () => {
    this._submitButton.classList.remove(this._options.inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  _toggleButton() {
    if (this._hasInvalidInput(this._inputElements)) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    this._toggleButton();
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._toggleButton();
    });
  }

  resetValidation() {
    this._toggleButton();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
