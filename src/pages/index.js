import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
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

// API Configuration

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bedf9f47-8def-461d-8c1c-0452ca74af31",
    "Content-Type": "application/json",
  },
});

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
  avatarElement: ".profile__image",
});

const avatarImage = document.querySelector("#profile-avatar-image");
const pencil = document.querySelector("#profile-pencil");

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

//function createCard(data) {
//const card = new Card(data, "#card-template", handleImageClick);
//return card.getView();
//}

function renderCard(data, placement = "prepend") {
  const cardElement = createCard(data);
  cardListEl[placement](cardElement);
}

//function handleDeleteAction(card) {
//confirmationModal.open();
//confirmationModal.setSubmitAction(() => {
//card._handleDeleteAction();
//confirmationModal.close();
//});
//}

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

const avatarModal = new PopupWithForm("#avatar-modal", (formData) => {
  userInfo.setAvatar({ avatar: formData.url });
  avatarModal.close();
});

avatarModal.setEventListeners();

const avatarForm = document.querySelector(".profile__avatar-form");

// const avatarButton = document.querySelector(".avatar__button");
// avatarButton.addEventListener("click", () => {
//   avatarModal.open();
// });

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

// API'S

api
  .getInitialCards()
  .then((cards) => {
    newCardSection.setItems(cards);
    newCardSection.renderItems();
  })
  .catch((err) => {
    alert(`${err} Failed to get cards.`);
  });

api
  .getUserInfo()
  .then((info) => {
    profileUserInfo.setUserInfo({
      name: info.name,
      description: info.about,
    });
    profileUserInfo.setUserAvatar(info.avatar);
  })
  .catch((err) => {
    alert(`${err} Failed to get user info.`);
  });

//API FUNCTIONS

function handleProfileEditSubmit(data) {
  profileEditForm.setLoading(true);
  api
    .updateUserInfo(data)
    .then((result) => {
      profileUserInfo.setUserInfo(data);
      profileEditForm.close();
    })
    .catch((err) => {
      alert(`${err} Failed to change user info.`);
    })
    .finally(() => {
      profileEditForm.setLoading(false);
    });
}

function handleCardSubmit({ title: name, subtitle: link }) {
  addImageForm.setLoading(true);
  api
    .addCard({ name, link })
    .then((card) => {
      debugger;
      newCardSection.addItem(card);
      addImageForm.close();
    })
    .catch((err) => {
      alert(`${err} Failed to add card.`);
    })
    .finally(() => {
      addImageForm.setLoading(false);
    });
}

function handleAvatarSubmit(input) {
  avatarEditForm.setLoading(true);
  api
    .changeAvatar(input.link)
    .then((result) => {
      profileUserInfo.setUserAvatar(result.avatar);
      avatarEditForm.close();
    })
    .catch((err) => {
      alert(`${err} Failed to change avatar.`);
    })
    .finally(() => {
      avatarEditForm.setLoading(false);
    });
}

function handleAddLike(card) {
  if (card.isLiked) {
    return api
      .removeLike(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        alert(`${err} Failed to add/remove like.`);
      });
  } else {
    return api
      .setLike(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        alert(`${err} Failed to add/remove like.`);
      });
  }
}

function handleDeleteClick(card) {
  confirmDeletePopup.open();
  confirmDeletePopup.setSubmitAction(() => {
    confirmDeletePopup.setDeleteLoading(true);
    api
      .deleteCard(card._id)
      .then((result) => {
        card.handleDeleteCard(result);
        confirmDeletePopup.close();
      })
      .catch((err) => {
        alert(`${err} Failed to delete post.`);
      })
      .finally(() => {
        confirmDeletePopup.setDeleteLoading(false);
      });
  });
}

// FUNCTIONS

//function handleImageClick(card) {
//previewImagePopup.open(card);
//}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleAddLike
  );
  return card.getView();
}

// EVENT LISTENERS

//avatarImage.addEventListener("click", () => {
//avatarEditForm.open();
//});

pencil.addEventListener("click", () => {
  avatarEditForm.open();
});

addNewCardBtn.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addImageForm.open();
});

profileEditBtn.addEventListener("click", () => {
  const { name, description } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtitleInput.value = description;
  profileEditForm.open();
});

modalImage.addEventListener("click", () => {
  previewImagePopup.open();
});

//CLASSES

const profileEditImage = new FormValidator(config, editImageForm);
profileEditImage.enableValidation();

//const addCardFormValidator = new FormValidator(config, addCardForm);
//addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, profileForm);
editProfileFormValidator.enableValidation();

//const profileEditForm = new PopupWithForm(
//"#profile-edit-modal",
//handleProfileEditSubmit
//);
//profileEditForm.setEventListeners();

const profileUserInfo = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
  avatar: ".profile__image",
});

const addImageForm = new PopupWithForm("#add-card-modal", handleCardSubmit);
addImageForm.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-modal");
previewImagePopup.setEventListeners();

const confirmDeletePopup = new PopupConfirm("#delete-popup");
confirmDeletePopup.setEventListeners();

const avatarEditForm = new PopupWithForm(
  "#profile-image-modal",
  handleAvatarSubmit
);
avatarEditForm.setEventListeners();

const avatarEditFormValidation = new FormValidator(
  config,
  profileEditImageForm
);
avatarEditFormValidation.enableValidation();

const newCardSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  cardsWrap
);
