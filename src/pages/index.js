import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";
import Api from "../components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__form-input_type_error",
};

/* -------------------------------------------------------------------------- */
/*                              Profile Variables                             */
/* -------------------------------------------------------------------------- */

const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileForm = document.forms["modal-form"];
const editImageForm = document.querySelector("#image-edit-form");
const avatarImage = document.querySelector("#profile-avatar-image");
const profileEditImageForm = document.querySelector("#image-edit-form");
const pencil = document.querySelector("#profile-pencil");

/* -------------------------------------------------------------------------- */
/*                                  Card Variables                            */
/* -------------------------------------------------------------------------- */

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardsWrap = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                               Preview Image Variables                      */
/* -------------------------------------------------------------------------- */

const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");

/* -------------------------------------------------------------------------- */
/*                                   Buttons                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardBtn = document.querySelector("#add-card-button");

/* -------------------------------------------------------------------------- */
/*                                    API'S                                   */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bedf9f47-8def-461d-8c1c-0452ca74af31",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    newCardSection.setItems(cards.reverse());
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

/* -------------------------------------------------------------------------- */
/*                                API FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

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
    .changeAvatar(input.link) //http://sldkjfslkdf
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

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(card) {
  previewImagePopup.open(card);
}

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

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

avatarImage.addEventListener("click", () => {
  avatarEditForm.open();
});

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

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

const profileEditImage = new FormValidator(config, editImageForm);
profileEditImage.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, profileForm);
editProfileFormValidator.enableValidation();

const profileEditForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditForm.setEventListeners();

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
