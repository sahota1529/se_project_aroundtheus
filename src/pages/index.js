import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  initialCards,
  formValidationSettings,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  addCardForm,
  addNewCardButton,
  profileEditForm,
  cardListEl,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/* Elements */

//an instance of PopupWithForm
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const imagePreviewPopup = new PopupWithImage(
  "#image-preview-modal",
  handleImageClick
);

imagePreviewPopup.setEventListeners();

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    description: inputValues.description,
  });
  profileEditPopup.close();
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.description,
  };
  cardSection.addItem(createCard(cardData));
  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
  addCardPopup.close();
}

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(data, placement = "prepend") {
  const cardElement = createCard(data);
  cardListEl[placement](cardElement);
}

function handleDeleteAction(card) {
  confirmationModal.open();
  confirmationModal.setSubmitAction(() => {
    card._handleDeleteAction();
    confirmationModal.close();
  });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      //get the card html element
      const cardElement = createCard(data);
      //stick the card element on the page
      cardSection.addItem(cardElement, "append");
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const confirmationModal = new PopupWithConfirmation({
  popupSelector: "#delete-modal",
});
confirmationModal.setEventListeners();

const avatarModal = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: (formData) => {
    userInfo.setAvatar({ avatar: formData.url });
    avatarModal.close();
  },
});
avatarModal.setEventListeners();

const avatarForm = document.querySelector(".profile__avatar-form");

const avatarButton = document.querySelector(".avatar__button");
avatarButton.addEventListener("click", () => {
  avatarModal.open();
});

const deleteModalCloseButton = deleteModal.querySelector(
  ".modal__close-button"
);

deleteModalCloseButton.addEventListener("click", () => {
  confirmationModal.close();
});

const deleteModalCancelButton = deleteModal.querySelector(
  ".modal__submit-button-cancel"
);

deleteModalCancelButton.addEventListener("click", () => {
  confirmationModal.close();
});

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editCardFormValidator.resetValidation();
  profileEditPopup.open();
});

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
