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
