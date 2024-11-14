import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitleInput = document.querySelector("#profile-title-input");
const cardsWrap = document.querySelector(".cards__list");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardUrlInput = document.querySelector("#add-card-url-input");
const addCardForm = document.forms["add-card-form"];
/*const addCardModalCloseButton = document.querySelector(
  "#add-modal-close-button"
);*/
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = document.forms["profile-form"];
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewImgEl = document.querySelector(".modal__image-preview");
const imagePreviewCaption = document.querySelector(".modal__caption");
const imagePreviewCloseButton = document.querySelector(
  "#modal-image-preview-button"
);
const closeButtons = document.querySelectorAll(".modal__close");

/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closePopup(currentModal); // call the function to close the modal
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    // if evt.target's classList contains "modal"
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  renderCard({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  closePopup(addCardModal);
  e.target.reset();
}

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewTitle.textContent = data.name;
  openModal(previewImageModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(data, wrapper) {
  const cardElement = createCard(data);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    const cardToDelete = cardDeleteButton.closest(".card");
    if (cardToDelete) {
      console.log("Card found and will be deleted");
      cardToDelete.remove();
    }
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", function () {
    openPopup(imagePreviewModal);
    imagePreviewImgEl.src = cardData.link;
    imagePreviewImgEl.alt = cardData.name;
    imagePreviewCaption.textContent = cardData.name;
  });

  return cardElement;
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

// addCardModal.addEventListener("click", () => openModal(addCardModal));

// add event listener for the add card modal close button
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");

  button.addEventListener("click", () => closePopup(popup));
});

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const cardlistEl = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  // const newCard = getCardElement(card);
  // cardsList.append(newCard);
  renderCard(card, "append");
});

const formValidationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);

const editCardFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
