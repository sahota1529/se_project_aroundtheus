import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._deleteSubmitBtn = this._popupElement.querySelector("#confirm-button");
  }

  setSubmitAction(handler) {
    this._handleSubmit = handler;
  }

  setDeleteLoading(loading) {
    if (loading) {
      this._deleteSubmitBtn.textContent = "Deleting...";
    } else {
      this._deleteSubmitBtn.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
