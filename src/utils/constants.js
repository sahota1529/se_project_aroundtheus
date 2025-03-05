export const InitialCards = [
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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileSubtitleInput = document.querySelector(
  "#profile-subtitle-input"
);
export const profileForm = document.forms["modal-form"];
export const editImageForm = document.querySelector("#image-edit-form");
export const profileEditImageForm = document.querySelector("#image-edit-form");
export const avatarImage = document.querySelector("#profile-avatar-image");
export const pencil = document.querySelector("#profile-pencil");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardForm = addCardModal.querySelector("#add-card-form");
export const cardsWrap = document.querySelector(".cards__list");
export const previewModal = document.querySelector("#preview-modal");
export const modalImage = previewModal.querySelector(".modal__image");
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const addNewCardBtn = document.querySelector("#add-card-button");
