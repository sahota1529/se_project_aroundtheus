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

// console.log(initialCards);

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardUrlInput = document.querySelector("#add-card-url-input");
const addCardForm = document.forms["modal-add-form"];
/*const addCardModalCloseButton = document.querySelector(
  "#add-modal-close-button"
);*/
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = document.forms["profile-form"];
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewImgEl = document.querySelector(".modal__image-preview");
const imagePreviewCaption = document.querySelector(".modal__caption");
/*const imagePreviewCloseButton = document.querySelector(
  "#modal-image-preview-button"
);*/
const closeButtons = document.querySelectorAll(".modal__close");

/* Functions */

function closePopup(modal) {
  profileEditModal.classList.remove("modal_opened");
}

function openPopup(modal) {
  profileEditModal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  renderCard({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  closePopup(addCardModal);
  e.target.reset();
}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link, cardListEl });
  closeModal(addCardModal);
  addCardForm.reset();
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
    openModal(previewModal);
    previewModalImageEl.src = cardData.link;
    previewModalImageEl.alt = cardData.alt;
    previewModalCaptionEl.textContent = cardData.name;
  });

  return cardElement;
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
  openPopup(profileEditModal);
});

addCardModal.addEventListener("click", () => openModal(addCardModal));

// add event listener for the add card modal close button
closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  //addCardModal.classList.add("modal_opened");
  openPopup(addCardModal);
});

const cardlistEl = document.querySelector(".cards__list");

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

initialCards.forEach((card) => {
  // const newCard = getCardElement(card);
  // cardsList.append(newCard);
  renderCard(card, "append");
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {});
