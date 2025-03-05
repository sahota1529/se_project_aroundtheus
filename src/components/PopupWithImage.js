import Popup from "./Popup.js";

export default class PopWIthImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImage = document.querySelector(".modal__image");
    this._previewCaption = document.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._previewCaption.textContent = name;
    super.open();
  }
}
