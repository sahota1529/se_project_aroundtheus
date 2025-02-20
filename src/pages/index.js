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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const editImageForm = document.querySelector("#image-edit-form");

const avatarImage = document.querySelector("#profile-avatar-image");
const pencil = document.querySelector("#profile-edit-button");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCancelButton = deleteModal.querySelector(
  ".modal__submit-button-cancel"
);
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  avatarElement: ".profile__image",
});

const cardSection = new Section(
  {
    items: [],
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

const confirmationModal = new PopupWithConfirmation({
  popupSelector: "#delete-modal",
});
confirmationModal.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const avatarPopup = new PopupWithForm("#avatar-modal", (formData) => {
  userInfo.setAvatar({ avatar: formData.url });
  avatarPopup.close();
});
avatarPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage("#preview-modal");
imagePreviewPopup.setEventListeners();

const addCardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);
addCardFormValidator.enableValidation();

const editCardFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);
editCardFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(
  formValidationSettings,
  avatarForm
);
avatarEditFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

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

function renderCard(data, placement = "prepend") {
  const cardElement = createCard(data);
  cardListEl[placement](cardElement);
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

//function handleDeleteAction(card) {
//confirmationModal.open();
//confirmationModal.setSubmitAction(() => {
//card._handleDeleteAction();
//confirmationModal.close();
//});
//}

// const avatarButton = document.querySelector(".avatar__button");
// avatarButton.addEventListener("click", () => {
//   avatarPopup.open();
// });

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

deleteModalCancelButton.addEventListener("click", () => {
  confirmationModal.close();
});

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editCardFormValidator.resetValidation();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});

modalImage.addEventListener("click", () => {
  previewImagePopup.open();
});

/* -------------------------------------------------------------------------- */
/*                             API'S and FUNCTIONS                            */
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
    cardSection.setItems(cards);
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
    alert(`${err} Failed to get cards.`);
  });

api
  .getUserInfo()
  .then((info) => {
    userInfo.setUserInfo({
      name: info.name,
      description: info.about,
    });
    userInfo.setUserAvatar(info.avatar);
  })
  .catch((err) => {
    console.error(err);
    alert(`${err} Failed to get user info.`);
  });

//API FUNCTIONS

function handleProfileEditSubmit(data) {
  profileEditPopup.setLoading(true);
  api
    .updateUserInfo(data)
    .then((result) => {
      userInfo.setUserInfo(data);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);

      alert(`${err} Failed to change user info.`);
    })
    .finally(() => {
      profileEditPopup.setLoading(false);
    });
}

function handleCardSubmit({ title: name, subtitle: link }) {
  addImageForm.setLoading(true);
  api
    .addCard({ name, link })
    .then((card) => {
      debugger;
      cardSection.addItem(card);
      addImageForm.close();
    })
    .catch((err) => {
      console.error(err);

      alert(`${err} Failed to add card.`);
    })
    .finally(() => {
      addImageForm.setLoading(false);
    });
}

function handleAvatarSubmit(input) {
  avatarPopup.setLoading(true);
  api
    .changeAvatar(input.link)
    .then((result) => {
      userInfo.setUserAvatar(result.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);

      alert(`${err} Failed to change avatar.`);
    })
    .finally(() => {
      avatarPopup.setLoading(false);
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
        console.error(err);

        alert(`${err} Failed to add/remove like.`);
      });
  } else {
    return api
      .setLike(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);

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
        console.error(err);

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

// EVENT LISTENERS

//avatarImage.addEventListener("click", () => {
//avatarEditForm.open();
//});

// pencil.addEventListener("click", () => {
//   avatarEditForm.open();
// });

//CLASSES

//const addCardFormValidator = new FormValidator(config, addCardForm);
//addCardFormValidator.enableValidation();

// const editProfileFormValidator = new FormValidator(config, profileForm);
// editProfileFormValidator.enableValidation();

//const profileEditForm = new PopupWithForm(
//"#profile-edit-modal",
//handleProfileEditSubmit
//);
//profileEditForm.setEventListeners();

//const previewImagePopup = new PopupWithImage("#preview-modal");
//previewImagePopup.setEventListeners();
