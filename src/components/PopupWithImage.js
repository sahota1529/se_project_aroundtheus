import Popup from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._captionElement = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.alt;
    this._captionElement.textContent = data.name;
    super.open();
  }
}
