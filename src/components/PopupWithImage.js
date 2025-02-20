import Popup from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._previewCaption = this._popupElement.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._previewCaption.textContent = name;
    super.open();
  }
}
