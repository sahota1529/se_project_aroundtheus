export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardId = `card_${Date.now()}_${Math.random()}`;
    this._isLiked = localStorage.getItem(this._cardId) === "true";
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  _handleAddCardFormSubmit() {
    this._cardElement.added();
    this._cardElement.null;
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._isLiked = !this._isLiked;
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
    localStorage.setItem(this._cardId, this._isLiked);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }

    this._setEventListeners();
    return this._cardElement;
  }
}
