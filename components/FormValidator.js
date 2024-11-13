export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    const checkInputValidity = new this._checkInputValidity(
      this._formEl,
      this._inputEl,
      this._config
    );
    if (!this._inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
    let foundInvalid = false;
    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      this.disableSubmitButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _hasInvalidInput(inputList, btnEl) {
    const hasInvalidInput = this._hasInvalidInput(inputList);
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement, {
      inputSelector: this._inputSelector,
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
  atus;

  resetValidator() {
    //creates a variable to the input list
    // this variable will receive a list of inputs inside the form element. NTS: You already have a variable for formElement, so you can use this._formElement + querySelectorAll
    const inputList = this._formElement.querySelectorAll(this._inputSelector);

    //now that a list of inputs is set up, forEach one of them, hideInputError
    inputList.forEach((input) => this._hideInputError(input));

    // NTS: also, toggle the submit button (this._toggleButtonState())
    this._toggleButtonState();
  }
}
